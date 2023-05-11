(ns kaleidoscope.ui.components.full-image-card
  (:require ["kaleidoscope-js/ui/components/FullImageCard" :refer [FullImageCard]]))

(defn full-image-card
  [{:keys [image auth-token force-rerender] :as args}]
  [:f> FullImageCard (clj->js {:image         image
                               :authToken     auth-token
                               :forceRerender force-rerender})])
