goog.provide('kaleidoscope.ui.events.article_editor');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"update-editor-branch-id","update-editor-branch-id",71206237),(function (db,p__20194){
var vec__20195 = p__20194;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20195,(0),null);
var new_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20195,(1),null);
var new_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"editor-branch-id","editor-branch-id",334901858),new_id);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Update Editor Branch ID: %s",new_id], null);
}),null)),null,-556811993,null);

return new_db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches.success","load-all-branches.success",1405590303),(function kaleidoscope$ui$events$article_editor$load_all_branches_success(db,p__20198){
var vec__20199 = p__20198;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20199,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20199,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,24,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrieved all branches: found %s",cljs.core.count(response)], null);
}),null)),null,1020775886,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.article-editor",null,25,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Branches %s",response], null);
}),null)),null,-1735060101,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"branches","branches",-1240337268),response);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches.failure","load-all-branches.failure",-1146807392),(function kaleidoscope$ui$events$article_editor$load_all_branches_failure(db,p__20216){
var vec__20218 = p__20216;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20218,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20218,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.article-editor",null,31,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve branches %s",response], null);
}),null)),null,-2042814763,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754),(function (p__20264,p__20265){
var map__20274 = p__20264;
var map__20274__$1 = cljs.core.__destructure_map(map__20274);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20274__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20275 = p__20265;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20275,(0),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,36,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Requesting all branches"], null);
}),null)),null,-1509203613,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_branches(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches.success","load-all-branches.success",1405590303)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches.failure","load-all-branches.failure",-1146807392)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version.success","load-latest-version.success",-136236950),(function (db,p__20283){
var vec__20284 = p__20283;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20284,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20284,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,48,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version success!: %s",response], null);
}),null)),null,-764810686,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049),cljs.core.first(response));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version.failure","load-latest-version.failure",-1810524638),(function (db,p__20293){
var vec__20294 = p__20293;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20294,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20294,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.article-editor",null,53,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version failure!: %s",response], null);
}),null)),null,2115094628,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version!","load-latest-version!",-1798303714),(function (p__20311,p__20312){
var map__20313 = p__20311;
var map__20313__$1 = cljs.core.__destructure_map(map__20313);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20313__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20314 = p__20312;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20314,(0),null);
var map__20317 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20314,(1),null);
var map__20317__$1 = cljs.core.__destructure_map(map__20317);
var article_branch = map__20317__$1;
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20317__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20317__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20317__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,58,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Article branch %s",article_branch], null);
}),null)),null,724710082,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,59,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version of branch id %s: %s",branch_id,branch_name], null);
}),null)),null,10803095,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.load_article_branch(article_branch),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version.success","load-latest-version.success",-136236950)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version.failure","load-latest-version.failure",-1810524638)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article.success","save-article.success",1437639310),(function (db,p__20351){
var vec__20352 = p__20351;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20352,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20352,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,72,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success saving article response: %s",response], null);
}),null)),null,1453836876,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"show-modal","show-modal",-11429385),kaleidoscope.ui.components.modals.editor.create_article_success_modal(response)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article.failure","save-article.failure",-127829259),(function (db,p__20355){
var vec__20356 = p__20355;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20356,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20356,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,79,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Save Article response: %s",response], null);
}),null)),null,1186018796,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"show-modal","show-modal",-11429385),kaleidoscope.ui.components.modals.editor.create_article_failure_modal(response)], null));

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),(function (p__20368,p__20369){
var map__20370 = p__20368;
var map__20370__$1 = cljs.core.__destructure_map(map__20370);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20370__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20371 = p__20369;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20371,(0),null);
var map__20374 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20371,(1),null);
var map__20374__$1 = cljs.core.__destructure_map(map__20374);
var article = map__20374__$1;
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20374__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20374__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20374__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,86,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saving article: %s",article], null);
}),null)),null,1859075209,null);

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.save_article_version_BANG_(article),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article.success","save-article.success",1437639310)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article.failure","save-article.failure",-127829259)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch.success","publish-branch.success",-914477687),(function (db,p__20384){
var vec__20385 = p__20384;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20385,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20385,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,98,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success publishing article response: %s",response], null);
}),null)),null,19371208,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/article-manager"], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch.failure","publish-branch.failure",1978935649),(function (db,p__20389){
var vec__20390 = p__20389;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20390,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20390,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,106,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publish article failure response: %s",response], null);
}),null)),null,-1278682601,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch!","publish-branch!",1583110887),(function (p__20393,p__20394){
var map__20395 = p__20393;
var map__20395__$1 = cljs.core.__destructure_map(map__20395);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20395__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20396 = p__20394;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20396,(0),null);
var map__20399 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20396,(1),null);
var map__20399__$1 = cljs.core.__destructure_map(map__20399);
var article = map__20399__$1;
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20399__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20399__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,111,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing article: %s",article], null);
}),null)),null,1049842427,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.save_article_version_BANG_(article),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch.success","publish-branch.success",-914477687)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch.failure","publish-branch.failure",1978935649)], null)], null)], 0))], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.article_editor.js.map
