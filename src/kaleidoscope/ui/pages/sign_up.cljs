(ns kaleidoscope.ui.pages.sign-up
  (:require ["@stripe/react-stripe-js" :refer [Elements PaymentElement useStripe useElements]]
            ["@stripe/stripe-js" :refer [loadStripe]]
            ["@styled-icons/material/CheckBox" :refer [CheckBox]]
            ["@styled-icons/material/WarningAmber" :refer [WarningAmber]]
            ["react" :as react]
            [goog.string :as gstr]
            [kaleidoscope.ui.clients.stripe :as stripe]
            [kaleidoscope.ui.components.button :refer [button]]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.utils.events :as events]
            [re-frame.core :refer [dispatch]]
            [reagent-mui.components :refer [box grid circular-progress typography paper text-field tooltip]]
            [reagent.core :as reagent]
            ))

(def stripe-promise
  (loadStripe stripe/API_KEY))

(defn stripe-payment
  [{:keys [payment-secret]}]
  (let [here           (.. js/window -location -href)
        payment-intent (reagent/atom nil)]
    (fn []
      (let [stripe (useStripe)
            elems  (useElements)
            here   (.. js/window -location -href)]
        (react/useEffect (fn []
                           (when stripe
                             (js/console.log)
                             (.then (.retrievePaymentIntent stripe payment-secret)
                                    (fn [pi]
                                      (js/console.log "Pay intent" pi)
                                      (reset! payment-intent (:paymentIntent (u/clojurize pi))))))
                           js/undefined)
                         (clj->js [stripe]))
        [grid {:item true
               :xs   12
               :sm   10
               :md   8
               :lg   6
               :xl   4}
         [paper {:elevation 10}
          [box {:sx {:padding "20px"}}
           [typography {:variant "h4"}
            "Invoice"]
           [:p (str "Amount $" (/ (:amount @payment-intent) 100)
                    ". Market price for the domain name:")
            [:a {:href "https://google.com"} "google.com"]]

           ]]
         [:br]
         [paper {:elevation 10}
          [box {:sx {:padding "20px"}}
           [typography {:variant "h4"}
            "Payment"]
           [:> PaymentElement]
           [:br]
           [button {:text     "Submit"
                    :disabled (or (not stripe)
                                  (not elems))
                    :on-click (fn [event]
                                (.preventDefault event)

                                ;; https://docs.stripe.com/stripe-js/react#useelements-hook
                                (js/console.log "Submitted payment!")
                                ;;(js/console.log elems)
                                ;;(js/console.log stripe)
                                (->> {:elements      elems
                                      :confirmParams {:return_url (str here "?completed")}}
                                     clj->js
                                     (.confirmPayment stripe))
                                )}]]]]))))

(def check-box
  (reagent/create-element CheckBox))

(defn -select-plan
  []
  (let [domain (reagent/atom "")]
    (fn []
      [paper {:elevation 10}
       [grid {:container  true
              :alignItems "center"
              :padding    "10px"}
        [grid {:item           true
               :xs             12
               :padding-bottom "10px"}
         [typography {:variant "h4"}
          "Select a domain name"]]
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
               :justifyContent "left"}
         (if true
           [tooltip {:title (gstr/format "Domain `%s` is available" @domain)}
            [:> CheckBox {:color  "green"
                          :size   "small"
                          :height "60px"}]]
           [tooltip {:title (gstr/format "Domain `%s` is not available" @domain)}
            [:> WarningAmber {:color  "red"
                              :size   "small"
                              :height "60px"}]])
         ]]])))

(defn -sign-up
  [{:keys [payment-secret]}]
  (react/useEffect (fn []
                     (dispatch [:get-payment-secret])
                     js/undefined)
                   (clj->js []))

  [grid {:container      true
         :alignItems     "center"
         :justifyContent "center"}
   [grid {:item true
          :xs   12
          :sx   {:paddingBottom "25px"}}
    [typography {:textAlign "center"
                 :variant   "h2"}
     "Sign up"]]
   [grid {:item true
          :xs   12
          :sx   {:margin-bottom "15px"}}
    [grid {:container      true
           :alignItems     "center"
           :justifyContent "center"}
     [grid {:item true
            :xs   4}
      [:f> -select-plan]]]]

   (if payment-secret
     [:> Elements {:stripe  stripe-promise
                   :options {:clientSecret (:client-secret payment-secret)
                             :loader       "always"}}
      [:f> stripe-payment {:payment-secret (:client-secret payment-secret)}]]
     [grid {:item true
            :xs   12
            :sm   10
            :md   8
            :lg   6
            :xl   4}
      [:h2 "Loading payments"]
      [circular-progress]]
     )]

  )

(defn sign-up [{:keys [user notification-type payment-secret]}]
  ;;(println "Payment secret" payment-secret)
  [:div {:style {:height   "100%"
                 :width    "100%"
                 :position "absolute"}}
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]

   [:f> -sign-up {:payment-secret payment-secret}]
   ])
