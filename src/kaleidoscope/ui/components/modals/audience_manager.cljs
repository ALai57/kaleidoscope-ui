(ns kaleidoscope.ui.components.modals.audience-manager
  (:require [kaleidoscope.ui.components.modal :as modal]
            [kaleidoscope.ui.components.input-tags :as input-tags]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.utils.events :as events]
            [reagent.core :as r]
            [reagent-mui.components :refer [toggle-button-group toggle-button]]
            [re-frame.core :refer [dispatch subscribe]]
            [taoensso.timbre :refer-macros [infof]]
            [goog.string :as gstr]))

(defn add-audience!
  [article group]
  (infof "Adding group `%s` (group-id `%s`) to article `%s` (article-id `%s`)"
         (:display-name group)
         (:group-id group)
         (:article-title article)
         (:article-id article))
  (dispatch [:add-audience article group]))

(defn delete-audience!
  [audience]
  (infof "Deleting audience (group-id: `%s`) (audience-id `%s`)"
         (:group-id audience)
         (:audience-id audience))
  (dispatch [:delete-audience audience]))

(defn -edit-audiences-modal
  [{:keys [open? on-close groups article add-audience! delete-audience!
           initial-values]
    :or   {add-audience!    (fn [article group] (js/console.log "Add!" article group))
           delete-audience! (fn [article group] (js/console.log "Delete!" article group))}}]
  (let [publicly-visible (:public-visibility article)
        active-groups    (->> initial-values
                              :response
                              (map :group-id)
                              (into #{}))
        initial-groups   (filter (fn [{:keys [group-id]}]
                                   (contains? active-groups group-id))
                                 groups)]
    (modal/basic-modal
     {:title    (gstr/format "Manage audiences" )
      :body     [:div
                 [:h4 [:b "Title: "] (:article-title article)]
                 [:h4 [:b "URL: "] (str "/" (:article-url article))]
                 [:br]
                 [:div
                  [:br]
                  [:p [:b "Audiences have permissions to view this article."]]
                  (if initial-values
                    [input-tags/input-tags {:options   groups
                                            :values    initial-groups
                                            :disabled  publicly-visible
                                            :on-add    (fn [^js event]
                                                         (let [{:keys [option] :as _clj-event} (u/clojurize event)]
                                                           (add-audience! article option)))
                                            :on-remove (fn [^js event]
                                                         (let [{:keys [option] :as _clj-event} (u/clojurize event)
                                                               audience                        (first (filter (fn [audience]
                                                                                                                (= (:group-id option)
                                                                                                                   (:group-id audience)))
                                                                                                              (:response initial-values)))]
                                                           (delete-audience! audience)))}]
                    [:h2 "Loading"])]]
      :footer   [:button {:type     "button"
                          :title    "Ok"
                          :class    "btn btn-default"
                          :on-click on-close}
                 "Ok"]
      :open?    open?
      :on-close on-close})))

(defn edit-audiences-modal
  [{:keys [open? on-close audiences groups article initial-values] :as args}]
  ;;(println "INITIAL VALUES" initial-values)
  (-edit-audiences-modal
   (assoc args
          :add-audience!    add-audience!
          :delete-audience! delete-audience!))
  )
