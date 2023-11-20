(ns kaleidoscope.ui.stories.colors.color-wheel-stories
  (:require [kaleidoscope.ui.components.colors.color-wheel :as color-wheel]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Color Wheel"
    :component  color-wheel/color-wheel
    :parameters {:docs
                 {:description
                  {:component "A hue-based color wheel"}}}

    :args     {:initial-hue 0}
    :argTypes {:initial-hue {:description  "The initial hue angle to start with (degrees - 0 is red)"
                             :defaultValue 0}}}))

(def ^:export Default
  (clj->js {:args {}}))
