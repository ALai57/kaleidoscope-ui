(ns kaleidoscope.ui.stories.components.slate-editor-stories
  (:require [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.components.slate-editor :as slate-editor]
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
                            :publish-fn    (fn [a]
                                             (println "Clicked Publish" a))
                            :save-fn       (fn [html]
                                             (println "CLICKED SAVE" html))}))
