(ns andrewslai.cljs.pages.groups
  (:require [andrewslai.cljs.components.groups.group-manager :as gm]
            [andrewslai.cljs.navbar :as nav]
            [re-frame.core :refer [subscribe dispatch]]
            ))

(defn -add-group!
  [group-name]
  (dispatch [:add-group! group-name]))

(defn -delete-group!
  [group]
  (dispatch [:delete-group! group]))

(defn -add-member!
  [group email]
  (dispatch [:add-member! group email]))

(defn -delete-member!
  [group user]
  (dispatch [:delete-member! user]))

(defn -group-page [{:keys [user groups notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:br]
   [:br]
   [:div#primary-content
    [gm/group-manager {:groups        groups
                       :add-group!    -add-group!
                       :delete-group! -delete-group!

                       :add-member!    -add-member!
                       :delete-member! -delete-member!
                       }]]])

(defn group-page
  [{:keys [user notification-type]}]
  [-group-page {:user              user
                :notification-type notification-type
                :groups            @(subscribe [:groups])}])
