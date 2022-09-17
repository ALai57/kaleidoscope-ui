(ns andrewslai.cljs.components.editor
  (:require ["@tinymce/tinymce-react" :as tmce]
            [taoensso.timbre :refer-macros [info]]
            [reagent.core :as reagent]))


(def tinymce
  (reagent/adapt-react-class tmce/Editor))

(defn basic-editor
  [{:keys []}]
  [tinymce {:initial-value "<p>Hello</p>"
            :init {:height 500
                   :menubar true
                   :plugins ["advlist autolink lists link image charmap print preview anchor"
                             "searchreplace visualblocks code fullscreen"
                             "insertdatetime media table paste code help wordcount"]
                   :toolbar (str "undo redo | formatselect | bold italic backcolor | "
                                 "alignleft aligncenter alignright alignjustify | "
                                 "bullist numlist outdent indent | removeformat | help")}}])
