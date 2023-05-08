(ns kaleidoscope.ui.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [goog.events :as events]
            [kaleidoscope.ui.components.loading-screen :as loading]
            [kaleidoscope.ui.events.article-reader]
            [kaleidoscope.ui.events.article-editor]
            [kaleidoscope.ui.events.core]
            [kaleidoscope.ui.events.group-management]
            [kaleidoscope.ui.events.keycloak]
            [kaleidoscope.ui.events.projects-portfolio]
            [kaleidoscope.ui.events.user-management]
            [kaleidoscope.ui.subs]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [dispatch dispatch-sync]]
            [reagent.dom :refer [render]]
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
(defroute "/:path" [path]
  (dispatch [:set-active-panel (keyword path)]))
(defroute "/:path/content/:content-name" [path content-name]
  (dispatch [:set-active-panel (keyword path)])
  (dispatch [:load-article content-name]))


(def history
  (doto (History.)
    (events/listen EventType.NAVIGATE
                   (fn [event] (secretary/dispatch! (.-token event))))
    (.setEnabled true)))


;; -- Entry Point -------------------------------------------------------------
;; Within ../../resources/public/index.html you'll see this code
;;    window.onload = function () {
;;      kaleidoscope.ui.core.main();
;;    }
;; So this is the entry function that kicks off the app once HTML is loaded

(defn app
  []
  (u/lazy-component (lazy/loadable kaleidoscope.ui.views/app)))

(defn ^:export main
  []
  ;; `kaleidoscope.ui.views/app` is the root view for the entire UI.
  (render [app {:fallback (fn []
                            [loading/loading-screen])}]
          (.getElementById js/document "app")))
