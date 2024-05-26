(ns kaleidoscope.ui.events.payments
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf debugf]]))


(reg-event-db :get-payment-secret.success
  (fn get-payment-secret-success
    [db [_ response]]
    (infof "Retrieved payment secret successfully!")
    (assoc db :payment-secret response)))

(reg-event-db :get-payment-secret.failure
  (fn get-payment-secret-failure
    [db [_ response]]
    (errorf "Failed to retrieve payment-secret %s" response)
    db))

(reg-event-fx :get-payment-secret
  (fn [{:keys [db]} [_]]
    (infof "Requesting Payment Secret")
    {:http-xhrio (merge (scope-client/get-payment-secret)
                        {:on-success [:get-payment-secret.success]
                         :on-failure [:get-payment-secret.failure]})}))
