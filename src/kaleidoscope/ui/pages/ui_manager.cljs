(ns kaleidoscope.ui.pages.ui-manager
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.components.colors.color-family :refer [color-theme]]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.clients.leonardo] ;; DELETEME
            ["@mui/material/styles" :refer [styled useTheme]]
            ))

(defn -ui-manager-page [{:keys [user notification-type auth-token]}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [:div
     [nav/nav-bar {:user              user
                   :notification-type notification-type}]
     [:div {:margin "10px"}

      [color-theme {:theme-elements      {}
                    :background-elements {}}]]]))

(defn ui-manager-page
  [{:keys [user notification-type]}]
  [:f> -ui-manager-page {:user              user
                         :notification-type notification-type}])
