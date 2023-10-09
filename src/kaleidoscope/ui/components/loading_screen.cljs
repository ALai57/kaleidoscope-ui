(ns kaleidoscope.ui.components.loading-screen
  (:require [reagent-mui.components :refer [box
                                            circular-progress
                                            linear-progress
                                            typography]]))

(defn loading-screen
  ([]
   (loading-screen {:color "primary"}))
  ([{:keys [color]
     :or   {color "primary"}
     :as   x}]
   [:div#initial-loading-screen
    {:style {:background-image      "url(\"/images/nav-bar/favicon.svg\")"
             :background-color      "#333333"
             :background-size       "40vmin"
             :background-repeat     "no-repeat"
             :background-position-x "45%"
             :background-position-y "30%"

             :padding-top "65vh"
             :position    "absolute"
             :height      "100%"
             :width       "100%"}}
    [box {:sx {:width       "80%"
               :margin      "auto"
               :align-items "center"}}
     [box {:sx {:width "100%"
                :mr    1}}
      [linear-progress {:color color
                        :sx    {:height "20px"}}]]
     [box {:sx {:top             0
                :bottom          0
                :left            0
                :right           0
                :display         "flex"
                :align-items     "center"
                :justify-content "center"}}
      [typography {:variant   "h5"
                   :component "div"
                   :color     "white"}
       "Loading..."]]
     ]]))

;;https://stackoverflow.com/questions/42116315/google-closure-xhrio-progress-eventtype
