(ns andrewslai.cljs.stories.pages.manager-page-stories
  (:require [andrewslai.cljs.pages.manager :as pages.manager]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Full Pages/Manager Page"
                     :component pages.manager/manager-page
                     :args      {}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [pages.manager/manager-page (helper/->params args)]))

(def ^:export Manager-Page
  (helper/->story template {:user user-profile/example-user-data}))
