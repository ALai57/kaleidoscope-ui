(ns kaleidoscope.ui.components.article
  (:require [kaleidoscope.ui.utils.core :as u]
            [goog.string :as gstr]
            [hickory.core :as h]
            [hickory.convert :refer [hickory-to-hiccup]]
            [hickory.select :as hs]
            [reagent-mui.components :refer [box]]
            [taoensso.timbre :refer-macros [infof]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Helper functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn string->tokens
  "Takes a string with syles and parses it into properties and value tokens"
  [style]
  {:pre [(string? style)]
   :post [(even? (count %))]}
  (->> (clojure.string/split style #";")
       (mapcat #(clojure.string/split % #":"))
       (map clojure.string/trim)))

(defn tokens->map
  "Takes a seq of tokens with the properties (even) and their values (odd)
   and returns a map of {properties values}"
  [tokens]
  {:pre [(even? (count tokens))]
   :post [(map? %)]}
  (zipmap (keep-indexed #(if (even? %1) %2) tokens)
          (keep-indexed #(if (odd? %1) %2) tokens)))

(defn style->map
  "Takes an inline style attribute stirng and converts it to a React Style map"
  [style]
  (if (empty? style)
    style
    (tokens->map (string->tokens style))))

(defn hiccup->sablono
  "Transforms a style inline attribute into a style map for React"
  [coll]
  (clojure.walk/postwalk
   (fn [x]
     (if (map? x)
       (update-in x [:style] style->map)
       x))
   coll))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Formatting title, JS and content
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn format-title [title]
  [:h2.article-title title])

(defn format-js [js-script]
  (.appendChild (.getElementById js/document "primary-content")
                (doto (.createElement js/document "script")
                  (-> (.setAttribute "id" js-script))
                  (-> (.setAttribute "class" "dynamicjs"))
                  (-> (.setAttribute "src" js-script))))
  ^{:key (str js-script)} [:div])

(defn unescape
  "https://github.com/reagent-project/reagent/issues/413"
  [v]
  (cond
    (vector? v) (mapv unescape v)
    (string? v) (gstr/unescapeEntities v)
    :else       v))

(defn format-content [content]
  [:div#article-content
   (when content
     (->> content
          hickory-to-hiccup
          unescape
          hiccup->sablono))])

(defn insert-dynamic-js! [content]
  (when-not (empty? content)
    (map format-js content)))


(defn ->hickory
  [s]
  (->> s
       h/parse-fragment
       (map h/as-hickory)
       first))

(defn select-html
  [hickory]
  (->> hickory
       (hs/select (hs/and (hs/not (hs/tag :script))))
       first))

(defn select-js
  [hickory]
  (hs/select (hs/tag :script) hickory))

(defn article
  [{:keys [article-title author modified-at content]}]
  (let [js-content (select-js (->hickory content))]
    (infof (gstr/format "Selecting JS content from %s : %s" content js-content))
    [box
     [:div#goodies
      [:h2.article-title article-title]
      [:div.article-subheading (str "Author: " author)]
      [:div.article-subheading (u/date modified-at)]
      [:div.divider.py-1.bg-dark]
      [:br][:br]
      [:div (format-content (select-html (->hickory content)))]
      (insert-dynamic-js! (map (comp :src :attrs) js-content))
      ]]))

(comment
  (require '[re-frame.db :refer [app-db]])
  (map h/as-hiccup (h/parse-fragment (:content (get-content (:active-content @app-db)))))
  (format-js "test-paragraph.js")
  (get-js (:active-content @app-db))
  )

(comment
  (hiccup->sablono (first (map h/as-hiccup (h/parse-fragment "<div><font color=\"#ce181e\"><font face=\"Ubuntu Mono\"><font size=\"5\"><b>A basic test</b></font></font></font><p style=\"color:red\">Many of the</p><p>Usually, that database</p></div>"))))
  )
