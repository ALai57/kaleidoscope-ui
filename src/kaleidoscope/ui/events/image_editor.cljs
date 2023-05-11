(ns kaleidoscope.ui.events.image-editor
  (:require [ajax.core :as ajax]
            [kaleidoscope.ui.clients.kaleidoscope :as scope-client]
            [goog.string :as gstr]
            [re-frame.core :refer [reg-event-db
                                   reg-event-fx
                                   dispatch]]
            [taoensso.timbre :refer-macros [infof errorf debugf]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Loading Image Metadata
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(comment
  ;; Example response from /media/
  {:path "public/css/",
   :key "public/css/",
   :storage-class "STANDARD",
   :name "",
   :type :directory,
   :etag "d41d8cd98f00b204e9800998ecf8427e",
   :last-modified #clj-time/date-time "2021-05-27T18:30:39.000Z",
   :size 0,
   :bucket-name "andrewslai-wedding"}
  {:path "public/css/wedding.css",
   :key "public/css/wedding.css",
   :storage-class "STANDARD",
   :name "wedding.css",
   :type :file,
   :etag "71bd22a749b50d4a5b90a8f538b72a60",
   :last-modified #clj-time/date-time "2021-05-27T18:33:10.000Z",
   :size 1121,
   :bucket-name "andrewslai-wedding"})

(defn raw-metadata->gallery-object
  [{:keys [key last-modified title alt path] :as image-metadata}]
  {:name       key
   :created_at last-modified
   :creator    "Andrew Lai"
   :title      title
   :alt        alt
   :versions   {:thumbnail {:src path}
                :raw       {:src path}}}
  )

(defn file?
  [{:keys [type] :as image-metadata}]
  (= "file" type))

(comment
  ;; Raw metadata
  [{:path "media/",                               :key "media/", :storage-class "STANDARD", :name "", :type "directory", :etag "d41d8cd98f00b204e9800998ecf8427e", :last-modified "2023-02-05T22:57:46.000Z", :size 0, :bucket-name "andrewslai"}
   {:path "media/2023-02-12-blue-jeans-frog.jpg", :key "media/2023-02-12-blue-jeans-frog.jpg", :storage-class "STANDARD", :name "2023-02-12-blue-jeans-frog.jpg", :type "file", :etag "947ef8f403b46c99a3adb736f4e0be9b", :last-modified "2023-02-13T04:42:41.000Z", :size 65976, :bucket-name "andrewslai"}
   {:path "media/2023-02-12-cacao-plant.jpg",     :key "media/2023-02-12-cacao-plant.jpg", :storage-class "STANDARD", :name "2023-02-12-cacao-plant.jpg", :type "file", :etag "a246132f7e90e32f2ec56347a0634fc7", :last-modified "2023-02-13T04:42:42.000Z", :size 282887, :bucket-name "andrewslai"}
   {:path "media/2023-02-12-coati.jpg",           :key "media/2023-02-12-coati.jpg", :storage-class "STANDARD", :name "2023-02-12-coati.jpg", :type "file", :etag "c91763dd9780116abc97d147be6e74b5", :last-modified "2023-02-13T04:42:42.000Z", :size 258322, :bucket-name "andrewslai"}]

  ;; Translated
  [{:name "media/2023-02-12-blue-jeans-frog.jpg",      :created_at "2023-02-13T04:42:41.000Z", :creator "Andrew Lai", :title nil, :alt nil, :versions {:thumbnail {:src "media/2023-02-12-blue-jeans-frog.jpg"}, :raw {:src "media/2023-02-12-blue-jeans-frog.jpg"}}}
   {:name "media/2023-02-12-cacao-plant.jpg",          :created_at "2023-02-13T04:42:42.000Z", :creator "Andrew Lai", :title nil, :alt nil, :versions {:thumbnail {:src "media/2023-02-12-cacao-plant.jpg"}, :raw {:src "media/2023-02-12-cacao-plant.jpg"}}}
   {:name "media/2023-02-12-coati.jpg",                :created_at "2023-02-13T04:42:42.000Z", :creator "Andrew Lai", :title nil, :alt nil, :versions {:thumbnail {:src "media/2023-02-12-coati.jpg"}, :raw {:src "media/2023-02-12-coati.jpg"}}}
   {:name "media/2023-02-12-costa-rican-backyard.jpg", :created_at "2023-02-13T04:42:43.000Z", :creator "Andrew Lai", :title nil, :alt nil, :versions {:thumbnail {:src "media/2023-02-12-costa-rican-backyard.jpg"}, :raw {:src "media/2023-02-12-costa-rican-backyard.jpg"}}}
   {:name "media/2023-02-12-elegant-euphonia.jpg",     :created_at "2023-02-13T04:42:43.000Z", :creator "Andrew Lai", :title nil, :alt nil, :versions {:thumbnail {:src "media/2023-02-12-elegant-euphonia.jpg"}, :raw {:src "media/2023-02-12-elegant-euphonia.jpg"}}}]
  )

(reg-event-db :load-image-metadata.success
  (fn load-image-metadata-success
    [db [_ response]]
    (infof "Retrieved all image metadata: found %s" (count response))
    (debugf "Image metadata %s" response)
    (let [xformed-data (->> response
                            (filter file?)
                            (map raw-metadata->gallery-object))]
      (infof "Transformed image metadata %s" xformed-data)
      (assoc db :images-metadata xformed-data))))

(reg-event-db :load-image-metadata.failure
  (fn load-image-metadata-failure
    [db [_ response]]
    (errorf "Failed to retrieve image metadata %s" response)
    db))

(reg-event-fx :load-image-metadata
  (fn [{:keys [db]} [_]]
    (infof "Requesting all branches")
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/get-image-metadata)
                              (scope-client/with-authorization token))
                          {:on-success [:load-image-metadata.success]
                           :on-failure [:load-image-metadata.failure]})})))
