(ns kaleidoscope.cljs.events.groups
  (:require [ajax.core :as ajax]
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

(reg-event-fx :add-group!
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


(reg-event-fx :delete-group.success
  (fn [cofx [_ response]]
    (infof "Deleted group `%s`" response)
    {:db (:db cofx)
     :fx [[:dispatch [:request-all-groups]]]}))

(reg-event-db :delete-group.failure
  (fn [db [_ response]]
    (errorf "Failed to delete groups %s" response)
    db))

(reg-event-fx :delete-group!
  (fn [{:keys [db]} [_ group]]
    (infof "Deleting group: %s" group)
    {:http-xhrio {:method          :delete
                  :uri             (gstr/format "/groups/%s" (:group-id group))
                  :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                      "test"))
                                    :Content-Type "application/json"}
                  :format          (ajax/json-request-format)
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success      [:delete-group.success]
                  :on-failure      [:delete-group.failure]}
     :db         (assoc db :loading? true)}))



(reg-event-fx :save-member.success
  (fn [cofx [_ response]]
    (infof "Saved member `%s`" response)
    {:db (:db cofx)
     :fx [[:dispatch [:request-all-groups]]]}))

(reg-event-db :save-member.failure
  (fn [db [_ response]]
    (errorf "Failed to retrieve members %s" response)
    db))

(reg-event-fx :add-member!
  (fn [{:keys [db]} [_ group {:keys [email alias] :as member}]]
    (infof "Creating member: %s" member)
    {:http-xhrio {:method          :post
                  :uri             (gstr/format "/groups/%s/members" (:group-id group))
                  :params          member
                  :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                      "test"))
                                    :Content-Type "application/json"}
                  :format          (ajax/json-request-format)
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success      [:save-member.success]
                  :on-failure      [:save-member.failure]}
     :db         (assoc db :loading? true)}))


(reg-event-fx :delete-member.success
  (fn [cofx [_ response]]
    (infof "Deleted member `%s`" response)
    {:db (:db cofx)
     :fx [[:dispatch [:request-all-groups]]]}))

(reg-event-db :delete-member.failure
  (fn [db [_ response]]
    (errorf "Failed to delete member %s" response)
    db))

(reg-event-fx :delete-member!
  (fn [{:keys [db]} [_ group member-id]]
    (infof "Deleting member %s from group %s" member-id group)
    {:http-xhrio {:method          :delete
                  :uri             (gstr/format "/groups/%s/members/%s" (:group-id group) member-id)
                  :headers         {:Authorization (str "Bearer " (or (.-token (:keycloak db))
                                                                      "test"))}
                  :format          (ajax/json-request-format)
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success      [:delete-member.success]
                  :on-failure      [:delete-member.failure]}
     :db         (assoc db :loading? true)}))
