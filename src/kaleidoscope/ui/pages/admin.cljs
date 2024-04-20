(ns kaleidoscope.ui.pages.admin
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.side-menu :as side-menu]
            [kaleidoscope.ui.components.snackbar :as snackbar]
            [kaleidoscope.ui.components.modal :refer [basic-modal]]
            [goog.string :as gstr]
            [reagent-mui.components :refer [stack paper typography]]
            [taoensso.timbre :refer-macros [info]]
            ))

(defn authentication-failure
  []
  {:title "Authentication failed!"
   :body  "Not Authenticated"
   :level "error"})

(defn authentication-success
  []
  {:title "Authentication success!"
   :body  "Authenticated"
   :level "success"})

(defn success?
  [{:keys [status]}]
  (= 200 status))

(defn modal-notifier
  [response]
  (cond
    (success? response) [basic-modal (assoc (authentication-success) :open? true)]
    (nil? response)     nil
    :else               [basic-modal (assoc (authentication-failure) :open? true)]))

(defn snackbar-notifier
  [response]
  (cond
    (success? response) [snackbar/basic-snackbar {:message "User is logged in!"
                                                  :level   "success"}]
    (nil? response)     nil
    :else               [snackbar/basic-snackbar {:message "You have not authenticated. Please login!"
                                                  :level   "error"}]))

(def NOTIFIERS
  {:modal    modal-notifier
   :snackbar snackbar-notifier})

(defn user-profile [{:keys [user user-event-handlers notification-type]}]
  (let [{:keys [avatar_url username given_name family_name email]}                    user
        {:keys [on-admin-click on-edit-profile-click on-logout-click on-login-click]} user-event-handlers]
    [:div#primary-content
     [:div {:style {:display         "flex"
                    :justify-content "center"}}
      [paper {:elevation 3 :sx {:padding   "15px"
                                :display   "block"
                                :flex-grow 1
                                :max-width "500px"}}
       [stack {:spacing 2}
        [typography {:variant "h3"}
         (if user
           (gstr/format "Welcome %s %s!" given_name family_name)
           (gstr/format "Welcome!"))]
        [:br]
        (if user
          [button/button {:text     "Edit user profile"
                          :on-click on-edit-profile-click}]
          [button/button {:text     "Login"
                          :on-click on-login-click}]
          )
        [side-menu/side-menu {:expand-button     (fn [props] [button/button (merge props {:text "Settings"})])
                              :notification-type notification-type}]
        (when user
          [button/button {:text     "Logout"
                          :color    "secondary"
                          :on-click on-logout-click}])]]]]))

(defn login-ui
  [{:keys [user user-event-handlers login-response notification-type]}]
  (when login-response
    (info "Checked if user is authenticated:" login-response))
  (let [notifier (get NOTIFIERS notification-type modal-notifier)]
    [:div
     [nav/nav-bar {:user user}]
     [:br]
     [notifier login-response]
     [:f> user-profile {:user                user
                        :user-event-handlers user-event-handlers
                        :notification-type   notification-type}]]))
