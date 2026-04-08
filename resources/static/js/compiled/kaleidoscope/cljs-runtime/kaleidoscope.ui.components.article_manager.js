goog.provide('kaleidoscope.ui.components.article_manager');
kaleidoscope.ui.components.article_manager.SUCCESS_GREEN = "#08b383";
kaleidoscope.ui.components.article_manager._toggle_public_visibility_BANG_ = (function kaleidoscope$ui$components$article_manager$_toggle_public_visibility_BANG_(p__17727,new_state){
var map__17728 = p__17727;
var map__17728__$1 = cljs.core.__destructure_map(map__17728);
var article = map__17728__$1;
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17728__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17728__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17728__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,35,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Changing article `%s` (article-id `%s`, url `%s`) public visibility to `%s`",article_title,article_id,article_url,new_state], null);
}),null)),null,332120455,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"toggle-public-visibility!","toggle-public-visibility!",356302599),article,new_state], null));
});
kaleidoscope.ui.components.article_manager.article_row = (function kaleidoscope$ui$components$article_manager$article_row(p__17729,p__17730){
var map__17731 = p__17729;
var map__17731__$1 = cljs.core.__destructure_map(map__17731);
var article_branch = map__17731__$1;
var article_created_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17731__$1,new cljs.core.Keyword(null,"article-created-date","article-created-date",-1838908379));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17731__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var published_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17731__$1,new cljs.core.Keyword(null,"published-at","published-at",249684621));
var public_visibility = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17731__$1,new cljs.core.Keyword(null,"public-visibility","public-visibility",-807476940));
var map__17732 = p__17730;
var map__17732__$1 = cljs.core.__destructure_map(map__17732);
var article_actions = map__17732__$1;
var delete_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17732__$1,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481));
var edit_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17732__$1,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427));
var publish_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17732__$1,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026));
var toggle_public_visibility_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17732__$1,new cljs.core.Keyword(null,"toggle-public-visibility!","toggle-public-visibility!",356302599));
var toggle_audience_manager = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17732__$1,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),"2px",new cljs.core.Keyword(null,"sm","sm",-1402575065),"10px"], null),new cljs.core.Keyword(null,"align-content","align-content",-990200349),"center"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"edit-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Edit article"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return (edit_article_BANG_.cljs$core$IFn$_invoke$arity$1 ? edit_article_BANG_.cljs$core$IFn$_invoke$arity$1(article_branch) : edit_article_BANG_.call(null,article_branch));
})], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",-1736937707),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),"70px",new cljs.core.Keyword(null,"align-content","align-content",-990200349),"center",new cljs.core.Keyword(null,"flex","flex",-1425124628),"none"], null)], null),article_created_date], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"align-content","align-content",-990200349),"center"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"publish-tooltip",new cljs.core.Keyword(null,"title","title",636505583),(cljs.core.truth_(published_at)?["Published on ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(published_at)].join(''):"Publish article")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(cljs.core.truth_(published_at)?true:false),new cljs.core.Keyword(null,"on-click","on-click",1632826543),publish_article_BANG_,new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"3px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.rocket_launch.rocket_launch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),(cljs.core.truth_(published_at)?kaleidoscope.ui.components.article_manager.SUCCESS_GREEN:"")], null)], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"10px",new cljs.core.Keyword(null,"align-content","align-content",-990200349),"center"], null)], null),article_title], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",-1736937707),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"settings-tooltip-visibility",new cljs.core.Keyword(null,"title","title",636505583),"Determine who can see your article. If the setting is 'Non-public', then only the audience you specify can view the article"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.toggle_button_group,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),public_visibility,new cljs.core.Keyword(null,"exclusive","exclusive",-1507998718),true,new cljs.core.Keyword(null,"onChange","onChange",-312891301),(function (event){
event.stopPropagation();

var G__17733 = article_branch;
var G__17734 = kaleidoscope.ui.utils.events.event_value(event);
return (toggle_public_visibility_BANG_.cljs$core$IFn$_invoke$arity$2 ? toggle_public_visibility_BANG_.cljs$core$IFn$_invoke$arity$2(G__17733,G__17734) : toggle_public_visibility_BANG_.call(null,G__17733,G__17734));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.toggle_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),true], null),"Public"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.toggle_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),false], null),"Non-public"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"audiences-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Audience: Who can see the article. Only applies when the article visibility is 'Non-Public'"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
event.stopPropagation();

return (toggle_audience_manager.cljs$core$IFn$_invoke$arity$2 ? toggle_audience_manager.cljs$core$IFn$_invoke$arity$2(article_branch,event) : toggle_audience_manager.call(null,article_branch,event));
}),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),public_visibility], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.group.group], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"20px",new cljs.core.Keyword(null,"display","display",242065432),"inline-block"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.tooltip,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"delete-tooltip",new cljs.core.Keyword(null,"title","title",636505583),"Delete article (WIP)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
event.stopPropagation();

return (delete_article_BANG_.cljs$core$IFn$_invoke$arity$1 ? delete_article_BANG_.cljs$core$IFn$_invoke$arity$1(event) : delete_article_BANG_.call(null,event));
})], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null)], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.article_manager.article_group_accordion = (function kaleidoscope$ui$components$article_manager$article_group_accordion(p__17735,article_actions){
var map__17736 = p__17735;
var map__17736__$1 = cljs.core.__destructure_map(map__17736);
var article_group = map__17736__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17736__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17736__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17736__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17736__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
var articles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17736__$1,new cljs.core.Keyword(null,"articles","articles",-454771639));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),display_name], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.collapse,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"in","in",-1531184865),open_QMARK_,new cljs.core.Keyword(null,"timeout","timeout",-318625318),"auto",new cljs.core.Keyword(null,"unmountOnExit","unmountOnExit",301067374),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null),new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"2px"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__17737(s__17738){
return (new cljs.core.LazySeq(null,(function (){
var s__17738__$1 = s__17738;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__17738__$1);
if(temp__5804__auto__){
var s__17738__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__17738__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__17738__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__17740 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__17739 = (0);
while(true){
if((i__17739 < size__5522__auto__)){
var map__17741 = cljs.core._nth(c__5521__auto__,i__17739);
var map__17741__$1 = cljs.core.__destructure_map(map__17741);
var article = map__17741__$1;
var article_created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17741__$1,new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17741__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17741__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var public_visibility = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17741__$1,new cljs.core.Keyword(null,"public-visibility","public-visibility",-807476940));
cljs.core.chunk_append(b__17740,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_row,article,article_actions], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_created_at),cljs.core.str.cljs$core$IFn$_invoke$arity$1(branch_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(public_visibility)].join('')], null)));

var G__17755 = (i__17739 + (1));
i__17739 = G__17755;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__17740),kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__17737(cljs.core.chunk_rest(s__17738__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__17740),null);
}
} else {
var map__17742 = cljs.core.first(s__17738__$2);
var map__17742__$1 = cljs.core.__destructure_map(map__17742);
var article = map__17742__$1;
var article_created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17742__$1,new cljs.core.Keyword(null,"article-created-at","article-created-at",879782297));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17742__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17742__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var public_visibility = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17742__$1,new cljs.core.Keyword(null,"public-visibility","public-visibility",-807476940));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_row,article,article_actions], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_created_at),cljs.core.str.cljs$core$IFn$_invoke$arity$1(branch_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(public_visibility)].join('')], null)),kaleidoscope$ui$components$article_manager$article_group_accordion_$_iter__17737(cljs.core.rest(s__17738__$2)));
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
kaleidoscope.ui.components.article_manager.BREAKPOINTS = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"p","p",151049309),(2),new cljs.core.Keyword(null,"xs","xs",649443341),(12),new cljs.core.Keyword(null,"sm","sm",-1402575065),(12),new cljs.core.Keyword(null,"md","md",707286655),(8),new cljs.core.Keyword(null,"lg","lg",-80787836),(8),new cljs.core.Keyword(null,"xl","xl",-1689552936),(8)], null);
kaleidoscope.ui.components.article_manager.add_article_form = (function kaleidoscope$ui$components$article_manager$add_article_form(p__17743){
var map__17744 = p__17743;
var map__17744__$1 = cljs.core.__destructure_map(map__17744);
var add_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17744__$1,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181));
var new_article_title = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change = (function (e){
return cljs.core.reset_BANG_(new_article_title,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justifyContent","justifyContent",885406515),"center",new cljs.core.Keyword(null,"alignItems","alignItems",410331199),"center",new cljs.core.Keyword(null,"align","align",1964212802),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"xs","xs",649443341),(8),new cljs.core.Keyword(null,"sm","sm",-1402575065),(4),new cljs.core.Keyword(null,"md","md",707286655),(6),new cljs.core.Keyword(null,"lg","lg",-80787836),(6),new cljs.core.Keyword(null,"xl","xl",-1689552936),(6),new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"align","align",1964212802),"center"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"direction","direction",-633359395),"row",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"flex-end"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.post_add.post_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5,new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-article-title-input",new cljs.core.Keyword(null,"label","label",1718410804),"Article Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"xs","xs",649443341),(4),new cljs.core.Keyword(null,"sm","sm",-1402575065),(4),new cljs.core.Keyword(null,"md","md",707286655),(4),new cljs.core.Keyword(null,"lg","lg",-80787836),(2),new cljs.core.Keyword(null,"xl","xl",-1689552936),(2),new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a new article",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_article_BANG_,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"article-title","article-title",-1665332721),cljs.core.deref(new_article_title)], null))], null)], null)], null)], null)], null);
});
});
kaleidoscope.ui.components.article_manager._article_manager = (function kaleidoscope$ui$components$article_manager$_article_manager(p__17745){
var map__17746 = p__17745;
var map__17746__$1 = cljs.core.__destructure_map(map__17746);
var publish_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17746__$1,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,180,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Publishing article!"], null);
}),null)),null,321677955,null);
}));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var add_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17746__$1,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),(function (article_title){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,177,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding article `%s`!",article_title], null);
}),null)),null,-2038759315,null);
}));
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var edit_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17746__$1,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,179,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading article!"], null);
}),null)),null,839322527,null);
}));
var initial_values = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"initial-values","initial-values",1392120293));
var delete_article_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__17746__$1,new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),(function (article){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.article-manager",null,178,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting article!"], null);
}),null)),null,863724175,null);
}));
var edit_modal_open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"edit-modal-open?","edit-modal-open?",41155726));
var current_article = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"current-article","current-article",-1909510415));
var article_groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"article-groups","article-groups",1175251219));
var toggle_audience_manager = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17746__$1,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216));
var indexed_groups = cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,article_group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article_group,new cljs.core.Keyword(null,"idx","idx",1053688473),idx,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(open,cljs.core.update,idx,cljs.core.not);
})], 0));
}),article_groups);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.add_article_form,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.modals.audience_manager.edit_audiences_modal,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"open?","open?",1238443125),edit_modal_open_QMARK_,new cljs.core.Keyword(null,"on-close","on-close",-761178394),toggle_audience_manager,new cljs.core.Keyword(null,"article","article",-21685045),current_article,new cljs.core.Keyword(null,"initial-values","initial-values",1392120293),initial_values,new cljs.core.Keyword(null,"groups","groups",-136896102),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(group,new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"display-name","display-name",694513143).cljs$core$IFn$_invoke$arity$1(group));
}),(function (){var or__5045__auto__ = groups;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})())], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.divider], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_manager$_article_manager_$_iter__17747(s__17748){
return (new cljs.core.LazySeq(null,(function (){
var s__17748__$1 = s__17748;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__17748__$1);
if(temp__5804__auto__){
var s__17748__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__17748__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__17748__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__17750 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__17749 = (0);
while(true){
if((i__17749 < size__5522__auto__)){
var map__17751 = cljs.core._nth(c__5521__auto__,i__17749);
var map__17751__$1 = cljs.core.__destructure_map(map__17751);
var article_group = map__17751__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17751__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
cljs.core.chunk_append(b__17750,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_group_accordion,article_group,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),delete_article_BANG_,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),edit_article_BANG_,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),publish_article_BANG_,new cljs.core.Keyword(null,"toggle-public-visibility!","toggle-public-visibility!",356302599),kaleidoscope.ui.components.article_manager._toggle_public_visibility_BANG_,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216),toggle_audience_manager], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),article_group], null)));

var G__17756 = (i__17749 + (1));
i__17749 = G__17756;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__17750),kaleidoscope$ui$components$article_manager$_article_manager_$_iter__17747(cljs.core.chunk_rest(s__17748__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__17750),null);
}
} else {
var map__17752 = cljs.core.first(s__17748__$2);
var map__17752__$1 = cljs.core.__destructure_map(map__17752);
var article_group = map__17752__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17752__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager.article_group_accordion,article_group,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"delete-article!","delete-article!",1590385481),delete_article_BANG_,new cljs.core.Keyword(null,"edit-article!","edit-article!",862523427),edit_article_BANG_,new cljs.core.Keyword(null,"add-article!","add-article!",-734718181),add_article_BANG_,new cljs.core.Keyword(null,"publish-article!","publish-article!",1284612026),publish_article_BANG_,new cljs.core.Keyword(null,"toggle-public-visibility!","toggle-public-visibility!",356302599),kaleidoscope.ui.components.article_manager._toggle_public_visibility_BANG_,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216),toggle_audience_manager], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),article_group], null)),kaleidoscope$ui$components$article_manager$_article_manager_$_iter__17747(cljs.core.rest(s__17748__$2)));
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
kaleidoscope.ui.components.article_manager.article_manager = (function kaleidoscope$ui$components$article_manager$article_manager(p__17753){
var map__17754 = p__17753;
var map__17754__$1 = cljs.core.__destructure_map(map__17754);
var args = map__17754__$1;
var article_groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17754__$1,new cljs.core.Keyword(null,"article-groups","article-groups",1175251219));
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17754__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17754__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var initial_values = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"audience-editor-modal-initial-values","audience-editor-modal-initial-values",-1390656970)], null));
var modal_open_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var current_article = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var toggle_audience_manager = (function() { 
var G__17757__delegate = function (article_branch,args__$1){
cljs.core.reset_BANG_(current_article,article_branch);

if(cljs.core.truth_(new cljs.core.Keyword(null,"article-id","article-id",793965839).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(current_article)))){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-audiences-for-article","get-audiences-for-article",-1982512522),article_branch], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(modal_open_QMARK_,cljs.core.not);
};
var G__17757 = function (article_branch,var_args){
var args__$1 = null;
if (arguments.length > 1) {
var G__17758__i = 0, G__17758__a = new Array(arguments.length -  1);
while (G__17758__i < G__17758__a.length) {G__17758__a[G__17758__i] = arguments[G__17758__i + 1]; ++G__17758__i;}
  args__$1 = new cljs.core.IndexedSeq(G__17758__a,0,null);
} 
return G__17757__delegate.call(this,article_branch,args__$1);};
G__17757.cljs$lang$maxFixedArity = 1;
G__17757.cljs$lang$applyTo = (function (arglist__17759){
var article_branch = cljs.core.first(arglist__17759);
var args__$1 = cljs.core.rest(arglist__17759);
return G__17757__delegate(article_branch,args__$1);
});
G__17757.cljs$core$IFn$_invoke$arity$variadic = G__17757__delegate;
return G__17757;
})()
;
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_manager._article_manager,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([args,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"initial-values","initial-values",1392120293),cljs.core.deref(initial_values),new cljs.core.Keyword(null,"edit-modal-open?","edit-modal-open?",41155726),cljs.core.deref(modal_open_QMARK_),new cljs.core.Keyword(null,"article-groups","article-groups",1175251219),article_groups,new cljs.core.Keyword(null,"toggle-audience-manager","toggle-audience-manager",847512216),toggle_audience_manager,new cljs.core.Keyword(null,"current-article","current-article",-1909510415),cljs.core.deref(current_article)], null)], 0))], null);
});
});

//# sourceMappingURL=kaleidoscope.ui.components.article_manager.js.map
