(ns kaleidoscope.ui.stories.components.input-box-stories
  (:require [kaleidoscope.ui.components.input-box :as input-box]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Basic Components/Input Box"
                     :component input-box/input-box
                     :args      {:value     "An Input Box"
                                 :label     "Email"
                                 :label-for "email"}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [input-box/input-box (helper/->params args)]))

(def ^:export Editable-Input-Box
  (helper/->story template {}))

(def ^:export Read-Only-Input-Box
  (helper/->story template {:read-only true}))
