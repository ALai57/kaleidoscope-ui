(ns kaleidoscope.ui.stories.colors.color-family-stories
  (:require [kaleidoscope.ui.components.colors.color-family :as color-family]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Color Theme"
    :component  color-family/color-theme
    :parameters {:docs
                 {:description
                  {:component "An RGB color theme editor"}}}

    :args     {:theme-elements      #js[#js {:family-name "Primary"
                                             :base-color  "#3B4173"}
                                        #js {:family-name "Error"
                                             :base-color  "#FFFFFF"}
                                        #js {:family-name "Success"
                                             :base-color  "#31BB28"}]
               :background-elements #js[#js {:family-name "Gray"
                                             :base-color  "#BBBBBB"}
                                        #js {:family-name "Black"
                                             :base-color  "#000000"}]}
    :argTypes {:background-elements {:description  "The Backgrounds"
                                     :defaultValue [{:family-name "Black"
                                                     :base-color  "#000000"}]}
               :theme-elements      {:description  "The Theme"
                                     :defaultValue [{:family-name "Primary"
                                                     :base-color  "#FFFFFF"}]}}}))

(def ^:export Basic-Theme
  (clj->js {}))
