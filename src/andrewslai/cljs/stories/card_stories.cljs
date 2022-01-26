(ns andrewslai.cljs.stories.card-stories
  (:require [andrewslai.cljs.article-cards :as article-cards]
            [andrewslai.cljs.stories.helper :as helper]
            [reagent.core :as reagent]))

(def ^:export default
  (helper/->default {:title     "A Card Component"
                     :component article-cards/make-card
                     :args      {:input {:title        "An example"
                                         :article_url  "https://andrewslai.com"
                                         :article_id   "1"
                                         :timestamp    "2022-01-01T00:00:00"
                                         :article_tags "research"}}}))

(defn ^:export article-cards
  [args]
  (let [params (-> args helper/->params)
        input  (:input params)]
    (reagent/as-element
     [article-cards/make-card input])))
