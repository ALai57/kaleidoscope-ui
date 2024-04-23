(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip]]
            [reagent.core :as reagent]
            ))

(defn icon [{:keys [tooltip-text src]}]
  [tooltip {:title tooltip-text}
   [icon-button {:sx {:width  {:xs   "40px"
                               :sm   "60px"
                               :md   "80px"
                               :lg   "100px"
                               :xl   "100px"}
                      :height {:xs   "40px"
                               :sm   "60px"
                               :md   "80px"
                               :lg   "100px"
                               :xl   "100px"}}}
    [box {:component      "img"
          :display        "flex"
          :justifyContent "center"
          :alignItems     "center"
          :sx             {:max-width  "100%"
                           :max-height "100%"}
          :src            src}]]])


(defn home [{:keys [user notification-type]}]
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
           :p    2 ;; padding
           :xs   6
           :sm   6
           :md   5
           :lg   4
           :xl   4}
     [box {:component      "img"
           :display        "flex"
           :justifyContent "center"
           :alignItems     "center"
           :sx             {:max-width  "100%"
                            :max-height "100%"
                            :content    {:xs "url(/static/images/andrew-lai-small.png)"
                                         :sm "url(/static/images/andrew-lai-small.png)"
                                         :md "url(/static/images/andrew-lai.jpeg)"
                                         :lg "url(/static/images/andrew-lai.jpeg)"
                                         :xl "url(/static/images/me-tree.png)"
                                         }}}]]
    [grid {:item true
           :p    2
           :xs   6
           :sm   6
           :md   5
           :lg   4
           :xl   4}
     [typography
      "Welcome to my website!"]

     [typography
      "I'm a software developer who loves building. I built this site because ..."]]
    [grid {:item true
           :p    2 ;; padding
           :xs   12
           :sm   12
           :md   10
           :lg   10
           :xl   8}
     [paper {:height     60
             :lineHeight "60px"
             :elevation  8}
      [stack {:direction "row" :padding "10px"}
       [stack {:direction "column"
               :sx        {:width "50%"}
               :padding   "10px"}
        [typography {:variant "h4"}
         "Languages I use"]

        [:br]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Go" :src "/static/images/golang.svg"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Clojure" :src "/static/images/clojure-logo-2.svg"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Clojurescript" :src "/static/images/cljs.svg"}]
         [icon {:tooltip-text "Shadow CLJS" :src "/static/images/shadow-cljs.png"}]
         [icon {:tooltip-text "Reframe" :src "/static/images/re-frame.png"}]]

        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Javascript" :src "/static/images/javascript.svg"}]
         [icon {:tooltip-text "Typescript" :src "/static/images/typescript.svg"}]
         [icon {:tooltip-text "React" :src "/static/images/react.svg"}]
         [icon {:tooltip-text "Material UI" :src "/static/images/material-ui-logo.svg"}]
         [icon {:tooltip-text "Storybook" :src "/static/images/storybook-icon.svg"}]]

        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Terraform" :src "/static/images/terraform.png"}]]]
       [stack {:direction "column"
               :sx        {:width "50%"}
               :padding   "10px"}
        [typography {:variant "h4"}
         "Tools I use"]

        [:br]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Swagger/Open API" :src "/static/images/swagger.png"}]
         [icon {:tooltip-text "Open Telemetry" :src "/static/images/otel.svg"}]]

        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "AWS" :src "/static/images/aws.svg"}]
         [icon {:tooltip-text "Sumologic" :src "/static/images/sumo.svg"}]
         [icon {:tooltip-text "Grafana Loki" :src "/static/images/grafana.svg"}]
         [icon {:tooltip-text "Bugsnag" :src "/static/images/bugsnag.svg"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Keycloak" :src "/static/images/keycloak-logo.png"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Docker" :src "/static/images/docker.png"}]]]]
      ]]

    [grid {:item true
           :p    2 ;; padding
           :xs   12
           :sm   12
           :md   10
           :lg   10
           :xl   8}
     [paper {:height     60
             :lineHeight "60px"
             :elevation  8}
      [stack {:direction "row" :padding "10px"}
       [stack {:direction "column"
               :sx        {:width "50%"}
               :padding   "10px"}
        [typography {:variant "h4"}
         "Built with"]

        [:br]
        ;; Languages
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Clojure" :src "/static/images/clojure-logo-2.svg"}]
         [icon {:tooltip-text "Clojurescript" :src "/static/images/cljs.svg"}]
         [icon {:tooltip-text "Javascript" :src "/static/images/javascript.svg"}]
         [icon {:tooltip-text "Terraform" :src "/static/images/terraform.png"}]
         ]

        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Storybook" :src "/static/images/storybook-icon.svg"}]
         [icon {:tooltip-text "Swagger/Open API" :src "/static/images/swagger.png"}]
         [icon {:tooltip-text "Open Telemetry" :src "/static/images/otel.svg"}]]

        ;;
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "React" :src "/static/images/react.svg"}]
         [icon {:tooltip-text "Material UI" :src "/static/images/material-ui-logo.svg"}]
         [icon {:tooltip-text "Shadow CLJS" :src "/static/images/shadow-cljs.png"}]
         [icon {:tooltip-text "Reframe" :src "/static/images/re-frame.png"}]]

        ]
       [stack {:direction "column"
               :sx        {:width "50%"}
               :padding   "10px"}
        [typography {:variant "h4"}
         "Deployed with"]

        [:br]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "AWS" :src "/static/images/aws.svg"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Sumologic" :src "/static/images/sumo.svg"}]
         [icon {:tooltip-text "Grafana Loki" :src "/static/images/grafana.svg"}]
         [icon {:tooltip-text "Bugsnag" :src "/static/images/bugsnag.svg"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Keycloak" :src "/static/images/keycloak-logo.png"}]]
        [stack {:direction "row" :padding "10px"}
         [icon {:tooltip-text "Docker" :src "/static/images/docker.png"}]]

        ]]
      ]]]

   ])
