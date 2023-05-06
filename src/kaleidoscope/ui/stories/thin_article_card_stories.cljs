(ns kaleidoscope.ui.stories.thin-article-card-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-data
  {:title        "An example with the default image"
   :article_url  "https://kaleidoscope.com"
   :article_id   "1"
   :timestamp    "2022-01-01T00:00:00"
   :article-tags ""})

(def ^:export default
  (helper/->default {:title     "Article Subcomponents/Thin Article Cards"
                     :component article-cards/thin-article-card
                     :args      example-data}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [article-cards/thin-article-card (helper/->params args)]))

(def ^:export Default
  (helper/->story template {:article-url  "An example with the default image"
                            :article-tags "unrecognized"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))

(def ^:export Truncated-Header
  (helper/->story template {:article-url  "An example with the default image and more things"
                            :article-tags "unrecognized"
                            :branches     [{:branch-name "main" :branch-id 1}
                                           {:branch-name "new" :branch-id 2}]}))

(def ^:export Research
  (helper/->story template {:article-url  "An example research article"
                            :article-tags "research"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))

(def ^:export Thoughts
  (helper/->story template {:article-url  "An example thoughts article"
                            :article-tags "thoughts"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))

(def ^:export Data-Analysis
  (helper/->story template {:article-url  "An example data-analysis article"
                            :article-tags "data-analysis"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))

(def ^:export About
  (helper/->story template {:article-url  "An example about me article"
                            :article-tags "about"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))

(def ^:export Archive
  (helper/->story template {:article-url  "An example archived article"
                            :article-tags "archive"
                            :branches [{:branch-name "main" :branch-id 1}
                                       {:branch-name "new" :branch-id 2}]}))
