(ns andrewslai.cljs.stories.components.demo-stories
  (:require [andrewslai.cljs.components.demo :as demo]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "3D Components/Demo"
                     :component demo/demo
                     :args      {}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [demo/demo (helper/->params args)]))

(def ^:export Default-3D
  (helper/->story template {}))
