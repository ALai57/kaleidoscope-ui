goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__35178){
var map__35179 = p__35178;
var map__35179__$1 = cljs.core.__destructure_map(map__35179);
var m = map__35179__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35179__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35179__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__35205_35746 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__35206_35747 = null;
var count__35207_35748 = (0);
var i__35208_35749 = (0);
while(true){
if((i__35208_35749 < count__35207_35748)){
var f_35763 = chunk__35206_35747.cljs$core$IIndexed$_nth$arity$2(null,i__35208_35749);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_35763], 0));


var G__35765 = seq__35205_35746;
var G__35766 = chunk__35206_35747;
var G__35767 = count__35207_35748;
var G__35768 = (i__35208_35749 + (1));
seq__35205_35746 = G__35765;
chunk__35206_35747 = G__35766;
count__35207_35748 = G__35767;
i__35208_35749 = G__35768;
continue;
} else {
var temp__5804__auto___35771 = cljs.core.seq(seq__35205_35746);
if(temp__5804__auto___35771){
var seq__35205_35772__$1 = temp__5804__auto___35771;
if(cljs.core.chunked_seq_QMARK_(seq__35205_35772__$1)){
var c__5568__auto___35776 = cljs.core.chunk_first(seq__35205_35772__$1);
var G__35777 = cljs.core.chunk_rest(seq__35205_35772__$1);
var G__35778 = c__5568__auto___35776;
var G__35779 = cljs.core.count(c__5568__auto___35776);
var G__35780 = (0);
seq__35205_35746 = G__35777;
chunk__35206_35747 = G__35778;
count__35207_35748 = G__35779;
i__35208_35749 = G__35780;
continue;
} else {
var f_35784 = cljs.core.first(seq__35205_35772__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_35784], 0));


var G__35787 = cljs.core.next(seq__35205_35772__$1);
var G__35788 = null;
var G__35789 = (0);
var G__35790 = (0);
seq__35205_35746 = G__35787;
chunk__35206_35747 = G__35788;
count__35207_35748 = G__35789;
i__35208_35749 = G__35790;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_35792 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_35792], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_35792)))?cljs.core.second(arglists_35792):arglists_35792)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__35322_35802 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__35323_35803 = null;
var count__35324_35804 = (0);
var i__35325_35805 = (0);
while(true){
if((i__35325_35805 < count__35324_35804)){
var vec__35398_35807 = chunk__35323_35803.cljs$core$IIndexed$_nth$arity$2(null,i__35325_35805);
var name_35808 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35398_35807,(0),null);
var map__35401_35809 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35398_35807,(1),null);
var map__35401_35810__$1 = cljs.core.__destructure_map(map__35401_35809);
var doc_35811 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35401_35810__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_35812 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35401_35810__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_35808], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_35812], 0));

if(cljs.core.truth_(doc_35811)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_35811], 0));
} else {
}


var G__35813 = seq__35322_35802;
var G__35814 = chunk__35323_35803;
var G__35815 = count__35324_35804;
var G__35816 = (i__35325_35805 + (1));
seq__35322_35802 = G__35813;
chunk__35323_35803 = G__35814;
count__35324_35804 = G__35815;
i__35325_35805 = G__35816;
continue;
} else {
var temp__5804__auto___35817 = cljs.core.seq(seq__35322_35802);
if(temp__5804__auto___35817){
var seq__35322_35818__$1 = temp__5804__auto___35817;
if(cljs.core.chunked_seq_QMARK_(seq__35322_35818__$1)){
var c__5568__auto___35819 = cljs.core.chunk_first(seq__35322_35818__$1);
var G__35820 = cljs.core.chunk_rest(seq__35322_35818__$1);
var G__35821 = c__5568__auto___35819;
var G__35822 = cljs.core.count(c__5568__auto___35819);
var G__35823 = (0);
seq__35322_35802 = G__35820;
chunk__35323_35803 = G__35821;
count__35324_35804 = G__35822;
i__35325_35805 = G__35823;
continue;
} else {
var vec__35426_35824 = cljs.core.first(seq__35322_35818__$1);
var name_35825 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35426_35824,(0),null);
var map__35429_35826 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35426_35824,(1),null);
var map__35429_35827__$1 = cljs.core.__destructure_map(map__35429_35826);
var doc_35828 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35429_35827__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_35829 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35429_35827__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_35825], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_35829], 0));

if(cljs.core.truth_(doc_35828)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_35828], 0));
} else {
}


var G__35830 = cljs.core.next(seq__35322_35818__$1);
var G__35831 = null;
var G__35832 = (0);
var G__35833 = (0);
seq__35322_35802 = G__35830;
chunk__35323_35803 = G__35831;
count__35324_35804 = G__35832;
i__35325_35805 = G__35833;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__35436 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__35437 = null;
var count__35438 = (0);
var i__35439 = (0);
while(true){
if((i__35439 < count__35438)){
var role = chunk__35437.cljs$core$IIndexed$_nth$arity$2(null,i__35439);
var temp__5804__auto___35835__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___35835__$1)){
var spec_35840 = temp__5804__auto___35835__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_35840)], 0));
} else {
}


var G__35842 = seq__35436;
var G__35843 = chunk__35437;
var G__35844 = count__35438;
var G__35845 = (i__35439 + (1));
seq__35436 = G__35842;
chunk__35437 = G__35843;
count__35438 = G__35844;
i__35439 = G__35845;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__35436);
if(temp__5804__auto____$1){
var seq__35436__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__35436__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35436__$1);
var G__35851 = cljs.core.chunk_rest(seq__35436__$1);
var G__35852 = c__5568__auto__;
var G__35853 = cljs.core.count(c__5568__auto__);
var G__35854 = (0);
seq__35436 = G__35851;
chunk__35437 = G__35852;
count__35438 = G__35853;
i__35439 = G__35854;
continue;
} else {
var role = cljs.core.first(seq__35436__$1);
var temp__5804__auto___35856__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___35856__$2)){
var spec_35861 = temp__5804__auto___35856__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_35861)], 0));
} else {
}


var G__35867 = cljs.core.next(seq__35436__$1);
var G__35868 = null;
var G__35869 = (0);
var G__35870 = (0);
seq__35436 = G__35867;
chunk__35437 = G__35868;
count__35438 = G__35869;
i__35439 = G__35870;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__35878 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__35879 = cljs.core.ex_cause(t);
via = G__35878;
t = G__35879;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__35493 = datafied_throwable;
var map__35493__$1 = cljs.core.__destructure_map(map__35493);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35493__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35493__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__35493__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__35494 = cljs.core.last(via);
var map__35494__$1 = cljs.core.__destructure_map(map__35494);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35494__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35494__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35494__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__35495 = data;
var map__35495__$1 = cljs.core.__destructure_map(map__35495);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35495__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35495__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35495__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__35541 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__35541__$1 = cljs.core.__destructure_map(map__35541);
var top_data = map__35541__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35541__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__35566 = phase;
var G__35566__$1 = (((G__35566 instanceof cljs.core.Keyword))?G__35566.fqn:null);
switch (G__35566__$1) {
case "read-source":
var map__35579 = data;
var map__35579__$1 = cljs.core.__destructure_map(map__35579);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35579__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35579__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__35582 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__35582__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35582,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__35582);
var G__35582__$2 = (cljs.core.truth_((function (){var fexpr__35594 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__35594.cljs$core$IFn$_invoke$arity$1 ? fexpr__35594.cljs$core$IFn$_invoke$arity$1(source) : fexpr__35594.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__35582__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__35582__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35582__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__35582__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__35600 = top_data;
var G__35600__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35600,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__35600);
var G__35600__$2 = (cljs.core.truth_((function (){var fexpr__35601 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__35601.cljs$core$IFn$_invoke$arity$1 ? fexpr__35601.cljs$core$IFn$_invoke$arity$1(source) : fexpr__35601.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__35600__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__35600__$1);
var G__35600__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35600__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__35600__$2);
var G__35600__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35600__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__35600__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35600__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__35600__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__35606 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35606,(3),null);
var G__35609 = top_data;
var G__35609__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35609,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__35609);
var G__35609__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35609__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__35609__$1);
var G__35609__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35609__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__35609__$2);
var G__35609__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35609__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__35609__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35609__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__35609__$4;
}

break;
case "execution":
var vec__35631 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35631,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35631,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35631,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35631,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__35492_SHARP_){
var or__5045__auto__ = (p1__35492_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var fexpr__35645 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__35645.cljs$core$IFn$_invoke$arity$1 ? fexpr__35645.cljs$core$IFn$_invoke$arity$1(p1__35492_SHARP_) : fexpr__35645.call(null,p1__35492_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__35648 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__35648__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35648,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__35648);
var G__35648__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35648__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__35648__$1);
var G__35648__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35648__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__35648__$2);
var G__35648__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35648__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__35648__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__35648__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__35648__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__35566__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__35675){
var map__35676 = p__35675;
var map__35676__$1 = cljs.core.__destructure_map(map__35676);
var triage_data = map__35676__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35676__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__35683 = phase;
var G__35683__$1 = (((G__35683 instanceof cljs.core.Keyword))?G__35683.fqn:null);
switch (G__35683__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__35685 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__35686 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__35687 = loc;
var G__35688 = (cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__35689_35935 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__35690_35936 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__35691_35937 = true;
var _STAR_print_fn_STAR__temp_val__35692_35938 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__35691_35937);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__35692_35938);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__35672_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__35672_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__35690_35936);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__35689_35935);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__35685,G__35686,G__35687,G__35688) : format.call(null,G__35685,G__35686,G__35687,G__35688));

break;
case "macroexpansion":
var G__35693 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__35694 = cause_type;
var G__35695 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__35696 = loc;
var G__35697 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__35693,G__35694,G__35695,G__35696,G__35697) : format.call(null,G__35693,G__35694,G__35695,G__35696,G__35697));

break;
case "compile-syntax-check":
var G__35698 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__35699 = cause_type;
var G__35700 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__35701 = loc;
var G__35702 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__35698,G__35699,G__35700,G__35701,G__35702) : format.call(null,G__35698,G__35699,G__35700,G__35701,G__35702));

break;
case "compilation":
var G__35703 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__35704 = cause_type;
var G__35705 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__35706 = loc;
var G__35707 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__35703,G__35704,G__35705,G__35706,G__35707) : format.call(null,G__35703,G__35704,G__35705,G__35706,G__35707));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__35708 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__35709 = symbol;
var G__35710 = loc;
var G__35711 = (function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__35712_36096 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__35713_36097 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__35714_36098 = true;
var _STAR_print_fn_STAR__temp_val__35715_36099 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__35714_36098);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__35715_36099);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__35674_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__35674_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__35713_36097);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__35712_36096);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__35708,G__35709,G__35710,G__35711) : format.call(null,G__35708,G__35709,G__35710,G__35711));
} else {
var G__35716 = "Execution error%s at %s(%s).\n%s\n";
var G__35717 = cause_type;
var G__35718 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__35719 = loc;
var G__35720 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__35716,G__35717,G__35718,G__35719,G__35720) : format.call(null,G__35716,G__35717,G__35718,G__35719,G__35720));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__35683__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
