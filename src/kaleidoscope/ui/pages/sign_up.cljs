(ns kaleidoscope.ui.pages.sign-up
  (:require ["@stripe/react-stripe-js" :refer [Elements PaymentElement AddressElement useElements]]
            ["@styled-icons/material/CheckBox" :refer [CheckBox]]
            ["@styled-icons/material/WarningAmber" :refer [WarningAmber]]
            ["react" :as react]
            [goog.string :as gstr]
            [kaleidoscope.ui.components.button :refer [button]]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.events :as events]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent-mui.components :refer [stepper step-label step step-content
                                            divider box grid circular-progress typography paper text-field tooltip]]
            [reagent.core :as reagent]))

(defonce stripe-init
  (dispatch [:init-global-stripe!]))

(def DomainAvailableIcon
  [:> CheckBox
   {:color  "green"
    :size   "60px"
    :height "60px"}])

(def DomainNotAvailableIcon
  [:> WarningAmber
   {:color  "red"
    :size   "60px"
    :height "60px"}])


;; TODO: 12-28-24
;; Require an authenticated user
;; Add Login to this page
;; Pass in user details
;; Only display when user is active
(defn stripe-payment
  [{:keys [domain-availability payment-details stripe] :as args}]
  (let [here (.. js/window -location -origin)
        {:keys [intent secret]} payment-details
        elems (useElements)]
    (fn []
      [grid {:item true
             :xs   12}
       [paper {:elevation 10}
        [box {:sx {:padding "20px"}}
         [typography {:variant "h4"}
          "Invoice"]
         [:p (gstr/format "$%s for %s" (/ (:amount intent) 100)
                          (:domain domain-availability))]]]
       [:br]
       [paper {:elevation 10}
        [box {:sx {:padding "20px"}}
         [typography {:variant "h4"}
          "Payment"]
         [:> AddressElement {:options {:mode "billing"}}]
         [:> PaymentElement]
         [:br]
         [button {:text     "Submit"
                  :disabled (or (not stripe)
                                (not elems))
                  :on-click (fn [event]
                              (.preventDefault event)
                              ;; https://docs.stripe.com/stripe-js/react#useelements-hook
                              (js/console.log "Submitted payment!")
                              (->> {:elements      elems
                                    :confirmParams {:return_url (str here "/completed")}}
                                   clj->js
                                   (.confirmPayment ^js stripe))
                              )}]]]])))


;; {:domain safeafsesafesa.com,
;;  :available true,
;;  :prices {:registration-price {:price 14, :currency USD},
;;           :transfer-price {:price 14, :currency USD},
;;           :renewal-price {:price 14, :currency USD},
;;           :change-ownership-price {:price 0, :currency USD},
;;           :restoration-price {:price 57, :currency USD},
;;           :name com}}
(defn domain-name-selector
  [{:keys [domain-availability next-step previous-step]}]
  (let [domain (reagent/atom (get domain-availability :domain ""))]
    (fn []
      [paper {:elevation 10}
       [grid {:container  true
              :alignItems "center"
              :padding    "10px"}
        [grid {:item true
               :xs   6}
         [text-field {:size     "small"
                      :variant  "outlined"
                      :value    @domain
                      :label    "Domain name"
                      :sx       {:margin-right "15px"}
                      :onChange (fn [ev]
                                  (reset! domain (events/event-value ev)))}]]
        [grid {:item           true
               :xs             6
               :padding-bottom "10px"}
         [button {:on-click (fn get-domain-price [e]
                              (.preventDefault e)
                              (dispatch [:get-domain-price @domain]))
                  :text     (if (or (empty? domain-availability)
                                    (= @domain (:domain domain-availability)))
                              "Check availability"
                              "Re-check availability")}]]]
       (let [available (:available domain-availability)
             price (get-in domain-availability [:prices :registration-price :price])]
         [grid {:container  true
                :alignItems "center"
                :padding    "10px"}
          [grid {:item           true
                 :xs             2
                 :justifyContent "left"}

           (if available
             [tooltip {:title (gstr/format "Domain `%s` is available" @domain)}
              DomainAvailableIcon]
             [tooltip {:title (gstr/format "Domain `%s` is not available" @domain)}
              DomainNotAvailableIcon])]
          [grid {:item           true
                 :xs             2
                 :justifyContent "left"}
           [button {:disabled (not available)
                    :on-click next-step
                    :text     (gstr/format "Purchase %s for $%s" (get domain-availability :domain) (or price "--"))}]]])])))

(defn payment-widget
  [{:keys [domain-availability payment-details stripe next-step previous-step] :as args}]
  (let [{:keys [secret intent]} payment-details]
    [grid {:container      true
           :alignItems     "center"
           :justifyContent "center"}
     (cond
       (and secret intent) [:> Elements {:stripe  stripe
                                         :options {:clientSecret (:client-secret secret)
                                                   :loader       "always"}}
                            [:f> stripe-payment args]]

       (:available domain-availability)
       [grid {:item true
              :xs   12
              :sm   10
              :md   8
              :lg   6
              :xl   4}
        [:h2 "Loading payments"]
        [circular-progress]]
       )]))

(def active-step
  (reagent/atom 0))

(def steps
  "Steps defines each step in the stepper component -
   Each step shows up a step in a linear progress bar"
  [{:label         "Select a domain name"
    :caption       [typography {:variant "caption"}
                    "For recent top level domain name market prices (`.com`, `.net` etc) refer to "
                    [:a {:href "https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf"}
                     "this AWS document."]]
    :content       domain-name-selector
    :next-step     (fn []
                     (println "Next step" @active-step)
                     (swap! active-step inc)
                     (dispatch [:generate-payment-for-domain!]))
    :previous-step (fn []
                     (println "No previous steps"))
    }
   {:label         "Payment"
    :caption       [typography {:variant "caption"}
                    "All payment processing is handled by " [:a {:href "https://stripe.com"}
                     "Stripe"]]
    :content       payment-widget
    :next-step     (fn []
                     (println "No next steps"))
    :previous-step (fn []
                     (println "Prev step" @active-step)
                     (swap! active-step dec))
    }])

(defn -sign-up
  [{:keys [payment-details stripe domain-availability] :as args}]
  [grid {:container       true
         :align-items     "center"
         :justify-content "center"}
   [stepper {:active-step @active-step
             :orientation "vertical"}
    (for [{:keys [content label caption description next-step previous-step] :as stage} steps]
      [step {:key label}
       [:<>
        [step-label {:optional (when caption (reagent/as-element caption))}
         label]
        [step-content {}
         [typography description]

         (when content
           ^{:key args}
           [:f> content (assoc args
                          :next-step next-step
                          :previous-step previous-step)])
         ]]])]]

  )

;; Payment details
;; {:intent {}
;;  :secret {}
;;  :domain-availability {}}
(defn sign-up
  [{:keys [user notification-type]}]
  (let [payment-details (subscribe [:payment-details])
        stripe (subscribe [:stripe])]
    (fn []
      [:div {:style {:height   "100%"
                     :width    "100%"
                     :position "absolute"}}
       [nav/nav-bar {:user              user
                     :notification-type notification-type}]

       [:f> -sign-up {:payment-details @payment-details
                      :stripe          @stripe}]])))
