(ns andrewslai.cljs.article-cards
  (:require ["react" :as react]
            ["react-bootstrap" :as react-bootstrap]
            [clojure.string :as str]
            [re-frame.core :refer [subscribe]]
            [reagent.core :refer [adapt-react-class]]
            [reagent-mui.components :refer [card]]
            [goog.string :as gstr]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Card formatting
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn article-tags->icon [article-tags]
  (case article-tags
    "research" "images/nav-bar/neuron-icon.svg"
    "archive"  "images/nav-bar/archive-icon.svg"
    "about"    "images/nav-bar/andrew-silhouette-icon.svg"
    "thoughts" "images/nav-bar/andrew-head-icon.svg"
    "images/nav-bar/unknown-user.svg"))

(defn article-card
  [{:keys [article-tags title article-url article-id timestamp] :as article}]
  [card {:class "text-white bg-light mb-3 article-card"}
   [:div.container-fluid
    [:div.row.flex-items-xs-middle
     [:div.col-sm-3.bg-primary.text-xs-center.card-icon
      [:div.p-y-3
       [:h1.p-y-2
        [:img.fa.fa-2x {:src (article-tags->icon article-tags)
                        :style {:width "100%"}}]]]]
     [:div.col-sm-9.bg-light.text-dark.card-description
      [:h5.card-title>a {:href (gstr/format "#/%s/content/%s" article-tags article-url)}
       title]
      [:p.card-text timestamp]]]]])

(defn truncate
  [title chars-per-row rows]
  (let [chars (* chars-per-row rows)]
    (if (<= (count title) chars)
      (str title "\n")
      (apply str (concat (take (- chars 3) title) ["..."])))))

;; SELECT not from href, instead use something else. Also have cards zoom/pop
;; when hovered
(defn thin-article-card
  ([article]
   (thin-article-card article {:n-rows 2}))
  ([{:keys [article-tags title article-url article-id timestamp] :as article}
    {:keys [n-rows] :as options
     :or   {n-rows 2}}]
   [card {:class "text-white bg-light thin-article-card zoom-card-icon"
          :sx    {:width 1}}
    [:div.container-fluid {:style {:padding "0px"
                                   :height  "50px"}}
     [:div.row.flex-items-xs-middle {:style {:margin "0px"}}
      [:div.col-sm-1.bg-primary.text-xs-center.thin-card-icon {:style {:padding "0px"}}
       [:img.fa.fa-2x {:src   (article-tags->icon article-tags)
                       :style {:width      "100%"
                               :max-height "50px"
                               :padding    "3px"
                               :height     "100%"}}]]
      [:div.col.bg-light.text-dark.thin-card-description
       [:h6 {:style {:margin "0px"}}
        (truncate title 33 n-rows)
        #_[:a {:href  (gstr/format "#/%s/content/%s" article-tags article-url)
               :title title}
           (truncate title 33 n-rows)]]
       #_[:p.card-text {:style {:color "darkgray"}}
          timestamp]]]]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Full display of all cards
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn thin-content-cards
  [{:keys [recent-content]}]
  [:div
   (for [{:keys [title] :as content} recent-content]
     ^{:key title} [thin-article-card content])])

(defn recent-content-cards
  [{:keys [recent-content]}]
  [:div#recent-content
   [:div#recent-article-cards.card-group
    (for [{:keys [title] :as content} recent-content]
      ^{:key title} [article-card content])]])

(defn recent-content-display
  [content-type]
  (let [recent-content @(subscribe [:recent-content])
        the-content (if content-type
                      (filter #(= (:article-tags %1) content-type)
                              recent-content)
                      recent-content)]
    [recent-content-cards {:recent-content the-content}]))
