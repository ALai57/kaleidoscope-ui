(ns kaleidoscope.ui.pages.about-this-site
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip link]]
            [reagent.core :as reagent]
            ))

(def ROW-CONFIG
  {:direction "row"
   :sx        {:padding {:xs "2px"
                         :sm "5px"
                         :md "10px"
                         :lg "10px"
                         :xl "10px"}}})

(defn icon [{:keys [tooltip-text src]}]
  [tooltip {:title tooltip-text}
   [icon-button {:sx {:padding {:xs "2px"
                                :sm "5px"
                                :md "8px"
                                :lg "8px"
                                :xl "10px"}
                      :width  {:xs   "40px"
                               :sm   "50px"
                               :md   "70px"
                               :lg   "90px"
                               :xl   "90px"}
                      :height {:xs   "40px"
                               :sm   "50px"
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


(defn about-this-site [{:keys [user notification-type]}]
  [:div {:style {:min-height "100vh"}}
   [nav/nav-bar {:user              user
                 :notification-type notification-type}]
   [:br]
   [grid {:container      true
          :display        "flex"
          :justifyContent "center"
          :alignItems     "center"
          :align          "center"
          :xs             12
          :sm             12
          :md             12
          :lg             12
          :xl             12}

    [grid {:item true
           :p    2
           :xs   12
           :sm   11
           :md   10
           :lg   8
           :xl   6}
     [stack {:direction "column"}
      [typography {:variant "body1"}
       "This website is hosted on the "
       [link {:variant "body1"
              :href    "https://github.com/ALai57/kaleidoscope"}
        "kaleidoscope.pub"]
       " project. Kaleidoscope.pub is an open source CMS that's under active development."
       ]

      [:br]
      [typography {:variant "body1"}
       "Kaleidoscope.pub is a content publishing platform that allows users to selectively share their content only with users they select, like family or friends."]

      [:br]
      [stack ROW-CONFIG
       [paper {:elevation 8
               :sx        {:width  "50%"
                           :margin "10px"}}
        [stack {:direction "column"
                :width     "100%"
                :padding   "10px"}
         [typography {:variant "h5"}
          "Built With"]

         [:br]
         [stack ROW-CONFIG
          [icon {:tooltip-text "Clojure" :src "/static/images/clojure-logo-2.svg"}]
          [icon {:tooltip-text "Clojurescript" :src "/static/images/cljs.svg"}]
          [icon {:tooltip-text "Javascript" :src "/static/images/javascript.svg"}]
          [icon {:tooltip-text "Terraform" :src "/static/images/terraform.png"}]
          ]

         [stack ROW-CONFIG
          [icon {:tooltip-text "Storybook" :src "/static/images/storybook-icon.svg"}]
          [icon {:tooltip-text "Swagger/Open API" :src "/static/images/swagger.png"}]
          [icon {:tooltip-text "Open Telemetry" :src "/static/images/otel.svg"}]]

         ;;
         [stack ROW-CONFIG
          [icon {:tooltip-text "React" :src "/static/images/react.svg"}]
          [icon {:tooltip-text "Material UI" :src "/static/images/material-ui-logo.svg"}]
          [icon {:tooltip-text "Shadow CLJS" :src "/static/images/shadow-cljs.png"}]
          [icon {:tooltip-text "Reframe" :src "/static/images/re-frame.png"}]]]]

       [paper {:elevation 8
               :sx        {:width  "50%"
                           :margin "10px"}}
        [stack {:direction "column"
                :width     "100%"
                :padding   "10px"}
         [typography {:variant "h5"}
          "Deployed with"]

         [:br]
         [stack ROW-CONFIG
          [icon {:tooltip-text "AWS" :src "/static/images/aws.svg"}]]
         [stack ROW-CONFIG
          [icon {:tooltip-text "Sumologic" :src "/static/images/sumo.svg"}]
          [icon {:tooltip-text "Grafana Loki" :src "/static/images/grafana.svg"}]
          [icon {:tooltip-text "Bugsnag" :src "/static/images/bugsnag.svg"}]]
         [stack ROW-CONFIG
          [icon {:tooltip-text "Keycloak" :src "/static/images/keycloak-logo.png"}]]
         [stack ROW-CONFIG
          [icon {:tooltip-text "Docker" :src "/static/images/docker.png"}]]
         ]]]]]]])
