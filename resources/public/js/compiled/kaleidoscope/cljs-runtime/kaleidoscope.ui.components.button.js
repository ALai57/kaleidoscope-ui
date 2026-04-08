goog.provide('kaleidoscope.ui.components.button');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
kaleidoscope.ui.components.button._button = (function kaleidoscope$ui$components$button$_button(p__18079){
var map__18080 = p__18079;
var map__18080__$1 = cljs.core.__destructure_map(map__18080);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18080__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18080__$1,new cljs.core.Keyword(null,"color","color",1011675173),"primary");
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18080__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var sx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18080__$1,new cljs.core.Keyword(null,"sx","sx",-403071592));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"color","color",1011675173),color,new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click,new cljs.core.Keyword(null,"sx","sx",-403071592),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null))], null),(function (){var or__5045__auto__ = sx;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})()], 0))], null),text], null);
});
kaleidoscope.ui.components.button.button = (function kaleidoscope$ui$components$button$button(args){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.button._button,args], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.button.js.map
