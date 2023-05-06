(ns kaleidoscope.cljs.stories.components.primary-button-stories
  (:require [kaleidoscope.cljs.components.primary-button :as primary-button]
            [kaleidoscope.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "Basic Components/Primary Button"
                     :component primary-button/primary-button
                     :argTypes  {:on-click {:action "Clicked Button!"}}
                     :args      {:text "A button"}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [primary-button/primary-button (helper/->params args)]))

(def ^:export Default-Primary-Button
  (helper/->story template {}))
