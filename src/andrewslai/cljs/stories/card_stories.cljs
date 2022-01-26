(ns andrewslai.cljs.stories.card-stories
  (:require [andrewslai.cljs.article-cards :as article-cards]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Article Cards"
                     :component article-cards/make-card
                     :args      {:title        "An example with the default image"
                                 :article_url  "https://andrewslai.com"
                                 :article_id   "1"
                                 :timestamp    "2022-01-01T00:00:00"
                                 :article_tags ""}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  [args]
  (reagent/as-element [article-cards/make-card (helper/->params args)]))

(def ^:export Default
  (helper/->story template {:title        "An example with the default image"
                            :article_tags "unrecognized"}))

(def ^:export Research
  (helper/->story template {:title        "An example research article"
                            :article_tags "research"}))

(def ^:export Thoughts
  (helper/->story template {:title        "An example thoughts article"
                            :article_tags "thoughts"}))

(def ^:export Data-Analysis
  (helper/->story template {:title        "An example data-analysis article"
                            :article_tags "data-analysis"}))

(def ^:export About
  (helper/->story template {:title        "An example about me article"
                            :article_tags "about"}))

(def ^:export Archive
  (helper/->story template {:title        "An example archived article"
                     :article_tags "archive"}))
