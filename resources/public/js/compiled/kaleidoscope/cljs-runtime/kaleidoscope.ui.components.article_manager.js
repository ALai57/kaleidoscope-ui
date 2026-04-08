goog.provide('kaleidoscope.ui.components.article_manager');
kaleidoscope.ui.components.article_manager.SUCCESS_GREEN = "#08b383";
kaleidoscope.ui.components.article_manager.article_row = (function kaleidoscope$ui$components$article_manager$article_row(p__18084,p__18085){
var map__18087 = p__18084;
var map__18087__$1 = cljs.core.__destructure_map(map__18087);
var article_branch = map__18087__$1;
var article_created_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18087__$1,new cljs.core.Keyword(null,"article-created-date","article-created-date",-1838908379));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18087__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var published_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18087__$1,new cljs.core.Keyword(null,"published-at","published-at",249684621));
var map__18088 = p__18085;
var map__18088__$1 = cljs.core.__destructure_map(map__18088);
var article_actions = map__18088__$1;
var delete_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18088__$1,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481));
var edit_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18088__$1,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427));
var publish_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18088__$1,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026));
var toggle_audience_manager = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18088__$1,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"150px"], null),new cljs.core.Keyword(null,"secondaryAction","secondaryAction",1740067390),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"publish-tooltip",new cljs.core.Keyword(null,"title","title",636505583),(cljs.core.truth_(published_at)?["Published on ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(published_at)].join(''):"Publish article")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(cljs.core.truth_(published_at)?true:false),new cljs.core.Keyword(null,"on-click","on-click",1632826543),publish_article_BANG_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.rocket_launch.rocket_launch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),(cljs.core.truth_(published_at)?kaleidoscope.ui.components.article_manager.SUCCESS_GREEN:"")], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"settings-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Settings (WIP)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(toggle_audience_manager,article_branch)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.settings.settings], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"20px",new cljs.core.Keyword(null,"display","display",242065432),"inline-block"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"settings-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Delete article (WIP)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),delete_article_BANG_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null)], null)], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"edit-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Edit article"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return (edit_article_BANG_.cljs$core$IFn$_invoke$arity$1 ? edit_article_BANG_.cljs$core$IFn$_invoke$arity$1(article_branch) : edit_article_BANG_.call(null,article_branch));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"70px",new cljs.core.Keyword(null,"flex","flex",-1425124628),"none"], null)], null),article_created_date], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_icon,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"10px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"26px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.article.article,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),(cljs.core.truth_(published_at)?kaleidoscope.ui.components.article_manager.SUCCESS_GREEN:"")], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"10px"], null)], null),article_title], null)], null)], null)], null);
});
kaleidoscope.ui.components.article_manager.article_group_accordion = (function kaleidoscope$ui$components$article_manager$article_group_accordion(p__18089,article_actions){
var map__18090 = p__18089;
var map__18090__$1 = cljs.core.__destructure_map(map__18090);
var article_group = map__18090__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
var articles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"articles","articles",-454771639));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),display_name], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.collapse,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"in","in",-1531184865),open_QMARK_,new cljs.core.Keyword(null,"timeout","timeout",-318625318),"auto",new cljs.core.Keyword(null,"unmountOnExit","unmountOnExit",301067374),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__18092(s__18093){
return (new cljs.core.LazySeq(null,(function (){
var s__18093__$1 = s__18093;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__18093__$1);
if(temp__5804__auto__){
var s__18093__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__18093__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__18093__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__18095 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__18094 = (0);
while(true){
if((i__18094 < size__5522__auto__)){
var map__18096 = cljs.core._nth(c__5521__auto__,i__18094);
var map__18096__$1 = cljs.core.__destructure_map(map__18096);
var article = map__18096__$1;
var article_created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18096__$1,new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18096__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18096__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
cljs.core.chunk_append(b__18095,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_row,article,article_actions], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_created_at),cljs.core.str.cljs$core$IFn$_invoke$arity$1(branch_name)].join('')], null)));

var G__18130 = (i__18094 + (1));
i__18094 = G__18130;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18095),kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__18092(cljs.core.chunk_rest(s__18093__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18095),null);
}
} else {
var map__18097 = cljs.core.first(s__18093__$2);
var map__18097__$1 = cljs.core.__destructure_map(map__18097);
var article = map__18097__$1;
var article_created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18097__$1,new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18097__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18097__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_row,article,article_actions], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_created_at),cljs.core.str.cljs$core$IFn$_invoke$arity$1(branch_name)].join('')], null)),kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__18092(cljs.core.rest(s__18093__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(articles);
})()], null)], null)], null);
});
kaleidoscope.ui.components.article_manager.add_article_form = (function kaleidoscope$ui$components$article_manager$add_article_form(p__18100){
var map__18101 = p__18100;
var map__18101__$1 = cljs.core.__destructure_map(map__18101);
var add_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18101__$1,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181));
var new_article_title = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change = (function (e){
return cljs.core.reset_BANG_(new_article_title,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.post_add.post_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-article-title-input",new cljs.core.Keyword(null,"label","label",1718410804),"Article Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"350px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a new article",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_article_BANG_,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"article-title","article-title",-1665332721),cljs.core.deref(new_article_title)], null))], null)], null)], null);
});
});
kaleidoscope.ui.components.article_manager.article_manager = (function kaleidoscope$ui$components$article_manager$article_manager(p__18102){
var map__18103 = p__18102;
var map__18103__$1 = cljs.core.__destructure_map(map__18103);
var article_groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18103__$1,new cljs.core.Keyword(null,"article-groups","article-groups",1175251219));
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18103__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18103__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var add_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18103__$1,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),(function (article_title){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,109,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding article `%s`!",article_title], null);
}),null)),null,-1516175154,null);
}));
var delete_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18103__$1,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,110,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting article!"], null);
}),null)),null,-74478900,null);
}));
var edit_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18103__$1,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,111,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading article!"], null);
}),null)),null,2141599345,null);
}));
var publish_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18103__$1,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,112,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing article!"], null);
}),null)),null,37904292,null);
}));
var indexed_groups = cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,article_group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article_group,new cljs.core.Keyword(null,"idx","idx",1053688473),idx,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(open,cljs.core.update,idx,cljs.core.not);
})], 0));
}),article_groups);
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var current_article = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var toggle_audience_manager = (function() { 
var G__18131__delegate = function (article_branch,args){
cljs.core.reset_BANG_(current_article,article_branch);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(state,cljs.core.not);
};
var G__18131 = function (article_branch,var_args){
var args = null;
if (arguments.length > 1) {
var G__18132__i = 0, G__18132__a = new Array(arguments.length -  1);
while (G__18132__i < G__18132__a.length) {G__18132__a[G__18132__i] = arguments[G__18132__i + 1]; ++G__18132__i;}
  args = new cljs.core.IndexedSeq(G__18132__a,0,null);
} 
return G__18131__delegate.call(this,article_branch,args);};
G__18131.cljs$lang$maxFixedArity = 1;
G__18131.cljs$lang$applyTo = (function (arglist__18133){
var article_branch = cljs.core.first(arglist__18133);
var args = cljs.core.rest(arglist__18133);
return G__18131__delegate(article_branch,args);
});
G__18131.cljs$core$IFn$_invoke$arity$variadic = G__18131__delegate;
return G__18131;
})()
;
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.add_article_form,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.modals.audience_manager.edit_audiences_modal,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"open?","open?",1238443125),cljs.core.deref(state),new cljs.core.Keyword(null,"on-close","on-close",-761178394),toggle_audience_manager,new cljs.core.Keyword(null,"article","article",-21685045),cljs.core.deref(current_article),new cljs.core.Keyword(null,"audiences","audiences",860780056),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"groups","groups",-136896102),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(group,new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"display-name","display-name",694513143).cljs$core$IFn$_invoke$arity$1(group));
}),(function (){var or__5045__auto__ = groups;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})())], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.divider], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_manager$article_manager_$_iter__18114(s__18115){
return (new cljs.core.LazySeq(null,(function (){
var s__18115__$1 = s__18115;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__18115__$1);
if(temp__5804__auto__){
var s__18115__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__18115__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__18115__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__18117 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__18116 = (0);
while(true){
if((i__18116 < size__5522__auto__)){
var map__18120 = cljs.core._nth(c__5521__auto__,i__18116);
var map__18120__$1 = cljs.core.__destructure_map(map__18120);
var article_group = map__18120__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18120__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
cljs.core.chunk_append(b__18117,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_group_accordion,article_group,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),delete_article_BANG_,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),edit_article_BANG_,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),publish_article_BANG_,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216),toggle_audience_manager], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)));

var G__18135 = (i__18116 + (1));
i__18116 = G__18135;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__18117),kaleidoscope$ui$components$article_manager$article_manager_$_iter__18114(cljs.core.chunk_rest(s__18115__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__18117),null);
}
} else {
var map__18121 = cljs.core.first(s__18115__$2);
var map__18121__$1 = cljs.core.__destructure_map(map__18121);
var article_group = map__18121__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18121__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_group_accordion,article_group,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),delete_article_BANG_,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),edit_article_BANG_,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),publish_article_BANG_,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216),toggle_audience_manager], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)),kaleidoscope$ui$components$article_manager$article_manager_$_iter__18114(cljs.core.rest(s__18115__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (article_group,open_QMARK_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(article_group,new cljs.core.Keyword(null,"open?","open?",1238443125),open_QMARK_);
}),indexed_groups,cljs.core.deref(open)));
})()], null)], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.article_manager.js.map
