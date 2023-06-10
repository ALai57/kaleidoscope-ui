(ns kaleidoscope.ui.events.audience-management
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [day8.re-frame.async-flow-fx :as async-flow-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-db :add-audience.success
  (fn [db [_ response]]
    (assoc db :audience-response {:status 200
                                  :body   response})))

(reg-event-db :add-audience.failure
  (fn [db [_ response]]
    (assoc db :audience-response {:status nil
                                  :body   response})))

(reg-event-fx :add-audience
  (fn [{:keys [db]} [_ article group]]
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/add-audience! article group)
                              (scope-client/with-authorization token))
                          {:on-success      [:add-audience.success]
                           :on-failure      [:add-audience.failure]})
       :db         (assoc db :audience-response nil)})))
