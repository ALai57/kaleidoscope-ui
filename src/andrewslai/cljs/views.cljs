(ns andrewslai.cljs.views
  (:require [andrewslai.cljs.article :as article]
            [andrewslai.cljs.article-cards :as cards]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.pages.admin :refer [login-ui]]
            [andrewslai.cljs.components.slate-editor :refer [editor]]
            [clojure.string :refer [includes?]]
            [re-frame.core :refer [subscribe
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Landing pages
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn home [{:keys [user recent-content notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [cards/recent-content-cards {:recent-content recent-content}]])

(defn full-page [{:keys [user active-content recent-content notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
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

(defn about [{:keys [user notification-type]}]
  [:div {:onClick reset-portfolio-cards
         :style   {:height   "100%"
                   :width    "100%"
                   :position "absolute"}}
   [nav/nav-bar {:user user
                 :notification-type notification-type}]
   [:div {:style {:height "100%"}}]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Test pages
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def panels {:home          home
             :thoughts      full-page
             :archive       full-page
             :about         full-page
             :research      full-page
             :data-analysis full-page
             :admin         login-ui
             :editor        editor
             })

(defn app []
  (let [active-panel @(subscribe [:active-panel])
        active-panel (if (contains? panels active-panel)
                       active-panel
                       :home)]
    (infof "Currently displayed panel %s" active-panel)
    [(get panels active-panel login-ui)
     {:user                @(subscribe [:user])
      :user-event-handlers {:on-login-click        #(dispatch [:keycloak-login])
                            :on-admin-click        #(dispatch [:request-admin-route])
                            :on-check-auth-click   #(dispatch [:check-identity])
                            :on-logout-click       #(dispatch [:keycloak-logout])
                            :on-edit-profile-click #(dispatch [:keycloak-account-management])}
      :notification-type   @(subscribe [:notification-type])
      :login-response      @(subscribe [:login-response])
      :recent-content      @(subscribe [:recent-content])
      :active-content      @(subscribe [:active-content])
      :save-fn             (fn [{:keys [content title article-tags]}]
                             (js/console.log "CLICKED SAVE" content)
                             (dispatch [:save-article! {:article-tags article-tags
                                                        :content      content
                                                        :title        title}]))}
     ]))
