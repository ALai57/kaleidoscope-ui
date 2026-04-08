goog.provide('kaleidoscope.ui.components.colors.color_wheel');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$mui$material$Slider$index=shadow.js.require("module$node_modules$$mui$material$Slider$index", {});
kaleidoscope.ui.components.colors.color_wheel.ColorWheel = (function (){var G__23337 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"400px",new cljs.core.Keyword(null,"height","height",1025178622),"400px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"background","background",-863952629),"conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red)"], null));
});
var fexpr__23336 = module$node_modules$$mui$material$styles$index.styled("div");
return (fexpr__23336.cljs$core$IFn$_invoke$arity$1 ? fexpr__23336.cljs$core$IFn$_invoke$arity$1(G__23337) : fexpr__23336.call(null,G__23337));
})();
kaleidoscope.ui.components.colors.color_wheel.ColorBand = (function (){var G__23346 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"50px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"10px",new cljs.core.Keyword(null,"background","background",-863952629),"linear-gradient(to right, red,#ff0,#0f0,#0ff,#00f,#f0f,red)"], null));
});
var fexpr__23345 = module$node_modules$$mui$material$styles$index.styled("div");
return (fexpr__23345.cljs$core$IFn$_invoke$arity$1 ? fexpr__23345.cljs$core$IFn$_invoke$arity$1(G__23346) : fexpr__23345.call(null,G__23346));
})();
kaleidoscope.ui.components.colors.color_wheel.Donut = (function (){var G__23348 = (function (theme){
return cljs.core.clj__GT_js(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"transform","transform",1381301764),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"background","background",-863952629),new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"boxShadow","boxShadow",-1591689862),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"left","left",-399115937)],["translate(-50%,-50%)","50%","50%","200px","white","relative","inset 0 1px 9px 10px rgb(15 10 2 / 60%)","200px","50%"]));
});
var fexpr__23347 = module$node_modules$$mui$material$styles$index.styled("div");
return (fexpr__23347.cljs$core$IFn$_invoke$arity$1 ? fexpr__23347.cljs$core$IFn$_invoke$arity$1(G__23348) : fexpr__23347.call(null,G__23348));
})();
kaleidoscope.ui.components.colors.color_wheel.HueMarker = (function (){var G__23350 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"black",new cljs.core.Keyword(null,"opacity","opacity",397153780),"65%",new cljs.core.Keyword(null,"width","width",-384071477),"20px",new cljs.core.Keyword(null,"height","height",1025178622),"20px",new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"left","left",-399115937),"90px",new cljs.core.Keyword(null,"top","top",-1856271961),"90px"], null));
});
var fexpr__23349 = module$node_modules$$mui$material$styles$index.styled("div");
return (fexpr__23349.cljs$core$IFn$_invoke$arity$1 ? fexpr__23349.cljs$core$IFn$_invoke$arity$1(G__23350) : fexpr__23349.call(null,G__23350));
})();
kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider = (function (){var G__23356 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute","& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px",new cljs.core.Keyword(null,"top","top",-1856271961),"0px",new cljs.core.Keyword(null,"border","border",1444987323),"2px solid black"], null),"& .MuiSlider-track",new cljs.core.PersistentArrayMap(null, 1, ["visibility","hidden"], null),"& .MuiSlider-rail",new cljs.core.PersistentArrayMap(null, 1, ["visibility","hidden"], null),"& .MuiSlider-active",new cljs.core.PersistentArrayMap(null, 1, ["color","green"], null)], null));
});
var fexpr__23355 = module$node_modules$$mui$material$styles$index.styled(module$node_modules$$mui$material$Slider$index.default);
return (fexpr__23355.cljs$core$IFn$_invoke$arity$1 ? fexpr__23355.cljs$core$IFn$_invoke$arity$1(G__23356) : fexpr__23355.call(null,G__23356));
})();
kaleidoscope.ui.components.colors.color_wheel.coords__GT_rads = (function kaleidoscope$ui$components$colors$color_wheel$coords__GT_rads(x,y){
return Math.atan2(x,y);
});
kaleidoscope.ui.components.colors.color_wheel.rads__GT_deg = (function kaleidoscope$ui$components$colors$color_wheel$rads__GT_deg(radians){
return (radians * ((180) / Math.PI));
});
/**
 * Calculate the hue's angle in degrees.
 *   Red is 0 degrees, green is ~120, Blue is ~240
 */
kaleidoscope.ui.components.colors.color_wheel.calculate_angle = (function kaleidoscope$ui$components$colors$color_wheel$calculate_angle(color_wheel,event){
var click_x = event.clientX;
var click_y = event.clientY;
var container_target = color_wheel.getBoundingClientRect();
var container_x = container_target.x;
var container_y = container_target.y;
var container_w = container_target.width;
var container_h = container_target.height;
var x = (container_x - click_x);
var y = (container_y - click_y);
var offset_x = (container_w / (2));
var offset_y = (container_h / (2));
var final_x = (- (offset_x + x));
var final_y = (offset_y + y);
return cljs.core.mod((kaleidoscope.ui.components.colors.color_wheel.rads__GT_deg(kaleidoscope.ui.components.colors.color_wheel.coords__GT_rads(final_x,final_y)) + (360)),(360));
});
kaleidoscope.ui.components.colors.color_wheel.hsl = (function kaleidoscope$ui$components$colors$color_wheel$hsl(hue,saturation,lightness){
return goog.string.format("hsl(%s, %s%, %s%)",hue,saturation,lightness);
});
kaleidoscope.ui.components.colors.color_wheel.mini_square = (function kaleidoscope$ui$components$colors$color_wheel$mini_square(p__23369){
var map__23370 = p__23369;
var map__23370__$1 = cljs.core.__destructure_map(map__23370);
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"n","n",562130025));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23370__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var mini_size = (size / (6));
var padding = (mini_size / (4));
var position = (function (){var G__23371 = n;
switch (G__23371) {
case (1):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((3) * padding) + ((2) * mini_size))),"px"].join('')], null);

break;
case (2):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((2) * padding) + ((1) * mini_size))),"px"].join('')], null);

break;
case (3):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
case (4):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((2) * padding) + ((1) * mini_size))),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
case (5):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((3) * padding) + ((2) * mini_size))),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__23371)].join('')));

}
})();
var new_sl = kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),saturation,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),lightness,new cljs.core.Keyword(null,"theta","theta",-427510258),theta,new cljs.core.Keyword(null,"r","r",-471384190),((function (){var G__23372 = n;
switch (G__23372) {
case (1):
return (-2);

break;
case (2):
return (-1);

break;
case (3):
return (0);

break;
case (4):
return (1);

break;
case (5):
return (2);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__23372)].join('')));

}
})() * spacing)], null));
var color = kaleidoscope.ui.components.colors.color_wheel.hsl(hue,new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(new_sl),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(new_sl));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mini_size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mini_size),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"background-color","background-color",570434026),color], null),position], 0))], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.color_squares = (function kaleidoscope$ui$components$colors$color_wheel$color_squares(p__23373){
var map__23374 = p__23373;
var map__23374__$1 = cljs.core.__destructure_map(map__23374);
var args = map__23374__$1;
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"r","r",-471384190));
var primary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"primary","primary",817773892));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var tertiary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"tertiary","tertiary",-1163116473));
var complementary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"complementary","complementary",-540744215));
var secondary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"secondary","secondary",-669381460));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23374__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(((2) * size)),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(((2) * size)),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),"grey"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(primary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23376(s__23377){
return (new cljs.core.LazySeq(null,(function (){
var s__23377__$1 = s__23377;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23377__$1);
if(temp__5804__auto__){
var s__23377__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23377__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23377__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23379 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23378 = (0);
while(true){
if((i__23378 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__23378);
cljs.core.chunk_append(b__23379,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),primary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["primary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__23412 = (i__23378 + (1));
i__23378 = G__23412;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23379),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23376(cljs.core.chunk_rest(s__23377__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23379),null);
}
} else {
var n = cljs.core.first(s__23377__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),primary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["primary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23376(cljs.core.rest(s__23377__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(tertiary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23380(s__23381){
return (new cljs.core.LazySeq(null,(function (){
var s__23381__$1 = s__23381;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23381__$1);
if(temp__5804__auto__){
var s__23381__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23381__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23381__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23383 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23382 = (0);
while(true){
if((i__23382 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__23382);
cljs.core.chunk_append(b__23383,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),tertiary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["tertiary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__23413 = (i__23382 + (1));
i__23382 = G__23413;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23383),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23380(cljs.core.chunk_rest(s__23381__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23383),null);
}
} else {
var n = cljs.core.first(s__23381__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),tertiary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["tertiary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23380(cljs.core.rest(s__23381__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(secondary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23384(s__23385){
return (new cljs.core.LazySeq(null,(function (){
var s__23385__$1 = s__23385;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23385__$1);
if(temp__5804__auto__){
var s__23385__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23385__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23385__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23387 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23386 = (0);
while(true){
if((i__23386 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__23386);
cljs.core.chunk_append(b__23387,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),secondary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["secondary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__23414 = (i__23386 + (1));
i__23386 = G__23414;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23387),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23384(cljs.core.chunk_rest(s__23385__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23387),null);
}
} else {
var n = cljs.core.first(s__23385__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),secondary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["secondary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23384(cljs.core.rest(s__23385__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(complementary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23388(s__23389){
return (new cljs.core.LazySeq(null,(function (){
var s__23389__$1 = s__23389;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23389__$1);
if(temp__5804__auto__){
var s__23389__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23389__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23389__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23391 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23390 = (0);
while(true){
if((i__23390 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__23390);
cljs.core.chunk_append(b__23391,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),complementary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["complementary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__23415 = (i__23390 + (1));
i__23390 = G__23415;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23391),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23388(cljs.core.chunk_rest(s__23389__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23391),null);
}
} else {
var n = cljs.core.first(s__23389__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),complementary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["complementary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__23388(cljs.core.rest(s__23389__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.hue_marker = (function kaleidoscope$ui$components$colors$color_wheel$hue_marker(p__23392){
var map__23393 = p__23392;
var map__23393__$1 = cljs.core.__destructure_map(map__23393);
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23393__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23393__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var wheel_radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23393__$1,new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881));
var wheel_thickness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23393__$1,new cljs.core.Keyword(null,"wheel-thickness","wheel-thickness",-1884775667));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23393__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var offset = (wheel_radius - radius);
var translation = (wheel_radius - (wheel_thickness / (2)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.HueMarker,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(offset),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(offset),"px"].join(''),new cljs.core.Keyword(null,"opacity","opacity",397153780),(function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "50%";
}
})(),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("rotate(%sdeg) translateX(%spx)",hue,translation)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.value_slider = (function kaleidoscope$ui$components$colors$color_wheel$value_slider(p__23394){
var map__23395 = p__23394;
var map__23395__$1 = cljs.core.__destructure_map(map__23395);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var state_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"state-key","state-key",1501674933));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"max","max",61366548));
var max_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23395__$1,new cljs.core.Keyword(null,"max-width","max-width",-1939924051));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(max_width),"px"].join('')], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,label], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.slider,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.input,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
}),new cljs.core.Keyword(null,"inputProps","inputProps",1208237697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"step","step",1288888124),(1),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"type","type",1174270348),"number"], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.color_control = (function kaleidoscope$ui$components$colors$color_wheel$color_control(p__23396){
var map__23397 = p__23396;
var map__23397__$1 = cljs.core.__destructure_map(map__23397);
var max_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"max-width","max-width",-1939924051));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var state_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"state-key","state-key",1501674933));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"max","max",61366548));
var slider_el = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23397__$1,new cljs.core.Keyword(null,"slider-el","slider-el",-875087585));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"color-control",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(max_width),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"10px"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),"slider-container",new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),(9)], null),slider_el], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),(3)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.input,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),"slider-input",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
}),new cljs.core.Keyword(null,"inputProps","inputProps",1208237697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"step","step",1288888124),(1),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"type","type",1174270348),"number"], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.saturation_band = (function kaleidoscope$ui$components$colors$color_wheel$saturation_band(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23416 = arguments.length;
var i__5770__auto___23417 = (0);
while(true){
if((i__5770__auto___23417 < len__5769__auto___23416)){
args__5775__auto__.push((arguments[i__5770__auto___23417]));

var G__23418 = (i__5770__auto___23417 + (1));
i__5770__auto___23417 = G__23418;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$core$IFn$_invoke$arity$variadic = (function (p__23400,children){
var map__23401 = p__23400;
var map__23401__$1 = cljs.core.__destructure_map(map__23401);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23401__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23401__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23401__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(height),"px"].join(''),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(to right, %s, %s)",kaleidoscope.ui.components.colors.color_wheel.hsl(hue,(0),lightness),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,(100),lightness))], null)], null)], null),children);
}));

(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$lang$applyTo = (function (seq23398){
var G__23399 = cljs.core.first(seq23398);
var seq23398__$1 = cljs.core.next(seq23398);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23399,seq23398__$1);
}));

kaleidoscope.ui.components.colors.color_wheel.lightness_band = (function kaleidoscope$ui$components$colors$color_wheel$lightness_band(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23421 = arguments.length;
var i__5770__auto___23422 = (0);
while(true){
if((i__5770__auto___23422 < len__5769__auto___23421)){
args__5775__auto__.push((arguments[i__5770__auto___23422]));

var G__23423 = (i__5770__auto___23422 + (1));
i__5770__auto___23422 = G__23423;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$core$IFn$_invoke$arity$variadic = (function (p__23404,children){
var map__23405 = p__23404;
var map__23405__$1 = cljs.core.__destructure_map(map__23405);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23405__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23405__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23405__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(height),"px"].join(''),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(to right, %s, %s, %s)",kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(0)),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(50)),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(100)))], null)], null)], null),children);
}));

(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$lang$applyTo = (function (seq23402){
var G__23403 = cljs.core.first(seq23402);
var seq23402__$1 = cljs.core.next(seq23402);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23403,seq23402__$1);
}));

kaleidoscope.ui.components.colors.color_wheel.color_wheel = (function kaleidoscope$ui$components$colors$color_wheel$color_wheel(p__23406){
var map__23407 = p__23406;
var map__23407__$1 = cljs.core.__destructure_map(map__23407);
var initial_palette = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23407__$1,new cljs.core.Keyword(null,"initial-palette","initial-palette",-1982967781));
var ring_thickness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23407__$1,new cljs.core.Keyword(null,"ring-thickness","ring-thickness",-1173851465));
var wheel_radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23407__$1,new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23407__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_palette){
return null;
}));
var map__23408 = initial_palette;
var map__23408__$1 = cljs.core.__destructure_map(map__23408);
var initial_hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var initial_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var initial_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var initial_spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var initial_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var initial_theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23408__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var palette = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"hue","hue",-508078848),(function (){var or__5045__auto__ = initial_hue;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"saturation","saturation",-14247929),(function (){var or__5045__auto__ = initial_saturation;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})(),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),(function (){var or__5045__auto__ = initial_lightness;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})(),new cljs.core.Keyword(null,"spacing","spacing",204422175),(function (){var or__5045__auto__ = initial_spacing;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (15);
}
})(),new cljs.core.Keyword(null,"theta","theta",-427510258),(function (){var or__5045__auto__ = initial_theta;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (45);
}
})(),new cljs.core.Keyword(null,"angle","angle",1622094254),(function (){var or__5045__auto__ = initial_angle;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (45);
}
})()], null));
var hue_active_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var _BANG_color_wheel = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var ring_thickness__$1 = (function (){var or__5045__auto__ = ring_thickness;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})();
var wheel_radius__$1 = (function (){var or__5045__auto__ = wheel_radius;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (200);
}
})();
var wheel_diameter = (wheel_radius__$1 * (2));
var donut_diameter = ((2) * (wheel_radius__$1 - ring_thickness__$1));
var control_bar_thickness = (ring_thickness__$1 / (2));
var sat_lightness_grid_width = (donut_diameter / Math.sqrt((2)));
var hue_marker_props = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"radius","radius",-2073122258),(10),new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881),wheel_radius__$1,new cljs.core.Keyword(null,"wheel-thickness","wheel-thickness",-1884775667),ring_thickness__$1], null);
var update_palette_BANG_ = (function (new_palette){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(palette,cljs.core.merge,new_palette);

var G__23409 = cljs.core.deref(palette);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__23409) : on_change.call(null,G__23409));
});
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.ColorWheel,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"class","class",-2030961996),"color-wheel",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(wheel_diameter),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(wheel_diameter),"px"].join('')], null),new cljs.core.Keyword(null,"ref","ref",1289896967),(function (el){
return cljs.core.reset_BANG_(_BANG_color_wheel,el);
}),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,true);
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,false);
}),new cljs.core.Keyword(null,"on-mouse-leave","on-mouse-leave",-1864319528),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,false);
}),new cljs.core.Keyword(null,"on-mouse-move","on-mouse-move",-1386320874),(function (event){
if(cljs.core.truth_(cljs.core.deref(hue_active_QMARK_))){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),kaleidoscope.ui.components.colors.color_wheel.calculate_angle(cljs.core.deref(_BANG_color_wheel),event)], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),kaleidoscope.ui.components.colors.color_wheel.calculate_angle(cljs.core.deref(_BANG_color_wheel),event)], null));
})], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.Donut,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"thedonut",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(donut_diameter),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(donut_diameter),"px"].join('')], null)], null),(function (){var offset = ((donut_diameter / (2)) - (sat_lightness_grid_width / (2)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(%spx,%spx)",offset,offset)], null)], null),cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.saturation_lightness_grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"grid-size","grid-size",2138480144),sat_lightness_grid_width,new cljs.core.Keyword(null,"origin","origin",1037372088),palette,new cljs.core.Keyword(null,"on-change","on-change",-732046149),update_palette_BANG_], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))], null))], null);
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (270)),new cljs.core.Keyword(null,"radius","radius",-2073122258),(15)], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)),new cljs.core.Keyword(null,"opacity","opacity",397153780),"10%"], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)) + new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))),new cljs.core.Keyword(null,"opacity","opacity",397153780),"30%"], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)) + (- new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))),new cljs.core.Keyword(null,"opacity","opacity",397153780),"30%"], null)], 0))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_squares,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"size","size",1098693007),wheel_radius__$1,new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"complementary","complementary",-540744215),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)),new cljs.core.Keyword(null,"secondary","secondary",-669381460),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)) + new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))),new cljs.core.Keyword(null,"tertiary","tertiary",-1163116473),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)) + (- new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))))], null),cljs.core.deref(palette)], 0))], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),"column",new cljs.core.Keyword(null,"spacing","spacing",204422175),(3)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.ColorBand,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness,new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),(100),(50))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),((100) * (new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) / (360))),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),((kaleidoscope.ui.utils.events.event_value(event) * (360)) / (100))], null));
})], null)], null)], null),new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(360)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"saturation","saturation",-14247929),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.saturation_band,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),kaleidoscope.ui.utils.events.event_value(event)], null));
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.lightness_band,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),kaleidoscope.ui.utils.events.event_value(event)], null));
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.value_slider,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"label","label",1718410804),"Secondary angle",new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"angle","angle",1622094254),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"max","max",61366548),(180)], null)], null)], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.colors.color_wheel.js.map
