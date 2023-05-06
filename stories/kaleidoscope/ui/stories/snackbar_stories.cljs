(ns kaleidoscope.ui.stories.snackbar-stories
  (:require [kaleidoscope.ui.components.snackbar :as snackbar]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Basic Components/Snackbar"
                     :component snackbar/basic-snackbar
                     :args      {:open?              true
                                 :auto-hide-duration 6000
                                 :message            "Hello"}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [snackbar/basic-snackbar (helper/->params args)]))

(def ^:export Info-Snackbar
  (helper/->story template {:open? true}))

(def ^:export Warn-Snackbar
  (helper/->story template {:open? true
                            :level "warning"}))

(def ^:export Error-Snackbar
  (helper/->story template {:open? true
                            :level "error"}))

(def ^:export Success-Snackbar
  (helper/->story template {:open? true
                            :level "success"}))
