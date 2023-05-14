(ns kaleidoscope.ui.components.image-browser
  (:require ["kaleidoscope-js/ui/components/ImageBrowser" :refer [ImageBrowser]]))

(defn image-browser
  [{:keys [images auth-token albums photo-manager] :as args}]
  (let [{:keys [add-photo]} photo-manager]
    [:f> ImageBrowser (clj->js {:images       images
                                :authToken    auth-token
                                :albums       (or albums [])
                                :photoManager (if photo-manager
                                                {:addPhoto add-photo}
                                                {})})]))
