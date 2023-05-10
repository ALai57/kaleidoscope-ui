(ns kaleidoscope.ui.components.image-card
  (:require ["kaleidoscope-js/ui/components/ImageCard" :refer [ImageCard]]))

(defn image-card
  [{:keys [image]}]
  [:f> ImageCard (clj->js {:image image})])
