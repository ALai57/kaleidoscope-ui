(ns andrewslai.cljs.stories.components.groups.group-manager-stories
  (:require [andrewslai.cljs.components.groups.group-manager :as group-manager]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Groups Components/Group Manager"
                     :component group-manager/group-manager
                     :args      {:groups [{:display-name "My group 1" :members [{:id 1 :name "Andrew"}
                                                                                {:id 2 :name "Bob"}
                                                                                {:id 3 :name "Alice"}] }
                                          {:display-name "My group 2" :members [{:id 1 :name "Caheri"}] }
                                          {:display-name "My group 3" :members [{:id 1 :name "Bob"}] }
                                          ]
                                 }}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [group-manager/group-manager (helper/->params args)]))

;; https://github.com/arttuka/reagent-material-ui/blob/06d5e6538ac80f6ac9883d40e8db668c44bcef84/example/src/example/data_grid.cljs
(def ^:export Default-Group-Manager
  (helper/->story template {}))
