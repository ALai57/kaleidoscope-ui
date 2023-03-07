(ns andrewslai.cljs.components.groups.group-manager
  (:require [andrewslai.cljs.components.table :as table]
            [andrewslai.cljs.components.primary-button :as primary-button]
            [andrewslai.cljs.components.input-box :as input-box]
            [andrewslai.cljs.utils.events :as events]
            [andrewslai.cljs.utils :as u]
            [reagent.core :as reagent]
            [reagent-mui.icons.account-circle :refer [account-circle]]
            [reagent-mui.icons.group-add :refer [group-add]]
            [reagent-mui.icons.person-add :refer [person-add]]
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

(defn delete-member-cell
  [props]
  (reagent/as-element [icon-button {:edge     "end"
                                    :on-click (fn []
                                                (let [row            (u/clojurize ^js (.-row props))
                                                      delete-member! (:delete-member! row)]
                                                  (delete-member! (:id row))))}
                       [delete]]))

(def USER-COLUMNS
  [{:field :id                    :headerName "ID"    :width 100}
   {:field :alias                 :headerName "Name"  :width 180}
   {:field :email                 :headerName "Email" :width 200}
   {:field :membership-created-at :headerName "Added" :width 180}
   {:field :delete                :headerName ""      :renderCell delete-member-cell}
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

(defn new-member-entry
  [add-member!]
  (let [new-member-name        (reagent/atom "")
        on-change-member-name  (fn [e]
                                 (reset! new-member-name (events/event-value e)))
        new-member-email       (reagent/atom "")
        on-change-member-email (fn [e]
                                 (reset! new-member-email (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [person-add {:sx {:color "action.active"
                         :mr    1
                         :my    0.5}}]
       [text-field {:id        "new-member-name-input"
                    :label     "Name"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "250px"}
                    :on-change on-change-member-name}]
       [text-field {:id        "new-member-email-input"
                    :label     "Email"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change-member-email}]
       [primary-button/primary-button {:text     "Add a member"
                                       :on-click (partial add-member! {:alias @new-member-name
                                                                       :email @new-member-email})}]])))

(defn group-entry
  [{:keys [idx open? on-click
           display-name memberships
           delete-group!
           delete-member! add-member!] :as group}]
  [:<>
   [list-entry {:icon          icons.group/group
                :text          display-name
                :on-click      on-click
                :delete-group! delete-group!}]
   [collapse {:style         {:margin-left "40px"}
              :in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:style {:display "block"}}
     [new-member-entry add-member!]
     [table/table {:columns   USER-COLUMNS
                   :rows      (if (empty? memberships)
                                []
                                (map (fn [membership]
                                       (-> membership
                                           (set/rename-keys {:membership-id :id})
                                           (assoc :delete-member! delete-member!)))
                                     memberships))
                   :max-width 800}]]]])

(defn add-group-form
  [{:keys [add-group!]}]
  (let [new-group-name (reagent/atom "")
        on-change      (fn [e]
                         (reset! new-group-name (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [group-add {:sx {:color "action.active"
                        :mr    1
                        :my    0.5}}]
       [text-field {:id        "new-group-name-input"
                    :label     "Group Name"
                    ;;:label-for "new-group-name"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change}]
       [primary-button/primary-button {:text     "Add a new group"
                                       :on-click (partial add-group! @new-group-name)}]
       ])))

(defn group-manager
  [{:keys [groups open
           add-group!  delete-group!
           add-member! delete-member!]
    :or   {add-group!     (fn [group-name] (infof "Adding group `%s`!" group-name))
           delete-group!  (fn [group] (infof "Deleting group!"))
           add-member!    (fn [group member] (infof "Adding member!"))
           delete-member! (fn [group member] (infof "Deleting member!"))
           }}]
  (let [indexed-groups (map-indexed (fn [idx group]
                                      (assoc group
                                             :idx idx
                                             :add-member!    (partial add-member! group)
                                             :delete-member! (partial delete-member! group)
                                             :delete-group!  (partial delete-group! group)
                                             :on-click       (fn [] (swap! open update idx not))))
                                    groups)]

    [:div
     [add-group-form {:add-group! add-group!}]
     [divider]
     [list
      (for [{:keys [idx] :as group} (map (fn [group open?]
                                           (assoc group :open? open?))
                                         indexed-groups
                                         @open)]
        ^{:key (str "idx-" idx "-ge")} [group-entry group])]]))
