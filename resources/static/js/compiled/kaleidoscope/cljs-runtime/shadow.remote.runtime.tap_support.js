goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__36970,p__36971){
var map__36975 = p__36970;
var map__36975__$1 = cljs.core.__destructure_map(map__36975);
var svc = map__36975__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36975__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36975__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36975__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__36976 = p__36971;
var map__36976__$1 = cljs.core.__destructure_map(map__36976);
var msg = map__36976__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36976__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36976__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36976__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__36976__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__36982,p__36983){
var map__36984 = p__36982;
var map__36984__$1 = cljs.core.__destructure_map(map__36984);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36984__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__36985 = p__36983;
var map__36985__$1 = cljs.core.__destructure_map(map__36985);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36985__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__36989,p__36990){
var map__36991 = p__36989;
var map__36991__$1 = cljs.core.__destructure_map(map__36991);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36991__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36991__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__36992 = p__36990;
var map__36992__$1 = cljs.core.__destructure_map(map__36992);
var msg = map__36992__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__36992__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__36993,tid){
var map__36994 = p__36993;
var map__36994__$1 = cljs.core.__destructure_map(map__36994);
var svc = map__36994__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36994__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__37003 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__37004 = null;
var count__37005 = (0);
var i__37006 = (0);
while(true){
if((i__37006 < count__37005)){
var vec__37018 = chunk__37004.cljs$core$IIndexed$_nth$arity$2(null,i__37006);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37018,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37018,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__37040 = seq__37003;
var G__37041 = chunk__37004;
var G__37042 = count__37005;
var G__37043 = (i__37006 + (1));
seq__37003 = G__37040;
chunk__37004 = G__37041;
count__37005 = G__37042;
i__37006 = G__37043;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37003);
if(temp__5804__auto__){
var seq__37003__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37003__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37003__$1);
var G__37048 = cljs.core.chunk_rest(seq__37003__$1);
var G__37049 = c__5568__auto__;
var G__37050 = cljs.core.count(c__5568__auto__);
var G__37051 = (0);
seq__37003 = G__37048;
chunk__37004 = G__37049;
count__37005 = G__37050;
i__37006 = G__37051;
continue;
} else {
var vec__37021 = cljs.core.first(seq__37003__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37021,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37021,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__37052 = cljs.core.next(seq__37003__$1);
var G__37053 = null;
var G__37054 = (0);
var G__37055 = (0);
seq__37003 = G__37052;
chunk__37004 = G__37053;
count__37005 = G__37054;
i__37006 = G__37055;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__36998_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__36998_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__36999_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__36999_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__37000_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__37000_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__37002_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__37002_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__37026){
var map__37027 = p__37026;
var map__37027__$1 = cljs.core.__destructure_map(map__37027);
var svc = map__37027__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37027__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37027__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
