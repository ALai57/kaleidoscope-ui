(ns kaleidoscope.cljs.pages.admin
  (:require [ajax.core :refer [POST]]
            [kaleidoscope.cljs.navbar :as nav]
            [kaleidoscope.cljs.components.primary-button :as primary-button]
            [kaleidoscope.cljs.components.secondary-button :as secondary-button]
            [kaleidoscope.cljs.components.side-menu :as side-menu]
            [kaleidoscope.cljs.components.input-box :as input-box]
            [kaleidoscope.cljs.components.thumbnail :as thumbnail]
            [kaleidoscope.cljs.components.snackbar :as snackbar]
            [kaleidoscope.cljs.keycloak :as keycloak]
            [kaleidoscope.cljs.modal :refer [modal-template basic-modal]]
            [goog.object :as gobj]
            [re-frame.core :refer [dispatch subscribe]]
            [keycloak-js :as keycloak-js]
            [taoensso.timbre :refer-macros [infof info]]))

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

;; Change to popup!
#_[:p "kaleidoscope.com uses the open source "
   [:a {:href "https://www.keycloak.org"} "Keycloak"]
   " identity provider for authentication. Clicking the link will redirect you to a login site."]
(defn login-form
  [{:keys [user-event-handlers login-response notification-type]}]

  [:div.row.justify-content-center
   [:div.login-wrapper.shadow.p-3.rounded.col-md-4
    [primary-button/primary-button {:text    "Login via Keycloak"
                                    :on-click (get user-event-handlers :on-login-click)}]
    [primary-button/primary-button {:text    "Check if you are logged in"
                                    :on-click (get user-event-handlers :on-check-auth-click)}]
    [primary-button/primary-button {:text    "Check if you have admin access"
                                    :on-click (get user-event-handlers :on-admin-click)}]
    [:br]
    [side-menu/side-menu {:expand-button     (fn [props] [primary-button/primary-button (merge props
                                                                                               {:text "Notification settings"})])
                          :notification-type notification-type}]]])

;; Instead of doing this, have the component dispatch on a loaded file as an argument
(defn load-image [file-added-event]
  (let [file        (first (array-seq (.. file-added-event -target -files)))
        file-reader (js/FileReader.)]
    (set! (.-onload file-reader)
          (fn [file-load-event]
            (let [preview (.getElementById js/document "avatar-preview")]
              (aset preview "src" (-> file-load-event .-target .-result)))))
    (.readAsDataURL file-reader file)))

(defn user-profile [{:keys [avatar_url username given_name family_name email] :as user}
                    {:keys [on-admin-click
                            on-edit-profile-click
                            on-logout-click]
                     :as   user-event-handlers}
                    notification-type]
  [:div#primary-content
   [:form
    [thumbnail/thumbnail {:image-url avatar_url}]

    ;; One component - Image Loader
    #_[thumbnail/thumbnail {:image-url avatar_url
                            :name      "avatar"
                            :id        "avatar-preview"}]
    #_[:input.btn-primary {:type      "file"
                           :accept    "image/png"
                           :on-change load-image}]
    #_[:img {:id    "avatar-preview"
             :name  "avatar"
             :style {:width "100px"}}]
    [:br]
    [:br]
    [:br]
    [input-box/input-box {:value     email
                          :label     "Email"
                          :label-for "email"
                          :disabled  true
                          :readOnly  true}]
    [input-box/input-box {:value     (or given_name "<UNKNOWN>")
                          :label     "First name"
                          :label-for "firstName"
                          :disabled  true
                          :readOnly  true}]
    [input-box/input-box {:value     (or family_name "<UNKNOWN>")
                          :label     "Last name"
                          :label-for "lastName"
                          :disabled  true
                          :readOnly  true}]
    [:br]
    [:br]
    [primary-button/primary-button {:text     "Edit profile"
                                    :on-click on-edit-profile-click}]
    [primary-button/primary-button {:text     "Logout"
                                    :on-click on-logout-click}]
    [primary-button/primary-button {:text     "Check user authentication"
                                    :on-click on-admin-click}]
    [:br]
    [side-menu/side-menu {:expand-button     (fn [props] [primary-button/primary-button (merge props
                                                                                               {:text "Notification settings"})])
                          :notification-type notification-type}]]])

(defn login-ui
  [{:keys [user user-event-handlers login-response notification-type]}]
  (when login-response
    (info "Checked if user is authenticated:" login-response))
  (let [notifier (get NOTIFIERS notification-type modal-notifier)]
    [:div
     [nav/nav-bar {:user user}]
     [:br]

     [notifier login-response]
     (if user
       [user-profile user user-event-handlers notification-type]
       [login-form {:user-event-handlers user-event-handlers
                    :login-response      login-response
                    :notification-type   notification-type
                    }])]))
