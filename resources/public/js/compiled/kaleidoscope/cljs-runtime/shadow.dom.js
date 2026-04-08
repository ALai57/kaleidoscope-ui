goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_35602 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_35602(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_35605 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_35605(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__34359 = coll;
var G__34360 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__34359,G__34360) : shadow.dom.lazy_native_coll_seq.call(null,G__34359,G__34360));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__34394 = arguments.length;
switch (G__34394) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__34397 = arguments.length;
switch (G__34397) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__34407 = arguments.length;
switch (G__34407) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__34418 = arguments.length;
switch (G__34418) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__34436 = arguments.length;
switch (G__34436) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__34444 = arguments.length;
switch (G__34444) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e34455){if((e34455 instanceof Object)){
var e = e34455;
return console.log("didnt support attachEvent",el,e);
} else {
throw e34455;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__34464 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__34465 = null;
var count__34466 = (0);
var i__34467 = (0);
while(true){
if((i__34467 < count__34466)){
var el = chunk__34465.cljs$core$IIndexed$_nth$arity$2(null,i__34467);
var handler_35659__$1 = ((function (seq__34464,chunk__34465,count__34466,i__34467,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__34464,chunk__34465,count__34466,i__34467,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_35659__$1);


var G__35660 = seq__34464;
var G__35661 = chunk__34465;
var G__35662 = count__34466;
var G__35663 = (i__34467 + (1));
seq__34464 = G__35660;
chunk__34465 = G__35661;
count__34466 = G__35662;
i__34467 = G__35663;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__34464);
if(temp__5804__auto__){
var seq__34464__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34464__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__34464__$1);
var G__35668 = cljs.core.chunk_rest(seq__34464__$1);
var G__35669 = c__5568__auto__;
var G__35670 = cljs.core.count(c__5568__auto__);
var G__35671 = (0);
seq__34464 = G__35668;
chunk__34465 = G__35669;
count__34466 = G__35670;
i__34467 = G__35671;
continue;
} else {
var el = cljs.core.first(seq__34464__$1);
var handler_35673__$1 = ((function (seq__34464,chunk__34465,count__34466,i__34467,el,seq__34464__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__34464,chunk__34465,count__34466,i__34467,el,seq__34464__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_35673__$1);


var G__35677 = cljs.core.next(seq__34464__$1);
var G__35678 = null;
var G__35679 = (0);
var G__35680 = (0);
seq__34464 = G__35677;
chunk__34465 = G__35678;
count__34466 = G__35679;
i__34467 = G__35680;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__34475 = arguments.length;
switch (G__34475) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__34478 = cljs.core.seq(events);
var chunk__34493 = null;
var count__34494 = (0);
var i__34495 = (0);
while(true){
if((i__34495 < count__34494)){
var vec__34513 = chunk__34493.cljs$core$IIndexed$_nth$arity$2(null,i__34495);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34513,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34513,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__35727 = seq__34478;
var G__35728 = chunk__34493;
var G__35729 = count__34494;
var G__35730 = (i__34495 + (1));
seq__34478 = G__35727;
chunk__34493 = G__35728;
count__34494 = G__35729;
i__34495 = G__35730;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__34478);
if(temp__5804__auto__){
var seq__34478__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34478__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__34478__$1);
var G__35731 = cljs.core.chunk_rest(seq__34478__$1);
var G__35732 = c__5568__auto__;
var G__35733 = cljs.core.count(c__5568__auto__);
var G__35734 = (0);
seq__34478 = G__35731;
chunk__34493 = G__35732;
count__34494 = G__35733;
i__34495 = G__35734;
continue;
} else {
var vec__34519 = cljs.core.first(seq__34478__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34519,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34519,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__35735 = cljs.core.next(seq__34478__$1);
var G__35736 = null;
var G__35737 = (0);
var G__35738 = (0);
seq__34478 = G__35735;
chunk__34493 = G__35736;
count__34494 = G__35737;
i__34495 = G__35738;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__34538 = cljs.core.seq(styles);
var chunk__34539 = null;
var count__34540 = (0);
var i__34541 = (0);
while(true){
if((i__34541 < count__34540)){
var vec__34569 = chunk__34539.cljs$core$IIndexed$_nth$arity$2(null,i__34541);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34569,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34569,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__35742 = seq__34538;
var G__35743 = chunk__34539;
var G__35744 = count__34540;
var G__35745 = (i__34541 + (1));
seq__34538 = G__35742;
chunk__34539 = G__35743;
count__34540 = G__35744;
i__34541 = G__35745;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__34538);
if(temp__5804__auto__){
var seq__34538__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34538__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__34538__$1);
var G__35751 = cljs.core.chunk_rest(seq__34538__$1);
var G__35752 = c__5568__auto__;
var G__35753 = cljs.core.count(c__5568__auto__);
var G__35754 = (0);
seq__34538 = G__35751;
chunk__34539 = G__35752;
count__34540 = G__35753;
i__34541 = G__35754;
continue;
} else {
var vec__34580 = cljs.core.first(seq__34538__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34580,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34580,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__35757 = cljs.core.next(seq__34538__$1);
var G__35758 = null;
var G__35759 = (0);
var G__35760 = (0);
seq__34538 = G__35757;
chunk__34539 = G__35758;
count__34540 = G__35759;
i__34541 = G__35760;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__34591_35761 = key;
var G__34591_35762__$1 = (((G__34591_35761 instanceof cljs.core.Keyword))?G__34591_35761.fqn:null);
switch (G__34591_35762__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_35781 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_35781,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_35781,"aria-");
}
})())){
el.setAttribute(ks_35781,value);
} else {
(el[ks_35781] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__34642){
var map__34643 = p__34642;
var map__34643__$1 = cljs.core.__destructure_map(map__34643);
var props = map__34643__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34643__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__34644 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34644,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34644,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34644,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__34650 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__34650,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__34650;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__34655 = arguments.length;
switch (G__34655) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__34671){
var vec__34673 = p__34671;
var seq__34674 = cljs.core.seq(vec__34673);
var first__34675 = cljs.core.first(seq__34674);
var seq__34674__$1 = cljs.core.next(seq__34674);
var nn = first__34675;
var first__34675__$1 = cljs.core.first(seq__34674__$1);
var seq__34674__$2 = cljs.core.next(seq__34674__$1);
var np = first__34675__$1;
var nc = seq__34674__$2;
var node = vec__34673;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__34677 = nn;
var G__34678 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__34677,G__34678) : create_fn.call(null,G__34677,G__34678));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__34679 = nn;
var G__34680 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__34679,G__34680) : create_fn.call(null,G__34679,G__34680));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__34684 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34684,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34684,(1),null);
var seq__34689_35836 = cljs.core.seq(node_children);
var chunk__34690_35837 = null;
var count__34691_35838 = (0);
var i__34693_35839 = (0);
while(true){
if((i__34693_35839 < count__34691_35838)){
var child_struct_35841 = chunk__34690_35837.cljs$core$IIndexed$_nth$arity$2(null,i__34693_35839);
var children_35846 = shadow.dom.dom_node(child_struct_35841);
if(cljs.core.seq_QMARK_(children_35846)){
var seq__34801_35847 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_35846));
var chunk__34803_35848 = null;
var count__34804_35849 = (0);
var i__34805_35850 = (0);
while(true){
if((i__34805_35850 < count__34804_35849)){
var child_35855 = chunk__34803_35848.cljs$core$IIndexed$_nth$arity$2(null,i__34805_35850);
if(cljs.core.truth_(child_35855)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35855);


var G__35857 = seq__34801_35847;
var G__35858 = chunk__34803_35848;
var G__35859 = count__34804_35849;
var G__35860 = (i__34805_35850 + (1));
seq__34801_35847 = G__35857;
chunk__34803_35848 = G__35858;
count__34804_35849 = G__35859;
i__34805_35850 = G__35860;
continue;
} else {
var G__35862 = seq__34801_35847;
var G__35863 = chunk__34803_35848;
var G__35864 = count__34804_35849;
var G__35865 = (i__34805_35850 + (1));
seq__34801_35847 = G__35862;
chunk__34803_35848 = G__35863;
count__34804_35849 = G__35864;
i__34805_35850 = G__35865;
continue;
}
} else {
var temp__5804__auto___35866 = cljs.core.seq(seq__34801_35847);
if(temp__5804__auto___35866){
var seq__34801_35871__$1 = temp__5804__auto___35866;
if(cljs.core.chunked_seq_QMARK_(seq__34801_35871__$1)){
var c__5568__auto___35872 = cljs.core.chunk_first(seq__34801_35871__$1);
var G__35873 = cljs.core.chunk_rest(seq__34801_35871__$1);
var G__35874 = c__5568__auto___35872;
var G__35875 = cljs.core.count(c__5568__auto___35872);
var G__35876 = (0);
seq__34801_35847 = G__35873;
chunk__34803_35848 = G__35874;
count__34804_35849 = G__35875;
i__34805_35850 = G__35876;
continue;
} else {
var child_35877 = cljs.core.first(seq__34801_35871__$1);
if(cljs.core.truth_(child_35877)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35877);


var G__35888 = cljs.core.next(seq__34801_35871__$1);
var G__35889 = null;
var G__35890 = (0);
var G__35891 = (0);
seq__34801_35847 = G__35888;
chunk__34803_35848 = G__35889;
count__34804_35849 = G__35890;
i__34805_35850 = G__35891;
continue;
} else {
var G__35892 = cljs.core.next(seq__34801_35871__$1);
var G__35893 = null;
var G__35894 = (0);
var G__35895 = (0);
seq__34801_35847 = G__35892;
chunk__34803_35848 = G__35893;
count__34804_35849 = G__35894;
i__34805_35850 = G__35895;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_35846);
}


var G__35896 = seq__34689_35836;
var G__35897 = chunk__34690_35837;
var G__35898 = count__34691_35838;
var G__35899 = (i__34693_35839 + (1));
seq__34689_35836 = G__35896;
chunk__34690_35837 = G__35897;
count__34691_35838 = G__35898;
i__34693_35839 = G__35899;
continue;
} else {
var temp__5804__auto___35905 = cljs.core.seq(seq__34689_35836);
if(temp__5804__auto___35905){
var seq__34689_35906__$1 = temp__5804__auto___35905;
if(cljs.core.chunked_seq_QMARK_(seq__34689_35906__$1)){
var c__5568__auto___35907 = cljs.core.chunk_first(seq__34689_35906__$1);
var G__35908 = cljs.core.chunk_rest(seq__34689_35906__$1);
var G__35909 = c__5568__auto___35907;
var G__35910 = cljs.core.count(c__5568__auto___35907);
var G__35911 = (0);
seq__34689_35836 = G__35908;
chunk__34690_35837 = G__35909;
count__34691_35838 = G__35910;
i__34693_35839 = G__35911;
continue;
} else {
var child_struct_35912 = cljs.core.first(seq__34689_35906__$1);
var children_35913 = shadow.dom.dom_node(child_struct_35912);
if(cljs.core.seq_QMARK_(children_35913)){
var seq__34837_35914 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_35913));
var chunk__34839_35916 = null;
var count__34840_35917 = (0);
var i__34841_35918 = (0);
while(true){
if((i__34841_35918 < count__34840_35917)){
var child_35920 = chunk__34839_35916.cljs$core$IIndexed$_nth$arity$2(null,i__34841_35918);
if(cljs.core.truth_(child_35920)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35920);


var G__35921 = seq__34837_35914;
var G__35922 = chunk__34839_35916;
var G__35923 = count__34840_35917;
var G__35924 = (i__34841_35918 + (1));
seq__34837_35914 = G__35921;
chunk__34839_35916 = G__35922;
count__34840_35917 = G__35923;
i__34841_35918 = G__35924;
continue;
} else {
var G__35925 = seq__34837_35914;
var G__35926 = chunk__34839_35916;
var G__35927 = count__34840_35917;
var G__35928 = (i__34841_35918 + (1));
seq__34837_35914 = G__35925;
chunk__34839_35916 = G__35926;
count__34840_35917 = G__35927;
i__34841_35918 = G__35928;
continue;
}
} else {
var temp__5804__auto___35930__$1 = cljs.core.seq(seq__34837_35914);
if(temp__5804__auto___35930__$1){
var seq__34837_35933__$1 = temp__5804__auto___35930__$1;
if(cljs.core.chunked_seq_QMARK_(seq__34837_35933__$1)){
var c__5568__auto___35939 = cljs.core.chunk_first(seq__34837_35933__$1);
var G__35940 = cljs.core.chunk_rest(seq__34837_35933__$1);
var G__35941 = c__5568__auto___35939;
var G__35942 = cljs.core.count(c__5568__auto___35939);
var G__35943 = (0);
seq__34837_35914 = G__35940;
chunk__34839_35916 = G__35941;
count__34840_35917 = G__35942;
i__34841_35918 = G__35943;
continue;
} else {
var child_35950 = cljs.core.first(seq__34837_35933__$1);
if(cljs.core.truth_(child_35950)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35950);


var G__35951 = cljs.core.next(seq__34837_35933__$1);
var G__35952 = null;
var G__35953 = (0);
var G__35954 = (0);
seq__34837_35914 = G__35951;
chunk__34839_35916 = G__35952;
count__34840_35917 = G__35953;
i__34841_35918 = G__35954;
continue;
} else {
var G__35956 = cljs.core.next(seq__34837_35933__$1);
var G__35957 = null;
var G__35958 = (0);
var G__35959 = (0);
seq__34837_35914 = G__35956;
chunk__34839_35916 = G__35957;
count__34840_35917 = G__35958;
i__34841_35918 = G__35959;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_35913);
}


var G__35962 = cljs.core.next(seq__34689_35906__$1);
var G__35963 = null;
var G__35964 = (0);
var G__35965 = (0);
seq__34689_35836 = G__35962;
chunk__34690_35837 = G__35963;
count__34691_35838 = G__35964;
i__34693_35839 = G__35965;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__34873 = cljs.core.seq(node);
var chunk__34874 = null;
var count__34875 = (0);
var i__34876 = (0);
while(true){
if((i__34876 < count__34875)){
var n = chunk__34874.cljs$core$IIndexed$_nth$arity$2(null,i__34876);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__35982 = seq__34873;
var G__35983 = chunk__34874;
var G__35984 = count__34875;
var G__35985 = (i__34876 + (1));
seq__34873 = G__35982;
chunk__34874 = G__35983;
count__34875 = G__35984;
i__34876 = G__35985;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__34873);
if(temp__5804__auto__){
var seq__34873__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34873__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__34873__$1);
var G__35987 = cljs.core.chunk_rest(seq__34873__$1);
var G__35988 = c__5568__auto__;
var G__35989 = cljs.core.count(c__5568__auto__);
var G__35990 = (0);
seq__34873 = G__35987;
chunk__34874 = G__35988;
count__34875 = G__35989;
i__34876 = G__35990;
continue;
} else {
var n = cljs.core.first(seq__34873__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__35991 = cljs.core.next(seq__34873__$1);
var G__35992 = null;
var G__35993 = (0);
var G__35994 = (0);
seq__34873 = G__35991;
chunk__34874 = G__35992;
count__34875 = G__35993;
i__34876 = G__35994;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__34890 = arguments.length;
switch (G__34890) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__34895 = arguments.length;
switch (G__34895) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__34911 = arguments.length;
switch (G__34911) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___36026 = arguments.length;
var i__5770__auto___36028 = (0);
while(true){
if((i__5770__auto___36028 < len__5769__auto___36026)){
args__5775__auto__.push((arguments[i__5770__auto___36028]));

var G__36029 = (i__5770__auto___36028 + (1));
i__5770__auto___36028 = G__36029;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__34917_36033 = cljs.core.seq(nodes);
var chunk__34918_36034 = null;
var count__34919_36035 = (0);
var i__34920_36036 = (0);
while(true){
if((i__34920_36036 < count__34919_36035)){
var node_36037 = chunk__34918_36034.cljs$core$IIndexed$_nth$arity$2(null,i__34920_36036);
fragment.appendChild(shadow.dom._to_dom(node_36037));


var G__36038 = seq__34917_36033;
var G__36039 = chunk__34918_36034;
var G__36040 = count__34919_36035;
var G__36041 = (i__34920_36036 + (1));
seq__34917_36033 = G__36038;
chunk__34918_36034 = G__36039;
count__34919_36035 = G__36040;
i__34920_36036 = G__36041;
continue;
} else {
var temp__5804__auto___36042 = cljs.core.seq(seq__34917_36033);
if(temp__5804__auto___36042){
var seq__34917_36043__$1 = temp__5804__auto___36042;
if(cljs.core.chunked_seq_QMARK_(seq__34917_36043__$1)){
var c__5568__auto___36044 = cljs.core.chunk_first(seq__34917_36043__$1);
var G__36045 = cljs.core.chunk_rest(seq__34917_36043__$1);
var G__36046 = c__5568__auto___36044;
var G__36047 = cljs.core.count(c__5568__auto___36044);
var G__36048 = (0);
seq__34917_36033 = G__36045;
chunk__34918_36034 = G__36046;
count__34919_36035 = G__36047;
i__34920_36036 = G__36048;
continue;
} else {
var node_36049 = cljs.core.first(seq__34917_36043__$1);
fragment.appendChild(shadow.dom._to_dom(node_36049));


var G__36050 = cljs.core.next(seq__34917_36043__$1);
var G__36051 = null;
var G__36052 = (0);
var G__36053 = (0);
seq__34917_36033 = G__36050;
chunk__34918_36034 = G__36051;
count__34919_36035 = G__36052;
i__34920_36036 = G__36053;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq34915){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq34915));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__34926_36059 = cljs.core.seq(scripts);
var chunk__34927_36060 = null;
var count__34928_36061 = (0);
var i__34929_36062 = (0);
while(true){
if((i__34929_36062 < count__34928_36061)){
var vec__34943_36063 = chunk__34927_36060.cljs$core$IIndexed$_nth$arity$2(null,i__34929_36062);
var script_tag_36064 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34943_36063,(0),null);
var script_body_36065 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34943_36063,(1),null);
eval(script_body_36065);


var G__36068 = seq__34926_36059;
var G__36069 = chunk__34927_36060;
var G__36070 = count__34928_36061;
var G__36071 = (i__34929_36062 + (1));
seq__34926_36059 = G__36068;
chunk__34927_36060 = G__36069;
count__34928_36061 = G__36070;
i__34929_36062 = G__36071;
continue;
} else {
var temp__5804__auto___36072 = cljs.core.seq(seq__34926_36059);
if(temp__5804__auto___36072){
var seq__34926_36073__$1 = temp__5804__auto___36072;
if(cljs.core.chunked_seq_QMARK_(seq__34926_36073__$1)){
var c__5568__auto___36074 = cljs.core.chunk_first(seq__34926_36073__$1);
var G__36075 = cljs.core.chunk_rest(seq__34926_36073__$1);
var G__36076 = c__5568__auto___36074;
var G__36077 = cljs.core.count(c__5568__auto___36074);
var G__36078 = (0);
seq__34926_36059 = G__36075;
chunk__34927_36060 = G__36076;
count__34928_36061 = G__36077;
i__34929_36062 = G__36078;
continue;
} else {
var vec__34947_36081 = cljs.core.first(seq__34926_36073__$1);
var script_tag_36082 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34947_36081,(0),null);
var script_body_36083 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34947_36081,(1),null);
eval(script_body_36083);


var G__36084 = cljs.core.next(seq__34926_36073__$1);
var G__36085 = null;
var G__36086 = (0);
var G__36087 = (0);
seq__34926_36059 = G__36084;
chunk__34927_36060 = G__36085;
count__34928_36061 = G__36086;
i__34929_36062 = G__36087;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__34952){
var vec__34954 = p__34952;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34954,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34954,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__34972 = arguments.length;
switch (G__34972) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__34981 = cljs.core.seq(style_keys);
var chunk__34982 = null;
var count__34983 = (0);
var i__34984 = (0);
while(true){
if((i__34984 < count__34983)){
var it = chunk__34982.cljs$core$IIndexed$_nth$arity$2(null,i__34984);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__36119 = seq__34981;
var G__36120 = chunk__34982;
var G__36121 = count__34983;
var G__36122 = (i__34984 + (1));
seq__34981 = G__36119;
chunk__34982 = G__36120;
count__34983 = G__36121;
i__34984 = G__36122;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__34981);
if(temp__5804__auto__){
var seq__34981__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34981__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__34981__$1);
var G__36123 = cljs.core.chunk_rest(seq__34981__$1);
var G__36124 = c__5568__auto__;
var G__36125 = cljs.core.count(c__5568__auto__);
var G__36126 = (0);
seq__34981 = G__36123;
chunk__34982 = G__36124;
count__34983 = G__36125;
i__34984 = G__36126;
continue;
} else {
var it = cljs.core.first(seq__34981__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__36127 = cljs.core.next(seq__34981__$1);
var G__36128 = null;
var G__36129 = (0);
var G__36130 = (0);
seq__34981 = G__36127;
chunk__34982 = G__36128;
count__34983 = G__36129;
i__34984 = G__36130;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k34995,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__35021 = k34995;
var G__35021__$1 = (((G__35021 instanceof cljs.core.Keyword))?G__35021.fqn:null);
switch (G__35021__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k34995,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__35033){
var vec__35035 = p__35033;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35035,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35035,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__34994){
var self__ = this;
var G__34994__$1 = this;
return (new cljs.core.RecordIter((0),G__34994__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this34997,other34998){
var self__ = this;
var this34997__$1 = this;
return (((!((other34998 == null)))) && ((((this34997__$1.constructor === other34998.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this34997__$1.x,other34998.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this34997__$1.y,other34998.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this34997__$1.__extmap,other34998.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k34995){
var self__ = this;
var this__5350__auto____$1 = this;
var G__35112 = k34995;
var G__35112__$1 = (((G__35112 instanceof cljs.core.Keyword))?G__35112.fqn:null);
switch (G__35112__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k34995);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__34994){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__35114 = cljs.core.keyword_identical_QMARK_;
var expr__35115 = k__5352__auto__;
if(cljs.core.truth_((pred__35114.cljs$core$IFn$_invoke$arity$2 ? pred__35114.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__35115) : pred__35114.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__35115)))){
return (new shadow.dom.Coordinate(G__34994,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__35114.cljs$core$IFn$_invoke$arity$2 ? pred__35114.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__35115) : pred__35114.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__35115)))){
return (new shadow.dom.Coordinate(self__.x,G__34994,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__34994),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__34994){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__34994,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__35003){
var extmap__5385__auto__ = (function (){var G__35144 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__35003,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__35003)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__35144);
} else {
return G__35144;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__35003),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__35003),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k35163,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__35173 = k35163;
var G__35173__$1 = (((G__35173 instanceof cljs.core.Keyword))?G__35173.fqn:null);
switch (G__35173__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k35163,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__35181){
var vec__35182 = p__35181;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35182,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35182,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__35162){
var self__ = this;
var G__35162__$1 = this;
return (new cljs.core.RecordIter((0),G__35162__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this35164,other35165){
var self__ = this;
var this35164__$1 = this;
return (((!((other35165 == null)))) && ((((this35164__$1.constructor === other35165.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35164__$1.w,other35165.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35164__$1.h,other35165.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35164__$1.__extmap,other35165.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k35163){
var self__ = this;
var this__5350__auto____$1 = this;
var G__35194 = k35163;
var G__35194__$1 = (((G__35194 instanceof cljs.core.Keyword))?G__35194.fqn:null);
switch (G__35194__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k35163);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__35162){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__35200 = cljs.core.keyword_identical_QMARK_;
var expr__35201 = k__5352__auto__;
if(cljs.core.truth_((pred__35200.cljs$core$IFn$_invoke$arity$2 ? pred__35200.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__35201) : pred__35200.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__35201)))){
return (new shadow.dom.Size(G__35162,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__35200.cljs$core$IFn$_invoke$arity$2 ? pred__35200.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__35201) : pred__35200.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__35201)))){
return (new shadow.dom.Size(self__.w,G__35162,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__35162),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__35162){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__35162,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__35168){
var extmap__5385__auto__ = (function (){var G__35215 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__35168,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__35168)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__35215);
} else {
return G__35215;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__35168),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__35168),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__36189 = (i + (1));
var G__36190 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__36189;
ret = G__36190;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__35246){
var vec__35247 = p__35246;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35247,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35247,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__35254 = arguments.length;
switch (G__35254) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__36211 = ps;
var G__36212 = (i + (1));
el__$1 = G__36211;
i = G__36212;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__35338 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35338,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35338,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35338,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__35342_36227 = cljs.core.seq(props);
var chunk__35343_36228 = null;
var count__35344_36229 = (0);
var i__35345_36230 = (0);
while(true){
if((i__35345_36230 < count__35344_36229)){
var vec__35373_36231 = chunk__35343_36228.cljs$core$IIndexed$_nth$arity$2(null,i__35345_36230);
var k_36232 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35373_36231,(0),null);
var v_36233 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35373_36231,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_36232);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_36232),v_36233);


var G__36238 = seq__35342_36227;
var G__36239 = chunk__35343_36228;
var G__36240 = count__35344_36229;
var G__36241 = (i__35345_36230 + (1));
seq__35342_36227 = G__36238;
chunk__35343_36228 = G__36239;
count__35344_36229 = G__36240;
i__35345_36230 = G__36241;
continue;
} else {
var temp__5804__auto___36243 = cljs.core.seq(seq__35342_36227);
if(temp__5804__auto___36243){
var seq__35342_36245__$1 = temp__5804__auto___36243;
if(cljs.core.chunked_seq_QMARK_(seq__35342_36245__$1)){
var c__5568__auto___36248 = cljs.core.chunk_first(seq__35342_36245__$1);
var G__36249 = cljs.core.chunk_rest(seq__35342_36245__$1);
var G__36250 = c__5568__auto___36248;
var G__36251 = cljs.core.count(c__5568__auto___36248);
var G__36252 = (0);
seq__35342_36227 = G__36249;
chunk__35343_36228 = G__36250;
count__35344_36229 = G__36251;
i__35345_36230 = G__36252;
continue;
} else {
var vec__35415_36254 = cljs.core.first(seq__35342_36245__$1);
var k_36255 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35415_36254,(0),null);
var v_36256 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35415_36254,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_36255);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_36255),v_36256);


var G__36261 = cljs.core.next(seq__35342_36245__$1);
var G__36262 = null;
var G__36263 = (0);
var G__36264 = (0);
seq__35342_36227 = G__36261;
chunk__35343_36228 = G__36262;
count__35344_36229 = G__36263;
i__35345_36230 = G__36264;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__35448 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35448,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35448,(1),null);
var seq__35452_36272 = cljs.core.seq(node_children);
var chunk__35454_36273 = null;
var count__35455_36274 = (0);
var i__35456_36275 = (0);
while(true){
if((i__35456_36275 < count__35455_36274)){
var child_struct_36276 = chunk__35454_36273.cljs$core$IIndexed$_nth$arity$2(null,i__35456_36275);
if((!((child_struct_36276 == null)))){
if(typeof child_struct_36276 === 'string'){
var text_36280 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_36280),child_struct_36276].join(''));
} else {
var children_36284 = shadow.dom.svg_node(child_struct_36276);
if(cljs.core.seq_QMARK_(children_36284)){
var seq__35496_36286 = cljs.core.seq(children_36284);
var chunk__35498_36287 = null;
var count__35499_36288 = (0);
var i__35500_36289 = (0);
while(true){
if((i__35500_36289 < count__35499_36288)){
var child_36290 = chunk__35498_36287.cljs$core$IIndexed$_nth$arity$2(null,i__35500_36289);
if(cljs.core.truth_(child_36290)){
node.appendChild(child_36290);


var G__36292 = seq__35496_36286;
var G__36293 = chunk__35498_36287;
var G__36294 = count__35499_36288;
var G__36295 = (i__35500_36289 + (1));
seq__35496_36286 = G__36292;
chunk__35498_36287 = G__36293;
count__35499_36288 = G__36294;
i__35500_36289 = G__36295;
continue;
} else {
var G__36299 = seq__35496_36286;
var G__36300 = chunk__35498_36287;
var G__36301 = count__35499_36288;
var G__36302 = (i__35500_36289 + (1));
seq__35496_36286 = G__36299;
chunk__35498_36287 = G__36300;
count__35499_36288 = G__36301;
i__35500_36289 = G__36302;
continue;
}
} else {
var temp__5804__auto___36308 = cljs.core.seq(seq__35496_36286);
if(temp__5804__auto___36308){
var seq__35496_36311__$1 = temp__5804__auto___36308;
if(cljs.core.chunked_seq_QMARK_(seq__35496_36311__$1)){
var c__5568__auto___36312 = cljs.core.chunk_first(seq__35496_36311__$1);
var G__36316 = cljs.core.chunk_rest(seq__35496_36311__$1);
var G__36317 = c__5568__auto___36312;
var G__36318 = cljs.core.count(c__5568__auto___36312);
var G__36319 = (0);
seq__35496_36286 = G__36316;
chunk__35498_36287 = G__36317;
count__35499_36288 = G__36318;
i__35500_36289 = G__36319;
continue;
} else {
var child_36320 = cljs.core.first(seq__35496_36311__$1);
if(cljs.core.truth_(child_36320)){
node.appendChild(child_36320);


var G__36327 = cljs.core.next(seq__35496_36311__$1);
var G__36328 = null;
var G__36329 = (0);
var G__36330 = (0);
seq__35496_36286 = G__36327;
chunk__35498_36287 = G__36328;
count__35499_36288 = G__36329;
i__35500_36289 = G__36330;
continue;
} else {
var G__36331 = cljs.core.next(seq__35496_36311__$1);
var G__36332 = null;
var G__36333 = (0);
var G__36334 = (0);
seq__35496_36286 = G__36331;
chunk__35498_36287 = G__36332;
count__35499_36288 = G__36333;
i__35500_36289 = G__36334;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_36284);
}
}


var G__36335 = seq__35452_36272;
var G__36336 = chunk__35454_36273;
var G__36337 = count__35455_36274;
var G__36338 = (i__35456_36275 + (1));
seq__35452_36272 = G__36335;
chunk__35454_36273 = G__36336;
count__35455_36274 = G__36337;
i__35456_36275 = G__36338;
continue;
} else {
var G__36339 = seq__35452_36272;
var G__36340 = chunk__35454_36273;
var G__36341 = count__35455_36274;
var G__36342 = (i__35456_36275 + (1));
seq__35452_36272 = G__36339;
chunk__35454_36273 = G__36340;
count__35455_36274 = G__36341;
i__35456_36275 = G__36342;
continue;
}
} else {
var temp__5804__auto___36343 = cljs.core.seq(seq__35452_36272);
if(temp__5804__auto___36343){
var seq__35452_36344__$1 = temp__5804__auto___36343;
if(cljs.core.chunked_seq_QMARK_(seq__35452_36344__$1)){
var c__5568__auto___36345 = cljs.core.chunk_first(seq__35452_36344__$1);
var G__36346 = cljs.core.chunk_rest(seq__35452_36344__$1);
var G__36347 = c__5568__auto___36345;
var G__36348 = cljs.core.count(c__5568__auto___36345);
var G__36349 = (0);
seq__35452_36272 = G__36346;
chunk__35454_36273 = G__36347;
count__35455_36274 = G__36348;
i__35456_36275 = G__36349;
continue;
} else {
var child_struct_36355 = cljs.core.first(seq__35452_36344__$1);
if((!((child_struct_36355 == null)))){
if(typeof child_struct_36355 === 'string'){
var text_36356 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_36356),child_struct_36355].join(''));
} else {
var children_36362 = shadow.dom.svg_node(child_struct_36355);
if(cljs.core.seq_QMARK_(children_36362)){
var seq__35518_36366 = cljs.core.seq(children_36362);
var chunk__35520_36367 = null;
var count__35521_36368 = (0);
var i__35522_36369 = (0);
while(true){
if((i__35522_36369 < count__35521_36368)){
var child_36373 = chunk__35520_36367.cljs$core$IIndexed$_nth$arity$2(null,i__35522_36369);
if(cljs.core.truth_(child_36373)){
node.appendChild(child_36373);


var G__36377 = seq__35518_36366;
var G__36378 = chunk__35520_36367;
var G__36379 = count__35521_36368;
var G__36380 = (i__35522_36369 + (1));
seq__35518_36366 = G__36377;
chunk__35520_36367 = G__36378;
count__35521_36368 = G__36379;
i__35522_36369 = G__36380;
continue;
} else {
var G__36381 = seq__35518_36366;
var G__36382 = chunk__35520_36367;
var G__36383 = count__35521_36368;
var G__36384 = (i__35522_36369 + (1));
seq__35518_36366 = G__36381;
chunk__35520_36367 = G__36382;
count__35521_36368 = G__36383;
i__35522_36369 = G__36384;
continue;
}
} else {
var temp__5804__auto___36388__$1 = cljs.core.seq(seq__35518_36366);
if(temp__5804__auto___36388__$1){
var seq__35518_36389__$1 = temp__5804__auto___36388__$1;
if(cljs.core.chunked_seq_QMARK_(seq__35518_36389__$1)){
var c__5568__auto___36390 = cljs.core.chunk_first(seq__35518_36389__$1);
var G__36391 = cljs.core.chunk_rest(seq__35518_36389__$1);
var G__36392 = c__5568__auto___36390;
var G__36393 = cljs.core.count(c__5568__auto___36390);
var G__36394 = (0);
seq__35518_36366 = G__36391;
chunk__35520_36367 = G__36392;
count__35521_36368 = G__36393;
i__35522_36369 = G__36394;
continue;
} else {
var child_36400 = cljs.core.first(seq__35518_36389__$1);
if(cljs.core.truth_(child_36400)){
node.appendChild(child_36400);


var G__36403 = cljs.core.next(seq__35518_36389__$1);
var G__36404 = null;
var G__36405 = (0);
var G__36406 = (0);
seq__35518_36366 = G__36403;
chunk__35520_36367 = G__36404;
count__35521_36368 = G__36405;
i__35522_36369 = G__36406;
continue;
} else {
var G__36409 = cljs.core.next(seq__35518_36389__$1);
var G__36410 = null;
var G__36411 = (0);
var G__36412 = (0);
seq__35518_36366 = G__36409;
chunk__35520_36367 = G__36410;
count__35521_36368 = G__36411;
i__35522_36369 = G__36412;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_36362);
}
}


var G__36413 = cljs.core.next(seq__35452_36344__$1);
var G__36414 = null;
var G__36415 = (0);
var G__36416 = (0);
seq__35452_36272 = G__36413;
chunk__35454_36273 = G__36414;
count__35455_36274 = G__36415;
i__35456_36275 = G__36416;
continue;
} else {
var G__36417 = cljs.core.next(seq__35452_36344__$1);
var G__36418 = null;
var G__36419 = (0);
var G__36420 = (0);
seq__35452_36272 = G__36417;
chunk__35454_36273 = G__36418;
count__35455_36274 = G__36419;
i__35456_36275 = G__36420;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___36423 = arguments.length;
var i__5770__auto___36424 = (0);
while(true){
if((i__5770__auto___36424 < len__5769__auto___36423)){
args__5775__auto__.push((arguments[i__5770__auto___36424]));

var G__36425 = (i__5770__auto___36424 + (1));
i__5770__auto___36424 = G__36425;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq35544){
var G__35545 = cljs.core.first(seq35544);
var seq35544__$1 = cljs.core.next(seq35544);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35545,seq35544__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__35565 = arguments.length;
switch (G__35565) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__14281__auto___36441 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_35571){
var state_val_35572 = (state_35571[(1)]);
if((state_val_35572 === (1))){
var state_35571__$1 = state_35571;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35571__$1,(2),once_or_cleanup);
} else {
if((state_val_35572 === (2))){
var inst_35568 = (state_35571[(2)]);
var inst_35569 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_35571__$1 = (function (){var statearr_35574 = state_35571;
(statearr_35574[(7)] = inst_35568);

return statearr_35574;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_35571__$1,inst_35569);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__13953__auto__ = null;
var shadow$dom$state_machine__13953__auto____0 = (function (){
var statearr_35575 = [null,null,null,null,null,null,null,null];
(statearr_35575[(0)] = shadow$dom$state_machine__13953__auto__);

(statearr_35575[(1)] = (1));

return statearr_35575;
});
var shadow$dom$state_machine__13953__auto____1 = (function (state_35571){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_35571);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e35576){var ex__13968__auto__ = e35576;
var statearr_35577_36450 = state_35571;
(statearr_35577_36450[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_35571[(4)]))){
var statearr_35578_36455 = state_35571;
(statearr_35578_36455[(1)] = cljs.core.first((state_35571[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36457 = state_35571;
state_35571 = G__36457;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
shadow$dom$state_machine__13953__auto__ = function(state_35571){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__13953__auto____0.call(this);
case 1:
return shadow$dom$state_machine__13953__auto____1.call(this,state_35571);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__13953__auto____0;
shadow$dom$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__13953__auto____1;
return shadow$dom$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_35580 = f__14282__auto__();
(statearr_35580[(6)] = c__14281__auto___36441);

return statearr_35580;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
