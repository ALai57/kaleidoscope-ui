(ns kaleidoscope.cljs.stories.navbar-stories
  (:require [kaleidoscope.cljs.navbar :as navbar]
            [kaleidoscope.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-user-data
  {})

(def ^:export default
  (helper/->default {:title     "Basic Components/Navbar"
                     :component navbar/nav-bar
                     :args      {:user example-user-data}}))

;; A "Templating" example, as an alternative to the JavaScript bind syntax explained in the Storybook docs
(defn template
  "The template is a function of arguments because Storybook understands how to
  translate arguments into interactive controls"
  [args]
  (reagent/as-element [navbar/nav-bar (helper/->params args)]))

(def ^:export Default-logged-in-navbar
  (helper/->story template {:notification-type :modal}))

(def ^:export Logged-out-navbar
  (helper/->story template {:notification-type :modal
                            :user              nil}))

(def ^:export Navbar-with-icon
  (helper/->story template {:notification-type :modal
                            :user              {:avatar_url "/images/lock.svg"}}))
