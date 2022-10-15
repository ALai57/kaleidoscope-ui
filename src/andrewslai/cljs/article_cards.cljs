(ns andrewslai.cljs.article-cards
  (:require ["react" :as react]
            ["react-bootstrap" :as react-bootstrap]
            ["@styled-icons/remix-fill/GitBranch" :refer [GitBranch]]
            [clojure.string :as str]
            [re-frame.core :refer [subscribe]]
            [reagent.core :as reagent :refer [adapt-react-class]]
            [reagent-mui.components :refer [card card-action-area
                                            accordion accordion-details accordion-summary
                                            button]]
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
  [{:keys [article-tags title article-url article-id created-at] :as article}]
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
      [:p.card-text created-at]]]]])

(defn truncate
  [title chars-per-row rows]
  (let [chars (* chars-per-row rows)]
    (if (<= (count title) chars)
      (str title "\n")
      (apply str (concat (take (- chars 3) title) ["..."])))))

(defn log-click
  [event]
  (println "Clicked thin article card"))

(defn article-branch
  [on-click branch-name]
  [button {:variant   "contained"
           :startIcon (reagent/create-element GitBranch #js {:width "20px"})
           :style     {:borderRadius    "35px"
                       :backgroundColor "#ba59db"}
           :onClick   on-click}
   branch-name])

(defn thin-article-card
  "For displaying an article's lineage and branches"
  ([article]
   (thin-article-card article {:n-rows 2}))
  ([{:keys [article-tags title article-url article-id created-at] :as article}
    {:keys [n-rows on-click] :as options
     :or   {n-rows   2
            on-click log-click}}]
   [accordion
    [accordion-summary
     [card {:class "text-white bg-light thin-article-card zoom-card-icon"}
      [card-action-area
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
             created-at]]]]]]]
    [accordion-details
     [article-branch (fn [event]
                       (on-click article))
      "main"]]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Full display of all cards
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn thin-content-cards
  [{:keys [recent-content on-click]}]
  [:div {:style {:max-width "500px"}}
   (for [{:keys [title] :as content} recent-content]
     ^{:key title} [thin-article-card content {:on-click on-click}])])

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
