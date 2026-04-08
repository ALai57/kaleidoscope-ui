goog.provide('shadow.lazy');
goog.scope(function(){
  shadow.lazy.goog$module$goog$object = goog.module.get('goog.object');
  shadow.lazy.goog$module$shadow$loader = goog.module.get('shadow.loader');
});

/**
 * @interface
 */
shadow.lazy.ILoadable = function(){};

var shadow$lazy$ILoadable$ready_QMARK_$dyn_42764 = (function (x){
var x__5393__auto__ = (((x == null))?null:x);
var m__5394__auto__ = (shadow.lazy.ready_QMARK_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(x) : m__5394__auto__.call(null,x));
} else {
var m__5392__auto__ = (shadow.lazy.ready_QMARK_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(x) : m__5392__auto__.call(null,x));
} else {
throw cljs.core.missing_protocol("ILoadable.ready?",x);
}
}
});
shadow.lazy.ready_QMARK_ = (function shadow$lazy$ready_QMARK_(x){
if((((!((x == null)))) && ((!((x.shadow$lazy$ILoadable$ready_QMARK_$arity$1 == null)))))){
return x.shadow$lazy$ILoadable$ready_QMARK_$arity$1(x);
} else {
return shadow$lazy$ILoadable$ready_QMARK_$dyn_42764(x);
}
});


/**
* @constructor
 * @implements {shadow.lazy.ILoadable}
 * @implements {cljs.core.IDeref}
*/
shadow.lazy.Loadable = (function (modules,deref_fn){
this.modules = modules;
this.deref_fn = deref_fn;
this.cljs$lang$protocol_mask$partition0$ = 32768;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.lazy.Loadable.prototype.shadow$lazy$ILoadable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.lazy.Loadable.prototype.shadow$lazy$ILoadable$ready_QMARK_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.every_QMARK_(shadow.lazy.goog$module$shadow$loader.loaded_QMARK_,self__.modules);
}));

(shadow.lazy.Loadable.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(this$__$1.shadow$lazy$ILoadable$ready_QMARK_$arity$1(null))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("loadable not ready yet",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"modules","modules",-248193976),self__.modules], null));
}

return (self__.deref_fn.cljs$core$IFn$_invoke$arity$0 ? self__.deref_fn.cljs$core$IFn$_invoke$arity$0() : self__.deref_fn.call(null));
}));

(shadow.lazy.Loadable.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"modules","modules",1392337551,null),new cljs.core.Symbol(null,"deref-fn","deref-fn",-1070945319,null)], null);
}));

(shadow.lazy.Loadable.cljs$lang$type = true);

(shadow.lazy.Loadable.cljs$lang$ctorStr = "shadow.lazy/Loadable");

(shadow.lazy.Loadable.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.lazy/Loadable");
}));

/**
 * Positional factory function for shadow.lazy/Loadable.
 */
shadow.lazy.__GT_Loadable = (function shadow$lazy$__GT_Loadable(modules,deref_fn){
return (new shadow.lazy.Loadable(modules,deref_fn));
});

shadow.lazy.loadable = (function shadow$lazy$loadable(thing){
return null;
});
shadow.lazy.load = (function shadow$lazy$load(var_args){
var G__42737 = arguments.length;
switch (G__42737) {
case 1:
return shadow.lazy.load.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.lazy.load.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.lazy.load.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.lazy.load.cljs$core$IFn$_invoke$arity$1 = (function (the_loadable){
if((the_loadable instanceof shadow.lazy.Loadable)){
} else {
throw (new Error("Assert failed: (instance? Loadable the-loadable)"));
}

var all_mods = the_loadable.modules;
var loading_map = shadow.lazy.goog$module$shadow$loader.load_multiple(cljs.core.into_array.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.name),all_mods));
var combined = (new goog.async.Deferred());
var callback_fn = the_loadable.deref_fn;
var err_fn = (function (err){
return combined.errback(err);
});
var success_fn = (function (){
if(cljs.core.truth_(the_loadable.shadow$lazy$ILoadable$ready_QMARK_$arity$1(null))){
return combined.callback((callback_fn.cljs$core$IFn$_invoke$arity$0 ? callback_fn.cljs$core$IFn$_invoke$arity$0() : callback_fn.call(null)));
} else {
return null;
}
});
var seq__42751_42768 = cljs.core.seq(all_mods);
var chunk__42752_42769 = null;
var count__42753_42770 = (0);
var i__42754_42771 = (0);
while(true){
if((i__42754_42771 < count__42753_42770)){
var mod_42772 = chunk__42752_42769.cljs$core$IIndexed$_nth$arity$2(null,i__42754_42771);
var mod_deferred_42773 = shadow.lazy.goog$module$goog$object.get(loading_map,cljs.core.name(mod_42772));
mod_deferred_42773.addCallbacks(success_fn,err_fn);


var G__42774 = seq__42751_42768;
var G__42775 = chunk__42752_42769;
var G__42776 = count__42753_42770;
var G__42777 = (i__42754_42771 + (1));
seq__42751_42768 = G__42774;
chunk__42752_42769 = G__42775;
count__42753_42770 = G__42776;
i__42754_42771 = G__42777;
continue;
} else {
var temp__5804__auto___42778 = cljs.core.seq(seq__42751_42768);
if(temp__5804__auto___42778){
var seq__42751_42780__$1 = temp__5804__auto___42778;
if(cljs.core.chunked_seq_QMARK_(seq__42751_42780__$1)){
var c__5568__auto___42781 = cljs.core.chunk_first(seq__42751_42780__$1);
var G__42783 = cljs.core.chunk_rest(seq__42751_42780__$1);
var G__42784 = c__5568__auto___42781;
var G__42785 = cljs.core.count(c__5568__auto___42781);
var G__42786 = (0);
seq__42751_42768 = G__42783;
chunk__42752_42769 = G__42784;
count__42753_42770 = G__42785;
i__42754_42771 = G__42786;
continue;
} else {
var mod_42788 = cljs.core.first(seq__42751_42780__$1);
var mod_deferred_42789 = shadow.lazy.goog$module$goog$object.get(loading_map,cljs.core.name(mod_42788));
mod_deferred_42789.addCallbacks(success_fn,err_fn);


var G__42791 = cljs.core.next(seq__42751_42780__$1);
var G__42792 = null;
var G__42793 = (0);
var G__42794 = (0);
seq__42751_42768 = G__42791;
chunk__42752_42769 = G__42792;
count__42753_42770 = G__42793;
i__42754_42771 = G__42794;
continue;
}
} else {
}
}
break;
}

return combined;
}));

(shadow.lazy.load.cljs$core$IFn$_invoke$arity$2 = (function (the_loadable,call_fn){
return shadow.lazy.load.cljs$core$IFn$_invoke$arity$1(the_loadable).then(call_fn);
}));

(shadow.lazy.load.cljs$core$IFn$_invoke$arity$3 = (function (the_loadable,call_fn,err_fn){
return shadow.lazy.load.cljs$core$IFn$_invoke$arity$1(the_loadable).then(call_fn,err_fn);
}));

(shadow.lazy.load.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=shadow.lazy.js.map
