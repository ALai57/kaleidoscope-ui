(ns andrewslai.cljs.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [andrewslai.cljs.events.articles]
            [andrewslai.cljs.events.auth]
            [andrewslai.cljs.events.core] ;; required to make the compiler
            [andrewslai.cljs.events.keycloak]
            [andrewslai.cljs.events.projects-portfolio]
            [andrewslai.cljs.events.slate-editor]
            [andrewslai.cljs.events.user]
            [andrewslai.cljs.keycloak :as keycloak]
            [andrewslai.cljs.subs]   ;; load them (see docs/App-Structure.md)
            [andrewslai.cljs.views]
            [goog.events :as events]
            ;;[devtools.core :as devtools]
            [keycloak-js :as keycloak-js]
            [re-frame.core :refer [dispatch dispatch-sync]]
            [reagent.dom :refer [render]]
            [secretary.core :as secretary])
  (:import [goog History]
           [goog.history EventType]))

;; Use async-flow fx to make a single initialize function
(dispatch-sync [:boot])
(dispatch [:request-recent-articles])
(dispatch [:request-portfolio-cards])

;; -- Debugging aids ----------------------------------------------------------
;;(devtools/install!)       ;; https://github.com/binaryage/cljs-devtools
(enable-console-print!)   ;; so that println writes to `console.log`

;; -- Routes and History ------------------------------------------------------

(defroute "/" []
  (dispatch [:set-active-panel :home]))
(defroute "/:path" [path]
  (dispatch [:set-active-panel (keyword path)]))
(defroute "/:path/content/:content-name" [path content-name]
  (dispatch [:set-active-panel (keyword path)])
  (dispatch [:request-article content-name]))


(def history
  (doto (History.)
    (events/listen EventType.NAVIGATE
                   (fn [event] (secretary/dispatch! (.-token event))))
    (.setEnabled true)))


;; -- Entry Point -------------------------------------------------------------
;; Within ../../resources/public/index.html you'll see this code
;;    window.onload = function () {
;;      andrewslai.cljs.core.main();
;;    }
;; So this is the entry function that kicks off the app once HTML is loaded

(defn ^:export main
  []
  ;; `andrewslai.cljs.views/app` is the root view for the entire UI.
  (render [andrewslai.cljs.views/app]
          (.getElementById js/document "app")))
