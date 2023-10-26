(ns kaleidoscope.ui.components.colors.color-family
  (:require [kaleidoscope.ui.components.colors.color-picker :as cp]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.clients.leonardo :as leo]
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
  [2   ;; subtle
   3   ;; light
   4.5 ;; main
   8   ;; dark
   12  ;; verydark
   ]
  )

(defn color-family
  [{:keys [family-name base-color on-change]}]
  (let [family     (leo/make-color {:name      family-name
                                    :colorKeys [base-color]
                                    :ratios    STANDARD-RATIOS
                                    })
        background (leo/make-background
                    {:name      "bg",
                     :colorKeys ["#bababa"],
                     :ratios    [2, 3, 4.5, 8]})
        theme      (leo/make-theme {:colors          [family]
                                    :backgroundColor background
                                    :lightness       97})
        clj-theme  (u/clojurize (.-contrastColorPairs theme) )
        ]
    (js/console.log "theme" theme)
    [:> Item
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      [cp/basic-color-picker {:color     base-color
                              :on-change on-change}]
      [:div {:style {:backgroundColor (:background clj-theme)
                     :padding         "20px"}}
       [stack {:spacing 2}
        (for [[k color] (filter (fn [[k v]]
                                  (not= k :background))
                                clj-theme)]
          [:div {:style {:backgroundColor color
                         :width           "50px"
                         :height          "50px"}}
           k])]]]]))

(defn color-theme
  [{:keys [theme-elements background-elements]}]
  (let [colors      (reagent/atom theme-elements)
        backgrounds (reagent/atom background-elements)]
    (fn []
      [box
       [stack {:spacing 2}
        (for [[idx {:keys [family-name base-color] :as element}] (map-indexed (fn [idx ele]
                                                                                [idx ele])
                                                                              @backgrounds)]
          [:div
           idx
           " BACKGROUND) "
           family-name
           [color-family {:family-name family-name
                          :base-color  base-color
                          :on-change   (fn [new-color]
                                         (swap! colors update-in [idx] assoc :base-color (cp/upcase new-color)))
                          }]])
        ]
       [stack {:spacing 2}
        (for [[idx {:keys [family-name base-color] :as element}] (map-indexed (fn [idx ele]
                                                                                [idx ele])
                                                                              @colors)]
          [:div
           idx
           ") "
           family-name
           [color-family {:family-name family-name
                          :base-color  base-color
                          :on-change   (fn [new-color]
                                         (swap! colors update-in [idx] assoc :base-color (cp/upcase new-color)))
                          }]])
        ]])))
