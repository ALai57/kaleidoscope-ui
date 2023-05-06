(ns kaleidoscope.ui.pages.admin
  (:require [ajax.core :refer [POST]]
            [kaleidoscope.ui.navbar :as nav]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.side-menu :as side-menu]
            [kaleidoscope.ui.components.input-box :as input-box]
            [kaleidoscope.ui.components.thumbnail :as thumbnail]
            [kaleidoscope.ui.components.snackbar :as snackbar]
            [kaleidoscope.ui.keycloak :as keycloak]
            [kaleidoscope.ui.modal :refer [modal-template basic-modal]]
            [goog.object :as gobj]
            [goog.string :as gstr]
            [reagent-mui.components :refer [stack paper typography]]
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

(comment
  ;; Instead of doing this, have the component dispatch on a loaded file as an argument
  #_(defn load-image [file-added-event]
      (let [file        (first (array-seq (.. file-added-event -target -files)))
            file-reader (js/FileReader.)]
        (set! (.-onload file-reader)
              (fn [file-load-event]
                (let [preview (.getElementById js/document "avatar-preview")]
                  (aset preview "src" (-> file-load-event .-target .-result)))))
        (.readAsDataURL file-reader file)))



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
  [thumbnail/thumbnail {:image-url avatar_url}]
  )

(comment
  ;; Api access tools
  #_[button/button {:text     "Check user authentication"
                    :on-click on-admin-click}]

  #_[button/button {:text     "Check if you are logged in"
                    :on-click (get user-event-handlers :on-check-auth-click)}]
  #_[button/button {:text     "Check if you have admin access"
                    :on-click (get user-event-handlers :on-admin-click)}]

  )

(defn user-profile [{:keys [avatar_url username given_name family_name email] :as user}
                    {:keys [on-admin-click
                            on-edit-profile-click
                            on-logout-click]
                     :as   user-event-handlers}
                    notification-type]
  [:div#primary-content
   [:div {:style {:display         "flex"
                  :justify-content "center"}}
    [paper {:elevation 3 :sx {:padding   "15px"
                              :display   "block"
                              :flex-grow 1
                              :max-width "500px"}}
     [stack {:spacing 2}
      [:form
       [typography {:variant "h3"}
        (if user
          (gstr/format "Welcome %s %s!" given_name family_name)
          (gstr/format "Welcome!"))]]
      [:br]
      (if user
        [button/button {:text     "Edit user profile"
                        :on-click on-edit-profile-click}]
        [button/button {:text     "Login"
                        :on-click (get user-event-handlers :on-login-click)}]
        )
      [side-menu/side-menu {:expand-button     (fn [props] [button/button (merge props {:text "Settings"})])
                            :notification-type notification-type}]
      (when user
        [button/button {:text     "Logout"
                        :color    "secondary"
                        :on-click on-logout-click}])]]]])

(defn login-ui
  [{:keys [user user-event-handlers login-response notification-type]}]
  (when login-response
    (info "Checked if user is authenticated:" login-response))
  (let [notifier (get NOTIFIERS notification-type modal-notifier)]
    [:div
     [nav/nav-bar {:user user}]
     [:br]
     [notifier login-response]
     [user-profile user user-event-handlers notification-type]]))
