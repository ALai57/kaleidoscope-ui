goog.provide('kaleidoscope.ui.components.article');
/**
 * Takes a string with styles and parses it into properties and value tokens
 */
kaleidoscope.ui.components.article.string__GT_tokens = (function kaleidoscope$ui$components$article$string__GT_tokens(style){
if(typeof style === 'string'){
} else {
throw (new Error("Assert failed: (string? style)"));
}

var _PERCENT_ = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__23597_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__23597_SHARP_,/:/);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([clojure.string.split.cljs$core$IFn$_invoke$arity$2(style,/;/)], 0)));
if(cljs.core.even_QMARK_(cljs.core.count(_PERCENT_))){
} else {
throw (new Error("Assert failed: (even? (count %))"));
}

return _PERCENT_;
});
/**
 * Takes a seq of tokens with the properties (even) and their values (odd)
 * and returns a map of {properties values}
 */
kaleidoscope.ui.components.article.tokens__GT_map = (function kaleidoscope$ui$components$article$tokens__GT_map(tokens){
if(cljs.core.even_QMARK_(cljs.core.count(tokens))){
} else {
throw (new Error("Assert failed: (even? (count tokens))"));
}

var _PERCENT_ = cljs.core.zipmap(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__23598_SHARP_,p2__23599_SHARP_){
if(cljs.core.even_QMARK_(p1__23598_SHARP_)){
return p2__23599_SHARP_;
} else {
return null;
}
}),tokens),cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__23600_SHARP_,p2__23601_SHARP_){
if(cljs.core.odd_QMARK_(p1__23600_SHARP_)){
return p2__23601_SHARP_;
} else {
return null;
}
}),tokens));
if(cljs.core.map_QMARK_(_PERCENT_)){
} else {
throw (new Error("Assert failed: (map? %)"));
}

return _PERCENT_;
});
/**
 * Takes an inline style attribute string and converts it to a React Style map
 */
kaleidoscope.ui.components.article.style__GT_map = (function kaleidoscope$ui$components$article$style__GT_map(style){
if(cljs.core.empty_QMARK_(style)){
return style;
} else {
return kaleidoscope.ui.components.article.tokens__GT_map(kaleidoscope.ui.components.article.string__GT_tokens(style));
}
});
/**
 * Transforms a style inline attribute into a style map for React
 */
kaleidoscope.ui.components.article.hiccup__GT_sablono = (function kaleidoscope$ui$components$article$hiccup__GT_sablono(coll){
return clojure.walk.postwalk((function (x){
if(cljs.core.map_QMARK_(x)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(x,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"style","style",-496642736)], null),kaleidoscope.ui.components.article.style__GT_map);
} else {
return x;
}
}),coll);
});
kaleidoscope.ui.components.article.format_title = (function kaleidoscope$ui$components$article$format_title(title){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.article-title","h2.article-title",-973129039),title], null);
});
kaleidoscope.ui.components.article.format_js = (function kaleidoscope$ui$components$article$format_js(js_script){
document.getElementById("primary-content").appendChild((function (){var G__23602 = document.createElement("script");
G__23602.setAttribute("id",js_script);

G__23602.setAttribute("class","dynamicjs");

G__23602.setAttribute("src",js_script);

return G__23602;
})());

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_script)], null));
});
/**
 * https://github.com/reagent-project/reagent/issues/413
 */
kaleidoscope.ui.components.article.unescape = (function kaleidoscope$ui$components$article$unescape(v){
if(cljs.core.vector_QMARK_(v)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.article.unescape,v);
} else {
if(typeof v === 'string'){
return goog.string.unescapeEntities(v);
} else {
return v;

}
}
});
kaleidoscope.ui.components.article.format_content = (function kaleidoscope$ui$components$article$format_content(content){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#article-content","div#article-content",-192328177),(cljs.core.truth_(content)?kaleidoscope.ui.components.article.hiccup__GT_sablono(kaleidoscope.ui.components.article.unescape(hickory.convert.hickory_to_hiccup(content))):null)], null);
});
kaleidoscope.ui.components.article.insert_dynamic_js_BANG_ = (function kaleidoscope$ui$components$article$insert_dynamic_js_BANG_(content){
if(cljs.core.empty_QMARK_(content)){
return null;
} else {
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.article.format_js,content);
}
});
kaleidoscope.ui.components.article.__GT_hickory = (function kaleidoscope$ui$components$article$__GT_hickory(s){
return cljs.core.first(cljs.core.map.cljs$core$IFn$_invoke$arity$2(hickory.core.as_hickory,hickory.core.parse_fragment(s)));
});
kaleidoscope.ui.components.article.select_html = (function kaleidoscope$ui$components$article$select_html(hickory__$1){
return cljs.core.first(hickory.select.select(hickory.select.and.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hickory.select.not(hickory.select.tag(new cljs.core.Keyword(null,"script","script",-1304443801)))], 0)),hickory__$1));
});
kaleidoscope.ui.components.article.select_js = (function kaleidoscope$ui$components$article$select_js(hickory__$1){
return hickory.select.select(hickory.select.tag(new cljs.core.Keyword(null,"script","script",-1304443801)),hickory__$1);
});
kaleidoscope.ui.components.article.article = (function kaleidoscope$ui$components$article$article(p__23603){
var map__23604 = p__23603;
var map__23604__$1 = cljs.core.__destructure_map(map__23604);
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23604__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var author = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23604__$1,new cljs.core.Keyword(null,"author","author",2111686192));
var modified_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23604__$1,new cljs.core.Keyword(null,"modified-at","modified-at",-932048179));
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23604__$1,new cljs.core.Keyword(null,"content","content",15833224));
var js_content = kaleidoscope.ui.components.article.select_js(kaleidoscope.ui.components.article.__GT_hickory(content));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article",null,103,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [goog.string.format("Selecting JS content from %s : %s",content,js_content)], null);
}),null)),null,1680739338,null);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#goodies","div#goodies",-1142985811),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2.article-title","h2.article-title",-973129039),article_title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.article-subheading","div.article-subheading",-909807045),["Author: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(author)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.article-subheading","div.article-subheading",-909807045),kaleidoscope.ui.utils.core.date(modified_at)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.divider.py-1.bg-dark","div.divider.py-1.bg-dark",214753621)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),kaleidoscope.ui.components.article.format_content(kaleidoscope.ui.components.article.select_html(kaleidoscope.ui.components.article.__GT_hickory(content)))], null),kaleidoscope.ui.components.article.insert_dynamic_js_BANG_(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"src","src",-1651076051),new cljs.core.Keyword(null,"attrs","attrs",-2090668713)),js_content))], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.article.js.map
