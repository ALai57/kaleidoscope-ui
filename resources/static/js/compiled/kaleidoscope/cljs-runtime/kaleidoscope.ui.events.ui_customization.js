goog.provide('kaleidoscope.ui.events.ui_customization');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-themes.success","get-themes.success",397847248),(function (db,p__16444){
var vec__16445 = p__16444;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16445,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16445,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.ui-customization",null,8,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loaded %s themes",cljs.core.count(response)], null);
}),null)),null,-595776950,null);

var first_theme = cljs.core.first(response);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.ui-customization",null,10,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Using first theme: %s",first_theme], null);
}),null)),null,481829953,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme","theme",-1247880880),new cljs.core.Keyword(null,"config","config",994861415).cljs$core$IFn$_invoke$arity$1(first_theme));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-themes.failure","get-themes.failure",1576495068),(function (db,p__16456){
var vec__16457 = p__16456;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16457,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16457,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.ui-customization",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Could not load themes"], null);
}),null)),null,-1785127718,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-themes","load-themes",430379392),(function (p__16482,p__16483){
var map__16488 = p__16482;
var map__16488__$1 = cljs.core.__destructure_map(map__16488);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16488__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16489 = p__16483;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16489,(0),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.get_themes(),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-themes.success","get-themes.success",397847248)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-themes.failure","get-themes.failure",1576495068)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"set-local-theme","set-local-theme",1269776294),(function (db,p__16499){
var vec__16501 = p__16499;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16501,(0),null);
var new_theme = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16501,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme","theme",-1247880880),new_theme);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-theme.success","add-theme.success",-153509561),(function (db,p__16511){
var vec__16512 = p__16511;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16512,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16512,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme-response","theme-response",1416189544),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-theme.failure","add-theme.failure",1567156262),(function (db,p__16523){
var vec__16525 = p__16523;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16525,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16525,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme-response","theme-response",1416189544),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),null,new cljs.core.Keyword(null,"body","body",-2049205669),response], null));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-theme!","save-theme!",1324111825),(function (p__16538,p__16539){
var map__16541 = p__16538;
var map__16541__$1 = cljs.core.__destructure_map(map__16541);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16541__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16543 = p__16539;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16543,(0),null);
var clj_theme = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16543,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.ui-customization",null,42,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Persisting theme: ",clj_theme], null);
}),null)),null,-884123561,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.update_theme_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"config","config",994861415),clj_theme,new cljs.core.Keyword(null,"id","id",-1388402092),"00000000-0000-0000-0000-000000000000",new cljs.core.Keyword(null,"display-name","display-name",694513143),"My test theme"], null)),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-theme.success","add-theme.success",-153509561)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-theme.failure","add-theme.failure",1567156262)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme-response","theme-response",1416189544),null)], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.ui_customization.js.map
