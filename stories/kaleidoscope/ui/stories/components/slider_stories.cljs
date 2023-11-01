(ns kaleidoscope.ui.stories.components.slider-stories
  (:require [kaleidoscope.ui.components.slider :as slider]
            [kaleidoscope.ui.stories.helper :as helper]
            ))

(def ^:export default
  (helper/->default-story
   {:title      "Basic Components/Value Slider"
    :component  slider/value-slider
    :parameters {:docs
                 {:description
                  {:component "A slider with a value"}}}

    :args     (clj->js {:on-change (fn [])
                        :title     "Something"})}))


(def ^:export Basic-Value-Slider
  (clj->js {}))
