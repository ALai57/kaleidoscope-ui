(ns  andrewslai.cljs.stories.pages.group-management-page-stories
  (:require [andrewslai.cljs.pages.groups :as groups]
            [andrewslai.cljs.stories.helper :as helper]
            [andrewslai.cljs.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Full Pages/Group Management Page"
                     :component groups/-group-page
                     :args      {:user   {}
                                 :groups [{:id           "group-1"
                                           :display-name "Family"
                                           :members      [{:id 1 :name "Alison" :email "alison@gmail.com" :added-at "2021-01-01"}
                                                          {:id 2 :name "Mom"    :email "mom@gmail.com"    :added-at "2021-01-01"}
                                                          {:id 3 :name "Dad"    :email "dad@gmail.com"    :added-at "2021-01-01"}] }
                                          {:id           "group-2"
                                           :display-name "Friends"
                                           :members      [{:id 1 :name "Steve" :email "steve@gmail.com" :added-at "2021-01-01"}
                                                          {:id 2 :name "Tim"   :email "tim@gmail.com"   :added-at "2021-01-01"}
                                                          {:id 3 :name "Sahil" :email "sahil@gmail.com" :added-at "2021-01-01"}] }]
                                 }}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [groups/-group-page (helper/->params args)]))

(def ^:export Example-Group-Management-Page
  (helper/->story template {}))
