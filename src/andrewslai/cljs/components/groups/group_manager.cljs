(ns andrewslai.cljs.components.groups.group-manager
  (:require [andrewslai.cljs.components.table :as table]
            [andrewslai.cljs.components.primary-button :as primary-button]
            [andrewslai.cljs.components.input-box :as input-box]
            [andrewslai.cljs.utils.events :as events]
            [reagent.core :as reagent]
            [reagent-mui.icons.account-circle :refer [account-circle]]
            [reagent-mui.icons.group-add :refer [group-add]]
            [reagent-mui.icons.group :as icons.group]
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


(def USER-COLUMNS
  [{:field :id                    :headerName "ID"    :width 40}
   {:field :membership-id         :headerName "ID"    :width 40}
   {:field :alias                 :headerName "Name"  :width 180}
   {:field :email                 :headerName "Email" :width 200}
   {:field :membership-created-at :headerName "Added" :width 120}
   ])

(defn add-group-item
  [{:keys [icon text on-click]
    :or   {on-click (fn [x]
                      (println "Clicked " text))}}]
  [list-item
   [list-item-button {:on-click on-click}
    [list-item-icon [icon]]
    [list-item-text text]]])

(defn list-entry
  [{:keys [icon text on-click delete-group!]
    :or   {on-click (fn [x]
                      (println "Clicked " text))}}]
  [list-item {:secondaryAction (reagent/as-element [box
                                                    [icon-button {:edge     "end"
                                                                  :on-click delete-group!}
                                                     [delete]]])}
   [list-item-button {:on-click on-click}
    [list-item-icon [icon]]
    [list-item-text text]]])

(defn group-entry
  [{:keys [idx display-name open? memberships on-click delete-group!]}]
  [:<>
   [list-entry {:icon          icons.group/group
                :text          display-name
                :on-click      on-click
                :delete-group! delete-group!}]
   [collapse {:in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:style {:display "block"}}
     [table/table {:columns   USER-COLUMNS
                   :rows      (if (empty? memberships)
                                []
                                (map #(set/rename-keys % {:membership-id :id})
                                     memberships))
                   :max-width 400}]]]])

(defn add-group-form
  [{:keys [add-group!]}]
  (let [new-group-name (reagent/atom "")
        on-change      (fn [e]
                         (reset! new-group-name (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [account-circle {:sx {:color "action.active"
                             :mr    1
                             :my    0.5}}]
       [text-field {:id        "new-group-name-input"
                    :label     "Group Name"
                    :label-for "new-group-name"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change}]
       [primary-button/primary-button {:text     "Add a new group"
                                       :on-click (partial add-group! @new-group-name)}]
       ])))

(defn group-manager
  [{:keys [groups
           add-group!  delete-group!
           add-member! delete-member!]
    :or   {add-group!     (fn [group-name] (infof "Adding group `%s`!" group-name))
           delete-group!  (fn [group] (infof "Deleting group!"))
           add-member!    (fn [group member] (infof "Adding member!"))
           delete-member! (fn [group member] (infof "Deleting member!"))
           }}]
  (let [open           (reagent/atom (vec (repeat (count groups) false)))
        indexed-groups (map-indexed (fn [idx group]
                                      (assoc group
                                             :idx idx
                                             :delete-group!  (partial delete-group! group)
                                             :add-member!    (partial add-member! group)
                                             :delete-member! (partial delete-member! group)
                                             :on-click       (fn [] (swap! open update idx not))))
                                    groups)]

    (fn []
      [:div
       [add-group-form {:add-group! add-group!}]
       [divider]
       [list
        (for [{:keys [idx] :as group} (map (fn [group open?]
                                             (assoc group :open? open?))
                                           indexed-groups
                                           @open)]
          ^{:key (str "idx-" idx "-ge")} [group-entry group])]])))
