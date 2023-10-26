(ns kaleidoscope.ui.components.navbar
  (:require ["@mui/material/styles" :refer [styled useTheme]]
            [reagent-mui.icons.edit :refer [edit]]
            [goog.string :as gstr]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [dispatch]]
            [reagent-mui.components :refer [app-bar avatar box container toolbar]]))


(defn navigate-home!
  []
  (dispatch [:set-active-panel :home]))

(defn navigate-manager!
  []
  (dispatch [:set-active-panel :manager]))

(defn navigate-archive!
  []
  (dispatch [:set-active-panel :archive]))

(def zoom-icon
  ((styled "a")
   (fn [{:keys [theme]}]
     (clj->js {:transition "transform 0.3s"
               :maxWidth   "100%"
               :float      "right"
               :position   "relative"
               "&:hover"   #js {:z-index   1000
                                :transform "scale(1.12)"}}))))

(defn -nav-bar [{:keys [icons]}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [app-bar {:position "static"
              :sx       {:background (gstr/format "linear-gradient(4deg, %s 40%, %s 100%)"
                                                  (get-in palette [:primary :light])
                                                  (get-in palette [:accent :main]))}}
     [container {:max-width "xl"}
      [toolbar {:disable-gutters true}
       [:> zoom-icon {:href "#/home"}
        [:img.navbutton {:src      "images/nav-bar/favicon.svg"
                         :on-click navigate-home!}]]
       ;; Spacing - before this goes left and after goes right
       [box {:sx {:flex-grow 1}}]
       [box {:sx {:display {:xs "none" :sm "block"}}}
        icons]]]]))

(defn avatar-icon
  [{:keys [user src href]} & children]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [:> zoom-icon {:href href}
     (into [avatar (cond-> {:alt       (if user (:firstName user) "Not logged in")
                            :class     "navbutton"
                            :sx        {:width  "inherit"
                                        :height "inherit"
                                        :padding "10px"
                                        :background (gstr/format "linear-gradient(30deg, %s 40%, %s 100%)"
                                                                 (get-in palette [:primary :light])
                                                                 (get-in palette [:accent :main]))}
                            :img-props {:class "navbutton"}}
                     src (assoc :src src))]
           children)]))

(defn nav-bar [{:keys [user]}]
  [:f> -nav-bar {:icons (cond-> [:<> ]
                          true (conj [:f> avatar-icon {:user user :href "#/admin" :src "images/nav-bar/user.svg" }])
                          user (conj [:f> avatar-icon {:user user :href "#/manager"}
                                      [edit {:class-name "navbutton"
                                             :color      "white"
                                             :sx         {:color  "white"
                                                          :width  "100%"
                                                          :height "100%"}}]])
                          true (conj [:f> avatar-icon {:user user :href "#/archive" :src "images/nav-bar/articles.svg"}]))}])
