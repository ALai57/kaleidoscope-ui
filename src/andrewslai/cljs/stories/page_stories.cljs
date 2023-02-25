(ns andrewslai.cljs.stories.page-stories
  (:require [andrewslai.cljs.pages.article-page :as page.article]
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
   {:title     "Full Pages/Article Page"
    :component page.article/-article-page
    :args      {:active-content article-stories/example-article
                :recent-content recent-content-stories/example-recent-content
                :user           {:avatar_url "/images/lock.svg"}}}))

(defn template
  [args]
  (reagent/as-element [page.article/-article-page (helper/->params args)]))

(def ^:export Default-Article-Page
  (helper/->story template {}))
