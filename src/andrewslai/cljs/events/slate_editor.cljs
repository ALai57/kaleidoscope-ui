(ns andrewslai.cljs.events.slate-editor
  (:require [ajax.core :as ajax]
            [andrewslai.cljs.modals.editor :refer [create-article-failure-modal
                                                   create-article-success-modal]]
            [goog.string :as gstr]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-db
 :save-success
 (fn [db [_ response]]
   (infof "Save Article response: %s" response)
   (dispatch [:show-modal (create-article-success-modal response)])
   db))

(reg-event-db
 :save-failure
 (fn [db [_ response]]
   (infof "Save Article response: %s" response)
   (dispatch [:show-modal (create-article-failure-modal response)])
   db))

(reg-event-db
 :update-editor-article-id
 (fn [db [_ new-id]]
   (let [new-db (assoc db :editor-article-id new-id)]
     (infof "Update Editor Article ID: %s" new-id)
     ;;(println "NEW DB" new-db)
     new-db)))

(defn title->url
  [title]
  (-> title
      str
      clojure.string/lower-case
      (clojure.string/replace  #"[!|.|(|)|]" "")
      (clojure.string/replace  " " "-")))

(reg-event-fx
 :save-article!
 (fn [{:keys [db]} [_ {:keys [title] :as article}]]
   (let [sanitized-title (title->url title)]
     (infof "Saving article: %s" article)
     {:http-xhrio {:method          :put
                   :uri             (gstr/format "/articles/%s" sanitized-title)
                   :params          article
                   :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                       "test"))
                                     :Content-Type "application/json"}
                   :format          (ajax/json-request-format)
                   :response-format (ajax/json-response-format {:keywords? true})
                   :on-success      [:save-success]
                   :on-failure      [:save-failure]}
      :db         (assoc db :loading? true)})))
