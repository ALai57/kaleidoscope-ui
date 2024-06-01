(ns kaleidoscope.ui.events.payments
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf debugf]]))


(def example-get-domain-success
  {:domain    "abcdeddddddf.com"
   :available true
   :prices    [{
                :registration-price     {:price 14 :currency "USD"}
                :transfer-price         {:price 14 :currency "USD"}
                :renewal-price          {:price 14 :currency "USD"}
                :change-ownership-price {:price 0 :currency "USD"}
                :restoration-price      {:price 57 :currency "USD"}
                :name                   "com"}
               ]})

(def example-get-domain-unavailable
  {:domain    "abcdeddddddf.com"
   :available false})

(reg-event-db :get-domain-price.success
  (fn get-domain-price-success
    [db [_ response]]
    (infof "Retrieved domain availability successfully!")
    (assoc-in db [:payment-details :domain-availability] response)))

(reg-event-db :get-domain-price.failure
  (fn get-domain-price-failure
    [db [_ response]]
    (errorf "Failed to retrieve domain availability %s" response)
    (assoc-in db [:payment-details :domain-availability] nil)))

(reg-event-fx :get-domain-price
  (fn [{:keys [db]} [_ domain]]
    (infof "Requesting Payment Secret")
    {:http-xhrio (merge (scope-client/get-domain-availability domain)
                        {:on-success [:get-domain-price.success]
                         :on-failure [:get-domain-price.failure]})}))


(reg-event-db :update-payment-details!.success
  (fn update-payment-details!-success
    [db [_ response]]
    (infof "Retrieved payment secret successfully!")
    (assoc db :payment-secret response)))

(reg-event-db :update-payment-details!.failure
  (fn update-payment-details!-failure
    [db [_ response]]
    (errorf "Failed to retrieve payment-secret %s" response)
    db))

(reg-event-fx :update-payment-details!
  (fn [{:keys [db]} [_ {:keys [price] :as payment}]]
    (infof "Requesting Payment Secret")
    {:http-xhrio (merge (scope-client/new-payment-secret! payment)
                        {:on-success [:update-payment-details!.success]
                         :on-failure [:update-payment-details!.failure]})}))
