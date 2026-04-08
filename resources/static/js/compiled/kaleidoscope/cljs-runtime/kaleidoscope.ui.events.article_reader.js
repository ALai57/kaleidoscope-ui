goog.provide('kaleidoscope.ui.events.article_reader');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-article.success","load-article.success",1227470716),(function kaleidoscope$ui$events$article_reader$load_article(db,p__15775){
var vec__15776 = p__15775;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15776,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15776,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-reader",null,12,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading article:",cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(response,new cljs.core.Keyword(null,"content","content",15833224))], null);
}),null)),null,-916907777,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"active-content","active-content",-1148974551),response);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-article-failure","load-article-failure",-1602856174),(function kaleidoscope$ui$events$article_reader$load_article_failure(db,p__15781){
var vec__15782 = p__15781;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15782,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15782,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-reader",null,17,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed loading article:",response], null);
}),null)),null,-1414205596,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"active-content","active-content",-1148974551),response);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-article","load-article",820819634),(function (p__15785,p__15786){
var map__15787 = p__15785;
var map__15787__$1 = cljs.core.__destructure_map(map__15787);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15787__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__15788 = p__15786;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15788,(0),null);
var article_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15788,(1),null);
var token = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$1(article_name),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-article.success","load-article.success",1227470716)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-article.failure","load-article.failure",2131853271)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-recent-articles.success","load-recent-articles.success",1751689385),(function kaleidoscope$ui$events$article_reader$load_recent_articles(db,p__15791){
var vec__15792 = p__15791;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15792,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15792,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.article-reader",null,34,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrieved recent articles: found %s",cljs.core.count(response)], null);
}),null)),null,1080146722,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.article-reader",null,35,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Articles %s",response], null);
}),null)),null,872193317,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460),response);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-recent-articles","load-recent-articles",-2063761075),(function (p__15795,p__15796){
var map__15797 = p__15795;
var map__15797__$1 = cljs.core.__destructure_map(map__15797);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15797__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__15798 = p__15796;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15798,(0),null);
var token = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$0(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles.success","load-recent-articles.success",1751689385)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-recent-articles.success","load-recent-articles.success",1751689385)], null)], null)], 0))], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.article_reader.js.map
