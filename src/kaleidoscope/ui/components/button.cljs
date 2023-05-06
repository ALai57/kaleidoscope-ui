(ns kaleidoscope.ui.components.button
  (:require [reagent-mui.components :as mui]))

(defn button
  [{:keys [on-click color text]
    :or   {color "primary"}}]
  [mui/button {:color    color
               :variant  "contained"
               :on-click on-click}
   text])
