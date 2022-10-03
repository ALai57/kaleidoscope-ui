(ns andrewslai.cljs.stories.components.article-selector-stories
  (:require [andrewslai.cljs.components.article-selector :as article-selector]
            [andrewslai.cljs.stories.thin-article-cards-display-stories :refer [example-recent-content]]
            [andrewslai.cljs.stories.helper :as helper]
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
  (helper/->story template {:recent-content example-recent-content}))
