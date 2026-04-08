goog.provide('kaleidoscope.ui.events.keycloak');
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),(function (cofx,p__16113){
var vec__16114 = p__16113;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16114,(0),null);
var action = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16114,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.keycloak",null,11,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Keycloak action: %s",action], null);
}),null)),null,-401244937,null);

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keycloak","keycloak",605028133),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),action,new cljs.core.Keyword(null,"keycloak-adapter","keycloak-adapter",1482797834),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cofx,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword(null,"keycloak","keycloak",605028133)], null))], null)], null);
}));
kaleidoscope.ui.events.keycloak.keycloak_effect = (function kaleidoscope$ui$events$keycloak$keycloak_effect(p__16118){
var map__16119 = p__16118;
var map__16119__$1 = cljs.core.__destructure_map(map__16119);
var action = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16119__$1,new cljs.core.Keyword(null,"action","action",-811238024));
var keycloak_adapter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16119__$1,new cljs.core.Keyword(null,"keycloak-adapter","keycloak-adapter",1482797834));
var G__16120 = action;
var G__16120__$1 = (((G__16120 instanceof cljs.core.Keyword))?G__16120.fqn:null);
switch (G__16120__$1) {
case "account-management":
return kaleidoscope.ui.clients.keycloak.account_management_BANG_(keycloak_adapter);

break;
case "init":
return kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$3(keycloak_adapter,(function kaleidoscope$ui$events$keycloak$keycloak_effect_$_on_success(auth_QMARK_){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.keycloak",null,21,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Successful keycloak initialization"], null);
}),null)),null,1735251753,null);

if(cljs.core.truth_(auth_QMARK_)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.keycloak",null,23,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Found authenticated user!"], null);
}),null)),null,783004379,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),new cljs.core.Keyword(null,"load-profile","load-profile",-292246233)], null));
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"kaleidoscope.ui.events.keycloak",null,25,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["No authenticated user found."], null);
}),null)),null,1602257900,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("day8.re-frame.async-flow-fx","notify","day8.re-frame.async-flow-fx/notify",-341606413),new cljs.core.Keyword(null,"success-boot","success-boot",33550139)], null));
}
}),(function kaleidoscope$ui$events$keycloak$keycloak_effect_$_on_error(e){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.keycloak",null,28,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Keycloak initialization failed"], null);
}),null)),null,-1964011677,null);

return console.log("Init error",e);
}));

break;
case "load-profile":
return kaleidoscope.ui.clients.keycloak.load_profile_BANG_(keycloak_adapter,(function (user){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"update-user-profile!","update-user-profile!",722989998),kaleidoscope.ui.utils.core.clojurize(user)], null));
}),(function (_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"kaleidoscope.ui.events.keycloak",null,34,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Could not load user"], null);
}),null)),null,-521745499,null);
}));

break;
case "login":
return kaleidoscope.ui.clients.keycloak.login_BANG_(keycloak_adapter);

break;
case "logout":
return kaleidoscope.ui.clients.keycloak.logout_BANG_(keycloak_adapter);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__16120__$1)].join('')));

}
});
re_frame.core.reg_fx(new cljs.core.Keyword(null,"keycloak","keycloak",605028133),kaleidoscope.ui.events.keycloak.keycloak_effect);

//# sourceMappingURL=kaleidoscope.ui.events.keycloak.js.map
