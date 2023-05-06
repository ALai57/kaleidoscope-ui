(ns kaleidoscope.cljs.events.keycloak
  (:require [kaleidoscope.cljs.keycloak :as keycloak]
            [kaleidoscope.cljs.utils :as u]
            [ajax.core :as ajax]
            [day8.re-frame.async-flow-fx :as async-flow-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [debugf infof warnf]]))

(reg-event-fx
 :keycloak-action
 (fn [cofx [_ action]]
   (infof "Keycloak action: %s" action)
   {:keycloak {:action           action
               :keycloak-adapter (get-in cofx [:db :keycloak])}}))

(defn keycloak-effect
  [{:keys [action keycloak-adapter]}]
  (case action
    :account-management (keycloak/account-management! keycloak-adapter)
    :init               (keycloak/initialize! keycloak-adapter
                                              (fn on-success [auth?]
                                                (infof "Successful keycloak initialization")
                                                (if auth?
                                                  (do (debugf "Found authenticated user!")
                                                      (dispatch [:keycloak-action :load-profile]))
                                                  (do (warnf "No authenticated user found.")
                                                      (dispatch [::async-flow-fx/notify :success-boot]))))
                                              (fn on-error [e]
                                                (infof "Keycloak initialization failed")
                                                (js/console.log "Init error" e)))
    :load-profile       (keycloak/load-profile! keycloak-adapter
                                                (fn [user]
                                                  (dispatch [:update-user-profile! (u/clojurize user)]))
                                                (fn [_]
                                                  (warnf "Could not load user")))
    :login              (keycloak/login! keycloak-adapter)
    :logout             (keycloak/logout! keycloak-adapter)))

(reg-fx :keycloak keycloak-effect)
