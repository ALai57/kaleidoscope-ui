(ns kaleidoscope.ui.components.colors.color-picker
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.utils.events :as e]
            [kaleidoscope.ui.clients.leonardo]
            ["@mui/material/styles" :refer [styled useTheme]]
            ["@mui/material/Paper" :as paper]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [reagent-mui.components :refer [box container stack text-field]]
            [taoensso.timbre :refer-macros [infof info]]
            ["react-colorful" :as rc]
            ["react" :as react]
            ))

(defn upcase
  [^js s]
  (.toUpperCase s))

;; https://github.com/omgovich/react-colorful
;; https://codesandbox.io/s/6fp23?file=/src/App.js
(defn color-picker
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
                                              (reset! color (upcase new-color)))}]
          [text-field {:label     "RGB value"
                       :value     @color
                       :on-change (fn [e]
                                    (reset! color (upcase (e/event-value e))))}]])
       ])))
