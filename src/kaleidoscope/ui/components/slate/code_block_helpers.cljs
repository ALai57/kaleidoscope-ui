(ns kaleidoscope.ui.components.slate.code-block-helpers
  (:require [kaleidoscope.ui.utils :as u]
            [kaleidoscope.ui.utils.events :as events]
            [kaleidoscope.ui.components.slate.prism :as prism]
            [clojure.string :as string]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            ;;["react-dom/server" :as rd]
            ["@udecode/plate" :as plate :refer [ELEMENT_CODE_LINE
                                                ELEMENT_CODE_BLOCK

                                                getRootProps
                                                useEditorRef
                                                setNodes
                                                findNodePath]]
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
  (some-> html-element
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


(def CODE-BLOCK-DESERIALIZATION
  #js {:rules   (clj->js [{:validNodeName "PRE"}
                          {:validNodeName "P"
                           :validStyle    {:fontFamily "Consolas"}}])
       :getNode (fn [el]
                  (let [result (->> el
                                    (get-code-lines)
                                    (map code-line->slate-node)
                                    (clj->js))]
                    #js {:type     ELEMENT_CODE_BLOCK
                         :lang     (get-language-from-html el)
                         :children result}))})

(defn serialize-code-block
  [props]
  ;;(js/console.log "Serializing a code block to HTML" props)
  (let [raw-string (raw-code-string props)
        language   (get-language props)
        element    (reagent/as-element [:r> prism/HighlightHTML
                                        #js {:Prism    prism/PRISM
                                             :theme    prism/DRACULA
                                             :code     raw-string
                                             :language language}
                                        (fn [args]
                                          (let [{:keys [className style tokens
                                                        getTokenProps getLineProps] :as clj-args} (u/clojurize args)

                                                ;; Rebind - `tokens` is actually a collection of lines
                                                ;; Lines are collections of tokens
                                                ;; line = [token token token]
                                                lines tokens]
                                            ;;(js/console.log "ARGS" args clj-args className tokens)
                                            (reagent/as-element [:pre {:className className
                                                                       :style     style}
                                                                 [:code {:className (str language " language-" language)}
                                                                  [:span {:data-slate-node "text"}
                                                                   (map-indexed (fn [line-num tokens]
                                                                                  [:div (-> #js {:line tokens}
                                                                                            (getLineProps)
                                                                                            (u/clojurize)
                                                                                            (assoc :key (str "line-" line-num))
                                                                                            (update :className (fn [x] (str x " slate-code_line")))
                                                                                            )
                                                                                   (map-indexed (comp prism/token-props->hiccup getTokenProps prism/->token-props)
                                                                                                tokens)])
                                                                                lines)]]])))])]
    ;;(println "THE ELEMENT" (rd/renderToString element))
    element))

(def LANGUAGES
  {
   :clojure    "Clojure"
   :bash       "Bash"
   :html       "HTML"
   :java       "Java"
   :javascript "Javascript"
   :json       "JSON"
   :python     "Python"
   :ruby       "Ruby"
   :sql        "SQL"
   })

(defn CodeBlockSelectElement
  [{:keys [lang on-change] :as props}]
  (let [v (reagent/atom lang)]
    (fn []
      [:select {:value           @v
                :style           {:float "right"}
                :onClick         (fn [e] (.stopPropagation e))
                :onChange        (fn [e]
                                   (on-change (events/event-value e))
                                   (reset! v (events/event-value e)))
                :contentEditable false}
       (for [[k v] LANGUAGES]
         [:option {:key   (name k)
                   :value (name k)}
          v])
       ])))

(defn CustomCodeBlock
  [{:keys [attributes children nodeProps element editor] :as props}]
  (js/console.log props)
  ;;(println props)
  (let [lang       (.-lang element)
        class-name (and lang (gstr/format "%s language-%s" lang lang))
        root-props (getRootProps (clj->js props))]
    ;;(js/console.log attributes nodeProps root-props)
    [:<>
     [:pre (merge (js->clj attributes)
                  {:className (str "prism-code slate-code_block language-" lang)})
      [CodeBlockSelectElement {:data-testid "CodeBlockSelectElement"
                               :editor      editor
                               :lang        lang
                               :on-change   (fn [v]
                                              (println "Handling language change to " v)
                                              (when-let [path (findNodePath editor element)]
                                                (setNodes editor
                                                          #js {:lang v}
                                                          #js {:at path})))}]
      [:code {:className class-name}
       children]]])

  )
