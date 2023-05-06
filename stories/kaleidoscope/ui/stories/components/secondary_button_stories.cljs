(ns kaleidoscope.ui.stories.components.secondary-button-stories
  (:require [kaleidoscope.ui.components.secondary-button :as secondary-button]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story {:title     "Basic Components/Secondary Button"
                           :component secondary-button/secondary-button}))

(def ^:export Default-Secondary-Button
  (clj->js {:args       {:text "A button"}
            :argTypes   {:on-click {:action "Clicked Button!"}}
            :parameters {:viewports {:default "mobile"}}}))
