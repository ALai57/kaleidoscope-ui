(ns kaleidoscope.ui.stories.components.thumbnail-stories
  (:require [kaleidoscope.ui.components.thumbnail :as thumbnail]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Thumbnail"
    :component thumbnail/thumbnail
    :args      {:image-url "/images/volunteer-unverified.png"}}))

(def ^:export Default-Avatar
  (clj->js {}))
