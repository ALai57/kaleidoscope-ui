goog.provide('kaleidoscope.ui.theme');
var module$node_modules$$mui$material$styles$index=shadow.js.require("module$node_modules$$mui$material$styles$index", {});
var module$node_modules$$mui$material$colors$index=shadow.js.require("module$node_modules$$mui$material$colors$index", {});
kaleidoscope.ui.theme.DEFAULT = cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"palette","palette",-456203511),({"primary": ({"main": (module$node_modules$$mui$material$colors$index.blue[(600)])}), "secondary": ({"main": (module$node_modules$$mui$material$colors$index.purple[(600)])}), "error": ({"main": (module$node_modules$$mui$material$colors$index.red[(600)])}), "success": ({"main": (module$node_modules$$mui$material$colors$index.green[(600)])}), "accent": ({"main": "#e3bef6"})}),new cljs.core.Keyword(null,"transitions","transitions",-2046216121),({})], null));
kaleidoscope.ui.theme.BASE_THEME = kaleidoscope.ui.theme.DEFAULT;
kaleidoscope.ui.theme.make_theme = (function kaleidoscope$ui$theme$make_theme(p__18997){
var map__18998 = p__18997;
var map__18998__$1 = cljs.core.__destructure_map(map__18998);
var clj_theme = map__18998__$1;
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18998__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var primary = kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,lightness);
var secondary = kaleidoscope.ui.components.colors.color_wheel.hsl(((hue + (180)) + angle),saturation,lightness);
var tertiary = kaleidoscope.ui.components.colors.color_wheel.hsl(((hue + (180)) + (- angle)),saturation,lightness);
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"palette","palette",-456203511),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),primary], null),new cljs.core.Keyword(null,"secondary","secondary",-669381460),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),secondary], null),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),(module$node_modules$$mui$material$colors$index.red[(600)])], null),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),(module$node_modules$$mui$material$colors$index.green[(600)])], null),new cljs.core.Keyword(null,"accent","accent",-1826298468),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),tertiary], null)], null),new cljs.core.Keyword(null,"transitions","transitions",-2046216121),cljs.core.PersistentArrayMap.EMPTY], null));
});

//# sourceMappingURL=kaleidoscope.ui.theme.js.map
