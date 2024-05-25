(ns kaleidoscope.ui.events.core-test
  (:require [cljs.test :refer-macros [deftest is]]
            [kaleidoscope.ui.events.core :as c]
            [matcher-combinators.standalone :as sa]))

(deftest set-active-panel
  (is (sa/match? {:loading? true, :active-panel :home}
                 (c/set-active-panel {} [nil :home]))))
