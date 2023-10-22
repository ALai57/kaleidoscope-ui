(ns kaleidoscope.ui.pages.ui-manager
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [kaleidoscope.ui.utils.core :as u]
            [kaleidoscope.ui.utils.events :as e]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [re-frame.core :refer [subscribe dispatch]]
            [taoensso.timbre :refer-macros [infof info]]
            ["react-colorful" :as rc]
            ["react" :as react]
            ))

;; https://github.com/omgovich/react-colorful
;; https://codesandbox.io/s/6fp23?file=/src/App.js
(defn popover-picker
  [{:keys [initial-color on-change]}]
  (let [color (reagent/atom initial-color)
        open? (reagent/atom false)]
    (fn []
      [:div
       [:div {:style   {:background-color @color
                        :width            "28px"
                        :height           "28px"
                        :border-radius    "8px"
                        :border           "3px solid #fff"
                        :box-shadow       "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
                        :cursor           "pointer"}
              :onClick (fn [_]
                         (swap! open? not))}]
       (when @open?
         [:div
          [:> rc/HexColorPicker {:color     @color
                                 :on-change (fn [new-color]
                                              (reset! color new-color))}]])])))

(defn -ui-manager-page [{:keys [images albums user notification-type auth-token]}]
  [:div
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:div {:margin "10px"}
    [:f> popover-picker {:initial-color "#AAAAAA"}]]])

(defn ui-manager-page
  [{:keys [images user notification-type]}]
  [-ui-manager-page {:user              user
                     :notification-type notification-type}])


;;import React, { useCallback, useRef, useState } from "react";
;;import { HexColorPicker } from "react-colorful";
;;
;;import useClickOutside from "./useClickOutside";
;;
;;export const PopoverPicker = ({ color, onChange }) => {
;;  const popover = useRef();
;;  const [isOpen, toggle] = useState(false);
;;
;;  const close = useCallback(() => toggle(false), []);
;;  useClickOutside(popover, close);
;;
;;  return (
;;    <div className="picker">
;;      <div
;;        className="swatch"
;;        style={{ backgroundColor: color }}
;;        onClick={() => toggle(true)}
;;      />
;;
;;      {isOpen && (
;;        <div className="popover" ref={popover}>
;;          <HexColorPicker color={color} onChange={onChange} />
;;        </div>
;;      )}
;;    </div>
;;  );
;;};
