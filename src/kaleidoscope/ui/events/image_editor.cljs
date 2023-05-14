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

#_(defn raw-metadata->gallery-object
    [{:keys [key last-modified title alt path] :as image-metadata}]
    {:name       key
     :created_at last-modified
     :creator    "Andrew Lai"
     :title      title
     :alt        alt
     :versions   {:thumbnail {:src path}
                  :raw       {:src path}}}
    )

(defn grouped-metadata->gallery-object
  [[{:keys [hostname photo-id photo-title alt] :as group} images]]
  (let [first-image (first images)]
    {:name       photo-id
     :created_at (:created-at first-image)
     :creator    "Andrew Lai"
     :title      photo-title
     :alt        alt
     :versions   (reduce (fn [acc {:keys [image-category path] :as image}]
                           (assoc acc (keyword image-category) {:src path}))
                         {}
                         images)}))

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

(comment
  ;; Data from /v2/photos endpoint
  [{:path             "/v2/photos/4a3db5ec-358c-4e36-9f19-3e0193001ff4/1d675bdc-e6ec-4522-8920-4950d33d4eee-500.jpg",
    :storage-driver   "s3",
    :image-category   "thumbnail",
    :hostname         "andrewslai.localhost",
    :modified-at      "2022-02-01T00:00:00Z",
    :filename         "1d675bdc-e6ec-4522-8920-4950d33d4eee-500.jpg",
    :id               "4a3db5ec-358c-4e36-9f19-3e0193001ff4",
    :photo-title      "My first photo",
    :storage-root     "wedding",
    :photo-version-id "4a3db5ec-358c-4e36-9f19-111111111111",
    :created-at       "2022-02-01T00:00:00Z",
    :photo-id         "4a3db5ec-358c-4e36-9f19-3e0193001ff4"}
   {:path "/v2/photos/4a3db5ec-358c-4e36-9f19-3e0193001ff4/20210422_134816 (2)-500.jpg", :storage-driver "s3", :image-category "thumbnail", :hostname "andrewslai.localhost", :modified-at "2022-02-01T00:00:00Z", :filename "20210422_134816 (2)-500.jpg", :id "4a3db5ec-358c-4e36-9f19-3e0193001ff4", :photo-title "My first photo", :storage-root "wedding", :photo-version-id "4a3db5ec-358c-4e36-9f19-222222222222", :created-at "2022-02-01T00:00:00Z", :photo-id "4a3db5ec-358c-4e36-9f19-3e0193001ff4"}
   {:path "/v2/photos/4a3db5ec-358c-4e36-9f19-3e0193001ff4/20210422_134824 (2)-500.jpg", :storage-driver "s3", :image-category "thumbnail", :hostname "andrewslai.localhost", :modified-at "2022-02-01T00:00:00Z", :filename "20210422_134824 (2)-500.jpg", :id "4a3db5ec-358c-4e36-9f19-3e0193001ff4", :photo-title "My first photo", :storage-root "wedding", :photo-version-id "4a3db5ec-358c-4e36-9f19-333333333333", :created-at "2022-02-01T00:00:00Z", :photo-id "4a3db5ec-358c-4e36-9f19-3e0193001ff4"}
   {:path "/v2/photos/f3c84f81-4c9f-42c0-9e68-c4aeedf7cae4/null", :storage-driver nil, :image-category nil, :hostname "andrewslai.localhost", :modified-at "2022-02-01T00:00:00Z", :filename nil, :id "f3c84f81-4c9f-42c0-9e68-c4aeedf7cae4", :photo-title "My second photo", :storage-root nil, :photo-version-id nil, :created-at "2022-02-01T00:00:00Z", :photo-id nil}
   {:path "/v2/photos/bb854ba0-974c-46dc-b403-cbfd0f36e88f/null", :storage-driver nil, :image-category nil, :hostname "andrewslai.localhost", :modified-at "2022-02-01T00:00:00Z", :filename nil, :id "bb854ba0-974c-46dc-b403-cbfd0f36e88f", :photo-title "My third photo", :storage-root nil, :photo-version-id nil, :created-at "2022-02-01T00:00:00Z", :photo-id nil}
   {:path "/v2/photos/de7d355c-3165-48d7-bfd5-e59a765fb8c2/raw.png", :storage-driver "local-filesystem", :image-category "raw", :hostname "andrewslai.localhost", :modified-at "2023-05-14T04:45:37Z", :filename "raw.png", :id "de7d355c-3165-48d7-bfd5-e59a765fb8c2", :photo-title nil, :storage-root "/home/andrew/dev/kaleidoscope-ui/resources/public", :photo-version-id "4689ae65-8f13-4903-b2b8-919608d7267a", :created-at "2023-05-14T04:45:37Z", :photo-id "de7d355c-3165-48d7-bfd5-e59a765fb8c2"}]
  )

(reg-event-db :load-image-metadata.success
  (fn load-image-metadata-success
    [db [_ response]]
    (infof "Retrieved all image metadata: found %s" (count response))
    (debugf "Image metadata %s" response)
    (let [xformed-data (->> response
                            (filter (fn [{:keys [path image-category]}]
                                      (and path image-category)))
                            (group-by (fn [photo]
                                        (select-keys photo [:hostname :photo-id :photo-title])))
                            (map grouped-metadata->gallery-object))]
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

(reg-event-db :add-photo.success
  (fn add-photo-success
    [db [_ response]]
    (infof "Added photos! %s" response)
    db))

(reg-event-db :add-photo.failure
  (fn add-photo-failure
    [db [_ response]]
    (infof "Failed adding photos! %s" response)))

(reg-event-fx :add-photo!
  (fn [{:keys [db]} [_ files]]
    (infof "Adding Photos" files)
    (let [token (or (.-token (:keycloak db)) "test")]
      {:http-xhrio (merge (-> (scope-client/add-photo! files)
                              (scope-client/with-authorization token))
                          {:on-success [:add-photo.success]
                           :on-failure [:add-photo.failure]})})))
