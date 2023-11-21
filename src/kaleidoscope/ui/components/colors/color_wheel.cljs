(ns kaleidoscope.ui.components.colors.color-wheel
  (:require [goog.string :as gstr]
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Slider" :as slider]
            [kaleidoscope.ui.utils.events :as events]
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
                                      :height "50px"}
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

(defn- color-squares
  [{:keys [size primary complementary secondary tertiary saturation lightness]}]
  [:div {:style {:width            (str (* 2 size) "px")
                 :height           (str (* 2 size) "px")
                 :background-color "grey"}}
   [stack {:direction "row"}
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl primary saturation lightness)}}]
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl complementary saturation lightness)}}]]
   [stack {:direction "row"}
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl secondary saturation lightness)}}]
    [:div {:style {:width            (str size "px")
                   :height           (str size "px")
                   :background-color (hsl tertiary saturation lightness)}}]]
   ]
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

(defn- sl-marker
  [{:keys [radius opacity]}]
  [:> HueMarker {:on-mouse-down (fn [event]
                                  (.stopPropagation event)
                                  (js/console.log "DRAG"))
                 :on-mouse-move (fn [event]
                                  (.stopPropagation event)
                                  (js/console.log "DRAG"))

                 :style {:width      (str (* radius 2) "px")
                         :height     (str (* radius 2) "px")
                         :left       (str offset "px")
                         :top        (str offset "px")
                         :opacity    (or opacity "50%")
                         :background "white"}}])

(defn- control-marker
  [{:keys [percent radius opacity background]}]
  [:div {:on-mouse-down (fn [event]
                          (.stopPropagation event)
                          (js/console.log "DRAG"))
         :on-mouse-move (fn [event]
                          (.stopPropagation event)
                          (js/console.log "DRAG"))}
   [:> HueMarker {:style {:width      (str (+ 8 (* radius 2)) "px")
                          :height     (str (+ 8 (* radius 2)) "px")
                          :opacity    (or opacity "50%")
                          :left       (str percent "%")
                          :top        "-4px"
                          :transform  (gstr/format "translateX(-%spx)" (+ radius 4))
                          :background "black"}}]
   [:> HueMarker {:style {:width      (str (* radius 2) "px")
                          :height     (str (* radius 2) "px")
                          :opacity    (or opacity "50%")
                          :left       (str percent "%")
                          :top        "0px"
                          :transform  (gstr/format "translateX(-%spx)" radius)
                          :background background}}]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Big components
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn- two-D-saturation-lightness-grid
  [{:keys [saturation-active? wheel-radius background on-click disabled?]}]
  [:div {:on-mouse-move (fn [event]
                          (.stopPropagation event))
         :on-mouse-down (fn [event]
                          (.stopPropagation event)
                          (reset! saturation-active? true))
         :on-mouse-up   (fn [event]
                          (.stopPropagation event)
                          (reset! saturation-active? false))
         :on-click      (fn [event]
                          (.stopPropagation event)
                          (on-click event))
         :z-index       100}
   [:div {:style {:width      (str wheel-radius "px")
                  :height     (str wheel-radius "px")
                  :left       (str (/ wheel-radius 4) "px")
                  :top        (str (/ wheel-radius 4) "px")
                  :position   "absolute"
                  :background background}}]
   [:div
    {:style {:width      (str wheel-radius "px")
             :height     (str wheel-radius "px")
             :left       (str (/ wheel-radius 4) "px")
             :top        (str (/ wheel-radius 4) "px")
             :position   "absolute"
             :background "linear-gradient(to right, #fff, rgba(255,255,255,0))"}}]
   [:div
    {:style {:width      (str wheel-radius "px")
             :height     (str wheel-radius "px")
             :left       (str (/ wheel-radius 4) "px")
             :top        (str (/ wheel-radius 4) "px")
             :position   "absolute"
             :background "linear-gradient(to top, #000, rgba(0,0,0,0))"}}]
   (when disabled?
     [:div
      {:style {:width      (str wheel-radius "px")
               :height     (str wheel-radius "px")
               :left       (str (/ wheel-radius 4) "px")
               :top        (str (/ wheel-radius 4) "px")
               :position   "absolute"
               :background "darkgrey"}}])
   ])

(defn value-slider
  [{:keys [label state min max max-width]}]
  [box {:sx {:max-width (str max-width "px")}}
   [typography label]
   [grid {:container   true
          :spacing     2
          :align-items "center"}
    [grid {:item true
           :xs   true}
     [slider {:value     @state
              :min       (or min 0)
              :max       (or max 100)
              :on-change (fn [event]
                           (reset! state (events/event-value event)))}]]
    [grid {:item true}
     [input {:value      @state
             :on-change  (fn [event]
                           (reset! state (events/event-value event)))
             :inputProps {:step 1
                          :min  (or min 0)
                          :max  (or max 100)
                          :type "number"}}]]]])

(defn color-control
  [{:keys [max-width state min max slider-el]}]
  [box {:sx {:max-width     (str max-width "px")
             :position      "relative"
             :padding-right "10px"}}
   [grid {:container   true
          :spacing     2
          :align-items "center"}
    [grid {:item true
           :xs   9}
     slider-el]
    [grid {:item true
           :xs   3}
     [input {:value      @state
             :on-change  (fn [event]
                           (reset! state (events/event-value event)))
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
(defn color-wheel
  [{:keys [initial-hue initial-saturation initial-lightness
           initial-angle
           ring-thickness wheel-radius]}]
  (let [hue                (reagent/atom (or initial-hue 0))
        saturation         (reagent/atom (or initial-saturation 50))
        lightness          (reagent/atom (or initial-lightness 50))
        angle              (reagent/atom (or initial-angle 45))
        hue-active?        (reagent/atom false)
        saturation-active? (reagent/atom false)
        !color-wheel       (reagent/atom nil)
        ring-thickness     (or ring-thickness 50)
        wheel-radius       (or wheel-radius 200)

        hue-marker-props {:radius          10
                          :wheel-radius    wheel-radius
                          :wheel-thickness ring-thickness}

        wheel-diameter (* wheel-radius 2)
        donut-diameter (* 2 (- wheel-radius ring-thickness))
        ]
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
                                            (reset! hue (calculate-angle @!color-wheel event))))
                        :on-click       (fn [event]
                                          (reset! hue (calculate-angle @!color-wheel event)))}
         [:> Donut {:style {:width  (str donut-diameter "px")
                            :height (str donut-diameter "px")}}
          [two-D-saturation-lightness-grid {:wheel-radius       wheel-radius
                                            :background         (hsl @hue 100 50)
                                            :disabled?          @hue-active?
                                            :saturation-active? saturation-active?
                                            :on-click           (fn [event]
                                                                  (js/console.log "EVENT" event))}]
          [sl-marker (merge hue-marker-props {:radius 6})]]

         [hue-marker (merge hue-marker-props {:hue (+ @hue 270) :radius 15})]
         [hue-marker (merge hue-marker-props {:hue (+ @hue 90) :opacity "10%"})]
         [hue-marker (merge hue-marker-props {:hue (+ @hue 90 @angle) :opacity "30%"})]
         [hue-marker (merge hue-marker-props {:hue (+ @hue 90 (- @angle)) :opacity "30%"})]]
        [color-squares {:size          wheel-radius
                        :primary       @hue
                        :complementary (+ @hue 180)
                        :secondary     (+ @hue 180 @angle)
                        :tertiary      (+ @hue 180 (- @angle))
                        :saturation    @saturation
                        :lightness     @lightness
                        }]]

       ;; Controls
       [:br]
       [stack {:direction "column"
               :spacing   3}
        [color-control {:max-width wheel-diameter
                        :state     hue
                        :slider-el [:> ColorBand {:style {:height   (/ ring-thickness 2)
                                                          :position "relative"}}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl @hue 100 50)}}
                                                       :value     (* 100 (/ @hue 360))
                                                       :on-change (fn [event]
                                                                    (reset! hue (-> event
                                                                                    events/event-value
                                                                                    (* 360)
                                                                                    (/ 100))))}]]
                        :min       0
                        :max       360}]
        [color-control {:max-width wheel-diameter
                        :state     saturation
                        :slider-el [saturation-band {:hue       @hue
                                                     :lightness @lightness
                                                     :height    (/ ring-thickness 2)}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl @hue @saturation @lightness)}}
                                                       :value     @saturation
                                                       :on-change (fn [event]
                                                                    (reset! saturation (events/event-value event)))}]]}]
        [color-control {:max-width wheel-diameter
                        :state     lightness
                        :slider-el [lightness-band {:hue        @hue
                                                    :saturation @saturation
                                                    :height     (/ ring-thickness 2)}
                                    [:> NoTrackSlider {:sx        {"& .MuiSlider-thumb" {:color (hsl @hue @saturation @lightness)}}
                                                       :value     @lightness
                                                       :on-change (fn [event]
                                                                    (reset! lightness (events/event-value event)))}]]}]
        [value-slider {:label     "Secondary angle"
                       :state     angle
                       :max-width wheel-diameter
                       :max       180}]]])))



;; Create 5 markers inside color wheel
;; When a marker is clicked, rotate or translate the entire marker set
