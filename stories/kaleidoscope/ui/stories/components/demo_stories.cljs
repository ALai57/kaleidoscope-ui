(ns kaleidoscope.ui.stories.components.demo-stories
  (:require [kaleidoscope.ui.components.demo :as demo]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/3D Components/Demo"
    :component demo/demo
    :args      {}}))

(def ^:export Default-3D
  (clj->js {}))
