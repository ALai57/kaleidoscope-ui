(ns kaleidoscope.ui.pages.image-manager
  (:require [kaleidoscope.ui.components.image-browser :as ib]
            [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof info]]
            ))

(defn -image-manager-page [{:keys [images albums user notification-type]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:div {:margin "10px"}
    [ib/image-browser {:images images}]]])

(defn image-manager-page
  [{:keys [images user notification-type]}]
  [-image-manager-page {:user              user
                        :notification-type notification-type}])
