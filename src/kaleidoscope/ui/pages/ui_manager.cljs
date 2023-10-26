(ns kaleidoscope.ui.pages.ui-manager
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.components.colors.color-picker :refer [color-picker]]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.clients.leonardo] ;; DELETEME
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Paper" :as paper]
            [re-frame.core :refer [subscribe dispatch]]
            [reagent-mui.components :refer [box stack]]
            [taoensso.timbre :refer-macros [infof info]]
            ["react" :as react]
            ))

(def Item
  ((styled paper/default)
   (fn [theme]
     (clj->js {:transition "transform 0.3s"
               :padding    "right"
               :text-align "center"
               :position   "relative"}))))

(def palette-colors
  [:primary :secondary :error :warning :info :success :accent])

(defn color-picker-group
  [{:keys [color-name]}]
  [box
   [stack {:spacing 2}
    [:> Item
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      "Main: "
      [:f> color-picker {:initial-color "#AAAAAA"}]]]
    ]]
  )

(defn -ui-manager-page [{:keys [images albums user notification-type auth-token]}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [:div
     [nav/nav-bar {:user              user
                   :notification-type notification-type}]
     [:div {:margin "10px"}

      (for [palette-color palette-colors]
        [:div
         palette-color
         [color-picker-group]])]]))

(defn ui-manager-page
  [{:keys [images user notification-type]}]
  [:f> -ui-manager-page {:user              user
                         :notification-type notification-type}])
