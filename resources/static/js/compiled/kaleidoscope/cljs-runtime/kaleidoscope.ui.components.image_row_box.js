goog.provide('kaleidoscope.ui.components.image_row_box');
kaleidoscope.ui.components.image_row_box.ROW_CONFIG = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"2px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"5px",new cljs.core.Keyword(null,"md","md",707286655),"10px",new cljs.core.Keyword(null,"lg","lg",-80787836),"10px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"10px"], null)], null)], null);
kaleidoscope.ui.components.image_row_box.languages_i_use = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Languages I use",new cljs.core.Keyword(null,"rows","rows",850049680),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Go",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/golang.svg"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Clojure",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/clojure-logo-2.svg"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Clojurescript",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/cljs.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Shadow CLJS",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/shadow-cljs.png"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Reframe",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/re-frame.png"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Javascript",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/javascript.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Typescript",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/typescript.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"React",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/react.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Material UI",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/material-ui-logo.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Storybook",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/storybook-icon.svg"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Terraform",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/terraform.png"], null)], null)], null)], null);
kaleidoscope.ui.components.image_row_box.tools_i_use = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),"Tools I use",new cljs.core.Keyword(null,"rows","rows",850049680),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Swagger/Open API",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/swagger.png"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Open Telemetry",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/otel.svg"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"AWS",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/aws.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Sumologic",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/sumo.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Grafana Loki",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/grafana.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Bugsnag",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/bugsnag.svg"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Clojurescript",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/cljs.svg"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Shadow CLJS",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/shadow-cljs.png"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Reframe",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/re-frame.png"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Keycloak",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/keycloak-logo.png"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Docker",new cljs.core.Keyword(null,"src","src",-1651076051),"/static/images/docker.png"], null)], null)], null)], null);
kaleidoscope.ui.components.image_row_box.icon = (function kaleidoscope$ui$components$image_row_box$icon(p__18155){
var map__18156 = p__18155;
var map__18156__$1 = cljs.core.__destructure_map(map__18156);
var tooltip_text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18156__$1,new cljs.core.Keyword(null,"tooltip-text","tooltip-text",-2102487661));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18156__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"title","title",636505583),tooltip_text], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"2px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"5px",new cljs.core.Keyword(null,"md","md",707286655),"8px",new cljs.core.Keyword(null,"lg","lg",-80787836),"8px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"10px"], null),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"50px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"60px",new cljs.core.Keyword(null,"md","md",707286655),"70px",new cljs.core.Keyword(null,"lg","lg",-80787836),"90px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"90px"], null),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"xs","xs",649443341),"50px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"60px",new cljs.core.Keyword(null,"md","md",707286655),"70px",new cljs.core.Keyword(null,"lg","lg",-80787836),"90px",new cljs.core.Keyword(null,"xl","xl",-1689552936),"90px"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"component","component",1555936782),"img",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justifyContent","justifyContent",885406515),"center",new cljs.core.Keyword(null,"alignItems","alignItems",410331199),"center",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"100%",new cljs.core.Keyword(null,"max-height","max-height",-612563804),"100%"], null),new cljs.core.Keyword(null,"src","src",-1651076051),src], null)], null)], null)], null);
});
kaleidoscope.ui.components.image_row_box.image_row_box = (function kaleidoscope$ui$components$image_row_box$image_row_box(p__18157){
var map__18158 = p__18157;
var map__18158__$1 = cljs.core.__destructure_map(map__18158);
var rows = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158__$1,new cljs.core.Keyword(null,"rows","rows",850049680));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18158__$1,new cljs.core.Keyword(null,"title","title",636505583));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",-1736937707),true], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),"column",new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h4"], null),title], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159(s__18160){
return (new cljs.core.LazySeq(null,(function (){
var s__18160__$1 = s__18160;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__18160__$1);
if(temp__5804__auto__){
var s__18160__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__18160__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__18160__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__18162 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__18161 = (0);
while(true){
if((i__18161 < size__5522__auto__)){
var vec__18163 = cljs.core._nth(c__5521__auto__,i__18161);
var row = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18163,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18163,(1),null);
cljs.core.chunk_append(b__18162,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,kaleidoscope.ui.components.image_row_box.ROW_CONFIG,(function (){var iter__5523__auto__ = ((function (i__18161,vec__18163,row,i,c__5521__auto__,size__5522__auto__,b__18162,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title){
return (function kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18166(s__18167){
return (new cljs.core.LazySeq(null,((function (i__18161,vec__18163,row,i,c__5521__auto__,size__5522__auto__,b__18162,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title){
return (function (){
var s__18167__$1 = s__18167;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__18167__$1);
if(temp__5804__auto____$1){
var s__18167__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__18167__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first(s__18167__$2);
var size__5522__auto____$1 = cljs.core.count(c__5521__auto____$1);
var b__18169 = cljs.core.chunk_buffer(size__5522__auto____$1);
if((function (){var i__18168 = (0);
while(true){
if((i__18168 < size__5522__auto____$1)){
var map__18170 = cljs.core._nth(c__5521__auto____$1,i__18168);
var map__18170__$1 = cljs.core.__destructure_map(map__18170);
var item = map__18170__$1;
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18170__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18170__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
cljs.core.chunk_append(b__18169,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.image_row_box.icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tooltip-text","tooltip-text",-2102487661),text,new cljs.core.Keyword(null,"src","src",-1651076051),src], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(text),cljs.core.str.cljs$core$IFn$_invoke$arity$1(src)].join('')], null)));

var G__18181 = (i__18168 + (1));
i__18168 = G__18181;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18169),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18166(cljs.core.chunk_rest(s__18167__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18169),null);
}
} else {
var map__18171 = cljs.core.first(s__18167__$2);
var map__18171__$1 = cljs.core.__destructure_map(map__18171);
var item = map__18171__$1;
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18171__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.image_row_box.icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tooltip-text","tooltip-text",-2102487661),text,new cljs.core.Keyword(null,"src","src",-1651076051),src], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(text),cljs.core.str.cljs$core$IFn$_invoke$arity$1(src)].join('')], null)),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18166(cljs.core.rest(s__18167__$2)));
}
} else {
return null;
}
break;
}
});})(i__18161,vec__18163,row,i,c__5521__auto__,size__5522__auto__,b__18162,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title))
,null,null));
});})(i__18161,vec__18163,row,i,c__5521__auto__,size__5522__auto__,b__18162,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title))
;
return iter__5523__auto__(row);
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["row-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null)));

var G__18182 = (i__18161 + (1));
i__18161 = G__18182;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18162),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159(cljs.core.chunk_rest(s__18160__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18162),null);
}
} else {
var vec__18172 = cljs.core.first(s__18160__$2);
var row = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18172,(0),null);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18172,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,kaleidoscope.ui.components.image_row_box.ROW_CONFIG,(function (){var iter__5523__auto__ = ((function (vec__18172,row,i,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title){
return (function kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18175(s__18176){
return (new cljs.core.LazySeq(null,(function (){
var s__18176__$1 = s__18176;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__18176__$1);
if(temp__5804__auto____$1){
var s__18176__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__18176__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__18176__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__18178 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__18177 = (0);
while(true){
if((i__18177 < size__5522__auto__)){
var map__18179 = cljs.core._nth(c__5521__auto__,i__18177);
var map__18179__$1 = cljs.core.__destructure_map(map__18179);
var item = map__18179__$1;
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18179__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18179__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
cljs.core.chunk_append(b__18178,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.image_row_box.icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tooltip-text","tooltip-text",-2102487661),text,new cljs.core.Keyword(null,"src","src",-1651076051),src], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(text),cljs.core.str.cljs$core$IFn$_invoke$arity$1(src)].join('')], null)));

var G__18183 = (i__18177 + (1));
i__18177 = G__18183;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18178),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18175(cljs.core.chunk_rest(s__18176__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18178),null);
}
} else {
var map__18180 = cljs.core.first(s__18176__$2);
var map__18180__$1 = cljs.core.__destructure_map(map__18180);
var item = map__18180__$1;
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18180__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var src = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18180__$1,new cljs.core.Keyword(null,"src","src",-1651076051));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.image_row_box.icon,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tooltip-text","tooltip-text",-2102487661),text,new cljs.core.Keyword(null,"src","src",-1651076051),src], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(text),cljs.core.str.cljs$core$IFn$_invoke$arity$1(src)].join('')], null)),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159_$_iter__18175(cljs.core.rest(s__18176__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(vec__18172,row,i,s__18160__$2,temp__5804__auto__,map__18158,map__18158__$1,rows,title))
;
return iter__5523__auto__(row);
})()], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["row-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null)),kaleidoscope$ui$components$image_row_box$image_row_box_$_iter__18159(cljs.core.rest(s__18160__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,row){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [row,i], null);
}),rows));
})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.image_row_box.js.map
