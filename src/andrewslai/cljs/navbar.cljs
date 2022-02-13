(ns andrewslai.cljs.navbar
  (:require [andrewslai.cljs.modal :as modal]
            [andrewslai.cljs.components.side-menu :as side-menu]
            [reagent-mui.icons.menu :refer [menu]]
            [re-frame.core :refer [dispatch subscribe]]))

(def nav-images-path "images/nav-bar/")

(defn- nav-icon
  [route img]
  [:a.zoom-icon {:href (str "#/" route)}
   [:img.navbutton
    {:src (str nav-images-path img)
     :on-click #(dispatch [:set-active-panel (keyword route)])}]])

(defn- login-icon
  [avatar-url]
  [:a.zoom-icon {:href (str "#/admin")}
   [:img.navbutton
    {:src (or avatar-url "/images/nav-bar/unknown-user.svg")
     :on-click #(dispatch [:set-active-panel :admin])}]])

(defn menu-icon
  [props]
  [:a.zoom-icon
   [menu (merge {:style {:color "white"
                         :width "100%"
                         :height "75px"
                         :padding "5px"}
                 ;;:preserve-aspect-ratio "meet"
                 }
                props)]])

(defn nav-bar [{:keys [user]}]
  [:div#primary-nav
   [:a.zoom-icon {:href  "#/home"
                  :style {:float "left"}}
    [:img.navbutton {:src      "images/nav-bar/favicon-white.svg"
                     :on-click #(dispatch [:set-active-panel :home])}]]
   [:div#secondary-nav
    [side-menu/side-menu {:expand-button menu-icon}]
    [login-icon (:avatar_url user)]
    [nav-icon "thoughts" "andrew-head-icon.svg"]
    [nav-icon "about" "andrew-silhouette-icon.svg"]
    [nav-icon "research" "neuron-icon.svg"]
    [nav-icon "data-analysis" "statistics-icon.svg"]]])
