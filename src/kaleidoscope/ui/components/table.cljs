(ns kaleidoscope.ui.components.table
  (:require [reagent.core :as reagent]
            [reagent-mui.components :refer [box
                                            button
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
            [reagent-mui.x.data-grid :refer [data-grid]]))


(def USER-COLUMNS
  [{:field :id       :headerName "User ID"  :width 90}
   {:field :avatar   :headerName "Avatar"   :width 90}
   {:field :name     :headerName "Name"}
   {:field :email    :headerName "Email"}
   {:field :added-at :headerName "Added at" :width 120}
   ])

(defn table
  [{:keys [rows columns toolbar max-width]
    :or   {max-width 650}}]
  [box {:style {:height 400 :max-width max-width}}
   [data-grid {:rows                       rows
               :columns                    columns
               :page-size                  10
               :row-height                 32
               :rows-per-page-options      [10]
               ;;:checkbox-selection         true
               :disable-selection-on-click true
               }]])
