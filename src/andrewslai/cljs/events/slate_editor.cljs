(ns andrewslai.cljs.events.slate-editor
  (:require [ajax.core :as ajax]
            [andrewslai.cljs.modals.editor :refer [create-article-failure-modal
                                                   create-article-success-modal]]
            [goog.string :as gstr]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf]]))

;; TODO SHOULD ALSO UPDATE THE CURRENT IN APP DB
(reg-event-db
 :save-success
 (fn [db [_ response]]
   (infof "Success saving article response: %s" response)
   (dispatch [:show-modal (create-article-success-modal response)])
   db))

(reg-event-db
 :save-failure
 (fn [db [_ response]]
   (infof "Save Article response: %s" response)
   (dispatch [:show-modal (create-article-failure-modal response)])
   db))

(reg-event-db
 :update-editor-branch-id
 (fn [db [_ new-id]]
   (let [new-db (assoc db :editor-branch-id new-id)]
     (infof "Update Editor Branch ID: %s" new-id)
     new-db)))


(reg-event-db
 :load-version-success
 (fn [db [_ response]]
   (infof "Loading latest version success!: %s" response)
   (assoc db :initial-editor-data (first response))))

(reg-event-db
 :load-version-failure
 (fn [db [_ response]]
   (errorf "Loading latest version failure!: %s" response)
   db))

(reg-event-fx
 :load-latest-version!
 (fn [{:keys [db]} [_ {:keys [article-url branch-id branch-name] :as article-branch}]]
   (infof "Article branch %s" article-branch)
   (infof "Loading latest version of branch id %s: %s" branch-id branch-name)
   {:http-xhrio {:method          :get
                 :uri             (gstr/format "/branches/%s/versions" branch-id)
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))
                                   :Content-Type "application/json"}
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:load-version-success]
                 :on-failure      [:load-version-failure]}
    :db         (assoc db :loading? true)}))

(defn title->url
  [title]
  (-> title
      str
      clojure.string/lower-case
      (clojure.string/replace  #"[!|.|(|)|]" "")
      (clojure.string/replace  " " "-")))

;; TODO: Support renaming by removing dependence on `article-url` here
(reg-event-fx
 :save-article!
 (fn [{:keys [db]} [_ {:keys [title branch-name article-url] :as article}]]
   (let [sanitized-title (title->url title)]
     (infof "Saving article: %s" article)
     {:http-xhrio {:method          :post
                   :uri             (gstr/format "/articles/%s/branches/%s/versions" (or article-url sanitized-title) (or branch-name "main"))
                   :params          (assoc article :article-tags "thoughts")
                   :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                       "test"))
                                     :Content-Type "application/json"}
                   :format          (ajax/json-request-format)
                   :response-format (ajax/json-response-format {:keywords? true})
                   :on-success      [:save-success]
                   :on-failure      [:save-failure]}
      :db         (assoc db :loading? true)})))



(reg-event-db
 :publish-success
 (fn [db [_ response]]
   (infof "Success publishing article response: %s" response)
   db))

(reg-event-db
 :publish-failure
 (fn [db [_ response]]
   (infof "Publish article failure response: %s" response)
   db))

(reg-event-fx
 :publish-branch!
 (fn [{:keys [db]} [_ {:keys [branch-name article-url] :as article}]]
   (infof "Publishing article: %s" article)
   {:http-xhrio {:method          :put
                 :uri             (gstr/format "/articles/%s/branches/%s/publish" article-url branch-name)
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))
                                   :Content-Type "application/json"}
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:publish-success]
                 :on-failure      [:publish-failure]}
    :db         (assoc db :loading? true)}))
