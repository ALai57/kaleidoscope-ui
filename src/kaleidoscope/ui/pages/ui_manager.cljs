(ns kaleidoscope.ui.pages.ui-manager
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.utils.events :as e]
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Paper" :as paper]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [reagent-mui.components :refer [box container stack]]
            [taoensso.timbre :refer-macros [infof info]]
            ["react-colorful" :as rc]
            ["react" :as react]
            ))

(def Item
  ((styled paper/default)
   (fn [theme]
     (clj->js {:transition "transform 0.3s"
               :padding    "right"
               :text-align "center"
               :position   "relative"}))))

;; https://github.com/omgovich/react-colorful
;; https://codesandbox.io/s/6fp23?file=/src/App.js
(defn popover-picker
  [{:keys [initial-color on-change]}]
  (let [color (reagent/atom initial-color)
        open? (reagent/atom false)]
    (fn []
      [:div
       [:div {:style   {:background-color @color
                        :width            "28px"
                        :height           "28px"
                        :border-radius    "8px"
                        :border           "3px solid #fff"
                        :box-shadow       "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
                        :cursor           "pointer"}
              :onClick (fn [_]
                         (swap! open? not))}]
       (when @open?
         [:div
          [:> rc/HexColorPicker {:color     @color
                                 :on-change (fn [new-color]
                                              (reset! color new-color))}]])])))

(def palette-colors
  [:primary :secondary :error :warning :info :success :accent])

(defn color-picker-group
  [{:keys [color-name]}]
  [box
   [stack {:spacing 2}
    [:> Item
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      "Main: "
      [:f> popover-picker {:initial-color "#AAAAAA"}]]
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      "Dark: "
      [:f> popover-picker {:initial-color "#AAAAAA"}]]
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      "Light: "
      [:f> popover-picker {:initial-color "#AAAAAA"}]]
     [:div {:style {:display "inline-flex" :padding-right "25px"}}
      "Subtle: "
      [:f> popover-picker {:initial-color "#AAAAAA"}]]]
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
