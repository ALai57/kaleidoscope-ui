(ns kaleidoscope.ui.stories.recent-content-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.card-stories :as card-stories]
            [reagent.core :as reagent]))

(defn get-inputs
  "Extracts inputs from existing card-stories so we can compose story pieces"
  [story]
  (merge card-stories/example-data (js->clj story :keywordize-keys true)))

(def example-recent-content
  [(get-inputs card-stories/Default)
   (get-inputs card-stories/Research)
   (get-inputs card-stories/Thoughts)
   (get-inputs card-stories/Data-Analysis)
   (get-inputs card-stories/About)
   (get-inputs card-stories/Archive)])

(def ^:export default
  (helper/->default-story
   {:title     "Article Subcomponents/Recent Content"
    :component (fn recent-content-cards
                 [args]
                 [article-cards/recent-content-cards (js->clj args :keywordize-keys true)])
    :args      {:recent-content example-recent-content}}))

(def ^:export Default-recent-content
  (clj->js {}))
