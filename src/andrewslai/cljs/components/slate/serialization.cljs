(ns andrewslai.cljs.components.slate.serialization
  "Pretty print a serialized version of the editor state to HTML"
  (:require [andrewslai.cljs.components.slate.prism :as prism]
            [andrewslai.cljs.utils :as u]
            ["pretty" :as pretty]
            [reagent.core :as reagent]
            ["@udecode/plate" :as plate :refer [serializeHtml
                                                useEditorState]]))

(defn serialize
  [editor]
  (serializeHtml editor #js {:nodes (.-children editor)

                             ;; Preserve class names of tokenized Prism/code blocks
                             ;; so they will display with syntax highlighting
                             :preserveClassNames #js ["slate-"
                                                      "slate-code_block"
                                                      "slate-code_line"
                                                      "language"
                                                      "prism-token"
                                                      "prism-"
                                                      "token"
                                                      "selector"
                                                      "property"
                                                      "punctuation"
                                                      "string"
                                                      "number"
                                                      "keyword"
                                                      "operator"
                                                      "builtin"]}))

(defn PrettyHtml
  []
  (let [editor (useEditorState)
        html   (serialize editor)]
    ;;(js/console.log "EDITOR" editor)
    ;;(js/console.log "SERIALIZED HTML" (pretty html #js {:ocd true}))
    [:r> prism/HighlightHTML
     #js {:Prism    prism/PRISM
          :theme    prism/DRACULA
          :code     (pretty html)
          :language "jsx"}
     (fn [args]
       (let [{:keys [className style tokens getLineProps getTokenProps] :as clj-args} (u/clojurize args)

             element (reagent/as-element
                      [:pre {:className className
                             :style     style}
                       (map-indexed (fn [i line]
                                      [:div (-> #js {:line line}
                                                (getLineProps)
                                                (u/clojurize)
                                                (assoc :key (str "line-" i)))
                                       (map-indexed (comp prism/token-props->hiccup getTokenProps prism/->token-props)
                                                    line)])
                                    tokens)])]
         ;;(js/console.log "ARGS" args clj-args)
         ;;(js/console.log "TOKENS" xxx)
         ;;(js/console.log "TOKENS" tokens (clj->js tokens))
         ;;(println "THE WHOLE THING" (rd/renderToString element))
         element))]))
