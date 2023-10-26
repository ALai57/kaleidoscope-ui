(ns kaleidoscope.ui.components.colors.color-picker
  (:require [kaleidoscope.ui.utils.events :as e]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [box container stack text-field]]
            [taoensso.timbre :refer-macros [infof info]]
            ["react-colorful" :as rc]
            ["react" :as react]
            ))

(defn upcase
  [^js s]
  (.toUpperCase s))

(defn basic-color-picker
  [{:keys [color on-change]}]
  [:div
   [:> rc/HexColorPicker {:color     color
                          :on-change on-change}]
   [:br]
   [text-field {:label     "RGB value"
                :size      "small"
                :value     color
                :on-change (comp on-change e/event-value)}]])

;; https://github.com/omgovich/react-colorful
;; https://codesandbox.io/s/6fp23?file=/src/App.js
(defn color-picker
  [{:keys [initial-color on-change collapsable]}]
  (let [color (reagent/atom initial-color)
        open? (reagent/atom (if collapsable false true))]
    (println "RENDERING COLOR PICKER" collapsable)
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
                         (when collapsable
                           (swap! open? not)))}]
       (when @open?
         [:div (cond-> {}
                 collapsable (merge {:style {:position "absolute"
                                             :z-index  1000}}))
          [basic-color-picker {:color     @color
                               :on-change (fn [new-color]
                                            (reset! color (upcase new-color)))}]])
       ])))
