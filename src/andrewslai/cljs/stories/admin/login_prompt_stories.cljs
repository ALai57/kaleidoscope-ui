(ns andrewslai.cljs.stories.admin.login-prompt-stories
  (:require [andrewslai.cljs.pages.admin :as admin]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Login Prompt"
                     :component admin/login-form
                     :argTypes  {:on-login-click {:action "Clicked to login!"}
                                 :on-admin-click {:action "Clicked to check admin!"}}
                     :args      {}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [admin/login-form (helper/->params args)]))

(def ^:export Default-login-prompt
  (helper/->story template {}))
