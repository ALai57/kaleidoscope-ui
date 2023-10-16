(ns kaleidoscope.ui.components.navbar
  (:require [reagent-mui.components :refer [app-bar avatar box container toolbar]]
            ["@mui/material/styles" :refer [styled]]
            [re-frame.core :refer [dispatch]]))


(defn navigate-home!
  []
  (dispatch [:set-active-panel :home]))

(def zoom-icon
  ((styled "a")
   (fn [{:keys [theme]}]
     (clj->js {:color      "blue"
               :transition "transform 0.3s"
               :max-width  "100%"
               :float      "right"
               "&:hover"   #js {:transform "scale(1.2)"}}))))

(defn -nav-bar [{:keys [icons]}]
  [app-bar {:position "static"}
   [container {:max-width "xl"}
    [toolbar {:disable-gutters true}
     [:> zoom-icon {:href "#/home"}
      [:img.navbutton {:src      "images/nav-bar/favicon.svg"
                       :on-click navigate-home!}]]
     ;; Spacing - before this goes left and after goes right
     [box {:sx {:flex-grow 1}}]
     [box {:sx {:display {:xs "none" :sm "block"}}}
      icons]]]])

(defn nav-bar [{:keys [user]}]
  [-nav-bar {:icons (cond-> [:<> ]
                      true (conj [:> zoom-icon {:href "#/admin"}
                                  [avatar {:alt       (if user (:firstName user) "Not logged in")
                                           :class     "navbutton"
                                           :sx        {:width  "inherit"
                                                       :height "inherit"}
                                           :img-props {:class "navbutton"}
                                           :src       "images/nav-bar/user.svg"}]])
                      user (conj [:> zoom-icon {:href "#/manager"}
                                  [:img.navbutton
                                   {:src      "images/nav-bar/resources.svg"
                                    :on-click #(dispatch [:set-active-panel :manager])}]])
                      true (conj [:> zoom-icon {:href "#/archive"}
                                  [:img.navbutton
                                   {:src      "images/nav-bar/articles.svg"
                                    :on-click #(dispatch [:set-active-panel :archive])}]]))}])
