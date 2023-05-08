(ns kaleidoscope.ui.views
  (:require [kaleidoscope.ui.pages.admin           :as page.admin]
            [kaleidoscope.ui.pages.article-page    :as page.article]
            [kaleidoscope.ui.pages.home            :as page.home]
            [kaleidoscope.ui.pages.groups          :as page.groups]
            [kaleidoscope.ui.pages.manager         :as page.manager]
            [kaleidoscope.ui.pages.article-manager :as page.article-manager]
            [kaleidoscope.ui.components.loading-screen :as loading]
            [kaleidoscope.ui.utils.core :as u]
            [goog.string :as gstr]
            ["react" :as react]
            [re-frame.core :refer [subscribe dispatch]]
            [shadow.lazy :as lazy]
            [taoensso.timbre :refer-macros [infof]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; User events
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn login!
  []
  (dispatch [:keycloak-action :login]))

(defn check-admin-status!
  []
  (dispatch [:request-admin-route]))

(defn print-current-user!
  []
  (dispatch [:check-identity]))

(defn logout!
  []
  (dispatch [:keycloak-action :logout]))

(defn account-management!
  []
  (dispatch [:keycloak-action :account-management]))

(def user-event-handlers
  {:on-login-click        login!
   :on-admin-click        check-admin-status!
   :on-check-auth-click   print-current-user!
   :on-logout-click       logout!
   :on-edit-profile-click account-management!})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Editor events
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn publish-article!
  [{:keys [article-url branch-name] :as article-branch}]
  (infof "Publishing branch %s of article %s" branch-name article-url)
  (dispatch [:publish-branch! article-branch]))

(defn load-latest-version!
  [{:keys [article-id branch-id] :as article-branch}]
  (infof "Updating editor article id to %s" article-id)
  ;;(infof "article-branch %s" article-branch)

  (dispatch [:load-latest-version! article-branch])
  (dispatch [:update-editor-branch-id article-id]))

(defn save-version!
  [{:keys [content title article-tags branch-name] :as save-data}]
  (dispatch [:save-article! (update save-data :content gstr/unescapeEntities)]))


;;"https://code.thheller.com/blog/shadow-cljs/2019/03/03/code-splitting-clojurescript.html"
(def panels {:home            page.home/home
             :thoughts        page.article/article-page
             :archive         page.article/article-page
             :admin           page.admin/login-ui
             :groups          page.groups/group-page
             :manager         page.manager/manager-page
             :article-manager page.article-manager/article-manager-page
             :editor          (u/lazy-component (lazy/loadable kaleidoscope.ui.pages.article-editor/editor-ui))})

(defn app []
  (let [active-panel @(subscribe [:active-panel])]
    (infof "Currently displayed panel %s" active-panel)
    [:div {:style {:min-height "100vh"}}
     [(get panels active-panel page.home/home)
      {;; General settings
       :notification-type @(subscribe [:notification-type])
       :login-response    @(subscribe [:login-response]) ;; The last response from a login endpoint

       ;; User data
       :user @(subscribe [:user-profile])

       ;; User actions
       :user-event-handlers user-event-handlers

       ;; Fallback if loading
       :fallback (fn []
                   [loading/loading-screen])
       }

      ]]))
