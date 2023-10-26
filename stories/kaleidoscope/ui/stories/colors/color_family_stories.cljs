(ns kaleidoscope.ui.stories.colors.color-family-stories
  (:require [kaleidoscope.ui.components.colors.color-family :as color-family]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ))

#_(def ^:export default
    (helper/->default-story
     {:title      "Basic Components/Color Family"
      :component  color-family/color-family
      :parameters {:docs
                   {:description
                    {:component "An RGB color family component"}}}

      :args     {:color-name    "Primary"
                 :initial-color "#FFFFFF"}
      :argTypes {:color-name    {:description  "The name of the color family"
                                 :defaultValue "Primary"}
                 :initial-color {:description  "The starting hex value for the family"
                                 :defaultValue "#FFFFFF"}}}))

#_(def ^:export Primary
    (clj->js {}))



(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Color Theme"
    :component  color-family/color-theme
    :parameters {:docs
                 {:description
                  {:component "An RGB color theme editor"}}}

    :args     {:theme-elements #js[#js {:family-name "Primary"
                                        :base-color  "#3B4173"}
                                   #js {:family-name "Error"
                                        :base-color  "#FFFFFF"}
                                   #js {:family-name "Success"
                                        :base-color  "#31BB28"}]}
    :argTypes {:theme-elements {:description  "The Theme"
                                :defaultValue [{:family-name "Primary"
                                                :base-color  "#FFFFFF"}]}}}))

(def ^:export Basic-Theme
  (clj->js {}))
