goog.provide('kaleidoscope.ui.components.colors.color_family');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$mui$material$Paper$index=shadow.js.require("module$node_modules$$mui$material$Paper$index", {});
kaleidoscope.ui.components.colors.color_family.Item = (function (){var G__23714 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"padding","padding",1660304693),"right",new cljs.core.Keyword(null,"textAlign","textAlign",-711351626),"center",new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null));
});
var fexpr__23713 = module$node_modules$$mui$material$styles$index.styled(module$node_modules$$mui$material$Paper$index.default);
return (fexpr__23713.cljs$core$IFn$_invoke$arity$1 ? fexpr__23713.cljs$core$IFn$_invoke$arity$1(G__23714) : fexpr__23713.call(null,G__23714));
})();
kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [1.2,(2),(4),(6),(10)], null);
kaleidoscope.ui.components.colors.color_family.color_family = (function kaleidoscope$ui$components$colors$color_family$color_family(p__23715){
var map__23716 = p__23715;
var map__23716__$1 = cljs.core.__destructure_map(map__23716);
var family_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23716__$1,new cljs.core.Keyword(null,"family-name","family-name",660184252));
var base_color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23716__$1,new cljs.core.Keyword(null,"base-color","base-color",-1117474436));
var background_colors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23716__$1,new cljs.core.Keyword(null,"background-colors","background-colors",657802834));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23716__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var theme_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23716__$1,new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644));
var family = kaleidoscope.ui.clients.leonardo.make_color(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),family_name,new cljs.core.Keyword(null,"colorKeys","colorKeys",908311225),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [base_color], null),new cljs.core.Keyword(null,"ratios","ratios",596401607),kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS], null));
var map__23717 = theme_props;
var map__23717__$1 = cljs.core.__destructure_map(map__23717);
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23717__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23717__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var contrast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23717__$1,new cljs.core.Keyword(null,"contrast","contrast",568337131));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"inline-flex",new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"25px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),base_color,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718(s__23719){
return (new cljs.core.LazySeq(null,(function (){
var s__23719__$1 = s__23719;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23719__$1);
if(temp__5804__auto__){
var s__23719__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23719__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23719__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23721 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23720 = (0);
while(true){
if((i__23720 < size__5522__auto__)){
var vec__23722 = cljs.core._nth(c__5521__auto__,i__23720);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23722,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23722,(1),null);
cljs.core.chunk_append(b__23721,(function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (i__23720,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23725(s__23726){
return (new cljs.core.LazySeq(null,((function (i__23720,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (){
var s__23726__$1 = s__23726;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__23726__$1);
if(temp__5804__auto____$1){
var s__23726__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__23726__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first(s__23726__$2);
var size__5522__auto____$1 = cljs.core.count(c__5521__auto____$1);
var b__23728 = cljs.core.chunk_buffer(size__5522__auto____$1);
if((function (){var i__23727 = (0);
while(true){
if((i__23727 < size__5522__auto____$1)){
var vec__23729 = cljs.core._nth(c__5521__auto____$1,i__23727);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23729,(0),null);
var vec__23732 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23729,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23732,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23732,(1),null);
cljs.core.chunk_append(b__23728,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__23814 = (i__23727 + (1));
i__23727 = G__23814;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23728),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23725(cljs.core.chunk_rest(s__23726__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23728),null);
}
} else {
var vec__23735 = cljs.core.first(s__23726__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23735,(0),null);
var vec__23738 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23735,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23738,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23738,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23725(cljs.core.rest(s__23726__$2)));
}
} else {
return null;
}
break;
}
});})(i__23720,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
,null,null));
});})(i__23720,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (i__23720,iter__5523__auto__,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(i__23720,iter__5523__auto__,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i__23720,iter__5523__auto__,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__23741){
var vec__23742 = p__23741;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23742,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23742,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(i__23720,iter__5523__auto__,theme,clj_theme,vec__23722,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__23721,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})());

var G__23815 = (i__23720 + (1));
i__23720 = G__23815;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23721),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718(cljs.core.chunk_rest(s__23719__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23721),null);
}
} else {
var vec__23745 = cljs.core.first(s__23719__$2);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23745,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23745,(1),null);
return cljs.core.cons((function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23748(s__23749){
return (new cljs.core.LazySeq(null,(function (){
var s__23749__$1 = s__23749;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__23749__$1);
if(temp__5804__auto____$1){
var s__23749__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__23749__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23749__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23751 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23750 = (0);
while(true){
if((i__23750 < size__5522__auto__)){
var vec__23752 = cljs.core._nth(c__5521__auto__,i__23750);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23752,(0),null);
var vec__23755 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23752,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23755,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23755,(1),null);
cljs.core.chunk_append(b__23751,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__23816 = (i__23750 + (1));
i__23750 = G__23816;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23751),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23748(cljs.core.chunk_rest(s__23749__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23751),null);
}
} else {
var vec__23758 = cljs.core.first(s__23749__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23758,(0),null);
var vec__23761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23758,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23761,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23761,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718_$_iter__23748(cljs.core.rest(s__23749__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(iter__5523__auto__,theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__23764){
var vec__23765 = p__23764;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23765,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23765,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(iter__5523__auto__,theme,clj_theme,vec__23745,background_idx,background_color,s__23719__$2,temp__5804__auto__,family,map__23717,map__23717__$1,lightness,saturation,contrast,map__23716,map__23716__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})(),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__23718(cljs.core.rest(s__23719__$2)));
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
kaleidoscope.ui.components.colors.color_family.background_color_QMARK_ = (function kaleidoscope$ui$components$colors$color_family$background_color_QMARK_(p__23768){
var vec__23769 = p__23768;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23769,(0),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23769,(1),null);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-light","background-light",-1612638727),null,new cljs.core.Keyword(null,"background-dark","background-dark",-589825250),null], null), null),k);
});
kaleidoscope.ui.components.colors.color_family.color_theme = (function kaleidoscope$ui$components$colors$color_family$color_theme(p__23772){
var map__23773 = p__23772;
var map__23773__$1 = cljs.core.__destructure_map(map__23773);
var palette = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23773__$1,new cljs.core.Keyword(null,"palette","palette",-456203511));
var colors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var backgrounds = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var lightness = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
var contrast = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((30));
var saturation = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,"BACKGROUNDS)",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(4),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23774(s__23775){
return (new cljs.core.LazySeq(null,(function (){
var s__23775__$1 = s__23775;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23775__$1);
if(temp__5804__auto__){
var s__23775__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23775__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23775__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23777 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23776 = (0);
while(true){
if((i__23776 < size__5522__auto__)){
var vec__23778 = cljs.core._nth(c__5521__auto__,i__23776);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(0),null);
var vec__23781 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23778,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23781,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23781,(1),null);
cljs.core.chunk_append(b__23777,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__23776,vec__23778,idx,vec__23781,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23777,s__23775__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__23776,vec__23778,idx,vec__23781,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23777,s__23775__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__23817 = (i__23776 + (1));
i__23776 = G__23817;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23777),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23774(cljs.core.chunk_rest(s__23775__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23777),null);
}
} else {
var vec__23784 = cljs.core.first(s__23775__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23784,(0),null);
var vec__23787 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23784,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23787,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23787,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__23784,idx,vec__23787,color_name,color_swatch,s__23775__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__23784,idx,vec__23787,color_name,color_swatch,s__23775__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23774(cljs.core.rest(s__23775__$2)));
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
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23790(s__23791){
return (new cljs.core.LazySeq(null,(function (){
var s__23791__$1 = s__23791;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23791__$1);
if(temp__5804__auto__){
var s__23791__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23791__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23791__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23793 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23792 = (0);
while(true){
if((i__23792 < size__5522__auto__)){
var vec__23794 = cljs.core._nth(c__5521__auto__,i__23792);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23794,(0),null);
var vec__23797 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23794,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23797,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23797,(1),null);
cljs.core.chunk_append(b__23793,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (i__23792,vec__23794,idx,vec__23797,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23793,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (p__23800){
var vec__23801 = p__23800;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23801,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23801,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(i__23792,vec__23794,idx,vec__23797,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23793,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__23792,vec__23794,idx,vec__23797,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23793,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__23792,vec__23794,idx,vec__23797,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__23793,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__23818 = (i__23792 + (1));
i__23792 = G__23818;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23793),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23790(cljs.core.chunk_rest(s__23791__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23793),null);
}
} else {
var vec__23804 = cljs.core.first(s__23791__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23804,(0),null);
var vec__23807 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23804,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23807,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23807,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (vec__23804,idx,vec__23807,color_name,color_swatch,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (p__23810){
var vec__23811 = p__23810;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23811,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23811,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(vec__23804,idx,vec__23807,color_name,color_swatch,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__23804,idx,vec__23807,color_name,color_swatch,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__23804,idx,vec__23807,color_name,color_swatch,s__23791__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__23773,map__23773__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__23790(cljs.core.rest(s__23791__$2)));
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
