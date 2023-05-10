(ns kaleidoscope.ui.stories.components.image-card-stories
  (:require [kaleidoscope.ui.components.image-card :as image-card]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "JSX Components/Image Card"
    :component image-card/image-card
    :args      {:image {:src   "https://avatars.githubusercontent.com/u/20470077?v=4",
                        :title "This is me!",
                        :body  "This is a picture of me",
                        :alt   "Click me"}}}))

(def ^:export Example-Image-Card
  (clj->js {}))
