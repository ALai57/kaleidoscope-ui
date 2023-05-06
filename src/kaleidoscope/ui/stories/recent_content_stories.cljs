(ns kaleidoscope.ui.stories.recent-content-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.card-stories :as card-stories]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Article Subcomponents/Recent Content"
                     :component article-cards/recent-content-cards}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  [args]
  (reagent/as-element [article-cards/recent-content-cards (helper/->params args)]))

(def get-inputs
  "Extracts inputs from existing card-stories so we can compose story pieces"
  (partial helper/->story-inputs card-stories/example-data))

(def example-recent-content
  [(get-inputs card-stories/Default)
   (get-inputs card-stories/Research)
   (get-inputs card-stories/Thoughts)
   (get-inputs card-stories/Data-Analysis)
   (get-inputs card-stories/About)
   (get-inputs card-stories/Archive)])

(def ^:export Default-recent-content
  (helper/->story template {:recent-content example-recent-content}))
