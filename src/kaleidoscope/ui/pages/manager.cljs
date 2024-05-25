(ns kaleidoscope.ui.pages.manager
  (:require [kaleidoscope.ui.components.manager :as m]
            [kaleidoscope.ui.components.navbar :as nav]))

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
