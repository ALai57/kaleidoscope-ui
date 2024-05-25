(ns kaleidoscope.ui.stories.helper
  (:require [reagent.core :as reagent]))

(defn ->default-story
  [{:keys [component] :as story-metadata}]
  (-> story-metadata
      (assoc :component (reagent/reactify-component
                         (fn [args]
                           [component (js->clj args :keywordize-keys true)])))
      clj->js))
