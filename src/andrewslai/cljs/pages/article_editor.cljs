(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            [taoensso.timbre :refer-macros [infof]]
            ))

(defn editor-ui
  [{:keys [user save-fn load-fn initial-editor-data branches] :as args}]
  (let [{:keys [branch-id] :as article-branch} initial-editor-data]
    (infof "Loading Editor: %s" (select-keys article-branch [:branch-id :title]))

    ;; NOTE: Key is used here to trigger a reload when :branches changes
    [:div {:key (str branch-id (count branches))}
     [se/editor (assoc args
                       :initial-branch initial-editor-data
                       :user           {:firstName "Andrew"
                                        :lastName  "Lai"})]]))
