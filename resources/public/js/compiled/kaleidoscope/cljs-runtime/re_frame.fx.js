goog.provide('re_frame.fx');
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null,re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__39993 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__39994 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__39994);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5804__auto___40086 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5804__auto___40086)){
var new_db_40087 = temp__5804__auto___40086;
var fexpr__39995_40088 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__39995_40088.cljs$core$IFn$_invoke$arity$1 ? fexpr__39995_40088.cljs$core$IFn$_invoke$arity$1(new_db_40087) : fexpr__39995_40088.call(null,new_db_40087));
} else {
}

var seq__39996 = cljs.core.seq(effects_without_db);
var chunk__39997 = null;
var count__39998 = (0);
var i__39999 = (0);
while(true){
if((i__39999 < count__39998)){
var vec__40016 = chunk__39997.cljs$core$IIndexed$_nth$arity$2(null,i__39999);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40016,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40016,(1),null);
var temp__5802__auto___40089 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40089)){
var effect_fn_40090 = temp__5802__auto___40089;
(effect_fn_40090.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40090.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40090.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__40091 = seq__39996;
var G__40092 = chunk__39997;
var G__40093 = count__39998;
var G__40094 = (i__39999 + (1));
seq__39996 = G__40091;
chunk__39997 = G__40092;
count__39998 = G__40093;
i__39999 = G__40094;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39996);
if(temp__5804__auto__){
var seq__39996__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39996__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39996__$1);
var G__40095 = cljs.core.chunk_rest(seq__39996__$1);
var G__40096 = c__5568__auto__;
var G__40097 = cljs.core.count(c__5568__auto__);
var G__40098 = (0);
seq__39996 = G__40095;
chunk__39997 = G__40096;
count__39998 = G__40097;
i__39999 = G__40098;
continue;
} else {
var vec__40019 = cljs.core.first(seq__39996__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40019,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40019,(1),null);
var temp__5802__auto___40099 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40099)){
var effect_fn_40100 = temp__5802__auto___40099;
(effect_fn_40100.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40100.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40100.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__40101 = cljs.core.next(seq__39996__$1);
var G__40102 = null;
var G__40103 = (0);
var G__40104 = (0);
seq__39996 = G__40101;
chunk__39997 = G__40102;
count__39998 = G__40103;
i__39999 = G__40104;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__23049__auto___40105 = re_frame.interop.now();
var duration__23050__auto___40106 = (end__23049__auto___40105 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__23050__auto___40106,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__23049__auto___40105);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__39993);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5804__auto___40107 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5804__auto___40107)){
var new_db_40108 = temp__5804__auto___40107;
var fexpr__40027_40109 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__40027_40109.cljs$core$IFn$_invoke$arity$1 ? fexpr__40027_40109.cljs$core$IFn$_invoke$arity$1(new_db_40108) : fexpr__40027_40109.call(null,new_db_40108));
} else {
}

var seq__40028 = cljs.core.seq(effects_without_db);
var chunk__40029 = null;
var count__40030 = (0);
var i__40031 = (0);
while(true){
if((i__40031 < count__40030)){
var vec__40039 = chunk__40029.cljs$core$IIndexed$_nth$arity$2(null,i__40031);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40039,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40039,(1),null);
var temp__5802__auto___40110 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40110)){
var effect_fn_40111 = temp__5802__auto___40110;
(effect_fn_40111.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40111.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40111.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__40112 = seq__40028;
var G__40113 = chunk__40029;
var G__40114 = count__40030;
var G__40115 = (i__40031 + (1));
seq__40028 = G__40112;
chunk__40029 = G__40113;
count__40030 = G__40114;
i__40031 = G__40115;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40028);
if(temp__5804__auto__){
var seq__40028__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40028__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40028__$1);
var G__40116 = cljs.core.chunk_rest(seq__40028__$1);
var G__40117 = c__5568__auto__;
var G__40118 = cljs.core.count(c__5568__auto__);
var G__40119 = (0);
seq__40028 = G__40116;
chunk__40029 = G__40117;
count__40030 = G__40118;
i__40031 = G__40119;
continue;
} else {
var vec__40044 = cljs.core.first(seq__40028__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40044,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40044,(1),null);
var temp__5802__auto___40120 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40120)){
var effect_fn_40121 = temp__5802__auto___40120;
(effect_fn_40121.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40121.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40121.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__40122 = cljs.core.next(seq__40028__$1);
var G__40123 = null;
var G__40124 = (0);
var G__40125 = (0);
seq__40028 = G__40122;
chunk__40029 = G__40123;
count__40030 = G__40124;
i__40031 = G__40125;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__40050){
var map__40051 = p__40050;
var map__40051__$1 = cljs.core.__destructure_map(map__40051);
var effect = map__40051__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40051__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40051__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_((function (){
return re_frame.router.dispatch(dispatch);
}),ms);
}
});
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__40054 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__40055 = null;
var count__40056 = (0);
var i__40057 = (0);
while(true){
if((i__40057 < count__40056)){
var effect = chunk__40055.cljs$core$IIndexed$_nth$arity$2(null,i__40057);
re_frame.fx.dispatch_later(effect);


var G__40126 = seq__40054;
var G__40127 = chunk__40055;
var G__40128 = count__40056;
var G__40129 = (i__40057 + (1));
seq__40054 = G__40126;
chunk__40055 = G__40127;
count__40056 = G__40128;
i__40057 = G__40129;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40054);
if(temp__5804__auto__){
var seq__40054__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40054__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40054__$1);
var G__40130 = cljs.core.chunk_rest(seq__40054__$1);
var G__40131 = c__5568__auto__;
var G__40132 = cljs.core.count(c__5568__auto__);
var G__40133 = (0);
seq__40054 = G__40130;
chunk__40055 = G__40131;
count__40056 = G__40132;
i__40057 = G__40133;
continue;
} else {
var effect = cljs.core.first(seq__40054__$1);
re_frame.fx.dispatch_later(effect);


var G__40134 = cljs.core.next(seq__40054__$1);
var G__40135 = null;
var G__40136 = (0);
var G__40137 = (0);
seq__40054 = G__40134;
chunk__40055 = G__40135;
count__40056 = G__40136;
i__40057 = G__40137;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__40061 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__40062 = null;
var count__40063 = (0);
var i__40064 = (0);
while(true){
if((i__40064 < count__40063)){
var vec__40071 = chunk__40062.cljs$core$IIndexed$_nth$arity$2(null,i__40064);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40071,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40071,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5802__auto___40138 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40138)){
var effect_fn_40139 = temp__5802__auto___40138;
(effect_fn_40139.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40139.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40139.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__40140 = seq__40061;
var G__40141 = chunk__40062;
var G__40142 = count__40063;
var G__40143 = (i__40064 + (1));
seq__40061 = G__40140;
chunk__40062 = G__40141;
count__40063 = G__40142;
i__40064 = G__40143;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40061);
if(temp__5804__auto__){
var seq__40061__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40061__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40061__$1);
var G__40144 = cljs.core.chunk_rest(seq__40061__$1);
var G__40145 = c__5568__auto__;
var G__40146 = cljs.core.count(c__5568__auto__);
var G__40147 = (0);
seq__40061 = G__40144;
chunk__40062 = G__40145;
count__40063 = G__40146;
i__40064 = G__40147;
continue;
} else {
var vec__40075 = cljs.core.first(seq__40061__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40075,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40075,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5802__auto___40148 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___40148)){
var effect_fn_40149 = temp__5802__auto___40148;
(effect_fn_40149.cljs$core$IFn$_invoke$arity$1 ? effect_fn_40149.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_40149.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__40150 = cljs.core.next(seq__40061__$1);
var G__40151 = null;
var G__40152 = (0);
var G__40153 = (0);
seq__40061 = G__40150;
chunk__40062 = G__40151;
count__40063 = G__40152;
i__40064 = G__40153;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__40078 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__40079 = null;
var count__40080 = (0);
var i__40081 = (0);
while(true){
if((i__40081 < count__40080)){
var event = chunk__40079.cljs$core$IIndexed$_nth$arity$2(null,i__40081);
re_frame.router.dispatch(event);


var G__40154 = seq__40078;
var G__40155 = chunk__40079;
var G__40156 = count__40080;
var G__40157 = (i__40081 + (1));
seq__40078 = G__40154;
chunk__40079 = G__40155;
count__40080 = G__40156;
i__40081 = G__40157;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40078);
if(temp__5804__auto__){
var seq__40078__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40078__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40078__$1);
var G__40158 = cljs.core.chunk_rest(seq__40078__$1);
var G__40159 = c__5568__auto__;
var G__40160 = cljs.core.count(c__5568__auto__);
var G__40161 = (0);
seq__40078 = G__40158;
chunk__40079 = G__40159;
count__40080 = G__40160;
i__40081 = G__40161;
continue;
} else {
var event = cljs.core.first(seq__40078__$1);
re_frame.router.dispatch(event);


var G__40162 = cljs.core.next(seq__40078__$1);
var G__40163 = null;
var G__40164 = (0);
var G__40165 = (0);
seq__40078 = G__40162;
chunk__40079 = G__40163;
count__40080 = G__40164;
i__40081 = G__40165;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__40082 = cljs.core.seq(value);
var chunk__40083 = null;
var count__40084 = (0);
var i__40085 = (0);
while(true){
if((i__40085 < count__40084)){
var event = chunk__40083.cljs$core$IIndexed$_nth$arity$2(null,i__40085);
clear_event(event);


var G__40166 = seq__40082;
var G__40167 = chunk__40083;
var G__40168 = count__40084;
var G__40169 = (i__40085 + (1));
seq__40082 = G__40166;
chunk__40083 = G__40167;
count__40084 = G__40168;
i__40085 = G__40169;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40082);
if(temp__5804__auto__){
var seq__40082__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40082__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40082__$1);
var G__40170 = cljs.core.chunk_rest(seq__40082__$1);
var G__40171 = c__5568__auto__;
var G__40172 = cljs.core.count(c__5568__auto__);
var G__40173 = (0);
seq__40082 = G__40170;
chunk__40083 = G__40171;
count__40084 = G__40172;
i__40085 = G__40173;
continue;
} else {
var event = cljs.core.first(seq__40082__$1);
clear_event(event);


var G__40174 = cljs.core.next(seq__40082__$1);
var G__40175 = null;
var G__40176 = (0);
var G__40177 = (0);
seq__40082 = G__40174;
chunk__40083 = G__40175;
count__40084 = G__40176;
i__40085 = G__40177;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceMappingURL=re_frame.fx.js.map
