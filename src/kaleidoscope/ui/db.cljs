(ns kaleidoscope.ui.db
  (:require [kaleidoscope.ui.clients.keycloak :as keycloak]
            [kaleidoscope.ui.theme :as theme]))


;; -- Spec --------------------------------------------------------------------
;; The value in app-db should always match this spec.

;;(s/def ::active-panel keyword?)

;; -- Default app-db Value  ---------------------------------------------------

(def default-db
  {:active-panel             :home
   :active-content           nil
   :resume-info              nil
   :selected-resume-category nil
   :selected-resume-card     nil
   :recent-content           nil
   :theme                    theme/BASE-THEME
   :loading?                 false
   :loading-resume?          false
   :notification-type        :modal
   :editor-data              nil
   :editor-metadata          {}
   :keycloak                 (keycloak/keycloak {:url      keycloak/AUTH_URL
                                                 :realm    keycloak/REALM
                                                 :clientId keycloak/CLIENTID})})
