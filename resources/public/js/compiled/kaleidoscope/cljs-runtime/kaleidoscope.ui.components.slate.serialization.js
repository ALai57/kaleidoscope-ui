goog.provide('kaleidoscope.ui.components.slate.serialization');
var module$node_modules$pretty$index=shadow.js.require("module$node_modules$pretty$index", {});
var module$node_modules$$udecode$plate$dist$index_es=shadow.js.require("module$node_modules$$udecode$plate$dist$index_es", {});
kaleidoscope.ui.components.slate.serialization.serialize = (function kaleidoscope$ui$components$slate$serialization$serialize(editor){
return module$node_modules$$udecode$plate$dist$index_es.serializeHtml(editor,({"nodes": editor.children, "preserveClassNames": ["slate-","slate-code_block","slate-code_line","language","prism-token","prism-","builtin","comment","function","keyword","number","operator","property","punctuation","selector","string","symbol","token"]}));
});
kaleidoscope.ui.components.slate.serialization.PrettyHtml = (function kaleidoscope$ui$components$slate$serialization$PrettyHtml(){
var editor = module$node_modules$$udecode$plate$dist$index_es.useEditorState();
var html = kaleidoscope.ui.components.slate.serialization.serialize(editor);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"r>","r>",-1210228188),kaleidoscope.ui.components.slate.prism.HighlightHTML,({"Prism": kaleidoscope.ui.components.slate.prism.PRISM, "theme": kaleidoscope.ui.components.slate.prism.DRACULA, "code": module$node_modules$pretty$index(html), "language": "jsx"}),(function (args){
var map__16541 = kaleidoscope.ui.utils.core.clojurize(args);
var map__16541__$1 = cljs.core.__destructure_map(map__16541);
var clj_args = map__16541__$1;
var className = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"className","className",-1983287057));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var tokens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"tokens","tokens",-818939304));
var getLineProps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"getLineProps","getLineProps",1049981902));
var getTokenProps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"getTokenProps","getTokenProps",-700661608));
var element = reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),className,new cljs.core.Keyword(null,"style","style",-496642736),style], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,line){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.utils.core.clojurize((function (){var G__16542 = ({"line": line});
return (getLineProps.cljs$core$IFn$_invoke$arity$1 ? getLineProps.cljs$core$IFn$_invoke$arity$1(G__16542) : getLineProps.call(null,G__16542));
})()),new cljs.core.Keyword(null,"key","key",-1516042587),["line-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.components.slate.prism.token_props__GT_hiccup,getTokenProps,kaleidoscope.ui.components.slate.prism.__GT_token_props),line)], null);
}),tokens)], null));
return element;
})], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.slate.serialization.js.map
