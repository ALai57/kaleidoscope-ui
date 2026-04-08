goog.provide('kaleidoscope.ui.views');
var module$node_modules$$mui$material$index=shadow.js.require("module$node_modules$$mui$material$index", {});
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
kaleidoscope.ui.views.login_BANG_ = (function kaleidoscope$ui$views$login_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),new cljs.core.Keyword(null,"login","login",55217519)], null));
});
kaleidoscope.ui.views.check_admin_status_BANG_ = (function kaleidoscope$ui$views$check_admin_status_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-admin-route","request-admin-route",-1850410755)], null));
});
kaleidoscope.ui.views.print_current_user_BANG_ = (function kaleidoscope$ui$views$print_current_user_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"check-identity","check-identity",-1543102308)], null));
});
kaleidoscope.ui.views.logout_BANG_ = (function kaleidoscope$ui$views$logout_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),new cljs.core.Keyword(null,"logout","logout",1418564329)], null));
});
kaleidoscope.ui.views.account_management_BANG_ = (function kaleidoscope$ui$views$account_management_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak-action","keycloak-action",1441718729),new cljs.core.Keyword(null,"account-management","account-management",-810179981)], null));
});
kaleidoscope.ui.views.user_event_handlers = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"on-login-click","on-login-click",1291820089),kaleidoscope.ui.views.login_BANG_,new cljs.core.Keyword(null,"on-admin-click","on-admin-click",-133363126),kaleidoscope.ui.views.check_admin_status_BANG_,new cljs.core.Keyword(null,"on-check-auth-click","on-check-auth-click",1557916942),kaleidoscope.ui.views.print_current_user_BANG_,new cljs.core.Keyword(null,"on-logout-click","on-logout-click",1259146498),kaleidoscope.ui.views.logout_BANG_,new cljs.core.Keyword(null,"on-edit-profile-click","on-edit-profile-click",-1224328428),kaleidoscope.ui.views.account_management_BANG_], null);
kaleidoscope.ui.views.publish_article_BANG_ = (function kaleidoscope$ui$views$publish_article_BANG_(p__20149){
var map__20150 = p__20149;
var map__20150__$1 = cljs.core.__destructure_map(map__20150);
var article_branch = map__20150__$1;
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20150__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20150__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.views",null,57,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing branch %s of article %s",branch_name,article_url], null);
}),null)),null,-1541018230,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch!","publish-branch!",1583110887),article_branch], null));
});
kaleidoscope.ui.views.load_latest_version_BANG_ = (function kaleidoscope$ui$views$load_latest_version_BANG_(p__20151){
var map__20152 = p__20151;
var map__20152__$1 = cljs.core.__destructure_map(map__20152);
var article_branch = map__20152__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20152__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20152__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.views",null,62,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Updating editor article id to %s",article_id], null);
}),null)),null,-266551166,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version!","load-latest-version!",-1798303714),article_branch], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"update-editor-branch-id","update-editor-branch-id",71206237),article_id], null));
});
kaleidoscope.ui.views.save_version_BANG_ = (function kaleidoscope$ui$views$save_version_BANG_(p__20153){
var map__20154 = p__20153;
var map__20154__$1 = cljs.core.__destructure_map(map__20154);
var save_data = map__20154__$1;
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20154__$1,new cljs.core.Keyword(null,"content","content",15833224));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20154__$1,new cljs.core.Keyword(null,"title","title",636505583));
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20154__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20154__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),cljs.core.update.cljs$core$IFn$_invoke$arity$3(save_data,new cljs.core.Keyword(null,"content","content",15833224),goog.string.unescapeEntities)], null));
});
kaleidoscope.ui.views.panels = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"home","home",-74557309),new cljs.core.Keyword(null,"admin","admin",-1239101627),new cljs.core.Keyword(null,"ui-manager","ui-manager",-1847761017),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.Keyword(null,"article-manager","article-manager",2083655304),new cljs.core.Keyword(null,"image-manager","image-manager",-1318199923),new cljs.core.Keyword(null,"manager","manager",-818607470),new cljs.core.Keyword(null,"editor","editor",-989377770),new cljs.core.Keyword(null,"groups","groups",-136896102),new cljs.core.Keyword(null,"archive","archive",1466927419)],[kaleidoscope.ui.pages.home.home,kaleidoscope.ui.pages.admin.login_ui,kaleidoscope.ui.pages.ui_manager.ui_manager_page,kaleidoscope.ui.pages.article_page.article_page,kaleidoscope.ui.pages.article_manager.article_manager_page,kaleidoscope.ui.pages.image_manager.image_manager_page,kaleidoscope.ui.pages.manager.manager_page,kaleidoscope.ui.utils.core.lazy_component((new shadow.lazy.Loadable(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["editor"], null),(function (){
return kaleidoscope.ui.pages.article_editor.editor_ui;
})))),kaleidoscope.ui.pages.groups.group_page,kaleidoscope.ui.pages.article_page.archive_page]);
kaleidoscope.ui.views.app = (function kaleidoscope$ui$views$app(){
var active_panel = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"active-panel","active-panel",-1802545994)], null)));
var theme = module$node_modules$$mui$material$styles$index.createTheme(cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"theme","theme",-1247880880)], null))));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.views",null,88,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Currently displayed panel %s",active_panel], null);
}),null)),null,1317504559,null);

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$$mui$material$index.ThemeProvider,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"theme","theme",-1247880880),theme], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min-height","min-height",398480837),"100vh"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.get.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.views.panels,active_panel,kaleidoscope.ui.pages.home.home),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787)], null))),new cljs.core.Keyword(null,"login-response","login-response",844783698),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"login-response","login-response",844783698)], null))),new cljs.core.Keyword(null,"user","user",1532431356),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"user-profile","user-profile",-1783018313)], null))),new cljs.core.Keyword(null,"user-event-handlers","user-event-handlers",-1831736477),kaleidoscope.ui.views.user_event_handlers,new cljs.core.Keyword(null,"theme-event-handlers","theme-event-handlers",-1009099525),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_color_coordinates){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-local-theme","set-local-theme",1269776294),kaleidoscope.ui.theme.make_theme(new_color_coordinates)], null));
})], null),new cljs.core.Keyword(null,"fallback","fallback",761637929),(function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.loading_screen.loading_screen], null);
})], null)], null)], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.views.js.map
