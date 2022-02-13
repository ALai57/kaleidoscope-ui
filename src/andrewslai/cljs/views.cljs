(ns andrewslai.cljs.views
  (:require [andrewslai.cljs.article :as article]
            [andrewslai.cljs.article-cards :as cards]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.pages.editor :refer [editor-ui]]
            [andrewslai.cljs.pages.admin :refer [login-ui]]
            [clojure.string :refer [includes?]]
            [re-frame.core :refer [subscribe
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Landing pages
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn home [{:keys [user recent-content]}]
  [:div
   [nav/nav-bar user]
   [cards/recent-content-cards {:recent-content recent-content}]])

(defn full-page [{:keys [user active-content recent-content]}]
  [:div
   [nav/nav-bar user]
   [:div#primary-content
    (when active-content
      [article/article active-content])]
   [:div#rcb
    [cards/recent-content-cards {:recent-content recent-content}]]])

(defn reset-portfolio-cards [x]
  (let [clicked-element (.-target x)
        clicked-class (.-className clicked-element)]
    (when-not (or (includes? clicked-class "resume-info-image")
                  (includes? clicked-class "resume-info-icon")
                  (includes? clicked-class "card-description")
                  (includes? clicked-class "card-title")
                  (includes? clicked-class "card-text"))
      (dispatch [:reset-portfolio-cards]))))

(defn about [user]
  [:div {:onClick reset-portfolio-cards
         :style   {:height   "100%"
                   :width    "100%"
                   :position "absolute"}}
   [nav/nav-bar user]
   [:div {:style {:height "100%"}}]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Test pages
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def panels {:home          home
             :thoughts      full-page
             :archive       full-page
             :about         about
             :research      full-page
             :data-analysis full-page
             :admin         login-ui
             :editor        editor-ui
             })

(defn app []
  (let [active-panel @(subscribe [:active-panel])]
    (infof "Active panel %s" active-panel)
    [(get panels active-panel) {:user                @(subscribe [:user])
                                :user-event-handlers {:on-login-click        #(dispatch [:keycloak-login])
                                                      :on-admin-click        #(dispatch [:request-admin-route])
                                                      :on-logout-click       #(dispatch [:keycloak-logout])
                                                      :on-edit-profile-click #(dispatch [:keycloak-account-management])}
                                :notification-type   @(subscribe [:notification-type])
                                :login-response      @(subscribe [:login-response])
                                :recent-content      @(subscribe [:recent-content])
                                :active-content      @(subscribe [:active-content])}]))
