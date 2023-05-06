(ns kaleidoscope.cljs.utils.events)

(defn event-value
  [^js event]
  (.. event -target -value))
