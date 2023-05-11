(ns kaleidoscope.ui.stories.components.image-browser-stories
  (:require [kaleidoscope.ui.components.image-browser :as image-browser]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "JSX Components/Images/Image Browser"
    :component image-browser/image-browser
    :args      {:images [{:name     "An image"
                          :title    "This is me!",
                          :alt      "An image"
                          :creator  "andrewslai"
                          :versions {:raw       {:src "https://avatars.githubusercontent.com/u/20470077?v=4",}
                                     :thumbnail {:src "https://avatars.githubusercontent.com/u/20470077?s=40&v=4",}}}
                         {:name     "Another image"
                          :title    "This is someone else",
                          :alt      "An image"
                          :creator  "andrewslai"
                          :versions {:raw       {:src "https://avatars.githubusercontent.com/u/20470078?v=4",}
                                     :thumbnail {:src "https://avatars.githubusercontent.com/u/20470078?s=40&v=4",}}}
                         ]
                :albums [{:title "something"}
                         {:title "something two"}]
                }}))

(def ^:export Image-Browser
  (clj->js {}))
