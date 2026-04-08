goog.provide('kaleidoscope.ui.events.user_management');
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"update-user-profile!","update-user-profile!",722989998),(function (cofx,p__20224){
var vec__20225 = p__20224;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20225,(0),null);
var userinfo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20225,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.user-management",null,9,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Updating user profile: %s",userinfo], null);
}),null)),null,1969152268,null);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),new cljs.core.Keyword(null,"user-profile","user-profile",-1783018313),userinfo),new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("day8.re-frame.async-flow-fx","notify","day8.re-frame.async-flow-fx/notify",-341606413),new cljs.core.Keyword(null,"success-load-profile","success-load-profile",-682496965)], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"check-identity","check-identity",-1543102308),(function (p__20232,_){
var map__20233 = p__20232;
var map__20233__$1 = cljs.core.__destructure_map(map__20233);
var db = map__20233__$1;
var user_profile = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20233__$1,new cljs.core.Keyword(null,"user-profile","user-profile",-1783018313));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.user-management",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Identity: %s",user_profile], null);
}),null)),null,-1444068085,null);

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-admin-route.success","request-admin-route.success",1287300322),(function (db,p__20238){
var vec__20239 = p__20238;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20239,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"login-response","login-response",844783698),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-admin-route.failure","request-admin-route.failure",-1981122293),(function (db,p__20248){
var vec__20249 = p__20248;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20249,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20249,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"login-response","login-response",844783698),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-admin-route","request-admin-route",-1850410755),(function (p__20252,p__20253){
var map__20254 = p__20252;
var map__20254__$1 = cljs.core.__destructure_map(map__20254);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20254__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20255 = p__20253;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20255,(0),null);
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_groups(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-admin-route.success","request-admin-route.success",1287300322)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-admin-route.failure","request-admin-route.failure",-1981122293)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"login-response","login-response",844783698),null)], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.user_management.js.map
