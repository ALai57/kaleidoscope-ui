(ns kaleidoscope.ui.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [kaleidoscope.ui.components.loading-screen :as loading]
            [kaleidoscope.ui.events.articles]
            [kaleidoscope.ui.events.auth]
            [kaleidoscope.ui.events.core] ;; required to make the compiler
            [kaleidoscope.ui.events.groups] ;; required to make the compiler
            [kaleidoscope.ui.events.keycloak]
            [kaleidoscope.ui.events.projects-portfolio]
            [kaleidoscope.ui.events.slate-editor]
            [kaleidoscope.ui.events.user]
            [kaleidoscope.ui.clients.keycloak :as keycloak]
            [kaleidoscope.ui.subs]   ;; load them (see docs/App-Structure.md)
            [kaleidoscope.ui.utils.core :as u]
            [goog.events :as events]
            [goog.object :as gobj]
            ;;[devtools.core :as devtools]
            [keycloak-js :as keycloak-js]
            [re-frame.core :refer [dispatch dispatch-sync reg-event-fx]]
            [reagent.dom :refer [render]]
            [secretary.core :as secretary]
            [shadow.lazy :as lazy])
  (:import [goog History]
           [goog.history EventType]))

(comment
  (reg-event-fx :init
    (fn [_ _]
      (js/console.log goog.net.XhrIo
                      ^js (js/Object.assign #js {} goog.net.XhrIo))
      (let [a         #js {}
            ^js xhrio (js/Object.assign a goog.net.XhrIo)]
        ;;(js-delete goog.net "XhrIo")
        (gobj/set goog.net "XhrIo" (fn []
                                     (js/console.log "NEW XHRIO" xhrio)
                                     (let [^js xh (new xhrio)]
                                       (.setProgressEventsEnabled xh true)
                                       (js/console.log "NEW XHRIO" xh)
                                       xh))))

      (let [x (new goog.net.XmlHttp)]
        (.setGlobalFactory goog.net.XmlHttp #js {:createInstance (fn []
                                                                   (let [myxhr x]
                                                                     (gobj/set myxhr "onprogress" (fn [& args]
                                                                                                    (js/console.log "PROGRESSING" (clj->js args))
                                                                                                    (println (js->clj args))))
                                                                     myxhr))
                                                 :getOptions     (fn []
                                                                   #js {})}))
      ))

  (dispatch-sync [:init])
  )

;; Use async-flow fx to make a single initialize function
(dispatch-sync [:boot])
(dispatch [:load-recent-articles])
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
