goog.provide('kaleidoscope.ui.pages.image_manager');
kaleidoscope.ui.pages.image_manager._add_photo_BANG_ = (function kaleidoscope$ui$pages$image_manager$_add_photo_BANG_(event){
var files = kaleidoscope.ui.utils.events.event_files(event);
console.log("UPLOAD EVENT",files);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-photo!","add-photo!",-214035333),files], null));
});
kaleidoscope.ui.pages.image_manager._image_manager_page = (function kaleidoscope$ui$pages$image_manager$_image_manager_page(p__18234){
var map__18235 = p__18234;
var map__18235__$1 = cljs.core.__destructure_map(map__18235);
var images = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18235__$1,new cljs.core.Keyword(null,"images","images",1757475080));
var albums = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18235__$1,new cljs.core.Keyword(null,"albums","albums",-2017039447));
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18235__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18235__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var auth_token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18235__$1,new cljs.core.Keyword(null,"auth-token","auth-token",30990976));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.image_browser.image_browser,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"images","images",1757475080),images,new cljs.core.Keyword(null,"photo-manager","photo-manager",-1460293253),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add-photo","add-photo",11690143),kaleidoscope.ui.pages.image_manager._add_photo_BANG_], null)], null)], null)], null)], null);
});
kaleidoscope.ui.pages.image_manager.image_manager_page = (function kaleidoscope$ui$pages$image_manager$image_manager_page(p__18237){
var map__18242 = p__18237;
var map__18242__$1 = cljs.core.__destructure_map(map__18242);
var images = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18242__$1,new cljs.core.Keyword(null,"images","images",1757475080));
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18242__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18242__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.image_manager._image_manager_page,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"auth-token","auth-token",30990976),(function (){var or__5045__auto__ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"keycloak","keycloak",605028133)], null))).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})(),new cljs.core.Keyword(null,"images","images",1757475080),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"images-metadata","images-metadata",909025836)], null))),new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.image_manager.js.map
