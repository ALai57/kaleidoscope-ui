(ns andrewslai.cljs.stories.components.slate-editor-stories
  (:require [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.components.slate-editor :as slate-editor]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default
   {:title     "Slate Editor"
    :component slate-editor/editor-ui
    :args      {}}))

(defn template
  [args]
  (reagent/as-element [slate-editor/editor-ui (helper/->params args)]))

(def ^:export Default-Editor
  (helper/->story template {}))
