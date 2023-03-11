(ns andrewslai.cljs.utils
  (:require [clojure.string :as str]
            [goog.string :as gstr]
            [reagent.core :as r]
            [shadow.lazy :as lazy]))

(defn image->blob [the-bytes]
  (let [data-blob (js/Blob. #js [the-bytes] #js {:type "image/png"})]
    (.createObjectURL js/URL data-blob)))

;; https://github.com/fricze/code-splitting-clojurescript/blob/master/src/main/demo/util.cljs
(defn lazy-component [loadable]
  (fn [{:keys [fallback] :as props}]
    (let [component (r/atom (or fallback (fn [] nil)))
          _         (-> (lazy/load loadable)
                        (.then (fn [root-el]
                                 (reset! component root-el))))]
      (fn [props]
        [@component props]))))

(defn clojurize
  [x]
  (js->clj x :keywordize-keys true))

(defn unescape
  "https://github.com/reagent-project/reagent/issues/413"
  [s]
  (and s (gstr/unescapeEntities s)))

(defn date
  [iso-string]
  (first (str/split iso-string #"T")))
