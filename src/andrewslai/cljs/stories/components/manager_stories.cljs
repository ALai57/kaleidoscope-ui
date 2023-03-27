(ns andrewslai.cljs.stories.components.manager-stories
  (:require [andrewslai.cljs.components.manager :as manager]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))


(def ^:export default
  (helper/->default {:title     "Manager Subcomponents/Manager cards"
                     :component manager/manager-cards
                     :args      {}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [manager/manager-cards (helper/->params args)]))

(def ^:export Manager-cards
  (helper/->story template {}))
