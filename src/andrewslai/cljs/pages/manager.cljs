(ns andrewslai.cljs.pages.manager
  (:require [andrewslai.cljs.components.manager :as m]
            [andrewslai.cljs.navbar :as nav]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof info]]
            ))

(defn -manager-page [{:keys [user groups notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:br]
   [:br]
   [:div#primary-content
    [m/manager-cards]]])

(defn manager-page
  [{:keys [user notification-type]}]
  [-manager-page {:user              user
                  :notification-type notification-type}])
