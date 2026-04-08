goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__31262){
var map__31263 = p__31262;
var map__31263__$1 = cljs.core.__destructure_map(map__31263);
var runtime = map__31263__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31263__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5045__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_31530 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_31530)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__31274 = runtime;
var G__31275 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_31530);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__31274,G__31275) : shadow.remote.runtime.shared.process.call(null,G__31274,G__31275));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__31283,res){
var map__31284 = p__31283;
var map__31284__$1 = cljs.core.__destructure_map(map__31284);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31284__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31284__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__31287 = res;
var G__31287__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__31287,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__31287);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__31287__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__31287__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__31313 = arguments.length;
switch (G__31313) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__31335,msg,handlers,timeout_after_ms){
var map__31337 = p__31335;
var map__31337__$1 = cljs.core.__destructure_map(map__31337);
var runtime = map__31337__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31337__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___31558 = arguments.length;
var i__5770__auto___31559 = (0);
while(true){
if((i__5770__auto___31559 < len__5769__auto___31558)){
args__5775__auto__.push((arguments[i__5770__auto___31559]));

var G__31564 = (i__5770__auto___31559 + (1));
i__5770__auto___31559 = G__31564;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__31402,ev,args){
var map__31405 = p__31402;
var map__31405__$1 = cljs.core.__destructure_map(map__31405);
var runtime = map__31405__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31405__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__31410 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__31413 = null;
var count__31414 = (0);
var i__31415 = (0);
while(true){
if((i__31415 < count__31414)){
var ext = chunk__31413.cljs$core$IIndexed$_nth$arity$2(null,i__31415);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__31567 = seq__31410;
var G__31568 = chunk__31413;
var G__31569 = count__31414;
var G__31570 = (i__31415 + (1));
seq__31410 = G__31567;
chunk__31413 = G__31568;
count__31414 = G__31569;
i__31415 = G__31570;
continue;
} else {
var G__31571 = seq__31410;
var G__31572 = chunk__31413;
var G__31573 = count__31414;
var G__31574 = (i__31415 + (1));
seq__31410 = G__31571;
chunk__31413 = G__31572;
count__31414 = G__31573;
i__31415 = G__31574;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__31410);
if(temp__5804__auto__){
var seq__31410__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31410__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__31410__$1);
var G__31575 = cljs.core.chunk_rest(seq__31410__$1);
var G__31576 = c__5568__auto__;
var G__31577 = cljs.core.count(c__5568__auto__);
var G__31578 = (0);
seq__31410 = G__31575;
chunk__31413 = G__31576;
count__31414 = G__31577;
i__31415 = G__31578;
continue;
} else {
var ext = cljs.core.first(seq__31410__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__31580 = cljs.core.next(seq__31410__$1);
var G__31581 = null;
var G__31582 = (0);
var G__31583 = (0);
seq__31410 = G__31580;
chunk__31413 = G__31581;
count__31414 = G__31582;
i__31415 = G__31583;
continue;
} else {
var G__31584 = cljs.core.next(seq__31410__$1);
var G__31585 = null;
var G__31586 = (0);
var G__31587 = (0);
seq__31410 = G__31584;
chunk__31413 = G__31585;
count__31414 = G__31586;
i__31415 = G__31587;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq31388){
var G__31390 = cljs.core.first(seq31388);
var seq31388__$1 = cljs.core.next(seq31388);
var G__31391 = cljs.core.first(seq31388__$1);
var seq31388__$2 = cljs.core.next(seq31388__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31390,G__31391,seq31388__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__31425,p__31426){
var map__31428 = p__31425;
var map__31428__$1 = cljs.core.__destructure_map(map__31428);
var runtime = map__31428__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31428__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__31429 = p__31426;
var map__31429__$1 = cljs.core.__destructure_map(map__31429);
var msg = map__31429__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31429__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__31430 = cljs.core.deref(state_ref);
var map__31430__$1 = cljs.core.__destructure_map(map__31430);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31430__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31430__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__31435,msg){
var map__31436 = p__31435;
var map__31436__$1 = cljs.core.__destructure_map(map__31436);
var runtime = map__31436__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31436__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__31439,key,p__31440){
var map__31441 = p__31439;
var map__31441__$1 = cljs.core.__destructure_map(map__31441);
var state = map__31441__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31441__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__31442 = p__31440;
var map__31442__$1 = cljs.core.__destructure_map(map__31442);
var spec = map__31442__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31442__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__31445,key,spec){
var map__31446 = p__31445;
var map__31446__$1 = cljs.core.__destructure_map(map__31446);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31446__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__31447_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__31447_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__31449_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__31449_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__31450_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__31450_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__31451_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__31451_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__31452_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__31452_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__31456,key){
var map__31457 = p__31456;
var map__31457__$1 = cljs.core.__destructure_map(map__31457);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31457__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__31460,msg){
var map__31461 = p__31460;
var map__31461__$1 = cljs.core.__destructure_map(map__31461);
var runtime = map__31461__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31461__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__31464,p__31465){
var map__31466 = p__31464;
var map__31466__$1 = cljs.core.__destructure_map(map__31466);
var runtime = map__31466__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31466__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__31467 = p__31465;
var map__31467__$1 = cljs.core.__destructure_map(map__31467);
var msg = map__31467__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31467__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31467__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__31471 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__31473 = null;
var count__31474 = (0);
var i__31475 = (0);
while(true){
if((i__31475 < count__31474)){
var map__31484 = chunk__31473.cljs$core$IIndexed$_nth$arity$2(null,i__31475);
var map__31484__$1 = cljs.core.__destructure_map(map__31484);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31484__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__31689 = seq__31471;
var G__31690 = chunk__31473;
var G__31691 = count__31474;
var G__31692 = (i__31475 + (1));
seq__31471 = G__31689;
chunk__31473 = G__31690;
count__31474 = G__31691;
i__31475 = G__31692;
continue;
} else {
var G__31693 = seq__31471;
var G__31694 = chunk__31473;
var G__31695 = count__31474;
var G__31696 = (i__31475 + (1));
seq__31471 = G__31693;
chunk__31473 = G__31694;
count__31474 = G__31695;
i__31475 = G__31696;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__31471);
if(temp__5804__auto__){
var seq__31471__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__31471__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__31471__$1);
var G__31697 = cljs.core.chunk_rest(seq__31471__$1);
var G__31698 = c__5568__auto__;
var G__31699 = cljs.core.count(c__5568__auto__);
var G__31700 = (0);
seq__31471 = G__31697;
chunk__31473 = G__31698;
count__31474 = G__31699;
i__31475 = G__31700;
continue;
} else {
var map__31505 = cljs.core.first(seq__31471__$1);
var map__31505__$1 = cljs.core.__destructure_map(map__31505);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__31505__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__31701 = cljs.core.next(seq__31471__$1);
var G__31702 = null;
var G__31703 = (0);
var G__31704 = (0);
seq__31471 = G__31701;
chunk__31473 = G__31702;
count__31474 = G__31703;
i__31475 = G__31704;
continue;
} else {
var G__31705 = cljs.core.next(seq__31471__$1);
var G__31706 = null;
var G__31707 = (0);
var G__31708 = (0);
seq__31471 = G__31705;
chunk__31473 = G__31706;
count__31474 = G__31707;
i__31475 = G__31708;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
