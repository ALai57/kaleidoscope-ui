(ns kaleidoscope.ui.core-api.user
  (:require [goog.string :as gstr]
            [re-frame.core :refer [dispatch]]
            ))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; User events
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn login!
  []
  (dispatch [:keycloak-action :login]))

(defn check-admin-status!
  []
  (dispatch [:request-admin-route]))

(defn print-current-user!
  []
  (dispatch [:check-identity]))

(defn logout!
  []
  (dispatch [:keycloak-action :logout]))

(defn account-management!
  []
  (dispatch [:keycloak-action :account-management]))

(def user-event-handlers
  {:on-login-click        login!
   :on-admin-click        check-admin-status!
   :on-check-auth-click   print-current-user!
   :on-logout-click       logout!
   :on-edit-profile-click account-management!})

(defn get-username
  [user]
  (gstr/format "%s %s" (get user :firstName "Not") (get user :lastName "Logged in")))
