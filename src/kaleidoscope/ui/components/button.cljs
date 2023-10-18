(ns kaleidoscope.ui.components.button
  (:require [reagent-mui.components :as mui]
            ["@mui/material/styles" :refer [useTheme]]
            [kaleidoscope.ui.utils.core :as u]
            ))

(defn -button
  [{:keys [on-click color text sx]
    :or   {color "primary"}}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [mui/button {:color    color
                 :variant  "contained"
                 :on-click on-click
                 :sx       (merge {:background-color (get-in palette [:primary :light])}
                                  (or sx {}))}
     text]))

(defn button
  [args]
  [:f> -button args])
