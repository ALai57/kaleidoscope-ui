(ns kaleidoscope.ui.components.image-row-box
  (:require [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip link divider]]
            [reagent.core :as reagent]
            ))

(def ROW-CONFIG
  {:direction "row"
   :sx        {:padding {:xs "2px"
                         :sm "5px"
                         :md "10px"
                         :lg "10px"
                         :xl "10px"}}})

(def languages-i-use
  {:title "Languages I use"
   :rows [[{:text "Go" :src "/static/images/golang.svg"}]
          [{:text "Clojure" :src "/static/images/clojure-logo-2.svg"}]
          [{:text "Clojurescript" :src "/static/images/cljs.svg"}
           {:text "Shadow CLJS"   :src "/static/images/shadow-cljs.png"}
           {:text "Reframe"       :src "/static/images/re-frame.png"}]
          [{:text "Javascript"  :src "/static/images/javascript.svg"}
           {:text "Typescript"  :src "/static/images/typescript.svg"}
           {:text "React"       :src "/static/images/react.svg"}
           {:text "Material UI" :src "/static/images/material-ui-logo.svg"}
           {:text "Storybook"   :src "/static/images/storybook-icon.svg"}]
          [{:text "Terraform" :src "/static/images/terraform.png"}]
          ]})

(def tools-i-use
  {:title "Tools I use"
   :rows [[{:text "Swagger/Open API" :src "/static/images/swagger.png"}
           {:text "Open Telemetry"   :src "/static/images/otel.svg"}]
          [{:text "AWS"          :src "/static/images/aws.svg"}
           {:text "Sumologic"    :src "/static/images/sumo.svg"}
           {:text "Grafana Loki" :src "/static/images/grafana.svg"}
           {:text "Bugsnag"      :src "/static/images/bugsnag.svg"}]
          [{:text "Clojurescript" :src "/static/images/cljs.svg"}
           {:text "Shadow CLJS"   :src "/static/images/shadow-cljs.png"}
           {:text "Reframe"       :src "/static/images/re-frame.png"}]
          [{:text "Keycloak" :src "/static/images/keycloak-logo.png"}]
          [{:text "Docker" :src "/static/images/docker.png"}]]})

(defn icon [{:keys [tooltip-text src]}]
  [tooltip {:title tooltip-text}
   [icon-button {:sx {:padding {:xs "2px"
                                :sm "5px"
                                :md "8px"
                                :lg "8px"
                                :xl "10px"}
                      :width  {:xs   "50px"
                               :sm   "60px"
                               :md   "70px"
                               :lg   "90px"
                               :xl   "90px"}
                      :height {:xs   "50px"
                               :sm   "60px"
                               :md   "70px"
                               :lg   "90px"
                               :xl   "90px"}}}
    [box {:component      "img"
          :display        "flex"
          :justifyContent "center"
          :alignItems     "center"
          :sx             {:max-width  "100%"
                           :max-height "100%"}
          :src            src}]]])

(defn image-row-box
  [{:keys [rows title]}]
  [grid {:container true}
   [stack {:direction "column"
           :width     "100%"}
    [typography {:variant "h4"}
     title]
    [:br]
    (for [[row i] (map-indexed (fn [i row]
                                 [row i])
                               rows)]
      ^{:key (str "row-" i)}
      [stack ROW-CONFIG
       (for [{:keys [text src] :as item} row]
         ^{:key (str text src)}
         [icon {:tooltip-text text :src src}])])]])
