(ns kaleidoscope.ui.components.colors.saturation-lightness-grid
  (:require [goog.string :as gstr]
            [reagent.core :as reagent]))

(defn hsl
  [hue saturation lightness]
  (gstr/format "hsl(%s, %s%, %s%)" hue saturation lightness))

(defn calculate-sl-coordinates
  "Calculate the saturation (x), lightness (y) coordinates"
  [grid-ref event]
  (let [event-x (.-clientX event)
        event-y (.-clientY event)

        container-target (.getBoundingClientRect grid-ref)
        container-x      (.-x container-target)
        container-y      (.-y container-target)
        container-w      (.-width container-target)
        container-h      (.-height container-target)

        x (- container-x event-x)
        y (- container-y event-y)

        saturation (-> x
                       (/ container-w)
                       (* 100)
                       (-))
        lightness  (-> y
                       (/ container-h)
                       (* 100)
                       (+ 100))]

    ;;(println [event-x event-y] [container-x container-y] [container-w container-h])
    ;;(js/console.log "Event coordinates: " x "," y)
    ;;(js/console.log "New Saturation: " saturation ", New lightness" lightness)
    ;;(js/console.log (.-target event))

    [saturation lightness]
    ))

(defn -centered-dot
  [{:keys [radius opacity]}]
  [:div {:class "centered"
         :style {:position "relative"
                 :transform (gstr/format "translateX(-%spx) translateY(-%spx)"
                                         radius
                                         radius)}}
   [:div {:class "dot"
          :style {:width        (str (* radius 2) "px")
                  :height       (str (* radius 2) "px")
                  :opacity      (or opacity "50%")
                  :borderRadius "50%"
                  :position     "relative"
                  :background   "white"}}]])

(defn- marker
  [{:keys [border-size radius opacity saturation lightness activate deactivate]}]
  (let [normalized-saturation (* border-size (/ saturation 100))
        normalized-lightness  (- (* border-size (/ lightness 100)))]
    [:div {:on-mouse-down (fn [event]
                            (.stopPropagation event)
                            (js/console.log "down")
                            (activate event))
           :on-mouse-up   (fn [event]
                            (.stopPropagation event)
                            (deactivate event))
           :style         {:position "relative"
                           :transform (gstr/format "translateX(%spx) translateY(%spx)"
                                                   normalized-saturation
                                                   normalized-lightness)}}

     [:div {:class "origin-bottom-left"
            :style {:position  "absolute"
                    :transform (gstr/format "translateY(%spx)" border-size)}}
      [-centered-dot {:radius  radius
                      :opacity (or opacity "50%")}]]]))

(defn clamp
  [val {:keys [min max]
        :or   {min 0
               max 100}}]
  (cond
    (< val min) min
    (> val max) max
    :else       val))

(defn deg->rad
  [deg]
  (/ (* deg Math/PI)
     180))

(defn secondary-marker
  [{:keys [base-saturation base-lightness r theta]
    :or   {r     20
           theta -45}}]
  (let [dx (-> (deg->rad theta)
               (Math/cos)
               (* r))

        dy (-> (deg->rad theta)
               (Math/sin)
               (* r))

        new-saturation (+ base-saturation dx)
        new-lightness  (+ base-lightness dy)]
    ;;(println new-saturation new-lightness)
    {:saturation new-saturation
     :lightness  new-lightness}))

(defn saturation-lightness-grid
  [{:keys [grid-size on-change
           saturation-state lightness-state
           hue]}]
  (let [!grid-ref      (reagent/atom nil)
        active-element (reagent/atom nil)

        grid-props {:width    (str grid-size "px")
                    :height   (str grid-size "px")
                    :position "absolute"}

        marker-props {:activate    (fn [event] (reset! active-element (.-target event)))
                      :deactivate  (fn [_event] (reset! active-element nil))
                      :radius      10
                      :border-size grid-size}

        r     15
        theta 45]
    (fn []
      [:div {:ref           (fn [el] (reset! !grid-ref el))
             :on-mouse-move (fn [event]
                              (.stopPropagation event)
                              (when @active-element
                                (let [[new-saturation new-lightness] (calculate-sl-coordinates @!grid-ref event)

                                      new-saturation (clamp new-saturation {:min 0 :max 100})
                                      new-lightness  (clamp new-lightness {:min 0 :max 100})]
                                  (reset! lightness-state new-lightness)
                                  (reset! saturation-state new-saturation)
                                  (on-change {:saturation new-saturation
                                              :lightness  new-lightness
                                              :r          r
                                              :theta      theta}))))
             :on-mouse-up   (fn [event]
                              (.stopPropagation event))
             :on-mouse-down (fn [event]
                              (.stopPropagation event))
             :on-click      (fn [event]
                              (.stopPropagation event))
             :position      "absolute"
             :style         grid-props
             "z-index"      100}

       ;; Make the 2d saturation-lightness grid out of 3 overlapping gradients
       [:div {:style (merge grid-props {:background (hsl hue 100 50)})}]
       [:div {:style (merge grid-props {:background "linear-gradient(to right, #fff, rgba(255,255,255,0))"})}]
       [:div {:style (merge grid-props {:background "linear-gradient(to top, #000, rgba(0,0,0,0))"})}]

       [marker (merge marker-props
                      {:saturation @saturation-state
                       :lightness  @lightness-state})]
       [marker (merge marker-props
                      (secondary-marker {:base-saturation @saturation-state
                                         :base-lightness  @lightness-state
                                         :r               (* r -2)
                                         :theta           theta
                                         }))]
       [marker (merge marker-props
                      (secondary-marker {:base-saturation @saturation-state
                                         :base-lightness  @lightness-state
                                         :r               (- r)
                                         :theta           theta
                                         }))]
       [marker (merge marker-props
                      (secondary-marker {:base-saturation @saturation-state
                                         :base-lightness  @lightness-state
                                         :r               r
                                         :theta           theta}))]
       [marker (merge marker-props
                      (secondary-marker {:base-saturation @saturation-state
                                         :base-lightness  @lightness-state
                                         :r               (* 2 r)
                                         :theta           theta}))]])))
