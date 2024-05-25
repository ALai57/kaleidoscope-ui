(ns kaleidoscope.ui.views
  (:require ["@mui/material" :as mui]
            ["@mui/material/styles" :refer [createTheme responsiveFontSizes]]
            [kaleidoscope.ui.components.loading-screen :as loading]
            [kaleidoscope.ui.pages.about-this-site :as page.about-this-site]
            [kaleidoscope.ui.pages.admin           :as page.admin]
            [kaleidoscope.ui.pages.article-manager :as page.article-manager]
            [kaleidoscope.ui.pages.article-page    :as page.article]
            [kaleidoscope.ui.pages.groups          :as page.groups]
            [kaleidoscope.ui.pages.home            :as page.home]
            [kaleidoscope.ui.pages.image-manager   :as page.image-manager]
            [kaleidoscope.ui.pages.manager         :as page.manager]
            [kaleidoscope.ui.pages.ui-manager      :as page.ui-manager]
            [kaleidoscope.ui.theme :as theme]
            [kaleidoscope.ui.utils.core :as u]
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


;;"https://code.thheller.com/blog/shadow-cljs/2019/03/03/code-splitting-clojurescript.html"
#_:clj-kondo/ignore
(def panels {:home            page.home/home
             :content         page.article/article-page
             :archive         page.article/archive-page
             :admin           page.admin/login-ui
             :about-this-site page.about-this-site/about-this-site
             :groups          page.groups/group-page
             :manager         page.manager/manager-page
             :article-manager page.article-manager/article-manager-page
             :image-manager   page.image-manager/image-manager-page
             :ui-manager      page.ui-manager/ui-manager-page
             :editor          (u/lazy-component (lazy/loadable kaleidoscope.ui.pages.article-editor/editor-ui))})

#_:clj-kondo/ignore
(defn app []
  (let [active-panel @(subscribe [:active-panel])
        theme        @(subscribe [:theme])]
    (infof "Currently displayed panel %s" active-panel)
    [:> mui/ThemeProvider
     {:theme (responsiveFontSizes (createTheme (theme/make-theme theme)))}
     [:div {:style {:min-height "100vh"}}
      [(get panels active-panel page.home/home)
       {;; General settings
        :notification-type @(subscribe [:notification-type])
        :login-response    @(subscribe [:login-response]) ;; The last response from a login endpoint

        ;; User data
        :user @(subscribe [:user-profile])

        ;; User actions
        :user-event-handlers  user-event-handlers
        :theme                theme
        :theme-event-handlers {:on-change (fn [new-color-coordinates]
                                            (dispatch [:set-local-theme new-color-coordinates]))}

        ;; Fallback if loading
        :fallback (fn []
                    [loading/loading-screen])
        }

       ]]]))
