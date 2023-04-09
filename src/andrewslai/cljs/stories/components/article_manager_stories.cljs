(ns andrewslai.cljs.stories.components.article-manager-stories
  (:require [andrewslai.cljs.components.article-manager :as article-manager]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def article-groups
  [{:group-name   "January 2023"
    :display-name "January 2023"
    :articles     [{:article-id           1
                    :article-title        "My first article"
                    :article-created-date "Jan 01"}
                   {:article-id           2
                    :article-title        "My second article"
                    :article-created-date "Jan 02"}
                   {:article-id           3
                    :article-title        "A third article"
                    :article-created-date "Jan 03"}]}
   {:group-name   "February 2023"
    :display-name "February 2023"
    :articles     [{:article-id           4
                    :article-title        "Yet another"
                    :article-created-date "Feb 01"}
                   {:article-id           5
                    :article-title        "I keep writing things!"
                    :article-created-date "Feb 02"}
                   {:article-id           6
                    :article-title        "Last one, I promise"
                    :article-created-date "Feb 03"}]}])

(def branches
  "Example data from 2023-04-10"
  [{:branch-id           4,
    :hostname            "andrewslai.com",
    :published-at        "2022-03-01T00:00:00Z",
    :modified-at         "2022-03-01T00:00:00Z",
    :article-id          4,
    :article-title       "Neural Network Explanation",
    :author              "Andrew Lai",
    :article-modified-at "2022-04-01T00:00:00Z",
    :branch-name         "main",
    :article-tags        "thoughts",
    :article-url         "neural-network-explanation",
    :article-created-at  "2022-04-01T00:00:00Z",
    :created-at          "2022-03-01T00:00:00Z"}
   {:branch-id           5,
    :hostname            "andrewslai.com",
    :published-at        nil,
    :modified-at         "2022-03-01T00:00:00Z",
    :article-id          4,
    :article-title       "Neural Network Explanation",
    :author              "Andrew Lai",
    :article-modified-at "2022-04-01T00:00:00Z",
    :branch-name         "test",
    :article-tags        "thoughts",
    :article-url         "neural-network-explanation",
    :article-created-at  "2022-04-01T00:00:00Z",
    :created-at          "2022-03-01T00:00:00Z"}
   {:branch-id           1005,
    :hostname            "andrewslai.com",
    :published-at        "2023-02-06T04:26:35Z",
    :modified-at         "2023-02-05T23:12:40Z",
    :article-id          1005,
    :article-title       "Our trip to Santa Elena",
    :author              "Andrew Lai",
    :article-modified-at "2023-02-05T23:12:40Z",
    :branch-name         "main",
    :article-tags        "thoughts",
    :article-url         "our-trip-to-santa-elena",
    :article-created-at  "2023-02-05T23:12:40Z",
    :created-at          "2023-02-05T23:12:40Z"}
   {:branch-id           1006,
    :hostname            "andrewslai.com",
    :published-at        "2023-02-14T03:03:45Z",
    :modified-at         "2023-02-13T04:48:46Z",
    :article-id          1006,
    :article-title       "Everyday Wildlife in Costa Rica",
    :author              "Andrew Lai",
    :article-modified-at "2023-02-13T04:48:46Z",
    :branch-name         "main",
    :article-tags        "thoughts",
    :article-url         "wildlife-in-costa-rica",
    :article-created-at  "2023-02-13T04:48:46Z",
    :created-at          "2023-02-13T04:48:46Z"}
   {:branch-id           1007,
    :hostname            "andrewslai.com",
    :published-at        "2023-02-23T02:06:16Z",
    :modified-at         "2023-02-20T03:03:13Z",
    :article-id          1007,
    :article-title       "Malli [:or] Considered Harmful (when using Reitit Coercion)",
    :author              "Andrew Lai",
    :article-modified-at "2023-02-20T03:03:13Z",
    :branch-name         "main",
    :article-tags        "thoughts",
    :article-url         "malli-[:or]-considered-harmful-when-using-reitit-coercion",
    :article-created-at  "2023-02-20T03:03:13Z",
    :created-at          "2023-02-20T03:03:13Z"}])

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
