(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            [taoensso.timbre :refer-macros [infof]]
            ))

(def ARTICLE-MOCK
  {"1" {:content se/INITIAL-VALUE
        :title   "My first article"}
   "2" {:content [{:type "p" :children [{:text "This is editable plain text"}]}]
        :title   "My second article"}})

;; TODO: Update such that
(defn editor-ui
  [{:keys [save-fn load-fn user editor-article-id recent-content] :as args}]
  (let [[{:keys [content title] :as article}] (filter (fn [{:keys [id] :as article}]
                                                        (= editor-article-id id))
                                                      recent-content)]
    (infof "Loading Article ID = %s into editor. Title %s" editor-article-id title)
    ;;(println "CONTENT" content)

    ;; Key is used here to trigger a reload when the recent-content changes
    [:div {:key (str editor-article-id (count recent-content))}
     [se/editor (assoc args
                       :initial-value content
                       :title         title
                       :user          {:firstName "Andrew"
                                       :lastName  "Lai"})]]))

#_(get ARTICLE-MOCK editor-article-id)
#_(fn []
    (load-fn (if (= "2" editor-article-id)
               "1"
               "2")))
