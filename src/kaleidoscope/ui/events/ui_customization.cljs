(ns kaleidoscope.ui.events.ui-customization
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof errorf]]))

(reg-event-db :get-themes.success
  (fn [db [_ response]]
    (infof "Loaded %s themes" (count response))
    (let [first-theme (first response)]
      (infof "Using first theme: %s" first-theme)
      (assoc db :theme (:config first-theme)))))

(reg-event-db :get-themes.failure
  (fn [db [_ response]]
    (errorf "Could not load themes")
    db))

(reg-event-fx :load-themes
  (fn [{:keys [db]} [_]]
    {:http-xhrio (merge (scope-client/get-themes)
                        {:on-success      [:get-themes.success]
                         :on-failure      [:get-themes.failure]})}))

(reg-event-db :set-local-theme
  (fn [db [_ new-theme]]
    ;;(infof "Reset local theme")
    (assoc db :theme new-theme)))


(reg-event-db :add-theme.success
  (fn [db [_ response]]
    (assoc db :theme-response {:status 200
                               :body   response})))

(reg-event-db :add-theme.failure
  (fn [db [_ response]]
    (assoc db :theme-response {:status nil
                               :body   response})))

(reg-event-fx :save-theme!
  (fn [{:keys [db]} [_ clj-theme]]
    (infof "Persisting theme: " clj-theme)
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/update-theme! {:config       clj-theme
                                                           :id           "00000000-0000-0000-0000-000000000000"
                                                           :display-name "My test theme"})
                              (scope-client/with-authorization token))
                          {:on-success      [:add-theme.success]
                           :on-failure      [:add-theme.failure]})
       :db         (assoc db :theme-response nil)})))
