(ns andrewslai.cljs.stories.navbar-stories
  (:require [andrewslai.cljs.navbar :as navbar]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-user-data
  {})

(def ^:export default
  (helper/->default {:title     "Navbar"
                     :component navbar/nav
                     :args      {:user example-user-data}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [navbar/nav (helper/->params args)]))

(def ^:export Default-navbar
  (helper/->story template {}))

(def ^:export Navbar-with-icon
  (helper/->story template {:user {:avatar_url "/images/lock.svg"}}))
