(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip link divider]]
            [reagent.core :as reagent]
            ))

(def ROW-CONFIG
  {:direction "row"
   :sx        {:padding {:xs "2px"
                         :sm "5px"
                         :md "10px"
                         :lg "10px"
                         :xl "10px"}}})

(def BREAKPOINTS
  {:p    2 ;; padding
   :xs   12
   :sm   12
   :md   11
   :lg   11
   :xl   8})

(defn icon [{:keys [tooltip-text src]}]
  [tooltip {:title tooltip-text}
   [icon-button {:sx {:padding {:xs "2px"
                                :sm "5px"
                                :md "8px"
                                :lg "8px"
                                :xl "10px"}
                      :width  {:xs   "30px"
                               :sm   "50px"
                               :md   "70px"
                               :lg   "90px"
                               :xl   "90px"}
                      :height {:xs   "30px"
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

    [grid (merge BREAKPOINTS {:item true})
     [typography {:variant "h2"}
      "Andrew Lai | Software Engineering Lead"]]

    [grid (merge BREAKPOINTS
                 {:item true
                  :sx   {:text-align "left"}})
     [box {:display "block"}
      [box {:component "img"
            :sx        {:max-width  {:xs "40%"
                                     :sm "40%"
                                     :md "50%"}
                        :max-height "50%"
                        :float      "left"
                        :padding    {:xs "5px"
                                     :sm "5px"
                                     :md "7px"}
                        :content    {:xs "url(/static/images/andrew-lai-small.png)"
                                     :sm "url(/static/images/andrew-lai-small.png)"
                                     :md "url(/static/images/andrew-lai.jpeg)"
                                     :lg "url(/static/images/andrew-lai.jpeg)"
                                     :xl "url(/static/images/me-tree.png)"
                                     }}}]]

     [typography {:variant "body1"}
      (str "Welcome to my website! On this site, I write about ")
      [link {:href    "#/archive"
             :variant "body1"}
       "things I'm thinking about personally or professionally"]
      ", and I use this site to practice and refine how I build software."]

     [:br]
     [:br]

     [typography {:variant "body1"
                  :align   "left"}
      "As a professional, I'm driven by the love of solving technical problems, working with focused and empathetic teams, building and learning."]

     [:br]
     [:br]

     [typography {:variant "body1"}
      "I'm currently a Software Engineering team lead at "
      [link {:href    "https://freshpaint.io"
             :variant "body1"}
       "Freshpaint.io"]
      ", where I'm working on a platform that enables healthcare marketers/advertisers while protecting patient privacy. "]

     [:br]
     [:br]]

    ;; Tech stack
    [grid (merge BREAKPOINTS
                 {:item true})
     [stack ROW-CONFIG
      [paper {:elevation 8
              :sx        {:width  "50%"
                          :margin {:xs "5px"
                                   :sm "5px"}}}
       [stack {:direction "column"
               :width     "100%"}
        [typography {:variant "h5"}
         "Languages I use"]

        [:br]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Go" :src "/static/images/golang.svg"}]]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Clojure" :src "/static/images/clojure-logo-2.svg"}]]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Clojurescript" :src "/static/images/cljs.svg"}]
         [icon {:tooltip-text "Shadow CLJS" :src "/static/images/shadow-cljs.png"}]
         [icon {:tooltip-text "Reframe" :src "/static/images/re-frame.png"}]]

        [stack ROW-CONFIG
         [icon {:tooltip-text "Javascript" :src "/static/images/javascript.svg"}]
         [icon {:tooltip-text "Typescript" :src "/static/images/typescript.svg"}]
         [icon {:tooltip-text "React" :src "/static/images/react.svg"}]
         [icon {:tooltip-text "Material UI" :src "/static/images/material-ui-logo.svg"}]
         [icon {:tooltip-text "Storybook" :src "/static/images/storybook-icon.svg"}]]

        [stack ROW-CONFIG
         [icon {:tooltip-text "Terraform" :src "/static/images/terraform.png"}]]]]

      [paper {:elevation 8
              :sx        {:width  "50%"
                          :margin {:xs "5px"
                                   :sm "5px"}}}
       [stack {:direction "column"
               :width     "100%"}
        [typography {:variant "h5"}
         "Tools I use"]

        [:br]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Swagger/Open API" :src "/static/images/swagger.png"}]
         [icon {:tooltip-text "Open Telemetry" :src "/static/images/otel.svg"}]]

        [stack ROW-CONFIG
         [icon {:tooltip-text "AWS" :src "/static/images/aws.svg"}]
         [icon {:tooltip-text "Sumologic" :src "/static/images/sumo.svg"}]
         [icon {:tooltip-text "Grafana Loki" :src "/static/images/grafana.svg"}]
         [icon {:tooltip-text "Bugsnag" :src "/static/images/bugsnag.svg"}]]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Keycloak" :src "/static/images/keycloak-logo.png"}]]
        [stack ROW-CONFIG
         [icon {:tooltip-text "Docker" :src "/static/images/docker.png"}]]]]]]

    [grid (merge BREAKPOINTS
                 {:item true})
     [divider {:flexItem true}]
     [stack ROW-CONFIG
      [typography {:variant "h3"}
       "Other"]
      [typography {:variant "body1"}
       " When I'm not working or thinking about software, you can find me learning new recipes, practicing Spanish, playing board games, or spending time outdoors. "
       " I'll also occasionally dance Tango socially, but it's been a while!"]]]]

   ])
