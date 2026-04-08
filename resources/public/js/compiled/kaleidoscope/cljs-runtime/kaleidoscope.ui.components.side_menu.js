goog.provide('kaleidoscope.ui.components.side_menu');
kaleidoscope.ui.components.side_menu.keydown_QMARK_ = (function kaleidoscope$ui$components$side_menu$keydown_QMARK_(event){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("keydown",event.type);
});
kaleidoscope.ui.components.side_menu.toggle_drawer = (function kaleidoscope$ui$components$side_menu$toggle_drawer(ratom,open){
return (function (event){
if(kaleidoscope.ui.components.side_menu.keydown_QMARK_(event)){
return null;
} else {
return cljs.core.reset_BANG_(ratom,open);
}
});
});
kaleidoscope.ui.components.side_menu.drawer_contents = (function kaleidoscope$ui$components$side_menu$drawer_contents(p__43369){
var map__43370 = p__43369;
var map__43370__$1 = cljs.core.__destructure_map(map__43370);
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43370__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.radio_group.basic_radio_group,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"group-name","group-name",-232140110),"Notification Settings",new cljs.core.Keyword(null,"state","state",-1988618099),notification_type,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_value){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"change-notification-type","change-notification-type",-896361581),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(new_value)], null));
}),new cljs.core.Keyword(null,"elements","elements",657646735),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),"modal",new cljs.core.Keyword(null,"label","label",1718410804),"Modal"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),"snackbar",new cljs.core.Keyword(null,"label","label",1718410804),"Snackbar"], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.side_menu.side_menu = (function kaleidoscope$ui$components$side_menu$side_menu(p__43374){
var map__43375 = p__43374;
var map__43375__$1 = cljs.core.__destructure_map(map__43375);
var expand_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43375__$1,new cljs.core.Keyword(null,"expand-button","expand-button",990943226));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43375__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var showing = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var current_notification_settings = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(notification_type);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [expand_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.side_menu.toggle_drawer(showing,true)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.drawer,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"anchor","anchor",1549638489),"left",new cljs.core.Keyword(null,"open","open",-1763596448),cljs.core.deref(showing),new cljs.core.Keyword(null,"variant","variant",-424354234),"temporary",new cljs.core.Keyword(null,"transitionDuration","transitionDuration",-1450020645),(500),new cljs.core.Keyword(null,"on-close","on-close",-761178394),kaleidoscope.ui.components.side_menu.toggle_drawer(showing,false)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.side_menu.drawer_contents,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),current_notification_settings], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.side_menu.js.map
