(ns kaleidoscope.ui.events.article-editor
  (:require [ajax.core :as ajax]
            [kaleidoscope.ui.components.modals.editor :refer [create-article-failure-modal
                                                              create-article-success-modal]]
            [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [goog.string :as gstr]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf debugf]]))

(reg-event-db :update-editor-branch-id
  (fn [db [_ new-id]]
    (let [new-db (assoc db :editor-branch-id new-id)]
      (infof "Update Editor Branch ID: %s" new-id)
      new-db)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Loading all branches
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :load-all-branches.success
  (fn load-all-branches-success
    [db [_ response]]
    (infof "Retrieved all branches: found %s" (count response))
    (debugf "Branches %s" response)
    (assoc db :branches response)))

(reg-event-db :load-all-branches.failure
  (fn load-all-branches-failure
    [db [_ response]]
    (errorf "Failed to retrieve branches %s" response)
    db))

(reg-event-fx :load-all-branches
  (fn [{:keys [db]} [_]]
    (infof "Requesting all branches")
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/get-branches)
                              (scope-client/with-authorization token))
                          {:on-success [:load-all-branches.success]
                           :on-failure [:load-all-branches.failure]})})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Load an article into the editor
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :load-latest-version.success
  (fn [db [_ response]]
    (infof "Loading latest version success!: %s" response)
    (assoc db :initial-editor-data (first response))))

(reg-event-db :load-latest-version.failure
  (fn [db [_ response]]
    (errorf "Loading latest version failure!: %s" response)
    db))

(reg-event-fx :load-latest-version!
  (fn [{:keys [db]} [_ {:keys [article-url branch-id branch-name] :as article-branch}]]
    (infof "Article branch %s" article-branch)
    (infof "Loading latest version of branch id %s: %s" branch-id branch-name)
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/load-article-branch article-branch)
                              (scope-client/with-authorization token))
                          {:on-success [:load-latest-version.success]
                           :on-failure [:load-latest-version.failure]})})))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Save an article version
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :save-article.success
  (fn [db [_ response]]
    (infof "Success saving article response: %s" response)
    (dispatch [:show-modal (create-article-success-modal response)])
    (dispatch [:load-all-branches])
    db))

(reg-event-db :save-article.failure
  (fn [db [_ response]]
    (infof "Save Article response: %s" response)
    (dispatch [:show-modal (create-article-failure-modal response)])
    db))

(reg-event-fx :save-article!
  (fn [{:keys [db]} [_ {:keys [article-title branch-name article-url] :as article}]]
    (let [token (or (.-token (:keycloak db)) "test")]
      (infof "Saving article: %s" article)
      {:http-xhrio (merge (-> (scope-client/save-article-version! article)
                              (scope-client/with-authorization token))
                          {:on-success [:save-article.success]
                           :on-failure [:save-article.failure]})})))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Publish a branch
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :publish-branch.success
  (fn [db [_ response]]
    (infof "Success publishing article response: %s" response)
    (dispatch [:load-all-branches])
    (dispatch [:load-recent-articles])
    (dispatch [:set-hash-fragment "/article-manager"])
    db))

(reg-event-db :publish-branch.failure
  (fn [db [_ response]]
    (infof "Publish article failure response: %s" response)
    db))

(reg-event-fx :publish-branch!
  (fn [{:keys [db]} [_ {:keys [branch-name article-url] :as article}]]
    (infof "Publishing article: %s" article)
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/save-article-version! article)
                              (scope-client/with-authorization token))
                          {:on-success [:publish-branch.success]
                           :on-failure [:publish-branch.failure]})})))
