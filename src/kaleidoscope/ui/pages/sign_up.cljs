(ns kaleidoscope.ui.pages.sign-up
  (:require ["@stripe/react-stripe-js" :refer [Elements PaymentElement useElements]]
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

(defn stripe-payment
  [{:keys [payment-details stripe] :as args}]
  (let [here                    (.. js/window -location -href)
        {:keys [intent secret]} payment-details
        elems                   (useElements)]
    (fn []
      (println "Intent" intent)
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
         [:p (gstr/format "$%s for %s" (/ (:amount intent) 100)
                          (get-in payment-details [:domain-availability :domain]))]]]
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
                              (->> {:elements      elems
                                    :confirmParams {:return_url (str here "?completed")}}
                                   clj->js
                                   (.confirmPayment ^js stripe))
                              )}]]]])))

(defn select-plan
  [{:keys [payment-details]}]
  (let [{:keys [secret intent domain-availability]} payment-details

        domain (reagent/atom (get domain-availability :domain ""))]
    (fn []
      ;;(println "Payment details" payment-details)
      [paper {:elevation 10}
       [grid {:container  true
              :alignItems "center"
              :padding    "10px"}
        [grid {:item           true
               :xs             12
               :padding-bottom "10px"}
         #_[typography {:variant "h4"}
            "Select a domain name"]
         ;;[divider]
         #_[typography {:variant "p"}
            "For top level domain name market prices (`.com`, `.net` etc) see "
            [:a {:href "https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf"}
             "this AWS pricing document."]]]
        [grid {:item true
               :xs 12}
         [typography {:variant "h5"}
          "Domain availability checker"]]
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
               :xs             4
               :padding-bottom "10px"}
         [button {:on-click (fn generate-payment! [e]
                              (.preventDefault e)
                              (dispatch [:generate-payment-for-domain! @domain]))
                  :text "Check"}]]
        [grid {:item           true
               :xs             2
               :justifyContent "left"}
         (if (:available domain-availability)
           [tooltip {:title (gstr/format "Domain `%s` is available" @domain)}
            [:> CheckBox {:color  "green"
                          :size   "60px"
                          :height "60px"}]]
           [tooltip {:title (gstr/format "Domain `%s` is not available" @domain)}
            [:> WarningAmber {:color  "red"
                              :size   "60px"
                              :height "60px"}]])
         ]]])))

(def steps
  [{:label   "Select a domain name"
    :caption [typography {:variant "caption"}
              "For recent top level domain name market prices (`.com`, `.net` etc) refer to "
              [:a {:href "https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf"}
               "this AWS document."]]
    :content select-plan}
   {:label       "View invoice"
    :description "Verify the purchase price for the domain"}
   {:label       "Payment"
    :description "Pay to register the domain and set it up"}])

(defn -sign-up
  [{:keys [payment-details stripe] :as args}]
  (let [{:keys [secret intent domain-availability]} payment-details]
    [grid {:container true
           :align-items "center"
           :justify-content "center"}
     [stepper {:active-step 0
               :orientation "vertical"}
      (for [stage steps]
        [step {:key (:label stage)}
         [:<>
          [step-label {:optional (when-let [caption (:caption stage)]
                                   (reagent/as-element caption))}
           (:label stage)]
          [step-content {}
           [typography (:description stage)]

           ^{:key domain-availability}
           (when-let [content (:content stage)]
             [:f> content {:payment-details payment-details}])]]])]]

    #_[grid {:container      true
             :alignItems     "center"
             :justifyContent "center"}
       #_[grid {:item true
                :xs   12
                :sx   {:paddingBottom "25px"}}
          [typography {:textAlign "center"
                       :variant   "h4"}
           "Sign up"]]
       [grid {:item true
              :xs   12
              :sx   {:margin-bottom "15px"}}
        [grid {:container      true
               :alignItems     "center"
               :justifyContent "center"}
         [grid {:item true
                :xs   12
                :sm   10
                :md   8
                :lg   6
                :xl   4}
          ^{:key domain-availability}
          [:f> select-plan {:payment-details payment-details}]]]]

       (cond
         (and secret intent)              [:> Elements {:stripe  stripe
                                                        :options {:clientSecret (:client-secret secret)
                                                                  :loader       "always"}}
                                           [:f> stripe-payment args]]
         (:available domain-availability) [grid {:item true
                                                 :xs   12
                                                 :sm   10
                                                 :md   8
                                                 :lg   6
                                                 :xl   4}
                                           [:h2 "Loading payments"]
                                           [circular-progress]]
         )])

  )

;; Payment details
;; {:intent {}
;;  :secret {}
;;  :domain-availability {}}
(defn sign-up
  [{:keys [user notification-type]}]
  (let [payment-details (subscribe [:payment-details])
        stripe          (subscribe [:stripe])]
    (fn []
      [:div {:style {:height   "100%"
                     :width    "100%"
                     :position "absolute"}}
       [nav/nav-bar {:user              user
                     :notification-type notification-type}]

       [:f> -sign-up {:payment-details @payment-details
                      :stripe          @stripe}]])))
