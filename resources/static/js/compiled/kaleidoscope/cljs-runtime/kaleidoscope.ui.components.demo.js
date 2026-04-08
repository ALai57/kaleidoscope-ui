goog.provide('kaleidoscope.ui.components.demo');
var module$node_modules$$react_three$fiber$dist$react_three_fiber_esm=shadow.js.require("module$node_modules$$react_three$fiber$dist$react_three_fiber_esm", {});
var module$node_modules$$react_three$drei$index=shadow.js.require("module$node_modules$$react_three$drei$index", {});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
kaleidoscope.ui.components.demo.scale_BANG_ = (function kaleidoscope$ui$components$demo$scale_BANG_(scene,p__24173){
var vec__24174 = p__24173;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24174,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24174,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24174,(2),null);
var scale = vec__24174;
return scene.scale.set(x,y,z);
});
kaleidoscope.ui.components.demo.PI = Math.PI;
kaleidoscope.ui.components.demo.deg__GT_rad = (function kaleidoscope$ui$components$demo$deg__GT_rad(deg){
return ((kaleidoscope.ui.components.demo.PI * deg) / (180));
});
kaleidoscope.ui.components.demo.rotate_BANG_ = (function kaleidoscope$ui$components$demo$rotate_BANG_(scene,p__24180){
var vec__24181 = p__24180;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24181,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24181,(1),null);
var z = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24181,(2),null);
var rotation = vec__24181;
return scene.rotation.set(kaleidoscope.ui.components.demo.deg__GT_rad(x),kaleidoscope.ui.components.demo.deg__GT_rad(y),kaleidoscope.ui.components.demo.deg__GT_rad(z));
});
kaleidoscope.ui.components.demo.translate_BANG_ = (function kaleidoscope$ui$components$demo$translate_BANG_(scene,p__24184){
var vec__24185 = p__24184;
var dx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24185,(0),null);
var dy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24185,(1),null);
var dz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__24185,(2),null);
var x = scene.position.x;
var y = scene.position.y;
var z = scene.position.z;
console.log(x,y,z,dx,dy,dz);

(scene.position.x = (dx + x));

(scene.position.y = (dy + y));

return (scene.position.z = (dz + z));
});
kaleidoscope.ui.components.demo.book = (function kaleidoscope$ui$components$demo$book(){
var gltf = module$node_modules$$react_three$drei$index.useGLTF("static/corporis-fabrica/scene.gltf");
var scene = gltf.scene;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"primitive","primitive",1884541424),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"object","object",1474613949),(function (){var G__24188 = scene;
kaleidoscope.ui.components.demo.rotate_BANG_(G__24188,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(-90),(0)], null));

kaleidoscope.ui.components.demo.scale_BANG_(G__24188,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),(3),(3)], null));

kaleidoscope.ui.components.demo.translate_BANG_(G__24188,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(100),(0)], null));

return G__24188;
})(),new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null)], null)], null);
});
module$node_modules$$react_three$drei$index.useGLTF.preload("static/corporis-fabrica/scene.gltf");
kaleidoscope.ui.components.demo.demo = (function kaleidoscope$ui$components$demo$demo(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.utils.core.err_boundary,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$$react_three$fiber$dist$react_three_fiber_esm.Canvas,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"calc(100vh - 80px)",new cljs.core.Keyword(null,"background","background",-863952629),"black",new cljs.core.Keyword(null,"position","position",-2011731912),"absolute"], null),new cljs.core.Keyword(null,"camera","camera",-1190348585),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1),(0)], null),new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(20),(0),(0)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ambientLight","ambientLight",1634320339),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"intensity","intensity",1142770863),0.2], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spotLight","spotLight",-1758394008),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10),(10),(10)], null),new cljs.core.Keyword(null,"intensity","intensity",1142770863),0.5,new cljs.core.Keyword(null,"angle","angle",1622094254),0.15,new cljs.core.Keyword(null,"penumbra","penumbra",2008278688),(1)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react$index.Suspense,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fallback","fallback",761637929),(function() { 
var G__24189__delegate = function (args){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Loading Canvas"], null);
};
var G__24189 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__24190__i = 0, G__24190__a = new Array(arguments.length -  0);
while (G__24190__i < G__24190__a.length) {G__24190__a[G__24190__i] = arguments[G__24190__i + 0]; ++G__24190__i;}
  args = new cljs.core.IndexedSeq(G__24190__a,0,null);
} 
return G__24189__delegate.call(this,args);};
G__24189.cljs$lang$maxFixedArity = 0;
G__24189.cljs$lang$applyTo = (function (arglist__24191){
var args = cljs.core.seq(arglist__24191);
return G__24189__delegate(args);
});
G__24189.cljs$core$IFn$_invoke$arity$variadic = G__24189__delegate;
return G__24189;
})()
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"f>","f>",1484564198),kaleidoscope.ui.components.demo.book], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$$react_three$drei$index.OrbitControls], null)], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.demo.js.map
