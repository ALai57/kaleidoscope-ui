(ns kaleidoscope.ui.components.colors.color-wheel
  (:require [goog.string :as gstr]
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Slider" :as slider]
            [kaleidoscope.ui.utils.events :as events]
            [kaleidoscope.ui.components.colors.saturation-lightness-grid :as slg]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [stack input slider typography box grid]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pre-styled components
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def ColorWheel
  ((styled "div")
   (fn [theme]
     (clj->js {:width        "400px"
               :height       "400px"
               :borderRadius "50%"
               :background   "conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red)"}))))

(def ColorBand
  ((styled "div")
   (fn [theme]
     (clj->js {:height       "50px"
               :borderRadius "10px"
               :background   "linear-gradient(to right, red,#ff0,#0f0,#0ff,#00f,#f0f,red)"}))))

(def Donut
  ((styled "div")
   (fn [theme]
     (clj->js {:width        "200px"
               :height       "200px"
               :borderRadius "50%"
               :position     "relative"
               :top          "50%"
               :left         "50%"
               :transform    "translate(-50%,-50%)"
               :background   "white"
               :boxShadow    "inset 0 1px 9px 10px rgb(15 10 2 / 60%)"
               }))))

(def HueMarker
  ((styled "div")
   (fn [theme]
     (clj->js {:borderRadius    "50%"
               :backgroundColor "black"
               :opacity         "65%"
               :width           "20px"
               :height          "20px"
               :position        "absolute"
               :left            "90px"
               :top             "90px"}))))

(def NoTrackSlider
  ((styled slider/default)
   (fn [theme]
     (clj->js {:position             "absolute"
               "& .MuiSlider-thumb"  {:width  "50px"
                                      :height "50px"
                                      :top    "0px"
                                      :border "2px solid black"}
               "& .MuiSlider-track"  {"visibility" "hidden"}
               "& .MuiSlider-rail"   {"visibility" "hidden"}
               "& .MuiSlider-active" {"color" "green"}}))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn coords->rads
  [x y]
  (js/Math.atan2 x y))

(defn rads->deg
  [radians]
  (* radians
     (/ 180 js/Math.PI)))

(defn calculate-angle
  "Calculate the hue's angle in degrees.
  Red is 0 degrees, green is ~120, Blue is ~240"
  [color-wheel event]
  (let [click-x (.-clientX event)
        click-y (.-clientY event)

        container-target (.getBoundingClientRect color-wheel)
        container-x      (.-x container-target)
        container-y      (.-y container-target)
        container-w      (.-width container-target)
        container-h      (.-height container-target)

        x (- container-x click-x)
        y (- container-y click-y)

        ;; Center the container
        offset-x (/ container-w 2)
        offset-y (/ container-h 2)

        final-x (- (+ offset-x x))
        final-y (+ offset-y y)]

    ;;(println [click-x click-y] [container-x container-y])
    ;;(js/console.log "Clicked: " final-x "," final-y)
    ;;(js/console.log (.-target event))

    (-> (coords->rads final-x final-y)
        (rads->deg)
        (+ 360)
        (mod 360)
        )))

(defn hsl
  [hue saturation lightness]
  (gstr/format "hsl(%s, %s%, %s%)" hue saturation lightness))

(defn- mini-square
  [{:keys [size spacing theta n hue lightness saturation]}]
  (let [mini-size (/ size 6)
        padding   (/ mini-size 4)
        position  (case n
                    1 {:left (str padding "px")
                       :top  (str (+ (* 3 padding)
                                     (* 2 mini-size)) "px")}
                    2 {:left (str padding "px")
                       :top  (str (+ (* 2 padding)
                                     (* 1 mini-size)) "px")}
                    3 {:left (str padding "px")
                       :top  (str padding "px")}
                    4 {:left (str (+ (* 2 padding)
                                     (* 1 mini-size)) "px")
                       :top  (str padding "px")}
                    5 {:left (str (+ (* 3 padding)
                                     (* 2 mini-size)) "px")
                       :top  (str padding "px")}
                    )

        new-sl (slg/calculate-marker-coordinates {:base-saturation saturation
                                                  :base-lightness  lightness
                                                  :theta           theta
                                                  :r               (* (case n
                                                                        1 -2
                                                                        2 -1
                                                                        3 0
                                                                        4 1
                                                                        5 2) spacing)})
        color  (hsl hue (:saturation new-sl) (:lightness new-sl))]
    [:div {:style (merge {:width            (str mini-size "px")
                          :height           (str mini-size "px")
                          :position         "absolute"
                          :background-color color}
                         position)}])
  )

(defn- color-squares
  [{:keys [size primary complementary secondary tertiary saturation lightness r theta] :as args}]


  [:div {:style {:width            (str (* 2 size) "px")
                 :height           (str (* 2 size) "px")
                 :background-color "grey"}}
   [stack {:direction "row"}
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl primary saturation lightness)
                   :position         "relative"}}
     (for [n (range 1 6)]
       ^{:key (str "primary-" n)}
       [mini-square (assoc args :n n :hue primary)])]
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl tertiary saturation lightness)
                   :position         "relative"}}
     (for [n (range 1 6)]
       ^{:key (str "tertiary-" n)}
       [mini-square (assoc args :n n :hue tertiary)])
     ]
    ]
   [stack {:direction "row"}
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl secondary saturation lightness)
                   :position         "relative"}}
     (for [n (range 1 6)]
       ^{:key (str "secondary-" n)}
       [mini-square (assoc args :n n :hue secondary)])]
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl complementary saturation lightness)
                   :position         "relative"}}
     (for [n (range 1 6)]
       ^{:key (str "complementary-" n)}
       [mini-square (assoc args :n n :hue complementary)])]]]
  )

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Markers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;https://www.useragentman.com/blog/2013/03/03/animating-circular-paths-using-css3-transitions/
(defn- hue-marker
  [{:keys [hue radius wheel-radius wheel-thickness opacity]}]
  (let [offset      (- wheel-radius radius)
        translation (- wheel-radius
                       (/ wheel-thickness 2))]
    [:> HueMarker {:style {:width     (str (* radius 2) "px")
                           :height    (str (* radius 2) "px")
                           :left      (str offset "px")
                           :top       (str offset "px")
                           :opacity   (or opacity "50%")
                           :transform (gstr/format "rotate(%sdeg) translateX(%spx)" hue translation)}}]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Big components
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn value-slider
  [{:keys [label state state-key min max max-width]}]
  [box {:sx {:max-width (str max-width "px")}}
   [typography label]
   [grid {:container   true
          :spacing     2
          :align-items "center"}
    [grid {:item true
           :xs   true}
     [slider {:value     (get @state state-key)
              :min       (or min 0)
              :max       (or max 100)
              :on-change (fn [event]
                           (swap! state merge {state-key (events/event-value event)}))}]]
    [grid {:item true}
     [input {:value      (get @state state-key)
             :on-change  (fn [event]
                           (swap! state merge {state-key (events/event-value event)}))
             :inputProps {:step 1
                          :min  (or min 0)
                          :max  (or max 100)
                          :type "number"}}]]]])

(defn color-control
  [{:keys [max-width state state-key min max slider-el]}]
  [box {:class "color-control"
        :sx {:max-width     (str max-width "px")
             :position      "relative"
             :padding-right "10px"}}
   [grid {:container   true
          :spacing     2
          :align-items "center"}
    [grid {:class "slider-container"
           :item true
           :xs   9}
     slider-el]
    [grid {:item true
           :xs   3}
     [input {:class      "slider-input"
             :value      (get @state state-key)
             :on-change  (fn [event]
                           (swap! state merge {state-key (events/event-value event)}))
             :inputProps {:step 1
                          :min  (or min 0)
                          :max  (or max 100)
                          :type "number"}}]]]]
  )

(defn saturation-band
  [{:keys [height hue lightness]} & children]
  (into [:div {:style {:height       height
                       :position     "relative"
                       :borderRadius (str height "px")
                       :background   (gstr/format "linear-gradient(to right, %s, %s)"
                                                  (hsl hue 0 lightness)
                                                  (hsl hue 100 lightness))}}]
        children))

(defn lightness-band
  [{:keys [height hue saturation]} & children]
  (into [:div {:style {:height       height
                       :position     "relative"
                       :borderRadius (str height "px")
                       :background   (gstr/format "linear-gradient(to right, %s, %s, %s)"
                                                  (hsl hue saturation 0)
                                                  (hsl hue saturation 50)
                                                  (hsl hue saturation 100))}}]
        children))

;; https://github.com/caub/color-wheel/blob/master/src/Wheel.js
;; https://paletton.com/#uid=34r0j0kiCr0tbkIoQoDbjvO66AW
;;
;; I couldn't tell if the animation for a rotating set of dots was slow.  It was
;; definitely slower when loading inside storybook. But when  loading the app in
;; my browser, it seems to be performing OK using `transform: translate(X)
;; rotate(Y)` Could also try putting in `react/useEffect`...
(defn color-wheel
  [{:keys [initial-palette
           ring-thickness wheel-radius
           on-change]}]
  (let [{initial-hue        :hue
         initial-saturation :saturation
         initial-lightness  :lightness
         initial-spacing    :spacing
         initial-angle      :angle
         initial-theta      :theta} initial-palette

        hue        (reagent/atom (or initial-hue 0))
        saturation (reagent/atom (or initial-saturation 50))
        lightness  (reagent/atom (or initial-lightness 50))
        spacing    (reagent/atom (or initial-spacing 15))
        theta      (reagent/atom (or initial-theta 45))
        angle      (reagent/atom (or initial-angle 45)) ;; secondary angle

        palette (reagent/atom {:hue        (or initial-hue 0)
                               :saturation (or initial-saturation 50)
                               :lightness  (or initial-lightness 50)
                               :spacing    (or initial-spacing 15)
                               :theta      (or initial-theta 45)
                               :angle      (or initial-angle 45)})
        ;; Replace all @hue with hue from palette
        ;; Extract all HSL Angle etc to single state store.
        ;; then on-change update the entire store

        hue-active?  (reagent/atom false)
        !color-wheel (reagent/atom nil)

        ring-thickness           (or ring-thickness 50)
        wheel-radius             (or wheel-radius 200)
        wheel-diameter           (* wheel-radius 2)
        donut-diameter           (* 2 (- wheel-radius ring-thickness))
        control-bar-thickness    (/ ring-thickness 2)
        sat-lightness-grid-width (/ donut-diameter (js/Math.sqrt 2))

        hue-marker-props {:radius          10
                          :wheel-radius    wheel-radius
                          :wheel-thickness ring-thickness}]
    (fn []
      [:div {:style {:position "relative"}}
       [stack {:direction "row"}
        [:> ColorWheel {:class          "color-wheel"
                        :style          {:width  (str wheel-diameter "px")
                                         :height (str wheel-diameter "px")}
                        :ref            (fn [el] (reset! !color-wheel el))
                        :on-mouse-down  (fn [_event]
                                          (reset! hue-active? true))
                        :on-mouse-up    (fn [_event]
                                          (reset! hue-active? false))
                        :on-mouse-leave (fn [_event]
                                          (reset! hue-active? false))
                        :on-mouse-move  (fn [event]
                                          (when @hue-active?
                                            (swap! palette merge {:hue (calculate-angle @!color-wheel event)})))
                        :on-click       (fn [event]
                                          (swap! palette merge {:hue (calculate-angle @!color-wheel event)}))}
         [:> Donut {:class "thedonut"
                    :style {:width  (str donut-diameter "px")
                            :height (str donut-diameter "px")}}
          (let [offset (- (/ donut-diameter 2)
                          (/ sat-lightness-grid-width 2))]
            [:div {:style {:position  "relative"
                           :transform (gstr/format "translate(%spx,%spx)" offset offset)}}

             ^{:key (:hue @palette)}
             [slg/saturation-lightness-grid
              {:grid-size sat-lightness-grid-width
               :hue       (:hue @palette)
               :on-change (fn [new-coordinates]
                            ;;(println "New coordinates" new-coordinates)
                            (swap! palette merge new-coordinates))
               ;; Trying to get this to work now
               :origin    palette #_{:saturation-state saturation
                                     :lightness-state  lightness}}]])]

         [hue-marker (merge hue-marker-props {:hue (+ (:hue @palette) 270) :radius 15})]
         [hue-marker (merge hue-marker-props {:hue (+ (:hue @palette) 90) :opacity "10%"})]
         [hue-marker (merge hue-marker-props {:hue (+ (:hue @palette) 90 (:angle @palette)) :opacity "30%"})]
         [hue-marker (merge hue-marker-props {:hue (+ (:hue @palette) 90 (- (:angle @palette))) :opacity "30%"})]]
        [color-squares (merge {:size          wheel-radius
                               :primary       (:hue @palette)
                               :complementary (+ (:hue @palette) 180)
                               :secondary     (+ (:hue @palette) 180 (:angle @palette))
                               :tertiary      (+ (:hue @palette) 180 (- (:angle @palette)))}
                              @palette)]]

       ;; Controls
       [:br]
       [stack {:direction "column"
               :spacing   3}
        [color-control {:max-width wheel-diameter
                        :state     palette
                        :state-key :hue
                        :slider-el [:> ColorBand {:style {:height   control-bar-thickness
                                                          :position "relative"}}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl (:hue @palette) 100 50)}
                                                                   :transform           (gstr/format "translate(0px,%spx)" (/ control-bar-thickness 2))}
                                                       :value     (* 100 (/ (:hue @palette) 360))
                                                       :on-change (fn [event]
                                                                    (swap! palette merge {:hue (-> event
                                                                                                   events/event-value
                                                                                                   (* 360)
                                                                                                   (/ 100))}))}]]
                        :min       0
                        :max       360}]
        [color-control {:max-width wheel-diameter
                        :state     palette
                        :state-key :saturation
                        :slider-el [saturation-band {:hue       (:hue @palette)
                                                     :lightness (:lightness @palette)
                                                     :height    control-bar-thickness}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl (:hue @palette)
                                                                                                     (:saturation @palette)
                                                                                                     (:lightness @palette))}
                                                                   :transform           (gstr/format "translate(0px,%spx)" (/ control-bar-thickness 2))}
                                                       :value     (:saturation @palette)
                                                       :on-change (fn [event]
                                                                    (swap! palette merge {:saturation (events/event-value event)}))}]]}]
        [color-control {:max-width wheel-diameter
                        :state     palette
                        :state-key :lightness
                        :slider-el [lightness-band {:hue        (:hue @palette)
                                                    :saturation (:saturation @palette)
                                                    :height     control-bar-thickness}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl (:hue @palette)
                                                                                                     (:saturation @palette)
                                                                                                     (:lightness @palette))}
                                                                   :transform           (gstr/format "translate(0px,%spx)" (/ control-bar-thickness 2))}
                                                       :value     (:lightness @palette)
                                                       :on-change (fn [event]
                                                                    (swap! palette merge {:lightness (events/event-value event)}))}]]}]
        [value-slider {:label     "Secondary angle"
                       :state     palette
                       :state-key :angle
                       :max-width wheel-diameter
                       :max       180}]]])))



;; Create 5 markers inside color wheel
;; When a marker is clicked, rotate or translate the entire marker set
