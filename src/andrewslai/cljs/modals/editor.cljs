(ns andrewslai.cljs.modals.editor
  (:require [andrewslai.cljs.modal :refer [modal-template]]
            [taoensso.timbre :refer-macros [infof]]))

(defn create-article-failure [payload]
  {:title "Article creation failed!"
   :body [:div {:style {:overflow-wrap "break-word"}}
          [:p [:b "Creation unsuccessful."]]
          [:br]
          [:p (str payload)]
          [:br]]
   :footer [:button {:type "button" :title "Ok"
                     :class "btn btn-default"
                     :on-click #(infof "Failed to close")} "Ok"]
   :close-fn #(infof "Failed to close")})
(defn create-article-failure-modal [payload]
  (modal-template (create-article-failure payload)))


(defn create-article-success [{:keys [title author timestamp
                                      article_tags article_url] :as article}]
  (let [url (str "/#/" article_tags "/content/" article_url)
        close-fn (fn []
                   (do (infof "Failed to close")
                       (set! (.-href (.-location js/document)) url)))]
    {:title "Successful article creation!"
     :body [:div
            [:br]
            [:div
             [:p [:b "Article: "] title]
             [:p [:b "Author: "] author]
             [:p [:b "Timestamp: "] (str timestamp)]
             [:p [:b "URL: "] url]]]
     :footer [:button {:type "button" :title "Ok"
                       :class "btn btn-default"
                       :on-click close-fn} "Ok"]
     :close-fn close-fn}))
(defn create-article-success-modal [article]
  (modal-template (create-article-success article)))
