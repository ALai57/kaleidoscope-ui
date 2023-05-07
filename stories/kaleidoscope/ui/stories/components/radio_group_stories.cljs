(ns kaleidoscope.ui.stories.components.radio-group-stories
  (:require [kaleidoscope.ui.components.radio-group :as radio-group]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Radio Group"
    :component radio-group/basic-radio-group
    :args      {:group-name "Gender"
                :state      (reagent/atom "female")
                :elements   [{:value "female"
                              :label "Female"}
                             {:value "male"
                              :label "Male"}]}}))

(def ^:export Default-Radio-Group
  (clj->js {}))

(def ^:export Different-Default
  (clj->js {:args {:state (reagent/atom "male")}}))
