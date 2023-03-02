(ns andrewslai.cljs.events.groups
  (:require [ajax.core :as ajax]
            [andrewslai.cljc.specs.articles]
            [cljs.spec.alpha :as s]
            [day8.re-frame.http-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx]]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf errorf]]))

(defn load-all-groups
  [db [_ response]]
  (infof "Retrieved all groups: found %s" (count response))
  (debugf "groups %s" response)
  (assoc db
         :loading? false
         :groups   response))
(reg-event-db :load-all-groups load-all-groups)

(defn load-all-groups-failure
  [db [_ response]]
  (errorf "Failed to retrieve groups %s" response)
  db)
(reg-event-db :load-all-groups-failure load-all-groups-failure)

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
                 :on-success      [:load-all-groups]
                 :on-failure      [:load-all-groups-failure]}
    :db         (assoc db :loading? true)}))

;; Add a group ID with a UUID - randomly generate
(reg-event-fx
 :add-group!
 (fn [{:keys [db]} [_ group-name]]
   (infof "Creating group: %s" group-name)
   {:http-xhrio {:method          :post
                 :uri             (gstr/format "/groups/%s" uuid)
                 :params          {:display-name group-name}
                 :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                     "test"))
                                   :Content-Type "application/json"}
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:save-success]
                 :on-failure      [:save-failure]}
    :db         (assoc db :loading? true)}))
