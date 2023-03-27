(ns andrewslai.cljs.navbar
  (:require [andrewslai.cljs.modal :as modal]
            [andrewslai.cljs.components.side-menu :as side-menu]
            [reagent.core :as reagent]
            [reagent-mui.icons.manage-accounts :refer [manage-accounts]]
            [reagent-mui.components :refer [avatar badge]]
            [reagent-mui.icons.menu :refer [menu]]
            [reagent-mui.icons.help :refer [help]]
            [reagent-mui.icons.check-circle :refer [check-circle]]
            [re-frame.core :refer [dispatch subscribe]]))

(def nav-images-path "images/nav-bar/")

(defn navigate-home!
  []
  (dispatch [:set-active-panel :home]))

(defn- nav-icon
  [route src]
  [:a.zoom-icon {:href (str "#/" route)}
   [:img.navbutton
    {:src      src
     :on-click #(dispatch [:set-active-panel (keyword route)])}]])

(defn img-path
  [fname]
  (str nav-images-path fname))

(defn login-icon
  [route src user]
  [:a.zoom-icon {:href (str "#/" route)}
   [badge {:overlap       "circular"
           :class         "navbutton"
           :anchor-origin {:vertical   "bottom"
                           :horizontal "right"}
           :badge-content (if user
                            (reagent/as-element [check-circle {:font-size "large"
                                                               :sx        {:padding-bottom   "10px"
                                                                           :padding-right    "10px"
                                                                           :color            "green"
                                                                           :background-color "#333333"}}])
                            (reagent/as-element [help {:font-size "large"
                                                       :sx        {:color            "primary.main"
                                                                   :padding-bottom   "10px"
                                                                   :padding-right    "10px"
                                                                   :background-color "#333333"}}]))}
    [avatar {:alt       (if user (:firstName user) "Not logged in")
             :class     "navbutton"
             :sx        {:width  "inherit"
                         :height "inherit"}
             :img-props {:class "navbutton"}
             :src       src}]]])

(defn nav-bar [{:keys [user notification-type]}]
  [:div#primary-nav
   [:a.zoom-icon {:href  "#/home"
                  :style {:float "left"}}
    [:img.navbutton {:src      (img-path "favicon.svg")
                     :on-click #(dispatch [:set-active-panel :home])}]]
   [:div#secondary-nav
    [login-icon "admin" (img-path "user.svg") user]
    (when user
      [:<>
       [nav-icon "manager"  (img-path "resources.svg")]])
    [nav-icon "archive"  (img-path "articles.svg")]]])
