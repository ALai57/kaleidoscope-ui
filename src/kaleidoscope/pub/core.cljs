(ns kaleidoscope.pub.core
  (:require
    ;; Just to get React 18
    ["react-dom/client" :as react-dom]
    [goog.dom :as gdom]

    [kaleidoscope.pub.events.core]
    [kaleidoscope.ui.clients.bugsnag :as bugsnag]
    [kaleidoscope.ui.events.keycloak]
    [kaleidoscope.ui.events.payments]
    [kaleidoscope.ui.subs]
    [kaleidoscope.ui.pages.sign-up :as pages.sign-up]

    [day8.re-frame.http-fx]
    [re-frame.core :refer [dispatch-sync subscribe]]
    [reagent-mui.components :refer [app-bar container grid toolbar typography box button paper card card-content card-media]]
    [reagent.core :as r]
    [reitit.coercion.spec :as rss]
    [reitit.frontend :as rf]
    [reitit.frontend.easy :as rfe]))

(dispatch-sync [:boot])

;; -- Debugging aids ----------------------------------------------------------
(enable-console-print!)                                     ;; so that println writes to `console.log`

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

(defn example-card
  []
  [paper {:elevation 20}
   [card {:sx {:display "flex"}}
    [grid {:container true}
     [grid {:item true
            :xs   6}
      [box {:sx {:display "flex" :flex-direction "column"}}
       [card-content {:sx {:flex "1 0 auto"}}
        [typography {:variant "h4"}
         "Publish your content"]]]]
     [grid {:item true
            :xs   6}
      [card-media {:component "img"
                   ;;:sx        {:width 151}
                   ;;https://picjumbo.com/download/?image=18577
                   :image     "/static/images/ice-lollies.jpg"}]]]]])

(def routes
  [["/about"
    {:name ::about
     :view (fn []
             [grid {:container true
                    :sx        {:height "100vh"}}
              [grid {:item true
                     :xs   6
                     :sx   {:height "100%"}}
               [paper {:sx {:height              "100%"
                            :background-image    "url(./static/images/ice-lollies.jpg)"
                            :background-size     "cover"
                            :background-position "center"}}
                [typography {:variant "h3"}
                 "Publish your content"]]]
              [grid {:item true
                     :xs   6}
               [grid {:container       true
                      :justify-content "center"
                      :align-items     "center"}
                [grid {:item true
                       :xs   8}
                 [example-card]]]]])}]
   ["/pricing"
    {:name ::pricing
     :view (fn []
             [:div "Pricing"])}]
   ["/register"
    {:name ::register
     :view (fn []
             (let [payment-details (subscribe [:payment-details])
                   domain-availability (subscribe [:domain-availability])
                   stripe (subscribe [:stripe])]
               (fn []
                 [:f> pages.sign-up/-sign-up {:payment-details     @payment-details
                                              :domain-availability @domain-availability
                                              :stripe              @stripe}])))}]])


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
  {"About"    "/about"
   "Pricing"  "/pricing"
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
         ^{:key page-name}
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
