(ns andrewslai.cljs.stories.page-stories
  (:require [andrewslai.cljs.views :as views]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.card-stories :as card-stories]
            [andrewslai.cljs.stories.article-stories :as article-stories]
            [andrewslai.cljs.stories.recent-content-stories :as recent-content-stories]
            [reagent.core :as reagent]))

(def example-recent-content
  "Extracts inputs from existing card-stories so we can compose story pieces"
  (helper/get-story-args recent-content-stories/Default-recent-content))

(def ^:export default
  (helper/->default
   {:title     "Article Page"
    :component views/full-page
    :args      {:active-content article-stories/example-article
                :recent-content recent-content-stories/example-recent-content
                :user           {:avatar_url "https://andrewslai.com"}}}))

(defn template
  [args]
  (reagent/as-element [views/full-page (helper/->params args)]))

(def ^:export Default-Article-Page
  (helper/->story template {}))
