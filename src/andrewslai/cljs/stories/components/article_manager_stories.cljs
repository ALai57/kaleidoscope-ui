(ns andrewslai.cljs.stories.components.article-manager-stories
  (:require [andrewslai.cljs.components.article-manager :as article-manager]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def article-groups
  [{:group-name   "January 2023"
    :display-name "January 2023"
    :articles     [{:article-id         1
                    :article-name       "My first article"
                    :article-created-at "2021-01-01"}
                   {:article-id         2
                    :article-name       "My second article"
                    :article-created-at "2021-01-01"}
                   {:article-id         3
                    :article-name       "A third article"
                    :article-created-at "2021-01-01"}]}
   {:group-name   "February 2023"
    :display-name "February 2023"
    :articles     [{:article-id         4
                    :article-name       "Yet another"
                    :article-created-at "2021-01-01"}
                   {:article-id         5
                    :article-name       "I keep writing things!"
                    :article-created-at "2021-01-01"}
                   {:article-id         6
                    :article-name       "Last one, I promise"
                    :article-created-at "2021-01-01"}]}
   ])

(def ^:export default
  (helper/->default {:title     "Manager Subcomponents/Article Manager"
                     :component article-manager/article-manager
                     :args      {:open           (reagent/atom (vec (repeat (count article-groups) true)))
                                 :article-groups article-groups}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [article-manager/article-manager (helper/->params args)]))

;; https://github.com/arttuka/reagent-material-ui/blob/06d5e6538ac80f6ac9883d40e8db668c44bcef84/example/src/example/data_grid.cljs
(def ^:export Default-Article-Manager
  (helper/->story template {}))
