goog.provide('kaleidoscope.ui.pages.article_editor');
kaleidoscope.ui.pages.article_editor.publish_article_BANG_ = (function kaleidoscope$ui$pages$article_editor$publish_article_BANG_(p__18269){
var map__18270 = p__18269;
var map__18270__$1 = cljs.core.__destructure_map(map__18270);
var article_branch = map__18270__$1;
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18270__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.article-editor",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing branch %s of article %s",branch_name,article_url], null);
}),null)),null,-1970427572,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch!","publish-branch!",1583110887),article_branch], null));
});
kaleidoscope.ui.pages.article_editor.load_latest_version_BANG_ = (function kaleidoscope$ui$pages$article_editor$load_latest_version_BANG_(p__18271){
var map__18272 = p__18271;
var map__18272__$1 = cljs.core.__destructure_map(map__18272);
var article_branch = map__18272__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18272__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18272__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.article-editor",null,20,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Updating editor article id to %s",article_id], null);
}),null)),null,-1568166448,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version!","load-latest-version!",-1798303714),article_branch], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"update-editor-branch-id","update-editor-branch-id",71206237),article_id], null));
});
kaleidoscope.ui.pages.article_editor.save_version_BANG_ = (function kaleidoscope$ui$pages$article_editor$save_version_BANG_(p__18273){
var map__18274 = p__18273;
var map__18274__$1 = cljs.core.__destructure_map(map__18274);
var save_data = map__18274__$1;
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18274__$1,new cljs.core.Keyword(null,"content","content",15833224));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18274__$1,new cljs.core.Keyword(null,"title","title",636505583));
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18274__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18274__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),cljs.core.update.cljs$core$IFn$_invoke$arity$3(save_data,new cljs.core.Keyword(null,"content","content",15833224),goog.string.unescapeEntities)], null));
});
kaleidoscope.ui.pages.article_editor.get_id = (function kaleidoscope$ui$pages$article_editor$get_id(article_branch){
return new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285).cljs$core$IFn$_invoke$arity$1(article_branch);
});
kaleidoscope.ui.pages.article_editor._editor_ui = (function kaleidoscope$ui$pages$article_editor$_editor_ui(p__18275){
var map__18276 = p__18275;
var map__18276__$1 = cljs.core.__destructure_map(map__18276);
var args = map__18276__$1;
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18276__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var save_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18276__$1,new cljs.core.Keyword(null,"save-fn","save-fn",383840986));
var load_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18276__$1,new cljs.core.Keyword(null,"load-fn","load-fn",-2121144334));
var initial_editor_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18276__$1,new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18276__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.article-editor",null,37,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading Editor: %s",cljs.core.select_keys(initial_editor_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),new cljs.core.Keyword(null,"title","title",636505583)], null))], null);
}),null)),null,-240793186,null);

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.pages.article_editor.get_id(initial_editor_data)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(branches))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slate_editor.editor,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"initial-branch","initial-branch",-997184241),initial_editor_data,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"firstName","firstName",-935151957),"Andrew",new cljs.core.Keyword(null,"lastName","lastName",-240536395),"Lai"], null)], 0))], null)], null);
});
kaleidoscope.ui.pages.article_editor.editor_ui = (function kaleidoscope$ui$pages$article_editor$editor_ui(p__18277){
var map__18278 = p__18277;
var map__18278__$1 = cljs.core.__destructure_map(map__18278);
var args = map__18278__$1;
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18278__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var save_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18278__$1,new cljs.core.Keyword(null,"save-fn","save-fn",383840986));
var load_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18278__$1,new cljs.core.Keyword(null,"load-fn","load-fn",-2121144334));
var initial_editor_data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18278__$1,new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18278__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.article_editor._editor_ui,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"user","user",1532431356),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"user-profile","user-profile",-1783018313)], null))),new cljs.core.Keyword(null,"branches","branches",-1240337268),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"branches","branches",-1240337268)], null))),new cljs.core.Keyword(null,"editor-branch-id","editor-branch-id",334901858),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor-branch-id","editor-branch-id",334901858)], null))),new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049)], null))),new cljs.core.Keyword(null,"publish-fn","publish-fn",1964296975),kaleidoscope.ui.pages.article_editor.publish_article_BANG_,new cljs.core.Keyword(null,"load-fn","load-fn",-2121144334),kaleidoscope.ui.pages.article_editor.load_latest_version_BANG_,new cljs.core.Keyword(null,"save-fn","save-fn",383840986),kaleidoscope.ui.pages.article_editor.save_version_BANG_], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.article_editor.js.map
