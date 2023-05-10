# Setting up JSX module interop with CLJS
Some of the kaleidoscope-ui components are written in Javascript and JS.  These
components need to be incorporated into the Shadow build in order to get
hot-code reloading in Storybook.

## Transpiling JSX to JS

From `kaleidoscope-ui` root, watch the JSX files and transpile them to JS.  We
want to transpile them into the `kaleidoscope-js` output folder because that
folder already has a `package.json` file we can use to install the files as a
`node_module`.

``` sh
npx babel src/kaleidoscope-js --out-dir kaleidoscope-js --watch
```

## Install the transpiled library
`kaleidoscope-js/package.json` will allow us to install the JS as if it were a
local library.  Installing this as a local lib allows shadow to require the
files in CLJS using normal JS-interop in the namespace `ns` delcaration.

Install the library locally
``` sh
npm install ./kaleidoscope-js
```

## Require and use the node_module

``` clojure
(ns kaleidoscope.ui.components.example
  (:require ["kaleidoscope-js/ui/components/Example" :refer [myComponent]]))
```
