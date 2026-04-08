goog.provide('kaleidoscope.ui.components.article_cards');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$styled_icons$remix_fill$GitBranch$GitBranch_esm=shadow.js.require("module$node_modules$$styled_icons$remix_fill$GitBranch$GitBranch_esm", {});
kaleidoscope.ui.components.article_cards.article_tags__GT_icon = (function kaleidoscope$ui$components$article_cards$article_tags__GT_icon(article_tags){
var G__23874 = article_tags;
switch (G__23874) {
case "research":
return "static/images/nav-bar/neuron-icon.svg";

break;
case "archive":
return "static/images/nav-bar/archive-icon.svg";

break;
case "about":
return "static/images/nav-bar/andrew-silhouette-icon.svg";

break;
case "thoughts":
return "static/images/nav-bar/andrew-head-icon.svg";

break;
default:
return "images/nav-bar/unknown-user.svg";

}
});
kaleidoscope.ui.components.article_cards.article_card = (function kaleidoscope$ui$components$article_cards$article_card(p__23875){
var map__23876 = p__23875;
var map__23876__$1 = cljs.core.__destructure_map(map__23876);
var article = map__23876__$1;
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"created-at","created-at",-89248644));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23876__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"text-white bg-light mb-3 article-card"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container-fluid","div.container-fluid",3929737),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row","div.row",133678515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-xs-center.card-icon","div.text-xs-center.card-icon",1195507433),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(30deg, %s 6%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"main","main",-2117802661)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.p-y-2","div.p-y-2",374419851),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.p-y-2","h1.p-y-2",-69111140),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.fa.fa-2x","img.fa.fa-2x",-1972534193),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),kaleidoscope.ui.components.article_cards.article_tags__GT_icon(article_tags),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-9.text-dark.card-description","div.col-sm-9.text-dark.card-description",-1495868264),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5.card-title>a","h5.card-title>a",2040660040),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),goog.string.format("#/content/%s",article_url)], null),article_title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.card-text","p.card-text",815200113),kaleidoscope.ui.utils.core.date(created_at)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.card-text","p.card-text",815200113),summary], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.article_cards.truncate = (function kaleidoscope$ui$components$article_cards$truncate(article_title,chars_per_row,rows){
var chars = (chars_per_row * rows);
if((cljs.core.count(article_title) <= chars)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),"\n"].join('');
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.take.cljs$core$IFn$_invoke$arity$2((chars - (3)),article_title),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["..."], null)));
}
});
kaleidoscope.ui.components.article_cards.log_click = (function kaleidoscope$ui$components$article_cards$log_click(event){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked thin article card"], 0));
});
kaleidoscope.ui.components.article_cards.article_branch = (function kaleidoscope$ui$components$article_cards$article_branch(p__23877,branch_name){
var map__23878 = p__23877;
var map__23878__$1 = cljs.core.__destructure_map(map__23878);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23878__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23878__$1,new cljs.core.Keyword(null,"style","style",-496642736));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"startIcon","startIcon",-640516750),reagent.core.create_element.cljs$core$IFn$_invoke$arity$2(module$node_modules$$styled_icons$remix_fill$GitBranch$GitBranch_esm.GitBranch,({"width": "20px"})),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([style,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null)], 0)),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_click], null),branch_name], null);
});
kaleidoscope.ui.components.article_cards.latest = (function kaleidoscope$ui$components$article_cards$latest(coll){
if(cljs.core.empty_QMARK_(coll)){
return null;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,coll);
}
});
/**
 * For displaying an article's lineage and branches
 */
kaleidoscope.ui.components.article_cards.thin_article_card = (function kaleidoscope$ui$components$article_cards$thin_article_card(var_args){
var G__23880 = arguments.length;
switch (G__23880) {
case 1:
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$1 = (function (article){
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2(article,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"n-rows","n-rows",1762514969),(2)], null));
}));

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2 = (function (p__23881,p__23882){
var map__23883 = p__23881;
var map__23883__$1 = cljs.core.__destructure_map(map__23883);
var article = map__23883__$1;
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23883__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23883__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23883__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23883__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23883__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var map__23884 = p__23882;
var map__23884__$1 = cljs.core.__destructure_map(map__23884);
var options = map__23884__$1;
var n_rows = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23884__$1,new cljs.core.Keyword(null,"n-rows","n-rows",1762514969),(2));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23884__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.article_cards.log_click);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion_summary,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"text-white bg-light thin-article-card zoom-card-icon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_action_area,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container-fluid","div.container-fluid",3929737),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row.flex-items-xs-middle","div.row.flex-items-xs-middle",1736113744),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-1.bg-primary.text-xs-center.thin-card-icon","div.col-sm-1.bg-primary.text-xs-center.thin-card-icon",596604423),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.fa.fa-2x","img.fa.fa-2x",-1972534193),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),kaleidoscope.ui.components.article_cards.article_tags__GT_icon(article_tags),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"max-height","max-height",-612563804),"50px",new cljs.core.Keyword(null,"padding","padding",1660304693),"3px",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col.bg-light.text-dark.thin-card-description","div.col.bg-light.text-dark.thin-card-description",495773494),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h6","h6",557293780),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px"], null)], null),kaleidoscope.ui.components.article_cards.truncate(article_title,(33),n_rows)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.card-text","p.card-text",815200113),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"darkgray"], null)], null),(function (){var published_at = kaleidoscope.ui.components.article_cards.latest(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"published-at","published-at",249684621),branches));
var created_at = kaleidoscope.ui.components.article_cards.latest(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"created-at","created-at",-89248644),branches));
if(cljs.core.truth_(published_at)){
return goog.string.format("PUB: %s",kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_DAY_YEAR,published_at));
} else {
if(cljs.core.truth_(created_at)){
return goog.string.format("NEW: %s",kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_DAY_YEAR,created_at));
} else {
return null;
}
}
})()], null)], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion_details,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$iter__23885(s__23886){
return (new cljs.core.LazySeq(null,(function (){
var s__23886__$1 = s__23886;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23886__$1);
if(temp__5804__auto__){
var s__23886__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23886__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23886__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23888 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23887 = (0);
while(true){
if((i__23887 < size__5522__auto__)){
var map__23889 = cljs.core._nth(c__5521__auto__,i__23887);
var map__23889__$1 = cljs.core.__destructure_map(map__23889);
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23889__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23889__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
cljs.core.chunk_append(b__23888,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_branch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__23887,map__23889,map__23889__$1,branch_name,branch_id,c__5521__auto__,size__5522__auto__,b__23888,s__23886__$2,temp__5804__auto__,map__23883,map__23883__$1,article,article_tags,article_url,article_title,article_id,branches,map__23884,map__23884__$1,options,n_rows,on_click){
return (function (event){
var G__23890 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),branch_name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),branch_id], 0));
return (on_click.cljs$core$IFn$_invoke$arity$1 ? on_click.cljs$core$IFn$_invoke$arity$1(G__23890) : on_click.call(null,G__23890));
});})(i__23887,map__23889,map__23889__$1,branch_name,branch_id,c__5521__auto__,size__5522__auto__,b__23888,s__23886__$2,temp__5804__auto__,map__23883,map__23883__$1,article,article_tags,article_url,article_title,article_id,branches,map__23884,map__23884__$1,options,n_rows,on_click))
], null),branch_name], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),branch_name], null)));

var G__23911 = (i__23887 + (1));
i__23887 = G__23911;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23888),kaleidoscope$ui$components$article_cards$iter__23885(cljs.core.chunk_rest(s__23886__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23888),null);
}
} else {
var map__23891 = cljs.core.first(s__23886__$2);
var map__23891__$1 = cljs.core.__destructure_map(map__23891);
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23891__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23891__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_branch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (map__23891,map__23891__$1,branch_name,branch_id,s__23886__$2,temp__5804__auto__,map__23883,map__23883__$1,article,article_tags,article_url,article_title,article_id,branches,map__23884,map__23884__$1,options,n_rows,on_click){
return (function (event){
var G__23892 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),branch_name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),branch_id], 0));
return (on_click.cljs$core$IFn$_invoke$arity$1 ? on_click.cljs$core$IFn$_invoke$arity$1(G__23892) : on_click.call(null,G__23892));
});})(map__23891,map__23891__$1,branch_name,branch_id,s__23886__$2,temp__5804__auto__,map__23883,map__23883__$1,article,article_tags,article_url,article_title,article_id,branches,map__23884,map__23884__$1,options,n_rows,on_click))
], null),branch_name], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),branch_name], null)),kaleidoscope$ui$components$article_cards$iter__23885(cljs.core.rest(s__23886__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(branches);
})()], null)], null);
}));

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$lang$maxFixedArity = 2);

kaleidoscope.ui.components.article_cards.thin_content_cards = (function kaleidoscope$ui$components$article_cards$thin_content_cards(p__23895){
var map__23896 = p__23895;
var map__23896__$1 = cljs.core.__destructure_map(map__23896);
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23896__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23896__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var grouped_branches = cljs.core.reduce_kv((function (acc,m,xs){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"branches","branches",-1240337268),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__23893_SHARP_){
return cljs.core.select_keys(p1__23893_SHARP_,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword(null,"published-at","published-at",249684621)], null));
}),xs)));
}),cljs.core.PersistentVector.EMPTY,cljs.core.group_by((function (p1__23894_SHARP_){
return cljs.core.select_keys(p1__23894_SHARP_,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"article-id","article-id",793965839),new cljs.core.Keyword(null,"author","author",2111686192),new cljs.core.Keyword(null,"article-url","article-url",-1760823624),new cljs.core.Keyword(null,"article-title","article-title",-1665332721),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725)], null));
}),branches));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"500px"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__23897(s__23898){
return (new cljs.core.LazySeq(null,(function (){
var s__23898__$1 = s__23898;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23898__$1);
if(temp__5804__auto__){
var s__23898__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23898__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23898__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23900 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23899 = (0);
while(true){
if((i__23899 < size__5522__auto__)){
var map__23901 = cljs.core._nth(c__5521__auto__,i__23899);
var map__23901__$1 = cljs.core.__destructure_map(map__23901);
var content = map__23901__$1;
var branches__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23901__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23901__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
cljs.core.chunk_append(b__23900,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.thin_article_card,content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),goog.string.format("%s-%s",branches__$1,article_id)], null)));

var G__23912 = (i__23899 + (1));
i__23899 = G__23912;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23900),kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__23897(cljs.core.chunk_rest(s__23898__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23900),null);
}
} else {
var map__23902 = cljs.core.first(s__23898__$2);
var map__23902__$1 = cljs.core.__destructure_map(map__23902);
var content = map__23902__$1;
var branches__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23902__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23902__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.thin_article_card,content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),goog.string.format("%s-%s",branches__$1,article_id)], null)),kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__23897(cljs.core.rest(s__23898__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(grouped_branches);
})()], null);
});
kaleidoscope.ui.components.article_cards.recent_content_cards = (function kaleidoscope$ui$components$article_cards$recent_content_cards(p__23903){
var map__23904 = p__23903;
var map__23904__$1 = cljs.core.__destructure_map(map__23904);
var recent_content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23904__$1,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#recent-content","div#recent-content",897607431),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"grid",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#recent-article-cards.card-group","div#recent-article-cards.card-group",1086768140),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__23905(s__23906){
return (new cljs.core.LazySeq(null,(function (){
var s__23906__$1 = s__23906;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23906__$1);
if(temp__5804__auto__){
var s__23906__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23906__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23906__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23908 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23907 = (0);
while(true){
if((i__23907 < size__5522__auto__)){
var article = cljs.core._nth(c__5521__auto__,i__23907);
cljs.core.chunk_append(b__23908,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.article_cards.article_card,article], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article)], null)));

var G__23913 = (i__23907 + (1));
i__23907 = G__23913;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23908),kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__23905(cljs.core.chunk_rest(s__23906__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23908),null);
}
} else {
var article = cljs.core.first(s__23906__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.article_cards.article_card,article], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article)], null)),kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__23905(cljs.core.rest(s__23906__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.reverse(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"published-at","published-at",249684621),recent_content)));
})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.article_cards.js.map
