(ns andrewslai.cljs.components.slate-editor
  (:require [reagent.core :as reagent]
            ["slate-react" :as slate-react :refer [Slate Editable]]
            ["slate" :as slate]
            ["@udecode/plate-ui-toolbar" :refer [Toolbar ToolbarButtons]]))


;; https://plate.udecode.io/
;; Add Plate and use it and plugins for rich text editing
(defn editor-ui
  [{:keys [none]}]
  (let [editor (slate/createEditor)]
    (js/console.log editor)
    [:div
     [:br]
     [:h1 "Editor"]
     [:br]
     [:> Slate
      {:editor editor
       :value  [{:type     "paragraph"
                 :children [{:text "A line of text in a paragraph."}]}]}
      [:> Toolbar
       [:> ToolbarButtons]]
      [:> Editable]]]))
