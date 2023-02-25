(ns andrewslai.cljs.keycloak
  (:require ["keycloak-js" :as keycloak-js]
            [re-frame.core :refer [dispatch]]
            [taoensso.timbre :refer-macros [infof debugf warnf]]))

(goog-define AUTH_URL "defined-at-compile-time")
(goog-define CLIENTID "defined-at-compile-time")
(goog-define REALM "defined-at-compile-time")

(def HOST_URL
  (str js/window.location.protocol "//" js/window.location.host))

(defn keycloak
  [options]
  (debugf "Starting Keycloak...")
  (let [kc-instance (keycloak-js (clj->js options))]
    (set! (.-onTokenExpired kc-instance) (fn [] (infof "Access token is expiring! Refreshing tokens...")
                                           (-> kc-instance
                                               (.updateToken)
                                               (.then (fn [refreshed]
                                                        (if refreshed
                                                          (infof "Tokens successfully refreshed")
                                                          (warnf "Tokens failed to refresh"))))
                                               (.catch (fn []
                                                         (warnf "Failed to refresh token or session expired."))))
                                           ))
    (set! (.-onAuthSuccess kc-instance) (fn [] (infof "Successful authentication!")))
    (set! (.-onAuthRefreshSuccess kc-instance) (fn [] (infof "Successful token refresh!")))
    (set! (.-onAuthRefreshError kc-instance) (fn [] (warnf "Token refresh failure!")))
    kc-instance))

(defn initialize!
  ([^js keycloak-instance]
   (initialize! keycloak-instance
                (fn [auth?] (infof "Authenticated? %s" auth?))
                (fn [auth?] (infof "Unable to initialize Keycloak"))))
  ([^js keycloak-instance success fail]
   (-> keycloak-instance
       (.init (clj->js {:checkLoginIframe          false
                        :onLoad                    "check-sso"
                        ;; This came from keycloak documentation
                        ;; https://github.com/keycloak/keycloak-documentation/blob/main/securing_apps/topics/oidc/javascript-adapter.adoc
                        ;; The `/silent-check-sso.html` file must exist and post
                        ;; a notification back to the parent window.
                        :silentCheckSsoRedirectUri (str js/window.location.origin "/silent-check-sso.html")
                        :pkceMethod                "S256"}))
       (.then success)
       (.catch fail))))

(defn login! [^js keycloak]
  (infof "Redirecting to %s for authentication" AUTH_URL)
  (.login keycloak (clj->js {:scope       "roles"
                             :prompt      "consent"
                             :redirectUri HOST_URL})))

(defn logout! [^js keycloak]
  (.logout keycloak))

(defn account-management! [^js keycloak]
  (.accountManagement keycloak))

;; See https://keycloak.discourse.group/t/cors-issue-for-loaduserprofile-and-loaduserinfo/3549
(defn load-profile!
  [^js keycloak-instance success failure]
  (debugf "Loading user profile...")
  (js/console.log keycloak-instance)
  (-> keycloak-instance
      .loadUserInfo
      (.then success)
      (.catch failure)))


;; Make sequence diagram for the authentication flow
;; Retrieve user ID and store in app db. Retreive all user params and store in reagent atom
