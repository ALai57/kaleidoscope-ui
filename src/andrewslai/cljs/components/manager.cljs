(ns andrewslai.cljs.components.manager
  (:require [reagent.core :as reagent]
            [reagent-mui.icons.group-add :refer [group-add]]
            [reagent-mui.components :refer [box paper
                                            card
                                            card-action-area
                                            card-media
                                            card-content
                                            typography]]
            [re-frame.core :refer [dispatch subscribe]]))

(def CAPABILITIES
  [{:name        "Articles"
    :description "Create and manage Articles"
    :src         "/images/writing.svg"
    :alt         "Manage articles"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/editor"]))}
   {:name        "Images (WIP)"
    :description "Create and manage Images. Not implemented yet!"
    :alt         "Manage images"
    :src         "/images/images.svg"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/home"]))}
   {:name        "Audiences (WIP)"
    :description "Control who has access to your content by defining an Audience"
    :src         "/images/audiences.svg"
    :alt         "Manage audiences"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/groups"]))
    }])

(defn manager-card
  [{:keys [name src alt on-click description] :as capability}]
  [box {:sx {:display          "flex"
             :flex-wrap        "wrap"
             "& > :not(style)" {
                                :m      1
                                :width  256
                                :height 256}}}
   [card {:elevation 10}
    [card-action-area {:class    "bg-primary"
                       :on-click on-click
                       :sx       {"& > :not(style)" {:m             1
                                                     :height        "70%%"
                                                     :width         "auto"
                                                     :margin-left   "auto"
                                                     :margin-right  "auto"
                                                     :margin-top    "5px"
                                                     :margin-bottom "5px"}}}
     [card-media {:component "img"
                  :src       src
                  :alt       alt}]]
    [card-content
     [typography {:variant "h5"}
      name]
     [typography {:variant "body2"
                  :color   "text.secondary"}
      description]]
    ]])

(defn manager-cards
  []
  [:div {:style {:display "inline-flex"}}
   (for [capability CAPABILITIES]
     ^{:key (:name capability)} [manager-card capability])])
