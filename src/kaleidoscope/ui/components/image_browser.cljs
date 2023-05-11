(ns kaleidoscope.ui.components.image-browser
  (:require ["kaleidoscope-js/ui/components/ImageBrowser" :refer [ImageBrowser]]))

(defn image-browser
  [{:keys [images auth-token albums] :as args}]
  [:f> ImageBrowser (clj->js {:images    images
                              :authToken auth-token
                              :albums    (or albums [])})])
