(ns kaleidoscope.cljs.pages.article-page
  (:require [kaleidoscope.cljs.article :as article]
            [kaleidoscope.cljs.article-cards :as cards]
            [kaleidoscope.cljs.navbar :as nav]
            [re-frame.core :refer [subscribe dispatch]]
            ))

(defn -article-page [{:keys [user notification-type
                             active-content recent-content]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:div#primary-content
    (when active-content
      [article/article active-content])]
   [:div#rcb
    [cards/recent-content-cards {:recent-content recent-content}]]])

(defn article-page [{:keys [user notification-type]}]
  [-article-page {:user              user
                  :notification-type notification-type
                  :recent-content    @(subscribe [:recent-content])
                  :active-content    @(subscribe [:active-content])}])
