(ns  kaleidoscope.ui.stories.components.modals.audience-manager-stories
  (:require [kaleidoscope.ui.components.modals.audience-manager :as modal]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.stories.components.groups.group-manager-stories :as gm-stories]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def groups
  (map (fn [{:keys [display-name] :as group}]
         (assoc group :title display-name))
       gm-stories/groups))

(def ^:export default
  (helper/->default-story
   {:title     "Modals/Audience Manager Modal"
    :component (fn edit-audiences-modal [args]
                 (let [state (reagent/atom false)]
                   (fn []
                     [:div
                      [button/button {:on-click (fn []
                                                  (swap! state not)
                                                  (println "Toggled modal to: " @state))
                                      :text     "Toggle modal"}]
                      [modal/-edit-audiences-modal (assoc args
                                                          :open?    @state
                                                          :on-close (fn []
                                                                      (reset! state false)))]])))
    :args      {:open?     false
                :audiences []
                :article   {}
                :groups    groups}}))

(def ^:export Basic-Edit-Audiences-Modal
  (clj->js {}))

(def ^:export One-Tag-Selected
  (clj->js {:args {:audiences (take 1 groups)}}))
