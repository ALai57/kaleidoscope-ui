(ns kaleidoscope.ui.stories.snackbar-stories
  (:require [kaleidoscope.ui.components.snackbar :as snackbar]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Snackbar"
    :component snackbar/basic-snackbar
    :args      {:open?              true
                :auto-hide-duration 6000
                :message            "Hello"}}))

(def ^:export Info-Snackbar
  (clj->js {}))

(def ^:export Warn-Snackbar
  (clj->js {:args {:level "warning"}}))

(def ^:export Error-Snackbar
  (clj->js {:args {:level "error"}}))

(def ^:export Success-Snackbar
  (clj->js {:args {:level "success"}}))
