goog.provide('kaleidoscope.ui.components.manager');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
kaleidoscope.ui.components.manager.CAPABILITIES = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Articles",new cljs.core.Keyword(null,"description","description",-1428560544),"Create and manage Articles",new cljs.core.Keyword(null,"src","src",-1651076051),"/images/writing.svg",new cljs.core.Keyword(null,"alt","alt",-3214426),"Manage articles",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/article-manager"], null));
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Images (WIP)",new cljs.core.Keyword(null,"description","description",-1428560544),"Create and manage Images. Not implemented yet!",new cljs.core.Keyword(null,"alt","alt",-3214426),"Manage images",new cljs.core.Keyword(null,"src","src",-1651076051),"/images/images.svg",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/image-manager"], null));
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"Audiences (WIP)",new cljs.core.Keyword(null,"description","description",-1428560544),"Control who has access to your content by defining an Audience",new cljs.core.Keyword(null,"src","src",-1651076051),"/images/audiences.svg",new cljs.core.Keyword(null,"alt","alt",-3214426),"Manage audiences",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/groups"], null));
})], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),"UI Customization (WIP)",new cljs.core.Keyword(null,"description","description",-1428560544),"Customize the look and feel of the site",new cljs.core.Keyword(null,"src","src",-1651076051),"/images/audiences.svg",new cljs.core.Keyword(null,"alt","alt",-3214426),"Manage UI Customization",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"set-hash-fragment","set-hash-fragment",891690381),"/ui-manager"], null));
})], null)], null);
kaleidoscope.ui.components.manager.manager_card = (function kaleidoscope$ui$components$manager$manager_card(p__16325){
var map__16326 = p__16325;
var map__16326__$1 = cljs.core.__destructure_map(map__16326);
var capability = map__16326__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16326__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16326__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
var alt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16326__$1,new cljs.core.Keyword(null,"alt","alt",-3214426));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16326__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16326__$1,new cljs.core.Keyword(null,"description","description",-1428560544));
var palette = new cljs.core.Keyword(null,"palette","palette",-456203511).cljs$core$IFn$_invoke$arity$1(kaleidoscope.ui.utils.core.clojurize(module$node_modules$$mui$material$styles$index.useTheme()));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex","& > :not(style)",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"m","m",1632677161),(1),new cljs.core.Keyword(null,"width","width",-384071477),(256),new cljs.core.Keyword(null,"height","height",1025178622),(256)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"elevation","elevation",-1609348796),(10)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_action_area,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click,new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& > :not(style)",new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"m","m",1632677161),(1),new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"width","width",-384071477),"auto",new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"auto",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"auto",new cljs.core.Keyword(null,"margin-top","margin-top",392161226),"5px",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"5px"], null),"&",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"0px",new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(15deg, %s 30%, %s 100%)",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"light","light",1918998747)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(palette,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.Keyword(null,"main","main",-2117802661)], null)))], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_media,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"component","component",1555936782),"img",new cljs.core.Keyword(null,"src","src",-1651076051),src,new cljs.core.Keyword(null,"alt","alt",-3214426),alt,new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"100%",new cljs.core.Keyword(null,"max-height","max-height",-612563804),"142px"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_content,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h5"], null),name], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"body2",new cljs.core.Keyword(null,"color","color",1011675173),"text.secondary"], null),description], null)], null)], null)], null);
});
kaleidoscope.ui.components.manager.manager_cards = (function kaleidoscope$ui$components$manager$manager_cards(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.container,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-wrap","flex-wrap",455413707),"wrap",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"row",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$manager$manager_cards_$_iter__16327(s__16328){
return (new cljs.core.LazySeq(null,(function (){
var s__16328__$1 = s__16328;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__16328__$1);
if(temp__5804__auto__){
var s__16328__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__16328__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__16328__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__16330 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__16329 = (0);
while(true){
if((i__16329 < size__5522__auto__)){
var capability = cljs.core._nth(c__5521__auto__,i__16329);
cljs.core.chunk_append(b__16330,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.manager.manager_card,capability], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(capability)], null)));

var G__16333 = (i__16329 + (1));
i__16329 = G__16333;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__16330),kaleidoscope$ui$components$manager$manager_cards_$_iter__16327(cljs.core.chunk_rest(s__16328__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__16330),null);
}
} else {
var capability = cljs.core.first(s__16328__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.manager.manager_card,capability], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(capability)], null)),kaleidoscope$ui$components$manager$manager_cards_$_iter__16327(cljs.core.rest(s__16328__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(kaleidoscope.ui.components.manager.CAPABILITIES);
})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.manager.js.map
