(ns kaleidoscope.pub.events.core
  (:require [day8.re-frame.async-flow-fx :as async-flow-fx]
            [goog.string :as gstr]
            [kaleidoscope.pub.db :refer [default-db]]
            [re-frame.core :refer [reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]))

(reg-event-fx :boot
  (fn [_ _]
    (infof "Initializing the kaleidoscope.pub app!")
    {:db         default-db
     :async-flow {:first-dispatch [:keycloak-action :init]
                  :rules          [{:when   :seen?
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
