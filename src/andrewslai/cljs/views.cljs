(ns andrewslai.cljs.views
  (:require [andrewslai.cljs.pages.admin        :as page.admin]
            [andrewslai.cljs.pages.article-page :as page.article]
            [andrewslai.cljs.pages.home         :as page.home]
            [andrewslai.cljs.utils :refer [lazy-component]]
            [goog.string :as gstr]
            ["react" :as react]
            [re-frame.core :refer [subscribe dispatch]]
            [shadow.lazy :refer [loadable] :as lazy]
            [taoensso.timbre :refer-macros [infof]]))

;;"https://code.thheller.com/blog/shadow-cljs/2019/03/03/code-splitting-clojurescript.html"
(def panels {:home          page.home/home
             :thoughts      page.article/article-page
             :archive       page.article/article-page
             :admin         page.admin/login-ui
             :editor        (lazy-component (loadable andrewslai.cljs.pages.article-editor/editor-ui))})

(defn app []
  (let [active-panel @(subscribe [:active-panel])
        active-panel (if (contains? panels active-panel)
                       active-panel
                       :home)]
    (infof "Currently displayed panel %s" active-panel)
    [(get panels active-panel page.admin/login-ui)
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
