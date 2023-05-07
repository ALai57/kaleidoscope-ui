(ns kaleidoscope.ui.stories.components.manager-stories
  (:require [kaleidoscope.ui.components.manager :as manager]
            [kaleidoscope.ui.stories.helper :as helper]))


(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Managers/Manager cards"
    :component manager/manager-cards
    :args      {}}))

(def ^:export Manager-cards
  (clj->js {}))
