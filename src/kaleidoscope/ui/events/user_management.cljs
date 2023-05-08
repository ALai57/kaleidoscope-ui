(ns kaleidoscope.ui.events.user-management
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [day8.re-frame.async-flow-fx :as async-flow-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-fx :update-user-profile!
  (fn [cofx [_ userinfo]]
    (infof "Updating user profile: %s" userinfo)
    {:db (assoc (:db cofx) :user-profile userinfo)
     :fx [[:dispatch [::async-flow-fx/notify :success-load-profile]]]}))

(reg-event-db :check-identity
  (fn [{:keys [user-profile] :as db} _]
    (infof "Identity: %s" user-profile)
    db))



(reg-event-db :request-admin-route.success
  (fn [db [_ response]]
    (assoc db :login-response {:status 200
                               :body   response})))

(reg-event-db :request-admin-route.failure
  (fn [db [_ response]]
    (assoc db :login-response {:status nil
                               :body   response})))

(reg-event-fx :request-admin-route
  (fn [{:keys [db]} [_]]
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/get-groups)
                              (scope-client/with-authorization token))
                          {:on-success      [:request-admin-route.success]
                           :on-failure      [:request-admin-route.failure]})
       :db         (assoc db :login-response nil)})))
