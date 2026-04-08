goog.provide('reagent_mui.x.data_grid');
var module$node_modules$$mui$x_data_grid$index=shadow.js.require("module$node_modules$$mui$x_data_grid$index", {});
reagent_mui.x.data_grid.data_grid = (function reagent_mui$x$data_grid$data_grid(params__24070__auto__){
var with_let44219 = reagent.ratom.with_let_values(new cljs.core.Keyword(null,"with-let44219","with-let44219",-1857273964));
var temp__5808__auto___44262 = reagent.ratom._STAR_ratom_context_STAR_;
if((temp__5808__auto___44262 == null)){
} else {
var c__22191__auto___44263 = temp__5808__auto___44262;
if((with_let44219.generation === c__22191__auto___44263.ratomGeneration)){
if(reagent.debug.has_console){
((reagent.debug.tracking)?reagent.debug.track_console:console).error(["Warning: The same with-let is being used more ","than once in the same reactive context."].join(''));
} else {
}
} else {
}

(with_let44219.generation = c__22191__auto___44263.ratomGeneration);
}

var init44220 = (with_let44219.length === (0));
var value_atom__24071__auto__ = ((((init44220) || (cljs.core.not(with_let44219.hasOwnProperty((0))))))?(with_let44219[(0)] = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null)):(with_let44219[(0)]));
var res44221 = (function (){var prev_values__24072__auto__ = cljs.core.deref(value_atom__24071__auto__);
var new_values__24073__auto__ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5523__auto__ = (function reagent_mui$x$data_grid$data_grid_$_iter__44234(s__44235){
return (new cljs.core.LazySeq(null,(function (){
var s__44235__$1 = s__44235;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__44235__$1);
if(temp__5804__auto__){
var s__44235__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__44235__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__44235__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__44237 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__44236 = (0);
while(true){
if((i__44236 < size__5522__auto__)){
var vec__44243 = cljs.core._nth(c__5521__auto__,i__44236);
var k__24074__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44243,(0),null);
var v__24075__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44243,(1),null);
cljs.core.chunk_append(b__44237,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k__24074__auto__,(function (){var prev__24076__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(prev_values__24072__auto__,k__24074__auto__);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),v__24075__auto__,new cljs.core.Keyword(null,"js-value","js-value",-758336661),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v__24075__auto__,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(prev__24076__auto__)))?new cljs.core.Keyword(null,"js-value","js-value",-758336661).cljs$core$IFn$_invoke$arity$1(prev__24076__auto__):cljs.core.clj__GT_js(v__24075__auto__))], null);
})()], null));

var G__44264 = (i__44236 + (1));
i__44236 = G__44264;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__44237),reagent_mui$x$data_grid$data_grid_$_iter__44234(cljs.core.chunk_rest(s__44235__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__44237),null);
}
} else {
var vec__44249 = cljs.core.first(s__44235__$2);
var k__24074__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44249,(0),null);
var v__24075__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44249,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k__24074__auto__,(function (){var prev__24076__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(prev_values__24072__auto__,k__24074__auto__);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),v__24075__auto__,new cljs.core.Keyword(null,"js-value","js-value",-758336661),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v__24075__auto__,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(prev__24076__auto__)))?new cljs.core.Keyword(null,"js-value","js-value",-758336661).cljs$core$IFn$_invoke$arity$1(prev__24076__auto__):cljs.core.clj__GT_js(v__24075__auto__))], null);
})()], null),reagent_mui$x$data_grid$data_grid_$_iter__44234(cljs.core.rest(s__44235__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(params__24070__auto__);
})());
cljs.core.reset_BANG_(value_atom__24071__auto__,new_values__24073__auto__);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.core.adapt_react_class(module$node_modules$$mui$x_data_grid$index.DataGrid),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5523__auto__ = (function reagent_mui$x$data_grid$data_grid_$_iter__44252(s__44253){
return (new cljs.core.LazySeq(null,(function (){
var s__44253__$1 = s__44253;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__44253__$1);
if(temp__5804__auto__){
var s__44253__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__44253__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__44253__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__44255 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__44254 = (0);
while(true){
if((i__44254 < size__5522__auto__)){
var vec__44256 = cljs.core._nth(c__5521__auto__,i__44254);
var k__24074__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44256,(0),null);
var v__24075__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44256,(1),null);
cljs.core.chunk_append(b__44255,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k__24074__auto__,new cljs.core.Keyword(null,"js-value","js-value",-758336661).cljs$core$IFn$_invoke$arity$1(v__24075__auto__)], null));

var G__44265 = (i__44254 + (1));
i__44254 = G__44265;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__44255),reagent_mui$x$data_grid$data_grid_$_iter__44252(cljs.core.chunk_rest(s__44253__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__44255),null);
}
} else {
var vec__44259 = cljs.core.first(s__44253__$2);
var k__24074__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44259,(0),null);
var v__24075__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44259,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k__24074__auto__,new cljs.core.Keyword(null,"js-value","js-value",-758336661).cljs$core$IFn$_invoke$arity$1(v__24075__auto__)], null),reagent_mui$x$data_grid$data_grid_$_iter__44252(cljs.core.rest(s__44253__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new_values__24073__auto__);
})())], null);
})();
return res44221;
});

//# sourceMappingURL=reagent_mui.x.data_grid.js.map
