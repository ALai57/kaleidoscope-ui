(ns kaleidoscope.ui.utils.slate-helper
  (:require [kaleidoscope.ui.utils :as u]
            [clojure.string :as string]
            [goog.string :as gstr]
            ["@udecode/plate" :as plate :refer [ELEMENT_CODE_LINE]]
            ))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; HTML element helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn get-text
  [html-element]
  (.-innerText html-element))

(defn get-elements-by-class
  [html-element class-name]
  (->> class-name
       (.getElementsByClassName html-element)
       (array-seq)))


(defn unescape
  "https://github.com/reagent-project/reagent/issues/413"
  [s]
  (and s (gstr/unescapeEntities s)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Generic serialization helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn get-children-elements
  "Used to get code block lines from a code block."
  [props]
  (u/clojurize (.-children (.-element props))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Code Blocks
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn get-language
  [props]
  (.-lang (.-element props)))

(defn code-block-line->text
  [child]
  (get-in child [:children 0 :text]))

(defn raw-code-string
  "Get the raw code from the children of an element about to be serialized."
  [props]
  (->> props
       (get-children-elements)
       (map code-block-line->text)
       (string/join "\n")))

(defn get-language-from-html
  [html-element]
  (-> html-element
      (.-className)
      (.match #"language-(?<language>\w+)")
      (.-groups)
      (.-language)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Code Lines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn get-code-lines
  [html-element]
  (get-elements-by-class html-element "slate-code_line"))

(defn code-line->slate-node
  "Input should be a slate element (a code line element)"
  [slate-element]
  #js {:type     ELEMENT_CODE_LINE
       :children (clj->js [{:text (get-text slate-element)}])})
