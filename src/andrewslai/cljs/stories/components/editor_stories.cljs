(ns andrewslai.cljs.stories.components.editor-stories
  (:require [andrewslai.cljs.components.editor :as editor]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Editor"
                     :component editor/basic-editor
                     :args      {}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [editor/basic-editor (helper/->params args)]))

(def ^:export Default-Editor
  (helper/->story template {}))
