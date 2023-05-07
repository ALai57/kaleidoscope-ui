(ns kaleidoscope.ui.stories.components.article-selector-stories
  (:require [kaleidoscope.ui.components.article-selector :as article-selector]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent-mui.components :refer [button]]
            [reagent.core :as reagent]))

(defn expand-button
  [props]
  [button props "Click me"])

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Articles/Article Selector"
    :component article-selector/article-selector
    :args      {:branches      [{:branch-id     1
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
                                 :article-tags  "thoughts"}]
                :expand-button (fn
                                 [props]
                                 [button/button (merge props {:text "Click me"})])}}))

(def ^:export Default-Side-Menu
  (clj->js {}))
