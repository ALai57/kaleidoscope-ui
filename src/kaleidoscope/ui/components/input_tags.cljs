(ns kaleidoscope.ui.components.input-tags
  (:require ["kaleidoscope-js/ui/components/InputTags" :refer [InputTags]]))

(defn input-tags
  [{:keys [options on-add on-remove values tag-type] :as args}]
  [:f> InputTags (clj->js {:options  options
                           :onAdd    on-add
                           :onRemove on-remove
                           :vals     values
                           :tagType  tag-type})])
