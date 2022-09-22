(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            ))

(defn editor-ui
  [{:keys [user notification-type save-fn]}]
  [:div
   #_[nav/nav-bar {:user              user
                   :notification-type notification-type}]
   [se/editor {:save-fn save-fn}]])
