(ns kaleidoscope.ui.components.article-cards
  (:require ["react" :as react]
            ["@mui/material/styles" :refer [useTheme]]
            ["@styled-icons/remix-fill/GitBranch" :refer [GitBranch]]
            [kaleidoscope.ui.utils.core :as u]
            [reagent.core :as reagent]
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
  [{:keys [article-tags article-title article-url article-id created-at summary] :as article}]
  (let [palette (:palette (u/clojurize (useTheme)))]
    [card {:class "text-white bg-light mb-3 article-card"}
     [:div.container-fluid
      [:div.row
       [:div.text-xs-center.card-icon {:style {:background (gstr/format "linear-gradient(30deg, %s 6%, %s 100%)"
                                                                        (get-in palette [:primary :main])
                                                                        (get-in palette [:accent :main]))}}
        [:div.p-y-2
         [:h1.p-y-2
          [:img.fa.fa-2x {:src   (article-tags->icon article-tags)
                          :style {:width "100%"}}]]]]
       [:div.col-sm-9.text-dark.card-description
        [:h5.card-title>a {:href (gstr/format "#/content/%s" article-url)}
         article-title]
        [:p.card-text (u/date created-at)]
        [:p.card-text summary]]]]]))


(defn truncate
  [article-title chars-per-row rows]
  (let [chars (* chars-per-row rows)]
    (if (<= (count article-title) chars)
      (str article-title "\n")
      (apply str (concat (take (- chars 3) article-title) ["..."])))))

(defn log-click
  [event]
  (println "Clicked thin article card"))

(defn article-branch
  [{:keys [on-click style]}
   branch-name]
  [button {:variant   "contained"
           :startIcon (reagent/create-element GitBranch #js {:width "20px"})
           :style     (merge style {:borderRadius "35px"})
           :onClick   on-click}
   branch-name])

(defn latest
  [coll]
  (if (empty? coll)
    nil
    (apply max coll)))

(defn thin-article-card
  "For displaying an article's lineage and branches"
  ([article]
   (thin-article-card article {:n-rows 2}))
  ([{:keys [article-tags article-url article-title article-id branches] :as article}
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
           (truncate article-title 33 n-rows)
           #_[:a {:href  (gstr/format "#/%s/content/%s" article-tags article-url)
                  :title title}
              (truncate title 33 n-rows)]]
          [:p.card-text {:style {:color "darkgray"}}
           (let [published-at (latest (keep :published-at branches))
                 created-at   (latest (keep :created-at branches))]
             ;;(js/console.log "PUBLISHED AT" (format-date published-at))
             ;;(js/console.log "CREATED AT" created-at)
             (cond
               published-at (gstr/format "PUB: %s" (u/format-date u/MONTH-DAY-YEAR published-at))
               created-at   (gstr/format "NEW: %s" (u/format-date u/MONTH-DAY-YEAR created-at))))
           ]]]]]]]
    [accordion-details
     (for [{:keys [branch-name branch-id]} branches]
       ^{:key branch-name} [article-branch {:on-click (fn [event]
                                                        (on-click (assoc article
                                                                         :branch-name branch-name
                                                                         :branch-id   branch-id)))}
                            branch-name])]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Full display of all cards
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn thin-content-cards
  [{:keys [branches on-click]}]
  (let [grouped-branches (reduce-kv (fn [acc m xs]
                                      (conj acc (assoc m :branches (map #(select-keys % [:branch-name :branch-id :created-at :published-at]) xs))))
                                    []
                                    (group-by #(select-keys % [:article-id :author :article-url :article-title :article-tags]) branches))]
    ;;(println "GROUPED BRANCHES" grouped-branches)
    [:div {:style {:max-width "500px"}}
     (for [{:keys [branches article-id] :as content} grouped-branches]
       ^{:key (gstr/format "%s-%s" branches article-id)}
       [thin-article-card content {:on-click on-click}])]))

(defn recent-content-cards
  [{:keys [recent-content]}]
  [:div#recent-content {:style {:display         "grid"
                                :justify-content "center"}}
   [:div#recent-article-cards.card-group
    (for [article (reverse (sort-by :published-at recent-content))]
      ^{:key (str article)} [:f> article-card article])]])
