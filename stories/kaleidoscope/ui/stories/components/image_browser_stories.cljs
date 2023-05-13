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
                         {:name     "A big image"
                          :title    "South america",
                          :alt      "An image"
                          :creator  "andrewslai"
                          :versions {:raw       {:src "https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg?w=374&h=281,%20https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg"}
                                     :thumbnail {:src "https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg?w=374&h=281,%20https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg?w=100&h=100",}}}
                         ]
                :albums [{:title "something"}
                         {:title "something two"}]
                }}))

(def ^:export Image-Browser
  (clj->js {}))
