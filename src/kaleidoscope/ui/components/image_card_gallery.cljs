(ns kaleidoscope.ui.components.image-card-gallery
  (:require ["kaleidoscope-js/ui/components/ImageCardGallery" :refer [ImageCardGallery]]))

(defn image-card-gallery
  [{:keys [images] :as input}]
  [:f> ImageCardGallery (clj->js input)])
