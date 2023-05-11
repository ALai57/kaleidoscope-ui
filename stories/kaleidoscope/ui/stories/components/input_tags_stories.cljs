(ns kaleidoscope.ui.stories.components.input-tags-stories
  (:require [kaleidoscope.ui.components.input-tags :as input-tags]
            [kaleidoscope.ui.stories.helper :as helper]
            [reagent.core :as reagent]
            ["@storybook/addon-actions" :refer [action]]))

(def top-100-films
  [{:year 1994, :title "The Shawshank Redemption"},
   {:year 1972, :title "The Godfather"},
   {:year 1974, :title "The Godfather: Part II"},
   {:year 2008, :title "The Dark Knight"},
   {:year 1957, :title "12 Angry Men"},
   {:year 1993, :title "Schindler's List"},
   {:year 1994, :title "Pulp Fiction"},
   {:year 2003, :title "The Lord of the Rings: The Return of the King"},
   {:year 1966, :title "The Good, the Bad and the Ugly"},
   {:year 1999, :title "Fight Club"},
   {:year 2001, :title "The Lord of the Rings: The Fellowship of the Ring"},
   {:year 1980, :title "Star Wars: Episode V - The Empire Strikes Back"},
   ])

(def ^:export default
  (helper/->default-story
   {:title     "JSX Components/Input Tags"
    :component input-tags/input-tags
    :args      {:options   top-100-films
                :on-add    (fn [] (action "Added new element"))
                :on-remove (fn [] (action "Removed element"))
                :values      nil}}))

(def ^:export Nothing-selected
  (clj->js {}))

(def ^:export Two-selected
  (clj->js {:args {:values (take 2 top-100-films)}}))
