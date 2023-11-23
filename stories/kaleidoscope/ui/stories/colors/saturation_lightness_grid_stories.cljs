(ns kaleidoscope.ui.stories.colors.saturation-lightness-grid-stories
  (:require [kaleidoscope.ui.components.colors.saturation-lightness-grid :as saturation-lightness-grid]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Saturation Lightness Grid"
    :component  saturation-lightness-grid/saturation-lightness-grid
    :parameters {:docs
                 {:description
                  {:component "A 2D saturation lightness plane for a single hue"}}}

    :args     {:grid-size  200
               :hue        50
               :saturation 30
               :lightness  70}
    :argTypes {:grid-size {:description  "The grid's size in pixels"
                           :defaultValue 200}}}))

(def ^:export Default
  (clj->js {:args {}}))
