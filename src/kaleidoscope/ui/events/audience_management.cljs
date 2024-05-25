(ns kaleidoscope.ui.events.audience-management
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [reg-event-db reg-event-fx]]
            [taoensso.timbre :refer-macros [infof errorf]]))

(reg-event-db :add-audience.success
  (fn [db [_ response]]
    (assoc db :audience-response {:status 200
                                  :body   response})))

(reg-event-db :add-audience.failure
  (fn [db [_ response]]
    (assoc db :audience-response {:status nil
                                  :body   response})))

(reg-event-fx :add-audience
  (fn [{:keys [db]} [_ article group]]
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/add-audience! article group)
                              (scope-client/with-authorization token))
                          {:on-success      [:add-audience.success]
                           :on-failure      [:add-audience.failure]})
       :db         (assoc db :audience-response nil)})))


(reg-event-db :delete-audience.success
  (fn [db [_ response]]
    (assoc db :audience-response {:status 200
                                  :body   response})))

(reg-event-db :delete-audience.failure
  (fn [db [_ response]]
    (assoc db :audience-response {:status nil
                                  :body   response})))

(reg-event-fx :delete-audience
  (fn [{:keys [db]} [_ audience]]
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/delete-audience! audience)
                              (scope-client/with-authorization token))
                          {:on-success      [:delete-audience.success]
                           :on-failure      [:delete-audience.failure]})
       :db         (assoc db :audience-response nil)})))



;; For the audience editor modal
(reg-event-db :get-audiences-for-article.success
  (fn [db [_ response]]
    (infof "Success retrieving article audiences")
    (assoc db :audience-editor-modal-initial-values {:status   200
                                                     :response response})))

(reg-event-db :get-audiences-for-article.failure
  (fn [db [_ response]]
    (errorf "Failure retrieving article audiences")
    (assoc db :audience-editor-modal-initial-values {:status nil
                                                     :body   response})))

(reg-event-fx :get-audiences-for-article
  (fn [{:keys [db]} [_ article-branch]]
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/get-audiences-for-article article-branch)
                              (scope-client/with-authorization token))
                          {:on-success      [:get-audiences-for-article.success]
                           :on-failure      [:get-audiences-for-article.failure]})
       :db         (assoc db :audience-editor-modal-initial-values nil)})))
