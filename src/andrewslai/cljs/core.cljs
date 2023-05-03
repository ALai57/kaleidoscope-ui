(ns andrewslai.cljs.core
  (:require-macros [secretary.core :refer [defroute]])
  (:require [andrewslai.cljs.components.loading-screen :as loading]
            [andrewslai.cljs.events.articles]
            [andrewslai.cljs.events.auth]
            [andrewslai.cljs.events.core] ;; required to make the compiler
            [andrewslai.cljs.events.groups] ;; required to make the compiler
            [andrewslai.cljs.events.keycloak]
            [andrewslai.cljs.events.projects-portfolio]
            [andrewslai.cljs.events.slate-editor]
            [andrewslai.cljs.events.user]
            [andrewslai.cljs.keycloak :as keycloak]
            [andrewslai.cljs.subs]   ;; load them (see docs/App-Structure.md)
            [andrewslai.cljs.utils :as u]
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

(defn app
  []
  (u/lazy-component (lazy/loadable andrewslai.cljs.views/app)))

(defn ^:export main
  []
  ;; `andrewslai.cljs.views/app` is the root view for the entire UI.
  (render [app {:fallback (fn []
                            [loading/loading-screen])}]
          (.getElementById js/document "app")))
