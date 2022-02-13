(ns andrewslai.cljs.components.side-menu
  (:require [reagent-mui.components :refer [drawer list list-item
                                            list-item-icon list-item-text
                                            button]]
            [andrewslai.cljs.components.radio-group :refer [basic-radio-group]]
            [reagent-mui.icons.settings :refer [settings]]
            [taoensso.timbre :refer-macros [info]]
            [re-frame.core :refer [dispatch]]
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
    [basic-radio-group {:group-name "Notification Settings"
                        :default    :snackbar
                        :on-change  (fn [new-value]
                                      (dispatch [:change-notification-type (keyword new-value)]))
                        :elements   [{:value "snackbar"
                                      :label "Snackbar"}
                                     {:value "modal"
                                      :label "Modal"}]}]]])

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
