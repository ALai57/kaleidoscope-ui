(ns kaleidoscope.ui.components.modals.audience-manager
  (:require [kaleidoscope.ui.components.modal :as modal]
            [kaleidoscope.ui.components.input-tags :as input-tags]
            [reagent.core :as r]
            [re-frame.core :refer [dispatch]]
            [taoensso.timbre :refer-macros [infof]]))

(defn add-audience!
  [article group]
  (js/console.log "Add" group)
  (dispatch [:add-audience article group]))

(defn delete-audience!
  [article group]
  (js/console.log "Delete" group)
  (dispatch [:delete-audience article group]))

(defn -edit-audiences-modal
  [{:keys [open? on-close audiences groups article add-audience! delete-audience!]
    :or {add-audience!    (fn [article group] (js/console.log "Add!" article group))
         delete-audience! (fn [article group] (js/console.log "Delete!" article group))}}]
  (modal/basic-modal
   {:title    "Manage audiences"
    :body     [:div
               [:br]
               [:div
                [:p [:b "Members of audiences added here will have permissions to view this article."]]
                [input-tags/input-tags {:options   groups
                                        :values    audiences
                                        :on-add    (partial add-audience! article)
                                        :on-remove (partial delete-audience! article)}]]]
    :footer   [:button {:type     "button"
                        :title    "Ok"
                        :class    "btn btn-default"
                        :on-click on-close}
               "Ok"]
    :open?    open?
    :on-close on-close}))

(defn edit-audiences-modal
  [{:keys [open? on-close audiences groups article] :as args}]
  (-edit-audiences-modal
   (assoc args
          :on-add    add-audience!
          :on-remove delete-audience!))
  )
