(ns kaleidoscope.ui.modal
  (:require [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [modal box]]
            [reagent-mui.icons.close :refer [close]]
            [taoensso.timbre :refer-macros [info]]))

;;https://github.com/cljsjs/packages/tree/master/bootstrap-notify
;;https://github.com/Frozenlock/siren
(def COLORS
  {"primary"   "#1139c9"
   "secondary" "#f01c2e"
   "success"   "rgb(101, 221, 149)"
   "info"      "rgb(141, 174, 255)"
   "warn"      "rgb(233, 218, 45)"
   "error"     "rgb(245, 125, 111)"})

(def MODAL-BACKGROUND
  "A shade of darker purple"
  "rgba(0, 0, 40, 0.8)")

(defn modal-template
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

(defn basic-modal
  [{:keys [open? title body footer level on-close]
    :or   {level "info"
           open? true}}]
  (println "BASIC MODAL open?" open?)
  [modal {:open          open?
          :on-close      on-close
          :BackdropProps {:style {:background-color MODAL-BACKGROUND}}}
   [box {:class "modal-box"}
    [modal-template {:title    title
                     :body     body
                     :footer   footer
                     :on-close on-close
                     :level    level}]]])
