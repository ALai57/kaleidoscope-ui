(ns kaleidoscope.ui.stories.components.image-card-gallery-stories
  (:require [kaleidoscope.ui.components.image-card-gallery :as image-card-gallery]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "JSX Components/Images/Image Card Gallery"
    :component image-card-gallery/image-card-gallery
    :args      {:images [{:src   "https://avatars.githubusercontent.com/u/20470027?v=4",
                          :alt   "Click me"}
                         {:src   "https://avatars.githubusercontent.com/u/20470028?v=4",
                          :alt   "Click me"}
                         {:src   "https://avatars.githubusercontent.com/u/20470029?v=4",
                          :alt   "Click me"}]}}))

(def ^:export Example-Image-Card-Gallery
  (clj->js {}))
