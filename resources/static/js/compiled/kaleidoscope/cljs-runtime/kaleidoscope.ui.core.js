goog.provide('kaleidoscope.ui.core');
var module$node_modules$react_dom$client=shadow.js.require("module$node_modules$react_dom$client", {});
re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"boot","boot",2007860585)], null));
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075)], null));
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"request-portfolio-cards","request-portfolio-cards",-1171656429)], null));
cljs.core.enable_console_print_BANG_();
var action__17603__auto___17778 = (function (params__17604__auto__){
if(cljs.core.map_QMARK_(params__17604__auto__)){
var map__17761 = params__17604__auto__;
var map__17761__$1 = cljs.core.__destructure_map(map__17761);
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"home","home",-74557309)], null));
} else {
if(cljs.core.vector_QMARK_(params__17604__auto__)){
var vec__17762 = params__17604__auto__;
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"home","home",-74557309)], null));
} else {
return null;
}
}
});
secretary.core.add_route_BANG_("/",action__17603__auto___17778);

var action__17603__auto___17779 = (function (params__17604__auto__){
if(cljs.core.map_QMARK_(params__17604__auto__)){
var map__17765 = params__17604__auto__;
var map__17765__$1 = cljs.core.__destructure_map(map__17765);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17765__$1,new cljs.core.Keyword(null,"path","path",-188191168));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(path)], null));
} else {
if(cljs.core.vector_QMARK_(params__17604__auto__)){
var vec__17766 = params__17604__auto__;
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17766,(0),null);
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(path)], null));
} else {
return null;
}
}
});
secretary.core.add_route_BANG_("/:path",action__17603__auto___17779);

var action__17603__auto___17780 = (function (params__17604__auto__){
if(cljs.core.map_QMARK_(params__17604__auto__)){
var map__17769 = params__17604__auto__;
var map__17769__$1 = cljs.core.__destructure_map(map__17769);
var content_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17769__$1,new cljs.core.Keyword(null,"content-name","content-name",1587146818));
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"content","content",15833224)], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-article","load-article",820819634),content_name], null));
} else {
if(cljs.core.vector_QMARK_(params__17604__auto__)){
var vec__17770 = params__17604__auto__;
var content_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17770,(0),null);
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"content","content",15833224)], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-article","load-article",820819634),content_name], null));
} else {
return null;
}
}
});
secretary.core.add_route_BANG_("/content/:content-name",action__17603__auto___17780);

kaleidoscope.ui.core.HISTORY = (new goog.History());
var G__17774_17781 = kaleidoscope.ui.core.HISTORY;
goog.events.listen(G__17774_17781,goog.history.EventType.NAVIGATE,(function (event){
return secretary.core.dispatch_BANG_(event.token);
}));

G__17774_17781.setEnabled(true);

kaleidoscope.ui.core.app = (function kaleidoscope$ui$core$app(){
return kaleidoscope.ui.utils.core.lazy_component((new shadow.lazy.Loadable(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["kaleidoscope"], null),(function (){
return kaleidoscope.ui.views.app;
}))));
});
kaleidoscope.ui.core.routes = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/test",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("kaleidoscope.ui.core","home","kaleidoscope.ui.core/home",-793610695),new cljs.core.Keyword(null,"view","view",1247994814),kaleidoscope.ui.pages.home.home], null)], null)], null);
if((typeof kaleidoscope !== 'undefined') && (typeof kaleidoscope.ui !== 'undefined') && (typeof kaleidoscope.ui.core !== 'undefined') && (typeof kaleidoscope.ui.core.root !== 'undefined')){
} else {
kaleidoscope.ui.core.root = module$node_modules$react_dom$client.createRoot(goog.dom.getElement("app"));
}
if((typeof kaleidoscope !== 'undefined') && (typeof kaleidoscope.ui !== 'undefined') && (typeof kaleidoscope.ui.core !== 'undefined') && (typeof kaleidoscope.ui.core.match !== 'undefined')){
} else {
kaleidoscope.ui.core.match = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
reitit.frontend.easy.start_BANG_(reitit.frontend.router.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.core.routes,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coercion","coercion",904067157),reitit.coercion.spec.coercion], null)], null)),(function (m){
return cljs.core.reset_BANG_(kaleidoscope.ui.core.match,m);
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true], null));
kaleidoscope.ui.core.main = (function kaleidoscope$ui$core$main(){
return kaleidoscope.ui.core.root.render(reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.clients.bugsnag.ErrorBoundary,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.core.app,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fallback","fallback",761637929),(function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.loading_screen.loading_screen], null);
})], null)], null)], null)));
});
goog.exportSymbol('kaleidoscope.ui.core.main', kaleidoscope.ui.core.main);

//# sourceMappingURL=kaleidoscope.ui.core.js.map
