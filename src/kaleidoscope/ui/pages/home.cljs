(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.article-cards :as cards]
            [kaleidoscope.ui.components.demo :as demo]
            [kaleidoscope.ui.components.navbar :as nav]
            ))

(defn home [{:keys [user recent-content notification-type]}]
  [:div {:style {:min-height "100vh"}}
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [demo/demo]])
