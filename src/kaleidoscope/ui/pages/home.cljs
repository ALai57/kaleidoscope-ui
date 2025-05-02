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
            [goog.date.DateTime :as gdatetime]
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

(def DISTANCE-PER-YEAR
  300)

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
       "I'm currently a Software Engineering Manager at "
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

(defn section-header
  [& children]
  [typography {:variant "h5" :component "span" :sx {:padding     "5px"
                                                    :font-weight "bold"}}
   children])

(defn section-content
  [& children]
  [typography {:sx {:padding "5px"
                    :color   "#888888"}}
   children])


(def MONTH-YEAR
  "ex. February 2023"
  "MMMM, yyyy")

(defn format-date
  [date-fmt s]
  (try
    (let [formatter (new goog.i18n.DateTimeFormat date-fmt)]
      (.format formatter (gdatetime/fromIsoString s)))
    (catch js/Object _e
      "Couldn't format date")))

(def events
  [{:year    (format-date MONTH-YEAR (.toISOString (new js/Date)))
    :until   (format-date MONTH-YEAR (.toISOString (new js/Date)))
    :since   "Oct, 2024"
    :icon    freshpaint
    :content [:div
              [section-header "Software Engineering Manager @ " [:a {:href "https://www.freshpaint.io"} "Freshpaint"]]
              [divider]
              [section-content "I manage a team of Engineers building out the next generation of Freshpaint Products. We specialize in bringing new Product ideas from 0 to 1."]
              [:br]
              [:ul
               [:li [section-content
                     (str "Working on a HIPAA-compliant platform "
                          "that connects multiple data sources (EHR, Marketing/Advertising, etc) so that Marketers and Advertisers can drive more conversions "
                          "for every dollar they spend. So far we've seen 20% cost reductions using our Offline Attributions algorithms to "
                          "improve advertisement targeting. ")]]
               [:li
                [section-content
                 "Developed a HIPAA-Compliant Analytics alternative to Google Analytics 4."]]]
              ]}
   {:year    2024
    :until   "Oct, 2024"
    :since   "Sept, 2023"
    :icon    freshpaint
    :content [:div
              [section-header "Senior Software Engineer @ " [:a {:href "https://www.freshpaint.io"} "Freshpaint"]]
              [divider]
              [section-content "Freshpaint used a Project-based engagement model. I worked on several Projects to develop new Product ideas and improve our platform."]
              [:br]
              ;; Add bullet points
              [:ul
               [:li [section-content "Built out the first version of the HIPAA compliant Map product. For some time, the product drove ~20% of Freshpaint's revenue."]]
               [:li [section-content "Developed an Observability tool that told the story of how Freshpaint processed events (Event Verification). This helped build trust for our external users and speed up debugging for internal users."]]
               [:li [section-content "Conducted Product/Market Research for a new Freshpaint Product line, designed and prototyped integrations with EMRs (HL7 & FHIR). This directly led to the Ad Performance product. "]]
               ]
              ]}
   {:year    2023
    :until   "Sept, 2023"
    :since   "Dec, 2022"
    :icon    splash
    :content [:div
              [section-header "Engineering Team Lead @ " [:a {:href "https://www.splashfinancial.com"} "Splash Financial"]]
              [divider]
              [section-content "I managed the Lender Onboarding Team (4 Engineers) as we built software that shortened customer time-to-value. "]
              [:div]
              [section-content
               (str "Splash planned to increase revenue by bringing more Lenders onto their platform, but the Lending platform didn't support quickly onboarding new Lenders. "
                    "We replaced the old Monolithic, hard-coded configuration (Lending Rules & Documents) with microservices that allowed internal users to quickly get Lenders "
                    "on the platform. Per Lender, these systems decreased Engineering onboarding time from ~3 weeks to ~3 days.")]]}
   {:year    2022
    :until   "Dec, 2022"
    :since   "June, 2021"
    :icon    splash
    :content [:<>
              [section-header "Senior Software Engineer @ " [:a {:href "https://www.splashfinancial.com"} "Splash Financial"]]
              [divider]
              [section-content
               (str "Migrated Splash's Rate and Eligibility calculations from PHP/Laravel Monolith to Clojure Microservices. "
                    "Built CSV ingest system and data processing pipelines to support Credit Union Lenders that "
                    "had custom, in-house operational processes before loan disbursement. ")]
              ]}
   {:year    2021
    :until   "June, 2021"
    :since   "Jan, 2019"
    :icon    oppfi
    :content [:div
              [section-header "Software Engineer @ " [:a {:href "https://www.oppfi.com"} "Opportunity Financial"]]
              [divider]
              [section-content
               (str "At OppFi, the Clojure team used a strong pairing and shared ownership model. I worked on a suite of microservices that included "
                    "Lending Rules, Credit Decisioning, integrations with consumer report providers (IBV and Credit Reports), Observability/Auditing and more. "
                    )]
              [:br]
              [section-content
               (str
                "Our microservice portfolio included Clojure, Python and Scala, built primarily on ECS and Lambda. Through our work, we enhanced the company's ability to "
                "detect fraud, apply custom machine-learning credit decisioning, and introspect/audit our loan processing.")]
              ]}
   {:year    2019
    :until   "Jan, 2019"
    :since   "March 2018"
    :icon    oppfi
    :content [:<>
              [section-header "Business Operations Associate @ " [:a {:href "https://www.oppfi.com"} "Opportunity Financial"]]
              [divider]
              [section-content
               (str "My primary focus was on the health of our Loan Processing pipeline (between loan application and loan origination). "
                    "While in this role, I wore several different hats, including Analyst, Product Owner, and Engineer. ")]
              [:br]
              [section-content
               (str "I analyzed our loan processing data and logs, identified processes to improve areas of high attrition, and executed "
                    "projects to improve the pipeline. ")]
              ]}
   {:year    2018
    :until   "Jan 2018"
    :since   "Aug 2013"
    :icon    nu
    :content [:<>
              [section-header "PhD in Biomedical Engineering @ " [:a {:href "https://northwestern.edu"} "Northwestern University"]]
              [divider]
              [section-content
               (str "For my Doctoral Thesis, I studied stroke survivors and two possible mechanisms relating to their movement impairments. "
                    "I used Shear Wave Elastography to study changes in muscle elasticity, and EMG to study changes in muscle's electrical properties post-stroke. "
                    )]
              [:br]
              [section-content
               (str "While studying muscle's mechanical properties, "
                    "I performed a sensitivity analysis and measured how sensitive my measurements were to changes in experimental setup. "
                    "I found that muscle activity played the largest role in repeatability; "
                    "this played a large role in how I designed subsequent studies, as it was clear we needed to minimize all sources of stimulation (even bright lights or the need to use the restroom) "
                    "is known to cause stroke survivors' muscle's to activate."
                    )]
              [section-content
               (str "Using a Hierarchical Linear Mixed Model, I found evidence of significant differences in the elasticity of stroke survivors' muscles post-stroke. "
                    )]
              [:br]

              [:br]
              [section-content
               (str "The second part of my thesis was based on the electrical properties of muscle. "
                    "Muscles are controlled by a pool of Motor Units (Neuron + Muscle fibers), and these Motor Units normally activate in an orderly and predictable fashion to generate force. "
                    "I decomposed muscle's electrical signals (sEMG decomposition) to analyze how the Motor Unit pool became disorganized after stroke. "
                    "I found evidence of a disorganized Motor Unit pool in several muscles post-stroke. "
                    )]
              [section-content
               [:a {:href "https://search.library.northwestern.edu/permalink/01NWU_INST/p285fv/cdi_proquest_journals_1984962358"}
                "Neural and Biomechanical Mechanisms of Movement Impairment in Stroke Survivors"]]]}
   {:year    2016
    :icon    nu
    :content [:div
              [section-header "Fellowship @ " [:a {:href "https://lead.northwestern.edu/our-approach/"} "Northwestern University Center for Leadership"]]
              [divider]
              [section-content
               (str "In the Leadership Fellowship, I studied several theories and models of Leadership with ~10 other Fellows "
                    "and spent ~100 hours coaching Undergraduate student leaders.")]
              ]}
   {:year    2013
    :until   "Aug, 2013"
    :since   "Sept, 2011"
    :icon    nu
    :content [:<>
              [section-header "MS in Biomedical Engineering @ " [:a {:href "https://northwestern.edu"} "Northwestern University"]]
              [divider]
              [section-content
               "For my Master's Thesis, I studied how the nervous system coordinates complex motion and force production. "
               "I simulated muscle activity and muscle tuning curves using Optimal Control theory and compared the results to experimental data gathered in the lab. "
               "I found that the Optimal Control optimization strategy predicted inter-muscular coordination patterns well (using NMF/dimensionality reduction), "
               "and a sensitivity "
               "analysis showed that the results were largely insensitive to small perturbations in simluation setup. "
               ]
              ]}
   {:year    2011
    :until   "May, 2011"
    :since   "Aug, 2007"
    :icon    lafayette
    :content [:<>
              [section-header "BS in Chemical Engineering @ " [:a {:href "https://lafayette.edu"} "Lafayette College"]]
              [divider]
              [section-content
               (str "I chose a major that I thought would be an academic challenge. I liked Chemistry and building "
                    "and decided to major in Chemical Engineering. I played Ultimate Frisbee, got my worst grade in Experiencing Opera (which I still listen to) "
                    "and found out that counting (Combinatorics) can get extremely complicated. "
                    )]
              [section-content
               (str "I was pretty interested in Engineering pedagogy and thought I might want to become a Professor. "
                    "I did an independent study in Engineering Pedagogy, which included Maslow's hierachy of needs, models of mastery, etc.")]
              ]}
   {:year    2010
    :icon    air
    :content [:<>
              [section-header "Chemical Engineering Internship @ " [:a {:href "https://airliquide.com"} "Air Liquide"]]
              [divider]
              [section-content
               (str "Was selected as a Society for Chemical Industry (SCI) scholar, and chose Air Liquide as a summer internship. "
                    "At Air Liquide, I worked on a calculator that computed the amount of refrigerant necessary for a truck to transport goods "
                    "at a given temperature. "
                    "I also studied solubility properties of a gas in oil.")
               ]
              ]}
   {:year    2006
    :icon    dunkin
    :content [:<>
              [section-header "Dunkin Donuts"]
              [divider]
              [typography "High school job"]
              [section-content "I was having fun and thought 'why not include my whole work history?'"]
              ]}
   {:year    2005
    :content [:<>
              [section-header "Acton Children's Discovery Museum"]
              [divider]
              [typography "High school job"]
              [section-content "I was having fun and thought 'why not include my whole work history?'"]
              ]}
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
   #_[timeline-connector #_{:sx {:height "20px"}}]
   [timeline-dot {:color "primary" :variant "outlined" :sx {:background-color "black"}}
    (or icon me)]
   [timeline-connector {:sx {:height (str (* dt spacing-per-year) "px")}}]])


(defn resume []
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
       (for [{:keys [year since until icon content dt] :as event} w-deltas]
         [timeline-item {:key year
                         :sx  {:left "-6%"}}
          [timeline-opposite-content {:variant "h2"
                                      :flex    0.3}
           (or until year)
           (when since
             [typography {:variant "h4"}
              (str "Since: " since)])]
          [connector icon dt DISTANCE-PER-YEAR]
          [timeline-content {:sx {:padding "5px"
                                  :flex    1}}
           content
           [:br]
           [:br]
           ]
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
                [resume]]
          )]
       ])))
