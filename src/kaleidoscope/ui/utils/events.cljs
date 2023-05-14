(ns kaleidoscope.ui.utils.events)

(defn event-value
  [^js event]
  (.. event -target -value))

(defn event-files
  [^js event]
  (.. event -target -files))
