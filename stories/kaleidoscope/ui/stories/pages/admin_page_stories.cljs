(ns  kaleidoscope.ui.stories.pages.admin-page-stories
  (:require [kaleidoscope.ui.pages.admin :as admin]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default-story
   {:title     "Full Pages/Login Page"
    :component (fn login-ui [args]
                 [admin/login-ui (js->clj args :keywordize-keys true)])
    :args      {:user                user-profile/example-user-data
                :user-event-handlers {:on-login-click        (action "on-login-click")
                                      :on-admin-click        (action "on-admin-click")
                                      :on-logout-click       (action "on-logout-click")
                                      :on-edit-profile-click (action "on-edit-profile-click")}}}))

(def ^:export Not-Logged-In
  (clj->js {:args {:user nil}}))

(def ^:export Logged-In
  (clj->js {}))
