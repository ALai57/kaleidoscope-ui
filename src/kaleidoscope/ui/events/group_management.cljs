(ns kaleidoscope.ui.events.group-management
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [day8.re-frame.http-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx]]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf errorf]]))


(reg-event-db :load-all-groups.success
  (fn [db [_ response]]
    (infof "Retrieved all groups: found %s" (count response))
    (debugf "groups %s" response)
    (assoc db :groups response)))

(reg-event-db :load-all-groups.failure
  (fn [db [_ response]]
    (errorf "Failed to retrieve groups %s" response)
    db))

(reg-event-fx :request-all-groups
  (fn [{:keys [db]} [_]]
    (infof "Requesting all groups")
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/get-groups)
                              (scope-client/with-authorization token))
                          {:on-success [:load-all-groups.success]
                           :on-failure [:load-all-groups.failure]})})))



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
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/add-group! group-name)
                              (scope-client/with-authorization token))
                          {:on-success      [:save-group.success]
                           :on-failure      [:save-group.failure]})})))


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
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/delete-group! group)
                              (scope-client/with-authorization token))
                          {:on-success      [:delete-group.success]
                           :on-failure      [:delete-group.failure]})})))



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
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/add-group-member! group member)
                              (scope-client/with-authorization token))
                          {:on-success [:save-member.success]
                           :on-failure [:save-member.failure]})})))


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
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/delete-group-member! group member-id)
                              (scope-client/with-authorization token))
                          {:on-success [:delete-member.success]
                           :on-failure [:delete-member.failure]})})))
