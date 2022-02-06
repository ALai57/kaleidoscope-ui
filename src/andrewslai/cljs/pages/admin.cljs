(ns andrewslai.cljs.pages.admin
  (:require [ajax.core :refer [POST]]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.components.primary-button :as primary-button]
            [andrewslai.cljs.components.secondary-button :as secondary-button]
            [andrewslai.cljs.components.input-box :as input-box]
            [andrewslai.cljs.components.thumbnail :as thumbnail]
            [andrewslai.cljs.keycloak :as keycloak]
            [andrewslai.cljs.modal :refer [close-modal modal-template] :as modal]
            [goog.object :as gobj]
            [re-frame.core :refer [dispatch subscribe]]
            [keycloak-js :as keycloak-js]))

(defn form-data->map [form-id]
  (let [m (atom {})]
    (-> js/FormData
        (new (.getElementById js/document form-id))
        (.forEach (fn [v k obj] (swap! m conj {(keyword k) v}))))
    @m))

;; Change to popup!
#_[:p "andrewslai.com uses the open source "
   [:a {:href "https://www.keycloak.org"} "Keycloak"]
   " identity provider for authentication. Clicking the link will redirect you to a login site."]
(defn login-form
  [{:keys [on-login-click on-admin-click] :as _user-event-handlers}]
  [:div.login-wrapper.shadow.p-3.rounded
   [primary-button/primary-button {:text    "Login via Keycloak"
                                   :on-click on-login-click}]
   [primary-button/primary-button {:text    "Check if you're already logged in"
                                   :on-click on-admin-click}]])

(defn text-input [field-name title initial-value & description]
  [:dl.form-group
   [:dt [:label {:for field-name} title]]
   [:dd [:input.form-control {:type "text"
                              :name field-name
                              :defaultValue initial-value}]]
   (when description
     [:note (first description)])])

(defn registration-data->map [form-id]
  (let [m (atom (form-data->map form-id))

        avatar (-> js/document
                   (.getElementById "avatar-preview")
                   (aget "src")
                   (clojure.string/split ",")
                   second)]

    (if avatar
      (swap! m assoc :avatar avatar)
      (swap! m dissoc :avatar))
    @m))

(defn load-image [file-added-event]
  (let [file (first (array-seq (.. file-added-event -target -files)))
        file-reader (js/FileReader.)]
    (set! (.-onload file-reader)
          (fn [file-load-event]
            (let [preview (.getElementById js/document "avatar-preview")]
              (aset preview "src" (-> file-load-event .-target .-result)))))
    (.readAsDataURL file-reader file)))

(defn user-profile [{:keys [avatar_url username firstName lastName email] :as user}
                    {:keys [on-admin-click
                            on-edit-profile-click
                            on-logout-click]
                     :as   user-event-handlers}]
  [:div.user-profile-wrapper
   [:form
    [thumbnail/thumbnail {:image-url avatar_url}]
    [thumbnail/thumbnail {:image-url avatar_url
                          :name      "avatar"
                          :id        "avatar-preview"}]
    #_[:img {:id    "avatar-preview"
             :name  "avatar"
             :style {:width "100px"}}]
    [:input.btn-primary {:type      "file"
                         :accept    "image/png"
                         :on-change load-image}]
    [:br]
    [:br]
    [:br]
    [input-box/input-box {:value     email
                          :label     "Email"
                          :label-for "email"
                          :readOnly  true}]
    [input-box/input-box {:value     firstName
                          :label     "First name"
                          :label-for "firstName"
                          :readOnly  true}]
    [input-box/input-box {:value     lastName
                          :label     "Last name"
                          :label-for "lastName"
                          :readOnly  true}]
    [:br]
    [:br]
    [secondary-button/secondary-button {:text     "Edit profile"
                                        :style    {:float "left"}
                                        :on-click on-edit-profile-click}]
    [secondary-button/secondary-button {:text     "Logout"
                                        :style    {:float "right"}
                                        :on-click on-logout-click}]
    [:br]
    [:br]
    [secondary-button/secondary-button {:text     "Try hitting restricted route"
                                        :on-click on-admin-click}]]])

(defn login-ui
  [{:keys [user user-event-handlers]}]
  [:div
   [nav/nav-bar user]
   [:br]
   (if user
     [user-profile user user-event-handlers]
     [login-form user-event-handlers])])
