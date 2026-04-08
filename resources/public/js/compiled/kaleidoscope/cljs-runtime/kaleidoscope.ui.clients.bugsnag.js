goog.provide('kaleidoscope.ui.clients.bugsnag');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$bugsnag$js$browser$notifier=shadow.js.require("module$node_modules$$bugsnag$js$browser$notifier", {});
var module$node_modules$$bugsnag$plugin_react$dist$bugsnag_react=shadow.js.require("module$node_modules$$bugsnag$plugin_react$dist$bugsnag_react", {});
/**
 * @define {string}
 */
kaleidoscope.ui.clients.bugsnag.BUGSNAG_KEY = goog.define("kaleidoscope.ui.clients.bugsnag.BUGSNAG_KEY","defined-at-compile-time");
kaleidoscope.ui.clients.bugsnag.Bugsnag = module$node_modules$$bugsnag$js$browser$notifier.start(({"apiKey": kaleidoscope.ui.clients.bugsnag.BUGSNAG_KEY, "plugins": cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new module$node_modules$$bugsnag$plugin_react$dist$bugsnag_react())], null)), "appVersion": kaleidoscope.ui.version.VERSION}));
/**
 * Wraps the application with a Bugsnag error boundary
 */
kaleidoscope.ui.clients.bugsnag.ErrorBoundary = kaleidoscope.ui.clients.bugsnag.Bugsnag.getPlugin("react").createErrorBoundary(module$node_modules$react$index);

//# sourceMappingURL=kaleidoscope.ui.clients.bugsnag.js.map
