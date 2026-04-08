goog.provide('kaleidoscope.ui.pages.ui_manager');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
kaleidoscope.ui.pages.ui_manager._save_theme_BANG_ = (function kaleidoscope$ui$pages$ui_manager$_save_theme_BANG_(p__19922){
var map__19923 = p__19922;
var map__19923__$1 = cljs.core.__destructure_map(map__19923);
var clj_theme = map__19923__$1;
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19923__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19923__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19923__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19923__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19923__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-theme!","save-theme!",1324111825),clj_theme], null));
});
kaleidoscope.ui.pages.ui_manager._ui_manager_page = (function kaleidoscope$ui$pages$ui_manager$_ui_manager_page(p__19924){
var map__19925 = p__19924;
var map__19925__$1 = cljs.core.__destructure_map(map__19925);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19925__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19925__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var auth_token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19925__$1,new cljs.core.Keyword(null,"auth-token","auth-token",30990976));
var theme_event_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19925__$1,new cljs.core.Keyword(null,"theme-event-handlers","theme-event-handlers",-1009099525));
var theme = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19925__$1,new cljs.core.Keyword(null,"theme","theme",-1247880880));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"alignItems","alignItems",410331199),"center",new cljs.core.Keyword(null,"justifyContent","justifyContent",885406515),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.colors.color_wheel.color_wheel,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881),(200),new cljs.core.Keyword(null,"ring-thickness","ring-thickness",-1173851465),(60),new cljs.core.Keyword(null,"initial-palette","initial-palette",-1982967781),theme,new cljs.core.Keyword(null,"on-change","on-change",-732046149),new cljs.core.Keyword(null,"on-change","on-change",-732046149).cljs$core$IFn$_invoke$arity$1(theme_event_handlers)], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"alignItems","alignItems",410331199),"center",new cljs.core.Keyword(null,"justifyContent","justifyContent",885406515),"center"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Example button",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.pages.ui_manager._save_theme_BANG_,theme)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.pages.ui_manager.ui_manager_page = (function kaleidoscope$ui$pages$ui_manager$ui_manager_page(p__19926){
var map__19927 = p__19926;
var map__19927__$1 = cljs.core.__destructure_map(map__19927);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19927__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19927__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var theme_event_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19927__$1,new cljs.core.Keyword(null,"theme-event-handlers","theme-event-handlers",-1009099525));
var theme = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19927__$1,new cljs.core.Keyword(null,"theme","theme",-1247880880));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.pages.ui_manager._ui_manager_page,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"theme","theme",-1247880880),theme,new cljs.core.Keyword(null,"theme-event-handlers","theme-event-handlers",-1009099525),theme_event_handlers,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.ui_manager.js.map
