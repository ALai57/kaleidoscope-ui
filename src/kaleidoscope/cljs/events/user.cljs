(ns kaleidoscope.cljs.events.user
  (:require [day8.re-frame.async-flow-fx :as async-flow-fx]
            [re-frame.core :refer [dispatch reg-event-db reg-event-fx reg-fx]]
            [taoensso.timbre :refer-macros [infof]]))


(reg-event-fx
 :update-user-profile!
 (fn [cofx [_ userinfo]]
   (infof "Updating user profile: %s" userinfo)
   {:db (assoc (:db cofx) :user-profile userinfo)
    :fx [[:dispatch [::async-flow-fx/notify :success-load-profile]]]}))

(reg-event-db
 :check-identity
 (fn [{:keys [user-profile] :as db} _]
   (infof "Identity: %s" user-profile)
   db))
