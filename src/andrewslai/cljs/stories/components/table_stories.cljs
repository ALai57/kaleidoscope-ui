(ns andrewslai.cljs.stories.components.table-stories
  (:require [andrewslai.cljs.components.table :as table]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Basic Components/Table"
                     :component table/table
                     :args      #js {:rows    [{:id 1 :name "Andrew"}]
                                     :columns [{:field "id" :headerName "ID" :width 90}
                                               {:field "name" :headerName "NAME" :width 90}
                                               ]}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [table/table (helper/->params args)]))

;; https://github.com/arttuka/reagent-material-ui/blob/06d5e6538ac80f6ac9883d40e8db668c44bcef84/example/src/example/data_grid.cljs
(def ^:export Default-Table
  (helper/->story template {:rows    [{:id 1 :name "Andrew" :email "andrewslai@gmail.com"}]
                            :columns table/USER-COLUMNS}))
