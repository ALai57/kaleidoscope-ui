(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            [taoensso.timbre :refer-macros [infof]]
            ))

(defn editor-ui
  [{:keys [save-fn load-fn user initial-editor-data branches] :as args}]
  (let [{:keys [content title branch-name branch-id] :as article-branch} initial-editor-data]
    (infof "Loading Article Branch ID = %s into editor. Title %s" branch-id title)

    ;; NOTE: Key is used here to trigger a reload when :branches changes
    [:div {:key (str branch-id (count branches))}
     [se/editor (assoc args
                       :branch-name   branch-name
                       :branch-id     branch-id
                       :initial-value content
                       :title         title
                       :user          {:firstName "Andrew"
                                       :lastName  "Lai"})]]))
