(ns kaleidoscope.cljs.components.article-manager
  (:require [kaleidoscope.cljs.components.table :as table]
            [kaleidoscope.cljs.components.primary-button :as primary-button]
            [kaleidoscope.cljs.components.input-box :as input-box]
            [kaleidoscope.cljs.utils.events :as events]
            [kaleidoscope.cljs.utils :as u]
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

                                            tooltip
                                            text-field
                                            ]]
            [re-frame.core :refer [dispatch subscribe]]
            [taoensso.timbre :refer-macros [infof debugf warnf]]
            [clojure.set :as set]))

(def SUCCESS-GREEN "#08b383")

(defn article-row
  [{:keys [article-created-date article-title published-at] :as article-branch}
   {:keys [delete-article! edit-article! publish-article!] :as article-actions}]
  [list-item {:sx              {:padding-right "150px"}
              :secondaryAction (reagent/as-element
                                [box
                                 [tooltip {:id    "publish-tooltip"
                                           :title (if published-at (str "Published on " published-at) "Publish article")}
                                  [:span
                                   [icon-button {:edge     "end"
                                                 :disabled (if published-at true false)
                                                 :on-click publish-article!}
                                    [rocket-launch {:sx {:color (if published-at SUCCESS-GREEN "")}}]]]]

                                 [tooltip {:id "settings-tooltip" :title "Settings (WIP)"}
                                  [icon-button {:edge     "end"
                                                :on-click (fn [& x]
                                                            (println "Clicked settings"))}
                                   [settings]]]
                                 [:div {:style {:width   "20px"
                                                :display "inline-block"}}]
                                 [tooltip {:id "settings-tooltip" :title "Delete article (WIP)"}
                                  [icon-button {:edge     "end"
                                                :on-click delete-article!}
                                   [delete]]]
                                 ])}
   [tooltip {:id "edit-tooltip" :title "Edit article"}
    [list-item-button {:on-click (fn [event]
                                   (edit-article! article-branch))}
     [list-item-text {:sx {:width "70px"
                           :flex  "none"}} article-created-date]
     [list-item-icon {:sx {:margin-left "10px"
                           :min-width   "26px"}} [icons.article/article {:sx {:color (if published-at SUCCESS-GREEN "")}}]]
     [list-item-text {:sx {:margin-left "10px"}} article-title]]]])

(defn article-group-accordion
  [{:keys [idx open? on-click
           display-name articles] :as article-group}
   article-actions]
  [:<>
   [list-item-button {:on-click on-click}
    [list-item-text [:h3 display-name]]]
   [collapse {:in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:style {:display "block"}}
     (for [{:keys [article-created-at article-title branch-name] :as article} articles]
       ^{:key (str article-title article-created-at branch-name)} [article-row article article-actions])]]])

(defn add-article-form
  [{:keys [add-article!]}]
  (let [new-article-title (reagent/atom "")
        on-change        (fn [e]
                           (reset! new-article-title (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [post-add {:sx {:color "action.active"
                       :mr    1
                       :my    0.5}}]
       [text-field {:id        "new-article-title-input"
                    :label     "Article Name"
                    ;;:label-for "new-article-title"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change}]
       [primary-button/primary-button {:text     "Add a new article"
                                       :on-click (partial add-article! {:article-title @new-article-title})}]
       ])))

(defn article-manager
  [{:keys [article-groups open
           add-article! delete-article! edit-article! publish-article!]
    :or   {add-article!     (fn [article-title] (infof "Adding article `%s`!" article-title))
           delete-article!  (fn [article] (infof "Deleting article!"))
           edit-article!    (fn [article] (infof "Loading article!"))
           publish-article! (fn [article] (infof "Publishing article!"))}}]
  (let [indexed-groups (map-indexed (fn [idx article-group]
                                      (assoc article-group
                                             :idx      idx
                                             :on-click (fn [] (swap! open update idx not))))
                                    article-groups)]
    [:div
     [add-article-form {:add-article! add-article!}]
     [divider]
     [list
      (for [{:keys [idx] :as article-group} (map (fn [article-group open?]
                                                   (assoc article-group :open? open?))
                                                 indexed-groups
                                                 @open)]
        ^{:key (str "idx-" idx "-ge")} [article-group-accordion article-group
                                        {:delete-article!  delete-article!
                                         :edit-article!    edit-article!
                                         :add-article!     add-article!
                                         :publish-article! publish-article!}])]]))
