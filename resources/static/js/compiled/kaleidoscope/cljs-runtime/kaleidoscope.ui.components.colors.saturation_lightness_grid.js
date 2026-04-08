goog.provide('kaleidoscope.ui.components.colors.saturation_lightness_grid');
kaleidoscope.ui.components.colors.saturation_lightness_grid.hsl = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$hsl(hue,saturation,lightness){
return goog.string.format("hsl(%s, %s%, %s%)",hue,saturation,lightness);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$deg__GT_rad(deg){
return ((deg * Math.PI) / (180));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.rad__GT_deg = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$rad__GT_deg(rad){
return ((180) * (rad / Math.PI));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$clamp(val,p__23252){
var map__23253 = p__23252;
var map__23253__$1 = cljs.core.__destructure_map(map__23253);
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23253__$1,new cljs.core.Keyword(null,"min","min",444991522),(0));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23253__$1,new cljs.core.Keyword(null,"max","max",61366548),(100));
if((val < min)){
return min;
} else {
if((val > max)){
return max;
} else {
return val;

}
}
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.euclidean_distance = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$euclidean_distance(p__23258,p__23259){
var vec__23260 = p__23258;
var x1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23260,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23260,(1),null);
var vec__23263 = p__23259;
var x2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23263,(0),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23263,(1),null);
return Math.sqrt((Math.pow((x1 - x2),(2)) + Math.pow((y1 - y2),(2))));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.coords__GT_rads = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$coords__GT_rads(x,y){
return Math.atan2(x,y);
});
/**
 * Calculate the saturation (x), lightness (y) coordinates
 */
kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$calculate_sl_coordinates(grid_ref,event){
var event_x = event.clientX;
var event_y = event.clientY;
var container_target = grid_ref.getBoundingClientRect();
var container_x = container_target.x;
var container_y = container_target.y;
var container_w = container_target.width;
var container_h = container_target.height;
var x = (container_x - event_x);
var y = (container_y - event_y);
var saturation = (- ((x / container_w) * (100)));
var lightness = (((y / container_h) * (100)) + (100));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$calculate_marker_coordinates(p__23267){
var map__23268 = p__23267;
var map__23268__$1 = cljs.core.__destructure_map(map__23268);
var base_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23268__$1,new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794));
var base_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23268__$1,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23268__$1,new cljs.core.Keyword(null,"r","r",-471384190),(20));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23268__$1,new cljs.core.Keyword(null,"theta","theta",-427510258),(-45));
var dx = (Math.cos(kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad(theta)) * r);
var dy = (Math.sin(kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad(theta)) * r);
var new_saturation = (base_saturation + dx);
var new_lightness = (base_lightness + dy);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),new_saturation,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new_lightness], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid._centered_dot = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$_centered_dot(p__23269){
var map__23270 = p__23269;
var map__23270__$1 = cljs.core.__destructure_map(map__23270);
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23270__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23270__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23270__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"centered",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateX(-%spx) translateY(-%spx)",radius,radius)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),"dot",new cljs.core.Keyword(null,"unitsfromorigin","unitsfromorigin",923214131),units_from_origin,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"opacity","opacity",397153780),(function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "50%";
}
})(),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"background","background",-863952629),"white"], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.marker = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$marker(p__23271){
var map__23272 = p__23271;
var map__23272__$1 = cljs.core.__destructure_map(map__23272);
var activate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"activate","activate",441219614));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"r","r",-471384190));
var base_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794));
var base_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637));
var deactivate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
var border_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23272__$1,new cljs.core.Keyword(null,"border-size","border-size",991975640));
var map__23273 = kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),base_saturation,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),base_lightness,new cljs.core.Keyword(null,"r","r",-471384190),r,new cljs.core.Keyword(null,"theta","theta",-427510258),theta], null));
var map__23273__$1 = cljs.core.__destructure_map(map__23273);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23273__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23273__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var normalized_saturation = (border_size * (saturation / (100)));
var normalized_lightness = (- (border_size * (lightness / (100))));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (event){
event.stopPropagation();

return (activate.cljs$core$IFn$_invoke$arity$1 ? activate.cljs$core$IFn$_invoke$arity$1(event) : activate.call(null,event));
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (event){
event.stopPropagation();

return (deactivate.cljs$core$IFn$_invoke$arity$1 ? deactivate.cljs$core$IFn$_invoke$arity$1(event) : deactivate.call(null,event));
}),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateX(%spx) translateY(%spx)",normalized_saturation,normalized_lightness)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"origin-bottom-left",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateY(%spx)",border_size)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid._centered_dot,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"radius","radius",-2073122258),radius,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),units_from_origin,new cljs.core.Keyword(null,"opacity","opacity",397153780),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})()),"%"].join('')], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.translate_origin_BANG_ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$translate_origin_BANG_(p__23276){
var map__23277 = p__23276;
var map__23277__$1 = cljs.core.__destructure_map(map__23277);
var mouse_coordinates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23277__$1,new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23277__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23277__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var map__23278 = mouse_coordinates;
var map__23278__$1 = cljs.core.__destructure_map(map__23278);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23278__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23278__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(saturation,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var lightness__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(lightness,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(origin,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation__$1], null));

var G__23279 = cljs.core.deref(origin);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__23279) : on_change.call(null,G__23279));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.rotate_BANG_ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$rotate_BANG_(p__23280){
var map__23281 = p__23280;
var map__23281__$1 = cljs.core.__destructure_map(map__23281);
var mouse_coordinates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23281__$1,new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23281__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23281__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23281__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
var map__23282 = mouse_coordinates;
var map__23282__$1 = cljs.core.__destructure_map(map__23282);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23282__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23282__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(saturation,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var lightness__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(lightness,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var map__23283 = cljs.core.deref(origin);
var map__23283__$1 = cljs.core.__destructure_map(map__23283);
var origin_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23283__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var origin_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23283__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var new_spacing = (kaleidoscope.ui.components.colors.saturation_lightness_grid.euclidean_distance(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [saturation__$1,lightness__$1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [origin_saturation,origin_lightness], null)) / units_from_origin);
var dx = (origin_saturation - saturation__$1);
var dy = (origin_lightness - lightness__$1);
var new_theta = ((90) - kaleidoscope.ui.components.colors.saturation_lightness_grid.rad__GT_deg(kaleidoscope.ui.components.colors.saturation_lightness_grid.coords__GT_rads(dx,dy)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(origin,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),new_spacing,new cljs.core.Keyword(null,"theta","theta",-427510258),new_theta], null));

var G__23284 = cljs.core.deref(origin);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__23284) : on_change.call(null,G__23284));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.saturation_lightness_grid = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid(p__23285){
var map__23286 = p__23285;
var map__23286__$1 = cljs.core.__destructure_map(map__23286);
var grid_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23286__$1,new cljs.core.Keyword(null,"grid-size","grid-size",2138480144));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23286__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23286__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var _BANG_grid_ref = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var active_element = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var grid_props = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(grid_size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(grid_size),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute"], null);
var origin_marker_QMARK_ = (function (el){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("0",el.getAttribute("unitsfromorigin"));
});
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"ref","ref",1289896967),(function (el){
return cljs.core.reset_BANG_(_BANG_grid_ref,el);
}),new cljs.core.Keyword(null,"on-mouse-move","on-mouse-move",-1386320874),(function (event){
event.stopPropagation();

if(cljs.core.truth_(cljs.core.deref(active_element))){
if(origin_marker_QMARK_(cljs.core.deref(active_element))){
return kaleidoscope.ui.components.colors.saturation_lightness_grid.translate_origin_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568),kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates(cljs.core.deref(_BANG_grid_ref),event),new cljs.core.Keyword(null,"origin","origin",1037372088),origin,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null));
} else {
return kaleidoscope.ui.components.colors.saturation_lightness_grid.rotate_BANG_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568),kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates(cljs.core.deref(_BANG_grid_ref),event),new cljs.core.Keyword(null,"origin","origin",1037372088),origin,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),(cljs.core.deref(active_element).getAttribute("unitsfromorigin") | (0))], null));
}
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"style","style",-496642736),grid_props,"z-index",(100)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23288(s__23289){
return (new cljs.core.LazySeq(null,(function (){
var s__23289__$1 = s__23289;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23289__$1);
if(temp__5804__auto__){
var s__23289__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23289__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23289__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23291 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23290 = (0);
while(true){
if((i__23290 < size__5522__auto__)){
var background = cljs.core._nth(c__5521__auto__,i__23290);
cljs.core.chunk_append(b__23291,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([grid_props,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),background], null)], 0))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["background-component-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background)].join('')], null)));

var G__23361 = (i__23290 + (1));
i__23290 = G__23361;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23291),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23288(cljs.core.chunk_rest(s__23289__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23291),null);
}
} else {
var background = cljs.core.first(s__23289__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([grid_props,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),background], null)], 0))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["background-component-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background)].join('')], null)),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23288(cljs.core.rest(s__23289__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(100),(50)),"linear-gradient(to right, #fff, rgba(255,255,255,0))","linear-gradient(to top, #000, rgba(0,0,0,0))"], null));
})(),cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23296(s__23297){
return (new cljs.core.LazySeq(null,(function (){
var s__23297__$1 = s__23297;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23297__$1);
if(temp__5804__auto__){
var s__23297__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23297__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23297__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23299 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23298 = (0);
while(true){
if((i__23298 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__23298);
cljs.core.chunk_append(b__23299,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.marker,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"r","r",-471384190),new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707),new cljs.core.Keyword(null,"theta","theta",-427510258),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"opacity","opacity",397153780),new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),new cljs.core.Keyword(null,"border-size","border-size",991975640),new cljs.core.Keyword(null,"activate","activate",441219614)],[(n * new cljs.core.Keyword(null,"spacing","spacing",204422175).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin))),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),((function (i__23298,n,c__5521__auto__,size__5522__auto__,b__23299,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin){
return (function (_event){
return cljs.core.reset_BANG_(active_element,null);
});})(i__23298,n,c__5521__auto__,size__5522__auto__,b__23299,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin))
,new cljs.core.Keyword(null,"theta","theta",-427510258).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(10),(((n === (0)))?(70):(30)),n,grid_size,((function (i__23298,n,c__5521__auto__,size__5522__auto__,b__23299,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin){
return (function (event){
return cljs.core.reset_BANG_(active_element,event.target);
});})(i__23298,n,c__5521__auto__,size__5522__auto__,b__23299,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin))
])], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["marker-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__23375 = (i__23298 + (1));
i__23298 = G__23375;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23299),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23296(cljs.core.chunk_rest(s__23297__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23299),null);
}
} else {
var n = cljs.core.first(s__23297__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.marker,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"r","r",-471384190),new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707),new cljs.core.Keyword(null,"theta","theta",-427510258),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"opacity","opacity",397153780),new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),new cljs.core.Keyword(null,"border-size","border-size",991975640),new cljs.core.Keyword(null,"activate","activate",441219614)],[(n * new cljs.core.Keyword(null,"spacing","spacing",204422175).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin))),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),((function (n,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin){
return (function (_event){
return cljs.core.reset_BANG_(active_element,null);
});})(n,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin))
,new cljs.core.Keyword(null,"theta","theta",-427510258).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(10),(((n === (0)))?(70):(30)),n,grid_size,((function (n,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin){
return (function (event){
return cljs.core.reset_BANG_(active_element,event.target);
});})(n,s__23297__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__23286,map__23286__$1,grid_size,on_change,origin))
])], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["marker-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__23296(cljs.core.rest(s__23297__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((-2),(3)));
})())], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.colors.saturation_lightness_grid.js.map
