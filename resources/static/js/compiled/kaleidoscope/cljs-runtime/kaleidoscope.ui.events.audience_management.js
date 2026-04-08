goog.provide('kaleidoscope.ui.events.audience_management');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience.success","add-audience.success",-722929037),(function (db,p__15941){
var vec__15946 = p__15941;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15946,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15946,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience.failure","add-audience.failure",247398296),(function (db,p__15949){
var vec__15950 = p__15949;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15950,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15950,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-audience","add-audience",-739162564),(function (p__15953,p__15954){
var map__15955 = p__15953;
var map__15955__$1 = cljs.core.__destructure_map(map__15955);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15955__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__15956 = p__15954;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15956,(0),null);
var article = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15956,(1),null);
var group = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15956,(2),null);
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.add_audience_BANG_(article,group),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience.success","add-audience.success",-722929037)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience.failure","add-audience.failure",247398296)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-audience.success","delete-audience.success",1900630953),(function (db,p__15959){
var vec__15960 = p__15959;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15960,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15960,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-audience.failure","delete-audience.failure",544114869),(function (db,p__15964){
var vec__15968 = p__15964;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15968,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15968,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"delete-audience","delete-audience",1046473723),(function (p__15971,p__15972){
var map__15973 = p__15971;
var map__15973__$1 = cljs.core.__destructure_map(map__15973);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15973__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__15974 = p__15972;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15974,(0),null);
var audience = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15974,(1),null);
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.delete_audience_BANG_(audience),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-audience.success","delete-audience.success",1900630953)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-audience.failure","delete-audience.failure",544114869)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-response","audience-response",-835743437),null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-audiences-for-article.success","get-audiences-for-article.success",-2095189352),(function (db,p__15977){
var vec__15978 = p__15977;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15978,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15978,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.audience-management",null,51,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success retrieving article audiences"], null);
}),null)),null,77934518,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-editor-modal-initial-values","audience-editor-modal-initial-values",-1390656970),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"response","response",-1068424192),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-audiences-for-article.failure","get-audiences-for-article.failure",136390380),(function (db,p__16011){
var vec__16021 = p__16011;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16021,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16021,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.audience-management",null,57,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failure retrieving article audiences"], null);
}),null)),null,1800737948,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-editor-modal-initial-values","audience-editor-modal-initial-values",-1390656970),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-audiences-for-article","get-audiences-for-article",-1982512522),(function (p__16045,p__16046){
var map__16047 = p__16045;
var map__16047__$1 = cljs.core.__destructure_map(map__16047);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16047__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16048 = p__16046;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16048,(0),null);
var article_branch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16048,(1),null);
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_audiences_for_article(article_branch),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-audiences-for-article.success","get-audiences-for-article.success",-2095189352)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-audiences-for-article.failure","get-audiences-for-article.failure",136390380)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"audience-editor-modal-initial-values","audience-editor-modal-initial-values",-1390656970),null)], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.audience_management.js.map
