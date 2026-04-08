goog.provide('kaleidoscope.ui.clients.kaleidoscope');
kaleidoscope.ui.clients.kaleidoscope.auth_header = (function kaleidoscope$ui$clients$kaleidoscope$auth_header(token){
return goog.string.format("Bearer %s",token);
});
kaleidoscope.ui.clients.kaleidoscope.with_authorization = (function kaleidoscope$ui$clients$kaleidoscope$with_authorization(request,token){
return cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"headers","headers",-835030129),new cljs.core.Keyword(null,"Authorization","Authorization",-1017527462)], null),kaleidoscope.ui.clients.kaleidoscope.auth_header(token));
});
kaleidoscope.ui.clients.kaleidoscope.get_portfolio = (function kaleidoscope$ui$clients$kaleidoscope$get_portfolio(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/projects-portfolio",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_articles = (function kaleidoscope$ui$clients$kaleidoscope$get_articles(var_args){
var G__20156 = arguments.length;
switch (G__20156) {
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
kaleidoscope.ui.clients.kaleidoscope.save_article_version_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$save_article_version_BANG_(p__20157){
var map__20158 = p__20157;
var map__20158__$1 = cljs.core.__destructure_map(map__20158);
var article = map__20158__$1;
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20158__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20158__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20158__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
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
kaleidoscope.ui.clients.kaleidoscope.load_article_branch = (function kaleidoscope$ui$clients$kaleidoscope$load_article_branch(p__20159){
var map__20160 = p__20159;
var map__20160__$1 = cljs.core.__destructure_map(map__20160);
var article_branch = map__20160__$1;
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20160__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/branches/%s/versions",branch_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.publish_article_branch_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$publish_article_branch_BANG_(p__20161){
var map__20162 = p__20161;
var map__20162__$1 = cljs.core.__destructure_map(map__20162);
var article = map__20162__$1;
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20162__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20162__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/articles/%s/branches/%s/publish",article_url,branch_name),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_group_member_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_group_member_BANG_(p__20163,member_id){
var map__20164 = p__20163;
var map__20164__$1 = cljs.core.__destructure_map(map__20164);
var group = map__20164__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20164__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s/members/%s",group_id,member_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_group_member_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_group_member_BANG_(p__20165,member){
var map__20166 = p__20165;
var map__20166__$1 = cljs.core.__destructure_map(map__20166);
var group = map__20166__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20166__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s/members",group_id),new cljs.core.Keyword(null,"params","params",710516235),member,new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_group_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_group_BANG_(p__20167){
var map__20168 = p__20167;
var map__20168__$1 = cljs.core.__destructure_map(map__20168);
var group = map__20168__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20168__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/groups/%s",group_id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_group_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_group_BANG_(group_name){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),"/groups",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display-name","display-name",694513143),group_name], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_groups = (function kaleidoscope$ui$clients$kaleidoscope$get_groups(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/groups",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.add_audience_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$add_audience_BANG_(p__20169,p__20170){
var map__20171 = p__20169;
var map__20171__$1 = cljs.core.__destructure_map(map__20171);
var article = map__20171__$1;
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20171__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var map__20172 = p__20170;
var map__20172__$1 = cljs.core.__destructure_map(map__20172);
var group = map__20172__$1;
var group_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20172__$1,new cljs.core.Keyword(null,"group-id","group-id",-1316082778));
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),"/article-audiences",new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"article-id","article-id",793965839),article_id,new cljs.core.Keyword(null,"group-id","group-id",-1316082778),group_id], null),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.delete_audience_BANG_ = (function kaleidoscope$ui$clients$kaleidoscope$delete_audience_BANG_(p__20173){
var map__20174 = p__20173;
var map__20174__$1 = cljs.core.__destructure_map(map__20174);
var audience = map__20174__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20174__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"uri","uri",-774711847),goog.string.format("/article-audiences/%s",id),new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
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
var seq__20175_20270 = cljs.core.seq(files);
var chunk__20176_20271 = null;
var count__20177_20272 = (0);
var i__20178_20273 = (0);
while(true){
if((i__20178_20273 < count__20177_20272)){
var file_20278 = chunk__20176_20271.cljs$core$IIndexed$_nth$arity$2(null,i__20178_20273);
console.log("Attaching file to upload request: ",file_20278);

form_data.append(file_20278.name,file_20278);


var G__20327 = seq__20175_20270;
var G__20328 = chunk__20176_20271;
var G__20329 = count__20177_20272;
var G__20330 = (i__20178_20273 + (1));
seq__20175_20270 = G__20327;
chunk__20176_20271 = G__20328;
count__20177_20272 = G__20329;
i__20178_20273 = G__20330;
continue;
} else {
var temp__5804__auto___20331 = cljs.core.seq(seq__20175_20270);
if(temp__5804__auto___20331){
var seq__20175_20332__$1 = temp__5804__auto___20331;
if(cljs.core.chunked_seq_QMARK_(seq__20175_20332__$1)){
var c__5568__auto___20334 = cljs.core.chunk_first(seq__20175_20332__$1);
var G__20335 = cljs.core.chunk_rest(seq__20175_20332__$1);
var G__20336 = c__5568__auto___20334;
var G__20337 = cljs.core.count(c__5568__auto___20334);
var G__20338 = (0);
seq__20175_20270 = G__20335;
chunk__20176_20271 = G__20336;
count__20177_20272 = G__20337;
i__20178_20273 = G__20338;
continue;
} else {
var file_20339 = cljs.core.first(seq__20175_20332__$1);
console.log("Attaching file to upload request: ",file_20339);

form_data.append(file_20339.name,file_20339);


var G__20340 = cljs.core.next(seq__20175_20332__$1);
var G__20341 = null;
var G__20342 = (0);
var G__20343 = (0);
seq__20175_20270 = G__20340;
chunk__20176_20271 = G__20341;
count__20177_20272 = G__20342;
i__20178_20273 = G__20343;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"uri","uri",-774711847),"/v2/photos",new cljs.core.Keyword(null,"body","body",-2049205669),form_data,new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});
kaleidoscope.ui.clients.kaleidoscope.get_themes = (function kaleidoscope$ui$clients$kaleidoscope$get_themes(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),"/themes",new cljs.core.Keyword(null,"format","format",-1306924766),ajax.core.json_request_format(),new cljs.core.Keyword(null,"response-format","response-format",1664465322),ajax.core.json_response_format(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true], null))], null);
});

//# sourceMappingURL=kaleidoscope.ui.clients.kaleidoscope.js.map
