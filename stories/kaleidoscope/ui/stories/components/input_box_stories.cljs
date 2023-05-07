(ns kaleidoscope.ui.stories.components.input-box-stories
  (:require [kaleidoscope.ui.components.input-box :as input-box]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Input Box"
    :component input-box/input-box
    :args      {:value     "An Input Box"
                :label     "Email"
                :label-for "email"
                :read-only false}}))

(def ^:export Editable-Input-Box
  (clj->js {}))

(def ^:export Read-Only-Input-Box
  (clj->js {:args {:read-only true}}))
