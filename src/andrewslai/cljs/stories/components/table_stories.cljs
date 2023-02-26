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

(def ^:export Default-Table
  (helper/->story template {:rows    [{:id 1 :name "Andrew"}]
                            :columns [{:field "id" :headerName "ID" :width 90}
                                      {:field "name" :headerName "NAME" :width 90}
                                      ]}))
