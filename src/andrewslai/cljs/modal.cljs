(ns andrewslai.cljs.modal
  (:require [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [modal box]]
            [reagent-mui.icons.close :refer [close]]
            [taoensso.timbre :refer-macros [info]]))

;;https://github.com/cljsjs/packages/tree/master/bootstrap-notify
;;https://github.com/Frozenlock/siren
(defn modal-panel
  [{:keys [child size show?]}]
  [:div.modal-wrapper
   [:div.modal-backdrop
    {:on-click (fn [event]
                 (do
                   (dispatch [:modal {:show? (not show?)
                                      :child nil
                                      :size :default}])
                   (.preventDefault event)
                   (.stopPropagation event)))}]
   [:div.modal-child {:style {:max-width "500px"}} child]])

(defn modal-template [{:keys [title body footer close-fn]}]
  [:div.modal-content.panel-danger
   [:div.modal-header.panel-heading {:style {:background-color "#CA7B5E"}}
    [:h4 title]
    [:button.close {:type       "button"
                    :style      {:padding "0px"
                                 :margin  "0px"}
                    :title      "Cancel"
                    :aria-label "Close"
                    :on-click   (close-fn)}
     [:span {:aria-hidden true} "x"]]]
   [:div.modal-body body]
   [:div.modal-footer footer]])

(def COLORS
  {"primary"   "#1139c9"
   "secondary" "#f01c2e"
   "info"      "rgb(141, 174, 255)"
   "warn"      "rgb(233, 218, 45)"
   "error"     "rgb(245, 125, 111)"})

(def MODAL-BACKGROUND
  "A shade of darker purple"
  "rgba(0, 0, 40, 0.8)")

(defn modal-template2
  [{:keys [title body footer on-close level]
    :or   {level "info"}}]
  [:div.modal-content {:style {:border "none"}}
   [:div.modal-header {:style {:background-color (get COLORS level)}}
    [:h4.modal-title title]
    [:button.close {:on-click   on-close
                    :type       "reset"
                    :aria-label "Close"}
     [close {:class "close-button"}]]]
   (when body [:div.modal-body body])])

(defn test-modal
  [{:keys [open? title body footer level]
    :or   {level "info"
           open? true}}]
  (info "Creating modal")
  (let [showing  (reagent/atom open?)
        on-close #(reset! showing false)]
    (fn []
      [modal {:open          @showing
              :on-close      on-close
              :BackdropProps {:style {:background-color MODAL-BACKGROUND}}}
       [box {:class "modal-box"}
        [modal-template2 {:title    title
                          :body     body
                          :footer   footer
                          :on-close on-close
                          :level    level}]]])))
