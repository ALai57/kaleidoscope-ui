(ns kaleidoscope.ui.clients.leonardo
  "A CLJS wrapper for the Leonardo adaptive color generation library"
  (:require ["@adobe/leonardo-contrast-colors" :as lcc]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Specs
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def Color
  [:map
   [:name :string]
   [:color-keys [:sequential :string]]
   [:ratios [:sequential :number]]])

(def Theme
  [:map
   [:colors [:sequential Color]]
   [:backgroundColor Color]
   [:lightness :int]])

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; API wrapper
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn make-color
  [color]
  (new lcc/Color (clj->js color)))

(defn make-background
  [color]
  (new lcc/BackgroundColor (clj->js color)))

(defn make-theme
  [color]
  (new lcc/Theme (clj->js color)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Presets
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(def GRAY
  (make-color {:name      "gray",
               :colorKeys ["#bababa"],
               :ratios    [2, 3, 4.5, 8]}))

(def BACKGROUND
  (make-background {:name      "bg",
                    :colorKeys ["#bababa"],
                    :ratios    [2, 3, 4.5, 8]}))

(def THEME
  (make-theme {:colors          [GRAY]
               :backgroundColor BACKGROUND
               :lightness       97}))


(js/console.log "GRAY" GRAY)
(js/console.log "THEME" THEME)