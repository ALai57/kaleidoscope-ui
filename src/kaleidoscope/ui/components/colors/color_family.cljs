(ns kaleidoscope.ui.components.colors.color-family
  (:require [kaleidoscope.ui.components.colors.color-picker :as cp]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.clients.leonardo :as leo]
            [kaleidoscope.ui.components.slider :as slider]
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Paper" :as paper]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [box stack]]
            [taoensso.timbre :refer-macros [infof info]]))

(def Item
  ((styled paper/default)
   (fn [theme]
     (clj->js {:transition "transform 0.3s"
               :padding    "right"
               :textAlign  "center"
               :position   "relative"}))))

(def STANDARD-RATIOS
  [1.2 ;; subtle
   2   ;; light
   4   ;; main
   6   ;; dark
   10  ;; verydark
   ]
  )

(defn color-family
  [{:keys [family-name base-color background-colors on-change theme-props]}]
  (let [family     (leo/make-color {:name      family-name
                                    :colorKeys [base-color]
                                    :ratios    STANDARD-RATIOS})

        {:keys [lightness saturation contrast]} theme-props]
    [:> Item
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      [cp/basic-color-picker {:color     base-color
                              :on-change on-change}]
      (for [[background-idx background-color] (map-indexed (fn [idx v]
                                                             [idx v])
                                                           background-colors)]
        (let [theme     (leo/make-theme {:colors          [family]
                                         :backgroundColor background-color
                                         :lightness       lightness
                                         :contrast        (/ contrast 100)
                                         :saturation      saturation
                                         })
              clj-theme (u/clojurize (.-contrastColorPairs theme) )
              ]
          ;;(js/console.log "theme" theme)
          (println "CLOJURE THEME" clj-theme)
          ^{:key (str family-name "-background-display-" background-idx)}
          [:div {:style {:backgroundColor (:background clj-theme)
                         :padding         "20px"}}
           [stack {:spacing 2}
            (for [[color-idx [k color]] (->> clj-theme
                                             (filter (fn [[k v]] (not= k :background)))
                                             (map-indexed (fn [idx v]
                                                            [idx v])))]
              ^{:key (str family-name "-background-" background-idx "-color" color-idx)}
              [:div {:style {:backgroundColor color
                             :width           "50px"
                             :height          "50px"}}
               k])]]))]]))

(defn background-color?
  [[k _v]]
  (get #{:background-light :background-dark} k))

(defn color-theme
  [{:keys [palette]}]
  (let [colors      (reagent/atom (vec (remove background-color? palette)))
        backgrounds (reagent/atom (vec (filter background-color? palette)))
        lightness   (reagent/atom 0.1)
        contrast    (reagent/atom 30)
        saturation  (reagent/atom 0.1)]
    (fn []
      [box
       "BACKGROUNDS)"
       [:> Item
        [stack {:spacing   4
                :direction "row"}
         (for [[idx [color-name color-swatch]] (map-indexed (fn [idx ele]
                                                              [idx ele])
                                                            @backgrounds)]
           ^{:key (str color-name "-color-picker" )}
           [:div {:style {:padding "10px"}}
            [cp/basic-color-picker
             {:color     (:main color-swatch)
              :on-change (fn [new-color]
                           (swap! backgrounds assoc-in [idx] [color-name {:main (cp/upcase new-color)}]))}]

            ])
         [stack {:sx {:width "300px"}}
          [slider/value-slider {:title         "Contrast"
                                :initial-value 30
                                :min           15
                                :max           500
                                :on-change     (fn [new-val]
                                                 (reset! contrast new-val))}]
          [slider/value-slider {:title         "Saturation"
                                :initial-value 0.1
                                :on-change     (fn [new-val]
                                                 (reset! saturation new-val))}]
          [slider/value-slider {:title         "Lightness"
                                :initial-value 0.1
                                :on-change     (fn [new-val]
                                                 (reset! lightness new-val))}]]

         ]]
       [stack {:spacing   2
               :direction "row"}
        (doall
         (for [[idx [color-name color-swatch]] (map-indexed (fn [idx ele]
                                                              [idx ele])
                                                            @colors)]
           ^{:key (str color-name "-color-picker")}
           [:div
            idx
            ") "
            color-name
            [color-family {:family-name       color-name
                           :base-color        (:main color-swatch)
                           :background-colors (mapv (fn [[_color-name color-swatch]]
                                                      (:main color-swatch))
                                                    @backgrounds)
                           :theme-props       {:lightness  @lightness
                                               :contrast   @contrast
                                               :saturation @saturation}
                           :on-change         (fn [new-color]
                                                (swap! colors assoc-in [idx] [color-name {:main (cp/upcase new-color)}]))
                           }]]))
        ]])))
