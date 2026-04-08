goog.provide('kaleidoscope.ui.clients.keycloak');
var module$node_modules$keycloak_js$dist$keycloak_mjs=shadow.js.require("module$node_modules$keycloak_js$dist$keycloak_mjs", {});
/**
 * @define {string}
 */
kaleidoscope.ui.clients.keycloak.AUTH_URL = goog.define("kaleidoscope.ui.clients.keycloak.AUTH_URL","defined-at-compile-time");
/**
 * @define {string}
 */
kaleidoscope.ui.clients.keycloak.CLIENTID = goog.define("kaleidoscope.ui.clients.keycloak.CLIENTID","defined-at-compile-time");
/**
 * @define {string}
 */
kaleidoscope.ui.clients.keycloak.REALM = goog.define("kaleidoscope.ui.clients.keycloak.REALM","defined-at-compile-time");
kaleidoscope.ui.clients.keycloak.HOST_URL = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.location.protocol),"//",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.location.host)].join('');
kaleidoscope.ui.clients.keycloak.keycloak = (function kaleidoscope$ui$clients$keycloak$keycloak(options){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.clients.keycloak",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Starting Keycloak..."], null);
}),null)),null,-210246411,null);

var kc_instance = module$node_modules$keycloak_js$dist$keycloak_mjs.default(cljs.core.clj__GT_js(options));
(kc_instance.onTokenExpired = (function (){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,17,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Access token is expiring! Refreshing tokens..."], null);
}),null)),null,-1508885504,null);

return kc_instance.updateToken().then((function (refreshed){
if(cljs.core.truth_(refreshed)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,22,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Tokens successfully refreshed"], null);
}),null)),null,669315880,null);
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"kaleidoscope.ui.clients.keycloak",null,23,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Tokens failed to refresh"], null);
}),null)),null,972854222,null);
}
})).catch((function (){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"kaleidoscope.ui.clients.keycloak",null,25,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to refresh token or session expired."], null);
}),null)),null,508892474,null);
}));
}));

(kc_instance.onAuthSuccess = (function (){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,27,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Successful authentication!"], null);
}),null)),null,858968545,null);
}));

(kc_instance.onAuthRefreshSuccess = (function (){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,28,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Successful token refresh!"], null);
}),null)),null,1112359158,null);
}));

(kc_instance.onAuthRefreshError = (function (){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"kaleidoscope.ui.clients.keycloak",null,29,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Token refresh failure!"], null);
}),null)),null,483475098,null);
}));

return kc_instance;
});
kaleidoscope.ui.clients.keycloak.initialize_BANG_ = (function kaleidoscope$ui$clients$keycloak$initialize_BANG_(var_args){
var G__42046 = arguments.length;
switch (G__42046) {
case 1:
return kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (keycloak_instance){
return kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$3(keycloak_instance,(function (auth_QMARK_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,35,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Authenticated? %s",auth_QMARK_], null);
}),null)),null,-160582660,null);
}),(function (auth_QMARK_){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,36,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to initialize Keycloak"], null);
}),null)),null,708519993,null);
}));
}));

(kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (keycloak_instance,success,fail){
return keycloak_instance.init(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"checkLoginIframe","checkLoginIframe",1139773654),false,new cljs.core.Keyword(null,"onLoad","onLoad",-1227893830),"check-sso",new cljs.core.Keyword(null,"silentCheckSsoRedirectUri","silentCheckSsoRedirectUri",959756617),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.location.origin),"/silent-check-sso.html"].join(''),new cljs.core.Keyword(null,"pkceMethod","pkceMethod",-1946165480),"S256"], null))).then(success).catch(fail);
}));

(kaleidoscope.ui.clients.keycloak.initialize_BANG_.cljs$lang$maxFixedArity = 3);

kaleidoscope.ui.clients.keycloak.login_BANG_ = (function kaleidoscope$ui$clients$keycloak$login_BANG_(keycloak){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.clients.keycloak",null,51,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Redirecting to %s for authentication",kaleidoscope.ui.clients.keycloak.AUTH_URL], null);
}),null)),null,1411132351,null);

return keycloak.login(cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"scope","scope",-439358418),"roles",new cljs.core.Keyword(null,"prompt","prompt",-78109487),"consent",new cljs.core.Keyword(null,"redirectUri","redirectUri",-530835168),kaleidoscope.ui.clients.keycloak.HOST_URL], null)));
});
kaleidoscope.ui.clients.keycloak.logout_BANG_ = (function kaleidoscope$ui$clients$keycloak$logout_BANG_(keycloak){
return keycloak.logout();
});
kaleidoscope.ui.clients.keycloak.account_management_BANG_ = (function kaleidoscope$ui$clients$keycloak$account_management_BANG_(keycloak){
return keycloak.accountManagement();
});
kaleidoscope.ui.clients.keycloak.load_profile_BANG_ = (function kaleidoscope$ui$clients$keycloak$load_profile_BANG_(keycloak_instance,success,failure){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.clients.keycloak",null,65,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading user profile..."], null);
}),null)),null,2107548783,null);

console.log(keycloak_instance);

return keycloak_instance.loadUserInfo().then(success).catch(failure);
});

//# sourceMappingURL=kaleidoscope.ui.clients.keycloak.js.map
