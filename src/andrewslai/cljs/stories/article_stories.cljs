(ns andrewslai.cljs.stories.article-stories
  (:require [andrewslai.cljs.article :as article]
            [andrewslai.cljs.article-cards :as article-cards]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Article"
                     :component article/article
                     :args      {:title       "An example article"
                                 :author      "Andrew Lai"
                                 :timestamp   "2022-01-25T00:00:00"
                                 :raw-content "<div><h3>This is some formatted content</h3><p>howdy</p><strong>bold</strong></div>"}}))

(defn template
  [args]
  (reagent/as-element [article/article (helper/->params args)]))

(def ^:export Default-article
  (helper/->story template {}))
