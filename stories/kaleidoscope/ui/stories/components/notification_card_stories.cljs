(ns kaleidoscope.ui.stories.components.notification-card-stories
  (:require [kaleidoscope.ui.components.notification-card :as notification-card]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Notifications/Cards"
    :component notification-card/notification-card
    :argTypes  {:level {:control "select"
                        :options ["error" "warn"]}}
    :args      {:title   "My title"
                :message "My message"}}))

(def ^:export Error
  (clj->js {:args {:level "error"}}))

(def ^:export Warn
  (clj->js {:args {:levl "warn"}}))
