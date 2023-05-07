(ns kaleidoscope.ui.stories.article-stories
  (:require [kaleidoscope.ui.article :as article]
            [kaleidoscope.ui.stories.helper :as helper]))

(def ^:export default
  (helper/->default-story
   {:title      "Kaleidoscope/Articles/Article"
    :component  article/article
    :parameters {:docs
                 {:description
                  {:component "The presentation of an Article: one of the
                   Kaleidoscope app's main responsibilities" }}}
    :argTypes   {:article-title {:description  "An article's title"
                                 :defaultValue "An example article"}
                 :author        {:description  "The article's author"
                                 :defaultValue "Andrew Lai"}
                 :modified-at   {:description  "When the article was published"
                                 :defaultValue "2022-01-25T00:00:00"}
                 :content       {:description  "The article itself (in HTML format)"
                                 :defaultValue "<div><h3>Hello</h3></div>"}}
    :args       {:article-title "An example article"
                 :author        "Andrew Lai"
                 :modified-at   "2022-01-25T00:00:00"
                 :content       "<div><h3>This is some formatted content</h3><p>howdy</p><strong>bold</strong></div>"}}))

(def ^:export Example-article
  (clj->js {}))
