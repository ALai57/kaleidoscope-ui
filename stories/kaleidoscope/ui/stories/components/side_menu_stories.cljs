(ns kaleidoscope.ui.stories.components.side-menu-stories
  (:require [kaleidoscope.ui.components.side-menu :as side-menu]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent-mui.components :refer [button]]
            [reagent.core :as reagent]))

(defn expand-button
  [props]
  [button props "Toggle side window"])

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Side Menu"
    :component side-menu/side-menu
    :args      {:expand-button     (fn [props]
                                     [button/button (merge props
                                                           {:text "Toggle side window"})])
                :notification-type :modal}}))

(def ^:export Default-Side-Menu
  (clj->js {}))
