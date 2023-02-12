(ns andrewslai.cljs.utils
  (:require
   ["react" :as react]
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
