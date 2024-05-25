(ns kaleidoscope.ui.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require
   ;; Just to get React 18
   ["react-dom/client" :as react-dom]
   [goog.dom :as gdom]
   [goog.events :as events]

   [kaleidoscope.ui.clients.bugsnag :as bugsnag]
   [kaleidoscope.ui.components.loading-screen :as loading]
   [kaleidoscope.ui.events.article-editor]
   [kaleidoscope.ui.events.article-reader]
   [kaleidoscope.ui.events.audience-management]
   [kaleidoscope.ui.events.core]
   [kaleidoscope.ui.events.group-management]
   [kaleidoscope.ui.events.image-editor]
   [kaleidoscope.ui.events.keycloak]
   [kaleidoscope.ui.events.projects-portfolio]
   [kaleidoscope.ui.events.ui-customization]
   [kaleidoscope.ui.events.user-management]
   [kaleidoscope.ui.pages.home            :as page.home]
   [kaleidoscope.ui.subs]
   [kaleidoscope.ui.utils.core :as u]

   [re-frame.core :refer [dispatch dispatch-sync]]
   [reagent.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rf]
   [reitit.frontend.easy :as rfe]
   [secretary.core :as secretary]
   [shadow.lazy :as lazy])
  (:import [goog History]
           [goog.history EventType]))

(dispatch-sync [:boot])
(dispatch [:load-recent-articles])
(dispatch [:request-portfolio-cards])

;; -- Debugging aids ----------------------------------------------------------
(enable-console-print!)   ;; so that println writes to `console.log`

;; -- Routes and History ------------------------------------------------------

(defroute "/" []
  (dispatch [:set-active-panel :home]))

#_:clj-kondo/ignore
(defroute "/:path" [path]
  (dispatch [:set-active-panel (keyword path)]))

#_:clj-kondo/ignore
(defroute "/content/:content-name" [content-name]
  (dispatch [:set-active-panel :content])
  (dispatch [:load-article content-name]))


(def HISTORY
  (History.))

(doto HISTORY
  (events/listen EventType.NAVIGATE
                 (fn [event] (secretary/dispatch! (.-token event))))
  (.setEnabled true))

;; -- Entry Point -------------------------------------------------------------
;; Within ../../resources/public/index.html you'll see this code
;;    window.onload = function () {
;;      kaleidoscope.ui.core.main();
;;    }
;; So this is the entry function that kicks off the app once HTML is loaded

#_:clj-kondo/ignore
(defn app
  []
  (u/lazy-component (lazy/loadable kaleidoscope.ui.views/app)))


(def routes
  [["/test"
    {:name ::home
     :view page.home/home}]])

;; Support for React 18
;; `kaleidoscope.ui.views/app` is the root view for the entire UI.
(defonce root
  (react-dom/createRoot (gdom/getElement "app")))



#_(defn init! []
    (r/render [current-page] (.getElementById js/document "app")))

(defonce match (r/atom nil))

(rfe/start!
 (rf/router routes {:data {:coercion rss/coercion}})
 (fn [m] (reset! match m))
 ;; set to false to enable HistoryAPI
 {:use-fragment true})

(defn ^:export main
  []
  (.render root
           (r/as-element [:> bugsnag/ErrorBoundary
                          [app {:fallback (fn []
                                            [loading/loading-screen])}]])))
