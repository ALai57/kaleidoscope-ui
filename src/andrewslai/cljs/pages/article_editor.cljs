(ns andrewslai.cljs.pages.article-editor
  (:require [andrewslai.cljs.components.slate-editor :as se]
            [andrewslai.cljs.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            ))

(def ARTICLE-MOCK
  {"1" {:content se/INITIAL-VALUE
        :title   "My first article"}
   "2" {:content [{:type "p" :children [{:text "This is editable plain text"}]}]
        :title   "My second article"}})

(defn editor-ui
  [{:keys [save-fn load-fn user editor-article-id]}]
  (let [{:keys [content title]} (get ARTICLE-MOCK editor-article-id)]
    [:div {:key editor-article-id}
     [se/editor {:save-fn           save-fn
                 :editor-article-id editor-article-id
                 :initial-value     content
                 :title             title
                 :load-fn           (fn []
                                      (load-fn (if (= "2" editor-article-id)
                                                 "1"
                                                 "2")))
                 :user              {:firstName "Andrew"
                                     :lastName  "Lai"}}]]))
