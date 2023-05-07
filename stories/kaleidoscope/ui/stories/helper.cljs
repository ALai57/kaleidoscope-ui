(ns kaleidoscope.ui.stories.helper
  (:require [kaleidoscope.ui.utils :as u]
            [reagent.core :as reagent]))

(defn ->params [^js args]
  (u/clojurize args))

(defn ->reactified [options path]
  (if (get-in options path)
    (update-in options path reagent/reactify-component)
    options))

(defn ->default [options]
  (-> options
      (->reactified [:component])
      (->reactified [:parameters :docs :page])
      clj->js))

(defn copy-function
  [f]
  (.bind f #js {}))

(defn ->story
  "Copy a function and modify the default arguments.
  Used to create stories that have default configurations."
  [template default-values]
  (doto ^js/Function (copy-function template)
    (set! -args (clj->js default-values))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; API V2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn reactify
  [story-metadata path]
  (if (get-in story-metadata path)
    (update-in story-metadata path reagent/reactify-component)
    story-metadata))

(defn ->default-story
  [story-metadata]
  (-> story-metadata
      (reactify [:component])
      clj->js))
