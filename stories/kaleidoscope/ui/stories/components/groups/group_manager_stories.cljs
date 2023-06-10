(ns kaleidoscope.ui.stories.components.groups.group-manager-stories
  (:require [kaleidoscope.ui.components.groups.group-manager :as group-manager]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))
(def groups
  [{:group-id     "group-1"
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
                   ]}
   {:group-id     "group-3"
    :display-name "Empty group"
    :memberships  []}
   ])

(def ^:export default
  (helper/->default-story
   {:title     "Kaleidoscope/Managers/Group Manager"
    :component group-manager/group-manager
    :args      {:open   (reagent/atom (vec (repeat (count groups) false)))
                :groups groups}}))

;; https://github.com/arttuka/reagent-material-ui/blob/06d5e6538ac80f6ac9883d40e8db668c44bcef84/example/src/example/data_grid.cljs
(def ^:export Default-Group-Manager
  (clj->js {}))
