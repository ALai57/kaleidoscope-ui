(ns kaleidoscope.cljs.events.auth
  (:require [ajax.core :as ajax]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-db
 :success-request-admin-route
 (fn [db [_ response]]
   (assoc db :login-response {:status 200
                              :body   response})))

(reg-event-db
 :failure-request-admin-route
 (fn [db [_ response]]
   (assoc db :login-response {:status nil
                              :body   response})))

(reg-event-fx
 :request-admin-route
 (fn [{:keys [db]} [_]]
   {:http-xhrio {:method          :get
                 :uri             "/admin"
                 :headers         {:Authorization (str "Bearer " (.-token (:keycloak db)))}
                 ;; The response isn't in JSON when the user is not
                 ;; authenticated - they just get a 401
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:success-request-admin-route]
                 :on-failure      [:failure-request-admin-route]}
    :db         (assoc db
                       :loading? true
                       :login-response nil)}))
