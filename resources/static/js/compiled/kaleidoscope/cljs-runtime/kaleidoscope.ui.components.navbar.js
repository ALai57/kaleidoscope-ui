goog.provide('kaleidoscope.ui.components.navbar');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
kaleidoscope.ui.components.navbar.IMAGE_SIZE = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"25px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"60px",new cljs.core.Keyword(null,"md","md",707286655),"80px",new cljs.core.Keyword(null,"lg","lg",-80787836),"80px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"100px"], null);
kaleidoscope.ui.components.navbar.navigate_home_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_home_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"home","home",-74557309)], null));
});
kaleidoscope.ui.components.navbar.navigate_manager_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_manager_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"manager","manager",-818607470)], null));
});
kaleidoscope.ui.components.navbar.navigate_archive_BANG_ = (function kaleidoscope$ui$components$navbar$navigate_archive_BANG_(){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-active-panel","set-active-panel",-965871124),new cljs.core.Keyword(null,"archive","archive",1466927419)], null));
});
kaleidoscope.ui.components.navbar.zoom_icon = (function (){var G__19853 = (function (p__19854){
var map__19855 = p__19854;
var map__19855__$1 = cljs.core.__destructure_map(map__19855);
var theme = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19855__$1,new cljs.core.Keyword(null,"theme","theme",-1247880880));
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"maxWidth","maxWidth",-1375124795),"100%",new cljs.core.Keyword(null,"float","float",-1732389368),"right",new cljs.core.Keyword(null,"position","position",-2011731912),"relative","&:hover",({"z-index": (1000), "transform": "scale(1.12)"})], null));
});
var fexpr__19852 = module$node_modules$$mui$material$styles$index.styled("a");
return (fexpr__19852.cljs$core$IFn$_invoke$arity$1 ? fexpr__19852.cljs$core$IFn$_invoke$arity$1(G__19853) : fexpr__19852.call(null,G__19853));
})();
kaleidoscope.ui.components.navbar._nav_bar = (function kaleidoscope$ui$components$navbar$_nav_bar(p__19856){
var map__19857 = p__19856;
var map__19857__$1 = cljs.core.__destructure_map(map__19857);
var icons = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19857__$1,new cljs.core.Keyword(null,"icons","icons",-297140977));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.app_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"static",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"50px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"80px",new cljs.core.Keyword(null,"md","md",707286655),"100px",new cljs.core.Keyword(null,"lg","lg",-80787836),"100px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"120px"], null),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(4deg, %s 40%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.container,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"xl"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.toolbar,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"disable-gutters","disable-gutters",1438156978),true], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.navbar.zoom_icon,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"#/home"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"component","component",1555936782),"img",new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/favicon.svg",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"90px",new cljs.core.Keyword(null,"float","float",-1732389368),"right",new cljs.core.Keyword(null,"margin-top","margin-top",392161226),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),"2px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"10px"], null),new cljs.core.Keyword(null,"width","width",-384071477),kaleidoscope.ui.components.navbar.IMAGE_SIZE,new cljs.core.Keyword(null,"height","height",1025178622),kaleidoscope.ui.components.navbar.IMAGE_SIZE], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.navbar.navigate_home_BANG_], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flex-grow","flex-grow",1865160747),(1)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-height","max-height",-612563804),"100%"], null)], null),icons], null)], null)], null)], null);
});
kaleidoscope.ui.components.navbar.avatar_icon = (function kaleidoscope$ui$components$navbar$avatar_icon(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19868 = arguments.length;
var i__5770__auto___19869 = (0);
while(true){
if((i__5770__auto___19869 < len__5769__auto___19868)){
args__5775__auto__.push((arguments[i__5770__auto___19869]));

var G__19870 = (i__5770__auto___19869 + (1));
i__5770__auto___19869 = G__19870;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.navbar.avatar_icon.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.navbar.avatar_icon.cljs$core$IFn$_invoke$arity$variadic = (function (p__19860,children){
var map__19861 = p__19860;
var map__19861__$1 = cljs.core.__destructure_map(map__19861);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19861__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19861__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
var href = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19861__$1,new cljs.core.Keyword(null,"href","href",-793805698));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.navbar.zoom_icon,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),href], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.avatar,(function (){var G__19862 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"alt","alt",-3214426),(cljs.core.truth_(user)?new cljs.core.Keyword(null,"firstName","firstName",-935151957).cljs$core$IFn$_invoke$arity$1(user):"Not logged in"),new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"4px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"8px",new cljs.core.Keyword(null,"md","md",707286655),"8px",new cljs.core.Keyword(null,"lg","lg",-80787836),"8px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"8px"], null),new cljs.core.Keyword(null,"marginTop","marginTop",-1403015220),"0px",new cljs.core.Keyword(null,"width","width",-384071477),kaleidoscope.ui.components.navbar.IMAGE_SIZE,new cljs.core.Keyword(null,"height","height",1025178622),kaleidoscope.ui.components.navbar.IMAGE_SIZE,new cljs.core.Keyword(null,"marginLeft","marginLeft",-551287007),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"4px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"5px",new cljs.core.Keyword(null,"md","md",707286655),"6px",new cljs.core.Keyword(null,"lg","lg",-80787836),"7px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"8px"], null),new cljs.core.Keyword(null,"marginRight","marginRight",457313535),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"4px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"5px",new cljs.core.Keyword(null,"md","md",707286655),"6px",new cljs.core.Keyword(null,"lg","lg",-80787836),"7px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"8px"], null),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(30deg, %s 40%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null)], null);
if(cljs.core.truth_(src)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19862,new cljs.core.Keyword(null,"src","src",-1651076051),src);
} else {
return G__19862;
}
})()], null),children)], null);
}));

(kaleidoscope.ui.components.navbar.avatar_icon.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.navbar.avatar_icon.cljs$lang$applyTo = (function (seq19858){
var G__19859 = cljs.core.first(seq19858);
var seq19858__$1 = cljs.core.next(seq19858);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19859,seq19858__$1);
}));

kaleidoscope.ui.components.navbar.ADMIN_ROLE = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.location.hostname),":admin"].join('');
kaleidoscope.ui.components.navbar.nav_bar = (function kaleidoscope$ui$components$navbar$nav_bar(p__19863){
var map__19864 = p__19863;
var map__19864__$1 = cljs.core.__destructure_map(map__19864);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19864__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var roles = cljs.core.set(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(user,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"realm_access","realm_access",-812487891),new cljs.core.Keyword(null,"roles","roles",143379530)], null)));
var site_admin = cljs.core.contains_QMARK_(roles,kaleidoscope.ui.components.navbar.ADMIN_ROLE);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar._nav_bar,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"icons","icons",-297140977),(function (){var G__19865 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null);
var G__19865__$1 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__19865,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/about-this-site"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.info.info,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null))
;
var G__19865__$2 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__19865__$1,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/admin",new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/user.svg"], null)], null))
;
var G__19865__$3 = ((site_admin)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__19865__$2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/manager"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.edit.edit,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null)):G__19865__$2);
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__19865__$3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.navbar.avatar_icon,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"href","href",-793805698),"#/archive",new cljs.core.Keyword(null,"src","src",-1651076051),"static/images/nav-bar/articles.svg"], null)], null));

})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.navbar.js.map
