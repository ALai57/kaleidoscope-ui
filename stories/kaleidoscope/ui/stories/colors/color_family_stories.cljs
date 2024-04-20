(ns kaleidoscope.ui.stories.colors.color-family-stories
  (:require [kaleidoscope.ui.components.colors.color-family :as color-family]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ["@mui/material/colors" :refer [red purple blue green]]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Color Theme"
    :component  color-family/color-theme
    :parameters {:docs
                 {:description
                  {:component "An RGB color theme editor"}}}

    :args     (clj->js {:palette {:primary          {:main (aget blue 600)}
                                  :secondary        {:main (aget purple 600)}
                                  :error            {:main (aget red 600)}
                                  :success          {:main (aget green 600)}
                                  :accent           {:main "#e3bef6"}
                                  :background-light {:main "#FFFFFF"}
                                  :background-dark  {:main "#000000"}
                                  }})}))


(def ^:export Basic-Theme
  (clj->js {}))
