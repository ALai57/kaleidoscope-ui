(ns kaleidoscope.ui.events.core-test
  (:require [kaleidoscope.ui.events.core :as c]
            [cljs.test :refer-macros [deftest is]]
            [matcher-combinators.standalone :as sa]))

(deftest set-active-panel
  (is (sa/match? {:loading? true, :active-panel :home}
                 (c/set-active-panel {} [nil :home]))))