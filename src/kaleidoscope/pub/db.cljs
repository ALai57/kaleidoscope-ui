(ns kaleidoscope.pub.db
  (:require [kaleidoscope.ui.clients.keycloak :as keycloak]))

(def default-db
  {:active-panel      :home
   :loading?          false
   :notification-type :modal
   :keycloak          (keycloak/keycloak {:url      keycloak/AUTH_URL
                                          :realm    keycloak/REALM
                                          :clientId keycloak/CLIENTID})})
