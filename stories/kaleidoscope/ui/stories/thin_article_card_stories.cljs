(ns kaleidoscope.ui.stories.thin-article-card-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-data
  {:article-title "An example with the default image"
   :article-url   "https://kaleidoscope.com"
   :article-id    "1"
   :article-tags  "unrecognized"
   :branches      [{:branch-name "main" :branch-id 1 :created-at "2023-01-01"}
                   {:branch-name "new" :branch-id 2}]})

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Articles/Thin Article Cards"
    :component article-cards/thin-article-card
    :args      example-data}))

(def ^:export Basic-Article-Card
  (clj->js {:args {:article-title "An example with the default image"}}))

(def ^:export Truncated-title
  (clj->js {:args {:article-title "An example with the default image and lots more text and lots more and lots more"}}))

(def ^:export Published-Branch
  (clj->js {:args {:article-title "An example with a published branch"
                   :branches      [{:branch-name "main" :branch-id 1 :published-at "2023-05-03" :created-at "2023-01-01"}
                                   {:branch-name "new" :branch-id 2}]}}))

(def ^:export Unpublished-Branch
  (clj->js {:args {:article-title "An example with no published branches"
                   :branches      [{:branch-name "main" :branch-id 1 :created-at "2023-01-01"}
                                   {:branch-name "new" :branch-id 2}]}}))

(def ^:export Research
  (clj->js {:args {:article-title "An example research article"
                   :article-tags  "research"}}))

(def ^:export Thoughts
  (clj->js {:args {:article-title "An example thoughts article"
                   :article-tags  "thoughts"}}))

(def ^:export Data-Analysis
  (clj->js {:args {:article-title "An example data-analysis article"
                   :article-tags  "data-analysis"}}))
