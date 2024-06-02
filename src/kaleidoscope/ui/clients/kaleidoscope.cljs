(ns kaleidoscope.ui.clients.kaleidoscope
  (:require [ajax.core :as ajax]
            [clojure.string :as str]
            [goog.string :as gstr]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Auth
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn auth-header
  [token]
  (gstr/format "Bearer %s" token))

(defn with-authorization
  [request token]
  (if token
    (assoc-in request [:headers :Authorization] (auth-header token))
    request))

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
      str/lower-case
      (str/replace  #"[!|.|(|)|]" "")
      (str/replace  " " "-")))

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

(defn toggle-public-visibility!
  [{:keys [article-url] :as article} public-visibility]
  {:method          :put
   :uri             (gstr/format "/articles/%s" article-url)
   :params          {:public-visibility public-visibility}
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

;; Article audiences
(defn add-audience!
  [{:keys [article-id] :as article}
   {:keys [group-id] :as group}]
  {:method          :put
   :uri             "/article-audiences"
   :params          {:article-id article-id
                     :group-id   group-id}
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn delete-audience!
  [{:keys [id] :as audience}]
  {:method          :delete
   :uri             (gstr/format "/article-audiences/%s" id)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn get-audiences-for-article
  [{:keys [article-id] :as article}]
  {:method          :get
   :uri             "/article-audiences"
   :params          {:article-id article-id}
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

;; Image management
#_(defn get-image-metadata
    "For now, we get image metadata from the `processed/` endpoint, which
  returns a list of the contents of the `processed` folder. Should be
  replaced with a mechanism for indexing images outside S3."
    []
    {:method          :get
     :uri             "/media/"
     :format          (ajax/json-request-format)
     :response-format (ajax/json-response-format {:keywords? true})})

(defn get-image-metadata
  "Uses the new /v2/photos endpoint"
  []
  {:method          :get
   :uri             "/v2/photos"
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn add-photo!
  "For now, we get image metadata from the `processed/` endpoint, which
  returns a list of the contents of the `processed` folder. Should be
  replaced with a mechanism for indexing images outside S3."
  [^js files]
  (let [form-data (new js/FormData)]
    (doseq [file files]
      (js/console.log "Attaching file to upload request: " file)
      (.append form-data (.-name file) file))
    {:method          :post
     :uri             "/v2/photos"
     :body            form-data
     :response-format (ajax/json-response-format {:keywords? true})}))

(defn edit-photo!
  [{:keys [photo-id] :as payload}]
  {:method          :put
   :uri             (gstr/format "/v2/photos/%s" photo-id)
   :params          (dissoc payload :photo-id)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

;; Theme management
(defn get-themes
  []
  {:method          :get
   :uri             "/themes"
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn update-theme!
  [{:keys [config id display-name] :as theme}]
  {:method          :put
   :uri             (gstr/format "/themes/%s" id)
   :params          theme
   :headers         {:Content-Type "application/json"}
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})


;; Payment management
(defn get-domain-availability
  [domain]
  {:method          :get
   :uri             (gstr/format "/check-domain?domain=%s" domain)
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})

(defn new-payment-secret!
  [{:keys [amount currency] :as payment}]
  {:method          :post
   :uri             "/v1/payments"
   :params          payment
   :headers         {:Content-Type "application/json"}
   :format          (ajax/json-request-format)
   :response-format (ajax/json-response-format {:keywords? true})})
