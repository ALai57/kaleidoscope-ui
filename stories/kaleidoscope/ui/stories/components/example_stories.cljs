(ns kaleidoscope.ui.stories.components.example-stories
  (:require [kaleidoscope.ui.components.example :as example]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Example"
    :component example/example-js
    :args      {}}))

(def ^:export Example-story
  (clj->js {}))
