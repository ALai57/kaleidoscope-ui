(ns kaleidoscope.ui.stories.pages.image-manager-page-stories
  (:require [kaleidoscope.ui.pages.image-manager :as pages.image-manager]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story {:title     "Kaleidoscope/Full Pages/Image Manager Page"
                           :component pages.image-manager/-image-manager-page
                           :args      {:user   user-profile/example-user-data
                                       :images [{:name       "An image"
                                                 :title      "This is me!",
                                                 :alt        "An image"
                                                 :creator    "andrewslai"
                                                 :created_at "2023-05-14T16:12:50Z"
                                                 :versions   {:raw       {:src "https://avatars.githubusercontent.com/u/20470077?v=4",}
                                                              :thumbnail {:src "https://avatars.githubusercontent.com/u/20470077?s=40&v=4",}}}
                                                {:name     "Another image"
                                                 :title    "This is someone else",
                                                 :alt      "An image"
                                                 :creator  "andrewslai"
                                                 :versions {:raw       {:src "https://avatars.githubusercontent.com/u/20470078?v=4",}
                                                            :thumbnail {:src "https://avatars.githubusercontent.com/u/20470078?s=40&v=4",}}}
                                                {:name       "A big image"
                                                 :title      "South america",
                                                 :alt        "An image"
                                                 :creator    "andrewslai"
                                                 :created_at "2023-08-14T22:12:50Z"
                                                 :versions   {:raw {:src "https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg?w=374&h=281,%20https://i.natgeofe.com/n/2a832501-483e-422f-985c-0e93757b7d84/6.jpg"}}}
                                                ]}}))

(def ^:export Manager-Page
  (js->clj {}))
