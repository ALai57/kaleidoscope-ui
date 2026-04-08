goog.provide('re_frame.trace');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});
/**
 * @define {boolean}
 */
re_frame.trace.trace_enabled_QMARK_ = goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__39669){
var map__39670 = p__39669;
var map__39670__$1 = cljs.core.__destructure_map(map__39670);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39670__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39670__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39670__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39670__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),re_frame.trace.next_id(),new cljs.core.Keyword(null,"operation","operation",-1267664310),operation,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type,new cljs.core.Keyword(null,"tags","tags",1771418977),tags,new cljs.core.Keyword(null,"child-of","child-of",-903376662),(function (){var or__5045__auto__ = child_of;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",-355208981),re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__39672_39701 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__39673_39702 = null;
var count__39674_39703 = (0);
var i__39675_39704 = (0);
while(true){
if((i__39675_39704 < count__39674_39703)){
var vec__39686_39705 = chunk__39673_39702.cljs$core$IIndexed$_nth$arity$2(null,i__39675_39704);
var k_39706 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39686_39705,(0),null);
var cb_39707 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39686_39705,(1),null);
try{var G__39690_39708 = cljs.core.deref(re_frame.trace.traces);
(cb_39707.cljs$core$IFn$_invoke$arity$1 ? cb_39707.cljs$core$IFn$_invoke$arity$1(G__39690_39708) : cb_39707.call(null,G__39690_39708));
}catch (e39689){var e_39709 = e39689;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_39706,"while storing",cljs.core.deref(re_frame.trace.traces),e_39709], 0));
}

var G__39710 = seq__39672_39701;
var G__39712 = chunk__39673_39702;
var G__39713 = count__39674_39703;
var G__39714 = (i__39675_39704 + (1));
seq__39672_39701 = G__39710;
chunk__39673_39702 = G__39712;
count__39674_39703 = G__39713;
i__39675_39704 = G__39714;
continue;
} else {
var temp__5804__auto___39715 = cljs.core.seq(seq__39672_39701);
if(temp__5804__auto___39715){
var seq__39672_39716__$1 = temp__5804__auto___39715;
if(cljs.core.chunked_seq_QMARK_(seq__39672_39716__$1)){
var c__5568__auto___39717 = cljs.core.chunk_first(seq__39672_39716__$1);
var G__39718 = cljs.core.chunk_rest(seq__39672_39716__$1);
var G__39719 = c__5568__auto___39717;
var G__39720 = cljs.core.count(c__5568__auto___39717);
var G__39721 = (0);
seq__39672_39701 = G__39718;
chunk__39673_39702 = G__39719;
count__39674_39703 = G__39720;
i__39675_39704 = G__39721;
continue;
} else {
var vec__39693_39722 = cljs.core.first(seq__39672_39716__$1);
var k_39723 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39693_39722,(0),null);
var cb_39724 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39693_39722,(1),null);
try{var G__39697_39725 = cljs.core.deref(re_frame.trace.traces);
(cb_39724.cljs$core$IFn$_invoke$arity$1 ? cb_39724.cljs$core$IFn$_invoke$arity$1(G__39697_39725) : cb_39724.call(null,G__39697_39725));
}catch (e39696){var e_39726 = e39696;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_39723,"while storing",cljs.core.deref(re_frame.trace.traces),e_39726], 0));
}

var G__39728 = cljs.core.next(seq__39672_39716__$1);
var G__39729 = null;
var G__39730 = (0);
var G__39731 = (0);
seq__39672_39701 = G__39728;
chunk__39673_39702 = G__39729;
count__39674_39703 = G__39730;
i__39675_39704 = G__39731;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});

//# sourceMappingURL=re_frame.trace.js.map
