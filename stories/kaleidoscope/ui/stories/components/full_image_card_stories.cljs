(ns kaleidoscope.ui.stories.components.full-image-card-stories
  (:require [kaleidoscope.ui.components.full-image-card :as full-image-card]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "JSX Components/Images/Full Image Card"
    :component full-image-card/full-image-card
    :args      {:image {:src   "https://avatars.githubusercontent.com/u/20470077?v=4",
                        :title "This is me!",
                        :body  "This is a picture of me",
                        :alt   "Click me"}}}))

(def ^:export Full-Image-Card
  (clj->js {}))
