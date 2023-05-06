(ns  kaleidoscope.ui.stories.modal-stories
  (:require [kaleidoscope.ui.modal :as modal]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def ^:export default
  (helper/->default {:title     "Basic Components/Modal"
                     :component modal/basic-modal
                     :args      {:open?  true
                                 :title  "My Modal"
                                 :body   "Some body"}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [modal/basic-modal (helper/->params args)]))


(def ^:export Success-Modal
  (helper/->story template {:open? true
                            :level "success"}))

(def ^:export Info-Modal
  (helper/->story template {:open? true}))

(def ^:export Warn-Modal
  (helper/->story template {:open? true
                            :level "warn"}))

(def ^:export Error-Modal
  (helper/->story template {:open? true
                            :level "error"}))
