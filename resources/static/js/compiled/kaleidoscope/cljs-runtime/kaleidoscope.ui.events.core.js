goog.provide('kaleidoscope.ui.events.core');
goog.scope(function(){
  kaleidoscope.ui.events.core.goog$module$goog$object = goog.module.get('goog.object');
});
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"boot","boot",2007860585),(function (_,___$1){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.core",null,12,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Initializing the web app!"], null);
}),null)),null,2123408471,null);

return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"db","db",993250759),kaleidoscope.ui.db.default_db,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-themes","load-themes",430379392)], null),new cljs.core.Keyword(null,"async-flow","async-flow",1464712702),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"first-dispatch","first-dispatch",128561923),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),new cljs.core.Keyword(null,"init","init",-1875481434)], null),new cljs.core.Keyword(null,"rules","rules",1198912366),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"when","when",-576417306),new cljs.core.Keyword(null,"seen?","seen?",-1677689856),new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("day8.re-frame.async-flow-fx","notify","day8.re-frame.async-flow-fx/notify",-341606413),new cljs.core.Keyword(null,"success-load-profile","success-load-profile",-682496965)], null)], null),new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-image-metadata","load-image-metadata",-1802194544)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-groups","load-all-groups",-1075613977)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"when","when",-576417306),new cljs.core.Keyword(null,"seen?","seen?",-1677689856),new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("day8.re-frame.async-flow-fx","notify","day8.re-frame.async-flow-fx/notify",-341606413),new cljs.core.Keyword(null,"success-boot","success-boot",33550139)], null)], null),new cljs.core.Keyword(null,"halt?","halt?",-1110658247),true], null)], null)], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"modal","modal",-1031880850),(function (db,p__15900){
var vec__15901 = p__15900;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15901,(0),null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15901,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"modal","modal",-1031880850)], null),data);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"show-modal","show-modal",-11429385),(function (db,p__15914){
var vec__15915 = p__15914;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15915,(0),null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15915,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"modal","modal",-1031880850)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show?","show?",1543842127),true,new cljs.core.Keyword(null,"child","child",623967545),data], null));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"change-notification-type","change-notification-type",-896361581),(function (db,p__15923){
var vec__15924 = p__15923;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15924,(0),null);
var notification_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15924,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(db,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"login-response","login-response",844783698),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),(200),new cljs.core.Keyword(null,"message","message",-406056002),goog.string.format("An example %s notification",notification_type)], null)], 0));
}));
kaleidoscope.ui.events.core.set_active_panel = (function kaleidoscope$ui$events$core$set_active_panel(db,p__15927){
var vec__15928 = p__15927;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15928,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15928,(1),null);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"loading?","loading?",1905707049),true,new cljs.core.Keyword(null,"active-panel","active-panel",-1802545994),value,new cljs.core.Keyword(null,"active-content","active-content",-1148974551),null], null)], 0));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),kaleidoscope.ui.events.core.set_active_panel);
kaleidoscope.ui.events.core.hash_fragment_effect = (function kaleidoscope$ui$events$core$hash_fragment_effect(path){
return (parent.location.hash = path);
});
re_frame.core.reg_fx(new cljs.core.Keyword(null,"hash-fragment","hash-fragment",1437880822),kaleidoscope.ui.events.core.hash_fragment_effect);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),(function (cofx,p__15931){
var vec__15932 = p__15931;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15932,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15932,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.core",null,62,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Resetting hash fragment to %s",path], null);
}),null)),null,1437508776,null);

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hash-fragment","hash-fragment",1437880822),path], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.core.js.map
