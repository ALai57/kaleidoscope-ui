(ns kaleidoscope.ui.stories.components.slate-editor-stories
  (:require [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.components.slate-editor :as slate-editor]
            [reagent.core :as reagent]
            [shadow.resource :as rc]
            ))

(def EXAMPLE-INPUT
  (rc/inline "./example-editor-value.txt"))

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Editor/Slate Editor"
    :component slate-editor/editor
    :args      {:user           {:firstName "Andrew"
                                 :lastName  "Lai"}
                :initial-branch {:content       EXAMPLE-INPUT
                                 :article-title "My example article"
                                 :branch-id     1
                                 :branch-name   "main"}
                :publish-fn     (fn [a]
                                  (println "Clicked Publish" a))
                :save-fn        (fn [html]
                                  (println "CLICKED SAVE" html))}}))

(def ^:export Default-Editor
  (clj->js {}))
