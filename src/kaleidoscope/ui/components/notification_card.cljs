(ns kaleidoscope.ui.components.notification-card
  (:require ["@styled-icons/remix-fill/ErrorWarning" :refer [ErrorWarning]]
            [reagent-mui.components :refer [card card-content
                                            typography]]
            [reagent.core :as reagent]))

(def Error (reagent/create-element ErrorWarning #js {:color "red"}))
(def Warn  (reagent/create-element ErrorWarning #js {:color "orange"}))

(def ICONS
  {"error" Error
   "warn"  Warn})

(defn notification-card
  [{:keys [level title message]
    :or   {level "error"}
    :as   notification}]
  [card {:class "text-white bg-light mb-3 article-card"}
   (get ICONS level Error)
   [card-content
    [typography {:gutter-bottom true
                 :variant       "h5"
                 :component     "div"
                 :color         "text.primary"}
     title]]
   [card-content
    [typography {:variant "body2"
                 :color   "text.primary"}
     message]]])
