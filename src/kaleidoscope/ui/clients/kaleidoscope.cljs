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

;; Portfolio
(defn get-portfolio
  ([]
   {:method          :get
    :uri             "/projects-portfolio"
    :format          (ajax/json-request-format)
    :response-format (ajax/json-response-format {:keywords? true})}))

;; Articles
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

(defn title->url
  [title]
  (-> title
      str
      clojure.string/lower-case
      (clojure.string/replace  #"[!|.|(|)|]" "")
      (clojure.string/replace  " " "-")))

(defn save-article-version!
  [{:keys [article-title branch-name article-url] :as article}]
  (let [sanitized-title (title->url article-title)]
    {:method          :post
     :uri             (gstr/format "/articles/%s/branches/%s/versions" (or article-url sanitized-title) (or branch-name "main"))
     :params          (assoc article :article-tags "thoughts")
     :headers         {:Content-Type "application/json"}
     :format          (ajax/json-request-format)
     :response-format (ajax/json-response-format {:keywords? true})}))

(defn load-article-branch
  [{:keys [branch-id] :as article-branch}]
  {:method          :get
   :uri             (gstr/format "/branches/%s/versions" branch-id)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn publish-article-branch!
  [{:keys [branch-name article-url] :as article}]
  {:method          :put
   :uri             (gstr/format "/articles/%s/branches/%s/publish" article-url branch-name)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

;; Groups
(defn delete-group-member!
  [{:keys [group-id] :as group} member-id]
  {:method          :delete
   :uri             (gstr/format "/groups/%s/members/%s" group-id member-id)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn add-group-member!
  [{:keys [group-id] :as group} member]
  {:method          :post
   :uri             (gstr/format "/groups/%s/members" group-id)
   :params          member
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn delete-group!
  [{:keys [group-id] :as group}]
  {:method          :delete
   :uri             (gstr/format "/groups/%s" group-id)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn add-group!
  [group-name]
  {:method          :post
   :uri             "/groups"
   :params          {:display-name group-name}
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn get-groups
  []
  {:method          :get
   :uri             "/groups"
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})


(defn get-admin-route
  []
  {:method          :get
   :uri             "/admin"
   ;; The response isn't in JSON when the user is not
   ;; authenticated - they just get a 401
   :response-format (ajax/json-response-format {:keywords? true})})

(defn get-image-metadata
  "For now, we get image metadata from the `processed/` endpoint, which
  returns a list of the contents of the `processed` folder. Should be
  replaced with a mechanism for indexing images outside S3."
  []
  {:method          :get
   :uri             "/media/"
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})
