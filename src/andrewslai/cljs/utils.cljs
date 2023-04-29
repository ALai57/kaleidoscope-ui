(ns andrewslai.cljs.utils
  (:require [clojure.string :as str]
            [andrewslai.cljs.components.notification-card :as n-card]
            [goog.string :as gstr]
            [goog.date.DateTime :as gdatetime]
            [goog.i18n.DateTimeFormat :as gdatetimefmt]
            [reagent.core :as r]
            [shadow.lazy :as lazy]))

(defn image->blob [the-bytes]
  (let [data-blob (js/Blob. #js [the-bytes] #js {:type "image/png"})]
    (.createObjectURL js/URL data-blob)))

;; https://github.com/fricze/code-splitting-clojurescript/blob/master/src/main/demo/util.cljs
(defn lazy-component [loadable]
  (fn [{:keys [fallback] :as props}]
    (let [component (r/atom (or fallback (fn []
                                           [:p "Loading"])))
          _         (-> (lazy/load loadable)
                        (.then (fn [root-el]
                                 (reset! component root-el))))]
      (fn [props]
        [@component props]))))

(defn clojurize
  [x]
  (js->clj x :keywordize-keys true))

(defn unescape
  "https://github.com/reagent-project/reagent/issues/413"
  [s]
  (and s (gstr/unescapeEntities s)))

;;
;; Date utilities
;;
(defn date
  [iso-string]
  (first (str/split iso-string #"T")))

(def yyyy-MM
  "ex. 2022-01-01"
  "yyyy-MM")

(def MONTH-YEAR
  "ex. February 2023"
  "MMMM, yyyy")

(def MONTH-DAY-YEAR
  "ex. Feb 28, 2022"
  goog.i18n.DateTimeFormat.Format.MEDIUM_DATE)

(def MONTH-DAY
  "ex. Feb 28"
  "MMM dd")

(defn format-date
  [date-fmt s]
  (let [formatter (new goog.i18n.DateTimeFormat date-fmt)]
    (.format formatter (gdatetime/fromIsoString s))))

(defn err-boundary
  "https://lilac.town/writing/modern-react-in-cljs-error-boundaries/"
  [& children]
  (let [err-state (r/atom nil)]
    (r/create-class
     {:display-name        "ErrBoundary"
      :component-did-catch (fn [err msg]
                             (reset! err-state {:error   err
                                                :message (ex-message msg)}))
      :reagent-render      (fn [& children]
                             (if (nil? @err-state)
                               (into [:<>] children)
                               [:div {:style {:margin  "10px"
                                              :display "flex"}}
                                [n-card/notification-card {:level   "error"
                                                           :title   "Error loading 3D scene!"
                                                           :message (:message @err-state)}]]))})))
