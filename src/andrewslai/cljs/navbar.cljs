(ns andrewslai.cljs.navbar
  (:require [andrewslai.cljs.modal :as modal]
            [andrewslai.cljs.components.side-menu :as side-menu]
            [reagent-mui.icons.menu :refer [menu]]
            [re-frame.core :refer [dispatch subscribe]]))

(def nav-images-path "images/nav-bar/")

(defn- nav-icon
  [route src]
  [:a.zoom-icon {:href (str "#/" route)}
   [:img.navbutton
    {:src      src
     :on-click #(dispatch [:set-active-panel (keyword route)])}]])

(defn img-path
  [fname]
  (str nav-images-path fname))

(defn nav-bar [{:keys [user notification-type]}]
  [:div#primary-nav
   [:a.zoom-icon {:href  "#/home"
                  :style {:float "left"}}
    [:img.navbutton {:src      (img-path "favicon-white.svg")
                     :on-click #(dispatch [:set-active-panel :home])}]]
   [:div#secondary-nav
    [nav-icon "admin"    (or (:avatar_url user)
                             (img-path "andrew-silhouette-icon.svg"))]
    [nav-icon "archive"  (img-path "archive-icon.svg")]
    ;;[nav-icon "thoughts" (img-path "andrew-head-icon.svg")]
    ;;[nav-icon "travel"   ".svg"]
    #_[nav-icon "research" "neuron-icon.svg"]
    #_[nav-icon "data-analysis" "statistics-icon.svg"]
    ]])
