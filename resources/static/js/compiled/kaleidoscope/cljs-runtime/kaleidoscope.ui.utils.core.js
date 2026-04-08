goog.provide('kaleidoscope.ui.utils.core');
kaleidoscope.ui.utils.core.image__GT_blob = (function kaleidoscope$ui$utils$core$image__GT_blob(the_bytes){
var data_blob = (new Blob([the_bytes],({"type": "image/png"})));
return URL.createObjectURL(data_blob);
});
kaleidoscope.ui.utils.core.lazy_component = (function kaleidoscope$ui$utils$core$lazy_component(loadable){
return (function (p__23459){
var map__23460 = p__23459;
var map__23460__$1 = cljs.core.__destructure_map(map__23460);
var props = map__23460__$1;
var fallback = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23460__$1,new cljs.core.Keyword(null,"fallback","fallback",761637929));
var component = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = fallback;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Loading"], null);
});
}
})());
var _ = shadow.lazy.load.cljs$core$IFn$_invoke$arity$1(loadable).then((function (root_el){
return cljs.core.reset_BANG_(component,root_el);
}));
return (function (props__$1){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(component),props__$1], null);
});
});
});
kaleidoscope.ui.utils.core.clojurize = (function kaleidoscope$ui$utils$core$clojurize(x){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(x,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
});
/**
 * https://github.com/reagent-project/reagent/issues/413
 */
kaleidoscope.ui.utils.core.unescape = (function kaleidoscope$ui$utils$core$unescape(s){
var and__5043__auto__ = s;
if(cljs.core.truth_(and__5043__auto__)){
return goog.string.unescapeEntities(s);
} else {
return and__5043__auto__;
}
});
kaleidoscope.ui.utils.core.date = (function kaleidoscope$ui$utils$core$date(iso_string){
return cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2(iso_string,/T/));
});
/**
 * ex. 2022-01-01
 */
kaleidoscope.ui.utils.core.yyyy_MM = "yyyy-MM";
/**
 * ex. February 2023
 */
kaleidoscope.ui.utils.core.MONTH_YEAR = "MMMM, yyyy";
/**
 * ex. Feb 28, 2022
 */
kaleidoscope.ui.utils.core.MONTH_DAY_YEAR = goog.i18n.DateTimeFormat.Format.MEDIUM_DATE;
/**
 * ex. Feb 28
 */
kaleidoscope.ui.utils.core.MONTH_DAY = "MMM dd";
kaleidoscope.ui.utils.core.format_date = (function kaleidoscope$ui$utils$core$format_date(date_fmt,s){
try{var formatter = (new goog.i18n.DateTimeFormat(date_fmt));
return formatter.format(goog.date.DateTime.fromIsoString(s));
}catch (e23461){if((e23461 instanceof Object)){
var _e = e23461;
return "Couldn't format date";
} else {
throw e23461;

}
}});
/**
 * https://lilac.town/writing/modern-react-in-cljs-error-boundaries/
 */
kaleidoscope.ui.utils.core.err_boundary = (function kaleidoscope$ui$utils$core$err_boundary(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23467 = arguments.length;
var i__5770__auto___23468 = (0);
while(true){
if((i__5770__auto___23468 < len__5769__auto___23467)){
args__5775__auto__.push((arguments[i__5770__auto___23468]));

var G__23469 = (i__5770__auto___23468 + (1));
i__5770__auto___23468 = G__23469;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return kaleidoscope.ui.utils.core.err_boundary.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(kaleidoscope.ui.utils.core.err_boundary.cljs$core$IFn$_invoke$arity$variadic = (function (children){
var err_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display-name","display-name",694513143),"ErrBoundary",new cljs.core.Keyword(null,"component-did-catch","component-did-catch",652725810),(function (err,msg){
return cljs.core.reset_BANG_(err_state,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),err,new cljs.core.Keyword(null,"message","message",-406056002),cljs.core.ex_message(msg)], null));
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function() { 
var G__23471__delegate = function (children__$1){
if((cljs.core.deref(err_state) == null)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),children__$1);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px",new cljs.core.Keyword(null,"display","display",242065432),"flex"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.notification_card.notification_card,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"level","level",1290497552),"error",new cljs.core.Keyword(null,"title","title",636505583),"Error loading 3D scene!",new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(err_state))], null)], null)], null);
}
};
var G__23471 = function (var_args){
var children__$1 = null;
if (arguments.length > 0) {
var G__23472__i = 0, G__23472__a = new Array(arguments.length -  0);
while (G__23472__i < G__23472__a.length) {G__23472__a[G__23472__i] = arguments[G__23472__i + 0]; ++G__23472__i;}
  children__$1 = new cljs.core.IndexedSeq(G__23472__a,0,null);
} 
return G__23471__delegate.call(this,children__$1);};
G__23471.cljs$lang$maxFixedArity = 0;
G__23471.cljs$lang$applyTo = (function (arglist__23473){
var children__$1 = cljs.core.seq(arglist__23473);
return G__23471__delegate(children__$1);
});
G__23471.cljs$core$IFn$_invoke$arity$variadic = G__23471__delegate;
return G__23471;
})()
], null));
}));

(kaleidoscope.ui.utils.core.err_boundary.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(kaleidoscope.ui.utils.core.err_boundary.cljs$lang$applyTo = (function (seq23462){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq23462));
}));


//# sourceMappingURL=kaleidoscope.ui.utils.core.js.map
