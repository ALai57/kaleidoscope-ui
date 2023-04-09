(ns andrewslai.cljs.components.article-manager
  (:require [andrewslai.cljs.components.table :as table]
            [andrewslai.cljs.components.primary-button :as primary-button]
            [andrewslai.cljs.components.input-box :as input-box]
            [andrewslai.cljs.utils.events :as events]
            [andrewslai.cljs.utils :as u]
            [reagent.core :as reagent]
            [reagent-mui.icons.account-circle :refer [account-circle]]
            [reagent-mui.icons.post-add :refer [post-add]]
            [reagent-mui.icons.rocket-launch :refer [rocket-launch]]
            [reagent-mui.icons.settings :refer [settings]]
            [reagent-mui.icons.edit :refer [edit]]
            [reagent-mui.icons.article :as icons.article]
            [reagent-mui.icons.delete :refer [delete]]
            [reagent-mui.components :refer [box
                                            divider
                                            collapse
                                            icon-button
                                            list
                                            list-item
                                            list-item-button
                                            list-item-icon
                                            list-item-text

                                            text-field
                                            ]]
            [re-frame.core :refer [dispatch subscribe]]
            [taoensso.timbre :refer-macros [infof debugf warnf]]
            [clojure.set :as set]))

(defn article-row
  [{:keys [article-created-date article-name on-click delete-article!]
    :or   {on-click (fn [x]
                      (println "Clicked " article-name))}}]
  [list-item {:secondaryAction (reagent/as-element [box
                                                    [icon-button {:edge     "end"
                                                                  :on-click (fn [& x]
                                                                              (println "Clicked publish"))}
                                                     [rocket-launch]]
                                                    [icon-button {:edge     "end"
                                                                  :on-click (fn [& x]
                                                                              (println "Clicked edit"))}
                                                     [edit]]
                                                    [icon-button {:edge     "end"
                                                                  :on-click (fn [& x]
                                                                              (println "Clicked settings"))}
                                                     [settings]]
                                                    [:div {:style {:width   "20px"
                                                                   :display "inline-block"}}]
                                                    [icon-button {:edge     "end"
                                                                  :on-click delete-article!}
                                                     [delete]]
                                                    ])}
   [list-item-button {:on-click on-click}
    [list-item-icon [icons.article/article]]
    [list-item-text article-created-date]
    [list-item-text article-name]]])

(defn article-group-accordion
  [{:keys [idx open? on-click
           display-name articles
           delete-article!
           delete-member! add-member!] :as article}]
  [:<>
   [list-item-button {:on-click on-click}
    [list-item-text [:h3 display-name]]]
   [collapse {:style         {:margin-left "40px"}
              :in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:style {:display "block"}}
     (for [{:keys [article-created-at article-name] :as article} articles]
       ^{:key (str article-name article-created-at)}[article-row article])]]])

(defn add-article-form
  [{:keys [add-article!]}]
  (let [new-article-name (reagent/atom "")
        on-change      (fn [e]
                         (reset! new-article-name (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [post-add {:sx {:color "action.active"
                       :mr    1
                       :my    0.5}}]
       [text-field {:id        "new-article-name-input"
                    :label     "Article Name"
                    ;;:label-for "new-article-name"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change}]
       [primary-button/primary-button {:text     "Add a new article"
                                       :on-click (partial add-article! @new-article-name)}]
       ])))

(defn article-manager
  [{:keys [article-groups open
           add-article! delete-article!]
    :or   {add-article!    (fn [article-name] (infof "Adding article `%s`!" article-name))
           delete-article! (fn [article] (infof "Deleting article!"))}}]
  (let [indexed-groups (map-indexed (fn [idx article-group]
                                      (assoc article-group
                                             :idx idx
                                             :delete-article! (partial delete-article! article-group)
                                             :on-click        (fn [] (swap! open update idx not))))
                                    article-groups)]
    [:div
     [add-article-form {:add-article! add-article!}]
     [divider]
     [list
      (for [{:keys [idx] :as article-group} (map (fn [article-group open?]
                                                   (assoc article-group :open? open?))
                                                 indexed-groups
                                                 @open)]
        ^{:key (str "idx-" idx "-ge")} [article-group-accordion article-group])]]))

;; Shrink Clickable bar area so it doesn't overlap with delete tray
;; Change 2021-01-01 to January 1, 2, 3, etc
;; Hook up Edit button so it redirects to article editing
;; Get real example data from branches
;; Add confirmation modal when someone clicks delete or publish icons
;; Refetch list of articles after a new one is added
;; Add config button to change URL, etc
