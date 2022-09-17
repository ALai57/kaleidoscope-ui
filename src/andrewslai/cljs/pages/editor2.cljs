(ns andrewslai.cljs.pages.editor2
  (:require [ajax.core :refer [POST]]
            [andrewslai.cljs.navbar :as nav]
            [andrewslai.cljs.events.editor :as ed]
            [goog.object :as gobj]
            [re-frame.core :refer [dispatch subscribe]]
            [reagent.core :as reagent]
            ["slate-react" :as slate-react]
            ["slate" :as slate]))

(defn props->clj
  [props]
  (let [{:keys [node mark] :as p} (js->clj props :keywordize-keys true)]
    (assoc p :text-type (get-type (or node mark)))))

(defn editor []
  (let [section-data (subscribe [:editor-data])
        html (:html @section-data)

        this-editor (atom nil)
        editor-text (atom nil)

        update-editor-ref
        (fn [component]
          (when component (reset! editor-ref-atom component)))

        change-handler
        (fn [change-or-editor]
          (let [new-value (.-value change-or-editor)]
            (reset! editor-text new-value)
            (some-> @this-editor reagent/force-update)
            (dispatch [:editor-text-changed new-value])))]

    (reagent/create-class
     {:display-name "slatejs-editor"
      :component-did-mount (fn [this] (reset! this-editor this))
      :component-will-unmount (fn [this] (reset! this-editor nil))
      :reagent-render (fn [_]
                        [:> sr/Editor
                         {:auto-focus true
                          :class-name "slatejs-text-editor"
                          :id "slatejs-editor-instance-1"
                          :on-change change-handler
                          :on-key-down key-down-handler
                          :render-mark render
                          :render-node render
                          :ref update-editor-ref
                          :value (or @editor-text
                                     @section-data
                                     (blank-value))}])})))

(defn editor-ui []
  (let [{:keys [article_tags title]} @(subscribe [:editor-metadata])]
    [:div
     [:br]
     [:h1 "Editor"]
     [:br]
     [:form {:id "editor-article-form" :class "slatejs-article-editor"}
      [editor]]]))
