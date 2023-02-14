(ns andrewslai.cljs.views
  (:require [andrewslai.cljs.article :as article]
            [andrewslai.cljs.article-cards :as cards]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.pages.admin :refer [login-ui]]
            ;;[andrewslai.cljs.pages.article-editor :refer [editor-ui]]
            [andrewslai.cljs.utils :refer [lazy-component]]
            [clojure.string :refer [includes?]]
            [goog.string :as gstr]
            ["react" :as react]
            [reagent.core :as r]
            [re-frame.core :refer [subscribe
                                   dispatch]]
            [shadow.lazy :refer [loadable] :as lazy]
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

(def editor-ui (lazy-component (loadable andrewslai.cljs.pages.article-editor/editor-ui)))

(def panels {:home          home
             :thoughts      full-page
             :archive       full-page
             :admin         login-ui
             :editor        editor-ui
             })

(def LAZY-LOADED-PAGES
  "https://code.thheller.com/blog/shadow-cljs/2019/03/03/code-splitting-clojurescript.html"
  #{:editor})

(defn app []
  (let [active-panel @(subscribe [:active-panel])
        active-panel (if (contains? panels active-panel)
                       active-panel
                       :home)]
    (infof "Currently displayed panel %s" active-panel)
    [(get panels active-panel login-ui)
     {:user                @(subscribe [:user-profile])
      :user-event-handlers {:on-login-click        #(dispatch [:keycloak-action :login])
                            :on-admin-click        #(dispatch [:request-admin-route])
                            :on-check-auth-click   #(dispatch [:check-identity])
                            :on-logout-click       #(dispatch [:keycloak-action :logout])
                            :on-edit-profile-click #(dispatch [:keycloak-action :account-management])}
      :notification-type   @(subscribe [:notification-type])
      :login-response      @(subscribe [:login-response])
      :recent-content      @(subscribe [:recent-content])
      :branches            @(subscribe [:branches])
      :active-content      @(subscribe [:active-content])
      :editor-branch-id    @(subscribe [:editor-branch-id])
      :initial-editor-data @(subscribe [:initial-editor-data])
      :publish-fn          (fn [{:keys [article-url branch-name] :as article-branch}]
                             (infof "Publishing branch %s of article %s" branch-name article-url)
                             (dispatch [:publish-branch! article-branch]))
      :load-fn (fn [{:keys [article-id branch-id] :as article-branch}]
                 (infof "Updating editor article id to %s" article-id)
                 ;;(infof "article-branch %s" article-branch)

                 (dispatch [:load-latest-version! article-branch])
                 ;; TODO deprecate me
                 (dispatch [:update-editor-branch-id article-id]))
      :save-fn (fn [{:keys [content title article-tags branch-name] :as save-data}]
                 (dispatch [:save-article! (update save-data :content gstr/unescapeEntities)]))}
     ]))
