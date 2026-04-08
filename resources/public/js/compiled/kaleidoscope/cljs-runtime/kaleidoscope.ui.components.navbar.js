goog.provide('kaleidoscope.ui.components.navbar');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
kaleidoscope.ui.components.navbar.navigate_home_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_home_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"home","home",-74557309)], null));
});
kaleidoscope.ui.components.navbar.navigate_manager_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_manager_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"manager","manager",-818607470)], null));
});
kaleidoscope.ui.components.navbar.navigate_archive_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_archive_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"archive","archive",1466927419)], null));
});
kaleidoscope.ui.components.navbar.zoom_icon = (function (){var G__18189 = (function (p__18190){
var map__18191 = p__18190;
var map__18191__$1 = cljs.core.__destructure_map(map__18191);
var theme = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18191__$1,new cljs.core.Keyword(null,"theme","theme",-1247880880));
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"maxWidth","maxWidth",-1375124795),"100%",new cljs.core.Keyword(null,"float","float",-1732389368),"right",new cljs.core.Keyword(null,"position","position",-2011731912),"relative","&:hover",({"z-index": (1000), "transform": "scale(1.12)"})], null));
});
var fexpr__18188 = module$node_modules$$mui$material$styles$index.styled("a");
return (fexpr__18188.cljs$core$IFn$_invoke$arity$1 ? fexpr__18188.cljs$core$IFn$_invoke$arity$1(G__18189) : fexpr__18188.call(null,G__18189));
})();
kaleidoscope.ui.components.navbar._nav_bar = (function kaleidoscope$ui$components$navbar$_nav_bar(p__18192){
var map__18193 = p__18192;
var map__18193__$1 = cljs.core.__destructure_map(map__18193);
var icons = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18193__$1,new cljs.core.Keyword(null,"icons","icons",-297140977));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.app_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"static",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(4deg, %s 40%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.container,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"xl"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.toolbar,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"disable-gutters","disable-gutters",1438156978),true], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.navbar.zoom_icon,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"#/home"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.navbutton","img.navbutton",-213547787),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/favicon.svg",new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.navbar.navigate_home_BANG_], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flex-grow","flex-grow",1865160747),(1)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),"none",new cljs.core.Keyword(null,"sm","sm",-1402575065),"block"], null)], null)], null),icons], null)], null)], null)], null);
});
kaleidoscope.ui.components.navbar.avatar_icon = (function kaleidoscope$ui$components$navbar$avatar_icon(var_args){
var args__5775__auto__ = [];
var len__5769__auto___18202 = arguments.length;
var i__5770__auto___18203 = (0);
while(true){
if((i__5770__auto___18203 < len__5769__auto___18202)){
args__5775__auto__.push((arguments[i__5770__auto___18203]));

var G__18204 = (i__5770__auto___18203 + (1));
i__5770__auto___18203 = G__18204;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.navbar.avatar_icon.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.navbar.avatar_icon.cljs$core$IFn$_invoke$arity$variadic = (function (p__18196,children){
var map__18197 = p__18196;
var map__18197__$1 = cljs.core.__destructure_map(map__18197);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18197__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18197__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
var href = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18197__$1,new cljs.core.Keyword(null,"href","href",-793805698));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.navbar.zoom_icon,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),href], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.avatar,(function (){var G__18198 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"alt","alt",-3214426),(cljs.core.truth_(user)?new cljs.core.Keyword(null,"firstName","firstName",-935151957).cljs$core$IFn$_invoke$arity$1(user):"Not logged in"),new cljs.core.Keyword(null,"class","class",-2030961996),"navbutton",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"inherit",new cljs.core.Keyword(null,"height","height",1025178622),"inherit",new cljs.core.Keyword(null,"padding","padding",1660304693),"10px",new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(30deg, %s 40%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null),new cljs.core.Keyword(null,"img-props","img-props",1179566493),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"navbutton"], null)], null);
if(cljs.core.truth_(src)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18198,new cljs.core.Keyword(null,"src","src",-1651076051),src);
} else {
return G__18198;
}
})()], null),children)], null);
}));

(kaleidoscope.ui.components.navbar.avatar_icon.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.navbar.avatar_icon.cljs$lang$applyTo = (function (seq18194){
var G__18195 = cljs.core.first(seq18194);
var seq18194__$1 = cljs.core.next(seq18194);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18195,seq18194__$1);
}));

kaleidoscope.ui.components.navbar.nav_bar = (function kaleidoscope$ui$components$navbar$nav_bar(p__18199){
var map__18200 = p__18199;
var map__18200__$1 = cljs.core.__destructure_map(map__18200);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18200__$1,new cljs.core.Keyword(null,"user","user",1532431356));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar._nav_bar,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"icons","icons",-297140977),(function (){var G__18201 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null);
var G__18201__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__18201,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/admin",new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/user.svg"], null)], null))
;
var G__18201__$2 = (cljs.core.truth_(user)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__18201__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/manager"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.edit.edit,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class-name","class-name",945142584),"navbutton",new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null)):G__18201__$1);
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__18201__$2,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/archive",new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/articles.svg"], null)], null));

})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.navbar.js.map
