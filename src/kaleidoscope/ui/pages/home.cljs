(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography icon-button tooltip link divider
                                            toggle-button-group toggle-button
                                            stepper step-label step-content step]]
            [reagent-mui.lab.timeline :refer [timeline]]
            [reagent-mui.lab.timeline-connector :refer [timeline-connector]]
            [reagent-mui.lab.timeline-item :refer [timeline-item]]
            [reagent-mui.lab.timeline-dot :refer [timeline-dot]]
            [reagent-mui.lab.timeline-separator :refer [timeline-separator]]
            [reagent-mui.lab.timeline-content :refer [timeline-content]]
            [reagent-mui.lab.timeline-opposite-content :refer [timeline-opposite-content]]
            ["@mui/lab/TimelineOppositeContent" :as MuiTimelineOppositeContent]
            [kaleidoscope.ui.utils.events :as events]
            ["@styled-icons/boxicons-regular/CodeBlock"    :refer [CodeBlock]]
            ["@styled-icons/boxicons-regular/Rocket"       :refer [Rocket]]
            [reagent.core :as r]
            ))

(def ROW-CONFIG
  {:direction "row"
   :sx        {:padding {:xs "2px"
                         :sm "5px"
                         :md "10px"
                         :lg "10px"
                         :xl "10px"}}})

(def BREAKPOINTS
  {:p  2                                                    ;; padding
   :xs 12
   :sm 12
   :md 11
   :lg 10
   :xl 8})

(def GRID-CONTAINER
  {:container      true
   :display        "flex"
   :justifyContent "center"
   :alignItems     "center"
   :align          "center"
   :xs             12
   :sm             12
   :md             12
   :lg             12
   :xl             12})

(defn icon [{:keys [tooltip-text src]}]
  [tooltip {:title tooltip-text}
   [icon-button {:sx {:padding {:xs "2px"
                                :sm "5px"
                                :md "8px"
                                :lg "8px"
                                :xl "10px"}
                      :width   {:xs "50px"
                                :sm "60px"
                                :md "70px"
                                :lg "90px"
                                :xl "90px"}
                      :height  {:xs "50px"
                                :sm "60px"
                                :md "70px"
                                :lg "90px"
                                :xl "90px"}}}
    [box {:component      "img"
          :display        "flex"
          :justifyContent "center"
          :alignItems     "center"
          :sx             {:max-width  "100%"
                           :max-height "100%"}
          :src            src}]]])

(defn me-image
  []
  [box {:display "block"}
   [box {:component "img"
         :sx        {:max-width {:xs "40%"
                                 :sm "40%"
                                 :md "50%"}
                     :float     "left"
                     :padding   {:xs "5px"
                                 :sm "5px"
                                 :md "7px"}
                     :content   {:xs "url(/static/images/andrew-lai-small.png)"
                                 :sm "url(/static/images/andrew-lai-small.png)"
                                 :md "url(/static/images/andrew-lai.jpeg)"
                                 :lg "url(/static/images/andrew-lai.jpeg)"
                                 :xl "url(/static/images/me-tree.png)"}}}]])

(defn me-personal []
  [:<>
   [typography {:variant "body1"}
    (str "Welcome to my website! On this site, I write about ")
    [link {:href    "#/archive"
           :variant "body1"}
     "things I'm thinking about personally or professionally"]
    ", and I use this site to practice and refine how I build software."]

   [:br]
   [:br]
   [typography {:variant "body1"}
    " When I'm not working or thinking about software, you can find me learning new recipes, practicing Spanish, playing board games, or spending time outdoors. "
    " I'll also occasionally dance Tango socially, but it's been a while!"]])

(defn me-professional
  []
  [grid GRID-CONTAINER
   [grid (merge BREAKPOINTS
                {:item true})
    [divider {:flexItem true}]
    [grid (merge BREAKPOINTS
                 {:item true})
     [typography {:variant "h4"}
      "Software Engineering Leader"]
     [:<>
      [typography {:variant "body1"}
       "As a professional, I'm driven by the love of solving technical problems, working with excellent teams, building and learning."]

      [:br]
      [:br]

      [typography {:variant "body1"}
       "I'm currently a Software Engineering team lead at "
       [link {:href    "https://freshpaint.io"
              :variant "body1"}
        "Freshpaint.io"]
       ", where I'm working on a platform that enables healthcare marketers to advertise in a privacy-first, HIPAA-compliant way. "]
      [:br]
      [:br]]

     ]]]
  )

(defn skills []
  [:<>
   [grid {:item true
          :xs   11
          :sm   11
          :md   5
          :lg   5
          :xl   4}
    [paper {:elevation 8
            :sx        {:margin {:xs "5px"
                                 :sm "5px"}}}
     [stack {:direction "column"
             :width     "100%"}
      [typography {:variant "h4"}
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
       [icon {:tooltip-text "Terraform" :src "/static/images/terraform.png"}]]]]]
   [grid {:item true
          :xs   11
          :sm   11
          :md   5
          :lg   5
          :xl   4}
    [paper {:elevation 8
            :sx        {:margin {:xs "5px"
                                 :sm "5px"}}}
     [stack {:direction "column"
             :width     "100%"}
      [typography {:variant "h4"}
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
       [icon {:tooltip-text "Docker" :src "/static/images/docker.png"}]]]]]
   ])

(def freshpaint [:img {:src "/static/images/freshpaint.svg" :height "40px"}])
(def oppfi [:img {:src "/static/images/opploans-logo.svg" :height "40px"}])
(def splash [:img {:src "/static/images/splash-logo.svg" :height "40px"}])
(def nu [:img {:src "/static/images/n-logo.svg" :height "40px"}])
(def lafayette [:img {:src "/static/images/lafayette-logo.svg" :height "40px"}])
(def dunkin [:img {:src "/static/images/dunkin.jpg" :height "40px"}])
(def air [:img {:src "/static/images/air-liquide.ico" :height "40px"}])
(def me [:img {:src "/static/images/my-silhouette.svg" :height "40px"}])

(def events
  [{:year    2024
    :icon    freshpaint
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Software Engineering Manager @ " [:a {:href "https://www.freshpaint.io"} "Freshpaint"]]
              [typography {:sx {:padding "5px"}}
               (str "I manage a team of Engineers building out the next generation of Freshpaint Products. So far, we've "
                    "developed a HIPAA-Compliant Web Analytics platform similar to Google Analytics 4, and we're working on an Offline Attributions algorithm "
                    "to improve Ad Performance.")]]}
   {:year    2023
    :icon    freshpaint
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Senior Software Engineer @ " [:a {:href "https://www.freshpaint.io"} "Freshpaint"]]
              [typography {:sx {:padding "5px"}}
               (str "I built out the first version of the HIPAA compliant Map product, developed the Event Verification tool "
                    "and worked on several integrations with Advertising Platforms (e.g. Adobe Analytics, Intercom).")]
              ]}
   {:year    2022
    :icon    splash
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Engineering Team Lead @ " [:a {:href "https://www.splashfinancial.com"} "Splash Financial"]]]}
   {:year    2021
    :icon    splash
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Senior Software Engineer @ " [:a {:href "https://www.splashfinancial.com"} "Splash Financial"]]]}
   {:year  2019
    :icon    oppfi
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Software Engineer @ " [:a {:href "https://www.oppfi.com"} "Opportunity Financial"]]]}
   {:year  2018
    :icon    oppfi
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Business Operations Associate @ " [:a {:href "https://www.oppfi.com"} "Opportunity Financial"]]]}
   {:year  2016
    :icon    nu
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "Fellowship @ " [:a {:href "https://lead.northwestern.edu/our-approach/"} "Northwestern University Center for Leadership"]]]}
   {:year  2013
    :icon    nu
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "PhD in Biomedical Engineering @ " [:a {:href "https://northwestern.edu"} "Northwestern University"]]
              [typography {:sx {:padding "5px"}}
               [:a {:href "https://search.library.northwestern.edu/permalink/01NWU_INST/p285fv/cdi_proquest_journals_1984962358"}
                "Neural and Biomechanical Mechanisms of Movement Impairment in Stroke Survivors"]]]}
   {:year  2011
    :icon    nu
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}}
               "MS in Biomedical Engineering @ " [:a {:href "https://northwestern.edu"} "Northwestern University"]]]}
   {:year  2010
    :icon    air
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}} "Chemical Engineering Internship"]
              [typography {:sx {:padding "5px"}}
               "Air Liquide"]]}
   {:year  2007
    :icon    lafayette
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}} "BS in Chemical Engineering"]
              [typography {:sx {:padding "5px"}}
               "Lafayette College"]]}
   {:year  2006
    :icon    dunkin
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}} "Dunkin Donuts"]
              [typography "High school job"]]}
   {:year  2005
    :content [:<>
              [typography {:variant "h5" :component "span" :sx {:padding "5px"}} "Acton Children's Discovery Museum"]
              [typography "High school job"]]}
   ])

(defn add-deltas [events ]
  (let [deltas (map (fn [{last-year :year}  {this-year :year}]
                      (- this-year last-year))
                    (drop 1 events)
                    events)]
    (map (fn [event delta]
           (assoc event :dt delta))
         events
         (concat deltas [0]))))

(def timeline-class
  MuiTimelineOppositeContent/timelineOppositeContentClasses.root)

;;(r/create-element Rocket #js {:color "#3e3eb1" :height "100px"})
(defn connector [icon dt spacing-per-year]
  [timeline-separator
   [timeline-connector {:sx {:height "20px"}}]
   [timeline-dot {:color "primary" :variant "outlined" :sx {:background-color "black"}}
    (or icon me)]
   [timeline-connector {:sx {:height (str (* dt spacing-per-year) "px")}}]])


(defn resume-2 []
  (let [w-deltas (add-deltas events)]
    [grid GRID-CONTAINER
     [grid (merge BREAKPOINTS
                  {:item true
                   :sx   {:padding "0px"}})
      [timeline {:position "right"
                 ;; Align timeline left or right
                 :sx       {:padding "0px"
                            ;;(str "& ." timeline-class) {:flex 0.2}
                            }
                 }
       (for [{:keys [year icon content dt] :as event} w-deltas]
         [timeline-item {:key year
                         :sx  {:left "-6%"}}
          [timeline-opposite-content {:variant "h2"
                                      :flex    0.3}
           year]
          [connector icon dt 180]
          [timeline-content {:sx {:padding "5px"
                                  :flex    1}}
           content]
          ]
         )
       ]]])
  )

(defn home [{:keys [user notification-type]}]
  (let [toggle-state (r/atom "cv")]
    (fn []
      [:div {:style {:min-height "100vh"}}
       [nav/nav-bar {:user              user
                     :notification-type notification-type}]
       [:br]

       ;; About me
       [grid GRID-CONTAINER
        [grid (merge BREAKPOINTS {:item true})
         [typography {:variant "h2"}
          "Andrew Lai"]
         [toggle-button-group {:color     "primary"
                               :value     @toggle-state
                               :exclusive true
                               :on-change (fn [ev]
                                            ;;(js/console.log (events/event-value ev))
                                            (reset! toggle-state (events/event-value ev)))}
          [toggle-button {:value "personal"} "Personal"]
          [toggle-button {:value "professional"} "Professional"]
          [toggle-button {:value "cv"} "CV"]
          ]]

        (case @toggle-state
          "personal" [grid (merge BREAKPOINTS
                                  {:item true
                                   :sx   {:text-align "left"}})
                      [me-image]
                      [me-personal]]
          "professional" [grid GRID-CONTAINER
                          [me-professional]
                          [skills]]
          "cv" [grid GRID-CONTAINER
                [resume-2]]
          )]
       ])))
