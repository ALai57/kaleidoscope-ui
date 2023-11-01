(ns kaleidoscope.ui.components.slider
  (:require [kaleidoscope.ui.utils.events :as events]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [box grid typography slider input]]))

(defn value-slider
  [{:keys [on-change title initial-value min max]}]
  (let [v         (reagent/atom (or initial-value 0))
        on-change (or on-change (fn []))]
    (fn []
      [box {:sx {:max-width "200px"}}
       [typography title]
       [grid {:container true :spacing 2 :align-items "center"}
        [grid {:item true :xs true}
         [slider {:value     @v
                  :min       (or min 0)
                  :max       (or max 100)
                  :on-change (fn [event]
                               ;;(js/console.log "CHANGE" (events/event-value event))
                               (let [new-val (events/event-value event)]
                                 (reset! v new-val)
                                 (on-change new-val)))
                  }]]
        [grid {:item true}
         [input {:value      @v
                 :on-change  (fn [event]
                               ;;(js/console.log "CHANGE" (events/event-value event))
                               (let [new-val (events/event-value event)]
                                 (reset! v new-val)
                                 (on-change new-val)))
                 :sx         {:width "42px"}
                 :inputProps {:min  (or min 0)
                              :max  (or max 100)
                              :type "number"}
                 }]]]])))
