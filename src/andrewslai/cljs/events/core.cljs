(ns andrewslai.cljs.events.core
  (:require [andrewslai.cljs.db :refer [default-db]]
            [andrewslai.cljs.keycloak :as keycloak]
            [goog.string :as gstr]
            [re-frame.core :refer [dispatch reg-event-db]]
            [taoensso.timbre :refer-macros [infof]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(reg-event-db
 :initialize-db
 (fn [_ _]
   default-db))

(reg-event-db
 :update-user-profile!
 (fn [db [_ userinfo]]
   (infof "Updating user profile: %s" userinfo)
   (assoc db :user-profile userinfo)))

(reg-event-db
 :modal
 (fn [db [_ data]]
   (assoc-in db [:modal] data)))

(reg-event-db
 :show-modal
 (fn [db [_ data]]
   (assoc-in db [:modal] {:show? true
                          :child data})))

(reg-event-db
 :change-notification-type
 (fn [db [_ notification-type]]
   (assoc db
          :notification-type notification-type
          :login-response    {:status  200
                              :message (gstr/format "An example %s notification" notification-type)})))

(defn set-active-panel [db [_ value]]
  (merge db {:loading?       true
             :active-panel   value
             :active-content nil}))
(reg-event-db
 :set-active-panel
 set-active-panel)
