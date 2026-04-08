goog.provide('camel_snake_kebab.core');



























/**
 * Converts the case of a string according to the rule for the first
 *   word, remaining words, and the separator.
 */
camel_snake_kebab.core.convert_case = (function camel_snake_kebab$core$convert_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39450 = arguments.length;
var i__5770__auto___39451 = (0);
while(true){
if((i__5770__auto___39451 < len__5769__auto___39450)){
args__5775__auto__.push((arguments[i__5770__auto___39451]));

var G__39452 = (i__5770__auto___39451 + (1));
i__5770__auto___39451 = G__39452;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((4) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((4)),(0),null)):null);
return camel_snake_kebab.core.convert_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.convert_case.cljs$core$IFn$_invoke$arity$variadic = (function (first_fn,rest_fn,sep,s,rest){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,first_fn,rest_fn,sep,s,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest], 0));
}));

(camel_snake_kebab.core.convert_case.cljs$lang$maxFixedArity = (4));

/** @this {Function} */
(camel_snake_kebab.core.convert_case.cljs$lang$applyTo = (function (seq39388){
var G__39389 = cljs.core.first(seq39388);
var seq39388__$1 = cljs.core.next(seq39388);
var G__39390 = cljs.core.first(seq39388__$1);
var seq39388__$2 = cljs.core.next(seq39388__$1);
var G__39391 = cljs.core.first(seq39388__$2);
var seq39388__$3 = cljs.core.next(seq39388__$2);
var G__39392 = cljs.core.first(seq39388__$3);
var seq39388__$4 = cljs.core.next(seq39388__$3);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39389,G__39390,G__39391,G__39392,seq39388__$4);
}));

camel_snake_kebab.core.__GT_PascalCase = (function camel_snake_kebab$core$__GT_PascalCase(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39453 = arguments.length;
var i__5770__auto___39454 = (0);
while(true){
if((i__5770__auto___39454 < len__5769__auto___39453)){
args__5775__auto__.push((arguments[i__5770__auto___39454]));

var G__39455 = (i__5770__auto___39454 + (1));
i__5770__auto___39454 = G__39455;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCase.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCase.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_PascalCase.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCase.cljs$lang$applyTo = (function (seq39393){
var G__39394 = cljs.core.first(seq39393);
var seq39393__$1 = cljs.core.next(seq39393);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39394,seq39393__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseString = (function camel_snake_kebab$core$__GT_PascalCaseString(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39456 = arguments.length;
var i__5770__auto___39457 = (0);
while(true){
if((i__5770__auto___39457 < len__5769__auto___39456)){
args__5775__auto__.push((arguments[i__5770__auto___39457]));

var G__39458 = (i__5770__auto___39457 + (1));
i__5770__auto___39457 = G__39458;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseString.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseString.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseString.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseString.cljs$lang$applyTo = (function (seq39395){
var G__39396 = cljs.core.first(seq39395);
var seq39395__$1 = cljs.core.next(seq39395);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39396,seq39395__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseSymbol = (function camel_snake_kebab$core$__GT_PascalCaseSymbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39459 = arguments.length;
var i__5770__auto___39460 = (0);
while(true){
if((i__5770__auto___39460 < len__5769__auto___39459)){
args__5775__auto__.push((arguments[i__5770__auto___39460]));

var G__39461 = (i__5770__auto___39460 + (1));
i__5770__auto___39460 = G__39461;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$lang$applyTo = (function (seq39397){
var G__39398 = cljs.core.first(seq39397);
var seq39397__$1 = cljs.core.next(seq39397);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39398,seq39397__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseKeyword = (function camel_snake_kebab$core$__GT_PascalCaseKeyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39462 = arguments.length;
var i__5770__auto___39463 = (0);
while(true){
if((i__5770__auto___39463 < len__5769__auto___39462)){
args__5775__auto__.push((arguments[i__5770__auto___39463]));

var G__39464 = (i__5770__auto___39463 + (1));
i__5770__auto___39463 = G__39464;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$lang$applyTo = (function (seq39399){
var G__39400 = cljs.core.first(seq39399);
var seq39399__$1 = cljs.core.next(seq39399);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39400,seq39399__$1);
}));

camel_snake_kebab.core.__GT_Camel_Snake_Case = (function camel_snake_kebab$core$__GT_Camel_Snake_Case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39465 = arguments.length;
var i__5770__auto___39466 = (0);
while(true){
if((i__5770__auto___39466 < len__5769__auto___39465)){
args__5775__auto__.push((arguments[i__5770__auto___39466]));

var G__39467 = (i__5770__auto___39466 + (1));
i__5770__auto___39466 = G__39467;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$lang$applyTo = (function (seq39401){
var G__39402 = cljs.core.first(seq39401);
var seq39401__$1 = cljs.core.next(seq39401);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39402,seq39401__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_String = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_String(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39471 = arguments.length;
var i__5770__auto___39472 = (0);
while(true){
if((i__5770__auto___39472 < len__5769__auto___39471)){
args__5775__auto__.push((arguments[i__5770__auto___39472]));

var G__39473 = (i__5770__auto___39472 + (1));
i__5770__auto___39472 = G__39473;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$lang$applyTo = (function (seq39403){
var G__39404 = cljs.core.first(seq39403);
var seq39403__$1 = cljs.core.next(seq39403);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39404,seq39403__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_Symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39474 = arguments.length;
var i__5770__auto___39475 = (0);
while(true){
if((i__5770__auto___39475 < len__5769__auto___39474)){
args__5775__auto__.push((arguments[i__5770__auto___39475]));

var G__39476 = (i__5770__auto___39475 + (1));
i__5770__auto___39475 = G__39476;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$lang$applyTo = (function (seq39405){
var G__39406 = cljs.core.first(seq39405);
var seq39405__$1 = cljs.core.next(seq39405);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39406,seq39405__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_Keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39479 = arguments.length;
var i__5770__auto___39480 = (0);
while(true){
if((i__5770__auto___39480 < len__5769__auto___39479)){
args__5775__auto__.push((arguments[i__5770__auto___39480]));

var G__39481 = (i__5770__auto___39480 + (1));
i__5770__auto___39480 = G__39481;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$lang$applyTo = (function (seq39407){
var G__39408 = cljs.core.first(seq39407);
var seq39407__$1 = cljs.core.next(seq39407);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39408,seq39407__$1);
}));

camel_snake_kebab.core.__GT_camelCase = (function camel_snake_kebab$core$__GT_camelCase(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39482 = arguments.length;
var i__5770__auto___39483 = (0);
while(true){
if((i__5770__auto___39483 < len__5769__auto___39482)){
args__5775__auto__.push((arguments[i__5770__auto___39483]));

var G__39484 = (i__5770__auto___39483 + (1));
i__5770__auto___39483 = G__39484;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCase.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCase.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_camelCase.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCase.cljs$lang$applyTo = (function (seq39409){
var G__39410 = cljs.core.first(seq39409);
var seq39409__$1 = cljs.core.next(seq39409);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39410,seq39409__$1);
}));


camel_snake_kebab.core.__GT_camelCaseString = (function camel_snake_kebab$core$__GT_camelCaseString(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39486 = arguments.length;
var i__5770__auto___39487 = (0);
while(true){
if((i__5770__auto___39487 < len__5769__auto___39486)){
args__5775__auto__.push((arguments[i__5770__auto___39487]));

var G__39489 = (i__5770__auto___39487 + (1));
i__5770__auto___39487 = G__39489;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseString.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseString.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseString.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseString.cljs$lang$applyTo = (function (seq39411){
var G__39412 = cljs.core.first(seq39411);
var seq39411__$1 = cljs.core.next(seq39411);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39412,seq39411__$1);
}));


camel_snake_kebab.core.__GT_camelCaseSymbol = (function camel_snake_kebab$core$__GT_camelCaseSymbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39490 = arguments.length;
var i__5770__auto___39491 = (0);
while(true){
if((i__5770__auto___39491 < len__5769__auto___39490)){
args__5775__auto__.push((arguments[i__5770__auto___39491]));

var G__39492 = (i__5770__auto___39491 + (1));
i__5770__auto___39491 = G__39492;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$lang$applyTo = (function (seq39413){
var G__39414 = cljs.core.first(seq39413);
var seq39413__$1 = cljs.core.next(seq39413);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39414,seq39413__$1);
}));


camel_snake_kebab.core.__GT_camelCaseKeyword = (function camel_snake_kebab$core$__GT_camelCaseKeyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39493 = arguments.length;
var i__5770__auto___39494 = (0);
while(true){
if((i__5770__auto___39494 < len__5769__auto___39493)){
args__5775__auto__.push((arguments[i__5770__auto___39494]));

var G__39495 = (i__5770__auto___39494 + (1));
i__5770__auto___39494 = G__39495;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$lang$applyTo = (function (seq39415){
var G__39416 = cljs.core.first(seq39415);
var seq39415__$1 = cljs.core.next(seq39415);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39416,seq39415__$1);
}));

camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39496 = arguments.length;
var i__5770__auto___39497 = (0);
while(true){
if((i__5770__auto___39497 < len__5769__auto___39496)){
args__5775__auto__.push((arguments[i__5770__auto___39497]));

var G__39498 = (i__5770__auto___39497 + (1));
i__5770__auto___39497 = G__39498;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$lang$applyTo = (function (seq39417){
var G__39418 = cljs.core.first(seq39417);
var seq39417__$1 = cljs.core.next(seq39417);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39418,seq39417__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_STRING(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39499 = arguments.length;
var i__5770__auto___39500 = (0);
while(true){
if((i__5770__auto___39500 < len__5769__auto___39499)){
args__5775__auto__.push((arguments[i__5770__auto___39500]));

var G__39501 = (i__5770__auto___39500 + (1));
i__5770__auto___39500 = G__39501;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$lang$applyTo = (function (seq39419){
var G__39420 = cljs.core.first(seq39419);
var seq39419__$1 = cljs.core.next(seq39419);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39420,seq39419__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_SYMBOL(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39502 = arguments.length;
var i__5770__auto___39503 = (0);
while(true){
if((i__5770__auto___39503 < len__5769__auto___39502)){
args__5775__auto__.push((arguments[i__5770__auto___39503]));

var G__39504 = (i__5770__auto___39503 + (1));
i__5770__auto___39503 = G__39504;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$lang$applyTo = (function (seq39421){
var G__39422 = cljs.core.first(seq39421);
var seq39421__$1 = cljs.core.next(seq39421);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39422,seq39421__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_KEYWORD(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39505 = arguments.length;
var i__5770__auto___39506 = (0);
while(true){
if((i__5770__auto___39506 < len__5769__auto___39505)){
args__5775__auto__.push((arguments[i__5770__auto___39506]));

var G__39507 = (i__5770__auto___39506 + (1));
i__5770__auto___39506 = G__39507;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$lang$applyTo = (function (seq39423){
var G__39424 = cljs.core.first(seq39423);
var seq39423__$1 = cljs.core.next(seq39423);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39424,seq39423__$1);
}));

camel_snake_kebab.core.__GT_snake_case = (function camel_snake_kebab$core$__GT_snake_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39514 = arguments.length;
var i__5770__auto___39515 = (0);
while(true){
if((i__5770__auto___39515 < len__5769__auto___39514)){
args__5775__auto__.push((arguments[i__5770__auto___39515]));

var G__39516 = (i__5770__auto___39515 + (1));
i__5770__auto___39515 = G__39516;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_snake_case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case.cljs$lang$applyTo = (function (seq39425){
var G__39426 = cljs.core.first(seq39425);
var seq39425__$1 = cljs.core.next(seq39425);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39426,seq39425__$1);
}));


camel_snake_kebab.core.__GT_snake_case_string = (function camel_snake_kebab$core$__GT_snake_case_string(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39517 = arguments.length;
var i__5770__auto___39518 = (0);
while(true){
if((i__5770__auto___39518 < len__5769__auto___39517)){
args__5775__auto__.push((arguments[i__5770__auto___39518]));

var G__39519 = (i__5770__auto___39518 + (1));
i__5770__auto___39518 = G__39519;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_string.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_string.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_string.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_string.cljs$lang$applyTo = (function (seq39427){
var G__39428 = cljs.core.first(seq39427);
var seq39427__$1 = cljs.core.next(seq39427);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39428,seq39427__$1);
}));


camel_snake_kebab.core.__GT_snake_case_symbol = (function camel_snake_kebab$core$__GT_snake_case_symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39520 = arguments.length;
var i__5770__auto___39521 = (0);
while(true){
if((i__5770__auto___39521 < len__5769__auto___39520)){
args__5775__auto__.push((arguments[i__5770__auto___39521]));

var G__39522 = (i__5770__auto___39521 + (1));
i__5770__auto___39521 = G__39522;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$lang$applyTo = (function (seq39429){
var G__39430 = cljs.core.first(seq39429);
var seq39429__$1 = cljs.core.next(seq39429);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39430,seq39429__$1);
}));


camel_snake_kebab.core.__GT_snake_case_keyword = (function camel_snake_kebab$core$__GT_snake_case_keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39526 = arguments.length;
var i__5770__auto___39527 = (0);
while(true){
if((i__5770__auto___39527 < len__5769__auto___39526)){
args__5775__auto__.push((arguments[i__5770__auto___39527]));

var G__39528 = (i__5770__auto___39527 + (1));
i__5770__auto___39527 = G__39528;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$lang$applyTo = (function (seq39431){
var G__39432 = cljs.core.first(seq39431);
var seq39431__$1 = cljs.core.next(seq39431);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39432,seq39431__$1);
}));

camel_snake_kebab.core.__GT_kebab_case = (function camel_snake_kebab$core$__GT_kebab_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39534 = arguments.length;
var i__5770__auto___39535 = (0);
while(true){
if((i__5770__auto___39535 < len__5769__auto___39534)){
args__5775__auto__.push((arguments[i__5770__auto___39535]));

var G__39536 = (i__5770__auto___39535 + (1));
i__5770__auto___39535 = G__39536;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_kebab_case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case.cljs$lang$applyTo = (function (seq39433){
var G__39434 = cljs.core.first(seq39433);
var seq39433__$1 = cljs.core.next(seq39433);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39434,seq39433__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_string = (function camel_snake_kebab$core$__GT_kebab_case_string(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39537 = arguments.length;
var i__5770__auto___39538 = (0);
while(true){
if((i__5770__auto___39538 < len__5769__auto___39537)){
args__5775__auto__.push((arguments[i__5770__auto___39538]));

var G__39539 = (i__5770__auto___39538 + (1));
i__5770__auto___39538 = G__39539;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_string.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_string.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_string.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_string.cljs$lang$applyTo = (function (seq39435){
var G__39436 = cljs.core.first(seq39435);
var seq39435__$1 = cljs.core.next(seq39435);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39436,seq39435__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_symbol = (function camel_snake_kebab$core$__GT_kebab_case_symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39540 = arguments.length;
var i__5770__auto___39541 = (0);
while(true){
if((i__5770__auto___39541 < len__5769__auto___39540)){
args__5775__auto__.push((arguments[i__5770__auto___39541]));

var G__39542 = (i__5770__auto___39541 + (1));
i__5770__auto___39541 = G__39542;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$lang$applyTo = (function (seq39437){
var G__39438 = cljs.core.first(seq39437);
var seq39437__$1 = cljs.core.next(seq39437);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39438,seq39437__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_keyword = (function camel_snake_kebab$core$__GT_kebab_case_keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39543 = arguments.length;
var i__5770__auto___39544 = (0);
while(true){
if((i__5770__auto___39544 < len__5769__auto___39543)){
args__5775__auto__.push((arguments[i__5770__auto___39544]));

var G__39545 = (i__5770__auto___39544 + (1));
i__5770__auto___39544 = G__39545;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$lang$applyTo = (function (seq39439){
var G__39440 = cljs.core.first(seq39439);
var seq39439__$1 = cljs.core.next(seq39439);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39440,seq39439__$1);
}));

camel_snake_kebab.core.__GT_HTTP_Header_Case = (function camel_snake_kebab$core$__GT_HTTP_Header_Case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39552 = arguments.length;
var i__5770__auto___39553 = (0);
while(true){
if((i__5770__auto___39553 < len__5769__auto___39552)){
args__5775__auto__.push((arguments[i__5770__auto___39553]));

var G__39554 = (i__5770__auto___39553 + (1));
i__5770__auto___39553 = G__39554;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$core$IFn$_invoke$arity$variadic = (function (s__23835__auto__,rest__23836__auto__){
var convert_case__23837__auto__ = (function (p1__23834__23838__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",p1__23834__23838__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23836__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__23835__auto__,convert_case__23837__auto__);
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$lang$applyTo = (function (seq39441){
var G__39442 = cljs.core.first(seq39441);
var seq39441__$1 = cljs.core.next(seq39441);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39442,seq39441__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_String = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_String(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39557 = arguments.length;
var i__5770__auto___39558 = (0);
while(true){
if((i__5770__auto___39558 < len__5769__auto___39557)){
args__5775__auto__.push((arguments[i__5770__auto___39558]));

var G__39559 = (i__5770__auto___39558 + (1));
i__5770__auto___39558 = G__39559;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$lang$applyTo = (function (seq39443){
var G__39444 = cljs.core.first(seq39443);
var seq39443__$1 = cljs.core.next(seq39443);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39444,seq39443__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_Symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39560 = arguments.length;
var i__5770__auto___39561 = (0);
while(true){
if((i__5770__auto___39561 < len__5769__auto___39560)){
args__5775__auto__.push((arguments[i__5770__auto___39561]));

var G__39562 = (i__5770__auto___39561 + (1));
i__5770__auto___39561 = G__39562;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$lang$applyTo = (function (seq39445){
var G__39446 = cljs.core.first(seq39445);
var seq39445__$1 = cljs.core.next(seq39445);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39446,seq39445__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_Keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39586 = arguments.length;
var i__5770__auto___39591 = (0);
while(true){
if((i__5770__auto___39591 < len__5769__auto___39586)){
args__5775__auto__.push((arguments[i__5770__auto___39591]));

var G__39592 = (i__5770__auto___39591 + (1));
i__5770__auto___39591 = G__39592;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__23840__auto__,rest__23841__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__23840__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__23841__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$lang$applyTo = (function (seq39447){
var G__39448 = cljs.core.first(seq39447);
var seq39447__$1 = cljs.core.next(seq39447);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39448,seq39447__$1);
}));


//# sourceMappingURL=camel_snake_kebab.core.js.map
