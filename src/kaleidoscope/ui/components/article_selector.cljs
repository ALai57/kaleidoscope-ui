(ns kaleidoscope.ui.components.article-selector
  (:require [kaleidoscope.ui.components.article-cards :as article-cards]
            [reagent-mui.components :refer [drawer list list-item
                                            list-item-icon list-item-text
                                            button]]
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

(defn article-selector
  [{:keys [expand-button branches on-click] :as arg}]
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
         [article-cards/thin-content-cards {:branches       branches
                                            :on-click       on-click}]]]])))
