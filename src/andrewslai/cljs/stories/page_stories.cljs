(ns andrewslai.cljs.stories.page-stories
  (:require [andrewslai.cljs.views :as views]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.card-stories :as card-stories]
            [andrewslai.cljs.stories.article-stories :as article-stories]
            [andrewslai.cljs.stories.recent-content-stories :as recent-content-stories]
            [reagent.core :as reagent]))

(def recent-content-inputs
  "Extracts inputs from existing card-stories so we can compose story pieces"
  (helper/->story-inputs {} recent-content-stories/Default-recent-content))

(def ^:export default
  (helper/->default {:title     "Page"
                     :component views/full-page
                     :args      (merge {:article {:title       "An example article"
                                                  :author      "Andrew Lai"
                                                  :timestamp   "2022-01-25T00:00:00"
                                                  :raw-content "<div><h3>This is some formatted content</h3><p>howdy</p><strong>bold</strong></div>"}
                                        :user    {:avatar_url "https://andrewslai.com"}}
                                       recent-content-inputs)}))

(defn template
  [args]
  (reagent/as-element [views/full-page (helper/->params args)]))

(def ^:export Default-page
  (helper/->story template {}))
