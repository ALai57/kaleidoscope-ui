goog.provide('kaleidoscope.ui.components.radio_group');
kaleidoscope.ui.components.radio_group.handle_change = (function kaleidoscope$ui$components$radio_group$handle_change(state,event){
var new_value = event.target.value;
cljs.core.reset_BANG_(state,new_value);

return new_value;
});
kaleidoscope.ui.components.radio_group.basic_radio_group = (function kaleidoscope$ui$components$radio_group$basic_radio_group(p__43245){
var map__43246 = p__43245;
var map__43246__$1 = cljs.core.__destructure_map(map__43246);
var group_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43246__$1,new cljs.core.Keyword(null,"group-name","group-name",-232140110));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43246__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var elements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43246__$1,new cljs.core.Keyword(null,"elements","elements",657646735));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__43246__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),cljs.core.identity);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.form_control,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.form_label,group_name], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.radio_group,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(state),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
var G__43247 = kaleidoscope.ui.components.radio_group.handle_change(state,event);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__43247) : on_change.call(null,G__43247));
})], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$radio_group$basic_radio_group_$_iter__43248(s__43249){
return (new cljs.core.LazySeq(null,(function (){
var s__43249__$1 = s__43249;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__43249__$1);
if(temp__5804__auto__){
var s__43249__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__43249__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__43249__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__43251 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__43250 = (0);
while(true){
if((i__43250 < size__5522__auto__)){
var map__43252 = cljs.core._nth(c__5521__auto__,i__43250);
var map__43252__$1 = cljs.core.__destructure_map(map__43252);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43252__$1,new cljs.core.Keyword(null,"value","value",305978217));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43252__$1,new cljs.core.Keyword(null,"label","label",1718410804));
cljs.core.chunk_append(b__43251,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.form_control_label,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"label","label",1718410804),label,new cljs.core.Keyword(null,"control","control",1892578036),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.radio], null))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),label], null)));

var G__43254 = (i__43250 + (1));
i__43250 = G__43254;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__43251),kaleidoscope$ui$components$radio_group$basic_radio_group_$_iter__43248(cljs.core.chunk_rest(s__43249__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__43251),null);
}
} else {
var map__43253 = cljs.core.first(s__43249__$2);
var map__43253__$1 = cljs.core.__destructure_map(map__43253);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43253__$1,new cljs.core.Keyword(null,"value","value",305978217));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43253__$1,new cljs.core.Keyword(null,"label","label",1718410804));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.form_control_label,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"label","label",1718410804),label,new cljs.core.Keyword(null,"control","control",1892578036),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.radio], null))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),label], null)),kaleidoscope$ui$components$radio_group$basic_radio_group_$_iter__43248(cljs.core.rest(s__43249__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(elements);
})()], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.radio_group.js.map
