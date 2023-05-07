(ns kaleidoscope.ui.stories.components.table-stories
  (:require [kaleidoscope.ui.components.table :as table]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Table"
    :component table/table
    :args      {:rows    [{:id 1 :name "Andrew"}]
                :columns [{:field "id" :headerName "ID" :width 90}
                          {:field "name" :headerName "NAME" :width 90}]}}))

;; https://github.com/arttuka/reagent-material-ui/blob/06d5e6538ac80f6ac9883d40e8db668c44bcef84/example/src/example/data_grid.cljs
(def ^:export Default-Table
  (clj->js {:args {:rows    [{:id 1 :name "Andrew" :email "andrewslai@gmail.com"}]
                   :columns table/USER-COLUMNS}}))
