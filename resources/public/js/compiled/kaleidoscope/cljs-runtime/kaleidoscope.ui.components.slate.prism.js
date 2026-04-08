goog.provide('kaleidoscope.ui.components.slate.prism');
goog.scope(function(){
  kaleidoscope.ui.components.slate.prism.goog$module$goog$object = goog.module.get('goog.object');
});
var module$kaleidoscope$ui$components$slate$prism=shadow.js.require("module$kaleidoscope$ui$components$slate$prism", {});
var module$node_modules$prism_react_renderer$dist$index=shadow.js.require("module$node_modules$prism_react_renderer$dist$index", {});
var module$node_modules$prism_react_renderer$themes$dracula$index=shadow.js.require("module$node_modules$prism_react_renderer$themes$dracula$index", {});
kaleidoscope.ui.components.slate.prism.PRISM = module$kaleidoscope$ui$components$slate$prism;
/**
 * A react component that can be used to highlight raw HTML code
 */
kaleidoscope.ui.components.slate.prism.HighlightHTML = module$node_modules$prism_react_renderer$dist$index.default;
kaleidoscope.ui.components.slate.prism.DRACULA = module$node_modules$prism_react_renderer$themes$dracula$index.default;
/**
 * Make the Javascript input to `getTokenProps`
 */
kaleidoscope.ui.components.slate.prism.__GT_token_props = (function kaleidoscope$ui$components$slate$prism$__GT_token_props(c,token){
return ({"token": cljs.core.clj__GT_js(token), "key": ["token-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('')});
});
kaleidoscope.ui.components.slate.prism.token_props__GT_hiccup = (function kaleidoscope$ui$components$slate$prism$token_props__GT_hiccup(token_props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.utils.core.clojurize(token_props),new cljs.core.Keyword(null,"children","children",-940561982),kaleidoscope.ui.utils.core.unescape),new cljs.core.Keyword(null,"className","className",-1983287057),(function (x){
return ["prism-token ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)].join('');
}))], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.slate.prism.js.map
