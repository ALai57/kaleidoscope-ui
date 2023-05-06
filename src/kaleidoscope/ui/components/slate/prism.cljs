(ns kaleidoscope.ui.components.slate.prism
  (:require [kaleidoscope.ui.utils :as u]
            [goog.object :as g]
            ["./prism" :as prism]
            ["prism-react-renderer" :as Highlight]
            ["prism-react-renderer/themes/dracula" :as theme])
  )


(def PRISM
  ;;(g/get Highlight/defaultProps "Prism")
  prism)

(def HighlightHTML
  "A react component that can be used to highlight raw HTML code"
  Highlight/default)

(def DRACULA
  theme/default)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Prism syntax highlighting helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn ->token-props
  "Make the Javascript input to `getTokenProps`"
  [c token]
  #js {:token (clj->js token)
       :key   (str "token-" c)})

(defn token-props->hiccup
  [token-props]
  ;;(js/console.log "TOKEN PROPS" token-props)
  [:span (-> token-props
             (u/clojurize)
             (update :children u/unescape)
             (update :className (fn [x]
                                  (str "prism-token " x))))])

(comment
  (js/console.log "HIGHLIGHT"
                  Highlight/default
                  theme/default
                  (g/get Highlight/defaultProps "Prism"))

  (pretty "<h1 class=\"slate-h1\">Deserialize HTML</h1><div class=\"slate-p\">By default, pasting content into a Slate editor will use the clipboard&apos;s <code class=\"slate-code\">&apos;text/plain&apos;</code>data. That&apos;s okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle <code class=\"slate-code\">&apos;text/html&apos;</code>data.</div><div class=\"slate-p\">This is an example of doing exactly that!</div><div class=\"slate-p\">Try it out for yourself! Copy and paste some rendered HTML rich text content (not the source code) from another site into this editor and it&apos;s formatting should be preserved.</div><div class=\"slate-p\"></div>")
  )
