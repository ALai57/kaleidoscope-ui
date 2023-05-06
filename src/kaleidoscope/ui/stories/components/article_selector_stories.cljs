(ns kaleidoscope.ui.stories.components.article-selector-stories
  (:require [kaleidoscope.ui.components.article-selector :as article-selector]
            ;;[kaleidoscope.ui.stories.thin-article-cards-display-stories :refer [example-recent-content]]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent-mui.components :refer [button]]
            [reagent.core :as reagent]))

(defn expand-button
  [props]
  [button props "Click me"])

(def ^:export default
  (helper/->default {:title     "Article Subcomponents/Article Selector"
                     :component article-selector/article-selector
                     :args      {:expand-button expand-button}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [article-selector/article-selector (helper/->params args)]))

(def ^:export Default-Side-Menu
  (helper/->story template {:branches [{:branch-id 1,
                                        :branch-name "main",
                                        :published-at "2022-03-01T00:00:00Z",
                                        :article-id 1,
                                        :author "Andrew Lai",
                                        :article-url "my-first-article",
                                        :article-tags "thoughts"}
                                       {:branch-id 2,
                                        :branch-name "main",
                                        :published-at "2022-03-01T00:00:00Z",
                                        :article-id 2,
                                        :author "Andrew Lai",
                                        :article-url "my-second-article",
                                        :article-tags "thoughts"}
                                       {:branch-id 3,
                                        :branch-name "main",
                                        :published-at "2022-03-01T00:00:00Z",
                                        :article-id 3,
                                        :author "Andrew Lai",
                                        :article-url "my-third-article",
                                        :article-tags "thoughts"}
                                       {:branch-id 4,
                                        :branch-name "main",
                                        :published-at "2022-03-01T00:00:00Z",
                                        :article-id 4,
                                        :author "Andrew Lai",
                                        :article-url
                                        "neural-network-explanation",
                                        :article-tags "thoughts"}
                                       {:branch-id 5,
                                        :branch-name "test",
                                        :published-at nil,
                                        :article-id 4,
                                        :author "Andrew Lai",
                                        :article-url
                                        "neural-network-explanation",
                                        :article-tags "thoughts"}]}))
