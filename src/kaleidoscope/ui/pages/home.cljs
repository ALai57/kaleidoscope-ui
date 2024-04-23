(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip]]
            [reagent.core :as reagent]
            ))

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
      [stack {:direction "row"}
       [stack {:direction "column"
               :sx        {:width "50%"}}
        [typography {:variant "h4"}
         "Built with"]

        [:br]
        ;; Languages
        [stack {:direction "row"
                :padding   "10px"}
         [tooltip {:title "Clojure"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/clojure-logo-2.svg"}]]]
         [tooltip {:title "Clojurescript"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/cljs.svg"}]]]
         [tooltip {:title "Javascript"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/javascript.svg"}]]]]

        [stack {:direction "row"
                :padding   "10px"}
         [tooltip {:title "Storybook"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/storybook-icon.svg"}]]]
         [tooltip {:title "Swagger/Open API"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/swagger.png"}]]]
         [tooltip {:title "Open Telemetry"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/otel.svg"}]]]]

        ;;
        [stack {:direction "row"
                :padding   "10px"}
         [tooltip {:title "React"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/react.svg"}]]]
         [tooltip {:title "Material UI"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/material-ui-logo.svg"}]]]
         [tooltip {:title "Shadow CLJS"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/shadow-cljs.png"}]]]
         [tooltip {:title "Reframe"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/re-frame.png"}]]]]

        ]
       [stack {:direction "column"
               :sx        {:width "50%"}
               :padding   "10px"}
        [typography {:variant "h4"}
         "Deployed with"]

        [stack {:direction "row"}
         [tooltip {:title "AWS"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/aws.svg"}]]]]
        [stack {:direction "row"}
         [tooltip {:title "Sumologic"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/sumo.svg"}]]]
         [tooltip {:title "Grafana Loki"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/grafana.svg"}]]]
         [tooltip {:title "Bugsnag"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/bugsnag.svg"}]]]]
        [stack {:direction "row"}
         [tooltip {:title "Keycloak"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/keycloak-logo.png"}]]]]
        [stack {:direction "row"}
         [tooltip {:title "Docker"}
          [icon-button {:sx {:width  "100px"
                             :height "100px"}}
           [box {:component      "img"
                 :display        "flex"
                 :justifyContent "center"
                 :alignItems     "center"
                 :sx             {:max-width  "100%"
                                  :max-height "100%"}
                 :src            "/static/images/docker.png"}]]]]

        ]]
      ]]]

   ])
