(ns kaleidoscope.cljs.stories.article-stories
  (:require [kaleidoscope.cljs.article :as article]
            [kaleidoscope.cljs.article-cards :as article-cards]
            [kaleidoscope.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-article
  {:title     "An example article"
   :author    "Andrew Lai"
   :timestamp "2022-01-25T00:00:00"
   :content   "<div><h3>This is some formatted content</h3><p>howdy</p><strong>bold</strong></div>"})

(def ^:export default
  (helper/->default {:title     "Article Subcomponents/Article"
                     :component article/article
                     :args      example-article}))

(defn template
  [args]
  (reagent/as-element [article/article (helper/->params args)]))

(def ^:export Default-article
  (helper/->story template {}))
