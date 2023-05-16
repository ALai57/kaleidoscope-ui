(ns kaleidoscope.ui.clients.bugsnag
  (:require [kaleidoscope.ui.version :as v]
            ["react" :as react]
            ["@bugsnag/js" :as bg-js]
            ["@bugsnag/plugin-react" :as bg-react]))


(goog-define BUGSNAG_KEY "defined-at-compile-time")

(def Bugsnag
  (bg-js/start #js {:apiKey     BUGSNAG_KEY
                    :plugins    (clj->js [(new bg-react)])
                    :appVersion v/VERSION}))

(def ErrorBoundary
  "Wraps the application with a Bugsnag error boundary"
  (.createErrorBoundary (.getPlugin Bugsnag "react") react))

(comment
  (js/console.log "BUGSNAG" Bugsnag)

  (js/console.log "GOOG DEFINES"
                  v/VERSION
                  BUGSNAG_KEY)

  (js/console.log "ERROR BOUNDARY" ErrorBoundary)
  )
