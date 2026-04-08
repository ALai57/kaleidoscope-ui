goog.provide('kaleidoscope.ui.components.article_selector');
kaleidoscope.ui.components.article_selector.keydown_QMARK_ = (function kaleidoscope$ui$components$article_selector$keydown_QMARK_(event){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("keydown",event.type);
});
kaleidoscope.ui.components.article_selector.toggle_drawer = (function kaleidoscope$ui$components$article_selector$toggle_drawer(ratom,open){
return (function (event){
if(kaleidoscope.ui.components.article_selector.keydown_QMARK_(event)){
return null;
} else {
return cljs.core.reset_BANG_(ratom,open);
}
});
});
kaleidoscope.ui.components.article_selector.article_selector = (function kaleidoscope$ui$components$article_selector$article_selector(p__16105){
var map__16106 = p__16105;
var map__16106__$1 = cljs.core.__destructure_map(map__16106);
var arg = map__16106__$1;
var expand_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16106__$1,new cljs.core.Keyword(null,"expand-button","expand-button",990943226));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16106__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16106__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var showing = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [expand_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.article_selector.toggle_drawer(showing,true)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.drawer,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"anchor","anchor",1549638489),"left",new cljs.core.Keyword(null,"open","open",-1763596448),cljs.core.deref(showing),new cljs.core.Keyword(null,"variant","variant",-424354234),"temporary",new cljs.core.Keyword(null,"transitionDuration","transitionDuration",-1450020645),(500),new cljs.core.Keyword(null,"on-close","on-close",-761178394),kaleidoscope.ui.components.article_selector.toggle_drawer(showing,false)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.thin_content_cards,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"branches","branches",-1240337268),branches,new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.article_selector.js.map
