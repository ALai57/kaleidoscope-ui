goog.provide('kaleidoscope.ui.pages.admin');
kaleidoscope.ui.pages.admin.authentication_failure = (function kaleidoscope$ui$pages$admin$authentication_failure(){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Authentication failed!",new cljs.core.Keyword(null,"body","body",-2049205669),"Not Authenticated",new cljs.core.Keyword(null,"level","level",1290497552),"error"], null);
});
kaleidoscope.ui.pages.admin.authentication_success = (function kaleidoscope$ui$pages$admin$authentication_success(){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Authentication success!",new cljs.core.Keyword(null,"body","body",-2049205669),"Authenticated",new cljs.core.Keyword(null,"level","level",1290497552),"success"], null);
});
kaleidoscope.ui.pages.admin.success_QMARK_ = (function kaleidoscope$ui$pages$admin$success_QMARK_(p__18219){
var map__18220 = p__18219;
var map__18220__$1 = cljs.core.__destructure_map(map__18220);
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18220__$1,new cljs.core.Keyword(null,"status","status",-1997798413));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),status);
});
kaleidoscope.ui.pages.admin.modal_notifier = (function kaleidoscope$ui$pages$admin$modal_notifier(response){
if(kaleidoscope.ui.pages.admin.success_QMARK_(response)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.modal.basic_modal,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.pages.admin.authentication_success(),new cljs.core.Keyword(null,"open?","open?",1238443125),true)], null);
} else {
if((response == null)){
return null;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.modal.basic_modal,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.pages.admin.authentication_failure(),new cljs.core.Keyword(null,"open?","open?",1238443125),true)], null);

}
}
});
kaleidoscope.ui.pages.admin.snackbar_notifier = (function kaleidoscope$ui$pages$admin$snackbar_notifier(response){
if(kaleidoscope.ui.pages.admin.success_QMARK_(response)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.snackbar.basic_snackbar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),"User is logged in!",new cljs.core.Keyword(null,"level","level",1290497552),"success"], null)], null);
} else {
if((response == null)){
return null;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.snackbar.basic_snackbar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"message","message",-406056002),"You have not authenticated. Please login!",new cljs.core.Keyword(null,"level","level",1290497552),"error"], null)], null);

}
}
});
kaleidoscope.ui.pages.admin.NOTIFIERS = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"modal","modal",-1031880850),kaleidoscope.ui.pages.admin.modal_notifier,new cljs.core.Keyword(null,"snackbar","snackbar",1792678973),kaleidoscope.ui.pages.admin.snackbar_notifier], null);
kaleidoscope.ui.pages.admin.user_profile = (function kaleidoscope$ui$pages$admin$user_profile(p__18221){
var map__18222 = p__18221;
var map__18222__$1 = cljs.core.__destructure_map(map__18222);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18222__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var user_event_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18222__$1,new cljs.core.Keyword(null,"user-event-handlers","user-event-handlers",-1831736477));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18222__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var map__18223 = user;
var map__18223__$1 = cljs.core.__destructure_map(map__18223);
var avatar_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18223__$1,new cljs.core.Keyword(null,"avatar_url","avatar_url",1520721439));
var username = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18223__$1,new cljs.core.Keyword(null,"username","username",1605666410));
var given_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18223__$1,new cljs.core.Keyword(null,"given_name","given_name",2027851744));
var family_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18223__$1,new cljs.core.Keyword(null,"family_name","family_name",853479664));
var email = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18223__$1,new cljs.core.Keyword(null,"email","email",1415816706));
var map__18224 = user_event_handlers;
var map__18224__$1 = cljs.core.__destructure_map(map__18224);
var on_admin_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18224__$1,new cljs.core.Keyword(null,"on-admin-click","on-admin-click",-133363126));
var on_edit_profile_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18224__$1,new cljs.core.Keyword(null,"on-edit-profile-click","on-edit-profile-click",-1224328428));
var on_logout_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18224__$1,new cljs.core.Keyword(null,"on-logout-click","on-logout-click",1259146498));
var on_login_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18224__$1,new cljs.core.Keyword(null,"on-login-click","on-login-click",1291820089));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#primary-content","div#primary-content",1350036775),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.paper,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"elevation","elevation",-1609348796),(3),new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"padding","padding",1660304693),"15px",new cljs.core.Keyword(null,"display","display",242065432),"block",new cljs.core.Keyword(null,"flex-grow","flex-grow",1865160747),(1),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"500px"], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h3"], null),(cljs.core.truth_(user)?goog.string.format("Welcome %s %s!",given_name,family_name):goog.string.format("Welcome!"))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),(cljs.core.truth_(user)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Edit user profile",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_edit_profile_click], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Login",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_login_click], null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.side_menu.side_menu,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"expand-button","expand-button",990943226),(function (props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([props,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),"Settings"], null)], 0))], null);
}),new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),(cljs.core.truth_(user)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"text","text",-1790561697),"Logout",new cljs.core.Keyword(null,"color","color",1011675173),"secondary",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_logout_click], null)], null):null)], null)], null)], null)], null);
});
kaleidoscope.ui.pages.admin.login_ui = (function kaleidoscope$ui$pages$admin$login_ui(p__18231){
var map__18233 = p__18231;
var map__18233__$1 = cljs.core.__destructure_map(map__18233);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18233__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var user_event_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18233__$1,new cljs.core.Keyword(null,"user-event-handlers","user-event-handlers",-1831736477));
var login_response = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18233__$1,new cljs.core.Keyword(null,"login-response","login-response",844783698));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18233__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
if(cljs.core.truth_(login_response)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.admin",null,80,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Checked if user is authenticated:",login_response], null);
}),null)),null,-655661686,null);
} else {
}

var notifier = cljs.core.get.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.pages.admin.NOTIFIERS,notification_type,kaleidoscope.ui.pages.admin.modal_notifier);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"user","user",1532431356),user], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [notifier,login_response], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.pages.admin.user_profile,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"user-event-handlers","user-event-handlers",-1831736477),user_event_handlers,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.admin.js.map
