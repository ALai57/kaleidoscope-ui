goog.provide('kaleidoscope.ui.components.slider');
kaleidoscope.ui.components.slider.value_slider = (function kaleidoscope$ui$components$slider$value_slider(p__23706){
var map__23707 = p__23706;
var map__23707__$1 = cljs.core.__destructure_map(map__23707);
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23707__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23707__$1,new cljs.core.Keyword(null,"title","title",636505583));
var initial_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23707__$1,new cljs.core.Keyword(null,"initial-value","initial-value",470619381));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23707__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23707__$1,new cljs.core.Keyword(null,"max","max",61366548));
var v = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = initial_value;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})());
var on_change__$1 = (function (){var or__5045__auto__ = on_change;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (function (){
return null;
});
}
})();
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"200px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,title], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.slider,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(v),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
var new_val = kaleidoscope.ui.utils.events.event_value(event);
cljs.core.reset_BANG_(v,new_val);

return (on_change__$1.cljs$core$IFn$_invoke$arity$1 ? on_change__$1.cljs$core$IFn$_invoke$arity$1(new_val) : on_change__$1.call(null,new_val));
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.input,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(v),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
var new_val = kaleidoscope.ui.utils.events.event_value(event);
cljs.core.reset_BANG_(v,new_val);

return (on_change__$1.cljs$core$IFn$_invoke$arity$1 ? on_change__$1.cljs$core$IFn$_invoke$arity$1(new_val) : on_change__$1.call(null,new_val));
}),new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"42px"], null),new cljs.core.Keyword(null,"inputProps","inputProps",1208237697),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"type","type",1174270348),"number"], null)], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.slider.js.map
