(ns andrewslai.cljs.components.table
  (:require [reagent-mui.material.box :refer [box]]
            [reagent-mui.x.data-grid :refer [data-grid]]))


(defn table
  [{:keys [rows columns]}]
  (fn []
    [box
     [data-grid {:rows    [{:id 1 :name "Andrew"}]
                 :columns [{:field "id" :headerName "ID" :width 90}
                           {:field "name" :headerName "NAME" :width 90}
                           ]}]]))
