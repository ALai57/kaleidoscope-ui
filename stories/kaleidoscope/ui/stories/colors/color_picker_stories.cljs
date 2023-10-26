(ns kaleidoscope.ui.stories.colors.color-picker-stories
  (:require [kaleidoscope.ui.components.colors.color-picker :as color-picker]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Color Picker"
    :component  color-picker/color-picker
    :parameters {:docs
                 {:description
                  {:component "An RGB color picker component"}}}

    :args     {:initial-color "#DDDDDD"
               :on-change     (fn [& args]
                                (action "on-change"))}
    :argTypes {:initial-color {:description  "The initial color to start with"
                               :defaultValue "#DDDDDD"}
               :on-change     {:description  "Callback when color is changed"
                               :defaultValue (fn [& args]
                                               (action "on-change"))}}}))

(def ^:export Gray
  (clj->js {}))

(def ^:export Red
  (clj->js {:args {:initial-color "#FF0000"}}))
