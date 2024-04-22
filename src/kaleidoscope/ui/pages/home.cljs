(ns kaleidoscope.ui.pages.home
  (:require [kaleidoscope.ui.components.navbar :as nav]
            [reagent-mui.components :refer [box grid paper stack typography]]
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
         "Built with"]]
       [stack {:direction "column"
               :sx        {:width "50%"}}
        [typography {:variant "h4"}
         "Deployed with"]]
       ]
      ]]]

   ])
