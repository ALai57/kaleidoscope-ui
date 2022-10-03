(ns andrewslai.cljs.stories.components.slate-editor-stories
  (:require [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.components.slate-editor :as slate-editor]
            [reagent.core :as reagent]
            [shadow.resource :as rc]
            ))

(def ^:export default
  (helper/->default
   {:title     "Editor Subcomponents/Slate Editor"
    :component slate-editor/editor
    :args      {}}))

(defn template
  [args]
  (reagent/as-element [slate-editor/editor (helper/->params args)]))

(def EXAMPLE-INPUT
  (rc/inline "./example-editor-value.txt"))

(def ^:export Default-Editor
  (helper/->story template {:user          {:firstName "Andrew"
                                            :lastName  "Lai"}
                            :initial-value EXAMPLE-INPUT
                            :title         "My new article"
                            :save-fn       (fn [html]
                                             (println "CLICKED SAVE" html))}))
