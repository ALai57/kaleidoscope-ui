(ns andrewslai.cljs.events.keycloak
  (:require [andrewslai.cljs.keycloak :as keycloak]
            [ajax.core :as ajax]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]
            ))


(reg-event-fx
 :initialize-keycloak
 (fn [cofx [_ _]]
   (infof "Initializing keycloak")
   {:keycloak {:action   :init
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(reg-event-fx
 :keycloak-login
 (fn [cofx _]
   {:keycloak {:action           :login
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(reg-event-fx
 :keycloak-logout
 (fn [cofx _]
   {:keycloak {:action           :logout
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(reg-event-fx
 :keycloak-load-profile
 (fn [cofx _]
   (infof "Loading user profile")
   {:keycloak {:action           :load-profile
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(reg-event-fx
 :keycloak-account-management
 (fn [cofx _]
   {:keycloak {:action           :account-management
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(defn keycloak-effect
  [{:keys [action keycloak-adapter]}]
  (case action
    :account-management (keycloak/account-management! keycloak-adapter)
    :init               (keycloak/initialize! keycloak-adapter
                                              (fn on-success [auth?]
                                                (infof "Successful keycloak initialization")
                                                (when auth?
                                                  (dispatch [:set-hash-fragment "/admin"])
                                                  (dispatch [:keycloak-load-profile])))
                                              (fn on-error [e]
                                                (infof "Keycloak initialization failed")
                                                (js/console.log "Init error" e)))
    :load-profile       (keycloak/load-profile! keycloak-adapter)
    :login              (keycloak/login! keycloak-adapter)
    :logout             (keycloak/logout! keycloak-adapter)))

(reg-fx :keycloak keycloak-effect)


(defn hash-fragment-effect [path]
  (set! js/parent.location.hash path))

(reg-fx :hash-fragment hash-fragment-effect)

(reg-event-fx
 :set-hash-fragment
 (fn [cofx [_ path]]
   (infof "Resetting hash fragment to %s" path)
   {:hash-fragment path}))

(reg-event-db
 :successfully-authenticated
 (fn [db [_ response]]
   (assoc db :login-response {:status 200
                              :body   response})))

(reg-event-db
 :not-authenticated
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
                 :on-success      [:successfully-authenticated]
                 :on-failure      [:not-authenticated]}
    :db         (assoc db
                       :loading? true
                       :login-response nil)}))

(reg-event-db
 :check-identity
 (fn [{:keys [user-profile] :as db} _]
   (infof "Identity: %s" user-profile)
   db))
