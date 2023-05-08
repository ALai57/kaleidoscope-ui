(ns kaleidoscope.ui.clients.kaleidoscope
  (:require [ajax.core :as ajax]
            [goog.string :as gstr]
            [taoensso.timbre :as timbre :refer-macros [info infof debugf errorf]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Auth
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn auth-header
  [token]
  (gstr/format "Bearer %s" token))

(defn with-authorization
  [request token]
  (assoc-in request [:headers :Authorization] (auth-header token)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; HTTP API
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn get-articles
  ([]
   {:method          :get
    :uri             "/compositions"
    :format          (ajax/json-request-format)
    :response-format (ajax/json-response-format {:keywords? true})})
  ([article-name]
   {:method          :get
    :uri             (gstr/format "/compositions/%s" article-name)
    :format          (ajax/json-request-format)
    :response-format (ajax/json-response-format {:keywords? true})}))

(defn get-branches
  ([]
   {:method          :get
    :uri             "/branches"
    :format          (ajax/json-request-format)
    :response-format (ajax/json-response-format {:keywords? true})}))
