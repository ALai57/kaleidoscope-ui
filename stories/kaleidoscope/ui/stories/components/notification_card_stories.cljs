(ns kaleidoscope.ui.stories.components.notification-card-stories
  (:require [kaleidoscope.ui.components.notification-card :as notification-card]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Notifications/Cards"
                     :component notification-card/notification-card
                     :args      {:title   "My title"
                                 :message "My message"}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [notification-card/notification-card (helper/->params args)]))

(def ^:export Error
  (helper/->story template {:level "error"}))

(def ^:export Warn
  (helper/->story template {:level "warn"}))
