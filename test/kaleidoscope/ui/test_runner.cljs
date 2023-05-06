(ns kaleidoscope.ui.test-runner
  (:require [kaleidoscope.ui.core-test]
            [kaleidoscope.ui.events.articles-test]
            [kaleidoscope.ui.events.core-test]
            [kaleidoscope.ui.events.projects-portfolio-test]
            [cljs-test-display.core]
            [figwheel.main.testing :refer-macros [run-tests]]))

(enable-console-print!)

(run-tests (cljs-test-display.core/init! "app-testing")
           'kaleidoscope.ui.core-test
           'kaleidoscope.ui.events.core-test
           'kaleidoscope.ui.events.articles-test
           'kaleidoscope.ui.events.projects-portfolio-test)
