(ns kaleidoscope.ui.stories.admin.user-profile-stories
  (:require [kaleidoscope.ui.pages.admin :as admin]
            [kaleidoscope.ui.stories.helper :as helper]
            ["@storybook/addon-actions" :refer [action]]))

(def example-user-data
  {:given_name  "Andrew"
   :family_name "Lai"
   :avatar_url  ""
   :username    "andrewslai"
   :email       "alai@not-a-real-email.com"})

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/User Profile/User Login Widget"
    :component admin/user-profile
    :args      {:user                example-user-data
                :user-event-handlers {:on-edit-profile-click (action "Clicked edit profile!")
                                      :on-admin-click        (action "Clicked admin!")
                                      :on-login-click        (action "Clicked login!")
                                      :on-logout-click       (action "Clicked logout!")}
                :notification-type   :modal}}))

(def ^:export Logged-in
  (clj->js {}))

(def ^:export Logged-out
  (clj->js {:args {:user nil}}))
