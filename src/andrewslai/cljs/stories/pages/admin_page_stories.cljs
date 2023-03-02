(ns  andrewslai.cljs.stories.pages.admin-page-stories
  (:require [andrewslai.cljs.pages.admin :as admin]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Full Pages/Login Page"
                     :component admin/login-ui
                     :args      {:user-event-handlers
                                 {:on-login-click        (action "on-login-click")
                                  :on-admin-click        (action "on-admin-click")
                                  :on-logout-click       (action "on-logout-click")
                                  :on-edit-profile-click (action "on-edit-profile-click")}}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [admin/login-ui (helper/->params args)]))

(def ^:export Not-Logged-In
  (helper/->story template {}))

(def ^:export Logged-In
  (helper/->story template {:user user-profile/example-user-data}))
