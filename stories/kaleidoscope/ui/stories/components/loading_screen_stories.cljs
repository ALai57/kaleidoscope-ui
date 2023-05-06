(ns kaleidoscope.ui.stories.components.loading-screen-stories
  (:require [kaleidoscope.ui.components.loading-screen :as loading-screen]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]
            ["@storybook/addon-viewport" :refer [INITIAL_VIEWPORTS]]))

(def ^:export default
  (helper/->default-story {:title     "Basic Components/Loading Screen"
                           :component (fn [args]
                                        [:div {:style {:height "800px"}}
                                         [loading-screen/loading-screen args]])
                           :tags      ["autodocs"]

                           :parameters {:viewport {:viewports       INITIAL_VIEWPORTS
                                                   :defaultViewport "iphone6"}}
                           :argTypes   {:color {:defaultValue "secondary"
                                                :description  "The color for the loading bar"
                                                :control      "select"
                                                :options      ["primary" "secondary"]}}}))

(def ^:export Loading-Screen-Primary
  (clj->js {}))

(def ^:export Loading-Screen-Secondary
  (clj->js {:args {:color "secondary"}}))
