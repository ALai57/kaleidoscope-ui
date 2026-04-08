goog.provide('kaleidoscope.ui.components.groups.group_manager');
kaleidoscope.ui.components.groups.group_manager.delete_member_cell = (function kaleidoscope$ui$components$groups$group_manager$delete_member_cell(props){
return reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var row = kaleidoscope.ui.utils.core.clojurize(props.row);
var delete_member_BANG_ = new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610).cljs$core$IFn$_invoke$arity$1(row);
var G__23613 = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(row);
return (delete_member_BANG_.cljs$core$IFn$_invoke$arity$1 ? delete_member_BANG_.cljs$core$IFn$_invoke$arity$1(G__23613) : delete_member_BANG_.call(null,G__23613));
})], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null));
});
kaleidoscope.ui.components.groups.group_manager.USER_COLUMNS = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"headerName","headerName",555903558),"ID",new cljs.core.Keyword(null,"width","width",-384071477),(100)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"alias","alias",-2039751630),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Name",new cljs.core.Keyword(null,"width","width",-384071477),(180)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Email",new cljs.core.Keyword(null,"width","width",-384071477),(200)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"membership-created-at","membership-created-at",-287992449),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Added",new cljs.core.Keyword(null,"width","width",-384071477),(180)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"headerName","headerName",555903558),"",new cljs.core.Keyword(null,"renderCell","renderCell",-454322680),kaleidoscope.ui.components.groups.group_manager.delete_member_cell], null)], null);
kaleidoscope.ui.components.groups.group_manager.add_group_item = (function kaleidoscope$ui$components$groups$group_manager$add_group_item(p__23614){
var map__23615 = p__23614;
var map__23615__$1 = cljs.core.__destructure_map(map__23615);
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23615__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23615__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23615__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (x){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked ",text], 0));
}));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_icon,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [icon], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,text], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.list_entry = (function kaleidoscope$ui$components$groups$group_manager$list_entry(p__23616){
var map__23617 = p__23616;
var map__23617__$1 = cljs.core.__destructure_map(map__23617);
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23617__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23617__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23617__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (x){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked ",text], 0));
}));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23617__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"secondaryAction","secondaryAction",1740067390),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),delete_group_BANG_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null)], null))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_icon,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [icon], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,text], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.new_member_entry = (function kaleidoscope$ui$components$groups$group_manager$new_member_entry(add_member_BANG_){
var new_member_name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change_member_name = (function (e){
return cljs.core.reset_BANG_(new_member_name,kaleidoscope.ui.utils.events.event_value(e));
});
var new_member_email = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change_member_email = (function (e){
return cljs.core.reset_BANG_(new_member_email,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.person_add.person_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-member-name-input",new cljs.core.Keyword(null,"label","label",1718410804),"Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"250px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change_member_name], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-member-email-input",new cljs.core.Keyword(null,"label","label",1718410804),"Email",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"350px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change_member_email], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a member",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_member_BANG_,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"alias","alias",-2039751630),cljs.core.deref(new_member_name),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.deref(new_member_email)], null))], null)], null)], null);
});
});
kaleidoscope.ui.components.groups.group_manager.group_entry = (function kaleidoscope$ui$components$groups$group_manager$group_entry(p__23618){
var map__23619 = p__23618;
var map__23619__$1 = cljs.core.__destructure_map(map__23619);
var group = map__23619__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
var memberships = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"memberships","memberships",1865599157));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756));
var delete_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610));
var add_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23619__$1,new cljs.core.Keyword(null,"add-member!","add-member!",-23827290));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.list_entry,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"icon","icon",1679606541),reagent_mui.icons.group.group,new cljs.core.Keyword(null,"text","text",-1790561697),display_name,new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),delete_group_BANG_], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.collapse,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"40px"], null),new cljs.core.Keyword(null,"in","in",-1531184865),open_QMARK_,new cljs.core.Keyword(null,"timeout","timeout",-318625318),"auto",new cljs.core.Keyword(null,"unmountOnExit","unmountOnExit",301067374),true], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.new_member_entry,add_member_BANG_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.table.table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"columns","columns",1998437288),kaleidoscope.ui.components.groups.group_manager.USER_COLUMNS,new cljs.core.Keyword(null,"rows","rows",850049680),((cljs.core.empty_QMARK_(memberships))?cljs.core.PersistentVector.EMPTY:cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (membership){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(clojure.set.rename_keys(membership,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"membership-id","membership-id",-723542492),new cljs.core.Keyword(null,"id","id",-1388402092)], null)),new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),delete_member_BANG_);
}),memberships)),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),(800)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.add_group_form = (function kaleidoscope$ui$components$groups$group_manager$add_group_form(p__23620){
var map__23621 = p__23620;
var map__23621__$1 = cljs.core.__destructure_map(map__23621);
var add_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23621__$1,new cljs.core.Keyword(null,"add-group!","add-group!",999555200));
var new_group_name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change = (function (e){
return cljs.core.reset_BANG_(new_group_name,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.group_add.group_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-group-name-input",new cljs.core.Keyword(null,"label","label",1718410804),"Group Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"350px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a new group",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_group_BANG_,cljs.core.deref(new_group_name))], null)], null)], null);
});
});
kaleidoscope.ui.components.groups.group_manager.group_manager = (function kaleidoscope$ui$components$groups$group_manager$group_manager(p__23622){
var map__23623 = p__23622;
var map__23623__$1 = cljs.core.__destructure_map(map__23623);
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23623__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23623__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var add_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23623__$1,new cljs.core.Keyword(null,"add-group!","add-group!",999555200),(function (group_name){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,151,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding group `%s`!",group_name], null);
}),null)),null,-1683561281,null);
}));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23623__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),(function (group){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,152,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting group!"], null);
}),null)),null,-1900270882,null);
}));
var add_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23623__$1,new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),(function (group,member){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,153,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding member!"], null);
}),null)),null,1830085988,null);
}));
var delete_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__23623__$1,new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),(function (group,member){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,154,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting member!"], null);
}),null)),null,-563196306,null);
}));
var indexed_groups = cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(group,new cljs.core.Keyword(null,"idx","idx",1053688473),idx,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_member_BANG_,group),new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(delete_member_BANG_,group),new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(delete_group_BANG_,group),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(open,cljs.core.update,idx,cljs.core.not);
})], 0));
}),groups);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.add_group_form,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add-group!","add-group!",999555200),add_group_BANG_], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.divider], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__23624(s__23625){
return (new cljs.core.LazySeq(null,(function (){
var s__23625__$1 = s__23625;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__23625__$1);
if(temp__5804__auto__){
var s__23625__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__23625__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__23625__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__23627 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__23626 = (0);
while(true){
if((i__23626 < size__5522__auto__)){
var map__23628 = cljs.core._nth(c__5521__auto__,i__23626);
var map__23628__$1 = cljs.core.__destructure_map(map__23628);
var group = map__23628__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23628__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
cljs.core.chunk_append(b__23627,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.group_entry,group], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)));

var G__23630 = (i__23626 + (1));
i__23626 = G__23630;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__23627),kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__23624(cljs.core.chunk_rest(s__23625__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__23627),null);
}
} else {
var map__23629 = cljs.core.first(s__23625__$2);
var map__23629__$1 = cljs.core.__destructure_map(map__23629);
var group = map__23629__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23629__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.group_entry,group], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)),kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__23624(cljs.core.rest(s__23625__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (group,open_QMARK_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(group,new cljs.core.Keyword(null,"open?","open?",1238443125),open_QMARK_);
}),indexed_groups,cljs.core.deref(open)));
})()], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.groups.group_manager.js.map
