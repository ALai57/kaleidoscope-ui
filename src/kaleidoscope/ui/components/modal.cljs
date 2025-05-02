(ns kaleidoscope.ui.components.modal
  (:require [reagent-mui.components :refer [modal box typography]]
            [kaleidoscope.ui.components.button :refer [button]]
            [reagent-mui.icons.close :refer [close]]
            ))

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
  [:div.modal-content {:style {:border    "none"
                               ;;:maxWidth  "90vw"
                               :maxHeight "90vh"}}
   [:div.modal-header {:style {:background-color (get COLORS level)}}
    [typography {:variant "h5" :sx {:display "inline-block"}} title]
    [button {:on-click on-close
             :sx       {:display "inline-block"
                        :float   "inline-end"
                        :padding "0px"}
             :text [close {:class "close-button"
                           :sx    {:padding "0px"}}]}]]
   (when body [:div.modal-body body])
   (when footer [:div.modal-footer footer])])

(defn basic-modal
  [{:keys [open? title body footer level on-close]
    :or   {level "info"
           open? true}}]
  ;;(println "BASIC MODAL open?" open?)
  [modal {:open          open?
          :on-close      on-close
          :BackdropProps {:style {:background-color MODAL-BACKGROUND}}}
   [box {:class "modal-box"}
    [modal-template {:title    title
                     :body     body
                     :footer   footer
                     :on-close on-close
                     :level    level}]]])
