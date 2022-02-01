(ns andrewslai.cljs.stories.admin.user-profile-stories
  (:require [andrewslai.cljs.pages.admin :as admin]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-user-data
  {:firstName  "Andrew"
   :lastName   "Lai"
   :avatar_url ""
   :username   "andrewslai"
   :email      "andrew.s.lai5@gmail.com"})

(def ^:export default
  (helper/->default {:title     "User Profile"
                     :component admin/user-profile
                     :args      {:user example-user-data}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [admin/user-profile (helper/->params args)]))

(def ^:export Default-user-profile
  (helper/->story template {}))
