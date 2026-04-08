goog.provide('kaleidoscope.ui.pages.article_manager');
kaleidoscope.ui.pages.article_manager.add_human_readable_dates = (function kaleidoscope$ui$pages$article_manager$add_human_readable_dates(p__18232){
var map__18236 = p__18232;
var map__18236__$1 = cljs.core.__destructure_map(map__18236);
var branch = map__18236__$1;
var article_created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18236__$1,new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297));
var pretty_date = kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_YEAR,article_created_at);
var numeric_date = kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.yyyy_MM,article_created_at);
var short_date = kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_DAY,article_created_at);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(branch,new cljs.core.Keyword(null,"group-name","group-name",-232140110),pretty_date,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"display-name","display-name",694513143),pretty_date,new cljs.core.Keyword(null,"group-value","group-value",-1655084609),numeric_date,new cljs.core.Keyword(null,"article-created-date","article-created-date",-1838908379),short_date], 0));
});
kaleidoscope.ui.pages.article_manager.group_branches = (function kaleidoscope$ui$pages$article_manager$group_branches(branches){
return cljs.core.reverse(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"group-value","group-value",-1655084609),cljs.core.reduce_kv((function (acc,group,v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(group,new cljs.core.Keyword(null,"articles","articles",-454771639),v));
}),cljs.core.PersistentVector.EMPTY,cljs.core.group_by((function (branch){
return cljs.core.select_keys(branch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group-name","group-name",-232140110),new cljs.core.Keyword(null,"display-name","display-name",694513143)], null));
}),cljs.core.reverse(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"article-created-date","article-created-date",-1838908379),cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.pages.article_manager.add_human_readable_dates,branches)))))));
});
kaleidoscope.ui.pages.article_manager.branches = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297),"2022-03-01T00:00:00Z",new cljs.core.Keyword(null,"article-id","article-id",793965839),(1),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts",new cljs.core.Keyword(null,"article-url","article-url",-1760823624),"my-first-article",new cljs.core.Keyword(null,"author","author",2111686192),"Andrew Lai",new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),(1),new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main",new cljs.core.Keyword(null,"published-at","published-at",249684621),"2022-03-01T00:00:00Z"], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297),"2022-03-01T00:00:00Z",new cljs.core.Keyword(null,"article-id","article-id",793965839),(2),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts",new cljs.core.Keyword(null,"article-url","article-url",-1760823624),"my-second-article",new cljs.core.Keyword(null,"author","author",2111686192),"Andrew Lai",new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),(2),new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main",new cljs.core.Keyword(null,"published-at","published-at",249684621),"2022-03-01T00:00:00Z"], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297),"2022-02-01T00:00:00Z",new cljs.core.Keyword(null,"article-id","article-id",793965839),(3),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts",new cljs.core.Keyword(null,"article-url","article-url",-1760823624),"my-third-article",new cljs.core.Keyword(null,"author","author",2111686192),"Andrew Lai",new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),(3),new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main",new cljs.core.Keyword(null,"published-at","published-at",249684621),"2022-02-01T00:00:00Z"], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297),"2022-03-01T00:00:00Z",new cljs.core.Keyword(null,"article-id","article-id",793965839),(4),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts",new cljs.core.Keyword(null,"article-url","article-url",-1760823624),"neural-network-explanation",new cljs.core.Keyword(null,"author","author",2111686192),"Andrew Lai",new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),(4),new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main",new cljs.core.Keyword(null,"published-at","published-at",249684621),"2022-03-01T00:00:00Z"], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297),"2022-05-01T00:00:00Z",new cljs.core.Keyword(null,"article-id","article-id",793965839),(4),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts",new cljs.core.Keyword(null,"article-url","article-url",-1760823624),"neural-network-explanation",new cljs.core.Keyword(null,"author","author",2111686192),"Andrew Lai",new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),(5),new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"test",new cljs.core.Keyword(null,"published-at","published-at",249684621),null], null)], null);
kaleidoscope.ui.pages.article_manager._article_manager_page = (function kaleidoscope$ui$pages$article_manager$_article_manager_page(p__18238){
var map__18239 = p__18238;
var map__18239__$1 = cljs.core.__destructure_map(map__18239);
var articles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"articles","articles",-454771639));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var add_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181));
var delete_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481));
var edit_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18239__$1,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427));
var article_groups = kaleidoscope.ui.pages.article_manager.group_branches(branches);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#primary-content","div#primary-content",1350036775),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_manager,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"article-groups","article-groups",1175251219),article_groups,new cljs.core.Keyword(null,"open","open",-1763596448),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(article_groups),true))),new cljs.core.Keyword(null,"groups","groups",-136896102),groups,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),edit_article_BANG_,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),delete_article_BANG_], null)], null)], null)], null);
});
kaleidoscope.ui.pages.article_manager.title__GT_url = (function kaleidoscope$ui$pages$article_manager$title__GT_url(title){
return clojure.string.replace(clojure.string.replace(clojure.string.lower_case(cljs.core.str.cljs$core$IFn$_invoke$arity$1(title)),/[!|.|(|)|]/,"")," ","-");
});
kaleidoscope.ui.pages.article_manager.add_article_BANG_ = (function kaleidoscope$ui$pages$article_manager$add_article_BANG_(p__18240){
var map__18241 = p__18240;
var map__18241__$1 = cljs.core.__destructure_map(map__18241);
var save_data = map__18241__$1;
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18241__$1,new cljs.core.Keyword(null,"content","content",15833224),"Your new article!");
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18241__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18241__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18241__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts");
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18241__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main");
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),save_data], null));
});
kaleidoscope.ui.pages.article_manager.save_version_BANG_ = (function kaleidoscope$ui$pages$article_manager$save_version_BANG_(p__18243){
var map__18244 = p__18243;
var map__18244__$1 = cljs.core.__destructure_map(map__18244);
var save_data = map__18244__$1;
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18244__$1,new cljs.core.Keyword(null,"content","content",15833224),"Your new article!");
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18244__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts");
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18244__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),"main");
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),cljs.core.update.cljs$core$IFn$_invoke$arity$3(save_data,new cljs.core.Keyword(null,"content","content",15833224),goog.string.unescapeEntities)], null));
});
kaleidoscope.ui.pages.article_manager.edit_article_BANG_ = (function kaleidoscope$ui$pages$article_manager$edit_article_BANG_(p__18245){
var map__18246 = p__18245;
var map__18246__$1 = cljs.core.__destructure_map(map__18246);
var article_branch = map__18246__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18246__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18246__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.article-manager",null,118,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Updating editor article id to %s",article_id], null);
}),null)),null,2029194441,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version!","load-latest-version!",-1798303714),article_branch], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"update-editor-branch-id","update-editor-branch-id",71206237),article_id], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/editor"], null));
});
kaleidoscope.ui.pages.article_manager.article_manager_page = (function kaleidoscope$ui$pages$article_manager$article_manager_page(p__18247){
var map__18248 = p__18247;
var map__18248__$1 = cljs.core.__destructure_map(map__18248);
var articles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18248__$1,new cljs.core.Keyword(null,"articles","articles",-454771639));
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18248__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18248__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.article_manager._article_manager_page,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),kaleidoscope.ui.pages.article_manager.add_article_BANG_,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),(function() { 
var G__18249__delegate = function (args){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked delete!"], 0));
};
var G__18249 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__18250__i = 0, G__18250__a = new Array(arguments.length -  0);
while (G__18250__i < G__18250__a.length) {G__18250__a[G__18250__i] = arguments[G__18250__i + 0]; ++G__18250__i;}
  args = new cljs.core.IndexedSeq(G__18250__a,0,null);
} 
return G__18249__delegate.call(this,args);};
G__18249.cljs$lang$maxFixedArity = 0;
G__18249.cljs$lang$applyTo = (function (arglist__18251){
var args = cljs.core.seq(arglist__18251);
return G__18249__delegate(args);
});
G__18249.cljs$core$IFn$_invoke$arity$variadic = G__18249__delegate;
return G__18249;
})()
,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),kaleidoscope.ui.pages.article_manager.edit_article_BANG_,new cljs.core.Keyword(null,"articles","articles",-454771639),null,new cljs.core.Keyword(null,"groups","groups",-136896102),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"groups","groups",-136896102)], null))),new cljs.core.Keyword(null,"branches","branches",-1240337268),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"branches","branches",-1240337268)], null)))], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.article_manager.js.map
