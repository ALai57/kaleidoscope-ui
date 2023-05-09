(ns kaleidoscope.ui.events.article-reader
  (:require [day8.re-frame.http-fx]
            [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [re-frame.core :refer [reg-event-db reg-event-fx]]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf errorf]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Loading single article
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :load-article.success
  (fn load-article [db [_ response]]
    (info "Loading article:" (dissoc response :content))
    (assoc db :active-content response)))

(reg-event-db :load-article-failure
  (fn load-article-failure [db [_ response]]
    (info "Failed loading article:" response)
    (assoc db :active-content response)))

(reg-event-fx :load-article
  (fn [{:keys [db]} [_ article-name]]
    {:http-xhrio (merge (scope-client/get-articles article-name)
                        {:on-success      [:load-article.success]
                         :on-failure      [:load-article.failure]})}))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Loading all articles
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(reg-event-db :load-recent-articles.success
  (fn load-recent-articles [db [_ response]]
    (infof "Retrieved recent articles: found %s" (count response))
    (debugf "Articles %s" response)
    (assoc db :recent-content response)))

(reg-event-fx :load-recent-articles
  (fn [{:keys [db]} [_]]
    {:http-xhrio (merge (scope-client/get-articles)
                        {:on-success [:load-recent-articles.success]
                         :on-failure [:load-recent-articles.success]})}))
