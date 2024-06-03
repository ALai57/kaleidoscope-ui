(ns kaleidoscope.pub.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require
   ;; Just to get React 18
   ["react-dom/client" :as react-dom]
   [goog.dom :as gdom]
   [goog.events :as events]

   [kaleidoscope.ui.clients.bugsnag :as bugsnag]
   [kaleidoscope.ui.components.loading-screen :as loading]
   [kaleidoscope.pub.events.core]
   [kaleidoscope.ui.events.keycloak]
   [kaleidoscope.ui.events.payments]
   [kaleidoscope.ui.subs]
   [kaleidoscope.ui.utils.core :as u]

   [re-frame.core :refer [dispatch dispatch-sync]]
   [reagent.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rf]
   [reitit.frontend.easy :as rfe]))

(dispatch-sync [:boot])

;; -- Debugging aids ----------------------------------------------------------
(enable-console-print!)   ;; so that println writes to `console.log`

;; -- Entry Point -------------------------------------------------------------
;; Within ../../resources/public/index.html you'll see this code
;;    window.onload = function () {
;;      kaleidoscope.pub.core.main();
;;    }
;; So this is the entry function that kicks off the app once HTML is loaded

(def routes
  [["/test"
    {:name ::home
     :view (fn []
             [:div "Hello"])}]])

;; Support for React 18
;; `kaleidoscope.ui.views/app` is the root view for the entire UI.
(defonce root
  (react-dom/createRoot (gdom/getElement "app")))


(defonce match (r/atom nil))

(rfe/start!
 (rf/router routes {:data {:coercion rss/coercion}})
 (fn [m] (reset! match m))
 ;; set to false to enable HistoryAPI
 {:use-fragment false})

(defn ^:export main
  []
  (.render root
           (r/as-element [:> bugsnag/ErrorBoundary
                          [:div "Hello"]])))
