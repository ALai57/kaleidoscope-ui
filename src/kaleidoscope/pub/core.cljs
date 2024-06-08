(ns kaleidoscope.pub.core
  (:require
   ;; Just to get React 18
   ["react-dom/client" :as react-dom]
   [goog.dom :as gdom]

   [kaleidoscope.pub.events.core]
   [kaleidoscope.ui.clients.bugsnag :as bugsnag]
   [kaleidoscope.ui.events.keycloak]
   [kaleidoscope.ui.events.payments]
   [kaleidoscope.ui.events.payments]
   [kaleidoscope.ui.subs]
   [kaleidoscope.ui.pages.sign-up :as pages.sign-up]

   [day8.re-frame.http-fx]
   [re-frame.core :refer [dispatch-sync subscribe]]
   [reagent-mui.components :refer [app-bar container toolbar typography box button]]
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

;; Support for React 18
;; `kaleidoscope.ui.views/app` is the root view for the entire UI.
(defonce root
  (react-dom/createRoot (gdom/getElement "app")))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Routing
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def routes
  [["/about"
    {:name ::about
     :view (fn []
             [:div "About"])}]
   ["/pricing"
    {:name ::pricing
     :view (fn []
             [:div "Pricing"])}]
   ["/register"
    {:name ::register
     :view (fn []
             (let [payment-details (subscribe [:payment-details])
                   stripe          (subscribe [:stripe])]
               [:f> pages.sign-up/-sign-up {:payment-details @payment-details
                                            :stripe          @stripe}]))}]])


(defonce match (r/atom nil))

(rfe/start!
 (rf/router routes {:data {:coercion rss/coercion}})
 (fn [m]
   ;;(js/console.log "Matched" m)
   ;;(println "Matched" m)
   (reset! match m))
 ;; set to false to enable HistoryAPI
 {:use-fragment false})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pages and views
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn not-found
  []
  [typography {:variant "h3"}
   "Route does not exist"])

(def pages
  {"Pricing"  "/pricing"
   "About"    "/about"
   "Register" "/register"})

(defn root-view
  []
  [box
   [app-bar {:position "static"}
    [container {:max-width "xl"}
     [toolbar {:disable-gutters true}
      [typography {:variant "h6"
                   :sx      {:padding-right "20px"}}
       "Kaleidoscope.pub"]
      [box {:sx {:flex-grow 1
                 :display   {:xs "flex"}}}
       (for [[page-name link] pages]
         [:a {:href link}
          [button {:key      page-name
                   :on-click (fn []
                               ;; Navigate to page
                               )
                   :sx       {:my      2
                              :color   "white"
                              :display "block"}}
           page-name]])]]]]
   (if-let [view (get-in @match [:data :view])]
     [view]
     [not-found])])

(defn ^:export main
  []
  (.render root
           (r/as-element [:> bugsnag/ErrorBoundary
                          [root-view]])))
