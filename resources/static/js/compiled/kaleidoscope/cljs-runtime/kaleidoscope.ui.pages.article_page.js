goog.provide('kaleidoscope.ui.pages.article_page');
kaleidoscope.ui.pages.article_page._article_page = (function kaleidoscope$ui$pages$article_page$_article_page(p__19866){
var map__19867 = p__19866;
var map__19867__$1 = cljs.core.__destructure_map(map__19867);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19867__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19867__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var active_content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19867__$1,new cljs.core.Keyword(null,"active-content","active-content",-1148974551));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#primary-content","div#primary-content",1350036775),(cljs.core.truth_(active_content)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article.article,active_content], null):null)], null)], null);
});
kaleidoscope.ui.pages.article_page.article_page = (function kaleidoscope$ui$pages$article_page$article_page(p__19873){
var map__19874 = p__19873;
var map__19874__$1 = cljs.core.__destructure_map(map__19874);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19874__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19874__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.article_page._article_page,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460)], null))),new cljs.core.Keyword(null,"active-content","active-content",-1148974551),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"active-content","active-content",-1148974551)], null)))], null)], null);
});
kaleidoscope.ui.pages.article_page._archive_page = (function kaleidoscope$ui$pages$article_page$_archive_page(p__19877){
var map__19878 = p__19877;
var map__19878__$1 = cljs.core.__destructure_map(map__19878);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19878__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19878__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
var recent_content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19878__$1,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.navbar.nav_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#primary-content","div#primary-content",1350036775),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#rcb","div#rcb",-1088873850),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.recent_content_cards,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460),recent_content], null)], null)], null)], null)], null);
});
kaleidoscope.ui.pages.article_page.archive_page = (function kaleidoscope$ui$pages$article_page$archive_page(p__19881){
var map__19882 = p__19881;
var map__19882__$1 = cljs.core.__destructure_map(map__19882);
var user = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19882__$1,new cljs.core.Keyword(null,"user","user",1532431356));
var notification_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19882__$1,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.pages.article_page._archive_page,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"user","user",1532431356),user,new cljs.core.Keyword(null,"notification-type","notification-type",-1128323787),notification_type,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460)], null)))], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.pages.article_page.js.map
