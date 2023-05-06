(ns kaleidoscope.cljs.core-api.user
  (:require [goog.string :as gstr]))

(defn get-username
  [user]
  (gstr/format "%s %s" (get user :firstName "Not") (get user :lastName "Logged in")))
