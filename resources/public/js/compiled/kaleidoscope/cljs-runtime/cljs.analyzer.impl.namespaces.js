goog.provide('cljs.analyzer.impl.namespaces');
/**
 * Given a libspec return a map of :as-alias alias, if was present. Return the
 * libspec with :as-alias elided. If the libspec was *only* :as-alias do not
 * return it.
 */
cljs.analyzer.impl.namespaces.check_and_remove_as_alias = (function cljs$analyzer$impl$namespaces$check_and_remove_as_alias(libspec){
if((((libspec instanceof cljs.core.Symbol)) || ((libspec instanceof cljs.core.Keyword)))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec], null);
} else {
var vec__15779 = libspec;
var seq__15780 = cljs.core.seq(vec__15779);
var first__15781 = cljs.core.first(seq__15780);
var seq__15780__$1 = cljs.core.next(seq__15780);
var lib = first__15781;
var spec = seq__15780__$1;
var libspec__$1 = vec__15779;
var vec__15782 = cljs.core.split_with(cljs.core.complement(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"as-alias","as-alias",82482467),null], null), null)),spec);
var pre_spec = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15782,(0),null);
var vec__15785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15782,(1),null);
var seq__15786 = cljs.core.seq(vec__15785);
var first__15787 = cljs.core.first(seq__15786);
var seq__15786__$1 = cljs.core.next(seq__15786);
var _ = first__15787;
var first__15787__$1 = cljs.core.first(seq__15786__$1);
var seq__15786__$2 = cljs.core.next(seq__15786__$1);
var alias = first__15787__$1;
var post_spec = seq__15786__$2;
var post = vec__15785;
if(cljs.core.seq(post)){
var libspec_SINGLEQUOTE_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [lib], null),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(pre_spec,post_spec));
if((alias instanceof cljs.core.Symbol)){
} else {
throw (new Error(["Assert failed: ",[":as-alias must be followed by a symbol, got: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias)].join(''),"\n","(symbol? alias)"].join('')));
}

var G__15794 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"as-alias","as-alias",82482467),cljs.core.PersistentArrayMap.createAsIfByAssoc([alias,lib])], null);
if((cljs.core.count(libspec_SINGLEQUOTE_) > (1))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__15794,new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec_SINGLEQUOTE_);
} else {
return G__15794;
}
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"libspec","libspec",1228503756),libspec__$1], null);
}
}
});
cljs.analyzer.impl.namespaces.check_as_alias_duplicates = (function cljs$analyzer$impl$namespaces$check_as_alias_duplicates(as_aliases,new_as_aliases){
var seq__15800 = cljs.core.seq(new_as_aliases);
var chunk__15801 = null;
var count__15802 = (0);
var i__15803 = (0);
while(true){
if((i__15803 < count__15802)){
var vec__15810 = chunk__15801.cljs$core$IIndexed$_nth$arity$2(null,i__15803);
var alias = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15810,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15810,(1),null);
if((!(cljs.core.contains_QMARK_(as_aliases,alias)))){
} else {
throw (new Error(["Assert failed: ",["Duplicate :as-alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias),", already in use for lib ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(as_aliases,alias))].join(''),"\n","(not (contains? as-aliases alias))"].join('')));
}


var G__15843 = seq__15800;
var G__15844 = chunk__15801;
var G__15845 = count__15802;
var G__15846 = (i__15803 + (1));
seq__15800 = G__15843;
chunk__15801 = G__15844;
count__15802 = G__15845;
i__15803 = G__15846;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__15800);
if(temp__5804__auto__){
var seq__15800__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15800__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__15800__$1);
var G__15847 = cljs.core.chunk_rest(seq__15800__$1);
var G__15848 = c__5568__auto__;
var G__15849 = cljs.core.count(c__5568__auto__);
var G__15850 = (0);
seq__15800 = G__15847;
chunk__15801 = G__15848;
count__15802 = G__15849;
i__15803 = G__15850;
continue;
} else {
var vec__15814 = cljs.core.first(seq__15800__$1);
var alias = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15814,(1),null);
if((!(cljs.core.contains_QMARK_(as_aliases,alias)))){
} else {
throw (new Error(["Assert failed: ",["Duplicate :as-alias ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(alias),", already in use for lib ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(as_aliases,alias))].join(''),"\n","(not (contains? as-aliases alias))"].join('')));
}


var G__15851 = cljs.core.next(seq__15800__$1);
var G__15852 = null;
var G__15853 = (0);
var G__15854 = (0);
seq__15800 = G__15851;
chunk__15801 = G__15852;
count__15802 = G__15853;
i__15803 = G__15854;
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
 * Given libspecs, elide all :as-alias. Return a map of :libspecs (filtered)
 * and :as-aliases.
 */
cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs = (function cljs$analyzer$impl$namespaces$elide_aliases_from_libspecs(var_args){
var G__15821 = arguments.length;
switch (G__15821) {
case 1:
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$1 = (function (libspecs){
return cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2(libspecs,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2 = (function (libspecs,as_aliases){
var ret = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),as_aliases,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.PersistentVector.EMPTY], null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__$1,libspec){
var map__15822 = cljs.analyzer.impl.namespaces.check_and_remove_as_alias(libspec);
var map__15822__$1 = cljs.core.__destructure_map(map__15822);
var as_alias = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15822__$1,new cljs.core.Keyword(null,"as-alias","as-alias",82482467));
var libspec__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15822__$1,new cljs.core.Keyword(null,"libspec","libspec",1228503756));
cljs.analyzer.impl.namespaces.check_as_alias_duplicates(new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798).cljs$core$IFn$_invoke$arity$1(ret__$1),as_alias);

var G__15823 = ret__$1;
var G__15823__$1 = (cljs.core.truth_(libspec__$1)?cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__15823,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,libspec__$1):G__15823);
if(cljs.core.truth_(as_alias)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__15823__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.merge,as_alias);
} else {
return G__15823__$1;
}
}),ret,libspecs);
}));

(cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$lang$maxFixedArity = 2);

cljs.analyzer.impl.namespaces.elide_aliases_from_ns_specs = (function cljs$analyzer$impl$namespaces$elide_aliases_from_ns_specs(ns_specs){

var ret = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.PersistentVector.EMPTY], null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__15829,p__15830){
var map__15831 = p__15829;
var map__15831__$1 = cljs.core.__destructure_map(map__15831);
var ret__$1 = map__15831__$1;
var as_aliases = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15831__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798));
var vec__15832 = p__15830;
var seq__15833 = cljs.core.seq(vec__15832);
var first__15834 = cljs.core.first(seq__15833);
var seq__15833__$1 = cljs.core.next(seq__15833);
var spec_key = first__15834;
var libspecs = seq__15833__$1;
if((!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"refer-clojure","refer-clojure",813784440),spec_key)))){
var map__15836 = cljs.analyzer.impl.namespaces.elide_aliases_from_libspecs.cljs$core$IFn$_invoke$arity$2(libspecs,as_aliases);
var map__15836__$1 = cljs.core.__destructure_map(map__15836);
var as_aliases__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15836__$1,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798));
var libspecs__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__15836__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195));
var G__15837 = ret__$1;
var G__15837__$1 = (((!(cljs.core.empty_QMARK_(as_aliases__$1))))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__15837,new cljs.core.Keyword(null,"as-aliases","as-aliases",1485064798),cljs.core.merge,as_aliases__$1):G__15837);
if((!(cljs.core.empty_QMARK_(libspecs__$1)))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__15837__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec_key,libspecs__$1));
} else {
return G__15837__$1;
}
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(ret__$1,new cljs.core.Keyword(null,"libspecs","libspecs",59807195),cljs.core.conj,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(spec_key,libspecs));
}
}),ret,ns_specs);
});

//# sourceMappingURL=cljs.analyzer.impl.namespaces.js.map
