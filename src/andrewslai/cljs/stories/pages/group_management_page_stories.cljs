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
                                 :groups [{:id "group-1" :display-name "Family" :members [{:id 1 :name "Andrew"}
                                                                                          {:id 2 :name "Alison"}
                                                                                          {:id 3 :name "Mom"}
                                                                                          {:id 4 :name "Dad"}] }
                                          {:id "group-1" :display-name "Friends" :members [{:id 1 :name "Andrew"}
                                                                                           {:id 2 :name "Steve"}
                                                                                           {:id 3 :name "Tim"}
                                                                                           {:id 4 :name "Sahil"}] }]
                                 }}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [groups/-group-page (helper/->params args)]))

(def ^:export Example-Group-Management-Page
  (helper/->story template {}))
