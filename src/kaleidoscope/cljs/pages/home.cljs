(ns kaleidoscope.cljs.pages.home
  (:require [kaleidoscope.cljs.article-cards :as cards]
            [kaleidoscope.cljs.components.demo :as demo]
            [kaleidoscope.cljs.navbar :as nav]
            ))

(defn home [{:keys [user recent-content notification-type]}]
  [:div {:style {:min-height "100vh"}}
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [demo/demo]])
