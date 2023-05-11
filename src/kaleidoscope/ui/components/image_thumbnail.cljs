(ns kaleidoscope.ui.components.image-thumbnail
  (:require ["kaleidoscope-js/ui/components/ImageThumbnail" :refer [ImageThumbnail]]))

(defn image-thumbnail
  [{:keys [image auth-token on-click] :as args}]
  [:f> ImageThumbnail (clj->js {:image     image
                                :authToken auth-token
                                :onClick   on-click})])
