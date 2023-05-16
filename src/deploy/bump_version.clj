(ns deploy.bump-version
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as string]))

(def VERSION-PATH
  [:builds :app :closure-defines 'kaleidoscope.ui.version/VERSION])

(defn get-release
  [shadow-edn]
  (let [release-string      (get-in shadow-edn VERSION-PATH)
        [major minor patch] (map parse-long (string/split release-string #"\."))]
    {:major major
     :minor minor
     :patch patch}))

(defn release-map->release-string
  [{:keys [major minor patch] :as release-map}]
  (string/join "." [major minor patch]))

(def VERSION-REGEX
  "For the shadow-cljs.edn file"
  #"(?<versionKey>kaleidoscope\.ui\.version/VERSION\s*)\"(?<version>.*)\"")

(def VERSION-REGEX-PACKAGE-JSON
  "For the package.json file"
  #"(?<versionKey>\"version\": )\"(?<version>.*)\",")

(defn increment
  [increment-type]
  (println (format "Bumping %s version" increment-type))
  (let [shadow-raw  (slurp (io/file "shadow-cljs.edn"))
        shadow-edn  (edn/read-string shadow-raw)
        old-release (get-in shadow-edn VERSION-PATH)
        release-map (get-release shadow-edn)
        new-release (-> release-map
                        (update (keyword increment-type) inc)
                        release-map->release-string)
        new-shadow  (.replaceAll (re-matcher VERSION-REGEX shadow-raw) (format "${versionKey}\"%s\"" new-release))

        pkg-raw (slurp (io/file "package.json"))
        new-pkg (.replaceAll (re-matcher VERSION-REGEX-PACKAGE-JSON pkg-raw) (format "${versionKey}\"%s\"," new-release))
        ]
    (println (format "Bumped version %s -> %s" old-release new-release))
    (spit "shadow-cljs.edn" new-shadow)
    (spit "package.json" new-pkg)))

(comment
  (def shadow-raw
    (-> "/home/andrew/dev/kaleidoscope-ui/shadow-cljs.edn"
        io/file
        slurp))

  (let [matcher (re-matcher VERSION-REGEX shadow-raw)]
    (re-find matcher)
    {:version    (.group matcher "version")
     :versionKey (.group matcher "versionKey")})

  (def pkg-raw
    (-> "/home/andrew/dev/kaleidoscope-ui/package.json"
        io/file
        slurp))

  (let [matcher (re-matcher VERSION-REGEX-PACKAGE-JSON pkg-raw)]
    (re-find matcher)
    {:version    (.group matcher "version")
     :versionKey (.group matcher "versionKey")})

  (.replaceAll (re-matcher VERSION-REGEX-PACKAGE-JSON pkg-raw)
               (format "${versionKey}\"%s\"," "0.0.0.0.0"))

  )

(comment
  (def shadow-edn
    (-> "/home/andrew/dev/kaleidoscope-ui/shadow-cljs.edn"
        io/file
        slurp
        edn/read-string))

  (get-release shadow-edn)
  ;; => {:major 0, :minor 0, :patch 1}

  (update (get-release shadow-edn) :major inc)
  ;; => {:major 1, :minor 0, :patch 1}

  (release-map->release-string {:major 1, :minor 0, :patch 1})

  )
