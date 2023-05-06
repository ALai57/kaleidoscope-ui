(ns kaleidoscope.ui.stories.card-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-data
  {:article-title "An example with the default image"
   :article_url   "https://kaleidoscope.com"
   :article_id    "1"
   :timestamp     "2022-01-01T00:00:00"
   :article-tags  ""})

(def ^:export default
  (helper/->default {:article-title     "Article Subcomponents/Article Cards"
                     :component article-cards/article-card
                     :args      example-data}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [article-cards/article-card (helper/->params args)]))

(def ^:export Default
  (helper/->story template {:article-title "An example with the default image"
                            :article-tags  "unrecognized"}))

(def ^:export Research
  (helper/->story template {:article-title "An example research article"
                            :article-tags  "research"}))

(def ^:export Thoughts
  (helper/->story template {:article-title "An example thoughts article"
                            :article-tags  "thoughts"}))

(def ^:export Data-Analysis
  (helper/->story template {:article-title "An example data-analysis article"
                            :article-tags  "data-analysis"}))

(def ^:export About
  (helper/->story template {:article-title "An example about me article"
                            :article-tags  "about"}))

(def ^:export Archive
  (helper/->story template {:article-title "An example archived article"
                            :article-tags  "archive"}))
