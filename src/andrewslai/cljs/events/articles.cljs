(ns andrewslai.cljs.events.articles
  (:require [ajax.core :as ajax]
            [andrewslai.cljc.specs.articles]
            [cljs.spec.alpha :as s]
            [day8.re-frame.http-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx]]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf]]))

(defn load-article [db [_ response]]
  (info "Loading article:" (dissoc response :content))
  (assoc db
         :loading? false
         :active-content response))
(reg-event-db :load-article load-article)

(defn load-article-failure [db [_ response]]
  (info "Failed loading article:" response)
  (assoc db
         :loading? false
         :active-content response))

(defn make-article-url [article-name]
  (str "/compositions/" (name article-name)))

(reg-event-fx
 :request-article
 (fn [{:keys [db]} [_ article-name]]
   {:http-xhrio {:method          :get
                 :uri             (make-article-url article-name)
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:load-article]
                 :on-failure      [:load-article-failure]}
    :db         (assoc db :loading? true)}))

(defn load-recent-articles [db [_ response]]
  (infof "Retrieved recent articles: found %s" (count response))
  (let [valid-articles (filter (partial s/valid? :andrewslai.article/article)
                               response)]
    (infof "Removed %s/%s articles (because they were invalid)"
           (- (count response) (count valid-articles))
           (count response))
    (debugf "Articles %s" valid-articles)
    (assoc db
           :loading? false
           :recent-content (filter (partial s/valid? :andrewslai.article/article)
                                   response))))
(reg-event-db :load-recent-articles load-recent-articles)

(reg-event-fx
 :request-recent-articles
 (fn [{:keys [db]} [_]]
   {:http-xhrio {:method          :get
                 :uri             "/compositions"
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:load-recent-articles]
                 :on-failure      [:load-recent-articles]}
    :db         (assoc db :loading? true)}))
