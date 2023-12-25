(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.article-cards :as cards]
            [kaleidoscope.ui.components.demo :as demo]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.components.colors.color-wheel :as cw]
            [reagent-mui.components :refer [box]]

            ["@mui/material" :as mui]
            [kaleidoscope.ui.theme :as theme]
            [reagent.core :as reagent]
            ))

(defn home [{:keys [user notification-type]}]
  (let [theme (reagent/atom theme/BASE-THEME)]
    (fn []
      [:div {:style {:min-height "100vh"}}
       [nav/nav-bar {:user              user
                     :notification-type notification-type}]
       [box {:display        "flex"
             :alignItems     "center"
             :justifyContent "center"}
        [:f> cw/color-wheel {:wheel-radius   200
                             :ring-thickness 60
                             :on-change      (fn [event]
                                               (js/console.log "Changed theme")
                                               ;; Reset theme
                                               )}]

        [:> mui/ThemeProvider
         {:theme theme}
         [button/button]]]
       #_[demo/demo]])))
