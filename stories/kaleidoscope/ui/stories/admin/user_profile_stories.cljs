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
   {:title     "User Subcomponents/User Profile"
    :component (fn user-profile [args]
                 (let [args (js->clj args :keywordize-keys true)]
                   [admin/user-profile
                    (:user args)
                    (:user-event-handlers args)
                    (:notification-type args)]))
    :args      {:user                example-user-data
                :user-event-handlers {:on-edit-profile-click (action "Clicked edit profile!")
                                      :on-admin-click        (action "Clicked admin!")
                                      :on-login-click        (action "Clicked login!")
                                      :on-logout-click       (action "Clicked logout!")}
                :notification-type   :modal}
    }))

(def ^:export Default-user-profile
  (clj->js {}))
