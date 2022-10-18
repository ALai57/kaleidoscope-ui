(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            [taoensso.timbre :refer-macros [infof]]
            ))

(defn editor-ui
  [{:keys [save-fn load-fn user editor-branch-id recent-content] :as args}]
  (let [[{:keys [content title branch-name branch-id] :as article-branch}]
        (filter (fn [{:keys [branch-id] :as article-branch}]
                  (= editor-branch-id branch-id))
                recent-content)]
    (infof "Loading Article Branch ID = %s into editor. Title %s" editor-branch-id title)
    ;;(println "CONTENT" content)

    ;; NOTE: Key is used here to trigger a reload when the recent-content changes
    [:div {:key (str editor-branch-id (count recent-content))}
     [se/editor (assoc args
                       :branch-name   branch-name
                       :branch-id     branch-id
                       :initial-value content
                       :title         title
                       :user          {:firstName "Andrew"
                                       :lastName  "Lai"})]]))
