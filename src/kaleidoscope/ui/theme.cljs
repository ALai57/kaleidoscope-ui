(ns kaleidoscope.ui.theme
  (:require ["@mui/material/styles" :refer [createTheme]]
            ["@mui/material/colors" :refer [red purple blue green]]
            [kaleidoscope.ui.components.colors.color-wheel :as cw]))

(def DEFAULT
  (clj->js {:palette     #js {:primary   #js {:main (aget blue 600)}
                              :secondary #js {:main (aget purple 600)}
                              :error     #js {:main (aget red 600)}
                              :success   #js {:main (aget green 600)}
                              :accent    #js {:main "#e3bef6"}}
            :transitions #js {}}))

(def BASE-THEME
  DEFAULT)

(defn make-theme
  [{:keys [hue saturation lightness spacing theta angle] :as clj-theme}]
  (let [primary   (cw/hsl hue saturation lightness)
        secondary (cw/hsl (+ hue 180 angle) saturation lightness)
        tertiary  (cw/hsl (+ hue 180 (- angle)) saturation lightness)]
    (clj->js {:palette     {:primary   {:main primary}
                            :secondary {:main secondary}
                            :error     {:main (aget red 600)}
                            :success   {:main (aget green 600)}
                            :accent    {:main tertiary}}
              :transitions {}})))
