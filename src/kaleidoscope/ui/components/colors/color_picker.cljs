(ns kaleidoscope.ui.components.colors.color-picker
  (:require [kaleidoscope.ui.utils.events :as e]
            [reagent.core :as reagent]
            [reagent.impl.template :as tmpl]
            [reagent-mui.components :refer [outlined-input text-field input-adornment]]
            ["@mui/material/styles" :refer [styled]]
            ["@mui/material/Paper" :as paper]
            ["react-colorful" :as rc]
            ))

(defn upcase
  [^js s]
  (.toUpperCase s))

(def Paper
  ((styled paper/default)
   (fn [obj]
     (let [spacing-fn (.. obj -theme -spacing)]
       (clj->js {:transition "transform 0.3s"
                 :padding    (spacing-fn 2)
                 :text-align "center"})))))

(defn basic-color-picker
  [{:keys [color on-change]}]
  [:> Paper
   [:> rc/HexColorPicker {:color     color
                          :on-change on-change
                          :style     {:height "200px"
                                      :width  "100%"}}]
   [:br]
   [outlined-input {;;:label          "RGB value"
                    :size           "small"
                    :value          color
                    :on-change      (comp on-change e/event-value)
                    :startAdornment (reagent/as-element [:div {:style {:background-color color
                                                                       :width            "50%"
                                                                       :height           "30px"}}])}]])

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
