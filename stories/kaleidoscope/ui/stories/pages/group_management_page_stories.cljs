(ns  kaleidoscope.ui.stories.pages.group-management-page-stories
  (:require [kaleidoscope.ui.pages.groups :as groups]
            [kaleidoscope.ui.stories.helper :as helper]
            [kaleidoscope.ui.stories.admin.user-profile-stories :as user-profile]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Full Pages/Group Management Page"
                     :component groups/-group-page
                     :args      {:user   {}
                                 :groups [{:group-id     "group-1"
                                           :display-name "Family"
                                           :memberships  [{:membership-id         1
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Alison"
                                                           :email                 "Alison@email.com"}
                                                          {:membership-id         2
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Mom"
                                                           :email                 "mom@email.com"}
                                                          {:membership-id         3
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Dad"
                                                           :email                 "dad@email.com"}
                                                          ]}
                                          {:group-id     "group-2"
                                           :display-name "NU Friends"
                                           :memberships  [{:membership-id         1
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Steve"
                                                           :email                 "Steve@email.com"}
                                                          {:membership-id         2
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Tim"
                                                           :email                 "Tim@email.com"}
                                                          {:membership-id         3
                                                           :membership-created-at "2021-01-01"
                                                           :alias                 "Sahil"
                                                           :email                 "Sahil@email.com"}
                                                          ]}]}}))



;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [groups/-group-page (helper/->params args)]))

(def ^:export Example-Group-Management-Page
  (helper/->story template {}))
