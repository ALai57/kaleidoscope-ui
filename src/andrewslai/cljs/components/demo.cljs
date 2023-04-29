(ns andrewslai.cljs.components.demo
  (:require ["@react-three/fiber" :as fiber]
            ["@react-three/drei" :as drei]
            ["react" :as react]
            [reagent.core :as reagent]
            [andrewslai.cljs.utils :as u]
            ))

#_(defn rotate!
    [ref [dx dy dz]]
    (set! (.. ref -rotation -x) (+ dx (.. ref -rotation -x)))
    (set! (.. ref -rotation -y) (+ dy (.. ref -rotation -y)))
    (set! (.. ref -rotation -z) (+ dz (.. ref -rotation -z))))

#_(defn x
    [ref]
    (.-x (.-position ref)))

#_(defn y
    [ref]
    (.-y (.-position ref)))

#_(defn box
    [props]
    ;; Something about the reagent model interrupts and triggers a re-render
    ;; which seems incompatible with the useFrame animation hook.
    (let [[clicked? set-click] (react/useState false)
          [hovered? set-hover] (react/useState false)
          !myref   (atom nil)]
      (fiber/useFrame (fn [state delta]
                        ;;(js/console.log @!myref (.-x (.-rotation @!myref)))
                        (rotate! @!myref [delta 0 0])))
      [:mesh (merge props
                    {:scale           (if clicked? 1.5 1)
                     :on-click        (fn [event] (set-click (not clicked?)))
                     :on-pointer-out  (fn [event] (set-hover false))
                     :on-pointer-over (fn [event] (set-hover true))
                     :ref             (fn [el] (reset! !myref el))})
       [:boxGeometry {:args [1 1 1]}]
       [:meshStandardMaterial {:color (if hovered? "hotpink" "orange")}]]))

#_(defn sphere
    [props]
    ;; Something about the reagent model interrupts and triggers a re-render
    ;; which seems incompatible with the useFrame animation hook.
    (let [[clicked? set-click]      (react/useState false)
          [hovered? set-hover]      (react/useState false)
          [direction set-direction] (react/useState 1)
          !myref                    (atom nil)]
      (fiber/useFrame (fn [state delta]
                        ;;(js/console.log @!myref)
                        (cond
                          (< -0.5 (x @!myref) 0.5) true
                          (< 0.5 (x @!myref))      (set-direction -1)
                          (< (x @!myref) -0.5)     (set-direction 1))
                        (translate! @!myref [(* direction delta) 0 0])))
      [:mesh (merge props
                    {:scale           (if clicked? 1.5 1)
                     :on-click        (fn [event] (set-click (not clicked?)))
                     :on-pointer-out  (fn [event] (set-hover false))
                     :on-pointer-over (fn [event] (set-hover true))
                     :ref             (fn [el] (reset! !myref el))})
       [:sphereBufferGeometry {:args [0.2 24 24]}]
       [:meshStandardMaterial {:color (if hovered? "hotpink" "orange")}]]))

#_(defn demo
    []
    [:> fiber/Canvas {:style  {:height     "700px"
                               :background "black"}
                      :camera {:position [0 1 0]
                               :target   [20 0 0]}}
     [:ambientLight {:intensity 0.2}]
     [:spotLight {:position  [10 10 10]
                  :intensity 0.5
                  :angle     0.15
                  :penumbra  1}]
     [:f> box {:position [-1.2 0 0]}]
     [:f> box {:position [1.2  0 0]}]
     [:f> sphere {:position [0 0 0]}]
     [:> drei/OrbitControls]])

(defn scale!
  [^js scene [x y z :as scale]]
  (.set (.-scale scene) x y z))

(def PI
  js/Math.PI)

(defn deg->rad
  [deg]
  (/ (* PI deg)
     180))

(defn rotate!
  [^js scene [x y z :as rotation]]
  (.set (.-rotation scene) (deg->rad x) (deg->rad y) (deg->rad z)))

(defn translate!
  [^js scene [dx dy dz]]
  (let [x (.. scene -position -x)
        y (.. scene -position -y)
        z (.. scene -position -z)]
    (js/console.log x y z dx dy dz)
    (set! (.. scene -position -x) (+ dx x))
    (set! (.. scene -position -y) (+ dy y))
    (set! (.. scene -position -z) (+ dz z))))

(defn book
  []
  (let [gltf  (drei/useGLTF "/corporis-fabrica/scene.gltf")
        scene (.-scene gltf)]
    ;;(js/console.log "********************")
    ;;(js/console.log (.. gltf -scene -position -x))
    ;;(js/console.log gltf)
    ;;(js/console.log "********************")
    [:primitive {:object   (doto scene
                             (rotate!    [0 -90  0])
                             (scale!     [3   3  3])

                             (translate! [0 100  0])
                             )
                 :position [0 0 0]}]))

(drei/useGLTF.preload "/corporis-fabrica/scene.gltf")

(defn demo
  []
  [u/err-boundary
   [:> fiber/Canvas {:style  {:height     "700px"
                              :background "black"}
                     :camera {:position [0 1 0]
                              :target   [20 0 0]}}
    [:ambientLight {:intensity 0.2}]
    [:spotLight {:position  [10 10 10]
                 :intensity 0.5
                 :angle     0.15
                 :penumbra  1}]
    [:> react/Suspense {:fallback (fn [& args]
                                    [:p "Loading Canvas"])}
     [:f> book]]
    ;;[:f> box {:position [-1.2 0 0]}]
    ;;[:f> box {:position [1.2  0 0]}]
    ;;[:f> sphere {:position [0 0 0]}]
    [:> drei/OrbitControls]]])
