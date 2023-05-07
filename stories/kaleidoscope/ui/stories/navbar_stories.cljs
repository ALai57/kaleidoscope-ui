(ns kaleidoscope.ui.stories.navbar-stories
  (:require [kaleidoscope.ui.navbar :as navbar]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]))

(def example-user-data
  {})

(def ^:export default
  (helper/->default-story
   {:title     "Basic Components/Navbar"
    :component navbar/nav-bar
    :args      {:user              example-user-data
                :notification-type :modal}}))

(def ^:export Default-logged-in-navbar
  (clj->js {:args {:notification-type :modal}}))

(def ^:export Logged-out-navbar
  (clj->js {:args {:user nil}}))
