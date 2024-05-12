(ns kaleidoscope.ui.components.article-manager
  (:require [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.components.modals.audience-manager :as am]
            [kaleidoscope.ui.utils.events :as events]
            [reagent.core :as reagent]
            [reagent-mui.icons.post-add :refer [post-add]]
            [reagent-mui.icons.rocket-launch :refer [rocket-launch]]
            [reagent-mui.icons.group :refer [group]]
            [reagent-mui.icons.article :as icons.article]
            [reagent-mui.icons.delete :refer [delete]]
            [reagent-mui.components :refer [box
                                            divider
                                            collapse
                                            icon-button
                                            list
                                            list-item
                                            list-item-button
                                            list-item-icon
                                            list-item-text

                                            tooltip
                                            toggle-button
                                            toggle-button-group
                                            text-field
                                            ]]
            [re-frame.core :refer [dispatch subscribe]]
            [taoensso.timbre :refer-macros [infof]]))

(def SUCCESS-GREEN "#08b383")

(defn -toggle-public-visibility!
  [{:keys [article-title article-id article-url] :as article} new-state]
  ;;(js/console.log "Toggling public visibility" article new-state)
  (infof "Changing article `%s` (article-id `%s`, url `%s`) public visibility to `%s`"
         article-title
         article-id
         article-url
         new-state)
  (dispatch [:toggle-public-visibility! article new-state]))

(defn article-row
  [{:keys [article-created-date article-title published-at public-visibility] :as article-branch}
   {:keys [delete-article! edit-article! publish-article!
           toggle-public-visibility! toggle-audience-manager] :as article-actions}]
  [list-item
   {:sx              {:padding-right "150px"}
    :secondaryAction (reagent/as-element
                      [box
                       [tooltip {:id    "publish-tooltip"
                                 :title (if published-at (str "Published on " published-at) "Publish article")}
                        [:span
                         [icon-button {:edge     "end"
                                       :disabled (if published-at true false)
                                       :on-click publish-article!
                                       :sx       {:margin-right "3px"}}
                          [rocket-launch {:sx {:color (if published-at SUCCESS-GREEN "")}}]]]]

                       [tooltip {:id    "settings-tooltip-visibility"
                                 :title "Determine who can see your article. If the setting is 'Non-public', then only the audience you specify can view the article"}
                        [toggle-button-group {:value     public-visibility
                                              :exclusive true
                                              :onChange  (fn [event]
                                                           ;;(println "Changed value" (events/event-value event))
                                                           (toggle-public-visibility! article-branch (events/event-value event)))}
                         [toggle-button {:value true} "Public"]
                         [toggle-button {:value false} "Non-public"]]]

                       [tooltip {:id    "audiences-tooltip"
                                 :title "Audience: Who can see the article. Only applies when the article visibility is 'Non-Public'"}
                        [icon-button {:edge     "end"
                                      :on-click (partial toggle-audience-manager article-branch)

                                      ;; If the article is public, it makes no sense to set an audience for it
                                      :disabled public-visibility}
                         [group]]]
                       [:div {:style {:width   "20px"
                                      :display "inline-block"}}]
                       [tooltip {:id "delete-tooltip" :title "Delete article (WIP)"}
                        [icon-button {:edge     "end"
                                      :on-click delete-article!}
                         [delete]]]
                       ])}
   [tooltip {:id "edit-tooltip" :title "Edit article"}
    [list-item-button {:on-click (fn [event]
                                   (edit-article! article-branch))}
     [list-item-text {:sx {:width "70px"
                           :flex  "none"}} article-created-date]
     [list-item-icon {:sx {:margin-left "10px"
                           :min-width   "26px"}} [icons.article/article {:sx {:color (if published-at SUCCESS-GREEN "")}}]]
     [list-item-text {:sx {:margin-left "10px"}} article-title]]]])

(defn article-group-accordion
  [{:keys [idx open? on-click
           display-name articles] :as article-group}
   article-actions]
  [:<>
   [list-item-button {:on-click on-click}
    [list-item-text [:h3 display-name]]]
   [collapse {:in            open?
              :timeout       "auto"
              :unmountOnExit true}
    [list-item {:style {:display "block"}}
     (for [{:keys [article-created-at article-title branch-name public-visibility] :as article} articles]
       ^{:key (str article-title article-created-at branch-name public-visibility)}
       [article-row article article-actions])]]])

(defn add-article-form
  [{:keys [add-article!]}]
  (let [new-article-title (reagent/atom "")
        on-change        (fn [e]
                           (reset! new-article-title (events/event-value e)))]
    (fn []
      [box {:style {:display       "flex"
                    :align-items   "flex-end"
                    :margin-bottom "20px"}}
       [post-add {:sx {:color "action.active"
                       :mr    1
                       :my    0.5}}]
       [text-field {:id        "new-article-title-input"
                    :label     "Article Name"
                    ;;:label-for "new-article-title"
                    :variant   "standard"
                    :sx        {:margin-right "20px"
                                :min-width    "350px"}
                    :on-change on-change}]
       [button/button {:text     "Add a new article"
                       :on-click (partial add-article! {:article-title @new-article-title})}]
       ])))

(defn -article-manager
  [{:keys [open groups initial-values article-groups
           edit-modal-open? current-article toggle-audience-manager
           add-article! delete-article! edit-article! publish-article!]
    :or   {add-article!     (fn [article-title] (infof "Adding article `%s`!" article-title))
           delete-article!  (fn [article] (infof "Deleting article!"))
           edit-article!    (fn [article] (infof "Loading article!"))
           publish-article! (fn [article] (infof "Publishing article!"))}}]
  (let [indexed-groups (map-indexed (fn [idx article-group]
                                      (assoc article-group
                                             :idx      idx
                                             :on-click (fn [] (swap! open update idx not))))
                                    article-groups)]
    [:div
     [add-article-form {:add-article! add-article!}]
     [am/edit-audiences-modal {:open?          edit-modal-open?
                               :on-close       toggle-audience-manager
                               :article        current-article
                               :initial-values initial-values
                               :groups         (map (fn [group]
                                                      (assoc group :title (:display-name group)))
                                                    (or groups []))}]
     [divider]
     [list
      (for [{:keys [idx] :as article-group} (map (fn [article-group open?]
                                                   (assoc article-group :open? open?))
                                                 indexed-groups
                                                 @open)]
        ^{:key article-group} [article-group-accordion article-group
                               {:delete-article!           delete-article!
                                :edit-article!             edit-article!
                                :add-article!              add-article!
                                :publish-article!          publish-article!
                                :toggle-public-visibility! -toggle-public-visibility!
                                :toggle-audience-manager   toggle-audience-manager}])]]))


(defn article-manager
  [{:keys [article-groups open groups]
    :as   args}]
  (let [initial-values  (subscribe [:audience-editor-modal-initial-values])
        modal-open?     (reagent/atom false)
        current-article (reagent/atom nil)

        toggle-audience-manager (fn [article-branch & args]
                                  (reset! current-article article-branch)
                                  (when (:article-id @current-article)
                                    (dispatch [:get-audiences-for-article article-branch]))
                                  (swap! modal-open? not))]
    (fn []
      [-article-manager (merge args
                               {:initial-values          @initial-values
                                :edit-modal-open?        @modal-open?
                                :article-groups          article-groups
                                :toggle-audience-manager toggle-audience-manager
                                :current-article         @current-article})])))
