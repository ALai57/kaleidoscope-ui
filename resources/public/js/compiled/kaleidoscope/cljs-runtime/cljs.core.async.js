goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31152 = (function (f,blockable,meta31153){
this.f = f;
this.blockable = blockable;
this.meta31153 = meta31153;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_31154,meta31153__$1){
var self__ = this;
var _31154__$1 = this;
return (new cljs.core.async.t_cljs$core$async31152(self__.f,self__.blockable,meta31153__$1));
}));

(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_31154){
var self__ = this;
var _31154__$1 = this;
return self__.meta31153;
}));

(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async31152.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async31152.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta31153","meta31153",-1104454838,null)], null);
}));

(cljs.core.async.t_cljs$core$async31152.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async31152.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31152");

(cljs.core.async.t_cljs$core$async31152.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async31152");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async31152.
 */
cljs.core.async.__GT_t_cljs$core$async31152 = (function cljs$core$async$__GT_t_cljs$core$async31152(f,blockable,meta31153){
return (new cljs.core.async.t_cljs$core$async31152(f,blockable,meta31153));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__31150 = arguments.length;
switch (G__31150) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async31152(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__31157 = arguments.length;
switch (G__31157) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__31160 = arguments.length;
switch (G__31160) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__31162 = arguments.length;
switch (G__31162) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_34357 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_34357) : fn1.call(null,val_34357));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_34357) : fn1.call(null,val_34357));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__31164 = arguments.length;
switch (G__31164) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___34383 = n;
var x_34384 = (0);
while(true){
if((x_34384 < n__5636__auto___34383)){
(a[x_34384] = x_34384);

var G__34385 = (x_34384 + (1));
x_34384 = G__34385;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31165 = (function (flag,meta31166){
this.flag = flag;
this.meta31166 = meta31166;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_31167,meta31166__$1){
var self__ = this;
var _31167__$1 = this;
return (new cljs.core.async.t_cljs$core$async31165(self__.flag,meta31166__$1));
}));

(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_31167){
var self__ = this;
var _31167__$1 = this;
return self__.meta31166;
}));

(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async31165.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async31165.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta31166","meta31166",-532366758,null)], null);
}));

(cljs.core.async.t_cljs$core$async31165.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async31165.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31165");

(cljs.core.async.t_cljs$core$async31165.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async31165");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async31165.
 */
cljs.core.async.__GT_t_cljs$core$async31165 = (function cljs$core$async$__GT_t_cljs$core$async31165(flag,meta31166){
return (new cljs.core.async.t_cljs$core$async31165(flag,meta31166));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async31165(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async31168 = (function (flag,cb,meta31169){
this.flag = flag;
this.cb = cb;
this.meta31169 = meta31169;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_31170,meta31169__$1){
var self__ = this;
var _31170__$1 = this;
return (new cljs.core.async.t_cljs$core$async31168(self__.flag,self__.cb,meta31169__$1));
}));

(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_31170){
var self__ = this;
var _31170__$1 = this;
return self__.meta31169;
}));

(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async31168.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async31168.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta31169","meta31169",1591616330,null)], null);
}));

(cljs.core.async.t_cljs$core$async31168.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async31168.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async31168");

(cljs.core.async.t_cljs$core$async31168.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async31168");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async31168.
 */
cljs.core.async.__GT_t_cljs$core$async31168 = (function cljs$core$async$__GT_t_cljs$core$async31168(flag,cb,meta31169){
return (new cljs.core.async.t_cljs$core$async31168(flag,cb,meta31169));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async31168(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__31175_SHARP_){
var G__31177 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__31175_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__31177) : fret.call(null,G__31177));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__31176_SHARP_){
var G__31179 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__31176_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__31179) : fret.call(null,G__31179));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__34457 = (i + (1));
i = G__34457;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___34471 = arguments.length;
var i__5770__auto___34472 = (0);
while(true){
if((i__5770__auto___34472 < len__5769__auto___34471)){
args__5775__auto__.push((arguments[i__5770__auto___34472]));

var G__34473 = (i__5770__auto___34472 + (1));
i__5770__auto___34472 = G__34473;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__31184){
var map__31185 = p__31184;
var map__31185__$1 = cljs.core.__destructure_map(map__31185);
var opts = map__31185__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq31181){
var G__31182 = cljs.core.first(seq31181);
var seq31181__$1 = cljs.core.next(seq31181);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31182,seq31181__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__31189 = arguments.length;
switch (G__31189) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__14281__auto___34477 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31225){
var state_val_31226 = (state_31225[(1)]);
if((state_val_31226 === (7))){
var inst_31220 = (state_31225[(2)]);
var state_31225__$1 = state_31225;
var statearr_31229_34482 = state_31225__$1;
(statearr_31229_34482[(2)] = inst_31220);

(statearr_31229_34482[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (1))){
var state_31225__$1 = state_31225;
var statearr_31235_34483 = state_31225__$1;
(statearr_31235_34483[(2)] = null);

(statearr_31235_34483[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (4))){
var inst_31202 = (state_31225[(7)]);
var inst_31202__$1 = (state_31225[(2)]);
var inst_31203 = (inst_31202__$1 == null);
var state_31225__$1 = (function (){var statearr_31238 = state_31225;
(statearr_31238[(7)] = inst_31202__$1);

return statearr_31238;
})();
if(cljs.core.truth_(inst_31203)){
var statearr_31239_34484 = state_31225__$1;
(statearr_31239_34484[(1)] = (5));

} else {
var statearr_31240_34485 = state_31225__$1;
(statearr_31240_34485[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (13))){
var state_31225__$1 = state_31225;
var statearr_31242_34486 = state_31225__$1;
(statearr_31242_34486[(2)] = null);

(statearr_31242_34486[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (6))){
var inst_31202 = (state_31225[(7)]);
var state_31225__$1 = state_31225;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31225__$1,(11),to,inst_31202);
} else {
if((state_val_31226 === (3))){
var inst_31223 = (state_31225[(2)]);
var state_31225__$1 = state_31225;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31225__$1,inst_31223);
} else {
if((state_val_31226 === (12))){
var state_31225__$1 = state_31225;
var statearr_31247_34487 = state_31225__$1;
(statearr_31247_34487[(2)] = null);

(statearr_31247_34487[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (2))){
var state_31225__$1 = state_31225;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31225__$1,(4),from);
} else {
if((state_val_31226 === (11))){
var inst_31212 = (state_31225[(2)]);
var state_31225__$1 = state_31225;
if(cljs.core.truth_(inst_31212)){
var statearr_31248_34488 = state_31225__$1;
(statearr_31248_34488[(1)] = (12));

} else {
var statearr_31249_34489 = state_31225__$1;
(statearr_31249_34489[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (9))){
var state_31225__$1 = state_31225;
var statearr_31250_34490 = state_31225__$1;
(statearr_31250_34490[(2)] = null);

(statearr_31250_34490[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (5))){
var state_31225__$1 = state_31225;
if(cljs.core.truth_(close_QMARK_)){
var statearr_31251_34491 = state_31225__$1;
(statearr_31251_34491[(1)] = (8));

} else {
var statearr_31252_34492 = state_31225__$1;
(statearr_31252_34492[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (14))){
var inst_31217 = (state_31225[(2)]);
var state_31225__$1 = state_31225;
var statearr_31253_34496 = state_31225__$1;
(statearr_31253_34496[(2)] = inst_31217);

(statearr_31253_34496[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (10))){
var inst_31209 = (state_31225[(2)]);
var state_31225__$1 = state_31225;
var statearr_31254_34497 = state_31225__$1;
(statearr_31254_34497[(2)] = inst_31209);

(statearr_31254_34497[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31226 === (8))){
var inst_31206 = cljs.core.async.close_BANG_(to);
var state_31225__$1 = state_31225;
var statearr_31255_34498 = state_31225__$1;
(statearr_31255_34498[(2)] = inst_31206);

(statearr_31255_34498[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_31256 = [null,null,null,null,null,null,null,null];
(statearr_31256[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_31256[(1)] = (1));

return statearr_31256;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_31225){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31225);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31257){var ex__13968__auto__ = e31257;
var statearr_31258_34502 = state_31225;
(statearr_31258_34502[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31225[(4)]))){
var statearr_31259_34503 = state_31225;
(statearr_31259_34503[(1)] = cljs.core.first((state_31225[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34504 = state_31225;
state_31225 = G__34504;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_31225){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_31225);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31261 = f__14282__auto__();
(statearr_31261[(6)] = c__14281__auto___34477);

return statearr_31261;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__31264){
var vec__31265 = p__31264;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31265,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31265,(1),null);
var job = vec__31265;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__14281__auto___34508 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31272){
var state_val_31273 = (state_31272[(1)]);
if((state_val_31273 === (1))){
var state_31272__$1 = state_31272;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31272__$1,(2),res,v);
} else {
if((state_val_31273 === (2))){
var inst_31269 = (state_31272[(2)]);
var inst_31270 = cljs.core.async.close_BANG_(res);
var state_31272__$1 = (function (){var statearr_31277 = state_31272;
(statearr_31277[(7)] = inst_31269);

return statearr_31277;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_31272__$1,inst_31270);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_31279 = [null,null,null,null,null,null,null,null];
(statearr_31279[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_31279[(1)] = (1));

return statearr_31279;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_31272){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31272);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31280){var ex__13968__auto__ = e31280;
var statearr_31281_34516 = state_31272;
(statearr_31281_34516[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31272[(4)]))){
var statearr_31282_34517 = state_31272;
(statearr_31282_34517[(1)] = cljs.core.first((state_31272[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34518 = state_31272;
state_31272 = G__34518;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_31272){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_31272);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31285 = f__14282__auto__();
(statearr_31285[(6)] = c__14281__auto___34508);

return statearr_31285;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__31286){
var vec__31288 = p__31286;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31288,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31288,(1),null);
var job = vec__31288;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___34525 = n;
var __34526 = (0);
while(true){
if((__34526 < n__5636__auto___34525)){
var G__31291_34527 = type;
var G__31291_34528__$1 = (((G__31291_34527 instanceof cljs.core.Keyword))?G__31291_34527.fqn:null);
switch (G__31291_34528__$1) {
case "compute":
var c__14281__auto___34534 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__34526,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = ((function (__34526,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function (state_31304){
var state_val_31305 = (state_31304[(1)]);
if((state_val_31305 === (1))){
var state_31304__$1 = state_31304;
var statearr_31306_34542 = state_31304__$1;
(statearr_31306_34542[(2)] = null);

(statearr_31306_34542[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31305 === (2))){
var state_31304__$1 = state_31304;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31304__$1,(4),jobs);
} else {
if((state_val_31305 === (3))){
var inst_31302 = (state_31304[(2)]);
var state_31304__$1 = state_31304;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31304__$1,inst_31302);
} else {
if((state_val_31305 === (4))){
var inst_31294 = (state_31304[(2)]);
var inst_31295 = process__$1(inst_31294);
var state_31304__$1 = state_31304;
if(cljs.core.truth_(inst_31295)){
var statearr_31308_34549 = state_31304__$1;
(statearr_31308_34549[(1)] = (5));

} else {
var statearr_31309_34550 = state_31304__$1;
(statearr_31309_34550[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31305 === (5))){
var state_31304__$1 = state_31304;
var statearr_31310_34551 = state_31304__$1;
(statearr_31310_34551[(2)] = null);

(statearr_31310_34551[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31305 === (6))){
var state_31304__$1 = state_31304;
var statearr_31311_34552 = state_31304__$1;
(statearr_31311_34552[(2)] = null);

(statearr_31311_34552[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31305 === (7))){
var inst_31300 = (state_31304[(2)]);
var state_31304__$1 = state_31304;
var statearr_31314_34553 = state_31304__$1;
(statearr_31314_34553[(2)] = inst_31300);

(statearr_31314_34553[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__34526,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
;
return ((function (__34526,switch__13952__auto__,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_31315 = [null,null,null,null,null,null,null];
(statearr_31315[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_31315[(1)] = (1));

return statearr_31315;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_31304){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31304);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31317){var ex__13968__auto__ = e31317;
var statearr_31318_34555 = state_31304;
(statearr_31318_34555[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31304[(4)]))){
var statearr_31319_34561 = state_31304;
(statearr_31319_34561[(1)] = cljs.core.first((state_31304[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34563 = state_31304;
state_31304 = G__34563;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_31304){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_31304);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
;})(__34526,switch__13952__auto__,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
})();
var state__14283__auto__ = (function (){var statearr_31320 = f__14282__auto__();
(statearr_31320[(6)] = c__14281__auto___34534);

return statearr_31320;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
});})(__34526,c__14281__auto___34534,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
);


break;
case "async":
var c__14281__auto___34567 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__34526,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = ((function (__34526,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function (state_31333){
var state_val_31334 = (state_31333[(1)]);
if((state_val_31334 === (1))){
var state_31333__$1 = state_31333;
var statearr_31338_34568 = state_31333__$1;
(statearr_31338_34568[(2)] = null);

(statearr_31338_34568[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31334 === (2))){
var state_31333__$1 = state_31333;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31333__$1,(4),jobs);
} else {
if((state_val_31334 === (3))){
var inst_31331 = (state_31333[(2)]);
var state_31333__$1 = state_31333;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31333__$1,inst_31331);
} else {
if((state_val_31334 === (4))){
var inst_31323 = (state_31333[(2)]);
var inst_31324 = async(inst_31323);
var state_31333__$1 = state_31333;
if(cljs.core.truth_(inst_31324)){
var statearr_31341_34573 = state_31333__$1;
(statearr_31341_34573[(1)] = (5));

} else {
var statearr_31342_34574 = state_31333__$1;
(statearr_31342_34574[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31334 === (5))){
var state_31333__$1 = state_31333;
var statearr_31343_34575 = state_31333__$1;
(statearr_31343_34575[(2)] = null);

(statearr_31343_34575[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31334 === (6))){
var state_31333__$1 = state_31333;
var statearr_31344_34576 = state_31333__$1;
(statearr_31344_34576[(2)] = null);

(statearr_31344_34576[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31334 === (7))){
var inst_31329 = (state_31333[(2)]);
var state_31333__$1 = state_31333;
var statearr_31345_34583 = state_31333__$1;
(statearr_31345_34583[(2)] = inst_31329);

(statearr_31345_34583[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__34526,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
;
return ((function (__34526,switch__13952__auto__,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_31346 = [null,null,null,null,null,null,null];
(statearr_31346[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_31346[(1)] = (1));

return statearr_31346;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_31333){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31333);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31347){var ex__13968__auto__ = e31347;
var statearr_31348_34584 = state_31333;
(statearr_31348_34584[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31333[(4)]))){
var statearr_31349_34585 = state_31333;
(statearr_31349_34585[(1)] = cljs.core.first((state_31333[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34586 = state_31333;
state_31333 = G__34586;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_31333){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_31333);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
;})(__34526,switch__13952__auto__,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
})();
var state__14283__auto__ = (function (){var statearr_31351 = f__14282__auto__();
(statearr_31351[(6)] = c__14281__auto___34567);

return statearr_31351;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
});})(__34526,c__14281__auto___34567,G__31291_34527,G__31291_34528__$1,n__5636__auto___34525,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__31291_34528__$1)].join('')));

}

var G__34587 = (__34526 + (1));
__34526 = G__34587;
continue;
} else {
}
break;
}

var c__14281__auto___34588 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31419){
var state_val_31420 = (state_31419[(1)]);
if((state_val_31420 === (7))){
var inst_31406 = (state_31419[(2)]);
var state_31419__$1 = state_31419;
var statearr_31423_34590 = state_31419__$1;
(statearr_31423_34590[(2)] = inst_31406);

(statearr_31423_34590[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31420 === (1))){
var state_31419__$1 = state_31419;
var statearr_31427_34592 = state_31419__$1;
(statearr_31427_34592[(2)] = null);

(statearr_31427_34592[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31420 === (4))){
var inst_31385 = (state_31419[(7)]);
var inst_31385__$1 = (state_31419[(2)]);
var inst_31386 = (inst_31385__$1 == null);
var state_31419__$1 = (function (){var statearr_31433 = state_31419;
(statearr_31433[(7)] = inst_31385__$1);

return statearr_31433;
})();
if(cljs.core.truth_(inst_31386)){
var statearr_31434_34594 = state_31419__$1;
(statearr_31434_34594[(1)] = (5));

} else {
var statearr_31437_34595 = state_31419__$1;
(statearr_31437_34595[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31420 === (6))){
var inst_31394 = (state_31419[(8)]);
var inst_31385 = (state_31419[(7)]);
var inst_31394__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_31395 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_31396 = [inst_31385,inst_31394__$1];
var inst_31397 = (new cljs.core.PersistentVector(null,2,(5),inst_31395,inst_31396,null));
var state_31419__$1 = (function (){var statearr_31443 = state_31419;
(statearr_31443[(8)] = inst_31394__$1);

return statearr_31443;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31419__$1,(8),jobs,inst_31397);
} else {
if((state_val_31420 === (3))){
var inst_31408 = (state_31419[(2)]);
var state_31419__$1 = state_31419;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31419__$1,inst_31408);
} else {
if((state_val_31420 === (2))){
var state_31419__$1 = state_31419;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31419__$1,(4),from);
} else {
if((state_val_31420 === (9))){
var inst_31401 = (state_31419[(2)]);
var state_31419__$1 = (function (){var statearr_31453 = state_31419;
(statearr_31453[(9)] = inst_31401);

return statearr_31453;
})();
var statearr_31455_34599 = state_31419__$1;
(statearr_31455_34599[(2)] = null);

(statearr_31455_34599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31420 === (5))){
var inst_31389 = cljs.core.async.close_BANG_(jobs);
var state_31419__$1 = state_31419;
var statearr_31459_34600 = state_31419__$1;
(statearr_31459_34600[(2)] = inst_31389);

(statearr_31459_34600[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31420 === (8))){
var inst_31394 = (state_31419[(8)]);
var inst_31399 = (state_31419[(2)]);
var state_31419__$1 = (function (){var statearr_31462 = state_31419;
(statearr_31462[(10)] = inst_31399);

return statearr_31462;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31419__$1,(9),results,inst_31394);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_31469 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_31469[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_31469[(1)] = (1));

return statearr_31469;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_31419){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31419);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31478){var ex__13968__auto__ = e31478;
var statearr_31479_34603 = state_31419;
(statearr_31479_34603[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31419[(4)]))){
var statearr_31482_34604 = state_31419;
(statearr_31482_34604[(1)] = cljs.core.first((state_31419[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34605 = state_31419;
state_31419 = G__34605;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_31419){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_31419);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31485 = f__14282__auto__();
(statearr_31485[(6)] = c__14281__auto___34588);

return statearr_31485;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31531){
var state_val_31532 = (state_31531[(1)]);
if((state_val_31532 === (7))){
var inst_31526 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
var statearr_31536_34608 = state_31531__$1;
(statearr_31536_34608[(2)] = inst_31526);

(statearr_31536_34608[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (20))){
var state_31531__$1 = state_31531;
var statearr_31547_34609 = state_31531__$1;
(statearr_31547_34609[(2)] = null);

(statearr_31547_34609[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (1))){
var state_31531__$1 = state_31531;
var statearr_31565_34611 = state_31531__$1;
(statearr_31565_34611[(2)] = null);

(statearr_31565_34611[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (4))){
var inst_31490 = (state_31531[(7)]);
var inst_31490__$1 = (state_31531[(2)]);
var inst_31491 = (inst_31490__$1 == null);
var state_31531__$1 = (function (){var statearr_31588 = state_31531;
(statearr_31588[(7)] = inst_31490__$1);

return statearr_31588;
})();
if(cljs.core.truth_(inst_31491)){
var statearr_31593_34613 = state_31531__$1;
(statearr_31593_34613[(1)] = (5));

} else {
var statearr_31595_34614 = state_31531__$1;
(statearr_31595_34614[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (15))){
var inst_31504 = (state_31531[(8)]);
var state_31531__$1 = state_31531;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31531__$1,(18),to,inst_31504);
} else {
if((state_val_31532 === (21))){
var inst_31521 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
var statearr_31602_34620 = state_31531__$1;
(statearr_31602_34620[(2)] = inst_31521);

(statearr_31602_34620[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (13))){
var inst_31523 = (state_31531[(2)]);
var state_31531__$1 = (function (){var statearr_31621 = state_31531;
(statearr_31621[(9)] = inst_31523);

return statearr_31621;
})();
var statearr_31623_34623 = state_31531__$1;
(statearr_31623_34623[(2)] = null);

(statearr_31623_34623[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (6))){
var inst_31490 = (state_31531[(7)]);
var state_31531__$1 = state_31531;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31531__$1,(11),inst_31490);
} else {
if((state_val_31532 === (17))){
var inst_31515 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
if(cljs.core.truth_(inst_31515)){
var statearr_31659_34624 = state_31531__$1;
(statearr_31659_34624[(1)] = (19));

} else {
var statearr_31661_34626 = state_31531__$1;
(statearr_31661_34626[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (3))){
var inst_31528 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31531__$1,inst_31528);
} else {
if((state_val_31532 === (12))){
var inst_31500 = (state_31531[(10)]);
var state_31531__$1 = state_31531;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31531__$1,(14),inst_31500);
} else {
if((state_val_31532 === (2))){
var state_31531__$1 = state_31531;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31531__$1,(4),results);
} else {
if((state_val_31532 === (19))){
var state_31531__$1 = state_31531;
var statearr_31671_34630 = state_31531__$1;
(statearr_31671_34630[(2)] = null);

(statearr_31671_34630[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (11))){
var inst_31500 = (state_31531[(2)]);
var state_31531__$1 = (function (){var statearr_31672 = state_31531;
(statearr_31672[(10)] = inst_31500);

return statearr_31672;
})();
var statearr_31673_34636 = state_31531__$1;
(statearr_31673_34636[(2)] = null);

(statearr_31673_34636[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (9))){
var state_31531__$1 = state_31531;
var statearr_31724_34638 = state_31531__$1;
(statearr_31724_34638[(2)] = null);

(statearr_31724_34638[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (5))){
var state_31531__$1 = state_31531;
if(cljs.core.truth_(close_QMARK_)){
var statearr_31725_34639 = state_31531__$1;
(statearr_31725_34639[(1)] = (8));

} else {
var statearr_31726_34640 = state_31531__$1;
(statearr_31726_34640[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (14))){
var inst_31507 = (state_31531[(11)]);
var inst_31504 = (state_31531[(8)]);
var inst_31504__$1 = (state_31531[(2)]);
var inst_31506 = (inst_31504__$1 == null);
var inst_31507__$1 = cljs.core.not(inst_31506);
var state_31531__$1 = (function (){var statearr_31729 = state_31531;
(statearr_31729[(11)] = inst_31507__$1);

(statearr_31729[(8)] = inst_31504__$1);

return statearr_31729;
})();
if(inst_31507__$1){
var statearr_31731_34647 = state_31531__$1;
(statearr_31731_34647[(1)] = (15));

} else {
var statearr_31733_34648 = state_31531__$1;
(statearr_31733_34648[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (16))){
var inst_31507 = (state_31531[(11)]);
var state_31531__$1 = state_31531;
var statearr_31850_34649 = state_31531__$1;
(statearr_31850_34649[(2)] = inst_31507);

(statearr_31850_34649[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (10))){
var inst_31497 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
var statearr_31851_34652 = state_31531__$1;
(statearr_31851_34652[(2)] = inst_31497);

(statearr_31851_34652[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (18))){
var inst_31511 = (state_31531[(2)]);
var state_31531__$1 = state_31531;
var statearr_31852_34654 = state_31531__$1;
(statearr_31852_34654[(2)] = inst_31511);

(statearr_31852_34654[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31532 === (8))){
var inst_31494 = cljs.core.async.close_BANG_(to);
var state_31531__$1 = state_31531;
var statearr_31854_34661 = state_31531__$1;
(statearr_31854_34661[(2)] = inst_31494);

(statearr_31854_34661[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_31858 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31858[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_31858[(1)] = (1));

return statearr_31858;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_31531){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31531);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31861){var ex__13968__auto__ = e31861;
var statearr_31862_34665 = state_31531;
(statearr_31862_34665[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31531[(4)]))){
var statearr_31863_34669 = state_31531;
(statearr_31863_34669[(1)] = cljs.core.first((state_31531[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34670 = state_31531;
state_31531 = G__34670;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_31531){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_31531);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31865 = f__14282__auto__();
(statearr_31865[(6)] = c__14281__auto__);

return statearr_31865;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__31869 = arguments.length;
switch (G__31869) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__31879 = arguments.length;
switch (G__31879) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__31887 = arguments.length;
switch (G__31887) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__14281__auto___34703 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31914){
var state_val_31915 = (state_31914[(1)]);
if((state_val_31915 === (7))){
var inst_31909 = (state_31914[(2)]);
var state_31914__$1 = state_31914;
var statearr_31916_34704 = state_31914__$1;
(statearr_31916_34704[(2)] = inst_31909);

(statearr_31916_34704[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (1))){
var state_31914__$1 = state_31914;
var statearr_31917_34708 = state_31914__$1;
(statearr_31917_34708[(2)] = null);

(statearr_31917_34708[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (4))){
var inst_31890 = (state_31914[(7)]);
var inst_31890__$1 = (state_31914[(2)]);
var inst_31891 = (inst_31890__$1 == null);
var state_31914__$1 = (function (){var statearr_31918 = state_31914;
(statearr_31918[(7)] = inst_31890__$1);

return statearr_31918;
})();
if(cljs.core.truth_(inst_31891)){
var statearr_31919_34711 = state_31914__$1;
(statearr_31919_34711[(1)] = (5));

} else {
var statearr_31920_34713 = state_31914__$1;
(statearr_31920_34713[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (13))){
var state_31914__$1 = state_31914;
var statearr_31921_34718 = state_31914__$1;
(statearr_31921_34718[(2)] = null);

(statearr_31921_34718[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (6))){
var inst_31890 = (state_31914[(7)]);
var inst_31896 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_31890) : p.call(null,inst_31890));
var state_31914__$1 = state_31914;
if(cljs.core.truth_(inst_31896)){
var statearr_31922_34719 = state_31914__$1;
(statearr_31922_34719[(1)] = (9));

} else {
var statearr_31924_34721 = state_31914__$1;
(statearr_31924_34721[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (3))){
var inst_31912 = (state_31914[(2)]);
var state_31914__$1 = state_31914;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31914__$1,inst_31912);
} else {
if((state_val_31915 === (12))){
var state_31914__$1 = state_31914;
var statearr_31925_34724 = state_31914__$1;
(statearr_31925_34724[(2)] = null);

(statearr_31925_34724[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (2))){
var state_31914__$1 = state_31914;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31914__$1,(4),ch);
} else {
if((state_val_31915 === (11))){
var inst_31890 = (state_31914[(7)]);
var inst_31900 = (state_31914[(2)]);
var state_31914__$1 = state_31914;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_31914__$1,(8),inst_31900,inst_31890);
} else {
if((state_val_31915 === (9))){
var state_31914__$1 = state_31914;
var statearr_31927_34731 = state_31914__$1;
(statearr_31927_34731[(2)] = tc);

(statearr_31927_34731[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (5))){
var inst_31893 = cljs.core.async.close_BANG_(tc);
var inst_31894 = cljs.core.async.close_BANG_(fc);
var state_31914__$1 = (function (){var statearr_31928 = state_31914;
(statearr_31928[(8)] = inst_31893);

return statearr_31928;
})();
var statearr_31929_34732 = state_31914__$1;
(statearr_31929_34732[(2)] = inst_31894);

(statearr_31929_34732[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (14))){
var inst_31907 = (state_31914[(2)]);
var state_31914__$1 = state_31914;
var statearr_31930_34738 = state_31914__$1;
(statearr_31930_34738[(2)] = inst_31907);

(statearr_31930_34738[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (10))){
var state_31914__$1 = state_31914;
var statearr_31931_34746 = state_31914__$1;
(statearr_31931_34746[(2)] = fc);

(statearr_31931_34746[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31915 === (8))){
var inst_31902 = (state_31914[(2)]);
var state_31914__$1 = state_31914;
if(cljs.core.truth_(inst_31902)){
var statearr_31932_34748 = state_31914__$1;
(statearr_31932_34748[(1)] = (12));

} else {
var statearr_31933_34749 = state_31914__$1;
(statearr_31933_34749[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_31934 = [null,null,null,null,null,null,null,null,null];
(statearr_31934[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_31934[(1)] = (1));

return statearr_31934;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_31914){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31914);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31935){var ex__13968__auto__ = e31935;
var statearr_31936_34753 = state_31914;
(statearr_31936_34753[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31914[(4)]))){
var statearr_31937_34754 = state_31914;
(statearr_31937_34754[(1)] = cljs.core.first((state_31914[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34755 = state_31914;
state_31914 = G__34755;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_31914){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_31914);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31939 = f__14282__auto__();
(statearr_31939[(6)] = c__14281__auto___34703);

return statearr_31939;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31961){
var state_val_31962 = (state_31961[(1)]);
if((state_val_31962 === (7))){
var inst_31957 = (state_31961[(2)]);
var state_31961__$1 = state_31961;
var statearr_31964_34768 = state_31961__$1;
(statearr_31964_34768[(2)] = inst_31957);

(statearr_31964_34768[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (1))){
var inst_31940 = init;
var inst_31941 = inst_31940;
var state_31961__$1 = (function (){var statearr_31965 = state_31961;
(statearr_31965[(7)] = inst_31941);

return statearr_31965;
})();
var statearr_31966_34775 = state_31961__$1;
(statearr_31966_34775[(2)] = null);

(statearr_31966_34775[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (4))){
var inst_31944 = (state_31961[(8)]);
var inst_31944__$1 = (state_31961[(2)]);
var inst_31945 = (inst_31944__$1 == null);
var state_31961__$1 = (function (){var statearr_31967 = state_31961;
(statearr_31967[(8)] = inst_31944__$1);

return statearr_31967;
})();
if(cljs.core.truth_(inst_31945)){
var statearr_31968_34794 = state_31961__$1;
(statearr_31968_34794[(1)] = (5));

} else {
var statearr_31969_34800 = state_31961__$1;
(statearr_31969_34800[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (6))){
var inst_31944 = (state_31961[(8)]);
var inst_31948 = (state_31961[(9)]);
var inst_31941 = (state_31961[(7)]);
var inst_31948__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_31941,inst_31944) : f.call(null,inst_31941,inst_31944));
var inst_31949 = cljs.core.reduced_QMARK_(inst_31948__$1);
var state_31961__$1 = (function (){var statearr_31970 = state_31961;
(statearr_31970[(9)] = inst_31948__$1);

return statearr_31970;
})();
if(inst_31949){
var statearr_31971_34808 = state_31961__$1;
(statearr_31971_34808[(1)] = (8));

} else {
var statearr_31972_34809 = state_31961__$1;
(statearr_31972_34809[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (3))){
var inst_31959 = (state_31961[(2)]);
var state_31961__$1 = state_31961;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31961__$1,inst_31959);
} else {
if((state_val_31962 === (2))){
var state_31961__$1 = state_31961;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31961__$1,(4),ch);
} else {
if((state_val_31962 === (9))){
var inst_31948 = (state_31961[(9)]);
var inst_31941 = inst_31948;
var state_31961__$1 = (function (){var statearr_31973 = state_31961;
(statearr_31973[(7)] = inst_31941);

return statearr_31973;
})();
var statearr_31974_34818 = state_31961__$1;
(statearr_31974_34818[(2)] = null);

(statearr_31974_34818[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (5))){
var inst_31941 = (state_31961[(7)]);
var state_31961__$1 = state_31961;
var statearr_31975_34822 = state_31961__$1;
(statearr_31975_34822[(2)] = inst_31941);

(statearr_31975_34822[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (10))){
var inst_31955 = (state_31961[(2)]);
var state_31961__$1 = state_31961;
var statearr_31976_34823 = state_31961__$1;
(statearr_31976_34823[(2)] = inst_31955);

(statearr_31976_34823[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31962 === (8))){
var inst_31948 = (state_31961[(9)]);
var inst_31951 = cljs.core.deref(inst_31948);
var state_31961__$1 = state_31961;
var statearr_31977_34825 = state_31961__$1;
(statearr_31977_34825[(2)] = inst_31951);

(statearr_31977_34825[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__13953__auto__ = null;
var cljs$core$async$reduce_$_state_machine__13953__auto____0 = (function (){
var statearr_31978 = [null,null,null,null,null,null,null,null,null,null];
(statearr_31978[(0)] = cljs$core$async$reduce_$_state_machine__13953__auto__);

(statearr_31978[(1)] = (1));

return statearr_31978;
});
var cljs$core$async$reduce_$_state_machine__13953__auto____1 = (function (state_31961){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31961);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31979){var ex__13968__auto__ = e31979;
var statearr_31980_34843 = state_31961;
(statearr_31980_34843[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31961[(4)]))){
var statearr_31981_34844 = state_31961;
(statearr_31981_34844[(1)] = cljs.core.first((state_31961[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34845 = state_31961;
state_31961 = G__34845;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__13953__auto__ = function(state_31961){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__13953__auto____1.call(this,state_31961);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__13953__auto____0;
cljs$core$async$reduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__13953__auto____1;
return cljs$core$async$reduce_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_31983 = f__14282__auto__();
(statearr_31983[(6)] = c__14281__auto__);

return statearr_31983;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_31991){
var state_val_31992 = (state_31991[(1)]);
if((state_val_31992 === (1))){
var inst_31986 = cljs.core.async.reduce(f__$1,init,ch);
var state_31991__$1 = state_31991;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_31991__$1,(2),inst_31986);
} else {
if((state_val_31992 === (2))){
var inst_31988 = (state_31991[(2)]);
var inst_31989 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_31988) : f__$1.call(null,inst_31988));
var state_31991__$1 = state_31991;
return cljs.core.async.impl.ioc_helpers.return_chan(state_31991__$1,inst_31989);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__13953__auto__ = null;
var cljs$core$async$transduce_$_state_machine__13953__auto____0 = (function (){
var statearr_31996 = [null,null,null,null,null,null,null];
(statearr_31996[(0)] = cljs$core$async$transduce_$_state_machine__13953__auto__);

(statearr_31996[(1)] = (1));

return statearr_31996;
});
var cljs$core$async$transduce_$_state_machine__13953__auto____1 = (function (state_31991){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_31991);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e31997){var ex__13968__auto__ = e31997;
var statearr_31998_34853 = state_31991;
(statearr_31998_34853[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_31991[(4)]))){
var statearr_31999_34854 = state_31991;
(statearr_31999_34854[(1)] = cljs.core.first((state_31991[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34855 = state_31991;
state_31991 = G__34855;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__13953__auto__ = function(state_31991){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__13953__auto____1.call(this,state_31991);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__13953__auto____0;
cljs$core$async$transduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__13953__auto____1;
return cljs$core$async$transduce_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_32003 = f__14282__auto__();
(statearr_32003[(6)] = c__14281__auto__);

return statearr_32003;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__32005 = arguments.length;
switch (G__32005) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_32034){
var state_val_32035 = (state_32034[(1)]);
if((state_val_32035 === (7))){
var inst_32012 = (state_32034[(2)]);
var state_32034__$1 = state_32034;
var statearr_32037_34866 = state_32034__$1;
(statearr_32037_34866[(2)] = inst_32012);

(statearr_32037_34866[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (1))){
var inst_32006 = cljs.core.seq(coll);
var inst_32007 = inst_32006;
var state_32034__$1 = (function (){var statearr_32038 = state_32034;
(statearr_32038[(7)] = inst_32007);

return statearr_32038;
})();
var statearr_32039_34877 = state_32034__$1;
(statearr_32039_34877[(2)] = null);

(statearr_32039_34877[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (4))){
var inst_32007 = (state_32034[(7)]);
var inst_32010 = cljs.core.first(inst_32007);
var state_32034__$1 = state_32034;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_32034__$1,(7),ch,inst_32010);
} else {
if((state_val_32035 === (13))){
var inst_32024 = (state_32034[(2)]);
var state_32034__$1 = state_32034;
var statearr_32040_34879 = state_32034__$1;
(statearr_32040_34879[(2)] = inst_32024);

(statearr_32040_34879[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (6))){
var inst_32015 = (state_32034[(2)]);
var state_32034__$1 = state_32034;
if(cljs.core.truth_(inst_32015)){
var statearr_32041_34880 = state_32034__$1;
(statearr_32041_34880[(1)] = (8));

} else {
var statearr_32042_34881 = state_32034__$1;
(statearr_32042_34881[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (3))){
var inst_32028 = (state_32034[(2)]);
var state_32034__$1 = state_32034;
return cljs.core.async.impl.ioc_helpers.return_chan(state_32034__$1,inst_32028);
} else {
if((state_val_32035 === (12))){
var state_32034__$1 = state_32034;
var statearr_32043_34882 = state_32034__$1;
(statearr_32043_34882[(2)] = null);

(statearr_32043_34882[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (2))){
var inst_32007 = (state_32034[(7)]);
var state_32034__$1 = state_32034;
if(cljs.core.truth_(inst_32007)){
var statearr_32044_34885 = state_32034__$1;
(statearr_32044_34885[(1)] = (4));

} else {
var statearr_32045_34886 = state_32034__$1;
(statearr_32045_34886[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (11))){
var inst_32021 = cljs.core.async.close_BANG_(ch);
var state_32034__$1 = state_32034;
var statearr_32046_34888 = state_32034__$1;
(statearr_32046_34888[(2)] = inst_32021);

(statearr_32046_34888[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (9))){
var state_32034__$1 = state_32034;
if(cljs.core.truth_(close_QMARK_)){
var statearr_32047_34891 = state_32034__$1;
(statearr_32047_34891[(1)] = (11));

} else {
var statearr_32048_34892 = state_32034__$1;
(statearr_32048_34892[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (5))){
var inst_32007 = (state_32034[(7)]);
var state_32034__$1 = state_32034;
var statearr_32050_34896 = state_32034__$1;
(statearr_32050_34896[(2)] = inst_32007);

(statearr_32050_34896[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (10))){
var inst_32026 = (state_32034[(2)]);
var state_32034__$1 = state_32034;
var statearr_32051_34900 = state_32034__$1;
(statearr_32051_34900[(2)] = inst_32026);

(statearr_32051_34900[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32035 === (8))){
var inst_32007 = (state_32034[(7)]);
var inst_32017 = cljs.core.next(inst_32007);
var inst_32007__$1 = inst_32017;
var state_32034__$1 = (function (){var statearr_32052 = state_32034;
(statearr_32052[(7)] = inst_32007__$1);

return statearr_32052;
})();
var statearr_32053_34901 = state_32034__$1;
(statearr_32053_34901[(2)] = null);

(statearr_32053_34901[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_32054 = [null,null,null,null,null,null,null,null];
(statearr_32054[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_32054[(1)] = (1));

return statearr_32054;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_32034){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_32034);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e32073){var ex__13968__auto__ = e32073;
var statearr_32074_34905 = state_32034;
(statearr_32074_34905[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_32034[(4)]))){
var statearr_32079_34906 = state_32034;
(statearr_32079_34906[(1)] = cljs.core.first((state_32034[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34908 = state_32034;
state_32034 = G__34908;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_32034){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_32034);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_32081 = f__14282__auto__();
(statearr_32081[(6)] = c__14281__auto__);

return statearr_32081;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__32084 = arguments.length;
switch (G__32084) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_34912 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_34912(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_34913 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_34913(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_34914 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_34914(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_34916 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_34916(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32094 = (function (ch,cs,meta32095){
this.ch = ch;
this.cs = cs;
this.meta32095 = meta32095;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_32096,meta32095__$1){
var self__ = this;
var _32096__$1 = this;
return (new cljs.core.async.t_cljs$core$async32094(self__.ch,self__.cs,meta32095__$1));
}));

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_32096){
var self__ = this;
var _32096__$1 = this;
return self__.meta32095;
}));

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async32094.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async32094.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta32095","meta32095",-757880879,null)], null);
}));

(cljs.core.async.t_cljs$core$async32094.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async32094.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32094");

(cljs.core.async.t_cljs$core$async32094.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async32094");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async32094.
 */
cljs.core.async.__GT_t_cljs$core$async32094 = (function cljs$core$async$__GT_t_cljs$core$async32094(ch,cs,meta32095){
return (new cljs.core.async.t_cljs$core$async32094(ch,cs,meta32095));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async32094(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__14281__auto___34925 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_32239){
var state_val_32240 = (state_32239[(1)]);
if((state_val_32240 === (7))){
var inst_32233 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32244_34933 = state_32239__$1;
(statearr_32244_34933[(2)] = inst_32233);

(statearr_32244_34933[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (20))){
var inst_32134 = (state_32239[(7)]);
var inst_32146 = cljs.core.first(inst_32134);
var inst_32147 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32146,(0),null);
var inst_32148 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32146,(1),null);
var state_32239__$1 = (function (){var statearr_32249 = state_32239;
(statearr_32249[(8)] = inst_32147);

return statearr_32249;
})();
if(cljs.core.truth_(inst_32148)){
var statearr_32250_34941 = state_32239__$1;
(statearr_32250_34941[(1)] = (22));

} else {
var statearr_32252_34942 = state_32239__$1;
(statearr_32252_34942[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (27))){
var inst_32176 = (state_32239[(9)]);
var inst_32178 = (state_32239[(10)]);
var inst_32100 = (state_32239[(11)]);
var inst_32183 = (state_32239[(12)]);
var inst_32183__$1 = cljs.core._nth(inst_32176,inst_32178);
var inst_32185 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_32183__$1,inst_32100,done);
var state_32239__$1 = (function (){var statearr_32253 = state_32239;
(statearr_32253[(12)] = inst_32183__$1);

return statearr_32253;
})();
if(cljs.core.truth_(inst_32185)){
var statearr_32254_34946 = state_32239__$1;
(statearr_32254_34946[(1)] = (30));

} else {
var statearr_32255_34950 = state_32239__$1;
(statearr_32255_34950[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (1))){
var state_32239__$1 = state_32239;
var statearr_32256_34951 = state_32239__$1;
(statearr_32256_34951[(2)] = null);

(statearr_32256_34951[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (24))){
var inst_32134 = (state_32239[(7)]);
var inst_32153 = (state_32239[(2)]);
var inst_32154 = cljs.core.next(inst_32134);
var inst_32109 = inst_32154;
var inst_32110 = null;
var inst_32111 = (0);
var inst_32112 = (0);
var state_32239__$1 = (function (){var statearr_32260 = state_32239;
(statearr_32260[(13)] = inst_32153);

(statearr_32260[(14)] = inst_32109);

(statearr_32260[(15)] = inst_32111);

(statearr_32260[(16)] = inst_32112);

(statearr_32260[(17)] = inst_32110);

return statearr_32260;
})();
var statearr_32261_34964 = state_32239__$1;
(statearr_32261_34964[(2)] = null);

(statearr_32261_34964[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (39))){
var state_32239__$1 = state_32239;
var statearr_32269_34965 = state_32239__$1;
(statearr_32269_34965[(2)] = null);

(statearr_32269_34965[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (4))){
var inst_32100 = (state_32239[(11)]);
var inst_32100__$1 = (state_32239[(2)]);
var inst_32101 = (inst_32100__$1 == null);
var state_32239__$1 = (function (){var statearr_32270 = state_32239;
(statearr_32270[(11)] = inst_32100__$1);

return statearr_32270;
})();
if(cljs.core.truth_(inst_32101)){
var statearr_32271_34969 = state_32239__$1;
(statearr_32271_34969[(1)] = (5));

} else {
var statearr_32272_34971 = state_32239__$1;
(statearr_32272_34971[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (15))){
var inst_32109 = (state_32239[(14)]);
var inst_32111 = (state_32239[(15)]);
var inst_32112 = (state_32239[(16)]);
var inst_32110 = (state_32239[(17)]);
var inst_32130 = (state_32239[(2)]);
var inst_32131 = (inst_32112 + (1));
var tmp32263 = inst_32109;
var tmp32264 = inst_32111;
var tmp32265 = inst_32110;
var inst_32109__$1 = tmp32263;
var inst_32110__$1 = tmp32265;
var inst_32111__$1 = tmp32264;
var inst_32112__$1 = inst_32131;
var state_32239__$1 = (function (){var statearr_32274 = state_32239;
(statearr_32274[(18)] = inst_32130);

(statearr_32274[(14)] = inst_32109__$1);

(statearr_32274[(15)] = inst_32111__$1);

(statearr_32274[(16)] = inst_32112__$1);

(statearr_32274[(17)] = inst_32110__$1);

return statearr_32274;
})();
var statearr_32275_34976 = state_32239__$1;
(statearr_32275_34976[(2)] = null);

(statearr_32275_34976[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (21))){
var inst_32157 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32279_34977 = state_32239__$1;
(statearr_32279_34977[(2)] = inst_32157);

(statearr_32279_34977[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (31))){
var inst_32183 = (state_32239[(12)]);
var inst_32188 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_32183);
var state_32239__$1 = state_32239;
var statearr_32282_34978 = state_32239__$1;
(statearr_32282_34978[(2)] = inst_32188);

(statearr_32282_34978[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (32))){
var inst_32176 = (state_32239[(9)]);
var inst_32175 = (state_32239[(19)]);
var inst_32177 = (state_32239[(20)]);
var inst_32178 = (state_32239[(10)]);
var inst_32190 = (state_32239[(2)]);
var inst_32191 = (inst_32178 + (1));
var tmp32276 = inst_32176;
var tmp32277 = inst_32175;
var tmp32278 = inst_32177;
var inst_32175__$1 = tmp32277;
var inst_32176__$1 = tmp32276;
var inst_32177__$1 = tmp32278;
var inst_32178__$1 = inst_32191;
var state_32239__$1 = (function (){var statearr_32283 = state_32239;
(statearr_32283[(9)] = inst_32176__$1);

(statearr_32283[(19)] = inst_32175__$1);

(statearr_32283[(20)] = inst_32177__$1);

(statearr_32283[(10)] = inst_32178__$1);

(statearr_32283[(21)] = inst_32190);

return statearr_32283;
})();
var statearr_32287_34979 = state_32239__$1;
(statearr_32287_34979[(2)] = null);

(statearr_32287_34979[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (40))){
var inst_32204 = (state_32239[(22)]);
var inst_32208 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_32204);
var state_32239__$1 = state_32239;
var statearr_32288_34980 = state_32239__$1;
(statearr_32288_34980[(2)] = inst_32208);

(statearr_32288_34980[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (33))){
var inst_32194 = (state_32239[(23)]);
var inst_32196 = cljs.core.chunked_seq_QMARK_(inst_32194);
var state_32239__$1 = state_32239;
if(inst_32196){
var statearr_32290_34985 = state_32239__$1;
(statearr_32290_34985[(1)] = (36));

} else {
var statearr_32291_34986 = state_32239__$1;
(statearr_32291_34986[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (13))){
var inst_32124 = (state_32239[(24)]);
var inst_32127 = cljs.core.async.close_BANG_(inst_32124);
var state_32239__$1 = state_32239;
var statearr_32292_34990 = state_32239__$1;
(statearr_32292_34990[(2)] = inst_32127);

(statearr_32292_34990[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (22))){
var inst_32147 = (state_32239[(8)]);
var inst_32150 = cljs.core.async.close_BANG_(inst_32147);
var state_32239__$1 = state_32239;
var statearr_32293_34992 = state_32239__$1;
(statearr_32293_34992[(2)] = inst_32150);

(statearr_32293_34992[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (36))){
var inst_32194 = (state_32239[(23)]);
var inst_32199 = cljs.core.chunk_first(inst_32194);
var inst_32200 = cljs.core.chunk_rest(inst_32194);
var inst_32201 = cljs.core.count(inst_32199);
var inst_32175 = inst_32200;
var inst_32176 = inst_32199;
var inst_32177 = inst_32201;
var inst_32178 = (0);
var state_32239__$1 = (function (){var statearr_32294 = state_32239;
(statearr_32294[(9)] = inst_32176);

(statearr_32294[(19)] = inst_32175);

(statearr_32294[(20)] = inst_32177);

(statearr_32294[(10)] = inst_32178);

return statearr_32294;
})();
var statearr_32295_34993 = state_32239__$1;
(statearr_32295_34993[(2)] = null);

(statearr_32295_34993[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (41))){
var inst_32194 = (state_32239[(23)]);
var inst_32210 = (state_32239[(2)]);
var inst_32212 = cljs.core.next(inst_32194);
var inst_32175 = inst_32212;
var inst_32176 = null;
var inst_32177 = (0);
var inst_32178 = (0);
var state_32239__$1 = (function (){var statearr_32296 = state_32239;
(statearr_32296[(9)] = inst_32176);

(statearr_32296[(19)] = inst_32175);

(statearr_32296[(25)] = inst_32210);

(statearr_32296[(20)] = inst_32177);

(statearr_32296[(10)] = inst_32178);

return statearr_32296;
})();
var statearr_32298_35020 = state_32239__$1;
(statearr_32298_35020[(2)] = null);

(statearr_32298_35020[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (43))){
var state_32239__$1 = state_32239;
var statearr_32299_35022 = state_32239__$1;
(statearr_32299_35022[(2)] = null);

(statearr_32299_35022[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (29))){
var inst_32221 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32303_35032 = state_32239__$1;
(statearr_32303_35032[(2)] = inst_32221);

(statearr_32303_35032[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (44))){
var inst_32230 = (state_32239[(2)]);
var state_32239__$1 = (function (){var statearr_32304 = state_32239;
(statearr_32304[(26)] = inst_32230);

return statearr_32304;
})();
var statearr_32305_35043 = state_32239__$1;
(statearr_32305_35043[(2)] = null);

(statearr_32305_35043[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (6))){
var inst_32167 = (state_32239[(27)]);
var inst_32166 = cljs.core.deref(cs);
var inst_32167__$1 = cljs.core.keys(inst_32166);
var inst_32168 = cljs.core.count(inst_32167__$1);
var inst_32169 = cljs.core.reset_BANG_(dctr,inst_32168);
var inst_32174 = cljs.core.seq(inst_32167__$1);
var inst_32175 = inst_32174;
var inst_32176 = null;
var inst_32177 = (0);
var inst_32178 = (0);
var state_32239__$1 = (function (){var statearr_32306 = state_32239;
(statearr_32306[(9)] = inst_32176);

(statearr_32306[(19)] = inst_32175);

(statearr_32306[(20)] = inst_32177);

(statearr_32306[(10)] = inst_32178);

(statearr_32306[(28)] = inst_32169);

(statearr_32306[(27)] = inst_32167__$1);

return statearr_32306;
})();
var statearr_32307_35061 = state_32239__$1;
(statearr_32307_35061[(2)] = null);

(statearr_32307_35061[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (28))){
var inst_32175 = (state_32239[(19)]);
var inst_32194 = (state_32239[(23)]);
var inst_32194__$1 = cljs.core.seq(inst_32175);
var state_32239__$1 = (function (){var statearr_32308 = state_32239;
(statearr_32308[(23)] = inst_32194__$1);

return statearr_32308;
})();
if(inst_32194__$1){
var statearr_32309_35093 = state_32239__$1;
(statearr_32309_35093[(1)] = (33));

} else {
var statearr_32310_35107 = state_32239__$1;
(statearr_32310_35107[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (25))){
var inst_32177 = (state_32239[(20)]);
var inst_32178 = (state_32239[(10)]);
var inst_32180 = (inst_32178 < inst_32177);
var inst_32181 = inst_32180;
var state_32239__$1 = state_32239;
if(cljs.core.truth_(inst_32181)){
var statearr_32311_35110 = state_32239__$1;
(statearr_32311_35110[(1)] = (27));

} else {
var statearr_32312_35111 = state_32239__$1;
(statearr_32312_35111[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (34))){
var state_32239__$1 = state_32239;
var statearr_32315_35113 = state_32239__$1;
(statearr_32315_35113[(2)] = null);

(statearr_32315_35113[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (17))){
var state_32239__$1 = state_32239;
var statearr_32317_35117 = state_32239__$1;
(statearr_32317_35117[(2)] = null);

(statearr_32317_35117[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (3))){
var inst_32237 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
return cljs.core.async.impl.ioc_helpers.return_chan(state_32239__$1,inst_32237);
} else {
if((state_val_32240 === (12))){
var inst_32162 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32319_35122 = state_32239__$1;
(statearr_32319_35122[(2)] = inst_32162);

(statearr_32319_35122[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (2))){
var state_32239__$1 = state_32239;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_32239__$1,(4),ch);
} else {
if((state_val_32240 === (23))){
var state_32239__$1 = state_32239;
var statearr_32320_35124 = state_32239__$1;
(statearr_32320_35124[(2)] = null);

(statearr_32320_35124[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (35))){
var inst_32219 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32321_35126 = state_32239__$1;
(statearr_32321_35126[(2)] = inst_32219);

(statearr_32321_35126[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (19))){
var inst_32134 = (state_32239[(7)]);
var inst_32138 = cljs.core.chunk_first(inst_32134);
var inst_32139 = cljs.core.chunk_rest(inst_32134);
var inst_32140 = cljs.core.count(inst_32138);
var inst_32109 = inst_32139;
var inst_32110 = inst_32138;
var inst_32111 = inst_32140;
var inst_32112 = (0);
var state_32239__$1 = (function (){var statearr_32322 = state_32239;
(statearr_32322[(14)] = inst_32109);

(statearr_32322[(15)] = inst_32111);

(statearr_32322[(16)] = inst_32112);

(statearr_32322[(17)] = inst_32110);

return statearr_32322;
})();
var statearr_32327_35128 = state_32239__$1;
(statearr_32327_35128[(2)] = null);

(statearr_32327_35128[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (11))){
var inst_32134 = (state_32239[(7)]);
var inst_32109 = (state_32239[(14)]);
var inst_32134__$1 = cljs.core.seq(inst_32109);
var state_32239__$1 = (function (){var statearr_32328 = state_32239;
(statearr_32328[(7)] = inst_32134__$1);

return statearr_32328;
})();
if(inst_32134__$1){
var statearr_32330_35131 = state_32239__$1;
(statearr_32330_35131[(1)] = (16));

} else {
var statearr_32331_35132 = state_32239__$1;
(statearr_32331_35132[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (9))){
var inst_32164 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32332_35133 = state_32239__$1;
(statearr_32332_35133[(2)] = inst_32164);

(statearr_32332_35133[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (5))){
var inst_32107 = cljs.core.deref(cs);
var inst_32108 = cljs.core.seq(inst_32107);
var inst_32109 = inst_32108;
var inst_32110 = null;
var inst_32111 = (0);
var inst_32112 = (0);
var state_32239__$1 = (function (){var statearr_32333 = state_32239;
(statearr_32333[(14)] = inst_32109);

(statearr_32333[(15)] = inst_32111);

(statearr_32333[(16)] = inst_32112);

(statearr_32333[(17)] = inst_32110);

return statearr_32333;
})();
var statearr_32334_35135 = state_32239__$1;
(statearr_32334_35135[(2)] = null);

(statearr_32334_35135[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (14))){
var state_32239__$1 = state_32239;
var statearr_32336_35136 = state_32239__$1;
(statearr_32336_35136[(2)] = null);

(statearr_32336_35136[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (45))){
var inst_32227 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32338_35137 = state_32239__$1;
(statearr_32338_35137[(2)] = inst_32227);

(statearr_32338_35137[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (26))){
var inst_32167 = (state_32239[(27)]);
var inst_32223 = (state_32239[(2)]);
var inst_32224 = cljs.core.seq(inst_32167);
var state_32239__$1 = (function (){var statearr_32345 = state_32239;
(statearr_32345[(29)] = inst_32223);

return statearr_32345;
})();
if(inst_32224){
var statearr_32347_35138 = state_32239__$1;
(statearr_32347_35138[(1)] = (42));

} else {
var statearr_32348_35139 = state_32239__$1;
(statearr_32348_35139[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (16))){
var inst_32134 = (state_32239[(7)]);
var inst_32136 = cljs.core.chunked_seq_QMARK_(inst_32134);
var state_32239__$1 = state_32239;
if(inst_32136){
var statearr_32349_35140 = state_32239__$1;
(statearr_32349_35140[(1)] = (19));

} else {
var statearr_32350_35141 = state_32239__$1;
(statearr_32350_35141[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (38))){
var inst_32215 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32351_35142 = state_32239__$1;
(statearr_32351_35142[(2)] = inst_32215);

(statearr_32351_35142[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (30))){
var state_32239__$1 = state_32239;
var statearr_32352_35143 = state_32239__$1;
(statearr_32352_35143[(2)] = null);

(statearr_32352_35143[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (10))){
var inst_32112 = (state_32239[(16)]);
var inst_32110 = (state_32239[(17)]);
var inst_32123 = cljs.core._nth(inst_32110,inst_32112);
var inst_32124 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32123,(0),null);
var inst_32125 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32123,(1),null);
var state_32239__$1 = (function (){var statearr_32357 = state_32239;
(statearr_32357[(24)] = inst_32124);

return statearr_32357;
})();
if(cljs.core.truth_(inst_32125)){
var statearr_32358_35145 = state_32239__$1;
(statearr_32358_35145[(1)] = (13));

} else {
var statearr_32359_35146 = state_32239__$1;
(statearr_32359_35146[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (18))){
var inst_32160 = (state_32239[(2)]);
var state_32239__$1 = state_32239;
var statearr_32360_35147 = state_32239__$1;
(statearr_32360_35147[(2)] = inst_32160);

(statearr_32360_35147[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (42))){
var state_32239__$1 = state_32239;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_32239__$1,(45),dchan);
} else {
if((state_val_32240 === (37))){
var inst_32204 = (state_32239[(22)]);
var inst_32194 = (state_32239[(23)]);
var inst_32100 = (state_32239[(11)]);
var inst_32204__$1 = cljs.core.first(inst_32194);
var inst_32205 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_32204__$1,inst_32100,done);
var state_32239__$1 = (function (){var statearr_32361 = state_32239;
(statearr_32361[(22)] = inst_32204__$1);

return statearr_32361;
})();
if(cljs.core.truth_(inst_32205)){
var statearr_32363_35152 = state_32239__$1;
(statearr_32363_35152[(1)] = (39));

} else {
var statearr_32364_35153 = state_32239__$1;
(statearr_32364_35153[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32240 === (8))){
var inst_32111 = (state_32239[(15)]);
var inst_32112 = (state_32239[(16)]);
var inst_32114 = (inst_32112 < inst_32111);
var inst_32115 = inst_32114;
var state_32239__$1 = state_32239;
if(cljs.core.truth_(inst_32115)){
var statearr_32367_35160 = state_32239__$1;
(statearr_32367_35160[(1)] = (10));

} else {
var statearr_32368_35161 = state_32239__$1;
(statearr_32368_35161[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__13953__auto__ = null;
var cljs$core$async$mult_$_state_machine__13953__auto____0 = (function (){
var statearr_32370 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32370[(0)] = cljs$core$async$mult_$_state_machine__13953__auto__);

(statearr_32370[(1)] = (1));

return statearr_32370;
});
var cljs$core$async$mult_$_state_machine__13953__auto____1 = (function (state_32239){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_32239);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e32371){var ex__13968__auto__ = e32371;
var statearr_32372_35166 = state_32239;
(statearr_32372_35166[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_32239[(4)]))){
var statearr_32376_35167 = state_32239;
(statearr_32376_35167[(1)] = cljs.core.first((state_32239[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35169 = state_32239;
state_32239 = G__35169;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__13953__auto__ = function(state_32239){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__13953__auto____1.call(this,state_32239);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__13953__auto____0;
cljs$core$async$mult_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__13953__auto____1;
return cljs$core$async$mult_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_32381 = f__14282__auto__();
(statearr_32381[(6)] = c__14281__auto___34925);

return statearr_32381;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__32383 = arguments.length;
switch (G__32383) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_35172 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_35172(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_35180 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_35180(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_35187 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_35187(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_35188 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_35188(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_35191 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_35191(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___35195 = arguments.length;
var i__5770__auto___35198 = (0);
while(true){
if((i__5770__auto___35198 < len__5769__auto___35195)){
args__5775__auto__.push((arguments[i__5770__auto___35198]));

var G__35199 = (i__5770__auto___35198 + (1));
i__5770__auto___35198 = G__35199;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__32445){
var map__32446 = p__32445;
var map__32446__$1 = cljs.core.__destructure_map(map__32446);
var opts = map__32446__$1;
var statearr_32447_35204 = state;
(statearr_32447_35204[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_32450_35209 = state;
(statearr_32450_35209[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_32453_35211 = state;
(statearr_32453_35211[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq32441){
var G__32442 = cljs.core.first(seq32441);
var seq32441__$1 = cljs.core.next(seq32441);
var G__32443 = cljs.core.first(seq32441__$1);
var seq32441__$2 = cljs.core.next(seq32441__$1);
var G__32444 = cljs.core.first(seq32441__$2);
var seq32441__$3 = cljs.core.next(seq32441__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__32442,G__32443,G__32444,seq32441__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32460 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta32461){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta32461 = meta32461;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_32462,meta32461__$1){
var self__ = this;
var _32462__$1 = this;
return (new cljs.core.async.t_cljs$core$async32460(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta32461__$1));
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_32462){
var self__ = this;
var _32462__$1 = this;
return self__.meta32461;
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async32460.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async32460.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta32461","meta32461",365758644,null)], null);
}));

(cljs.core.async.t_cljs$core$async32460.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async32460.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32460");

(cljs.core.async.t_cljs$core$async32460.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async32460");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async32460.
 */
cljs.core.async.__GT_t_cljs$core$async32460 = (function cljs$core$async$__GT_t_cljs$core$async32460(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta32461){
return (new cljs.core.async.t_cljs$core$async32460(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta32461));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async32460(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__14281__auto___35252 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_32764){
var state_val_32765 = (state_32764[(1)]);
if((state_val_32765 === (7))){
var inst_32713 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
if(cljs.core.truth_(inst_32713)){
var statearr_32775_35255 = state_32764__$1;
(statearr_32775_35255[(1)] = (8));

} else {
var statearr_32776_35256 = state_32764__$1;
(statearr_32776_35256[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (20))){
var inst_32704 = (state_32764[(7)]);
var state_32764__$1 = state_32764;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_32764__$1,(23),out,inst_32704);
} else {
if((state_val_32765 === (1))){
var inst_32671 = calc_state();
var inst_32679 = cljs.core.__destructure_map(inst_32671);
var inst_32682 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32679,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_32683 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32679,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_32684 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32679,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_32685 = inst_32671;
var state_32764__$1 = (function (){var statearr_32777 = state_32764;
(statearr_32777[(8)] = inst_32683);

(statearr_32777[(9)] = inst_32682);

(statearr_32777[(10)] = inst_32684);

(statearr_32777[(11)] = inst_32685);

return statearr_32777;
})();
var statearr_32778_35276 = state_32764__$1;
(statearr_32778_35276[(2)] = null);

(statearr_32778_35276[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (24))){
var inst_32689 = (state_32764[(12)]);
var inst_32685 = inst_32689;
var state_32764__$1 = (function (){var statearr_32779 = state_32764;
(statearr_32779[(11)] = inst_32685);

return statearr_32779;
})();
var statearr_32780_35285 = state_32764__$1;
(statearr_32780_35285[(2)] = null);

(statearr_32780_35285[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (4))){
var inst_32707 = (state_32764[(13)]);
var inst_32704 = (state_32764[(7)]);
var inst_32703 = (state_32764[(2)]);
var inst_32704__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32703,(0),null);
var inst_32706 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_32703,(1),null);
var inst_32707__$1 = (inst_32704__$1 == null);
var state_32764__$1 = (function (){var statearr_32781 = state_32764;
(statearr_32781[(13)] = inst_32707__$1);

(statearr_32781[(7)] = inst_32704__$1);

(statearr_32781[(14)] = inst_32706);

return statearr_32781;
})();
if(cljs.core.truth_(inst_32707__$1)){
var statearr_32782_35313 = state_32764__$1;
(statearr_32782_35313[(1)] = (5));

} else {
var statearr_32784_35314 = state_32764__$1;
(statearr_32784_35314[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (15))){
var inst_32690 = (state_32764[(15)]);
var inst_32730 = (state_32764[(16)]);
var inst_32730__$1 = cljs.core.empty_QMARK_(inst_32690);
var state_32764__$1 = (function (){var statearr_32787 = state_32764;
(statearr_32787[(16)] = inst_32730__$1);

return statearr_32787;
})();
if(inst_32730__$1){
var statearr_32788_35318 = state_32764__$1;
(statearr_32788_35318[(1)] = (17));

} else {
var statearr_32789_35320 = state_32764__$1;
(statearr_32789_35320[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (21))){
var inst_32689 = (state_32764[(12)]);
var inst_32685 = inst_32689;
var state_32764__$1 = (function (){var statearr_32790 = state_32764;
(statearr_32790[(11)] = inst_32685);

return statearr_32790;
})();
var statearr_32791_35337 = state_32764__$1;
(statearr_32791_35337[(2)] = null);

(statearr_32791_35337[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (13))){
var inst_32720 = (state_32764[(2)]);
var inst_32723 = calc_state();
var inst_32685 = inst_32723;
var state_32764__$1 = (function (){var statearr_32793 = state_32764;
(statearr_32793[(17)] = inst_32720);

(statearr_32793[(11)] = inst_32685);

return statearr_32793;
})();
var statearr_32794_35341 = state_32764__$1;
(statearr_32794_35341[(2)] = null);

(statearr_32794_35341[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (22))){
var inst_32754 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
var statearr_32797_35353 = state_32764__$1;
(statearr_32797_35353[(2)] = inst_32754);

(statearr_32797_35353[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (6))){
var inst_32706 = (state_32764[(14)]);
var inst_32711 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_32706,change);
var state_32764__$1 = state_32764;
var statearr_32799_35360 = state_32764__$1;
(statearr_32799_35360[(2)] = inst_32711);

(statearr_32799_35360[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (25))){
var state_32764__$1 = state_32764;
var statearr_32800_35371 = state_32764__$1;
(statearr_32800_35371[(2)] = null);

(statearr_32800_35371[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (17))){
var inst_32691 = (state_32764[(18)]);
var inst_32706 = (state_32764[(14)]);
var inst_32733 = (inst_32691.cljs$core$IFn$_invoke$arity$1 ? inst_32691.cljs$core$IFn$_invoke$arity$1(inst_32706) : inst_32691.call(null,inst_32706));
var inst_32734 = cljs.core.not(inst_32733);
var state_32764__$1 = state_32764;
var statearr_32802_35393 = state_32764__$1;
(statearr_32802_35393[(2)] = inst_32734);

(statearr_32802_35393[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (3))){
var inst_32760 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
return cljs.core.async.impl.ioc_helpers.return_chan(state_32764__$1,inst_32760);
} else {
if((state_val_32765 === (12))){
var state_32764__$1 = state_32764;
var statearr_32804_35419 = state_32764__$1;
(statearr_32804_35419[(2)] = null);

(statearr_32804_35419[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (2))){
var inst_32689 = (state_32764[(12)]);
var inst_32685 = (state_32764[(11)]);
var inst_32689__$1 = cljs.core.__destructure_map(inst_32685);
var inst_32690 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32689__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_32691 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32689__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_32692 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_32689__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_32764__$1 = (function (){var statearr_32808 = state_32764;
(statearr_32808[(18)] = inst_32691);

(statearr_32808[(12)] = inst_32689__$1);

(statearr_32808[(15)] = inst_32690);

return statearr_32808;
})();
return cljs.core.async.ioc_alts_BANG_(state_32764__$1,(4),inst_32692);
} else {
if((state_val_32765 === (23))){
var inst_32745 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
if(cljs.core.truth_(inst_32745)){
var statearr_32809_35446 = state_32764__$1;
(statearr_32809_35446[(1)] = (24));

} else {
var statearr_32810_35447 = state_32764__$1;
(statearr_32810_35447[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (19))){
var inst_32737 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
var statearr_32813_35451 = state_32764__$1;
(statearr_32813_35451[(2)] = inst_32737);

(statearr_32813_35451[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (11))){
var inst_32706 = (state_32764[(14)]);
var inst_32717 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_32706);
var state_32764__$1 = state_32764;
var statearr_32815_35458 = state_32764__$1;
(statearr_32815_35458[(2)] = inst_32717);

(statearr_32815_35458[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (9))){
var inst_32706 = (state_32764[(14)]);
var inst_32727 = (state_32764[(19)]);
var inst_32690 = (state_32764[(15)]);
var inst_32727__$1 = (inst_32690.cljs$core$IFn$_invoke$arity$1 ? inst_32690.cljs$core$IFn$_invoke$arity$1(inst_32706) : inst_32690.call(null,inst_32706));
var state_32764__$1 = (function (){var statearr_32818 = state_32764;
(statearr_32818[(19)] = inst_32727__$1);

return statearr_32818;
})();
if(cljs.core.truth_(inst_32727__$1)){
var statearr_32820_35460 = state_32764__$1;
(statearr_32820_35460[(1)] = (14));

} else {
var statearr_32823_35461 = state_32764__$1;
(statearr_32823_35461[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (5))){
var inst_32707 = (state_32764[(13)]);
var state_32764__$1 = state_32764;
var statearr_32824_35462 = state_32764__$1;
(statearr_32824_35462[(2)] = inst_32707);

(statearr_32824_35462[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (14))){
var inst_32727 = (state_32764[(19)]);
var state_32764__$1 = state_32764;
var statearr_32825_35463 = state_32764__$1;
(statearr_32825_35463[(2)] = inst_32727);

(statearr_32825_35463[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (26))){
var inst_32750 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
var statearr_32829_35465 = state_32764__$1;
(statearr_32829_35465[(2)] = inst_32750);

(statearr_32829_35465[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (16))){
var inst_32739 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
if(cljs.core.truth_(inst_32739)){
var statearr_32833_35466 = state_32764__$1;
(statearr_32833_35466[(1)] = (20));

} else {
var statearr_32834_35467 = state_32764__$1;
(statearr_32834_35467[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (10))){
var inst_32756 = (state_32764[(2)]);
var state_32764__$1 = state_32764;
var statearr_32837_35474 = state_32764__$1;
(statearr_32837_35474[(2)] = inst_32756);

(statearr_32837_35474[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (18))){
var inst_32730 = (state_32764[(16)]);
var state_32764__$1 = state_32764;
var statearr_32839_35475 = state_32764__$1;
(statearr_32839_35475[(2)] = inst_32730);

(statearr_32839_35475[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_32765 === (8))){
var inst_32704 = (state_32764[(7)]);
var inst_32715 = (inst_32704 == null);
var state_32764__$1 = state_32764;
if(cljs.core.truth_(inst_32715)){
var statearr_32840_35476 = state_32764__$1;
(statearr_32840_35476[(1)] = (11));

} else {
var statearr_32841_35477 = state_32764__$1;
(statearr_32841_35477[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__13953__auto__ = null;
var cljs$core$async$mix_$_state_machine__13953__auto____0 = (function (){
var statearr_32844 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_32844[(0)] = cljs$core$async$mix_$_state_machine__13953__auto__);

(statearr_32844[(1)] = (1));

return statearr_32844;
});
var cljs$core$async$mix_$_state_machine__13953__auto____1 = (function (state_32764){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_32764);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e32846){var ex__13968__auto__ = e32846;
var statearr_32848_35479 = state_32764;
(statearr_32848_35479[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_32764[(4)]))){
var statearr_32850_35480 = state_32764;
(statearr_32850_35480[(1)] = cljs.core.first((state_32764[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35538 = state_32764;
state_32764 = G__35538;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__13953__auto__ = function(state_32764){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__13953__auto____1.call(this,state_32764);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__13953__auto____0;
cljs$core$async$mix_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__13953__auto____1;
return cljs$core$async$mix_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_32851 = f__14282__auto__();
(statearr_32851[(6)] = c__14281__auto___35252);

return statearr_32851;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_35573 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_35573(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_35595 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_35595(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_35603 = (function() {
var G__35604 = null;
var G__35604__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__35604__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__35604 = function(p,v){
switch(arguments.length){
case 1:
return G__35604__1.call(this,p);
case 2:
return G__35604__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__35604.cljs$core$IFn$_invoke$arity$1 = G__35604__1;
G__35604.cljs$core$IFn$_invoke$arity$2 = G__35604__2;
return G__35604;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__32886 = arguments.length;
switch (G__32886) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_35603(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_35603(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async32928 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta32929){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta32929 = meta32929;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_32930,meta32929__$1){
var self__ = this;
var _32930__$1 = this;
return (new cljs.core.async.t_cljs$core$async32928(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta32929__$1));
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_32930){
var self__ = this;
var _32930__$1 = this;
return self__.meta32929;
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async32928.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async32928.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta32929","meta32929",1751307349,null)], null);
}));

(cljs.core.async.t_cljs$core$async32928.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async32928.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async32928");

(cljs.core.async.t_cljs$core$async32928.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async32928");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async32928.
 */
cljs.core.async.__GT_t_cljs$core$async32928 = (function cljs$core$async$__GT_t_cljs$core$async32928(ch,topic_fn,buf_fn,mults,ensure_mult,meta32929){
return (new cljs.core.async.t_cljs$core$async32928(ch,topic_fn,buf_fn,mults,ensure_mult,meta32929));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__32923 = arguments.length;
switch (G__32923) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__32919_SHARP_){
if(cljs.core.truth_((p1__32919_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__32919_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__32919_SHARP_.call(null,topic)))){
return p1__32919_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__32919_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async32928(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__14281__auto___35624 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33047){
var state_val_33054 = (state_33047[(1)]);
if((state_val_33054 === (7))){
var inst_33040 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33056_35626 = state_33047__$1;
(statearr_33056_35626[(2)] = inst_33040);

(statearr_33056_35626[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (20))){
var state_33047__$1 = state_33047;
var statearr_33058_35627 = state_33047__$1;
(statearr_33058_35627[(2)] = null);

(statearr_33058_35627[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (1))){
var state_33047__$1 = state_33047;
var statearr_33059_35628 = state_33047__$1;
(statearr_33059_35628[(2)] = null);

(statearr_33059_35628[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (24))){
var inst_33023 = (state_33047[(7)]);
var inst_33032 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_33023);
var state_33047__$1 = state_33047;
var statearr_33063_35630 = state_33047__$1;
(statearr_33063_35630[(2)] = inst_33032);

(statearr_33063_35630[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (4))){
var inst_32969 = (state_33047[(8)]);
var inst_32969__$1 = (state_33047[(2)]);
var inst_32970 = (inst_32969__$1 == null);
var state_33047__$1 = (function (){var statearr_33064 = state_33047;
(statearr_33064[(8)] = inst_32969__$1);

return statearr_33064;
})();
if(cljs.core.truth_(inst_32970)){
var statearr_33065_35635 = state_33047__$1;
(statearr_33065_35635[(1)] = (5));

} else {
var statearr_33067_35636 = state_33047__$1;
(statearr_33067_35636[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (15))){
var inst_33016 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33068_35638 = state_33047__$1;
(statearr_33068_35638[(2)] = inst_33016);

(statearr_33068_35638[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (21))){
var inst_33037 = (state_33047[(2)]);
var state_33047__$1 = (function (){var statearr_33069 = state_33047;
(statearr_33069[(9)] = inst_33037);

return statearr_33069;
})();
var statearr_33072_35639 = state_33047__$1;
(statearr_33072_35639[(2)] = null);

(statearr_33072_35639[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (13))){
var inst_32997 = (state_33047[(10)]);
var inst_32999 = cljs.core.chunked_seq_QMARK_(inst_32997);
var state_33047__$1 = state_33047;
if(inst_32999){
var statearr_33075_35640 = state_33047__$1;
(statearr_33075_35640[(1)] = (16));

} else {
var statearr_33076_35641 = state_33047__$1;
(statearr_33076_35641[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (22))){
var inst_33029 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
if(cljs.core.truth_(inst_33029)){
var statearr_33077_35644 = state_33047__$1;
(statearr_33077_35644[(1)] = (23));

} else {
var statearr_33079_35646 = state_33047__$1;
(statearr_33079_35646[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (6))){
var inst_33025 = (state_33047[(11)]);
var inst_32969 = (state_33047[(8)]);
var inst_33023 = (state_33047[(7)]);
var inst_33023__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_32969) : topic_fn.call(null,inst_32969));
var inst_33024 = cljs.core.deref(mults);
var inst_33025__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_33024,inst_33023__$1);
var state_33047__$1 = (function (){var statearr_33081 = state_33047;
(statearr_33081[(11)] = inst_33025__$1);

(statearr_33081[(7)] = inst_33023__$1);

return statearr_33081;
})();
if(cljs.core.truth_(inst_33025__$1)){
var statearr_33083_35649 = state_33047__$1;
(statearr_33083_35649[(1)] = (19));

} else {
var statearr_33088_35650 = state_33047__$1;
(statearr_33088_35650[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (25))){
var inst_33034 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33090_35651 = state_33047__$1;
(statearr_33090_35651[(2)] = inst_33034);

(statearr_33090_35651[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (17))){
var inst_32997 = (state_33047[(10)]);
var inst_33006 = cljs.core.first(inst_32997);
var inst_33007 = cljs.core.async.muxch_STAR_(inst_33006);
var inst_33008 = cljs.core.async.close_BANG_(inst_33007);
var inst_33010 = cljs.core.next(inst_32997);
var inst_32980 = inst_33010;
var inst_32981 = null;
var inst_32982 = (0);
var inst_32983 = (0);
var state_33047__$1 = (function (){var statearr_33095 = state_33047;
(statearr_33095[(12)] = inst_33008);

(statearr_33095[(13)] = inst_32982);

(statearr_33095[(14)] = inst_32980);

(statearr_33095[(15)] = inst_32981);

(statearr_33095[(16)] = inst_32983);

return statearr_33095;
})();
var statearr_33097_35655 = state_33047__$1;
(statearr_33097_35655[(2)] = null);

(statearr_33097_35655[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (3))){
var inst_33042 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33047__$1,inst_33042);
} else {
if((state_val_33054 === (12))){
var inst_33018 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33101_35656 = state_33047__$1;
(statearr_33101_35656[(2)] = inst_33018);

(statearr_33101_35656[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (2))){
var state_33047__$1 = state_33047;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33047__$1,(4),ch);
} else {
if((state_val_33054 === (23))){
var state_33047__$1 = state_33047;
var statearr_33106_35658 = state_33047__$1;
(statearr_33106_35658[(2)] = null);

(statearr_33106_35658[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (19))){
var inst_33025 = (state_33047[(11)]);
var inst_32969 = (state_33047[(8)]);
var inst_33027 = cljs.core.async.muxch_STAR_(inst_33025);
var state_33047__$1 = state_33047;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33047__$1,(22),inst_33027,inst_32969);
} else {
if((state_val_33054 === (11))){
var inst_32980 = (state_33047[(14)]);
var inst_32997 = (state_33047[(10)]);
var inst_32997__$1 = cljs.core.seq(inst_32980);
var state_33047__$1 = (function (){var statearr_33111 = state_33047;
(statearr_33111[(10)] = inst_32997__$1);

return statearr_33111;
})();
if(inst_32997__$1){
var statearr_33115_35681 = state_33047__$1;
(statearr_33115_35681[(1)] = (13));

} else {
var statearr_33117_35684 = state_33047__$1;
(statearr_33117_35684[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (9))){
var inst_33020 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33118_35721 = state_33047__$1;
(statearr_33118_35721[(2)] = inst_33020);

(statearr_33118_35721[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (5))){
var inst_32977 = cljs.core.deref(mults);
var inst_32978 = cljs.core.vals(inst_32977);
var inst_32979 = cljs.core.seq(inst_32978);
var inst_32980 = inst_32979;
var inst_32981 = null;
var inst_32982 = (0);
var inst_32983 = (0);
var state_33047__$1 = (function (){var statearr_33119 = state_33047;
(statearr_33119[(13)] = inst_32982);

(statearr_33119[(14)] = inst_32980);

(statearr_33119[(15)] = inst_32981);

(statearr_33119[(16)] = inst_32983);

return statearr_33119;
})();
var statearr_33120_35739 = state_33047__$1;
(statearr_33120_35739[(2)] = null);

(statearr_33120_35739[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (14))){
var state_33047__$1 = state_33047;
var statearr_33128_35740 = state_33047__$1;
(statearr_33128_35740[(2)] = null);

(statearr_33128_35740[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (16))){
var inst_32997 = (state_33047[(10)]);
var inst_33001 = cljs.core.chunk_first(inst_32997);
var inst_33002 = cljs.core.chunk_rest(inst_32997);
var inst_33003 = cljs.core.count(inst_33001);
var inst_32980 = inst_33002;
var inst_32981 = inst_33001;
var inst_32982 = inst_33003;
var inst_32983 = (0);
var state_33047__$1 = (function (){var statearr_33133 = state_33047;
(statearr_33133[(13)] = inst_32982);

(statearr_33133[(14)] = inst_32980);

(statearr_33133[(15)] = inst_32981);

(statearr_33133[(16)] = inst_32983);

return statearr_33133;
})();
var statearr_33134_35750 = state_33047__$1;
(statearr_33134_35750[(2)] = null);

(statearr_33134_35750[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (10))){
var inst_32982 = (state_33047[(13)]);
var inst_32980 = (state_33047[(14)]);
var inst_32981 = (state_33047[(15)]);
var inst_32983 = (state_33047[(16)]);
var inst_32989 = cljs.core._nth(inst_32981,inst_32983);
var inst_32991 = cljs.core.async.muxch_STAR_(inst_32989);
var inst_32992 = cljs.core.async.close_BANG_(inst_32991);
var inst_32993 = (inst_32983 + (1));
var tmp33121 = inst_32982;
var tmp33122 = inst_32980;
var tmp33123 = inst_32981;
var inst_32980__$1 = tmp33122;
var inst_32981__$1 = tmp33123;
var inst_32982__$1 = tmp33121;
var inst_32983__$1 = inst_32993;
var state_33047__$1 = (function (){var statearr_33138 = state_33047;
(statearr_33138[(13)] = inst_32982__$1);

(statearr_33138[(14)] = inst_32980__$1);

(statearr_33138[(15)] = inst_32981__$1);

(statearr_33138[(17)] = inst_32992);

(statearr_33138[(16)] = inst_32983__$1);

return statearr_33138;
})();
var statearr_33141_35769 = state_33047__$1;
(statearr_33141_35769[(2)] = null);

(statearr_33141_35769[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (18))){
var inst_33013 = (state_33047[(2)]);
var state_33047__$1 = state_33047;
var statearr_33142_35770 = state_33047__$1;
(statearr_33142_35770[(2)] = inst_33013);

(statearr_33142_35770[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33054 === (8))){
var inst_32982 = (state_33047[(13)]);
var inst_32983 = (state_33047[(16)]);
var inst_32985 = (inst_32983 < inst_32982);
var inst_32986 = inst_32985;
var state_33047__$1 = state_33047;
if(cljs.core.truth_(inst_32986)){
var statearr_33147_35773 = state_33047__$1;
(statearr_33147_35773[(1)] = (10));

} else {
var statearr_33148_35775 = state_33047__$1;
(statearr_33148_35775[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_33152 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33152[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_33152[(1)] = (1));

return statearr_33152;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33047){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33047);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33155){var ex__13968__auto__ = e33155;
var statearr_33162_35785 = state_33047;
(statearr_33162_35785[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33047[(4)]))){
var statearr_33163_35786 = state_33047;
(statearr_33163_35786[(1)] = cljs.core.first((state_33047[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35793 = state_33047;
state_33047 = G__35793;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33047){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33047);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33168 = f__14282__auto__();
(statearr_33168[(6)] = c__14281__auto___35624);

return statearr_33168;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__33173 = arguments.length;
switch (G__33173) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__33187 = arguments.length;
switch (G__33187) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__33242 = arguments.length;
switch (G__33242) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__14281__auto___35929 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33348){
var state_val_33349 = (state_33348[(1)]);
if((state_val_33349 === (7))){
var state_33348__$1 = state_33348;
var statearr_33354_35932 = state_33348__$1;
(statearr_33354_35932[(2)] = null);

(statearr_33354_35932[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (1))){
var state_33348__$1 = state_33348;
var statearr_33355_35934 = state_33348__$1;
(statearr_33355_35934[(2)] = null);

(statearr_33355_35934[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (4))){
var inst_33306 = (state_33348[(7)]);
var inst_33307 = (state_33348[(8)]);
var inst_33309 = (inst_33307 < inst_33306);
var state_33348__$1 = state_33348;
if(cljs.core.truth_(inst_33309)){
var statearr_33356_35944 = state_33348__$1;
(statearr_33356_35944[(1)] = (6));

} else {
var statearr_33357_35945 = state_33348__$1;
(statearr_33357_35945[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (15))){
var inst_33334 = (state_33348[(9)]);
var inst_33339 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_33334);
var state_33348__$1 = state_33348;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33348__$1,(17),out,inst_33339);
} else {
if((state_val_33349 === (13))){
var inst_33334 = (state_33348[(9)]);
var inst_33334__$1 = (state_33348[(2)]);
var inst_33335 = cljs.core.some(cljs.core.nil_QMARK_,inst_33334__$1);
var state_33348__$1 = (function (){var statearr_33365 = state_33348;
(statearr_33365[(9)] = inst_33334__$1);

return statearr_33365;
})();
if(cljs.core.truth_(inst_33335)){
var statearr_33369_35955 = state_33348__$1;
(statearr_33369_35955[(1)] = (14));

} else {
var statearr_33370_35960 = state_33348__$1;
(statearr_33370_35960[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (6))){
var state_33348__$1 = state_33348;
var statearr_33371_35961 = state_33348__$1;
(statearr_33371_35961[(2)] = null);

(statearr_33371_35961[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (17))){
var inst_33341 = (state_33348[(2)]);
var state_33348__$1 = (function (){var statearr_33373 = state_33348;
(statearr_33373[(10)] = inst_33341);

return statearr_33373;
})();
var statearr_33378_35969 = state_33348__$1;
(statearr_33378_35969[(2)] = null);

(statearr_33378_35969[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (3))){
var inst_33346 = (state_33348[(2)]);
var state_33348__$1 = state_33348;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33348__$1,inst_33346);
} else {
if((state_val_33349 === (12))){
var _ = (function (){var statearr_33379 = state_33348;
(statearr_33379[(4)] = cljs.core.rest((state_33348[(4)])));

return statearr_33379;
})();
var state_33348__$1 = state_33348;
var ex33372 = (state_33348__$1[(2)]);
var statearr_33380_35970 = state_33348__$1;
(statearr_33380_35970[(5)] = ex33372);


if((ex33372 instanceof Object)){
var statearr_33383_35971 = state_33348__$1;
(statearr_33383_35971[(1)] = (11));

(statearr_33383_35971[(5)] = null);

} else {
throw ex33372;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (2))){
var inst_33304 = cljs.core.reset_BANG_(dctr,cnt);
var inst_33306 = cnt;
var inst_33307 = (0);
var state_33348__$1 = (function (){var statearr_33388 = state_33348;
(statearr_33388[(7)] = inst_33306);

(statearr_33388[(8)] = inst_33307);

(statearr_33388[(11)] = inst_33304);

return statearr_33388;
})();
var statearr_33393_35975 = state_33348__$1;
(statearr_33393_35975[(2)] = null);

(statearr_33393_35975[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (11))){
var inst_33313 = (state_33348[(2)]);
var inst_33314 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_33348__$1 = (function (){var statearr_33394 = state_33348;
(statearr_33394[(12)] = inst_33313);

return statearr_33394;
})();
var statearr_33395_35976 = state_33348__$1;
(statearr_33395_35976[(2)] = inst_33314);

(statearr_33395_35976[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (9))){
var inst_33307 = (state_33348[(8)]);
var _ = (function (){var statearr_33398 = state_33348;
(statearr_33398[(4)] = cljs.core.cons((12),(state_33348[(4)])));

return statearr_33398;
})();
var inst_33320 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_33307) : chs__$1.call(null,inst_33307));
var inst_33321 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_33307) : done.call(null,inst_33307));
var inst_33322 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_33320,inst_33321);
var ___$1 = (function (){var statearr_33399 = state_33348;
(statearr_33399[(4)] = cljs.core.rest((state_33348[(4)])));

return statearr_33399;
})();
var state_33348__$1 = state_33348;
var statearr_33400_35980 = state_33348__$1;
(statearr_33400_35980[(2)] = inst_33322);

(statearr_33400_35980[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (5))){
var inst_33332 = (state_33348[(2)]);
var state_33348__$1 = (function (){var statearr_33405 = state_33348;
(statearr_33405[(13)] = inst_33332);

return statearr_33405;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33348__$1,(13),dchan);
} else {
if((state_val_33349 === (14))){
var inst_33337 = cljs.core.async.close_BANG_(out);
var state_33348__$1 = state_33348;
var statearr_33409_35981 = state_33348__$1;
(statearr_33409_35981[(2)] = inst_33337);

(statearr_33409_35981[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (16))){
var inst_33344 = (state_33348[(2)]);
var state_33348__$1 = state_33348;
var statearr_33411_35986 = state_33348__$1;
(statearr_33411_35986[(2)] = inst_33344);

(statearr_33411_35986[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (10))){
var inst_33307 = (state_33348[(8)]);
var inst_33325 = (state_33348[(2)]);
var inst_33326 = (inst_33307 + (1));
var inst_33307__$1 = inst_33326;
var state_33348__$1 = (function (){var statearr_33418 = state_33348;
(statearr_33418[(14)] = inst_33325);

(statearr_33418[(8)] = inst_33307__$1);

return statearr_33418;
})();
var statearr_33427_35995 = state_33348__$1;
(statearr_33427_35995[(2)] = null);

(statearr_33427_35995[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33349 === (8))){
var inst_33330 = (state_33348[(2)]);
var state_33348__$1 = state_33348;
var statearr_33430_35998 = state_33348__$1;
(statearr_33430_35998[(2)] = inst_33330);

(statearr_33430_35998[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_33438 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33438[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_33438[(1)] = (1));

return statearr_33438;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33348){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33348);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33439){var ex__13968__auto__ = e33439;
var statearr_33440_36003 = state_33348;
(statearr_33440_36003[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33348[(4)]))){
var statearr_33441_36004 = state_33348;
(statearr_33441_36004[(1)] = cljs.core.first((state_33348[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36006 = state_33348;
state_33348 = G__36006;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33348){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33348);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33443 = f__14282__auto__();
(statearr_33443[(6)] = c__14281__auto___35929);

return statearr_33443;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__33446 = arguments.length;
switch (G__33446) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36016 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33486){
var state_val_33487 = (state_33486[(1)]);
if((state_val_33487 === (7))){
var inst_33463 = (state_33486[(7)]);
var inst_33458 = (state_33486[(8)]);
var inst_33458__$1 = (state_33486[(2)]);
var inst_33463__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_33458__$1,(0),null);
var inst_33464 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_33458__$1,(1),null);
var inst_33468 = (inst_33463__$1 == null);
var state_33486__$1 = (function (){var statearr_33490 = state_33486;
(statearr_33490[(7)] = inst_33463__$1);

(statearr_33490[(8)] = inst_33458__$1);

(statearr_33490[(9)] = inst_33464);

return statearr_33490;
})();
if(cljs.core.truth_(inst_33468)){
var statearr_33496_36021 = state_33486__$1;
(statearr_33496_36021[(1)] = (8));

} else {
var statearr_33497_36025 = state_33486__$1;
(statearr_33497_36025[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (1))){
var inst_33448 = cljs.core.vec(chs);
var inst_33449 = inst_33448;
var state_33486__$1 = (function (){var statearr_33500 = state_33486;
(statearr_33500[(10)] = inst_33449);

return statearr_33500;
})();
var statearr_33501_36027 = state_33486__$1;
(statearr_33501_36027[(2)] = null);

(statearr_33501_36027[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (4))){
var inst_33449 = (state_33486[(10)]);
var state_33486__$1 = state_33486;
return cljs.core.async.ioc_alts_BANG_(state_33486__$1,(7),inst_33449);
} else {
if((state_val_33487 === (6))){
var inst_33482 = (state_33486[(2)]);
var state_33486__$1 = state_33486;
var statearr_33502_36092 = state_33486__$1;
(statearr_33502_36092[(2)] = inst_33482);

(statearr_33502_36092[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (3))){
var inst_33484 = (state_33486[(2)]);
var state_33486__$1 = state_33486;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33486__$1,inst_33484);
} else {
if((state_val_33487 === (2))){
var inst_33449 = (state_33486[(10)]);
var inst_33451 = cljs.core.count(inst_33449);
var inst_33452 = (inst_33451 > (0));
var state_33486__$1 = state_33486;
if(cljs.core.truth_(inst_33452)){
var statearr_33504_36110 = state_33486__$1;
(statearr_33504_36110[(1)] = (4));

} else {
var statearr_33505_36115 = state_33486__$1;
(statearr_33505_36115[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (11))){
var inst_33449 = (state_33486[(10)]);
var inst_33475 = (state_33486[(2)]);
var tmp33503 = inst_33449;
var inst_33449__$1 = tmp33503;
var state_33486__$1 = (function (){var statearr_33506 = state_33486;
(statearr_33506[(10)] = inst_33449__$1);

(statearr_33506[(11)] = inst_33475);

return statearr_33506;
})();
var statearr_33507_36118 = state_33486__$1;
(statearr_33507_36118[(2)] = null);

(statearr_33507_36118[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (9))){
var inst_33463 = (state_33486[(7)]);
var state_33486__$1 = state_33486;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33486__$1,(11),out,inst_33463);
} else {
if((state_val_33487 === (5))){
var inst_33480 = cljs.core.async.close_BANG_(out);
var state_33486__$1 = state_33486;
var statearr_33508_36133 = state_33486__$1;
(statearr_33508_36133[(2)] = inst_33480);

(statearr_33508_36133[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (10))){
var inst_33478 = (state_33486[(2)]);
var state_33486__$1 = state_33486;
var statearr_33509_36136 = state_33486__$1;
(statearr_33509_36136[(2)] = inst_33478);

(statearr_33509_36136[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33487 === (8))){
var inst_33449 = (state_33486[(10)]);
var inst_33463 = (state_33486[(7)]);
var inst_33458 = (state_33486[(8)]);
var inst_33464 = (state_33486[(9)]);
var inst_33470 = (function (){var cs = inst_33449;
var vec__33454 = inst_33458;
var v = inst_33463;
var c = inst_33464;
return (function (p1__33444_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__33444_SHARP_);
});
})();
var inst_33471 = cljs.core.filterv(inst_33470,inst_33449);
var inst_33449__$1 = inst_33471;
var state_33486__$1 = (function (){var statearr_33510 = state_33486;
(statearr_33510[(10)] = inst_33449__$1);

return statearr_33510;
})();
var statearr_33511_36141 = state_33486__$1;
(statearr_33511_36141[(2)] = null);

(statearr_33511_36141[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_33512 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33512[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_33512[(1)] = (1));

return statearr_33512;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33486){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33486);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33513){var ex__13968__auto__ = e33513;
var statearr_33514_36146 = state_33486;
(statearr_33514_36146[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33486[(4)]))){
var statearr_33515_36147 = state_33486;
(statearr_33515_36147[(1)] = cljs.core.first((state_33486[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36157 = state_33486;
state_33486 = G__36157;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33486){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33486);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33516 = f__14282__auto__();
(statearr_33516[(6)] = c__14281__auto___36016);

return statearr_33516;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__33519 = arguments.length;
switch (G__33519) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36165 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33560){
var state_val_33561 = (state_33560[(1)]);
if((state_val_33561 === (7))){
var inst_33542 = (state_33560[(7)]);
var inst_33542__$1 = (state_33560[(2)]);
var inst_33543 = (inst_33542__$1 == null);
var inst_33544 = cljs.core.not(inst_33543);
var state_33560__$1 = (function (){var statearr_33567 = state_33560;
(statearr_33567[(7)] = inst_33542__$1);

return statearr_33567;
})();
if(inst_33544){
var statearr_33568_36167 = state_33560__$1;
(statearr_33568_36167[(1)] = (8));

} else {
var statearr_33569_36168 = state_33560__$1;
(statearr_33569_36168[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (1))){
var inst_33530 = (0);
var state_33560__$1 = (function (){var statearr_33571 = state_33560;
(statearr_33571[(8)] = inst_33530);

return statearr_33571;
})();
var statearr_33576_36170 = state_33560__$1;
(statearr_33576_36170[(2)] = null);

(statearr_33576_36170[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (4))){
var state_33560__$1 = state_33560;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33560__$1,(7),ch);
} else {
if((state_val_33561 === (6))){
var inst_33555 = (state_33560[(2)]);
var state_33560__$1 = state_33560;
var statearr_33577_36175 = state_33560__$1;
(statearr_33577_36175[(2)] = inst_33555);

(statearr_33577_36175[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (3))){
var inst_33557 = (state_33560[(2)]);
var inst_33558 = cljs.core.async.close_BANG_(out);
var state_33560__$1 = (function (){var statearr_33578 = state_33560;
(statearr_33578[(9)] = inst_33557);

return statearr_33578;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_33560__$1,inst_33558);
} else {
if((state_val_33561 === (2))){
var inst_33530 = (state_33560[(8)]);
var inst_33536 = (inst_33530 < n);
var state_33560__$1 = state_33560;
if(cljs.core.truth_(inst_33536)){
var statearr_33579_36177 = state_33560__$1;
(statearr_33579_36177[(1)] = (4));

} else {
var statearr_33580_36178 = state_33560__$1;
(statearr_33580_36178[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (11))){
var inst_33530 = (state_33560[(8)]);
var inst_33547 = (state_33560[(2)]);
var inst_33548 = (inst_33530 + (1));
var inst_33530__$1 = inst_33548;
var state_33560__$1 = (function (){var statearr_33583 = state_33560;
(statearr_33583[(8)] = inst_33530__$1);

(statearr_33583[(10)] = inst_33547);

return statearr_33583;
})();
var statearr_33584_36180 = state_33560__$1;
(statearr_33584_36180[(2)] = null);

(statearr_33584_36180[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (9))){
var state_33560__$1 = state_33560;
var statearr_33585_36183 = state_33560__$1;
(statearr_33585_36183[(2)] = null);

(statearr_33585_36183[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (5))){
var state_33560__$1 = state_33560;
var statearr_33586_36185 = state_33560__$1;
(statearr_33586_36185[(2)] = null);

(statearr_33586_36185[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (10))){
var inst_33552 = (state_33560[(2)]);
var state_33560__$1 = state_33560;
var statearr_33587_36186 = state_33560__$1;
(statearr_33587_36186[(2)] = inst_33552);

(statearr_33587_36186[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33561 === (8))){
var inst_33542 = (state_33560[(7)]);
var state_33560__$1 = state_33560;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33560__$1,(11),out,inst_33542);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_33591 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_33591[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_33591[(1)] = (1));

return statearr_33591;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33560){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33560);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33592){var ex__13968__auto__ = e33592;
var statearr_33593_36194 = state_33560;
(statearr_33593_36194[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33560[(4)]))){
var statearr_33594_36202 = state_33560;
(statearr_33594_36202[(1)] = cljs.core.first((state_33560[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36208 = state_33560;
state_33560 = G__36208;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33560){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33560);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33596 = f__14282__auto__();
(statearr_33596[(6)] = c__14281__auto___36165);

return statearr_33596;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33627 = (function (f,ch,meta33602,_,fn1,meta33628){
this.f = f;
this.ch = ch;
this.meta33602 = meta33602;
this._ = _;
this.fn1 = fn1;
this.meta33628 = meta33628;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33629,meta33628__$1){
var self__ = this;
var _33629__$1 = this;
return (new cljs.core.async.t_cljs$core$async33627(self__.f,self__.ch,self__.meta33602,self__._,self__.fn1,meta33628__$1));
}));

(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33629){
var self__ = this;
var _33629__$1 = this;
return self__.meta33628;
}));

(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async33627.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__33597_SHARP_){
var G__33631 = (((p1__33597_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__33597_SHARP_) : self__.f.call(null,p1__33597_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__33631) : f1.call(null,G__33631));
});
}));

(cljs.core.async.t_cljs$core$async33627.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33602","meta33602",830243087,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async33601","cljs.core.async/t_cljs$core$async33601",293016671,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta33628","meta33628",-1004542663,null)], null);
}));

(cljs.core.async.t_cljs$core$async33627.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33627.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33627");

(cljs.core.async.t_cljs$core$async33627.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33627");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33627.
 */
cljs.core.async.__GT_t_cljs$core$async33627 = (function cljs$core$async$__GT_t_cljs$core$async33627(f,ch,meta33602,_,fn1,meta33628){
return (new cljs.core.async.t_cljs$core$async33627(f,ch,meta33602,_,fn1,meta33628));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33601 = (function (f,ch,meta33602){
this.f = f;
this.ch = ch;
this.meta33602 = meta33602;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33603,meta33602__$1){
var self__ = this;
var _33603__$1 = this;
return (new cljs.core.async.t_cljs$core$async33601(self__.f,self__.ch,meta33602__$1));
}));

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33603){
var self__ = this;
var _33603__$1 = this;
return self__.meta33602;
}));

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async33627(self__.f,self__.ch,self__.meta33602,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__33636 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__33636) : self__.f.call(null,G__33636));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33601.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async33601.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33602","meta33602",830243087,null)], null);
}));

(cljs.core.async.t_cljs$core$async33601.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33601.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33601");

(cljs.core.async.t_cljs$core$async33601.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33601");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33601.
 */
cljs.core.async.__GT_t_cljs$core$async33601 = (function cljs$core$async$__GT_t_cljs$core$async33601(f,ch,meta33602){
return (new cljs.core.async.t_cljs$core$async33601(f,ch,meta33602));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async33601(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33640 = (function (f,ch,meta33641){
this.f = f;
this.ch = ch;
this.meta33641 = meta33641;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33642,meta33641__$1){
var self__ = this;
var _33642__$1 = this;
return (new cljs.core.async.t_cljs$core$async33640(self__.f,self__.ch,meta33641__$1));
}));

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33642){
var self__ = this;
var _33642__$1 = this;
return self__.meta33641;
}));

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33640.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async33640.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33641","meta33641",-2027156757,null)], null);
}));

(cljs.core.async.t_cljs$core$async33640.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33640.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33640");

(cljs.core.async.t_cljs$core$async33640.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33640");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33640.
 */
cljs.core.async.__GT_t_cljs$core$async33640 = (function cljs$core$async$__GT_t_cljs$core$async33640(f,ch,meta33641){
return (new cljs.core.async.t_cljs$core$async33640(f,ch,meta33641));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async33640(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33651 = (function (p,ch,meta33652){
this.p = p;
this.ch = ch;
this.meta33652 = meta33652;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33653,meta33652__$1){
var self__ = this;
var _33653__$1 = this;
return (new cljs.core.async.t_cljs$core$async33651(self__.p,self__.ch,meta33652__$1));
}));

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33653){
var self__ = this;
var _33653__$1 = this;
return self__.meta33652;
}));

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33651.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async33651.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta33652","meta33652",1543111349,null)], null);
}));

(cljs.core.async.t_cljs$core$async33651.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33651.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33651");

(cljs.core.async.t_cljs$core$async33651.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33651");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33651.
 */
cljs.core.async.__GT_t_cljs$core$async33651 = (function cljs$core$async$__GT_t_cljs$core$async33651(p,ch,meta33652){
return (new cljs.core.async.t_cljs$core$async33651(p,ch,meta33652));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async33651(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__33674 = arguments.length;
switch (G__33674) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36422 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33715){
var state_val_33716 = (state_33715[(1)]);
if((state_val_33716 === (7))){
var inst_33711 = (state_33715[(2)]);
var state_33715__$1 = state_33715;
var statearr_33723_36431 = state_33715__$1;
(statearr_33723_36431[(2)] = inst_33711);

(statearr_33723_36431[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (1))){
var state_33715__$1 = state_33715;
var statearr_33724_36434 = state_33715__$1;
(statearr_33724_36434[(2)] = null);

(statearr_33724_36434[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (4))){
var inst_33683 = (state_33715[(7)]);
var inst_33683__$1 = (state_33715[(2)]);
var inst_33692 = (inst_33683__$1 == null);
var state_33715__$1 = (function (){var statearr_33725 = state_33715;
(statearr_33725[(7)] = inst_33683__$1);

return statearr_33725;
})();
if(cljs.core.truth_(inst_33692)){
var statearr_33728_36444 = state_33715__$1;
(statearr_33728_36444[(1)] = (5));

} else {
var statearr_33729_36445 = state_33715__$1;
(statearr_33729_36445[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (6))){
var inst_33683 = (state_33715[(7)]);
var inst_33696 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_33683) : p.call(null,inst_33683));
var state_33715__$1 = state_33715;
if(cljs.core.truth_(inst_33696)){
var statearr_33731_36463 = state_33715__$1;
(statearr_33731_36463[(1)] = (8));

} else {
var statearr_33734_36464 = state_33715__$1;
(statearr_33734_36464[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (3))){
var inst_33713 = (state_33715[(2)]);
var state_33715__$1 = state_33715;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33715__$1,inst_33713);
} else {
if((state_val_33716 === (2))){
var state_33715__$1 = state_33715;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33715__$1,(4),ch);
} else {
if((state_val_33716 === (11))){
var inst_33705 = (state_33715[(2)]);
var state_33715__$1 = state_33715;
var statearr_33739_36465 = state_33715__$1;
(statearr_33739_36465[(2)] = inst_33705);

(statearr_33739_36465[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (9))){
var state_33715__$1 = state_33715;
var statearr_33740_36466 = state_33715__$1;
(statearr_33740_36466[(2)] = null);

(statearr_33740_36466[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (5))){
var inst_33694 = cljs.core.async.close_BANG_(out);
var state_33715__$1 = state_33715;
var statearr_33741_36467 = state_33715__$1;
(statearr_33741_36467[(2)] = inst_33694);

(statearr_33741_36467[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (10))){
var inst_33708 = (state_33715[(2)]);
var state_33715__$1 = (function (){var statearr_33742 = state_33715;
(statearr_33742[(8)] = inst_33708);

return statearr_33742;
})();
var statearr_33743_36471 = state_33715__$1;
(statearr_33743_36471[(2)] = null);

(statearr_33743_36471[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33716 === (8))){
var inst_33683 = (state_33715[(7)]);
var state_33715__$1 = state_33715;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33715__$1,(11),out,inst_33683);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_33751 = [null,null,null,null,null,null,null,null,null];
(statearr_33751[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_33751[(1)] = (1));

return statearr_33751;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33715){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33715);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33753){var ex__13968__auto__ = e33753;
var statearr_33754_36474 = state_33715;
(statearr_33754_36474[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33715[(4)]))){
var statearr_33756_36475 = state_33715;
(statearr_33756_36475[(1)] = cljs.core.first((state_33715[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36480 = state_33715;
state_33715 = G__36480;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33715){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33715);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33757 = f__14282__auto__();
(statearr_33757[(6)] = c__14281__auto___36422);

return statearr_33757;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__33761 = arguments.length;
switch (G__33761) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33839){
var state_val_33843 = (state_33839[(1)]);
if((state_val_33843 === (7))){
var inst_33834 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
var statearr_33844_36504 = state_33839__$1;
(statearr_33844_36504[(2)] = inst_33834);

(statearr_33844_36504[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (20))){
var inst_33798 = (state_33839[(7)]);
var inst_33815 = (state_33839[(2)]);
var inst_33816 = cljs.core.next(inst_33798);
var inst_33782 = inst_33816;
var inst_33783 = null;
var inst_33784 = (0);
var inst_33785 = (0);
var state_33839__$1 = (function (){var statearr_33860 = state_33839;
(statearr_33860[(8)] = inst_33782);

(statearr_33860[(9)] = inst_33784);

(statearr_33860[(10)] = inst_33783);

(statearr_33860[(11)] = inst_33815);

(statearr_33860[(12)] = inst_33785);

return statearr_33860;
})();
var statearr_33862_36509 = state_33839__$1;
(statearr_33862_36509[(2)] = null);

(statearr_33862_36509[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (1))){
var state_33839__$1 = state_33839;
var statearr_33875_36514 = state_33839__$1;
(statearr_33875_36514[(2)] = null);

(statearr_33875_36514[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (4))){
var inst_33771 = (state_33839[(13)]);
var inst_33771__$1 = (state_33839[(2)]);
var inst_33772 = (inst_33771__$1 == null);
var state_33839__$1 = (function (){var statearr_33878 = state_33839;
(statearr_33878[(13)] = inst_33771__$1);

return statearr_33878;
})();
if(cljs.core.truth_(inst_33772)){
var statearr_33879_36516 = state_33839__$1;
(statearr_33879_36516[(1)] = (5));

} else {
var statearr_33880_36517 = state_33839__$1;
(statearr_33880_36517[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (15))){
var state_33839__$1 = state_33839;
var statearr_33884_36518 = state_33839__$1;
(statearr_33884_36518[(2)] = null);

(statearr_33884_36518[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (21))){
var state_33839__$1 = state_33839;
var statearr_33885_36519 = state_33839__$1;
(statearr_33885_36519[(2)] = null);

(statearr_33885_36519[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (13))){
var inst_33782 = (state_33839[(8)]);
var inst_33784 = (state_33839[(9)]);
var inst_33783 = (state_33839[(10)]);
var inst_33785 = (state_33839[(12)]);
var inst_33792 = (state_33839[(2)]);
var inst_33793 = (inst_33785 + (1));
var tmp33881 = inst_33782;
var tmp33882 = inst_33784;
var tmp33883 = inst_33783;
var inst_33782__$1 = tmp33881;
var inst_33783__$1 = tmp33883;
var inst_33784__$1 = tmp33882;
var inst_33785__$1 = inst_33793;
var state_33839__$1 = (function (){var statearr_33888 = state_33839;
(statearr_33888[(8)] = inst_33782__$1);

(statearr_33888[(14)] = inst_33792);

(statearr_33888[(9)] = inst_33784__$1);

(statearr_33888[(10)] = inst_33783__$1);

(statearr_33888[(12)] = inst_33785__$1);

return statearr_33888;
})();
var statearr_33892_36520 = state_33839__$1;
(statearr_33892_36520[(2)] = null);

(statearr_33892_36520[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (22))){
var state_33839__$1 = state_33839;
var statearr_33894_36521 = state_33839__$1;
(statearr_33894_36521[(2)] = null);

(statearr_33894_36521[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (6))){
var inst_33771 = (state_33839[(13)]);
var inst_33780 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_33771) : f.call(null,inst_33771));
var inst_33781 = cljs.core.seq(inst_33780);
var inst_33782 = inst_33781;
var inst_33783 = null;
var inst_33784 = (0);
var inst_33785 = (0);
var state_33839__$1 = (function (){var statearr_33897 = state_33839;
(statearr_33897[(8)] = inst_33782);

(statearr_33897[(9)] = inst_33784);

(statearr_33897[(10)] = inst_33783);

(statearr_33897[(12)] = inst_33785);

return statearr_33897;
})();
var statearr_33898_36522 = state_33839__$1;
(statearr_33898_36522[(2)] = null);

(statearr_33898_36522[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (17))){
var inst_33798 = (state_33839[(7)]);
var inst_33807 = cljs.core.chunk_first(inst_33798);
var inst_33808 = cljs.core.chunk_rest(inst_33798);
var inst_33809 = cljs.core.count(inst_33807);
var inst_33782 = inst_33808;
var inst_33783 = inst_33807;
var inst_33784 = inst_33809;
var inst_33785 = (0);
var state_33839__$1 = (function (){var statearr_33901 = state_33839;
(statearr_33901[(8)] = inst_33782);

(statearr_33901[(9)] = inst_33784);

(statearr_33901[(10)] = inst_33783);

(statearr_33901[(12)] = inst_33785);

return statearr_33901;
})();
var statearr_33902_36523 = state_33839__$1;
(statearr_33902_36523[(2)] = null);

(statearr_33902_36523[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (3))){
var inst_33836 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33839__$1,inst_33836);
} else {
if((state_val_33843 === (12))){
var inst_33824 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
var statearr_33903_36524 = state_33839__$1;
(statearr_33903_36524[(2)] = inst_33824);

(statearr_33903_36524[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (2))){
var state_33839__$1 = state_33839;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33839__$1,(4),in$);
} else {
if((state_val_33843 === (23))){
var inst_33832 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
var statearr_33906_36529 = state_33839__$1;
(statearr_33906_36529[(2)] = inst_33832);

(statearr_33906_36529[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (19))){
var inst_33819 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
var statearr_33907_36530 = state_33839__$1;
(statearr_33907_36530[(2)] = inst_33819);

(statearr_33907_36530[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (11))){
var inst_33782 = (state_33839[(8)]);
var inst_33798 = (state_33839[(7)]);
var inst_33798__$1 = cljs.core.seq(inst_33782);
var state_33839__$1 = (function (){var statearr_33908 = state_33839;
(statearr_33908[(7)] = inst_33798__$1);

return statearr_33908;
})();
if(inst_33798__$1){
var statearr_33909_36532 = state_33839__$1;
(statearr_33909_36532[(1)] = (14));

} else {
var statearr_33911_36533 = state_33839__$1;
(statearr_33911_36533[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (9))){
var inst_33826 = (state_33839[(2)]);
var inst_33827 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_33839__$1 = (function (){var statearr_33912 = state_33839;
(statearr_33912[(15)] = inst_33826);

return statearr_33912;
})();
if(cljs.core.truth_(inst_33827)){
var statearr_33913_36534 = state_33839__$1;
(statearr_33913_36534[(1)] = (21));

} else {
var statearr_33914_36535 = state_33839__$1;
(statearr_33914_36535[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (5))){
var inst_33774 = cljs.core.async.close_BANG_(out);
var state_33839__$1 = state_33839;
var statearr_33916_36536 = state_33839__$1;
(statearr_33916_36536[(2)] = inst_33774);

(statearr_33916_36536[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (14))){
var inst_33798 = (state_33839[(7)]);
var inst_33804 = cljs.core.chunked_seq_QMARK_(inst_33798);
var state_33839__$1 = state_33839;
if(inst_33804){
var statearr_33919_36537 = state_33839__$1;
(statearr_33919_36537[(1)] = (17));

} else {
var statearr_33920_36538 = state_33839__$1;
(statearr_33920_36538[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (16))){
var inst_33822 = (state_33839[(2)]);
var state_33839__$1 = state_33839;
var statearr_33921_36539 = state_33839__$1;
(statearr_33921_36539[(2)] = inst_33822);

(statearr_33921_36539[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33843 === (10))){
var inst_33783 = (state_33839[(10)]);
var inst_33785 = (state_33839[(12)]);
var inst_33790 = cljs.core._nth(inst_33783,inst_33785);
var state_33839__$1 = state_33839;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33839__$1,(13),out,inst_33790);
} else {
if((state_val_33843 === (18))){
var inst_33798 = (state_33839[(7)]);
var inst_33813 = cljs.core.first(inst_33798);
var state_33839__$1 = state_33839;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33839__$1,(20),out,inst_33813);
} else {
if((state_val_33843 === (8))){
var inst_33784 = (state_33839[(9)]);
var inst_33785 = (state_33839[(12)]);
var inst_33787 = (inst_33785 < inst_33784);
var inst_33788 = inst_33787;
var state_33839__$1 = state_33839;
if(cljs.core.truth_(inst_33788)){
var statearr_33929_36544 = state_33839__$1;
(statearr_33929_36544[(1)] = (10));

} else {
var statearr_33933_36545 = state_33839__$1;
(statearr_33933_36545[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_33937 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33937[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__);

(statearr_33937[(1)] = (1));

return statearr_33937;
});
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1 = (function (state_33839){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33839);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e33941){var ex__13968__auto__ = e33941;
var statearr_33942_36546 = state_33839;
(statearr_33942_36546[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33839[(4)]))){
var statearr_33943_36547 = state_33839;
(statearr_33943_36547[(1)] = cljs.core.first((state_33839[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36549 = state_33839;
state_33839 = G__36549;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__ = function(state_33839){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1.call(this,state_33839);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_33945 = f__14282__auto__();
(statearr_33945[(6)] = c__14281__auto__);

return statearr_33945;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__33950 = arguments.length;
switch (G__33950) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__33955 = arguments.length;
switch (G__33955) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__33961 = arguments.length;
switch (G__33961) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36567 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_33990){
var state_val_33991 = (state_33990[(1)]);
if((state_val_33991 === (7))){
var inst_33984 = (state_33990[(2)]);
var state_33990__$1 = state_33990;
var statearr_34001_36568 = state_33990__$1;
(statearr_34001_36568[(2)] = inst_33984);

(statearr_34001_36568[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (1))){
var inst_33966 = null;
var state_33990__$1 = (function (){var statearr_34002 = state_33990;
(statearr_34002[(7)] = inst_33966);

return statearr_34002;
})();
var statearr_34003_36573 = state_33990__$1;
(statearr_34003_36573[(2)] = null);

(statearr_34003_36573[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (4))){
var inst_33969 = (state_33990[(8)]);
var inst_33969__$1 = (state_33990[(2)]);
var inst_33970 = (inst_33969__$1 == null);
var inst_33971 = cljs.core.not(inst_33970);
var state_33990__$1 = (function (){var statearr_34007 = state_33990;
(statearr_34007[(8)] = inst_33969__$1);

return statearr_34007;
})();
if(inst_33971){
var statearr_34008_36574 = state_33990__$1;
(statearr_34008_36574[(1)] = (5));

} else {
var statearr_34009_36575 = state_33990__$1;
(statearr_34009_36575[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (6))){
var state_33990__$1 = state_33990;
var statearr_34013_36578 = state_33990__$1;
(statearr_34013_36578[(2)] = null);

(statearr_34013_36578[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (3))){
var inst_33986 = (state_33990[(2)]);
var inst_33987 = cljs.core.async.close_BANG_(out);
var state_33990__$1 = (function (){var statearr_34014 = state_33990;
(statearr_34014[(9)] = inst_33986);

return statearr_34014;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_33990__$1,inst_33987);
} else {
if((state_val_33991 === (2))){
var state_33990__$1 = state_33990;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33990__$1,(4),ch);
} else {
if((state_val_33991 === (11))){
var inst_33969 = (state_33990[(8)]);
var inst_33978 = (state_33990[(2)]);
var inst_33966 = inst_33969;
var state_33990__$1 = (function (){var statearr_34017 = state_33990;
(statearr_34017[(10)] = inst_33978);

(statearr_34017[(7)] = inst_33966);

return statearr_34017;
})();
var statearr_34019_36594 = state_33990__$1;
(statearr_34019_36594[(2)] = null);

(statearr_34019_36594[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (9))){
var inst_33969 = (state_33990[(8)]);
var state_33990__$1 = state_33990;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33990__$1,(11),out,inst_33969);
} else {
if((state_val_33991 === (5))){
var inst_33969 = (state_33990[(8)]);
var inst_33966 = (state_33990[(7)]);
var inst_33973 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_33969,inst_33966);
var state_33990__$1 = state_33990;
if(inst_33973){
var statearr_34031_36607 = state_33990__$1;
(statearr_34031_36607[(1)] = (8));

} else {
var statearr_34032_36608 = state_33990__$1;
(statearr_34032_36608[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (10))){
var inst_33981 = (state_33990[(2)]);
var state_33990__$1 = state_33990;
var statearr_34033_36631 = state_33990__$1;
(statearr_34033_36631[(2)] = inst_33981);

(statearr_34033_36631[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33991 === (8))){
var inst_33966 = (state_33990[(7)]);
var tmp34030 = inst_33966;
var inst_33966__$1 = tmp34030;
var state_33990__$1 = (function (){var statearr_34037 = state_33990;
(statearr_34037[(7)] = inst_33966__$1);

return statearr_34037;
})();
var statearr_34038_36644 = state_33990__$1;
(statearr_34038_36644[(2)] = null);

(statearr_34038_36644[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_34039 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34039[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_34039[(1)] = (1));

return statearr_34039;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_33990){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_33990);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e34040){var ex__13968__auto__ = e34040;
var statearr_34041_36674 = state_33990;
(statearr_34041_36674[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_33990[(4)]))){
var statearr_34042_36685 = state_33990;
(statearr_34042_36685[(1)] = cljs.core.first((state_33990[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36696 = state_33990;
state_33990 = G__36696;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_33990){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_33990);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_34043 = f__14282__auto__();
(statearr_34043[(6)] = c__14281__auto___36567);

return statearr_34043;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__34048 = arguments.length;
switch (G__34048) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36706 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_34089){
var state_val_34090 = (state_34089[(1)]);
if((state_val_34090 === (7))){
var inst_34085 = (state_34089[(2)]);
var state_34089__$1 = state_34089;
var statearr_34094_36707 = state_34089__$1;
(statearr_34094_36707[(2)] = inst_34085);

(statearr_34094_36707[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (1))){
var inst_34052 = (new Array(n));
var inst_34053 = inst_34052;
var inst_34054 = (0);
var state_34089__$1 = (function (){var statearr_34099 = state_34089;
(statearr_34099[(7)] = inst_34054);

(statearr_34099[(8)] = inst_34053);

return statearr_34099;
})();
var statearr_34103_36708 = state_34089__$1;
(statearr_34103_36708[(2)] = null);

(statearr_34103_36708[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (4))){
var inst_34057 = (state_34089[(9)]);
var inst_34057__$1 = (state_34089[(2)]);
var inst_34058 = (inst_34057__$1 == null);
var inst_34059 = cljs.core.not(inst_34058);
var state_34089__$1 = (function (){var statearr_34110 = state_34089;
(statearr_34110[(9)] = inst_34057__$1);

return statearr_34110;
})();
if(inst_34059){
var statearr_34111_36713 = state_34089__$1;
(statearr_34111_36713[(1)] = (5));

} else {
var statearr_34112_36714 = state_34089__$1;
(statearr_34112_36714[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (15))){
var inst_34079 = (state_34089[(2)]);
var state_34089__$1 = state_34089;
var statearr_34113_36715 = state_34089__$1;
(statearr_34113_36715[(2)] = inst_34079);

(statearr_34113_36715[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (13))){
var state_34089__$1 = state_34089;
var statearr_34114_36716 = state_34089__$1;
(statearr_34114_36716[(2)] = null);

(statearr_34114_36716[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (6))){
var inst_34054 = (state_34089[(7)]);
var inst_34075 = (inst_34054 > (0));
var state_34089__$1 = state_34089;
if(cljs.core.truth_(inst_34075)){
var statearr_34125_36717 = state_34089__$1;
(statearr_34125_36717[(1)] = (12));

} else {
var statearr_34126_36719 = state_34089__$1;
(statearr_34126_36719[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (3))){
var inst_34087 = (state_34089[(2)]);
var state_34089__$1 = state_34089;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34089__$1,inst_34087);
} else {
if((state_val_34090 === (12))){
var inst_34053 = (state_34089[(8)]);
var inst_34077 = cljs.core.vec(inst_34053);
var state_34089__$1 = state_34089;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34089__$1,(15),out,inst_34077);
} else {
if((state_val_34090 === (2))){
var state_34089__$1 = state_34089;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34089__$1,(4),ch);
} else {
if((state_val_34090 === (11))){
var inst_34069 = (state_34089[(2)]);
var inst_34070 = (new Array(n));
var inst_34053 = inst_34070;
var inst_34054 = (0);
var state_34089__$1 = (function (){var statearr_34144 = state_34089;
(statearr_34144[(10)] = inst_34069);

(statearr_34144[(7)] = inst_34054);

(statearr_34144[(8)] = inst_34053);

return statearr_34144;
})();
var statearr_34145_36723 = state_34089__$1;
(statearr_34145_36723[(2)] = null);

(statearr_34145_36723[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (9))){
var inst_34053 = (state_34089[(8)]);
var inst_34067 = cljs.core.vec(inst_34053);
var state_34089__$1 = state_34089;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34089__$1,(11),out,inst_34067);
} else {
if((state_val_34090 === (5))){
var inst_34062 = (state_34089[(11)]);
var inst_34054 = (state_34089[(7)]);
var inst_34057 = (state_34089[(9)]);
var inst_34053 = (state_34089[(8)]);
var inst_34061 = (inst_34053[inst_34054] = inst_34057);
var inst_34062__$1 = (inst_34054 + (1));
var inst_34063 = (inst_34062__$1 < n);
var state_34089__$1 = (function (){var statearr_34146 = state_34089;
(statearr_34146[(12)] = inst_34061);

(statearr_34146[(11)] = inst_34062__$1);

return statearr_34146;
})();
if(cljs.core.truth_(inst_34063)){
var statearr_34147_36725 = state_34089__$1;
(statearr_34147_36725[(1)] = (8));

} else {
var statearr_34148_36726 = state_34089__$1;
(statearr_34148_36726[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (14))){
var inst_34082 = (state_34089[(2)]);
var inst_34083 = cljs.core.async.close_BANG_(out);
var state_34089__$1 = (function (){var statearr_34150 = state_34089;
(statearr_34150[(13)] = inst_34082);

return statearr_34150;
})();
var statearr_34151_36728 = state_34089__$1;
(statearr_34151_36728[(2)] = inst_34083);

(statearr_34151_36728[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (10))){
var inst_34073 = (state_34089[(2)]);
var state_34089__$1 = state_34089;
var statearr_34154_36729 = state_34089__$1;
(statearr_34154_36729[(2)] = inst_34073);

(statearr_34154_36729[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34090 === (8))){
var inst_34062 = (state_34089[(11)]);
var inst_34053 = (state_34089[(8)]);
var tmp34149 = inst_34053;
var inst_34053__$1 = tmp34149;
var inst_34054 = inst_34062;
var state_34089__$1 = (function (){var statearr_34155 = state_34089;
(statearr_34155[(7)] = inst_34054);

(statearr_34155[(8)] = inst_34053__$1);

return statearr_34155;
})();
var statearr_34156_36730 = state_34089__$1;
(statearr_34156_36730[(2)] = null);

(statearr_34156_36730[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_34157 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34157[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_34157[(1)] = (1));

return statearr_34157;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_34089){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_34089);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e34158){var ex__13968__auto__ = e34158;
var statearr_34159_36731 = state_34089;
(statearr_34159_36731[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_34089[(4)]))){
var statearr_34160_36733 = state_34089;
(statearr_34160_36733[(1)] = cljs.core.first((state_34089[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36734 = state_34089;
state_34089 = G__36734;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_34089){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_34089);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_34161 = f__14282__auto__();
(statearr_34161[(6)] = c__14281__auto___36706);

return statearr_34161;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__34163 = arguments.length;
switch (G__34163) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___36743 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_34215){
var state_val_34216 = (state_34215[(1)]);
if((state_val_34216 === (7))){
var inst_34211 = (state_34215[(2)]);
var state_34215__$1 = state_34215;
var statearr_34217_36749 = state_34215__$1;
(statearr_34217_36749[(2)] = inst_34211);

(statearr_34217_36749[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (1))){
var inst_34170 = [];
var inst_34171 = inst_34170;
var inst_34172 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_34215__$1 = (function (){var statearr_34218 = state_34215;
(statearr_34218[(7)] = inst_34171);

(statearr_34218[(8)] = inst_34172);

return statearr_34218;
})();
var statearr_34219_36753 = state_34215__$1;
(statearr_34219_36753[(2)] = null);

(statearr_34219_36753[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (4))){
var inst_34176 = (state_34215[(9)]);
var inst_34176__$1 = (state_34215[(2)]);
var inst_34177 = (inst_34176__$1 == null);
var inst_34178 = cljs.core.not(inst_34177);
var state_34215__$1 = (function (){var statearr_34220 = state_34215;
(statearr_34220[(9)] = inst_34176__$1);

return statearr_34220;
})();
if(inst_34178){
var statearr_34221_36756 = state_34215__$1;
(statearr_34221_36756[(1)] = (5));

} else {
var statearr_34222_36760 = state_34215__$1;
(statearr_34222_36760[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (15))){
var inst_34171 = (state_34215[(7)]);
var inst_34203 = cljs.core.vec(inst_34171);
var state_34215__$1 = state_34215;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34215__$1,(18),out,inst_34203);
} else {
if((state_val_34216 === (13))){
var inst_34198 = (state_34215[(2)]);
var state_34215__$1 = state_34215;
var statearr_34223_36761 = state_34215__$1;
(statearr_34223_36761[(2)] = inst_34198);

(statearr_34223_36761[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (6))){
var inst_34171 = (state_34215[(7)]);
var inst_34200 = inst_34171.length;
var inst_34201 = (inst_34200 > (0));
var state_34215__$1 = state_34215;
if(cljs.core.truth_(inst_34201)){
var statearr_34224_36764 = state_34215__$1;
(statearr_34224_36764[(1)] = (15));

} else {
var statearr_34226_36765 = state_34215__$1;
(statearr_34226_36765[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (17))){
var inst_34208 = (state_34215[(2)]);
var inst_34209 = cljs.core.async.close_BANG_(out);
var state_34215__$1 = (function (){var statearr_34228 = state_34215;
(statearr_34228[(10)] = inst_34208);

return statearr_34228;
})();
var statearr_34229_36767 = state_34215__$1;
(statearr_34229_36767[(2)] = inst_34209);

(statearr_34229_36767[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (3))){
var inst_34213 = (state_34215[(2)]);
var state_34215__$1 = state_34215;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34215__$1,inst_34213);
} else {
if((state_val_34216 === (12))){
var inst_34171 = (state_34215[(7)]);
var inst_34191 = cljs.core.vec(inst_34171);
var state_34215__$1 = state_34215;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34215__$1,(14),out,inst_34191);
} else {
if((state_val_34216 === (2))){
var state_34215__$1 = state_34215;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34215__$1,(4),ch);
} else {
if((state_val_34216 === (11))){
var inst_34171 = (state_34215[(7)]);
var inst_34180 = (state_34215[(11)]);
var inst_34176 = (state_34215[(9)]);
var inst_34188 = inst_34171.push(inst_34176);
var tmp34230 = inst_34171;
var inst_34171__$1 = tmp34230;
var inst_34172 = inst_34180;
var state_34215__$1 = (function (){var statearr_34242 = state_34215;
(statearr_34242[(7)] = inst_34171__$1);

(statearr_34242[(12)] = inst_34188);

(statearr_34242[(8)] = inst_34172);

return statearr_34242;
})();
var statearr_34243_36769 = state_34215__$1;
(statearr_34243_36769[(2)] = null);

(statearr_34243_36769[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (9))){
var inst_34172 = (state_34215[(8)]);
var inst_34184 = cljs.core.keyword_identical_QMARK_(inst_34172,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_34215__$1 = state_34215;
var statearr_34244_36771 = state_34215__$1;
(statearr_34244_36771[(2)] = inst_34184);

(statearr_34244_36771[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (5))){
var inst_34180 = (state_34215[(11)]);
var inst_34172 = (state_34215[(8)]);
var inst_34181 = (state_34215[(13)]);
var inst_34176 = (state_34215[(9)]);
var inst_34180__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_34176) : f.call(null,inst_34176));
var inst_34181__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_34180__$1,inst_34172);
var state_34215__$1 = (function (){var statearr_34245 = state_34215;
(statearr_34245[(11)] = inst_34180__$1);

(statearr_34245[(13)] = inst_34181__$1);

return statearr_34245;
})();
if(inst_34181__$1){
var statearr_34247_36777 = state_34215__$1;
(statearr_34247_36777[(1)] = (8));

} else {
var statearr_34248_36778 = state_34215__$1;
(statearr_34248_36778[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (14))){
var inst_34180 = (state_34215[(11)]);
var inst_34176 = (state_34215[(9)]);
var inst_34193 = (state_34215[(2)]);
var inst_34194 = [];
var inst_34195 = inst_34194.push(inst_34176);
var inst_34171 = inst_34194;
var inst_34172 = inst_34180;
var state_34215__$1 = (function (){var statearr_34250 = state_34215;
(statearr_34250[(7)] = inst_34171);

(statearr_34250[(14)] = inst_34193);

(statearr_34250[(8)] = inst_34172);

(statearr_34250[(15)] = inst_34195);

return statearr_34250;
})();
var statearr_34251_36785 = state_34215__$1;
(statearr_34251_36785[(2)] = null);

(statearr_34251_36785[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (16))){
var state_34215__$1 = state_34215;
var statearr_34252_36790 = state_34215__$1;
(statearr_34252_36790[(2)] = null);

(statearr_34252_36790[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (10))){
var inst_34186 = (state_34215[(2)]);
var state_34215__$1 = state_34215;
if(cljs.core.truth_(inst_34186)){
var statearr_34253_36791 = state_34215__$1;
(statearr_34253_36791[(1)] = (11));

} else {
var statearr_34254_36792 = state_34215__$1;
(statearr_34254_36792[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (18))){
var inst_34205 = (state_34215[(2)]);
var state_34215__$1 = state_34215;
var statearr_34255_36793 = state_34215__$1;
(statearr_34255_36793[(2)] = inst_34205);

(statearr_34255_36793[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34216 === (8))){
var inst_34181 = (state_34215[(13)]);
var state_34215__$1 = state_34215;
var statearr_34256_36800 = state_34215__$1;
(statearr_34256_36800[(2)] = inst_34181);

(statearr_34256_36800[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_34257 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34257[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_34257[(1)] = (1));

return statearr_34257;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_34215){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_34215);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e34258){var ex__13968__auto__ = e34258;
var statearr_34259_36807 = state_34215;
(statearr_34259_36807[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_34215[(4)]))){
var statearr_34260_36808 = state_34215;
(statearr_34260_36808[(1)] = cljs.core.first((state_34215[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36809 = state_34215;
state_34215 = G__36809;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_34215){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_34215);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_34261 = f__14282__auto__();
(statearr_34261[(6)] = c__14281__auto___36743);

return statearr_34261;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
