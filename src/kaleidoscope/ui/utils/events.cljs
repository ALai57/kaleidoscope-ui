(ns kaleidoscope.ui.utils.events)

(defn event-value
  [^js event]
  (.. event -target -value))
