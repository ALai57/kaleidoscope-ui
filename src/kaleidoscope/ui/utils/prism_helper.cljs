(ns kaleidoscope.ui.utils.prism-helper
  (:require [kaleidoscope.ui.utils :as u]))

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
             (update :children unescape)
             (update :className (fn [x]
                                  (str "prism-token " x))))])
