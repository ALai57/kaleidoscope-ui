(ns kaleidoscope.ui.stories.components.button-stories
  (:require ["@storybook/addon-actions" :refer [action]]
            [kaleidoscope.ui.components.button :as button]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story {:title     "Basic Components/Button"
                           :component button/button
                           :argTypes  {:on-click {:description  "Button's on click behavior"
                                                  :defaultValue (action "Clicked button!")
                                                  :action       "Clicked Button!"}
                                       :color    {:description  "Button color"
                                                  :defaultValue "primary"
                                                  :control      "select"
                                                  :options      ["primary" "secondary"]}
                                       :text     {:description  "Button text"
                                                  :defaultValue "A button"
                                                  :control      "text"}}
                           :args      {:text     "A button"
                                       :color    "primary"
                                       :on-click (action "Clicked button!")}}))

(def ^:export Button-Primary
  (clj->js {}))

(def ^:export Button-Secondary
  (clj->js {:args {:color "secondary"}}))
