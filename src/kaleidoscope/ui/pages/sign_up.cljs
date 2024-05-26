(ns kaleidoscope.ui.pages.sign-up
  (:require ["@stripe/react-stripe-js" :refer [Elements PaymentElement]]
            ["@stripe/stripe-js" :refer [loadStripe]]
            ["react" :as react]
            [kaleidoscope.ui.clients.stripe :as stripe]
            [kaleidoscope.ui.components.navbar :as nav]
            [re-frame.core :refer [dispatch]]
            [reagent-mui.components :refer [grid circular-progress]]
            ))

(def stripe-promise
  (loadStripe stripe/API_KEY))


(defn -sign-up
  [{:keys [payment-secret]}]
  (react/useEffect (fn []
                     (dispatch [:get-payment-secret])
                     js/undefined)
                   (clj->js []))
  [grid {:container      true
         :alignItems     "center"
         :justifyContent "center"}

   (if payment-secret
     [:> Elements {:stripe  stripe-promise
                   :options {:clientSecret (:client-secret payment-secret)
                             :loader       "always"}}
      [grid {:item true
             :xs   12
             :sm   10
             :md   8
             :lg   6
             :xl   4}
       [:form {:onSubmit (fn [event]
                           (.preventDefault event)
                           ;; Do stuff
                           ;; https://docs.stripe.com/stripe-js/react#useelements-hook
                           (js/console.log "Submitted payment!")
                           )}
        [:> PaymentElement]
        [:button "Submit"]]]]
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

   [:h1 "Payments"]
   [:f> -sign-up {:payment-secret payment-secret}]
   ])
