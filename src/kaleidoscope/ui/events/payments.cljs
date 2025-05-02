(ns kaleidoscope.ui.events.payments
  (:require ["@stripe/stripe-js" :refer [loadStripe]]
            [day8.re-frame.async-flow-fx :as async-flow-fx]
            [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [kaleidoscope.ui.clients.stripe :as stripe]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf]]))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Domain prices
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :init-global-stripe!.success
  (fn [db [_ stripe-client]]
    (infof "Initialized stripe client!")
    (assoc db :stripe stripe-client)))

(reg-event-db :init-global-stripe!.failure
  (fn [db [_ resp]]
    (errorf "Failed to initialize stripe component %s" resp)
    (assoc db :stripe nil)))

(reg-event-db :set-global-stripe!
  (fn [db [_ stripe]]
    (assoc db :stripe stripe)))

(reg-event-fx :init-global-stripe!
  (fn [{:keys [db] :as cofx} [_ domain]]
    (infof "Initializing global stripe instance")
    (let [stripe-promise (loadStripe stripe/API_KEY)]
      (-> stripe-promise
          (.then (fn [stripe]
                   (js/console.log "Global stripe instance" stripe)
                   (dispatch [:set-global-stripe! stripe])))
          (.catch (fn [stripe]
                    (js/console.log "Global stripe instance" stripe)
                    (dispatch [:set-global-stripe! stripe]))))
      (assoc-in cofx [:db :stripe-promise] stripe-promise))
    ))


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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Domain prices
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-fx :get-domain-price.success
  (fn [cofx [_ response]]
    (infof "Retrieved domain availability successfully!")
    {:db (-> (:db cofx)
             (assoc-in [:domain-availability] response)
             (assoc :payment-details {}))
     :fx [[:dispatch [::async-flow-fx/notify :success-get-domain-availability]]]}))

(reg-event-fx :get-domain-price.failure
  (fn [cofx [_ response]]
    (errorf "Failed to retrieve domain availability %s" response)
    {:db (-> (:db cofx)
             (assoc-in [:domain-availability] nil)
             (assoc :payment-details {}))
     :fx [[:dispatch [::async-flow-fx/notify :failure-get-domain-availability]]]}))

(reg-event-fx :get-domain-price
  (fn [{:keys [db]} [_ domain]]
    (infof "Requesting domain price")
    {:db         db
     :http-xhrio (merge (scope-client/get-domain-availability domain)
                        {:on-success [:get-domain-price.success]
                         :on-failure [:get-domain-price.failure]})}))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Payments
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-fx :prepare-new-payment!.success
  (fn [cofx [_ response]]
    (infof "Retrieved payment secret successfully! %s" response)
    {:db (assoc-in (:db cofx) [:payment-details :secret] response)
     :fx [[:dispatch [::async-flow-fx/notify :success-get-new-payment]]]}))

(reg-event-fx :prepare-new-payment!.failure
  (fn [cofx [_ response]]
    (errorf "Failed to retrieve payment-secret %s" response)
    {:db (assoc-in (:db cofx) [:payment-details :secret] nil)
     :fx [[:dispatch [::async-flow-fx/notify :failure-get-new-payment]]]}))

;; Assumes that the new domain information and pricing is in the global database
;; Uses that to request a new payment secret from the backend
(reg-event-fx :prepare-new-payment!
  (fn [{:keys [db]} [_]]
    (let [{:keys [price currency] :as payment} (get-in db [:domain-availability :prices :registration-price])]
      (when payment
        (infof "Requesting Payment Secret payment $%s.00" price)

        ;; Convert to cents - for some reason, even when currency is in USD, we
        ;; need to adjust by a factor of 100. However, I should make sure that we
        ;; don't end up with outrageous amounts
        (if (> payment 50)
          {}
          {:db         db
           :http-xhrio (merge (scope-client/new-payment-secret! {:amount   (* 100 price)
                                                                 :currency currency})
                              {:on-success [:prepare-new-payment!.success]
                               :on-failure [:prepare-new-payment!.failure]})})))))

(reg-event-fx :fetch-payment-intent!.success
  (fn [cofx [_ response]]
    (infof "Retrieved payment secret successfully! %s" response)
    {:db (assoc-in (:db cofx) [:payment-details :secret] response)
     :fx [[:dispatch [::async-flow-fx/notify :success-get-new-payment]]]}))

(reg-event-fx :fetch-payment-intent!.failure
  (fn [cofx [_ response]]
    (errorf "Failed to retrieve payment-secret %s" response)
    {:db (assoc-in (:db cofx) [:payment-details :secret] nil)
     :fx [[:dispatch [::async-flow-fx/notify :failure-get-new-payment]]]}))

(reg-event-db :set-current-payment-intent!
  (fn [db [_ payment-intent]]
    (assoc-in db [:payment-details :intent] payment-intent)))

;; Assumes that the new domain information and pricing is in the global database
;; Uses that to request a new payment secret from the backend
(reg-event-fx :fetch-payment-intent!
  (fn [{:keys [db]} [_]]
    (infof "Generating a new payment intent")
    (let [stripe (:stripe db)
          secret (get-in db [:payment-details :secret :client-secret])]
      (when stripe
        (-> ^js stripe
            (.retrievePaymentIntent secret)
            (.then (fn [pi]
                     (js/console.log "Current Payment Intent" pi)
                     (dispatch [:set-current-payment-intent! (:paymentIntent (u/clojurize pi))])))))
      {:db db})))


(reg-event-fx :generate-payment-for-domain!
  (fn [{:keys [db]} [_ domain]]
    (infof "Generating a new payment for domain `%s`" domain)
    {:db         (-> db
                     (assoc-in [:payment-details :intent] nil)
                     (assoc-in [:payment-details :secret] nil))
     :async-flow {:first-dispatch [:prepare-new-payment!]
                  :rules          [{:when       :seen?
                                    :events     [[::async-flow-fx/notify :success-get-new-payment]]
                                    :dispatch-n [[:fetch-payment-intent!]]}]}}))
