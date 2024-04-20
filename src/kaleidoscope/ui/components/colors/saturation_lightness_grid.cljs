(ns kaleidoscope.ui.components.colors.saturation-lightness-grid
  (:require [goog.string :as gstr]
            [reagent.core :as reagent]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn hsl
  [hue saturation lightness]
  (gstr/format "hsl(%s, %s%, %s%)" hue saturation lightness))

(defn deg->rad
  [deg]
  (/ (* deg Math/PI)
     180))

(defn rad->deg
  [rad]
  (* 180 (/ rad Math/PI)))

(defn clamp
  [val {:keys [min max]
        :or   {min 0
               max 100}}]
  (cond
    (< val min) min
    (> val max) max
    :else       val))

(defn euclidean-distance
  [[x1 y1] [x2 y2]]
  (Math/sqrt
   (+ (Math/pow (- x1 x2) 2)
      (Math/pow (- y1 y2) 2))))

(defn coords->rads
  [x y]
  (js/Math.atan2 x y))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Coordinate grid helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
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

    {:saturation saturation
     :lightness  lightness}))

(defn calculate-marker-coordinates
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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Components
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn -centered-dot
  [{:keys [radius opacity units-from-origin]}]
  [:div {:class "centered"
         :style {:position  "relative"
                 :transform (gstr/format "translateX(-%spx) translateY(-%spx)"
                                         radius
                                         radius)}}
   [:div {:class           "dot"
          :unitsfromorigin units-from-origin
          :style           {:width        (str (* radius 2) "px")
                            :height       (str (* radius 2) "px")
                            :opacity      (or opacity "50%")
                            :borderRadius "50%"
                            :position     "relative"
                            :background   "white"}}]])

(defn- marker
  [{:keys [border-size radius opacity units-from-origin
           base-saturation base-lightness r theta
           activate deactivate]}]
  (let [{:keys [saturation lightness]} (calculate-marker-coordinates {:base-saturation base-saturation
                                                                      :base-lightness  base-lightness
                                                                      :r               r
                                                                      :theta           theta})

        normalized-saturation (* border-size (/ saturation 100))
        normalized-lightness  (- (* border-size (/ lightness 100)))]
    [:div {:on-mouse-down (fn [event]
                            (.stopPropagation event)
                            (activate event))
           :on-mouse-up   (fn [event]
                            (.stopPropagation event)
                            (deactivate event))
           :style         {:position  "relative"
                           :transform (gstr/format "translateX(%spx) translateY(%spx)"
                                                   normalized-saturation
                                                   normalized-lightness)}}

     [:div {:class "origin-bottom-left"
            :style {:position  "absolute"
                    :transform (gstr/format "translateY(%spx)" border-size)}}
      [-centered-dot {:radius            radius
                      :units-from-origin units-from-origin
                      :opacity           (str (or opacity 50) "%")}]]]))

(defn translate-origin!
  [{:keys [mouse-coordinates origin on-change]}]
  ;;(println "Translating origin")
  (let [{:keys [saturation lightness]} mouse-coordinates

        saturation (clamp saturation {:min 0 :max 100})
        lightness  (clamp lightness {:min 0 :max 100})]
    (swap! origin merge {:lightness  lightness
                         :saturation saturation})
    (on-change @origin)))

(defn rotate!
  [{:keys [mouse-coordinates origin on-change units-from-origin]}]
  ;;(println "Rotating about origin")
  (let [{:keys [saturation lightness]} mouse-coordinates
        saturation                     (clamp saturation {:min 0 :max 100})
        lightness                      (clamp lightness {:min 0 :max 100})

        {origin-saturation :saturation
         origin-lightness  :lightness} @origin

        new-spacing (/ (euclidean-distance [saturation lightness]
                                           [origin-saturation origin-lightness])
                       units-from-origin)

        dx        (- origin-saturation saturation)
        dy        (- origin-lightness lightness)
        new-theta (- 90 (rad->deg (coords->rads dx dy)))
        ]
    ;;(js/console.log new-spacing new-theta)
    (swap! origin merge {:spacing new-spacing
                         :theta   new-theta})
    (on-change @origin)))

(defn saturation-lightness-grid
  [{:keys [grid-size on-change origin]}]
  (let [!grid-ref      (reagent/atom nil)
        active-element (reagent/atom nil)

        grid-props {:width    (str grid-size "px")
                    :height   (str grid-size "px")
                    :position "absolute"}

        origin-marker? (fn [el]
                         (= "0" (.getAttribute el "unitsfromorigin")))]
    (fn []
      [:div {:ref           (fn [el] (reset! !grid-ref el))
             :on-mouse-move
             (fn [event]
               (.stopPropagation event)
               (when @active-element
                 (if (origin-marker? @active-element)
                   (translate-origin! {:mouse-coordinates (calculate-sl-coordinates @!grid-ref event)
                                       :origin            origin
                                       :on-change         on-change})
                   (rotate! {:mouse-coordinates (calculate-sl-coordinates @!grid-ref event)
                             :origin            origin
                             :on-change         on-change
                             :units-from-origin (int (.getAttribute @active-element "unitsfromorigin"))}))))
             :on-mouse-up   (fn [event] (.stopPropagation event))
             :on-mouse-down (fn [event] (.stopPropagation event))
             :on-click      (fn [event] (.stopPropagation event))
             :position      "absolute"
             :style         grid-props
             "z-index"      100}

       ;; Make the 2d saturation-lightness grid out of 3 overlapping gradients
       (for [background [(hsl (:hue @origin) 100 50)
                         "linear-gradient(to right, #fff, rgba(255,255,255,0))"
                         "linear-gradient(to top, #000, rgba(0,0,0,0))"]]
         ^{:key (str "background-component-" background)}
         [:div {:style (merge grid-props
                              {:background background})}])

       (doall
        (for [n (range -2 3)]
          ^{:key (str "marker-" n)}
          [marker {:units-from-origin n
                   :activate          (fn [event] (reset! active-element (.-target event)))
                   :deactivate        (fn [_event] (reset! active-element nil))
                   :radius            10
                   :border-size       grid-size
                   :base-saturation   (:saturation @origin)
                   :base-lightness    (:lightness @origin)
                   :opacity           (if (zero? n) 70 30)
                   :r                 (* n (:spacing @origin))
                   :theta             (:theta @origin)}]))])))
