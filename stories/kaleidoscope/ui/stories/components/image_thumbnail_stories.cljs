(ns kaleidoscope.ui.stories.components.image-thumbnail-stories
  (:require [kaleidoscope.ui.components.image-thumbnail :as image-thumbnail]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Image Thumbnail"
    :component image-thumbnail/image-thumbnail
    :args      {}}))

(def ^:export Default-Image-Thumbnail-Story
  (clj->js {}))
