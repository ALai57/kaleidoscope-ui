(ns kaleidoscope.ui.stories.pages.image-manager-page-stories
  (:require [kaleidoscope.ui.pages.image-manager :as pages.image-manager]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story {:title     "Kaleidoscope/Full Pages/Image Manager Page"
                           :component pages.image-manager/image-manager-page
                           :args      {:user user-profile/example-user-data}}))

(def ^:export Manager-Page
  (js->clj {}))
