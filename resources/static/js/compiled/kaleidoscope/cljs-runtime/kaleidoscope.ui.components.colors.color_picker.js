goog.provide('kaleidoscope.ui.components.colors.color_picker');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$mui$material$Paper$index=shadow.js.require("module$node_modules$$mui$material$Paper$index", {});
var module$node_modules$react_colorful$dist$index_module=shadow.js.require("module$node_modules$react_colorful$dist$index_module", {});
kaleidoscope.ui.components.colors.color_picker.upcase = (function kaleidoscope$ui$components$colors$color_picker$upcase(s){
return s.toUpperCase();
});
kaleidoscope.ui.components.colors.color_picker.Paper = (function (){var G__23705 = (function (obj){
var spacing_fn = obj.theme.spacing;
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"padding","padding",1660304693),(spacing_fn.cljs$core$IFn$_invoke$arity$1 ? spacing_fn.cljs$core$IFn$_invoke$arity$1((2)) : spacing_fn.call(null,(2))),new cljs.core.Keyword(null,"text-align","text-align",1786091845),"center"], null));
});
var fexpr__23704 = module$node_modules$$mui$material$styles$index.styled(module$node_modules$$mui$material$Paper$index.default);
return (fexpr__23704.cljs$core$IFn$_invoke$arity$1 ? fexpr__23704.cljs$core$IFn$_invoke$arity$1(G__23705) : fexpr__23704.call(null,G__23705));
})();
kaleidoscope.ui.components.colors.color_picker.basic_color_picker = (function kaleidoscope$ui$components$colors$color_picker$basic_color_picker(p__23708){
var map__23709 = p__23708;
var map__23709__$1 = cljs.core.__destructure_map(map__23709);
var color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23709__$1,new cljs.core.Keyword(null,"color","color",1011675173));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23709__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_picker.Paper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_colorful$dist$index_module.HexColorPicker,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),color,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),"200px",new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.outlined_input,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"size","size",1098693007),"small",new cljs.core.Keyword(null,"value","value",305978217),color,new cljs.core.Keyword(null,"on-change","on-change",-732046149),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(on_change,kaleidoscope.ui.utils.events.event_value),new cljs.core.Keyword(null,"startAdornment","startAdornment",-811470854),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"background-color","background-color",570434026),color,new cljs.core.Keyword(null,"width","width",-384071477),"50%",new cljs.core.Keyword(null,"height","height",1025178622),"30px"], null)], null)], null))], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_picker.color_picker = (function kaleidoscope$ui$components$colors$color_picker$color_picker(p__23710){
var map__23711 = p__23710;
var map__23711__$1 = cljs.core.__destructure_map(map__23711);
var initial_color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23711__$1,new cljs.core.Keyword(null,"initial-color","initial-color",1935142727));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23711__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var collapsable = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23711__$1,new cljs.core.Keyword(null,"collapsable","collapsable",-1764950761));
var color = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(initial_color);
var open_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(collapsable)?false:true));
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"background-color","background-color",570434026),cljs.core.deref(color),new cljs.core.Keyword(null,"width","width",-384071477),"28px",new cljs.core.Keyword(null,"height","height",1025178622),"28px",new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"8px",new cljs.core.Keyword(null,"border","border",1444987323),"3px solid #fff",new cljs.core.Keyword(null,"box-shadow","box-shadow",1600206755),"0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",new cljs.core.Keyword(null,"cursor","cursor",1011937484),"pointer"], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (_){
if(cljs.core.truth_(collapsable)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(open_QMARK_,cljs.core.not);
} else {
return null;
}
})], null)], null),(cljs.core.truth_(cljs.core.deref(open_QMARK_))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var G__23712 = cljs.core.PersistentArrayMap.EMPTY;
if(cljs.core.truth_(collapsable)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([G__23712,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"z-index","z-index",1892827090),(1000)], null)], null)], 0));
} else {
return G__23712;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.deref(color),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_color){
return cljs.core.reset_BANG_(color,kaleidoscope.ui.components.colors.color_picker.upcase(new_color));
})], null)], null)], null):null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.colors.color_picker.js.map
