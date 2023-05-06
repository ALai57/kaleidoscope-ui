(ns kaleidoscope.cljs.test-runner
  (:require [kaleidoscope.cljs.core-test]
            [kaleidoscope.cljs.events.articles-test]
            [kaleidoscope.cljs.events.core-test]
            [kaleidoscope.cljs.events.projects-portfolio-test]
            [cljs-test-display.core]
            [figwheel.main.testing :refer-macros [run-tests]]))

(enable-console-print!)

(run-tests (cljs-test-display.core/init! "app-testing")
           'kaleidoscope.cljs.core-test
           'kaleidoscope.cljs.events.core-test
           'kaleidoscope.cljs.events.articles-test
           'kaleidoscope.cljs.events.projects-portfolio-test)
