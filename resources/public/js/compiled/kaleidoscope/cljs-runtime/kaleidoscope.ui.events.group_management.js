goog.provide('kaleidoscope.ui.events.group_management');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-groups.success","load-all-groups.success",-1140136007),(function (db,p__20190){
var vec__20191 = p__20190;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20191,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20191,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,10,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrieved all groups: found %s",cljs.core.count(response)], null);
}),null)),null,1757259428,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.group-management",null,11,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["groups %s",response], null);
}),null)),null,775483666,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"groups","groups",-136896102),response);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-groups.failure","load-all-groups.failure",-2069810174),(function (db,p__20202){
var vec__20203 = p__20202;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20203,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20203,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.group-management",null,16,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve groups %s",response], null);
}),null)),null,523278966,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-all-groups","request-all-groups",-126864006),(function (p__20210,p__20211){
var map__20212 = p__20210;
var map__20212__$1 = cljs.core.__destructure_map(map__20212);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20212__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20213 = p__20211;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20213,(0),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,21,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Requesting all groups"], null);
}),null)),null,1003584172,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_groups(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-groups.success","load-all-groups.success",-1140136007)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-groups.failure","load-all-groups.failure",-2069810174)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-group.success","save-group.success",-339786305),(function (cofx,p__20266){
var vec__20267 = p__20266;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20267,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20267,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,32,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saved group `%s`",response], null);
}),null)),null,987284765,null);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-all-groups","request-all-groups",-126864006)], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-group.failure","save-group.failure",-723402151),(function (db,p__20279){
var vec__20280 = p__20279;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20280,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20280,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.group-management",null,38,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve groups %s",response], null);
}),null)),null,-917663715,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-group!","add-group!",999555200),(function (p__20287,p__20288){
var map__20289 = p__20287;
var map__20289__$1 = cljs.core.__destructure_map(map__20289);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20289__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20290 = p__20288;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20290,(0),null);
var group_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20290,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,43,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Creating group: %s",group_name], null);
}),null)),null,838942567,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.add_group_BANG_(group_name),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-group.success","save-group.success",-339786305)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-group.failure","save-group.failure",-723402151)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-group.success","delete-group.success",988260283),(function (cofx,p__20297){
var vec__20298 = p__20297;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20298,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20298,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,53,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleted group `%s`",response], null);
}),null)),null,-789364125,null);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-all-groups","request-all-groups",-126864006)], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-group.failure","delete-group.failure",1229590354),(function (db,p__20301){
var vec__20302 = p__20301;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20302,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20302,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.group-management",null,59,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to delete groups %s",response], null);
}),null)),null,2063294914,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),(function (p__20305,p__20306){
var map__20307 = p__20305;
var map__20307__$1 = cljs.core.__destructure_map(map__20307);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20307__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20308 = p__20306;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20308,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20308,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,64,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting group: %s",group], null);
}),null)),null,1251039231,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.delete_group_BANG_(group),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-group.success","delete-group.success",988260283)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-group.failure","delete-group.failure",1229590354)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-member.success","save-member.success",615575833),(function (cofx,p__20318){
var vec__20319 = p__20318;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20319,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20319,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,75,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saved member `%s`",response], null);
}),null)),null,1783275755,null);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-all-groups","request-all-groups",-126864006)], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-member.failure","save-member.failure",-97761000),(function (db,p__20323){
var vec__20324 = p__20323;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20324,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20324,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.group-management",null,81,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve members %s",response], null);
}),null)),null,-902663655,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),(function (p__20344,p__20345){
var map__20346 = p__20344;
var map__20346__$1 = cljs.core.__destructure_map(map__20346);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20346__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20347 = p__20345;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20347,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20347,(1),null);
var map__20350 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20347,(2),null);
var map__20350__$1 = cljs.core.__destructure_map(map__20350);
var member = map__20350__$1;
var email = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20350__$1,new cljs.core.Keyword(null,"email","email",1415816706));
var alias = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20350__$1,new cljs.core.Keyword(null,"alias","alias",-2039751630));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,86,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Creating member: %s",member], null);
}),null)),null,-548420671,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.add_group_member_BANG_(group,member),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-member.success","save-member.success",615575833)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-member.failure","save-member.failure",-97761000)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-member.success","delete-member.success",-793324806),(function (cofx,p__20363){
var vec__20365 = p__20363;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20365,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20365,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,96,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleted member `%s`",response], null);
}),null)),null,1379483386,null);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(cofx),new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-all-groups","request-all-groups",-126864006)], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-member.failure","delete-member.failure",-133398928),(function (db,p__20402){
var vec__20403 = p__20402;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20403,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20403,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.group-management",null,102,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to delete member %s",response], null);
}),null)),null,1106437933,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),(function (p__20406,p__20407){
var map__20408 = p__20406;
var map__20408__$1 = cljs.core.__destructure_map(map__20408);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20408__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20409 = p__20407;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20409,(0),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20409,(1),null);
var member_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20409,(2),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.group-management",null,107,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting member %s from group %s",member_id,group], null);
}),null)),null,2098281229,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.delete_group_member_BANG_(group,member_id),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-member.success","delete-member.success",-793324806)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-member.failure","delete-member.failure",-133398928)], null)], null)], 0))], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.group_management.js.map
