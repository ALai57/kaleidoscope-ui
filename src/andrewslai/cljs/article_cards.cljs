(ns andrewslai.cljs.article-cards
  (:require ["react" :as react]
            ["react-bootstrap" :as react-bootstrap]
            [clojure.string :as str]
            [re-frame.core :refer [subscribe]]
            [reagent.core :refer [adapt-react-class]]
            [reagent-mui.components :refer [card]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Base card
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def Card (adapt-react-class (aget react-bootstrap "Card")))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Card formatting
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn article-tags->icon [article-tags]
  (case article-tags
    "research" "images/nav-bar/neuron-icon.svg"
    "archive" "images/nav-bar/archive-icon.svg"
    "about" "images/nav-bar/andrew-silhouette-icon.svg"
    "thoughts" "images/nav-bar/andrew-head-icon.svg"
    "images/nav-bar/unknown-user.svg"))


(defn make-card
  [{:keys [article_tags title article_url article_id timestamp] :as article}]
  (let [date (first (.split timestamp "T"))]
    ^{:key article_id}
    [card {:class "text-white bg-light mb-3 article-card"}
     [:div.container-fluid
      [:div.row.flex-items-xs-middle
       [:div.col-sm-3.bg-primary.text-xs-center.card-icon
        [:div.p-y-3
         [:h1.p-y-2
          [:img.fa.fa-2x {:src (article-tags->icon article_tags)
                          :style {:width "100%"}}]]]]
       [:div.col-sm-9.bg-light.text-dark.card-description
        [:h5.card-title>a {:href (str "#/" article_tags
                                      "/content/" article_url)}
         title]
        [:p.card-text date]]]]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Full display of all cards
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn recent-content-cards
  [args]
  [:div#recent-content
   [:div#recent-article-cards.card-group
    (map make-card (:recent-content args))]])

(defn recent-content-display
  [content-type]
  (let [recent-content @(subscribe [:recent-content])
        the-content (if content-type
                      (filter #(= (:article_tags %1) content-type)
                              recent-content)
                      recent-content)]
    [recent-content-cards {:recent-content the-content}]))
