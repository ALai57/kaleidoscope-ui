(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.article-cards :as cards]
            [kaleidoscope.ui.components.demo :as demo]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.components.colors.color-wheel :as cw]
            [reagent-mui.components :refer [box]]

            ["@mui/material" :as mui]
            ["@mui/material/styles" :refer [createTheme]]
            [kaleidoscope.ui.theme :as theme]
            [reagent.core :as reagent]
            [re-frame.core :refer [dispatch]]
            ))

(defn -save-theme!
  [{:keys [hue saturation lightness angle theta] :as clj-theme}]
  (dispatch [:save-theme! clj-theme]))

(defn home [{:keys [user notification-type theme-event-handlers theme]}]
  [:div {:style {:min-height "100vh"}}
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [box {:display        "flex"
         :alignItems     "center"
         :justifyContent "center"}
    [:f> cw/color-wheel {:wheel-radius    200
                         :ring-thickness  60
                         :initial-palette theme
                         :on-change       (:on-change theme-event-handlers)}]]

   [:br]
   [:br]

   [box {:display        "flex"
         :alignItems     "center"
         :justifyContent "center"}
    [button/button {:text     "Example button"
                    :on-click (partial -save-theme! theme)}]]
   #_[demo/demo]])
