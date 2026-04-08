goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___38135 = arguments.length;
var i__5770__auto___38136 = (0);
while(true){
if((i__5770__auto___38136 < len__5769__auto___38135)){
args__5775__auto__.push((arguments[i__5770__auto___38136]));

var G__38137 = (i__5770__auto___38136 + (1));
i__5770__auto___38136 = G__38137;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq37622){
var G__37623 = cljs.core.first(seq37622);
var seq37622__$1 = cljs.core.next(seq37622);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__37623,seq37622__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__37631 = cljs.core.seq(sources);
var chunk__37632 = null;
var count__37633 = (0);
var i__37634 = (0);
while(true){
if((i__37634 < count__37633)){
var map__37644 = chunk__37632.cljs$core$IIndexed$_nth$arity$2(null,i__37634);
var map__37644__$1 = cljs.core.__destructure_map(map__37644);
var src = map__37644__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37644__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37644__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37644__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37644__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e37646){var e_38140 = e37646;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_38140);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_38140.message)].join('')));
}

var G__38142 = seq__37631;
var G__38143 = chunk__37632;
var G__38144 = count__37633;
var G__38145 = (i__37634 + (1));
seq__37631 = G__38142;
chunk__37632 = G__38143;
count__37633 = G__38144;
i__37634 = G__38145;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37631);
if(temp__5804__auto__){
var seq__37631__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37631__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37631__$1);
var G__38146 = cljs.core.chunk_rest(seq__37631__$1);
var G__38147 = c__5568__auto__;
var G__38148 = cljs.core.count(c__5568__auto__);
var G__38149 = (0);
seq__37631 = G__38146;
chunk__37632 = G__38147;
count__37633 = G__38148;
i__37634 = G__38149;
continue;
} else {
var map__37650 = cljs.core.first(seq__37631__$1);
var map__37650__$1 = cljs.core.__destructure_map(map__37650);
var src = map__37650__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37650__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37650__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37650__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37650__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e37651){var e_38150 = e37651;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_38150);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_38150.message)].join('')));
}

var G__38151 = cljs.core.next(seq__37631__$1);
var G__38152 = null;
var G__38153 = (0);
var G__38154 = (0);
seq__37631 = G__38151;
chunk__37632 = G__38152;
count__37633 = G__38153;
i__37634 = G__38154;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__37659 = cljs.core.seq(js_requires);
var chunk__37660 = null;
var count__37661 = (0);
var i__37662 = (0);
while(true){
if((i__37662 < count__37661)){
var js_ns = chunk__37660.cljs$core$IIndexed$_nth$arity$2(null,i__37662);
var require_str_38157 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_38157);


var G__38158 = seq__37659;
var G__38159 = chunk__37660;
var G__38160 = count__37661;
var G__38161 = (i__37662 + (1));
seq__37659 = G__38158;
chunk__37660 = G__38159;
count__37661 = G__38160;
i__37662 = G__38161;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37659);
if(temp__5804__auto__){
var seq__37659__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37659__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37659__$1);
var G__38163 = cljs.core.chunk_rest(seq__37659__$1);
var G__38164 = c__5568__auto__;
var G__38165 = cljs.core.count(c__5568__auto__);
var G__38166 = (0);
seq__37659 = G__38163;
chunk__37660 = G__38164;
count__37661 = G__38165;
i__37662 = G__38166;
continue;
} else {
var js_ns = cljs.core.first(seq__37659__$1);
var require_str_38167 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_38167);


var G__38169 = cljs.core.next(seq__37659__$1);
var G__38170 = null;
var G__38171 = (0);
var G__38172 = (0);
seq__37659 = G__38169;
chunk__37660 = G__38170;
count__37661 = G__38171;
i__37662 = G__38172;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__37669){
var map__37670 = p__37669;
var map__37670__$1 = cljs.core.__destructure_map(map__37670);
var msg = map__37670__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37670__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37670__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__37671(s__37672){
return (new cljs.core.LazySeq(null,(function (){
var s__37672__$1 = s__37672;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__37672__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__37678 = cljs.core.first(xs__6360__auto__);
var map__37678__$1 = cljs.core.__destructure_map(map__37678);
var src = map__37678__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37678__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37678__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__37672__$1,map__37678,map__37678__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__37670,map__37670__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__37671_$_iter__37673(s__37674){
return (new cljs.core.LazySeq(null,((function (s__37672__$1,map__37678,map__37678__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__37670,map__37670__$1,msg,info,reload_info){
return (function (){
var s__37674__$1 = s__37674;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__37674__$1);
if(temp__5804__auto____$1){
var s__37674__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__37674__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__37674__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__37676 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__37675 = (0);
while(true){
if((i__37675 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__37675);
cljs.core.chunk_append(b__37676,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__38177 = (i__37675 + (1));
i__37675 = G__38177;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__37676),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__37671_$_iter__37673(cljs.core.chunk_rest(s__37674__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__37676),null);
}
} else {
var warning = cljs.core.first(s__37674__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__37671_$_iter__37673(cljs.core.rest(s__37674__$2)));
}
} else {
return null;
}
break;
}
});})(s__37672__$1,map__37678,map__37678__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__37670,map__37670__$1,msg,info,reload_info))
,null,null));
});})(s__37672__$1,map__37678,map__37678__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__37670,map__37670__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__37671(cljs.core.rest(s__37672__$1)));
} else {
var G__38181 = cljs.core.rest(s__37672__$1);
s__37672__$1 = G__38181;
continue;
}
} else {
var G__38182 = cljs.core.rest(s__37672__$1);
s__37672__$1 = G__38182;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__37681_38184 = cljs.core.seq(warnings);
var chunk__37682_38185 = null;
var count__37683_38186 = (0);
var i__37684_38187 = (0);
while(true){
if((i__37684_38187 < count__37683_38186)){
var map__37687_38188 = chunk__37682_38185.cljs$core$IIndexed$_nth$arity$2(null,i__37684_38187);
var map__37687_38189__$1 = cljs.core.__destructure_map(map__37687_38188);
var w_38190 = map__37687_38189__$1;
var msg_38191__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37687_38189__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_38192 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37687_38189__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_38193 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37687_38189__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_38194 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37687_38189__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_38194)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_38192),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_38193),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_38191__$1)].join(''));


var G__38197 = seq__37681_38184;
var G__38198 = chunk__37682_38185;
var G__38199 = count__37683_38186;
var G__38200 = (i__37684_38187 + (1));
seq__37681_38184 = G__38197;
chunk__37682_38185 = G__38198;
count__37683_38186 = G__38199;
i__37684_38187 = G__38200;
continue;
} else {
var temp__5804__auto___38201 = cljs.core.seq(seq__37681_38184);
if(temp__5804__auto___38201){
var seq__37681_38202__$1 = temp__5804__auto___38201;
if(cljs.core.chunked_seq_QMARK_(seq__37681_38202__$1)){
var c__5568__auto___38203 = cljs.core.chunk_first(seq__37681_38202__$1);
var G__38204 = cljs.core.chunk_rest(seq__37681_38202__$1);
var G__38205 = c__5568__auto___38203;
var G__38206 = cljs.core.count(c__5568__auto___38203);
var G__38207 = (0);
seq__37681_38184 = G__38204;
chunk__37682_38185 = G__38205;
count__37683_38186 = G__38206;
i__37684_38187 = G__38207;
continue;
} else {
var map__37690_38208 = cljs.core.first(seq__37681_38202__$1);
var map__37690_38209__$1 = cljs.core.__destructure_map(map__37690_38208);
var w_38210 = map__37690_38209__$1;
var msg_38211__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37690_38209__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_38212 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37690_38209__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_38213 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37690_38209__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_38214 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37690_38209__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_38214)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_38212),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_38213),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_38211__$1)].join(''));


var G__38225 = cljs.core.next(seq__37681_38202__$1);
var G__38226 = null;
var G__38227 = (0);
var G__38228 = (0);
seq__37681_38184 = G__38225;
chunk__37682_38185 = G__38226;
count__37683_38186 = G__38227;
i__37684_38187 = G__38228;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__37668_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__37668_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__37691){
var map__37692 = p__37691;
var map__37692__$1 = cljs.core.__destructure_map(map__37692);
var msg = map__37692__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37692__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37692__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__37693 = cljs.core.seq(updates);
var chunk__37695 = null;
var count__37696 = (0);
var i__37697 = (0);
while(true){
if((i__37697 < count__37696)){
var path = chunk__37695.cljs$core$IIndexed$_nth$arity$2(null,i__37697);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__37913_38242 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__37917_38243 = null;
var count__37918_38244 = (0);
var i__37919_38245 = (0);
while(true){
if((i__37919_38245 < count__37918_38244)){
var node_38246 = chunk__37917_38243.cljs$core$IIndexed$_nth$arity$2(null,i__37919_38245);
if(cljs.core.not(node_38246.shadow$old)){
var path_match_38250 = shadow.cljs.devtools.client.browser.match_paths(node_38246.getAttribute("href"),path);
if(cljs.core.truth_(path_match_38250)){
var new_link_38251 = (function (){var G__37947 = node_38246.cloneNode(true);
G__37947.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_38250),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__37947;
})();
(node_38246.shadow$old = true);

(new_link_38251.onload = ((function (seq__37913_38242,chunk__37917_38243,count__37918_38244,i__37919_38245,seq__37693,chunk__37695,count__37696,i__37697,new_link_38251,path_match_38250,node_38246,path,map__37692,map__37692__$1,msg,updates,reload_info){
return (function (e){
var seq__37948_38252 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__37950_38253 = null;
var count__37951_38254 = (0);
var i__37952_38255 = (0);
while(true){
if((i__37952_38255 < count__37951_38254)){
var map__37960_38259 = chunk__37950_38253.cljs$core$IIndexed$_nth$arity$2(null,i__37952_38255);
var map__37960_38260__$1 = cljs.core.__destructure_map(map__37960_38259);
var task_38261 = map__37960_38260__$1;
var fn_str_38262 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37960_38260__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38263 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37960_38260__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38266 = goog.getObjectByName(fn_str_38262,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38263)].join(''));

(fn_obj_38266.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38266.cljs$core$IFn$_invoke$arity$2(path,new_link_38251) : fn_obj_38266.call(null,path,new_link_38251));


var G__38267 = seq__37948_38252;
var G__38268 = chunk__37950_38253;
var G__38269 = count__37951_38254;
var G__38270 = (i__37952_38255 + (1));
seq__37948_38252 = G__38267;
chunk__37950_38253 = G__38268;
count__37951_38254 = G__38269;
i__37952_38255 = G__38270;
continue;
} else {
var temp__5804__auto___38271 = cljs.core.seq(seq__37948_38252);
if(temp__5804__auto___38271){
var seq__37948_38273__$1 = temp__5804__auto___38271;
if(cljs.core.chunked_seq_QMARK_(seq__37948_38273__$1)){
var c__5568__auto___38274 = cljs.core.chunk_first(seq__37948_38273__$1);
var G__38275 = cljs.core.chunk_rest(seq__37948_38273__$1);
var G__38276 = c__5568__auto___38274;
var G__38277 = cljs.core.count(c__5568__auto___38274);
var G__38278 = (0);
seq__37948_38252 = G__38275;
chunk__37950_38253 = G__38276;
count__37951_38254 = G__38277;
i__37952_38255 = G__38278;
continue;
} else {
var map__37968_38279 = cljs.core.first(seq__37948_38273__$1);
var map__37968_38280__$1 = cljs.core.__destructure_map(map__37968_38279);
var task_38281 = map__37968_38280__$1;
var fn_str_38282 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37968_38280__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38283 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37968_38280__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38284 = goog.getObjectByName(fn_str_38282,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38283)].join(''));

(fn_obj_38284.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38284.cljs$core$IFn$_invoke$arity$2(path,new_link_38251) : fn_obj_38284.call(null,path,new_link_38251));


var G__38285 = cljs.core.next(seq__37948_38273__$1);
var G__38286 = null;
var G__38287 = (0);
var G__38288 = (0);
seq__37948_38252 = G__38285;
chunk__37950_38253 = G__38286;
count__37951_38254 = G__38287;
i__37952_38255 = G__38288;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_38246);
});})(seq__37913_38242,chunk__37917_38243,count__37918_38244,i__37919_38245,seq__37693,chunk__37695,count__37696,i__37697,new_link_38251,path_match_38250,node_38246,path,map__37692,map__37692__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_38250], 0));

goog.dom.insertSiblingAfter(new_link_38251,node_38246);


var G__38289 = seq__37913_38242;
var G__38290 = chunk__37917_38243;
var G__38291 = count__37918_38244;
var G__38292 = (i__37919_38245 + (1));
seq__37913_38242 = G__38289;
chunk__37917_38243 = G__38290;
count__37918_38244 = G__38291;
i__37919_38245 = G__38292;
continue;
} else {
var G__38293 = seq__37913_38242;
var G__38294 = chunk__37917_38243;
var G__38295 = count__37918_38244;
var G__38296 = (i__37919_38245 + (1));
seq__37913_38242 = G__38293;
chunk__37917_38243 = G__38294;
count__37918_38244 = G__38295;
i__37919_38245 = G__38296;
continue;
}
} else {
var G__38297 = seq__37913_38242;
var G__38298 = chunk__37917_38243;
var G__38299 = count__37918_38244;
var G__38300 = (i__37919_38245 + (1));
seq__37913_38242 = G__38297;
chunk__37917_38243 = G__38298;
count__37918_38244 = G__38299;
i__37919_38245 = G__38300;
continue;
}
} else {
var temp__5804__auto___38301 = cljs.core.seq(seq__37913_38242);
if(temp__5804__auto___38301){
var seq__37913_38302__$1 = temp__5804__auto___38301;
if(cljs.core.chunked_seq_QMARK_(seq__37913_38302__$1)){
var c__5568__auto___38303 = cljs.core.chunk_first(seq__37913_38302__$1);
var G__38304 = cljs.core.chunk_rest(seq__37913_38302__$1);
var G__38305 = c__5568__auto___38303;
var G__38306 = cljs.core.count(c__5568__auto___38303);
var G__38307 = (0);
seq__37913_38242 = G__38304;
chunk__37917_38243 = G__38305;
count__37918_38244 = G__38306;
i__37919_38245 = G__38307;
continue;
} else {
var node_38308 = cljs.core.first(seq__37913_38302__$1);
if(cljs.core.not(node_38308.shadow$old)){
var path_match_38309 = shadow.cljs.devtools.client.browser.match_paths(node_38308.getAttribute("href"),path);
if(cljs.core.truth_(path_match_38309)){
var new_link_38310 = (function (){var G__37976 = node_38308.cloneNode(true);
G__37976.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_38309),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__37976;
})();
(node_38308.shadow$old = true);

(new_link_38310.onload = ((function (seq__37913_38242,chunk__37917_38243,count__37918_38244,i__37919_38245,seq__37693,chunk__37695,count__37696,i__37697,new_link_38310,path_match_38309,node_38308,seq__37913_38302__$1,temp__5804__auto___38301,path,map__37692,map__37692__$1,msg,updates,reload_info){
return (function (e){
var seq__37977_38311 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__37979_38312 = null;
var count__37980_38313 = (0);
var i__37981_38314 = (0);
while(true){
if((i__37981_38314 < count__37980_38313)){
var map__37998_38315 = chunk__37979_38312.cljs$core$IIndexed$_nth$arity$2(null,i__37981_38314);
var map__37998_38316__$1 = cljs.core.__destructure_map(map__37998_38315);
var task_38317 = map__37998_38316__$1;
var fn_str_38318 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37998_38316__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38319 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37998_38316__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38320 = goog.getObjectByName(fn_str_38318,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38319)].join(''));

(fn_obj_38320.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38320.cljs$core$IFn$_invoke$arity$2(path,new_link_38310) : fn_obj_38320.call(null,path,new_link_38310));


var G__38321 = seq__37977_38311;
var G__38322 = chunk__37979_38312;
var G__38323 = count__37980_38313;
var G__38324 = (i__37981_38314 + (1));
seq__37977_38311 = G__38321;
chunk__37979_38312 = G__38322;
count__37980_38313 = G__38323;
i__37981_38314 = G__38324;
continue;
} else {
var temp__5804__auto___38325__$1 = cljs.core.seq(seq__37977_38311);
if(temp__5804__auto___38325__$1){
var seq__37977_38326__$1 = temp__5804__auto___38325__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37977_38326__$1)){
var c__5568__auto___38327 = cljs.core.chunk_first(seq__37977_38326__$1);
var G__38328 = cljs.core.chunk_rest(seq__37977_38326__$1);
var G__38329 = c__5568__auto___38327;
var G__38330 = cljs.core.count(c__5568__auto___38327);
var G__38331 = (0);
seq__37977_38311 = G__38328;
chunk__37979_38312 = G__38329;
count__37980_38313 = G__38330;
i__37981_38314 = G__38331;
continue;
} else {
var map__38007_38332 = cljs.core.first(seq__37977_38326__$1);
var map__38007_38333__$1 = cljs.core.__destructure_map(map__38007_38332);
var task_38334 = map__38007_38333__$1;
var fn_str_38335 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38007_38333__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38336 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38007_38333__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38337 = goog.getObjectByName(fn_str_38335,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38336)].join(''));

(fn_obj_38337.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38337.cljs$core$IFn$_invoke$arity$2(path,new_link_38310) : fn_obj_38337.call(null,path,new_link_38310));


var G__38338 = cljs.core.next(seq__37977_38326__$1);
var G__38339 = null;
var G__38340 = (0);
var G__38341 = (0);
seq__37977_38311 = G__38338;
chunk__37979_38312 = G__38339;
count__37980_38313 = G__38340;
i__37981_38314 = G__38341;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_38308);
});})(seq__37913_38242,chunk__37917_38243,count__37918_38244,i__37919_38245,seq__37693,chunk__37695,count__37696,i__37697,new_link_38310,path_match_38309,node_38308,seq__37913_38302__$1,temp__5804__auto___38301,path,map__37692,map__37692__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_38309], 0));

goog.dom.insertSiblingAfter(new_link_38310,node_38308);


var G__38342 = cljs.core.next(seq__37913_38302__$1);
var G__38343 = null;
var G__38344 = (0);
var G__38345 = (0);
seq__37913_38242 = G__38342;
chunk__37917_38243 = G__38343;
count__37918_38244 = G__38344;
i__37919_38245 = G__38345;
continue;
} else {
var G__38346 = cljs.core.next(seq__37913_38302__$1);
var G__38347 = null;
var G__38348 = (0);
var G__38349 = (0);
seq__37913_38242 = G__38346;
chunk__37917_38243 = G__38347;
count__37918_38244 = G__38348;
i__37919_38245 = G__38349;
continue;
}
} else {
var G__38353 = cljs.core.next(seq__37913_38302__$1);
var G__38354 = null;
var G__38355 = (0);
var G__38356 = (0);
seq__37913_38242 = G__38353;
chunk__37917_38243 = G__38354;
count__37918_38244 = G__38355;
i__37919_38245 = G__38356;
continue;
}
}
} else {
}
}
break;
}


var G__38357 = seq__37693;
var G__38358 = chunk__37695;
var G__38359 = count__37696;
var G__38360 = (i__37697 + (1));
seq__37693 = G__38357;
chunk__37695 = G__38358;
count__37696 = G__38359;
i__37697 = G__38360;
continue;
} else {
var G__38361 = seq__37693;
var G__38362 = chunk__37695;
var G__38363 = count__37696;
var G__38364 = (i__37697 + (1));
seq__37693 = G__38361;
chunk__37695 = G__38362;
count__37696 = G__38363;
i__37697 = G__38364;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37693);
if(temp__5804__auto__){
var seq__37693__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37693__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37693__$1);
var G__38367 = cljs.core.chunk_rest(seq__37693__$1);
var G__38368 = c__5568__auto__;
var G__38369 = cljs.core.count(c__5568__auto__);
var G__38370 = (0);
seq__37693 = G__38367;
chunk__37695 = G__38368;
count__37696 = G__38369;
i__37697 = G__38370;
continue;
} else {
var path = cljs.core.first(seq__37693__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__38010_38372 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__38014_38373 = null;
var count__38015_38374 = (0);
var i__38016_38375 = (0);
while(true){
if((i__38016_38375 < count__38015_38374)){
var node_38376 = chunk__38014_38373.cljs$core$IIndexed$_nth$arity$2(null,i__38016_38375);
if(cljs.core.not(node_38376.shadow$old)){
var path_match_38377 = shadow.cljs.devtools.client.browser.match_paths(node_38376.getAttribute("href"),path);
if(cljs.core.truth_(path_match_38377)){
var new_link_38378 = (function (){var G__38052 = node_38376.cloneNode(true);
G__38052.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_38377),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__38052;
})();
(node_38376.shadow$old = true);

(new_link_38378.onload = ((function (seq__38010_38372,chunk__38014_38373,count__38015_38374,i__38016_38375,seq__37693,chunk__37695,count__37696,i__37697,new_link_38378,path_match_38377,node_38376,path,seq__37693__$1,temp__5804__auto__,map__37692,map__37692__$1,msg,updates,reload_info){
return (function (e){
var seq__38053_38384 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__38055_38385 = null;
var count__38056_38386 = (0);
var i__38057_38387 = (0);
while(true){
if((i__38057_38387 < count__38056_38386)){
var map__38070_38388 = chunk__38055_38385.cljs$core$IIndexed$_nth$arity$2(null,i__38057_38387);
var map__38070_38389__$1 = cljs.core.__destructure_map(map__38070_38388);
var task_38390 = map__38070_38389__$1;
var fn_str_38391 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38070_38389__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38392 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38070_38389__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38393 = goog.getObjectByName(fn_str_38391,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38392)].join(''));

(fn_obj_38393.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38393.cljs$core$IFn$_invoke$arity$2(path,new_link_38378) : fn_obj_38393.call(null,path,new_link_38378));


var G__38394 = seq__38053_38384;
var G__38395 = chunk__38055_38385;
var G__38396 = count__38056_38386;
var G__38397 = (i__38057_38387 + (1));
seq__38053_38384 = G__38394;
chunk__38055_38385 = G__38395;
count__38056_38386 = G__38396;
i__38057_38387 = G__38397;
continue;
} else {
var temp__5804__auto___38398__$1 = cljs.core.seq(seq__38053_38384);
if(temp__5804__auto___38398__$1){
var seq__38053_38399__$1 = temp__5804__auto___38398__$1;
if(cljs.core.chunked_seq_QMARK_(seq__38053_38399__$1)){
var c__5568__auto___38400 = cljs.core.chunk_first(seq__38053_38399__$1);
var G__38401 = cljs.core.chunk_rest(seq__38053_38399__$1);
var G__38402 = c__5568__auto___38400;
var G__38403 = cljs.core.count(c__5568__auto___38400);
var G__38404 = (0);
seq__38053_38384 = G__38401;
chunk__38055_38385 = G__38402;
count__38056_38386 = G__38403;
i__38057_38387 = G__38404;
continue;
} else {
var map__38071_38405 = cljs.core.first(seq__38053_38399__$1);
var map__38071_38406__$1 = cljs.core.__destructure_map(map__38071_38405);
var task_38407 = map__38071_38406__$1;
var fn_str_38408 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38071_38406__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38409 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38071_38406__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38412 = goog.getObjectByName(fn_str_38408,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38409)].join(''));

(fn_obj_38412.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38412.cljs$core$IFn$_invoke$arity$2(path,new_link_38378) : fn_obj_38412.call(null,path,new_link_38378));


var G__38413 = cljs.core.next(seq__38053_38399__$1);
var G__38414 = null;
var G__38415 = (0);
var G__38416 = (0);
seq__38053_38384 = G__38413;
chunk__38055_38385 = G__38414;
count__38056_38386 = G__38415;
i__38057_38387 = G__38416;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_38376);
});})(seq__38010_38372,chunk__38014_38373,count__38015_38374,i__38016_38375,seq__37693,chunk__37695,count__37696,i__37697,new_link_38378,path_match_38377,node_38376,path,seq__37693__$1,temp__5804__auto__,map__37692,map__37692__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_38377], 0));

goog.dom.insertSiblingAfter(new_link_38378,node_38376);


var G__38421 = seq__38010_38372;
var G__38422 = chunk__38014_38373;
var G__38423 = count__38015_38374;
var G__38424 = (i__38016_38375 + (1));
seq__38010_38372 = G__38421;
chunk__38014_38373 = G__38422;
count__38015_38374 = G__38423;
i__38016_38375 = G__38424;
continue;
} else {
var G__38432 = seq__38010_38372;
var G__38433 = chunk__38014_38373;
var G__38434 = count__38015_38374;
var G__38435 = (i__38016_38375 + (1));
seq__38010_38372 = G__38432;
chunk__38014_38373 = G__38433;
count__38015_38374 = G__38434;
i__38016_38375 = G__38435;
continue;
}
} else {
var G__38436 = seq__38010_38372;
var G__38437 = chunk__38014_38373;
var G__38438 = count__38015_38374;
var G__38439 = (i__38016_38375 + (1));
seq__38010_38372 = G__38436;
chunk__38014_38373 = G__38437;
count__38015_38374 = G__38438;
i__38016_38375 = G__38439;
continue;
}
} else {
var temp__5804__auto___38440__$1 = cljs.core.seq(seq__38010_38372);
if(temp__5804__auto___38440__$1){
var seq__38010_38441__$1 = temp__5804__auto___38440__$1;
if(cljs.core.chunked_seq_QMARK_(seq__38010_38441__$1)){
var c__5568__auto___38442 = cljs.core.chunk_first(seq__38010_38441__$1);
var G__38443 = cljs.core.chunk_rest(seq__38010_38441__$1);
var G__38444 = c__5568__auto___38442;
var G__38445 = cljs.core.count(c__5568__auto___38442);
var G__38446 = (0);
seq__38010_38372 = G__38443;
chunk__38014_38373 = G__38444;
count__38015_38374 = G__38445;
i__38016_38375 = G__38446;
continue;
} else {
var node_38447 = cljs.core.first(seq__38010_38441__$1);
if(cljs.core.not(node_38447.shadow$old)){
var path_match_38448 = shadow.cljs.devtools.client.browser.match_paths(node_38447.getAttribute("href"),path);
if(cljs.core.truth_(path_match_38448)){
var new_link_38449 = (function (){var G__38076 = node_38447.cloneNode(true);
G__38076.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_38448),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__38076;
})();
(node_38447.shadow$old = true);

(new_link_38449.onload = ((function (seq__38010_38372,chunk__38014_38373,count__38015_38374,i__38016_38375,seq__37693,chunk__37695,count__37696,i__37697,new_link_38449,path_match_38448,node_38447,seq__38010_38441__$1,temp__5804__auto___38440__$1,path,seq__37693__$1,temp__5804__auto__,map__37692,map__37692__$1,msg,updates,reload_info){
return (function (e){
var seq__38077_38450 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__38079_38451 = null;
var count__38080_38452 = (0);
var i__38081_38453 = (0);
while(true){
if((i__38081_38453 < count__38080_38452)){
var map__38089_38454 = chunk__38079_38451.cljs$core$IIndexed$_nth$arity$2(null,i__38081_38453);
var map__38089_38455__$1 = cljs.core.__destructure_map(map__38089_38454);
var task_38456 = map__38089_38455__$1;
var fn_str_38457 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38089_38455__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38458 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38089_38455__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38459 = goog.getObjectByName(fn_str_38457,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38458)].join(''));

(fn_obj_38459.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38459.cljs$core$IFn$_invoke$arity$2(path,new_link_38449) : fn_obj_38459.call(null,path,new_link_38449));


var G__38460 = seq__38077_38450;
var G__38461 = chunk__38079_38451;
var G__38462 = count__38080_38452;
var G__38463 = (i__38081_38453 + (1));
seq__38077_38450 = G__38460;
chunk__38079_38451 = G__38461;
count__38080_38452 = G__38462;
i__38081_38453 = G__38463;
continue;
} else {
var temp__5804__auto___38464__$2 = cljs.core.seq(seq__38077_38450);
if(temp__5804__auto___38464__$2){
var seq__38077_38465__$1 = temp__5804__auto___38464__$2;
if(cljs.core.chunked_seq_QMARK_(seq__38077_38465__$1)){
var c__5568__auto___38466 = cljs.core.chunk_first(seq__38077_38465__$1);
var G__38467 = cljs.core.chunk_rest(seq__38077_38465__$1);
var G__38468 = c__5568__auto___38466;
var G__38469 = cljs.core.count(c__5568__auto___38466);
var G__38470 = (0);
seq__38077_38450 = G__38467;
chunk__38079_38451 = G__38468;
count__38080_38452 = G__38469;
i__38081_38453 = G__38470;
continue;
} else {
var map__38098_38471 = cljs.core.first(seq__38077_38465__$1);
var map__38098_38472__$1 = cljs.core.__destructure_map(map__38098_38471);
var task_38473 = map__38098_38472__$1;
var fn_str_38474 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38098_38472__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_38475 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38098_38472__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_38476 = goog.getObjectByName(fn_str_38474,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_38475)].join(''));

(fn_obj_38476.cljs$core$IFn$_invoke$arity$2 ? fn_obj_38476.cljs$core$IFn$_invoke$arity$2(path,new_link_38449) : fn_obj_38476.call(null,path,new_link_38449));


var G__38477 = cljs.core.next(seq__38077_38465__$1);
var G__38478 = null;
var G__38479 = (0);
var G__38480 = (0);
seq__38077_38450 = G__38477;
chunk__38079_38451 = G__38478;
count__38080_38452 = G__38479;
i__38081_38453 = G__38480;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_38447);
});})(seq__38010_38372,chunk__38014_38373,count__38015_38374,i__38016_38375,seq__37693,chunk__37695,count__37696,i__37697,new_link_38449,path_match_38448,node_38447,seq__38010_38441__$1,temp__5804__auto___38440__$1,path,seq__37693__$1,temp__5804__auto__,map__37692,map__37692__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_38448], 0));

goog.dom.insertSiblingAfter(new_link_38449,node_38447);


var G__38481 = cljs.core.next(seq__38010_38441__$1);
var G__38482 = null;
var G__38483 = (0);
var G__38484 = (0);
seq__38010_38372 = G__38481;
chunk__38014_38373 = G__38482;
count__38015_38374 = G__38483;
i__38016_38375 = G__38484;
continue;
} else {
var G__38485 = cljs.core.next(seq__38010_38441__$1);
var G__38486 = null;
var G__38487 = (0);
var G__38488 = (0);
seq__38010_38372 = G__38485;
chunk__38014_38373 = G__38486;
count__38015_38374 = G__38487;
i__38016_38375 = G__38488;
continue;
}
} else {
var G__38491 = cljs.core.next(seq__38010_38441__$1);
var G__38492 = null;
var G__38493 = (0);
var G__38494 = (0);
seq__38010_38372 = G__38491;
chunk__38014_38373 = G__38492;
count__38015_38374 = G__38493;
i__38016_38375 = G__38494;
continue;
}
}
} else {
}
}
break;
}


var G__38495 = cljs.core.next(seq__37693__$1);
var G__38496 = null;
var G__38497 = (0);
var G__38498 = (0);
seq__37693 = G__38495;
chunk__37695 = G__38496;
count__37696 = G__38497;
i__37697 = G__38498;
continue;
} else {
var G__38499 = cljs.core.next(seq__37693__$1);
var G__38500 = null;
var G__38501 = (0);
var G__38502 = (0);
seq__37693 = G__38499;
chunk__37695 = G__38500;
count__37696 = G__38501;
i__37697 = G__38502;
continue;
}
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$3 = (function (this$,ns,p__38102){
var map__38103 = p__38102;
var map__38103__$1 = cljs.core.__destructure_map(map__38103);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38103__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__38104,done,error){
var map__38105 = p__38104;
var map__38105__$1 = cljs.core.__destructure_map(map__38105);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38105__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__38106,done,error){
var map__38107 = p__38106;
var map__38107__$1 = cljs.core.__destructure_map(map__38107);
var msg = map__38107__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38107__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38107__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38107__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__38108){
var map__38109 = p__38108;
var map__38109__$1 = cljs.core.__destructure_map(map__38109);
var src = map__38109__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38109__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__38110 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__38110) : done.call(null,G__38110));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__38111){
var map__38112 = p__38111;
var map__38112__$1 = cljs.core.__destructure_map(map__38112);
var msg__$1 = map__38112__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38112__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e38113){var ex = e38113;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__38114){
var map__38115 = p__38114;
var map__38115__$1 = cljs.core.__destructure_map(map__38115);
var env = map__38115__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38115__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__38127){
var map__38128 = p__38127;
var map__38128__$1 = cljs.core.__destructure_map(map__38128);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38128__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38128__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__38130){
var map__38131 = p__38130;
var map__38131__$1 = cljs.core.__destructure_map(map__38131);
var svc = map__38131__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38131__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
