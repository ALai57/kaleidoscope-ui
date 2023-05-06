(ns kaleidoscope.ui.stories.card-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-data
  {:article-id    "1"
   :article-title "An example with the default image"
   :article-url   "https://kaleidoscope.com"
   :article-tags  "unrecognized"
   :created-at    "2022-01-01T00:00:00"})

(def ^:export default
  (helper/->default-story
   {:title      "Article Subcomponents/Article Cards"
    :component  article-cards/article-card
    :parameters {:docs
                 {:description
                  {:component "A display element with a thumbnail and link to a particular Article"}}}

    :args     example-data
    :argTypes {:article-title {:description  "An article's title"
                               :defaultValue "An example article"}
               :article-url   {:description  "The article's URL"
                               :defaultValue "https://kaleidoscope.com"}
               :created-at    {:description  "When the article was published"
                               :defaultValue "2022-01-25T00:00:00"}
               :article-id    {:description  "The article's ID"
                               :defaultValue "1"}
               :article-tags  {:description  "The article tags"
                               :defaultValue "research"
                               :control      "select"
                               :options      ["unrecognized" "research" "thoughts" "data-analysis"]}}}))

(def ^:export Default
  (clj->js {:article-title "An example with the default image"
            :article-tags  "unrecognized"}))

(def ^:export Research
  (clj->js {:article-title "An example research article"
            :article-tags  "research"}))

(def ^:export Thoughts
  (clj->js {:article-title "An example thoughts article"
            :article-tags  "thoughts"}))

(def ^:export Data-Analysis
  (clj->js {:article-title "An example data-analysis article"
            :article-tags  "data-analysis"}))
