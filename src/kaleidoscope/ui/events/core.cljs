(ns kaleidoscope.ui.events.core
  (:require [kaleidoscope.ui.db :refer [default-db]]
            [kaleidoscope.ui.clients.keycloak :as keycloak]
            [goog.string :as gstr]
            [goog.object :as gobj]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [day8.re-frame.async-flow-fx :as async-flow-fx]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-fx :boot
  (fn [_ _]
    (infof "Initializing the web app!")
    {:db         default-db
     :async-flow {:first-dispatch [:keycloak-action :init]
                  :rules          [{:when       :seen?
                                    :events     [[::async-flow-fx/notify :success-load-profile]]
                                    :dispatch-n [[:load-all-branches]
                                                 [:load-image-metadata]
                                                 [:request-all-groups]]}
                                   {:when   :seen?
                                    :events [[::async-flow-fx/notify :success-boot]]
                                    :halt?  true}
                                   ]}}))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(reg-event-db :modal
  (fn [db [_ data]]
    (assoc-in db [:modal] data)))

(reg-event-db :show-modal
  (fn [db [_ data]]
    (assoc-in db [:modal] {:show? true
                           :child data})))

(reg-event-db :change-notification-type
  (fn [db [_ notification-type]]
    (assoc db
           :notification-type notification-type
           :login-response    {:status  200
                               :message (gstr/format "An example %s notification" notification-type)})))

(defn set-active-panel [db [_ value]]
  (merge db {:loading?       true
             :active-panel   value
             :active-content nil}))
(reg-event-db :set-active-panel
  set-active-panel)

(defn hash-fragment-effect [path]
  (set! js/parent.location.hash path))

(reg-fx :hash-fragment hash-fragment-effect)

(reg-event-fx :set-hash-fragment
  (fn [cofx [_ path]]
    (infof "Resetting hash fragment to %s" path)
    {:hash-fragment path}))
