(ns  kaleidoscope.ui.stories.pages.admin-page-stories
  (:require ["@storybook/addon-actions" :refer [action]]
            [kaleidoscope.ui.pages.admin :as admin]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Full Pages/Login Page"
    :component admin/login-ui
    :args      {:user                user-profile/example-user-data
                :user-event-handlers {:on-login-click        (action "on-login-click")
                                      :on-admin-click        (action "on-admin-click")
                                      :on-logout-click       (action "on-logout-click")
                                      :on-edit-profile-click (action "on-edit-profile-click")}}}))

(def ^:export Not-Logged-In
  (clj->js {:args {:user nil}}))

(def ^:export Logged-In
  (clj->js {}))
