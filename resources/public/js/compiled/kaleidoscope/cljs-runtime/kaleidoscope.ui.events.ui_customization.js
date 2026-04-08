goog.provide('kaleidoscope.ui.events.ui_customization');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-themes.success","get-themes.success",397847248),(function (db,p__20431){
var vec__20433 = p__20431;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20433,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20433,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.ui-customization",null,8,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loaded %s themes",cljs.core.count(response)], null);
}),null)),null,-1183609717,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"themes","themes",-702786642),response);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"get-themes.failure","get-themes.failure",1576495068),(function (db,p__20436){
var vec__20437 = p__20436;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20437,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20437,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.ui-customization",null,13,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Could not load themes"], null);
}),null)),null,1205106972,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-themes","load-themes",430379392),(function (p__20440,p__20441){
var map__20442 = p__20440;
var map__20442__$1 = cljs.core.__destructure_map(map__20442);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20442__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20443 = p__20441;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20443,(0),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.get_themes(),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-themes.success","get-themes.success",397847248)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-themes.failure","get-themes.failure",1576495068)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"set-local-theme","set-local-theme",1269776294),(function (db,p__20446){
var vec__20447 = p__20446;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20447,(0),null);
var new_theme = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20447,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.ui-customization",null,24,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Reset local theme"], null);
}),null)),null,672777123,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"theme","theme",-1247880880),new_theme);
}));

//# sourceMappingURL=kaleidoscope.ui.events.ui_customization.js.map
