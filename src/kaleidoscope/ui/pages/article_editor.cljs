(ns kaleidoscope.ui.pages.article-editor
  (:require [kaleidoscope.ui.components.slate-editor :as se]
            [kaleidoscope.ui.navbar :as nav]
            [goog.string :as gstr]
            [reagent-mui.components :refer [text-field]]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof]]
            ))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Editor events
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn publish-article!
  [{:keys [article-url branch-name] :as article-branch}]
  (infof "Publishing branch %s of article %s" branch-name article-url)
  (dispatch [:publish-branch! article-branch]))

(defn load-latest-version!
  [{:keys [article-id branch-id] :as article-branch}]
  (infof "Updating editor article id to %s" article-id)
  ;;(infof "article-branch %s" article-branch)

  (dispatch [:load-latest-version! article-branch])
  (dispatch [:update-editor-branch-id article-id]))

(defn save-version!
  [{:keys [content title article-tags branch-name] :as save-data}]
  (dispatch [:save-article! (update save-data :content gstr/unescapeEntities)]))

;; TODO: Move me to article-branch namespace
(defn get-id
  [article-branch]
  (:branch-id article-branch))

(defn -editor-ui
  [{:keys [user save-fn load-fn initial-editor-data branches] :as args}]
  (infof "Loading Editor: %s" (select-keys initial-editor-data [:branch-id :title]))

  ;; NOTE: Key is used here to trigger a reload when :branches changes
  [:div {:key (str (get-id initial-editor-data) (count branches))}
   [se/editor (assoc args
                     :initial-branch initial-editor-data
                     :user           {:firstName "Andrew"
                                      :lastName  "Lai"})]])

(defn editor-ui
  [{:keys [user save-fn load-fn initial-editor-data branches] :as args}]
  [-editor-ui {;; User data
               :user                @(subscribe [:user-profile])

               ;; Editor data
               :branches            @(subscribe [:branches])
               :editor-branch-id    @(subscribe [:editor-branch-id])
               :initial-editor-data @(subscribe [:initial-editor-data])

               ;; Editor actions
               :publish-fn          publish-article!
               :load-fn             load-latest-version!
               :save-fn             save-version!}])
