goog.provide('kaleidoscope.ui.components.modals.audience_manager');
kaleidoscope.ui.components.modals.audience_manager.add_audience_BANG_ = (function kaleidoscope$ui$components$modals$audience_manager$add_audience_BANG_(article,group){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["ARTICLE",article,"GROUP",group], 0));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience","add-audience",-739162564),article,group], null));
});
kaleidoscope.ui.components.modals.audience_manager.delete_audience_BANG_ = (function kaleidoscope$ui$components$modals$audience_manager$delete_audience_BANG_(article,group){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-audience","delete-audience",1046473723),article,group], null));
});
kaleidoscope.ui.components.modals.audience_manager._edit_audiences_modal = (function kaleidoscope$ui$components$modals$audience_manager$_edit_audiences_modal(p__16337){
var map__16338 = p__16337;
var map__16338__$1 = cljs.core.__destructure_map(map__16338);
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16338__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_close = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16338__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
var audiences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16338__$1,new cljs.core.Keyword(null,"audiences","audiences",860780056));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16338__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var article = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16338__$1,new cljs.core.Keyword(null,"article","article",-21685045));
var add_audience_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16338__$1,new cljs.core.Keyword(null,"add-audience!","add-audience!",1974274996),(function (article__$1,group){
return console.log("Add!",article__$1,group);
}));
var delete_audience_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16338__$1,new cljs.core.Keyword(null,"delete-audience!","delete-audience!",-356747086),(function (article__$1,group){
return console.log("Delete!",article__$1,group);
}));
return kaleidoscope.ui.components.modal.basic_modal(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),"Manage audiences",new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"Members of audiences added here will have permissions to view this article."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.input_tags.input_tags,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"options","options",99638489),groups,new cljs.core.Keyword(null,"values","values",372645556),audiences,new cljs.core.Keyword(null,"on-add","on-add",-1283372042),(function (event,list,reason,group){
var G__16339 = article;
var G__16340 = kaleidoscope.ui.utils.core.clojurize(group);
return (add_audience_BANG_.cljs$core$IFn$_invoke$arity$2 ? add_audience_BANG_.cljs$core$IFn$_invoke$arity$2(G__16339,G__16340) : add_audience_BANG_.call(null,G__16339,G__16340));
}),new cljs.core.Keyword(null,"on-remove","on-remove",-268656163),(function (event,list,reason,group){
var G__16342 = article;
var G__16343 = kaleidoscope.ui.utils.core.clojurize(group);
return (delete_audience_BANG_.cljs$core$IFn$_invoke$arity$2 ? delete_audience_BANG_.cljs$core$IFn$_invoke$arity$2(G__16342,G__16343) : delete_audience_BANG_.call(null,G__16342,G__16343));
})], null)], null)], null)], null),new cljs.core.Keyword(null,"footer","footer",1606445390),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"title","title",636505583),"Ok",new cljs.core.Keyword(null,"class","class",-2030961996),"btn btn-default",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_close], null),"Ok"], null),new cljs.core.Keyword(null,"open?","open?",1238443125),open_QMARK_,new cljs.core.Keyword(null,"on-close","on-close",-761178394),on_close], null));
});
kaleidoscope.ui.components.modals.audience_manager.edit_audiences_modal = (function kaleidoscope$ui$components$modals$audience_manager$edit_audiences_modal(p__16353){
var map__16354 = p__16353;
var map__16354__$1 = cljs.core.__destructure_map(map__16354);
var args = map__16354__$1;
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16354__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_close = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16354__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
var audiences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16354__$1,new cljs.core.Keyword(null,"audiences","audiences",860780056));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16354__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var article = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16354__$1,new cljs.core.Keyword(null,"article","article",-21685045));
return kaleidoscope.ui.components.modals.audience_manager._edit_audiences_modal(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"add-audience!","add-audience!",1974274996),kaleidoscope.ui.components.modals.audience_manager.add_audience_BANG_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"delete-audience!","delete-audience!",-356747086),kaleidoscope.ui.components.modals.audience_manager.delete_audience_BANG_], 0)));
});

//# sourceMappingURL=kaleidoscope.ui.components.modals.audience_manager.js.map
