(ns andrewslai.cljs.stories.thin-article-cards-display-stories
  (:require [andrewslai.cljs.article-cards :as article-cards]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.thin-article-card-stories :as thin-card-stories]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Thin Article Cards Content"
                     :component article-cards/thin-content-cards}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  [args]
  (reagent/as-element [article-cards/thin-content-cards (helper/->params args)]))

(def get-inputs
  "Extracts inputs from existing card-stories so we can compose story pieces"
  (partial helper/->story-inputs thin-card-stories/example-data))

(def example-recent-content
  [(get-inputs thin-card-stories/Default)
   (get-inputs thin-card-stories/Research)
   (get-inputs thin-card-stories/Thoughts)
   (get-inputs thin-card-stories/Data-Analysis)
   (get-inputs thin-card-stories/About)
   (get-inputs thin-card-stories/Archive)])

(def ^:export Default-thin-content
  (helper/->story template {:recent-content example-recent-content}))
