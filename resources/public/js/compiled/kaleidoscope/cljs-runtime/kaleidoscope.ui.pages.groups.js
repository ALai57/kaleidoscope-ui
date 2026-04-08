goog.provide('kaleidoscope.ui.pages.groups');
kaleidoscope.ui.pages.groups._add_group_BANG_ = (function kaleidoscope$ui$pages$groups$_add_group_BANG_(group_name){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.pages.groups",null,11,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Creating group %s",group_name], null);
}),null)),null,-304311459,null);

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-group!","add-group!",999555200),group_name], null));
});
kaleidoscope.ui.pages.groups._delete_group_BANG_ = (function kaleidoscope$ui$pages$groups$_delete_group_BANG_(group){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),group], null));
});
kaleidoscope.ui.pages.groups._add_member_BANG_ = (function kaleidoscope$ui$pages$groups$_add_member_BANG_(group,p__18225){
var map__18226 = p__18225;
var map__18226__$1 = cljs.core.__destructure_map(map__18226);
var member = map__18226__$1;
var email = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18226__$1,new cljs.core.Keyword(null,"email","email",1415816706));
var alias = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18226__$1,new cljs.core.Keyword(null,"alias","alias",-2039751630));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),group,member], null));
});
kaleidoscope.ui.pages.groups._delete_member_BANG_ = (function kaleidoscope$ui$pages$groups$_delete_member_BANG_(group,member_id){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),group,member_id], null));
});
kaleidoscope.ui.pages.groups._group_page = (function kaleidoscope$ui$pages$groups$_group_page(p__18227){
var map__18228 = p__18227;
var map__18228__$1 = cljs.core.__destructure_map(map__18228);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18228__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18228__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18228__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var open = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(groups),false)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#primary-content","div#primary-content",1350036775),cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.group_manager,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"groups","groups",-136896102),groups,new cljs.core.Keyword(null,"open","open",-1763596448),open,new cljs.core.Keyword(null,"add-group!","add-group!",999555200),kaleidoscope.ui.pages.groups._add_group_BANG_,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),kaleidoscope.ui.pages.groups._delete_group_BANG_,new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),kaleidoscope.ui.pages.groups._add_member_BANG_,new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),kaleidoscope.ui.pages.groups._delete_member_BANG_], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["group-manager-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(groups)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"memberships","memberships",1865599157),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([groups], 0))))].join('')], null))], null)], null);
});
kaleidoscope.ui.pages.groups.group_page = (function kaleidoscope$ui$pages$groups$group_page(p__18229){
var map__18230 = p__18229;
var map__18230__$1 = cljs.core.__destructure_map(map__18230);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18230__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18230__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.groups._group_page,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type,new cljs.core.Keyword(null,"groups","groups",-136896102),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"groups","groups",-136896102)], null)))], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.groups.js.map
