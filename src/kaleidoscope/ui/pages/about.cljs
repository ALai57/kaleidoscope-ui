(ns kaleidoscope.ui.pages.about
  (:require [kaleidoscope.ui.components.navbar :as nav]))


(defn reset-portfolio-cards [x]
  (let [clicked-element (.-target x)
        clicked-class (.-className clicked-element)]
    (when-not (or (includes? clicked-class "resume-info-image")
                  (includes? clicked-class "resume-info-icon")
                  (includes? clicked-class "card-description")
                  (includes? clicked-class "card-title")
                  (includes? clicked-class "card-text"))
      (dispatch [:reset-portfolio-cards]))))

(defn about [{:keys [user notification-type]}]
  [:div {:onClick reset-portfolio-cards
         :style   {:height   "100%"
                   :width    "100%"
                   :position "absolute"}}
   [nav/nav-bar {:user user
                 :notification-type notification-type}]
   [:div {:style {:height "100%"}}]])
