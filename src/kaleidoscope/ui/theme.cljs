(ns kaleidoscope.ui.theme
  (:require ["@mui/material/styles" :refer [createTheme]]
            ["@mui/material/colors" :refer [red purple blue green]]))


(def BASE-THEME
  (createTheme (clj->js {:palette     #js {:primary   #js {:main (aget blue 600)}
                                           :secondary #js {:main (aget purple 600)}
                                           :error     #js {:main (aget red 600)}
                                           :success   #js {:main (aget green 600)}}
                         :transitions #js {}})))
