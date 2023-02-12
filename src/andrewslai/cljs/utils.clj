(ns andrewslai.cljs.utils)

(defmacro lazy-component [the-sym]
  `(andrewslai.cljs.utils/lazy-component* (shadow.lazy/loadable ~the-sym)))
