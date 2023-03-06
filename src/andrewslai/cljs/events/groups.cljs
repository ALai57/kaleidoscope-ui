(ns andrewslai.cljs.events.groups
  (:require [ajax.core :as ajax]
            [andrewslai.cljc.specs.articles]
            [cljs.spec.alpha :as s]
            [day8.re-frame.http-fx]
            [goog.string :as gstr]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx]]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf errorf]]))


(reg-event-db :load-all-groups.success
  (fn [db [_ response]]
    (infof "Retrieved all groups: found %s" (count response))
    (debugf "groups %s" response)
    (assoc db
           :loading? false
           :groups   response)))

(reg-event-db :load-all-groups.failure
  (fn [db [_ response]]
    (errorf "Failed to retrieve groups %s" response)
    db))

(reg-event-fx
 :request-all-groups
 (fn [{:keys [db]} [_]]
   (infof "Requesting all groups")
   {:http-xhrio {:method          :get
                 :uri             "/groups"
                 :format          (ajax/json-request-format)
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))}
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:load-all-groups.success]
                 :on-failure      [:load-all-groups.failure]}
    :db         (assoc db :loading? true)}))



(reg-event-fx :save-group.success
  (fn [cofx [_ response]]
    (infof "Saved group `%s`" response)
    {:db (:db cofx)
     :fx [[:dispatch [:request-all-groups]]]}))

(reg-event-db :save-group.failure
  (fn [db [_ response]]
    (errorf "Failed to retrieve groups %s" response)
    db))

(reg-event-fx
 :add-group!
 (fn [{:keys [db]} [_ group-name]]
   (infof "Creating group: %s" group-name)
   {:http-xhrio {:method          :post
                 :uri             "/groups"
                 :params          {:display-name group-name}
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))
                                   :Content-Type "application/json"}
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:save-group.success]
                 :on-failure      [:save-group.failure]}
    :db         (assoc db :loading? true)}))
