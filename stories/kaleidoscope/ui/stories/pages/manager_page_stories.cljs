(ns kaleidoscope.ui.stories.pages.manager-page-stories
  (:require [kaleidoscope.ui.pages.manager :as pages.manager]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story {:title     "Kaleidoscope/Full Pages/Manager Page"
                           :component pages.manager/manager-page
                           :args      {:user user-profile/example-user-data}}))

(def ^:export Manager-Page
  (js->clj {}))
