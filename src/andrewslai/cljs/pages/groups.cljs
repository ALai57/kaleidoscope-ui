(ns andrewslai.cljs.pages.groups
  (:require [andrewslai.cljs.components.groups.group-manager :as gm]
            [andrewslai.cljs.navbar :as nav]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof info]]
            ))

(defn -add-group!
  [group-name]
  (infof "Creating group %s" group-name)
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
    ;; To make sure the component re-renders, because it uses state
    ^{:key (str "group-manager-" (count groups))}
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
