(ns kaleidoscope.ui.stories.thin-article-cards-display-stories
  (:require [kaleidoscope.ui.article-cards :as article-cards]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.thin-article-card-stories :as thin-card-stories]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Article Subcomponents/Thin Article Cards Content"
    :component (fn thin-content-cards
                 [args]
                 [article-cards/thin-content-cards (js->clj args :keywordize-keys true)])
    :args      {:branches [{:branch-id     1
                            :branch-name   "main"
                            :published-at  "2022-03-01T00:00:00Z"
                            :article-id    1
                            :author        "Andrew Lai"
                            :article-url   "my-first-article"
                            :article-title "My First Article"
                            :article-tags  "thoughts"}
                           {:branch-id     2
                            :branch-name   "main"
                            :published-at  "2022-03-01T00:00:00Z"
                            :article-id    2
                            :author        "Andrew Lai"
                            :article-url   "my-second-article"
                            :article-title "My Second Article"
                            :article-tags  "thoughts"}
                           {:branch-id     3
                            :branch-name   "main"
                            :published-at  "2022-03-01T00:00:00Z"
                            :article-id    3
                            :author        "Andrew Lai"
                            :article-url   "my-third-article"
                            :article-title "My Third Article"
                            :article-tags  "thoughts"}
                           {:branch-id     4
                            :branch-name   "main"
                            :published-at  "2022-03-01T00:00:00Z"
                            :article-id    4
                            :author        "Andrew Lai"
                            :article-url   "neural-network-explanation"
                            :article-title "Neural Network Explanation"
                            :article-tags  "thoughts"}
                           {:branch-id     5
                            :branch-name   "test"
                            :published-at  nil
                            :article-id    4
                            :author        "Andrew Lai"
                            :article-url   "neural-network-explanation"
                            :article-title "Neural Network Explanation"
                            :article-tags  "thoughts"}]}}))

(def ^:export Default-thin-content
  (clj->js {}))
