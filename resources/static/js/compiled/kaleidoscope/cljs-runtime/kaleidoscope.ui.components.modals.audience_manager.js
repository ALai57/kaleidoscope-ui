goog.provide('kaleidoscope.ui.components.modals.audience_manager');
kaleidoscope.ui.components.modals.audience_manager.add_audience_BANG_ = (function kaleidoscope$ui$components$modals$audience_manager$add_audience_BANG_(article,group){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.modals.audience-manager",null,14,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding group `%s` (group-id `%s`) to article `%s` (article-id `%s`)",new cljs.core.Keyword(null,"display-name","display-name",694513143).cljs$core$IFn$_invoke$arity$1(group),new cljs.core.Keyword(null,"group-id","group-id",-1316082778).cljs$core$IFn$_invoke$arity$1(group),new cljs.core.Keyword(null,"article-title","article-title",-1665332721).cljs$core$IFn$_invoke$arity$1(article),new cljs.core.Keyword(null,"article-id","article-id",793965839).cljs$core$IFn$_invoke$arity$1(article)], null);
}),null)),null,121638171,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-audience","add-audience",-739162564),article,group], null));
});
kaleidoscope.ui.components.modals.audience_manager.delete_audience_BANG_ = (function kaleidoscope$ui$components$modals$audience_manager$delete_audience_BANG_(audience){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.modals.audience-manager",null,23,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting audience (group-id: `%s`) (audience-id `%s`)",new cljs.core.Keyword(null,"group-id","group-id",-1316082778).cljs$core$IFn$_invoke$arity$1(audience),new cljs.core.Keyword(null,"audience-id","audience-id",-1810207808).cljs$core$IFn$_invoke$arity$1(audience)], null);
}),null)),null,-2043951765,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-audience","delete-audience",1046473723),audience], null));
});
kaleidoscope.ui.components.modals.audience_manager._edit_audiences_modal = (function kaleidoscope$ui$components$modals$audience_manager$_edit_audiences_modal(p__18263){
var map__18264 = p__18263;
var map__18264__$1 = cljs.core.__destructure_map(map__18264);
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18264__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_close = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18264__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18264__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var article = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18264__$1,new cljs.core.Keyword(null,"article","article",-21685045));
var add_audience_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18264__$1,new cljs.core.Keyword(null,"add-audience!","add-audience!",1974274996),(function (article__$1,group){
return console.log("Add!",article__$1,group);
}));
var delete_audience_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18264__$1,new cljs.core.Keyword(null,"delete-audience!","delete-audience!",-356747086),(function (article__$1,group){
return console.log("Delete!",article__$1,group);
}));
var initial_values = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18264__$1,new cljs.core.Keyword(null,"initial-values","initial-values",1392120293));
var publicly_visible = new cljs.core.Keyword(null,"public-visibility","public-visibility",-807476940).cljs$core$IFn$_invoke$arity$1(article);
var active_groups = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"group-id","group-id",-1316082778),new cljs.core.Keyword(null,"response","response",-1068424192).cljs$core$IFn$_invoke$arity$1(initial_values)));
var initial_groups = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__18265){
var map__18266 = p__18265;
var map__18266__$1 = cljs.core.__destructure_map(map__18266);
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18266__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return cljs.core.contains_QMARK_(active_groups,group_id);
}),groups);
return kaleidoscope.ui.components.modal.basic_modal(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),goog.string.format("Manage audiences"),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"Title: "], null),new cljs.core.Keyword(null,"article-title","article-title",-1665332721).cljs$core$IFn$_invoke$arity$1(article)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"URL: "], null),["/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"article-url","article-url",-1760823624).cljs$core$IFn$_invoke$arity$1(article))].join('')], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"Audiences have permissions to view this article."], null)], null),(cljs.core.truth_(initial_values)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.input_tags.input_tags,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"options","options",99638489),groups,new cljs.core.Keyword(null,"values","values",372645556),initial_groups,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),publicly_visible,new cljs.core.Keyword(null,"on-add","on-add",-1283372042),(function (event){
var map__18267 = kaleidoscope.ui.utils.core.clojurize(event);
var map__18267__$1 = cljs.core.__destructure_map(map__18267);
var _clj_event = map__18267__$1;
var option = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18267__$1,new cljs.core.Keyword(null,"option","option",65132272));
return (add_audience_BANG_.cljs$core$IFn$_invoke$arity$2 ? add_audience_BANG_.cljs$core$IFn$_invoke$arity$2(article,option) : add_audience_BANG_.call(null,article,option));
}),new cljs.core.Keyword(null,"on-remove","on-remove",-268656163),(function (event){
var map__18268 = kaleidoscope.ui.utils.core.clojurize(event);
var map__18268__$1 = cljs.core.__destructure_map(map__18268);
var _clj_event = map__18268__$1;
var option = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18268__$1,new cljs.core.Keyword(null,"option","option",65132272));
var audience = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (audience){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"group-id","group-id",-1316082778).cljs$core$IFn$_invoke$arity$1(option),new cljs.core.Keyword(null,"group-id","group-id",-1316082778).cljs$core$IFn$_invoke$arity$1(audience));
}),new cljs.core.Keyword(null,"response","response",-1068424192).cljs$core$IFn$_invoke$arity$1(initial_values)));
return (delete_audience_BANG_.cljs$core$IFn$_invoke$arity$1 ? delete_audience_BANG_.cljs$core$IFn$_invoke$arity$1(audience) : delete_audience_BANG_.call(null,audience));
})], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Loading"], null))], null)], null),new cljs.core.Keyword(null,"footer","footer",1606445390),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"title","title",636505583),"Ok",new cljs.core.Keyword(null,"class","class",-2030961996),"btn btn-default",new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_close], null),"Ok"], null),new cljs.core.Keyword(null,"open?","open?",1238443125),open_QMARK_,new cljs.core.Keyword(null,"on-close","on-close",-761178394),on_close], null));
});
kaleidoscope.ui.components.modals.audience_manager.edit_audiences_modal = (function kaleidoscope$ui$components$modals$audience_manager$edit_audiences_modal(p__18269){
var map__18270 = p__18269;
var map__18270__$1 = cljs.core.__destructure_map(map__18270);
var args = map__18270__$1;
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_close = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"on-close","on-close",-761178394));
var audiences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"audiences","audiences",860780056));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var article = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"article","article",-21685045));
var initial_values = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"initial-values","initial-values",1392120293));
return kaleidoscope.ui.components.modals.audience_manager._edit_audiences_modal(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"add-audience!","add-audience!",1974274996),kaleidoscope.ui.components.modals.audience_manager.add_audience_BANG_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"delete-audience!","delete-audience!",-356747086),kaleidoscope.ui.components.modals.audience_manager.delete_audience_BANG_], 0)));
});

//# sourceMappingURL=kaleidoscope.ui.components.modals.audience_manager.js.map
