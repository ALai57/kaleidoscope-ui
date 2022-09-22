(ns andrewslai.cljs.events.slate-editor
  (:require [ajax.core :as ajax]
            [andrewslai.cljs.modals.editor :refer [create-article-failure-modal
                                                   create-article-success-modal]]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]))

(reg-event-db
 :save-success
 (fn [db [_ response]]
   (js/console.log "Save Article response:" response)
   (dispatch [:show-modal (create-article-success-modal response)])
   db))

(reg-event-db
 :save-failure
 (fn [db [_ response]]
   (js/console.log "Save Article response:" response)
   (dispatch [:show-modal (create-article-failure-modal response)])
   db))

(defn title->url
  [title]
  "example-article-11111"
  #_(-> title
        str
        clojure.string/lower-case
        (clojure.string/replace  #"[!|.|(|)|]" "")
        (clojure.string/replace  " " "-")))

(reg-event-fx
 :save-article!
 (fn [{:keys [db]} [_ {:keys [title] :as article}]]
   {:http-xhrio {:method          :put
                 :uri             (str "/articles/" (title->url title))
                 :params          article
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))
                                   :Content-Type "application/json"}
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:save-success]
                 :on-failure      [:save-failure]}
    :db         (assoc db :loading? true)}))
