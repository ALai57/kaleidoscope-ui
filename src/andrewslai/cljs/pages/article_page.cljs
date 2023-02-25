(ns andrewslai.cljs.pages.article-page
  (:require [andrewslai.cljs.article :as article]
            [andrewslai.cljs.article-cards :as cards]
            [andrewslai.cljs.navbar :as nav]
            [re-frame.core :refer [subscribe dispatch]]
            ))

(defn -article-page [{:keys [user active-content recent-content notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:div#primary-content
    (when active-content
      [article/article active-content])]
   [:div#rcb
    [cards/recent-content-cards {:recent-content recent-content}]]])

(defn article-page [{:keys [user active-content recent-content notification-type]}]
  [-article-page {:recent-content @(subscribe [:recent-content])
                  :active-content @(subscribe [:active-content])}])
