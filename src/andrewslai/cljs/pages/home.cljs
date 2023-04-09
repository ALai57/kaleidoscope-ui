(ns andrewslai.cljs.pages.home
  (:require [andrewslai.cljs.article-cards :as cards]
            [andrewslai.cljs.components.demo :as demo]
            [andrewslai.cljs.navbar :as nav]
            ))

(defn home [{:keys [user recent-content notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [demo/demo]])
