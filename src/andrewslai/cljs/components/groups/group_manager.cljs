(ns andrewslai.cljs.components.groups.group-manager
  (:require [andrewslai.cljs.components.table :as table]
            [reagent.core :as reagent]
            [reagent-mui.icons.group-add :refer [group-add]]
            [reagent-mui.icons.group :as icons.group]
            [reagent-mui.icons.delete :refer [delete]]
            [reagent-mui.components :refer [box
                                            collapse
                                            icon-button
                                            list
                                            list-item
                                            list-item-button
                                            list-item-icon
                                            list-item-text]]))

(def USER-COLUMNS
  [{:field :id       :headerName "ID"  :width 40}
   ;;{:field :avatar   :headerName "Avatar"   :width 90}
   {:field :name     :headerName "Name"  :width 180}
   {:field :email    :headerName "Email" :width 200}
   {:field :added-at :headerName "Added" :width 120}
   ])

(defn list-entry
  [{:keys [icon text on-click]
    :or   {on-click (fn [x]
                      (println "Clicked " text))}}]
  [list-item {:secondaryAction (reagent/as-element [box
                                                    [icon-button {:edge "end"}
                                                     [group-add]]
                                                    [icon-button {:edge "end"}
                                                     [delete]]])}
   [list-item-button {:on-click on-click}
    [list-item-icon [icon]]
    [list-item-text text]]])

(defn group-entry
  [{:keys [idx display-name open? members on-click]}]
  [:<>
   [list-entry {:icon     icons.group/group
                :text     display-name
                :on-click on-click}]
   [collapse {:in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:display "block"}
     [table/table {:columns   USER-COLUMNS
                   :rows      members
                   :max-width 400}]]]])

(defn group-manager
  [{:keys [groups]}]
  (let [open           (reagent/atom (vec (repeat (count groups) false)))
        indexed-groups (map-indexed (fn [idx group]
                                      (assoc group
                                             :idx      idx
                                             :on-click (fn []
                                                         (swap! open update idx not))))
                                    groups)]

    (fn []
      [list
       (for [{:keys [idx] :as group} (map (fn [group open?]
                                            (assoc group :open? open?))
                                          indexed-groups
                                          @open)]
         ^{:key (str "idx-" idx "-ge")} [group-entry group])])))
