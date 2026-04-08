goog.provide('kaleidoscope.ui.events.audience_management');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience.success","add-audience.success",-722929037),(function (db,p__20228){
var vec__20229 = p__20228;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20229,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20229,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience.failure","add-audience.failure",247398296),(function (db,p__20234){
var vec__20235 = p__20234;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20235,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20235,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience","add-audience",-739162564),(function (p__20242,p__20243){
var map__20244 = p__20242;
var map__20244__$1 = cljs.core.__destructure_map(map__20244);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20244__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20245 = p__20243;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20245,(0),null);
var article = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20245,(1),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20245,(2),null);
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.add_audience_BANG_(article,group),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience.success","add-audience.success",-722929037)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience.failure","add-audience.failure",247398296)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),null)], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.audience_management.js.map
