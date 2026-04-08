goog.provide('kaleidoscope.ui.events.article_editor');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"update-editor-branch-id","update-editor-branch-id",71206237),(function (db,p__16553){
var vec__16554 = p__16553;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16554,(0),null);
var new_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16554,(1),null);
var new_db = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"editor-branch-id","editor-branch-id",334901858),new_id);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,15,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Update Editor Branch ID: %s",new_id], null);
}),null)),null,-1671445881,null);

return new_db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches.success","load-all-branches.success",1405590303),(function kaleidoscope$ui$events$article_editor$load_all_branches_success(db,p__16557){
var vec__16558 = p__16557;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16558,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16558,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,24,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrieved all branches: found %s",cljs.core.count(response)], null);
}),null)),null,2052999666,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.article-editor",null,25,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Branches %s",response], null);
}),null)),null,1619799714,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"branches","branches",-1240337268),response);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches.failure","load-all-branches.failure",-1146807392),(function kaleidoscope$ui$events$article_editor$load_all_branches_failure(db,p__16561){
var vec__16562 = p__16561;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16562,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16562,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.article-editor",null,31,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve branches %s",response], null);
}),null)),null,223673348,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754),(function (p__16565,p__16566){
var map__16567 = p__16565;
var map__16567__$1 = cljs.core.__destructure_map(map__16567);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16567__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16568 = p__16566;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16568,(0),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,36,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Requesting all branches"], null);
}),null)),null,9272443,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_branches(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches.success","load-all-branches.success",1405590303)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches.failure","load-all-branches.failure",-1146807392)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version.success","load-latest-version.success",-136236950),(function (db,p__16571){
var vec__16572 = p__16571;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16572,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16572,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,48,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version success!: %s",response], null);
}),null)),null,311533506,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"initial-editor-data","initial-editor-data",-1549626049),cljs.core.first(response));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version.failure","load-latest-version.failure",-1810524638),(function (db,p__16575){
var vec__16576 = p__16575;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16576,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16576,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.article-editor",null,53,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version failure!: %s",response], null);
}),null)),null,1991853903,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-latest-version!","load-latest-version!",-1798303714),(function (p__16579,p__16580){
var map__16581 = p__16579;
var map__16581__$1 = cljs.core.__destructure_map(map__16581);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16581__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16582 = p__16580;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16582,(0),null);
var map__16585 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16582,(1),null);
var map__16585__$1 = cljs.core.__destructure_map(map__16585);
var article_branch = map__16585__$1;
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16585__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16585__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16585__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,58,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Article branch %s",article_branch], null);
}),null)),null,748492679,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,59,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading latest version of branch id %s: %s",branch_id,branch_name], null);
}),null)),null,-112557170,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.load_article_branch(article_branch),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version.success","load-latest-version.success",-136236950)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-latest-version.failure","load-latest-version.failure",-1810524638)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article.success","save-article.success",1437639310),(function (db,p__16586){
var vec__16587 = p__16586;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16587,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16587,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,72,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success saving article response: %s",response], null);
}),null)),null,-546372740,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"show-modal","show-modal",-11429385),kaleidoscope.ui.components.modals.editor.create_article_success_modal(response)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article.failure","save-article.failure",-127829259),(function (db,p__16590){
var vec__16591 = p__16590;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16591,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16591,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,79,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Save Article response: %s",response], null);
}),null)),null,673655819,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"show-modal","show-modal",-11429385),kaleidoscope.ui.components.modals.editor.create_article_failure_modal(response)], null));

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"save-article!","save-article!",1101099628),(function (p__16594,p__16595){
var map__16596 = p__16594;
var map__16596__$1 = cljs.core.__destructure_map(map__16596);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16596__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16597 = p__16595;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16597,(0),null);
var map__16600 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16597,(1),null);
var map__16600__$1 = cljs.core.__destructure_map(map__16600);
var article = map__16600__$1;
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16600__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16600__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16600__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,86,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saving article: %s",article], null);
}),null)),null,1823097374,null);

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.save_article_version_BANG_(article),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article.success","save-article.success",1437639310)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"save-article.failure","save-article.failure",-127829259)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch.success","publish-branch.success",-914477687),(function (db,p__16601){
var vec__16602 = p__16601;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16602,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16602,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,98,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success publishing article response: %s",response], null);
}),null)),null,-1298044896,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/article-manager"], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch.failure","publish-branch.failure",1978935649),(function (db,p__16605){
var vec__16606 = p__16605;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16606,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16606,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,106,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publish article failure response: %s",response], null);
}),null)),null,797289446,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"publish-branch!","publish-branch!",1583110887),(function (p__16609,p__16610){
var map__16611 = p__16609;
var map__16611__$1 = cljs.core.__destructure_map(map__16611);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16611__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16612 = p__16610;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16612,(0),null);
var map__16615 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16612,(1),null);
var map__16615__$1 = cljs.core.__destructure_map(map__16615);
var article = map__16615__$1;
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16615__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16615__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,111,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing article: %s",article], null);
}),null)),null,-1863778499,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.publish_article_branch_BANG_(article),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch.success","publish-branch.success",-914477687)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"publish-branch.failure","publish-branch.failure",1978935649)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"toggle-public-visibility.success","toggle-public-visibility.success",-210736918),(function (db,p__16616){
var vec__16617 = p__16616;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16617,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16617,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,122,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Success toggling article visibility: %s",response], null);
}),null)),null,-145632239,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-all-branches","load-all-branches",-1181538754)], null));

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075)], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"toggle-public-visibility.failure","toggle-public-visibility.failure",-208692831),(function (db,p__16620){
var vec__16621 = p__16620;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16621,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16621,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,129,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Toggling article public visibility failure: %s",response], null);
}),null)),null,-1688521800,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"toggle-public-visibility!","toggle-public-visibility!",356302599),(function (p__16624,p__16625){
var map__16626 = p__16624;
var map__16626__$1 = cljs.core.__destructure_map(map__16626);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16626__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__16627 = p__16625;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(0),null);
var map__16630 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(1),null);
var map__16630__$1 = cljs.core.__destructure_map(map__16630);
var article = map__16630__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16630__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16630__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var new_state = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16627,(2),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-editor",null,134,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Toggling article `%s` visibility to %s",article_url,new_state], null);
}),null)),null,-655116245,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.toggle_public_visibility_BANG_(article,new_state),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"toggle-public-visibility.success","toggle-public-visibility.success",-210736918)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"toggle-public-visibility.failure","toggle-public-visibility.failure",-208692831)], null)], null)], 0))], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.article_editor.js.map
