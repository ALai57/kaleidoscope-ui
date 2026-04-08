goog.provide('kaleidoscope.ui.components.slate.code_block_helpers');
var module$node_modules$$udecode$plate$dist$index_es=shadow.js.require("module$node_modules$$udecode$plate$dist$index_es", {});
kaleidoscope.ui.components.slate.code_block_helpers.get_text = (function kaleidoscope$ui$components$slate$code_block_helpers$get_text(html_element){
return html_element.innerText;
});
kaleidoscope.ui.components.slate.code_block_helpers.get_elements_by_class = (function kaleidoscope$ui$components$slate$code_block_helpers$get_elements_by_class(html_element,class_name){
return cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(html_element.getElementsByClassName(class_name));
});
/**
 * Used to get code block lines from a code block.
 */
kaleidoscope.ui.components.slate.code_block_helpers.get_children_elements = (function kaleidoscope$ui$components$slate$code_block_helpers$get_children_elements(props){
return kaleidoscope.ui.utils.core.clojurize(props.element.children);
});
kaleidoscope.ui.components.slate.code_block_helpers.get_language = (function kaleidoscope$ui$components$slate$code_block_helpers$get_language(props){
return props.element.lang;
});
kaleidoscope.ui.components.slate.code_block_helpers.code_block_line__GT_text = (function kaleidoscope$ui$components$slate$code_block_helpers$code_block_line__GT_text(child){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(child,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"children","children",-940561982),(0),new cljs.core.Keyword(null,"text","text",-1790561697)], null));
});
/**
 * Get the raw code from the children of an element about to be serialized.
 */
kaleidoscope.ui.components.slate.code_block_helpers.raw_code_string = (function kaleidoscope$ui$components$slate$code_block_helpers$raw_code_string(props){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.slate.code_block_helpers.code_block_line__GT_text,kaleidoscope.ui.components.slate.code_block_helpers.get_children_elements(props)));
});
kaleidoscope.ui.components.slate.code_block_helpers.get_language_from_html = (function kaleidoscope$ui$components$slate$code_block_helpers$get_language_from_html(html_element){
var G__23831 = html_element;
var G__23831__$1 = (((G__23831 == null))?null:G__23831.className);
var G__23831__$2 = (((G__23831__$1 == null))?null:G__23831__$1.match(/language-(?<language>\w+)/));
var G__23831__$3 = (((G__23831__$2 == null))?null:G__23831__$2.groups);
if((G__23831__$3 == null)){
return null;
} else {
return G__23831__$3.language;
}
});
kaleidoscope.ui.components.slate.code_block_helpers.get_code_lines = (function kaleidoscope$ui$components$slate$code_block_helpers$get_code_lines(html_element){
return kaleidoscope.ui.components.slate.code_block_helpers.get_elements_by_class(html_element,"slate-code_line");
});
/**
 * Input should be a slate element (a code line element)
 */
kaleidoscope.ui.components.slate.code_block_helpers.code_line__GT_slate_node = (function kaleidoscope$ui$components$slate$code_block_helpers$code_line__GT_slate_node(slate_element){
return ({"type": module$node_modules$$udecode$plate$dist$index_es.ELEMENT_CODE_LINE, "children": cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),kaleidoscope.ui.components.slate.code_block_helpers.get_text(slate_element)], null)], null))});
});
kaleidoscope.ui.components.slate.code_block_helpers.CODE_BLOCK_DESERIALIZATION = ({"rules": cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"validNodeName","validNodeName",57953296),"PRE"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"validNodeName","validNodeName",57953296),"P",new cljs.core.Keyword(null,"validStyle","validStyle",982175751),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fontFamily","fontFamily",1493518353),"Consolas"], null)], null)], null)), "getNode": (function (el){
var result = cljs.core.clj__GT_js(cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.slate.code_block_helpers.code_line__GT_slate_node,kaleidoscope.ui.components.slate.code_block_helpers.get_code_lines(el)));
return ({"type": module$node_modules$$udecode$plate$dist$index_es.ELEMENT_CODE_BLOCK, "lang": kaleidoscope.ui.components.slate.code_block_helpers.get_language_from_html(el), "children": result});
})});
kaleidoscope.ui.components.slate.code_block_helpers.serialize_code_block = (function kaleidoscope$ui$components$slate$code_block_helpers$serialize_code_block(props){
var raw_string = kaleidoscope.ui.components.slate.code_block_helpers.raw_code_string(props);
var language = kaleidoscope.ui.components.slate.code_block_helpers.get_language(props);
var element = reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"r>","r>",-1210228188),kaleidoscope.ui.components.slate.prism.HighlightHTML,({"Prism": kaleidoscope.ui.components.slate.prism.PRISM, "theme": kaleidoscope.ui.components.slate.prism.DRACULA, "code": raw_string, "language": language}),(function (args){
var map__23832 = kaleidoscope.ui.utils.core.clojurize(args);
var map__23832__$1 = cljs.core.__destructure_map(map__23832);
var clj_args = map__23832__$1;
var className = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23832__$1,new cljs.core.Keyword(null,"className","className",-1983287057));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23832__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var tokens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23832__$1,new cljs.core.Keyword(null,"tokens","tokens",-818939304));
var getTokenProps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23832__$1,new cljs.core.Keyword(null,"getTokenProps","getTokenProps",-700661608));
var getLineProps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23832__$1,new cljs.core.Keyword(null,"getLineProps","getLineProps",1049981902));
var lines = tokens;
return reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"className","className",-1983287057),className,new cljs.core.Keyword(null,"style","style",-496642736),style], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(language)," language-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(language)].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data-slate-node","data-slate-node",-555931742),"text"], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (line_num,tokens__$1){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.utils.core.clojurize((function (){var G__23833 = ({"line": tokens__$1});
return (getLineProps.cljs$core$IFn$_invoke$arity$1 ? getLineProps.cljs$core$IFn$_invoke$arity$1(G__23833) : getLineProps.call(null,G__23833));
})()),new cljs.core.Keyword(null,"key","key",-1516042587),["line-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_num)].join('')),new cljs.core.Keyword(null,"className","className",-1983287057),(function (x){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)," slate-code_line"].join('');
})),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.components.slate.prism.token_props__GT_hiccup,getTokenProps,kaleidoscope.ui.components.slate.prism.__GT_token_props),tokens__$1)], null);
}),lines)], null)], null)], null));
})], null));
return element;
});
kaleidoscope.ui.components.slate.code_block_helpers.LANGUAGES = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"javascript","javascript",-45283711),new cljs.core.Keyword(null,"clojure","clojure",438975815),new cljs.core.Keyword(null,"bash","bash",1176231467),new cljs.core.Keyword(null,"java","java",1958249105),new cljs.core.Keyword(null,"sql","sql",1251448786),new cljs.core.Keyword(null,"python","python",-1034889161),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"ruby","ruby",2000737661),new cljs.core.Keyword(null,"html","html",-998796897)],["Javascript","Clojure","Bash","Java","SQL","Python","JSON","Ruby","HTML"]);
kaleidoscope.ui.components.slate.code_block_helpers.CodeBlockSelectElement = (function kaleidoscope$ui$components$slate$code_block_helpers$CodeBlockSelectElement(p__23834){
var map__23835 = p__23834;
var map__23835__$1 = cljs.core.__destructure_map(map__23835);
var props = map__23835__$1;
var lang = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23835__$1,new cljs.core.Keyword(null,"lang","lang",-1819677104));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23835__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var v = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(lang);
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(v),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"float","float",-1732389368),"right"], null),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),(function (e){
return e.stopPropagation();
}),new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (e){
var G__23836_23849 = kaleidoscope.ui.utils.events.event_value(e);
(on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__23836_23849) : on_change.call(null,G__23836_23849));

return cljs.core.reset_BANG_(v,kaleidoscope.ui.utils.events.event_value(e));
}),new cljs.core.Keyword(null,"contentEditable","contentEditable",-823191689),false], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$slate$code_block_helpers$CodeBlockSelectElement_$_iter__23837(s__23838){
return (new cljs.core.LazySeq(null,(function (){
var s__23838__$1 = s__23838;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23838__$1);
if(temp__5804__auto__){
var s__23838__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23838__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23838__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23840 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23839 = (0);
while(true){
if((i__23839 < size__5522__auto__)){
var vec__23841 = cljs.core._nth(c__5521__auto__,i__23839);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23841,(0),null);
var v__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23841,(1),null);
cljs.core.chunk_append(b__23840,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.name(k),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.name(k)], null),v__$1], null));

var G__23850 = (i__23839 + (1));
i__23839 = G__23850;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23840),kaleidoscope$ui$components$slate$code_block_helpers$CodeBlockSelectElement_$_iter__23837(cljs.core.chunk_rest(s__23838__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23840),null);
}
} else {
var vec__23844 = cljs.core.first(s__23838__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23844,(0),null);
var v__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__23844,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.name(k),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.name(k)], null),v__$1], null),kaleidoscope$ui$components$slate$code_block_helpers$CodeBlockSelectElement_$_iter__23837(cljs.core.rest(s__23838__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(kaleidoscope.ui.components.slate.code_block_helpers.LANGUAGES);
})()], null);
});
});
kaleidoscope.ui.components.slate.code_block_helpers.CustomCodeBlock = (function kaleidoscope$ui$components$slate$code_block_helpers$CustomCodeBlock(p__23847){
var map__23848 = p__23847;
var map__23848__$1 = cljs.core.__destructure_map(map__23848);
var props = map__23848__$1;
var attributes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23848__$1,new cljs.core.Keyword(null,"attributes","attributes",-74013604));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23848__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var nodeProps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23848__$1,new cljs.core.Keyword(null,"nodeProps","nodeProps",1793008770));
var element = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23848__$1,new cljs.core.Keyword(null,"element","element",1974019749));
var editor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23848__$1,new cljs.core.Keyword(null,"editor","editor",-989377770));
console.log(props);

var lang = element.lang;
var class_name = (function (){var and__5043__auto__ = lang;
if(cljs.core.truth_(and__5043__auto__)){
return goog.string.format("%s language-%s",lang,lang);
} else {
return and__5043__auto__;
}
})();
var root_props = module$node_modules$$udecode$plate$dist$index_es.getRootProps(cljs.core.clj__GT_js(props));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(attributes),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),["prism-code slate-code_block language-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lang)].join('')], null)], 0)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slate.code_block_helpers.CodeBlockSelectElement,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"data-testid","data-testid",102116723),"CodeBlockSelectElement",new cljs.core.Keyword(null,"editor","editor",-989377770),editor,new cljs.core.Keyword(null,"lang","lang",-1819677104),lang,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (v){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Handling language change to ",v], 0));

var temp__5804__auto__ = module$node_modules$$udecode$plate$dist$index_es.findNodePath(editor,element);
if(cljs.core.truth_(temp__5804__auto__)){
var path = temp__5804__auto__;
return module$node_modules$$udecode$plate$dist$index_es.setNodes(editor,({"lang": v}),({"at": path}));
} else {
return null;
}
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"className","className",-1983287057),class_name], null),children], null)], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.slate.code_block_helpers.js.map
