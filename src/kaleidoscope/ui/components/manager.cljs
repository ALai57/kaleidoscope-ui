(ns kaleidoscope.ui.components.manager
  (:require [goog.string :as gstr]
            ["@mui/material/styles" :refer [useTheme]]
            [kaleidoscope.ui.utils.core :as u]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent-mui.components :refer [box paper
                                            card
                                            card-action-area
                                            card-media
                                            card-content
                                            container
                                            typography]]
            [reagent-mui.icons.group-add :refer [group-add]]
            [reagent.core :as reagent]))

(def CAPABILITIES
  [{:name        "Articles"
    :description "Create and manage Articles"
    :src         "/images/writing.svg"
    :alt         "Manage articles"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/article-manager"]))}
   {:name        "Images (WIP)"
    :description "Create and manage Images. Not implemented yet!"
    :alt         "Manage images"
    :src         "/images/images.svg"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/image-manager"]))}
   {:name        "Audiences (WIP)"
    :description "Control who has access to your content by defining an Audience"
    :src         "/images/audiences.svg"
    :alt         "Manage audiences"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/groups"]))
    }
   {:name        "UI Customization (WIP)"
    :description "Customize the look and feel of the site"
    :src         "/images/audiences.svg"
    :alt         "Manage UI Customization"
    :on-click    (fn [] (dispatch [:set-hash-fragment "/ui-manager"]))
    }
   ])

(defn manager-card
  [{:keys [name src alt on-click description] :as capability}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [box {:sx {:display          "flex"
               "& > :not(style)" {:m      1
                                  :width  256
                                  :height 256}}}
     [card {:elevation 10}
      [card-action-area {:on-click on-click
                         :sx       {"& > :not(style)" {:m             1
                                                       :height        "100%"
                                                       :width         "auto"
                                                       :margin-left   "auto"
                                                       :margin-right  "auto"
                                                       :margin-top    "5px"
                                                       :margin-bottom "5px"}
                                    "&"               {:border-radius "0px"
                                                       :background (gstr/format "linear-gradient(15deg, %s 30%, %s 100%)"
                                                                                (get-in palette [:primary :light])
                                                                                (get-in palette [:accent :main]))}
                                    }}
       [card-media {:component "img"
                    :src       src
                    :alt       alt
                    :sx        {:max-width      "100%"
                                :max-height     "142px"}}]]
      [card-content
       [typography {:variant "h5"}
        name]
       [typography {:variant "body2"
                    :color   "text.secondary"}
        description]]
      ]]))

(defn manager-cards
  []
  [container
   [:div {:style {:display         "flex"
                  :flex-wrap       "wrap"
                  :flex-direction  "row"
                  :justify-content "center"}}
    (for [capability CAPABILITIES]
      ^{:key (:name capability)} [:f> manager-card capability])]])
