(ns andrewslai.cljs.components.side-menu
  (:require [reagent-mui.components :refer [drawer list list-item
                                            list-item-icon list-item-text
                                            button]]
            [reagent-mui.icons.settings :refer [settings]]
            [taoensso.timbre :refer-macros [info]]
            [reagent.core :as reagent]))

(defn keydown?
  [event]
  (= "keydown" (.-type event)))

(defn toggle-drawer
  [ratom open]
  (fn [event]
    (when-not (keydown? event)
      (reset! ratom open))))

(defn drawer-contents
  []
  [list
   [list-item
    [list-item-icon [settings]]
    [list-item-text {:primary "Settings"}]]])

;;The open and close functions need to both set the state -

(defn side-menu
  [{:keys [expand-button]}]
  (let [showing (reagent/atom false)]
    (fn []
      [:div
       [expand-button {:on-click (toggle-drawer showing true)}]
       [:div
        [drawer {:anchor             "left"
                 :open               @showing
                 :variant            "temporary"
                 :transitionDuration 500
                 :on-close           (toggle-drawer showing false)}
         [drawer-contents]]]])))
