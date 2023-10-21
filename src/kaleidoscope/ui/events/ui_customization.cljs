(ns kaleidoscope.ui.events.ui-customization
  (:require [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof errorf]]))

(reg-event-db :get-themes.success
  (fn [db [_ response]]
    (infof "Loaded %s themes" (count response))
    (assoc db :themes response)))

(reg-event-db :get-themes.failure
  (fn [db [_ response]]
    (errorf "Could not load themes")
    db))

(reg-event-fx :load-themes
  (fn [{:keys [db]} [_]]
    {:http-xhrio (merge (scope-client/get-themes)
                        {:on-success      [:get-themes.success]
                         :on-failure      [:get-themes.failure]})}))
