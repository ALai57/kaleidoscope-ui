(ns andrewslai.cljs.pages.article-manager
  (:require [andrewslai.cljs.components.article-manager :as am]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.utils :as u]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof info]]
            ))

(defn add-human-readable-dates
  [{:keys [article-created-at] :as branch}]
  (let [pretty-date  (u/format-date u/MONTH-YEAR article-created-at)
        numeric-date (u/format-date u/yyyy-MM-dd article-created-at)
        short-date   (u/format-date u/MONTH-DAY  article-created-at)]
    (assoc branch
           :group-name           pretty-date
           :display-name         pretty-date
           :group-value          numeric-date
           :article-created-date short-date)))

(defn group-branches
  [branches]
  (->> branches
       (map add-human-readable-dates)
       (group-by (fn [branch] (select-keys branch [:group-name :display-name :group-value])))
       (reduce-kv (fn [acc group v] (conj acc (assoc group :articles v))) [])
       (sort-by :group-value)
       reverse))

(def branches
  [{:article-created-at "2022-03-01T00:00:00Z"
    :article-id         1,
    :article-tags       "thoughts"
    :article-url        "my-first-article",
    :author             "Andrew Lai",
    :branch-id          1,
    :branch-name        "main",
    :published-at       "2022-03-01T00:00:00Z",}
   {:article-created-at "2022-03-01T00:00:00Z"
    :article-id         2,
    :article-tags       "thoughts"
    :article-url        "my-second-article",
    :author             "Andrew Lai",
    :branch-id          2,
    :branch-name        "main",
    :published-at       "2022-03-01T00:00:00Z",}
   {:article-created-at "2022-02-01T00:00:00Z"
    :article-id         3,
    :article-tags       "thoughts"
    :article-url        "my-third-article",
    :author             "Andrew Lai",
    :branch-id          3,
    :branch-name        "main",
    :published-at       "2022-02-01T00:00:00Z",}
   {:article-created-at "2022-03-01T00:00:00Z"
    :article-id         4,
    :article-tags       "thoughts"
    :article-url        "neural-network-explanation",
    :author             "Andrew Lai",
    :branch-id          4,
    :branch-name        "main",
    :published-at       "2022-03-01T00:00:00Z",}
   {:article-created-at "2022-05-01T00:00:00Z"
    :article-id         4,
    :article-tags       "thoughts"
    :article-url        "neural-network-explanation",
    :author             "Andrew Lai",
    :branch-id          5,
    :branch-name        "test",
    :published-at       nil,}])

(defn -article-manager-page [{:keys [articles branches user groups notification-type
                                     add-article! delete-article!]}]
  (let [article-groups (group-branches branches)]
    [:div
     [nav/nav-bar {:user              user
                   :notification-type notification-type}]
     [:br]
     [:br]
     [:div#primary-content
      [am/article-manager {:article-groups  article-groups
                           :open            (reagent/atom (vec (repeat (count article-groups) true)))
                           :add-article!    add-article!
                           :delete-article! delete-article!}]]]))

(defn save-version!
  [{:keys [content title article-tags branch-name]
    :or   {article-tags "thoughts"
           branch-name  "main"
           content      "Your new article!"}
    :as   save-data}]
  (dispatch [:save-article! (update save-data :content gstr/unescapeEntities)]))

(defn article-manager-page
  [{:keys [articles user notification-type]}]
  [-article-manager-page {:user              user
                          :notification-type notification-type
                          :add-article!      save-version!
                          :delete-article!   (fn [& args] (println "Clicked delete!"))
                          :articles          nil
                          :branches          @(subscribe [:branches])}])
