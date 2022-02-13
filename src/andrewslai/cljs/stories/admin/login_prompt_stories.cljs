(ns andrewslai.cljs.stories.admin.login-prompt-stories
  (:require [andrewslai.cljs.pages.admin :as admin]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Login Prompt"
                     :component admin/login-form
                     :args      {:user-event-handlers
                                 {:on-login-click        (action "on-login-click")
                                  :on-admin-click        (action "on-admin-click")}}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [admin/login-form (helper/->params args)]))

(def ^:export Default-login-prompt
  (helper/->story template {}))

(def ^:export Successful-login
  (helper/->story template {:login-response {:status 200}}))

(def ^:export Failed-login
  (helper/->story template {:login-response {:status 500}}))
