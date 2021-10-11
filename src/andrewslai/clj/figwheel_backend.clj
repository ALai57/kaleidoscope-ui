(ns andrewslai.clj.figwheel-backend
  (:require [andrewslai.clj.http-api.andrewslai :as andrewslai]
            [andrewslai.clj.auth.core :as auth]
            [andrewslai.clj.persistence.postgres2 :as pg]
            [taoensso.timbre :as log]))

(def figwheel-app
  (andrewslai/andrewslai-app {:auth     (auth/always-authenticated-backend {:realm_access {:roles ["wedding"]}})
                              :database (pg/->Database {:dbname   "andrewslai_db"
                                                        :db-port  "5432"
                                                        :host     "localhost"
                                                        :user     "andrewslai"
                                                        :password "andrewslai"
                                                        :dbtype   "postgresql"})
                              :logging  (merge log/*config* {:level :debug})}))


(comment
  (require '[figwheel.main :as fig])
  (apply fig/-main "-m" "figwheel.main" "-pc" "-b" "dev" "-r")
  )
