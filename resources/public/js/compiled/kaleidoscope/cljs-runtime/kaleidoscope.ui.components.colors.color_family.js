goog.provide('kaleidoscope.ui.components.colors.color_family');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$mui$material$Paper$index=shadow.js.require("module$node_modules$$mui$material$Paper$index", {});
kaleidoscope.ui.components.colors.color_family.Item = (function (){var G__20478 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"padding","padding",1660304693),"right",new cljs.core.Keyword(null,"textAlign","textAlign",-711351626),"center",new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null));
});
var fexpr__20477 = module$node_modules$$mui$material$styles$index.styled(module$node_modules$$mui$material$Paper$index.default);
return (fexpr__20477.cljs$core$IFn$_invoke$arity$1 ? fexpr__20477.cljs$core$IFn$_invoke$arity$1(G__20478) : fexpr__20477.call(null,G__20478));
})();
kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [1.2,(2),(4),(6),(10)], null);
kaleidoscope.ui.components.colors.color_family.color_family = (function kaleidoscope$ui$components$colors$color_family$color_family(p__20480){
var map__20481 = p__20480;
var map__20481__$1 = cljs.core.__destructure_map(map__20481);
var family_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20481__$1,new cljs.core.Keyword(null,"family-name","family-name",660184252));
var base_color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20481__$1,new cljs.core.Keyword(null,"base-color","base-color",-1117474436));
var background_colors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20481__$1,new cljs.core.Keyword(null,"background-colors","background-colors",657802834));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20481__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var theme_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20481__$1,new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644));
var family = kaleidoscope.ui.clients.leonardo.make_color(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),family_name,new cljs.core.Keyword(null,"colorKeys","colorKeys",908311225),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [base_color], null),new cljs.core.Keyword(null,"ratios","ratios",596401607),kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS], null));
var map__20484 = theme_props;
var map__20484__$1 = cljs.core.__destructure_map(map__20484);
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20484__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20484__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var contrast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20484__$1,new cljs.core.Keyword(null,"contrast","contrast",568337131));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"inline-flex",new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"25px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),base_color,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485(s__20486){
return (new cljs.core.LazySeq(null,(function (){
var s__20486__$1 = s__20486;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__20486__$1);
if(temp__5804__auto__){
var s__20486__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20486__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20486__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20488 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20487 = (0);
while(true){
if((i__20487 < size__5522__auto__)){
var vec__20489 = cljs.core._nth(c__5521__auto__,i__20487);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20489,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20489,(1),null);
cljs.core.chunk_append(b__20488,(function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (i__20487,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20492(s__20493){
return (new cljs.core.LazySeq(null,((function (i__20487,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (){
var s__20493__$1 = s__20493;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__20493__$1);
if(temp__5804__auto____$1){
var s__20493__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__20493__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first(s__20493__$2);
var size__5522__auto____$1 = cljs.core.count(c__5521__auto____$1);
var b__20495 = cljs.core.chunk_buffer(size__5522__auto____$1);
if((function (){var i__20494 = (0);
while(true){
if((i__20494 < size__5522__auto____$1)){
var vec__20496 = cljs.core._nth(c__5521__auto____$1,i__20494);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20496,(0),null);
var vec__20499 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20496,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20499,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20499,(1),null);
cljs.core.chunk_append(b__20495,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__20652 = (i__20494 + (1));
i__20494 = G__20652;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20495),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20492(cljs.core.chunk_rest(s__20493__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20495),null);
}
} else {
var vec__20502 = cljs.core.first(s__20493__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20502,(0),null);
var vec__20505 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20502,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20505,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20492(cljs.core.rest(s__20493__$2)));
}
} else {
return null;
}
break;
}
});})(i__20487,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
,null,null));
});})(i__20487,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (i__20487,iter__5523__auto__,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(i__20487,iter__5523__auto__,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i__20487,iter__5523__auto__,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__20509){
var vec__20510 = p__20509;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20510,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20510,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(i__20487,iter__5523__auto__,theme,clj_theme,vec__20489,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__20488,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})());

var G__20659 = (i__20487 + (1));
i__20487 = G__20659;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20488),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485(cljs.core.chunk_rest(s__20486__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20488),null);
}
} else {
var vec__20513 = cljs.core.first(s__20486__$2);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20513,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20513,(1),null);
return cljs.core.cons((function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20517(s__20518){
return (new cljs.core.LazySeq(null,(function (){
var s__20518__$1 = s__20518;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__20518__$1);
if(temp__5804__auto____$1){
var s__20518__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__20518__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20518__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20520 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20519 = (0);
while(true){
if((i__20519 < size__5522__auto__)){
var vec__20521 = cljs.core._nth(c__5521__auto__,i__20519);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20521,(0),null);
var vec__20524 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20521,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20524,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20524,(1),null);
cljs.core.chunk_append(b__20520,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__20669 = (i__20519 + (1));
i__20519 = G__20669;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20520),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20517(cljs.core.chunk_rest(s__20518__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20520),null);
}
} else {
var vec__20557 = cljs.core.first(s__20518__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20557,(0),null);
var vec__20560 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20557,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20560,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20560,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485_$_iter__20517(cljs.core.rest(s__20518__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(iter__5523__auto__,theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__20572){
var vec__20573 = p__20572;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20573,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20573,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(iter__5523__auto__,theme,clj_theme,vec__20513,background_idx,background_color,s__20486__$2,temp__5804__auto__,family,map__20484,map__20484__$1,lightness,saturation,contrast,map__20481,map__20481__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})(),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__20485(cljs.core.rest(s__20486__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
}),background_colors));
})()], null)], null);
});
kaleidoscope.ui.components.colors.color_family.background_color_QMARK_ = (function kaleidoscope$ui$components$colors$color_family$background_color_QMARK_(p__20576){
var vec__20577 = p__20576;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20577,(0),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20577,(1),null);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-light","background-light",-1612638727),null,new cljs.core.Keyword(null,"background-dark","background-dark",-589825250),null], null), null),k);
});
kaleidoscope.ui.components.colors.color_family.color_theme = (function kaleidoscope$ui$components$colors$color_family$color_theme(p__20582){
var map__20583 = p__20582;
var map__20583__$1 = cljs.core.__destructure_map(map__20583);
var palette = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20583__$1,new cljs.core.Keyword(null,"palette","palette",-456203511));
var colors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var backgrounds = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var lightness = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
var contrast = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((30));
var saturation = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,"BACKGROUNDS)",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(4),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20586(s__20587){
return (new cljs.core.LazySeq(null,(function (){
var s__20587__$1 = s__20587;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__20587__$1);
if(temp__5804__auto__){
var s__20587__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20587__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20587__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20589 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20588 = (0);
while(true){
if((i__20588 < size__5522__auto__)){
var vec__20590 = cljs.core._nth(c__5521__auto__,i__20588);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20590,(0),null);
var vec__20593 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20590,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20593,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20593,(1),null);
cljs.core.chunk_append(b__20589,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__20588,vec__20590,idx,vec__20593,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20589,s__20587__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__20588,vec__20590,idx,vec__20593,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20589,s__20587__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__20695 = (i__20588 + (1));
i__20588 = G__20695;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20589),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20586(cljs.core.chunk_rest(s__20587__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20589),null);
}
} else {
var vec__20596 = cljs.core.first(s__20587__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20596,(0),null);
var vec__20599 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20596,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20599,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20599,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__20596,idx,vec__20599,color_name,color_swatch,s__20587__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__20596,idx,vec__20599,color_name,color_swatch,s__20587__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20586(cljs.core.rest(s__20587__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,ele){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,ele], null);
}),cljs.core.deref(backgrounds)));
})(),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"300px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),"Contrast",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),(30),new cljs.core.Keyword(null,"min","min",444991522),(15),new cljs.core.Keyword(null,"max","max",61366548),(500),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(contrast,new_val);
})], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Saturation",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),0.1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(saturation,new_val);
})], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Lightness",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),0.1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(lightness,new_val);
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20607(s__20608){
return (new cljs.core.LazySeq(null,(function (){
var s__20608__$1 = s__20608;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__20608__$1);
if(temp__5804__auto__){
var s__20608__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__20608__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20608__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20610 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20609 = (0);
while(true){
if((i__20609 < size__5522__auto__)){
var vec__20612 = cljs.core._nth(c__5521__auto__,i__20609);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20612,(0),null);
var vec__20615 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20612,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20615,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20615,(1),null);
cljs.core.chunk_append(b__20610,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (i__20609,vec__20612,idx,vec__20615,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20610,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (p__20621){
var vec__20622 = p__20621;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20622,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20622,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(i__20609,vec__20612,idx,vec__20615,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20610,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__20609,vec__20612,idx,vec__20615,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20610,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__20609,vec__20612,idx,vec__20615,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__20610,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__20724 = (i__20609 + (1));
i__20609 = G__20724;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20610),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20607(cljs.core.chunk_rest(s__20608__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20610),null);
}
} else {
var vec__20626 = cljs.core.first(s__20608__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20626,(0),null);
var vec__20629 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20626,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20629,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20629,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (vec__20626,idx,vec__20629,color_name,color_swatch,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (p__20632){
var vec__20635 = p__20632;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20635,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20635,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(vec__20626,idx,vec__20629,color_name,color_swatch,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__20626,idx,vec__20629,color_name,color_swatch,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__20626,idx,vec__20629,color_name,color_swatch,s__20608__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__20583,map__20583__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__20607(cljs.core.rest(s__20608__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,ele){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,ele], null);
}),cljs.core.deref(colors)));
})())], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.colors.color_family.js.map
