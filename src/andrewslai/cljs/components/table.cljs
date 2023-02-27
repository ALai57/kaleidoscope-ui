(ns andrewslai.cljs.components.table
  (:require [reagent-mui.material.box :refer [box]]
            [reagent-mui.x.data-grid :refer [data-grid]]))


(def USER-COLUMNS
  [{:field :id       :headerName "User ID"  :width 90}
   {:field :avatar   :headerName "Avatar"   :width 90}
   {:field :name     :headerName "Name"}
   {:field :email    :headerName "Email"}
   {:field :added-at :headerName "Added at" :width 120}
   ])

(defn table
  [{:keys [rows columns]}]
  [box {:style {:height 400 :max-width 650}}
   [data-grid {:rows       rows
               :columns    columns
               :page-size  5
               :row-height 32

               :rows-per-page-options      [5]
               :checkbox-selection         true
               :disable-selection-on-click true
               }]])
