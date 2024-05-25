(ns kaleidoscope.ui.theme
  (:require ["@mui/material/colors" :refer [red green]]
            [kaleidoscope.ui.components.colors.color-wheel :as cw]))

#_(def DEFAULT
    (clj->js {:palette     #js {:primary   #js {:main (aget blue 600)}
                                :secondary #js {:main (aget purple 600)}
                                :error     #js {:main (aget red 600)}
                                :success   #js {:main (aget green 600)}
                                :accent    #js {:main "#e3bef6"}}
              :typography  #js {:body1 #js {:fontSize "1.2rem"}}
              :transitions #js {}}))

(def BASE-THEME
  {:hue        217
   :saturation 65
   :lightness  40
   :angle      103
   :theta      45})

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
              :typography  #js {:body1 #js {:fontSize "1.3rem"}}
              :transitions {}})))
