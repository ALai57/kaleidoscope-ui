goog.provide('kaleidoscope.ui.clients.kaleidoscope');
kaleidoscope.ui.clients.kaleidoscope.auth_header = (function kaleidoscope$ui$clients$kaleidoscope$auth_header(token){
return goog.string.format("Bearer %s",token);
});
kaleidoscope.ui.clients.kaleidoscope.with_authorization = (function kaleidoscope$ui$clients$kaleidoscope$with_authorization(request,token){
if(cljs.core.truth_(token)){
return cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.Keyword(null,"Authorization","Authorization",-1017527462)], null),kaleidoscope.ui.clients.kaleidoscope.auth_header(token));
} else {
return request;
}
});
kaleidoscope.ui.clients.kaleidoscope.get_portfolio = (function kaleidoscope$ui$clients$kaleidoscope$get_portfolio(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/projects-portfolio",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_articles = (function kaleidoscope$ui$clients$kaleidoscope$get_articles(var_args){
var G__15718 = arguments.length;
switch (G__15718) {
case 0:
return kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$0 = (function (){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/compositions",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
}));

(kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$core$IFn$_invoke$arity$1 = (function (article_name){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/compositions/%s",article_name),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
}));

(kaleidoscope.ui.clients.kaleidoscope.get_articles.cljs$lang$maxFixedArity = 1);

kaleidoscope.ui.clients.kaleidoscope.get_branches = (function kaleidoscope$ui$clients$kaleidoscope$get_branches(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/branches",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.title__GT_url = (function kaleidoscope$ui$clients$kaleidoscope$title__GT_url(title){
return clojure.string.replace(clojure.string.replace(clojure.string.lower_case(cljs.core.str.cljs$core$IFn$_invoke$arity$1(title)),/[!|.|(|)|]/,"")," ","-");
});
kaleidoscope.ui.clients.kaleidoscope.save_article_version_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$save_article_version_BANG_(p__15719){
var map__15720 = p__15719;
var map__15720__$1 = cljs.core.__destructure_map(map__15720);
var article = map__15720__$1;
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15720__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15720__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15720__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var sanitized_title = kaleidoscope.ui.clients.kaleidoscope.title__GT_url(article_title);
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/articles/%s/branches/%s/versions",(function (){var or__5045__auto__ = article_url;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return sanitized_title;
}
})(),(function (){var or__5045__auto__ = branch_name;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "main";
}
})()),new cljs.core.Keyword(null,"params","params",710516235),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(article,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725),"thoughts"),new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Content-Type","Content-Type",-692731875),"application/json"], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.load_article_branch = (function kaleidoscope$ui$clients$kaleidoscope$load_article_branch(p__15721){
var map__15722 = p__15721;
var map__15722__$1 = cljs.core.__destructure_map(map__15722);
var article_branch = map__15722__$1;
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15722__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/branches/%s/versions",branch_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.publish_article_branch_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$publish_article_branch_BANG_(p__15723){
var map__15724 = p__15723;
var map__15724__$1 = cljs.core.__destructure_map(map__15724);
var article = map__15724__$1;
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15724__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15724__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/articles/%s/branches/%s/publish",article_url,branch_name),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.toggle_public_visibility_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$toggle_public_visibility_BANG_(p__15725,public_visibility){
var map__15726 = p__15725;
var map__15726__$1 = cljs.core.__destructure_map(map__15726);
var article = map__15726__$1;
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15726__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/articles/%s",article_url),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"public-visibility","public-visibility",-807476940),public_visibility], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_group_member_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_group_member_BANG_(p__15727,member_id){
var map__15728 = p__15727;
var map__15728__$1 = cljs.core.__destructure_map(map__15728);
var group = map__15728__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15728__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s/members/%s",group_id,member_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_group_member_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_group_member_BANG_(p__15729,member){
var map__15730 = p__15729;
var map__15730__$1 = cljs.core.__destructure_map(map__15730);
var group = map__15730__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15730__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s/members",group_id),new cljs.core.Keyword(null,"params","params",710516235),member,new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_group_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_group_BANG_(p__15731){
var map__15732 = p__15731;
var map__15732__$1 = cljs.core.__destructure_map(map__15732);
var group = map__15732__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15732__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s",group_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_group_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_group_BANG_(group_name){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),"/groups",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display-name","display-name",694513143),group_name], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_groups = (function kaleidoscope$ui$clients$kaleidoscope$get_groups(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/groups",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_audience_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_audience_BANG_(p__15733,p__15734){
var map__15735 = p__15733;
var map__15735__$1 = cljs.core.__destructure_map(map__15735);
var article = map__15735__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15735__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var map__15736 = p__15734;
var map__15736__$1 = cljs.core.__destructure_map(map__15736);
var group = map__15736__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15736__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),"/article-audiences",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"article-id","article-id",793965839),article_id,new cljs.core.Keyword(null,"group-id","group-id",-1316082778),group_id], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_audience_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_audience_BANG_(p__15737){
var map__15738 = p__15737;
var map__15738__$1 = cljs.core.__destructure_map(map__15738);
var audience = map__15738__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15738__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/article-audiences/%s",id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_audiences_for_article = (function kaleidoscope$ui$clients$kaleidoscope$get_audiences_for_article(p__15739){
var map__15740 = p__15739;
var map__15740__$1 = cljs.core.__destructure_map(map__15740);
var article = map__15740__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15740__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/article-audiences",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"article-id","article-id",793965839),article_id], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_admin_route = (function kaleidoscope$ui$clients$kaleidoscope$get_admin_route(){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/admin",new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
/**
 * Uses the new /v2/photos endpoint
 */
kaleidoscope.ui.clients.kaleidoscope.get_image_metadata = (function kaleidoscope$ui$clients$kaleidoscope$get_image_metadata(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/v2/photos",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
/**
 * For now, we get image metadata from the `processed/` endpoint, which
 *   returns a list of the contents of the `processed` folder. Should be
 *   replaced with a mechanism for indexing images outside S3.
 */
kaleidoscope.ui.clients.kaleidoscope.add_photo_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_photo_BANG_(files){
var form_data = (new FormData());
var seq__15741_15754 = cljs.core.seq(files);
var chunk__15742_15755 = null;
var count__15743_15756 = (0);
var i__15744_15757 = (0);
while(true){
if((i__15744_15757 < count__15743_15756)){
var file_15758 = chunk__15742_15755.cljs$core$IIndexed$_nth$arity$2(null,i__15744_15757);
console.log("Attaching file to upload request: ",file_15758);

form_data.append(file_15758.name,file_15758);


var G__15759 = seq__15741_15754;
var G__15760 = chunk__15742_15755;
var G__15761 = count__15743_15756;
var G__15762 = (i__15744_15757 + (1));
seq__15741_15754 = G__15759;
chunk__15742_15755 = G__15760;
count__15743_15756 = G__15761;
i__15744_15757 = G__15762;
continue;
} else {
var temp__5804__auto___15763 = cljs.core.seq(seq__15741_15754);
if(temp__5804__auto___15763){
var seq__15741_15764__$1 = temp__5804__auto___15763;
if(cljs.core.chunked_seq_QMARK_(seq__15741_15764__$1)){
var c__5568__auto___15765 = cljs.core.chunk_first(seq__15741_15764__$1);
var G__15766 = cljs.core.chunk_rest(seq__15741_15764__$1);
var G__15767 = c__5568__auto___15765;
var G__15768 = cljs.core.count(c__5568__auto___15765);
var G__15769 = (0);
seq__15741_15754 = G__15766;
chunk__15742_15755 = G__15767;
count__15743_15756 = G__15768;
i__15744_15757 = G__15769;
continue;
} else {
var file_15770 = cljs.core.first(seq__15741_15764__$1);
console.log("Attaching file to upload request: ",file_15770);

form_data.append(file_15770.name,file_15770);


var G__15771 = cljs.core.next(seq__15741_15764__$1);
var G__15772 = null;
var G__15773 = (0);
var G__15774 = (0);
seq__15741_15754 = G__15771;
chunk__15742_15755 = G__15772;
count__15743_15756 = G__15773;
i__15744_15757 = G__15774;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),"/v2/photos",new cljs.core.Keyword(null,"body","body",-2049205669),form_data,new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.edit_photo_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$edit_photo_BANG_(p__15749){
var map__15750 = p__15749;
var map__15750__$1 = cljs.core.__destructure_map(map__15750);
var payload = map__15750__$1;
var photo_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15750__$1,new cljs.core.Keyword(null,"photo-id","photo-id",108052797));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/v2/photos/%s",photo_id),new cljs.core.Keyword(null,"params","params",710516235),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(payload,new cljs.core.Keyword(null,"photo-id","photo-id",108052797)),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_themes = (function kaleidoscope$ui$clients$kaleidoscope$get_themes(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/themes",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.update_theme_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$update_theme_BANG_(p__15751){
var map__15752 = p__15751;
var map__15752__$1 = cljs.core.__destructure_map(map__15752);
var theme = map__15752__$1;
var config = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15752__$1,new cljs.core.Keyword(null,"config","config",994861415));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15752__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15752__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/themes/%s",id),new cljs.core.Keyword(null,"params","params",710516235),theme,new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Content-Type","Content-Type",-692731875),"application/json"], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});

//# sourceMappingURL=kaleidoscope.ui.clients.kaleidoscope.js.map
