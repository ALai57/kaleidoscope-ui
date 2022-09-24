(ns andrewslai.cljs.stories.components.slate-editor-stories
  (:require [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.components.slate-editor :as slate-editor]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default
   {:title     "Slate Editor"
    :component slate-editor/editor
    :args      {}}))

(defn template
  [args]
  (reagent/as-element [slate-editor/editor (helper/->params args)]))

(def ^:export Default-Editor
  (helper/->story template {:user          {:firstName "Andrew"
                                            :lastName  "Lai"}
                            :initial-value slate-editor/INITIAL-VALUE
                            :title         "My new article"
                            :save-fn       (fn [html]
                                             (js/console.log "CLICKED SAVE" html))}))
