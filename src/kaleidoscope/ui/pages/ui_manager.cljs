(ns kaleidoscope.ui.pages.ui-manager
  (:require ["@mui/material/styles" :refer [styled useTheme]]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.colors.color-family :refer [color-theme]]
            [kaleidoscope.ui.components.colors.color-wheel :as cw]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [reagent-mui.components :refer [box grid typography]]
            [re-frame.core :refer [dispatch]]
            ))

(defn -save-theme!
  [{:keys [hue saturation lightness angle theta] :as clj-theme}]
  (dispatch [:save-theme! clj-theme]))

(defn -ui-manager-page [{:keys [user notification-type auth-token theme-event-handlers theme]}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [:div
     [nav/nav-bar {:user              user
                   :notification-type notification-type}]
     [:div {:margin "10px"}
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
      #_[demo/demo]

      [color-theme {:theme-elements      {}
                    :background-elements {}}]]]))

(defn ui-manager-page
  [{:keys [user notification-type theme-event-handlers theme]}]
  [:f> -ui-manager-page {:user                 user
                         :theme                theme
                         :theme-event-handlers theme-event-handlers
                         :notification-type    notification-type}])
