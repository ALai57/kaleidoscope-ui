(ns andrewslai.cljs.stories.admin.login-ui-stories
  (:require [andrewslai.cljs.pages.admin :as admin]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Login UI"
                     :component admin/login-ui
                     :args      {:user user-profile/example-user-data}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [admin/login-ui (helper/->params args)]))

(def ^:export Default-login-ui
  (helper/->story template {}))
