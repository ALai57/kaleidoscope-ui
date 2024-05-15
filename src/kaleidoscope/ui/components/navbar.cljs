(ns kaleidoscope.ui.components.navbar
  (:require ["@mui/material/styles" :refer [styled useTheme]]
            [reagent-mui.icons.edit :refer [edit]]
            [reagent-mui.icons.info :refer [info]]
            [goog.string :as gstr]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [dispatch]]
            [reagent-mui.components :refer [app-bar avatar box container toolbar]]))

(def IMAGE-SIZE
  {:xs "46px"
   :sm "60px"
   :md "80px"
   :lg "80px"
   :xl "100px"})

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
              :sx       {:height     {:xs "52px"
                                      :sm "80px"
                                      :md "100px"
                                      :lg "100px"
                                      :xl "120px"}
                         :background (gstr/format "linear-gradient(4deg, %s 40%, %s 100%)"
                                                  (get-in palette [:primary :light])
                                                  (get-in palette [:accent :main]))}}
     [container {:max-width "xl"}
      [toolbar {:disable-gutters true}
       [:> zoom-icon {:href "#/home"}
        [box {:component "img"
              :src       "static/images/nav-bar/favicon.svg"
              :sx        {:max-width  "90px"
                          :float      "right"
                          :margin-top {:xs "2px"
                                       :sm "10px"}
                          :width      IMAGE-SIZE
                          :height     IMAGE-SIZE}
              :on-click  navigate-home!}]]
       ;; Spacing - before this goes left and after goes right
       [box {:sx {:flex-grow 1}}]
       [box {:sx {:max-height "100%"}}
        icons]]]]))

(defn avatar-icon
  [{:keys [user src href]} & children]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [:> zoom-icon {:href href}
     (into [avatar (cond-> {:alt       (if user (:firstName user) "Not logged in")
                            :sx        {:padding     {:xs "6px"
                                                      :sm "8px"
                                                      :md "8px"
                                                      :lg "8px"
                                                      :xl "8px"}
                                        :marginTop   {:xs "0px"
                                                      :sm "8px"
                                                      :md "8px"
                                                      :lg "8px"
                                                      :xl "8px"}
                                        :width       IMAGE-SIZE
                                        :height      IMAGE-SIZE
                                        :marginLeft  {:xs "4px"
                                                      :sm "5px"
                                                      :md "6px"
                                                      :lg "7px"
                                                      :xl "8px"}
                                        :marginRight {:xs "4px"
                                                      :sm "5px"
                                                      :md "6px"
                                                      :lg "7px"
                                                      :xl "8px"}
                                        :background (gstr/format "linear-gradient(30deg, %s 40%, %s 100%)"
                                                                 (get-in palette [:primary :light])
                                                                 (get-in palette [:accent :main]))}}
                     src (assoc :src src))]
           children)]))

(def ADMIN-ROLE
  (str js/window.location.hostname ":admin"))

(defn nav-bar [{:keys [user]}]
  (let [roles      (set (get-in user [:realm_access :roles]))
        site-admin (contains? roles ADMIN-ROLE)]
    ;;(println "User" (:given_name user) roles)
    ;;(println "Admin? " (contains? roles ADMIN-ROLE))
    [:f> -nav-bar {:icons (cond-> [:<> ]
                            true       (conj [:f> avatar-icon {:user user :href "#/about-this-site"}
                                              [info {:color "white"
                                                     :sx    {:color  "white"
                                                             :width  "100%"
                                                             :height "100%"}}]])
                            true       (conj [:f> avatar-icon {:user user :href "#/admin" :src "static/images/nav-bar/user.svg" }])
                            site-admin (conj [:f> avatar-icon {:user user :href "#/manager"}
                                              [edit {:color "white"
                                                     :sx    {:color  "white"
                                                             :width  "100%"
                                                             :height "100%"}}]])
                            true       (conj [:f> avatar-icon {:user user :href "#/archive" :src "static/images/nav-bar/articles.svg"}])
                            )}]))
