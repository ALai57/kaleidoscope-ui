goog.provide('kaleidoscope.ui.components.snackbar');
kaleidoscope.ui.components.snackbar.clickaway_QMARK_ = (function kaleidoscope$ui$components$snackbar$clickaway_QMARK_(reason){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("clickaway",reason);
});
kaleidoscope.ui.components.snackbar.handle_close = (function kaleidoscope$ui$components$snackbar$handle_close(ratom,event,reason){
if((!(kaleidoscope.ui.components.snackbar.clickaway_QMARK_(reason)))){
return cljs.core.reset_BANG_(ratom,false);
} else {
return null;
}
});
kaleidoscope.ui.components.snackbar.basic_snackbar = (function kaleidoscope$ui$components$snackbar$basic_snackbar(p__43545){
var map__43546 = p__43545;
var map__43546__$1 = cljs.core.__destructure_map(map__43546);
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__43546__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__43546__$1,new cljs.core.Keyword(null,"level","level",1290497552),"info");
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__43546__$1,new cljs.core.Keyword(null,"open?","open?",1238443125),true);
var auto_hide_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__43546__$1,new cljs.core.Keyword(null,"auto-hide-duration","auto-hide-duration",1058363602),(6000));
var showing = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(open_QMARK_);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.snackbar,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"open","open",-1763596448),cljs.core.deref(showing),new cljs.core.Keyword(null,"auto-hide-duration","auto-hide-duration",1058363602),auto_hide_duration,new cljs.core.Keyword(null,"on-close","on-close",-761178394),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.snackbar.handle_close,showing)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.alert,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"severity","severity",175684886),level,new cljs.core.Keyword(null,"on-close","on-close",-761178394),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.snackbar.handle_close,showing)], null),message], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.snackbar.js.map
