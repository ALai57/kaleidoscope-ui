goog.provide('kaleidoscope.ui.events.projects_portfolio');
kaleidoscope.ui.events.projects_portfolio.json_string__GT_clj = (function kaleidoscope$ui$events$projects_portfolio$json_string__GT_clj(s){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(JSON.parse(s));
});
kaleidoscope.ui.events.projects_portfolio.parse_project_skills = (function kaleidoscope$ui$events$projects_portfolio$parse_project_skills(p){
var skills = new cljs.core.Keyword(null,"skills_names","skills_names",-1821940437).cljs$core$IFn$_invoke$arity$1(p);
var parsed_skills = cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.events.projects_portfolio.json_string__GT_clj,skills);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p,new cljs.core.Keyword(null,"skills_names","skills_names",-1821940437),parsed_skills);
});
kaleidoscope.ui.events.projects_portfolio.load_portfolio_cards = (function kaleidoscope$ui$events$projects_portfolio$load_portfolio_cards(db,p__20333){
var vec__20359 = p__20333;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20359,(0),null);
var map__20362 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20359,(1),null);
var map__20362__$1 = cljs.core.__destructure_map(map__20362);
var response = map__20362__$1;
var projects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20362__$1,new cljs.core.Keyword(null,"projects","projects",-364845983));
var parsed_projects = cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.events.projects_portfolio.parse_project_skills,projects);
var updated_resume_info = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(response,new cljs.core.Keyword(null,"projects","projects",-364845983),parsed_projects);
var db_updates = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"loading-resume?","loading-resume?",-816285659),false,new cljs.core.Keyword(null,"resume-info","resume-info",1043035366),updated_resume_info,new cljs.core.Keyword(null,"selected-resume-info","selected-resume-info",612494333),updated_resume_info], null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.projects-portfolio",null,23,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Loading Portfolio cards %s",db_updates], null);
}),null)),null,1043906937,null);

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([db,db_updates], 0));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-portfolio-cards","load-portfolio-cards",-1472018988),kaleidoscope.ui.events.projects_portfolio.load_portfolio_cards);
if((typeof kaleidoscope !== 'undefined') && (typeof kaleidoscope.ui !== 'undefined') && (typeof kaleidoscope.ui.events !== 'undefined') && (typeof kaleidoscope.ui.events.projects_portfolio !== 'undefined') && (typeof kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card !== 'undefined')){
} else {
kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card = (function (){var method_table__5642__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5643__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5644__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5645__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5646__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__20375 = cljs.core.get_global_hierarchy;
return (fexpr__20375.cljs$core$IFn$_invoke$arity$0 ? fexpr__20375.cljs$core$IFn$_invoke$arity$0() : fexpr__20375.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("kaleidoscope.ui.events.projects-portfolio","select-projects-associated-with-card"),(function (p__20376,_){
var map__20377 = p__20376;
var map__20377__$1 = cljs.core.__destructure_map(map__20377);
var category = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,new cljs.core.Keyword(null,"category","category",-593092832));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20377__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return category;
}),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5646__auto__,method_table__5642__auto__,prefer_table__5643__auto__,method_cache__5644__auto__,cached_hierarchy__5645__auto__));
})();
}
kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"project","project",1124394579),(function (p__20381,projects){
var map__20383 = p__20381;
var map__20383__$1 = cljs.core.__destructure_map(map__20383);
var card_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20383__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (project){
var project_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(project);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(card_name,project_name);
}),projects);
}));
kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"organization","organization",-1639375379),(function (p__20400,projects){
var map__20401 = p__20400;
var map__20401__$1 = cljs.core.__destructure_map(map__20401);
var card_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20401__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (project){
var organizations = new cljs.core.Keyword(null,"organization_names","organization_names",-594956577).cljs$core$IFn$_invoke$arity$1(project);
return cljs.core.some((function (organization){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(card_name,organization);
}),organizations);
}),projects);
}));
kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"skill","skill",155065636),(function (p__20412,projects){
var map__20414 = p__20412;
var map__20414__$1 = cljs.core.__destructure_map(map__20414);
var card_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20414__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (project){
var skills = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.keys),new cljs.core.Keyword(null,"skills_names","skills_names",-1821940437).cljs$core$IFn$_invoke$arity$1(project));
return cljs.core.some((function (skill){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(card_name,skill);
}),skills);
}),projects);
}));
kaleidoscope.ui.events.projects_portfolio.select_organizations_associated_with_project = (function kaleidoscope$ui$events$projects_portfolio$select_organizations_associated_with_project(projects,organizations){
var associated_organizations = cljs.core.set(cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"organization_names","organization_names",-594956577),projects)));
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__20415){
var map__20416 = p__20415;
var map__20416__$1 = cljs.core.__destructure_map(map__20416);
var organization_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20416__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return (associated_organizations.cljs$core$IFn$_invoke$arity$1 ? associated_organizations.cljs$core$IFn$_invoke$arity$1(organization_name) : associated_organizations.call(null,organization_name));
}),organizations);
});
kaleidoscope.ui.events.projects_portfolio.select_portfolio_card = (function kaleidoscope$ui$events$projects_portfolio$select_portfolio_card(p__20419,p__20420){
var map__20421 = p__20419;
var map__20421__$1 = cljs.core.__destructure_map(map__20421);
var db = map__20421__$1;
var resume_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20421__$1,new cljs.core.Keyword(null,"resume-info","resume-info",1043035366));
var vec__20422 = p__20420;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20422,(0),null);
var map__20425 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20422,(1),null);
var map__20425__$1 = cljs.core.__destructure_map(map__20425);
var card = map__20425__$1;
var category = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20425__$1,new cljs.core.Keyword(null,"category","category",-593092832));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20425__$1,new cljs.core.Keyword(null,"name","name",1843675177));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.projects-portfolio",null,78,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Selecting Portfolio card: %s %s",category,name], null);
}),null)),null,1529625549,null);

var map__20430 = resume_info;
var map__20430__$1 = cljs.core.__destructure_map(map__20430);
var projects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20430__$1,new cljs.core.Keyword(null,"projects","projects",-364845983));
var organizations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20430__$1,new cljs.core.Keyword(null,"organizations","organizations",-755443762));
var skills = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20430__$1,new cljs.core.Keyword(null,"skills","skills",958701426));
var associated_projects = kaleidoscope.ui.events.projects_portfolio.select_projects_associated_with_card.cljs$core$IFn$_invoke$arity$2(card,projects);
var associated_orgs = kaleidoscope.ui.events.projects_portfolio.select_organizations_associated_with_project(associated_projects,organizations);
var associated_skills_names = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.keys),cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"skills_names","skills_names",-1821940437),associated_projects)));
var skills_filter = (function (s){
return cljs.core.some((function (skill_name){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(skill_name,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s));
}),associated_skills_names);
});
var associated_skills = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(skills_filter,skills);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([db,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"selected-resume-info","selected-resume-info",612494333),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organizations","organizations",-755443762),associated_orgs,new cljs.core.Keyword(null,"projects","projects",-364845983),associated_projects,new cljs.core.Keyword(null,"skills","skills",958701426),associated_skills], null),new cljs.core.Keyword(null,"selected-resume-category","selected-resume-category",-1444229257),category,new cljs.core.Keyword(null,"selected-resume-card","selected-resume-card",96904135),name], null)], 0));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"select-portfolio-card","select-portfolio-card",549276464),kaleidoscope.ui.events.projects_portfolio.select_portfolio_card);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"reset-portfolio-cards","reset-portfolio-cards",-288106784),(function (db,p__20450){
var vec__20451 = p__20450;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20451,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20451,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.projects-portfolio",null,111,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Resetting Portfolio cards"], null);
}),null)),null,1253242022,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"selected-resume-info","selected-resume-info",612494333),new cljs.core.Keyword(null,"resume-info","resume-info",1043035366).cljs$core$IFn$_invoke$arity$1(db));
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"request-portfolio-cards","request-portfolio-cards",-1171656429),(function (p__20454,p__20455){
var map__20456 = p__20454;
var map__20456__$1 = cljs.core.__destructure_map(map__20456);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20456__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__20457 = p__20455;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20457,(0),null);
var article_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__20457,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.get_portfolio(),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-portfolio-cards","load-portfolio-cards",-1472018988)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-portfolio-cards","load-portfolio-cards",-1472018988)], null)], null)], 0)),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"loading?","loading?",1905707049),true)], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.projects_portfolio.js.map
