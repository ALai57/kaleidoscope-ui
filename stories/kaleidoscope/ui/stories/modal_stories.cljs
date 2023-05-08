(ns  kaleidoscope.ui.stories.modal-stories
  (:require [kaleidoscope.ui.components.modal :as modal]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Modal"
    :component (fn basic-modal [args]
                 (let [state (reagent/atom false)]
                   (fn []
                     [:div
                      [button/button {:on-click (fn []
                                                  (swap! state not)
                                                  (println "Toggled modal to: " @state))
                                      :text     "Toggle modal"}]
                      [modal/basic-modal (assoc args
                                                :open?    @state
                                                :on-close (fn []
                                                            (reset! state false)))]])))
    :argTypes  {:open?    {:description  "Open the modal?"
                           :defaultValue false
                           :control      "select"
                           :options      [true false]}
                :level    {:description  "Information Level"
                           :defaultValue "info"
                           :control      "select"
                           :options      ["info" "success" "warn" "error"]}
                :title    {:description  "Modal's title"
                           :defaultValue "My title"}
                :body     {:description  "Modal's body"
                           :defaultValue "Body text"}
                :on-close {:description  "What to do when Modal is closed"}}
    :args      {:open? false
                :title "My Modal"
                :body  "Some body"
                :level "info"}}))

(def ^:export Info-Modal
  (clj->js {}))

(def ^:export Success-Modal
  (clj->js {:args {:level "success"}}))

(def ^:export Warn-Modal
  (clj->js {:args {:level "warn"}}))

(def ^:export Error-Modal
  (clj->js {:args {:level "error"}}))
