(ns kaleidoscope.ui.pages.article-manager
  (:require [kaleidoscope.ui.components.article-manager :as am]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [subscribe dispatch]]
            [reagent.core :as reagent]
            [taoensso.timbre :refer-macros [infof]]
            [goog.date.DateTime :as gdatetime]
            ))

(def yyyy-MM
  "ex. 2022-01-01"
  "yyyy-MM")

(def MONTH-YEAR
  "ex. February 2023"
  "MMMM, yyyy")

(def MONTH-DAY-YEAR
  "ex. Feb 28, 2022"
  goog.i18n.DateTimeFormat.Format.MEDIUM_DATE)

(def MONTH-DAY
  "ex. Feb 28"
  "MMM dd")

(defn format-date
  [date-fmt s]
  (try
    (let [formatter (new goog.i18n.DateTimeFormat date-fmt)]
      (.format formatter (gdatetime/fromIsoString s)))
    (catch js/Object _e
      "Couldn't format date")))

(defn add-human-readable-dates
  [{:keys [article-created-at] :as branch}]
  (try
    (let [pretty-date  (format-date MONTH-YEAR article-created-at)
          numeric-date (format-date yyyy-MM    article-created-at)
          short-date   (format-date MONTH-DAY  article-created-at)]
      (assoc branch
             :group-name           pretty-date
             :display-name         pretty-date
             :group-value          numeric-date
             :article-created-date short-date))
    (catch js/Error e
      (js/console.log "Caught error" e))))

(defn group-branches
  [branches]
  (->> branches
       (map add-human-readable-dates)
       (sort-by :article-created-at)
       reverse
       (group-by (fn [branch] (select-keys branch [:group-name :display-name])))
       (reduce-kv (fn [acc group v] (conj acc (assoc group :articles v))) [])
       (sort-by :group-value)
       ))

#_:clj-kondo/ignore
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

(defn -article-manager-page [{:keys [article-groups user groups notification-type
                                     add-article! delete-article! edit-article!]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:br]
   [:br]
   [:div#primary-content
    ^{:key (str "manager-" (hash article-groups) "-" (count groups))}
    [am/article-manager {:article-groups  article-groups
                         :open            (reagent/atom (vec (repeat (count article-groups) true)))
                         :groups          groups
                         :add-article!    add-article!
                         :edit-article!   edit-article!
                         :delete-article! delete-article!}]]])

(defn add-article!
  [{:keys [content article-title article-url article-tags branch-name]
    :or   {article-tags "thoughts"
           branch-name  "main"
           content      "Your new article!"}
    :as   save-data}]
  (dispatch [:save-article! save-data]))

(defn edit-article!
  [{:keys [article-id branch-id] :as article-branch}]
  (infof "Updating editor article id to %s" article-id)

  (dispatch [:load-latest-version! article-branch])
  (dispatch [:update-editor-branch-id article-id])
  (dispatch [:set-hash-fragment "/editor"]))

(defn article-manager-page
  [{:keys [user notification-type]}]
  (let [groups   (subscribe [:groups])
        branches (subscribe [:branches])]
    (fn []
      [-article-manager-page {:user              user
                              :notification-type notification-type
                              :add-article!      add-article!
                              :delete-article!   (fn [& args] (println "Clicked delete!"))
                              :edit-article!     edit-article!
                              :articles          nil
                              :article-groups    (group-branches @branches)
                              :groups            @groups}])))
