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
  [{:keys [family-name base-color background-colors on-change]}]
  (let [family     (leo/make-color {:name      family-name
                                    :colorKeys [base-color]
                                    :ratios    STANDARD-RATIOS})]
    [:> Item
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      [cp/basic-color-picker {:color     base-color
                              :on-change on-change}]
      (for [background-color background-colors]
        (let [background (leo/make-background {:name      "bg",
                                               :colorKeys [(or background-color "#bababa")],
                                               :ratios    [2, 3, 4.5, 8]})
              theme     (leo/make-theme {:colors          [family]
                                         :backgroundColor background-color
                                         :lightness       50})
              clj-theme (u/clojurize (.-contrastColorPairs theme) )
              _         (js/console.log "theme" theme)]
          [:div {:style {:backgroundColor (:background clj-theme)
                         :padding         "20px"}}
           [stack {:spacing 2}
            (for [[k color] (filter (fn [[k v]]
                                      (not= k :background))
                                    clj-theme)]
              [:div {:style {:backgroundColor color
                             :width           "50px"
                             :height          "50px"}}
               k])]]))]]))

(defn color-theme
  [{:keys [theme-elements background-elements]}]
  (let [colors      (reagent/atom theme-elements)
        backgrounds (reagent/atom background-elements)]
    (fn []
      [box
       "BACKGROUNDS)"
       [:> Item
        [stack {:spacing   4
                :direction "row"}
         (for [[idx {:keys [family-name base-color] :as element}] (map-indexed (fn [idx ele]
                                                                                 [idx ele])
                                                                               @backgrounds)]
           [:div {:style {:padding "10px"}}
            [cp/basic-color-picker {:color     base-color
                                    :on-change (fn [new-color]
                                                 (swap! backgrounds update-in [idx] assoc :base-color (cp/upcase new-color)))}]])]]
       [stack {:spacing 2}
        (for [[idx {:keys [family-name base-color] :as element}] (map-indexed (fn [idx ele]
                                                                                [idx ele])
                                                                              @colors)]
          [:div
           idx
           ") "
           family-name
           [color-family {:family-name       family-name
                          :base-color        base-color
                          :background-colors (map :base-color @backgrounds)
                          :on-change         (fn [new-color]
                                               (swap! colors update-in [idx] assoc :base-color (cp/upcase new-color)))
                          }]])
        ]])))
