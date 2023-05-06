(ns kaleidoscope.cljs.stories.thin-article-cards-display-stories
  (:require [kaleidoscope.cljs.article-cards :as article-cards]
            [kaleidoscope.cljs.stories.helper :as helper]
            [kaleidoscope.cljs.stories.thin-article-card-stories :as thin-card-stories]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Article Subcomponents/Thin Article Cards Content"
                     :component article-cards/thin-content-cards}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  [args]
  (reagent/as-element [article-cards/thin-content-cards (helper/->params args)]))

(def ^:export Default-thin-content
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
