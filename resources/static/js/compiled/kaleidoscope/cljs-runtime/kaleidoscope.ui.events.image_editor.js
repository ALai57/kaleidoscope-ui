goog.provide('kaleidoscope.ui.events.image_editor');
kaleidoscope.ui.events.image_editor.grouped_metadata__GT_gallery_object = (function kaleidoscope$ui$events$image_editor$grouped_metadata__GT_gallery_object(p__18071){
var vec__18072 = p__18071;
var map__18075 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18072,(0),null);
var map__18075__$1 = cljs.core.__destructure_map(map__18075);
var group = map__18075__$1;
var hostname = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18075__$1,new cljs.core.Keyword(null,"hostname","hostname",2105669933));
var photo_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18075__$1,new cljs.core.Keyword(null,"photo-id","photo-id",108052797));
var photo_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18075__$1,new cljs.core.Keyword(null,"photo-title","photo-title",1699633014));
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18075__$1,new cljs.core.Keyword(null,"description","description",-1428560544));
var images = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18072,(1),null);
var first_image = cljs.core.first(images);
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"name","name",1843675177),photo_id,new cljs.core.Keyword(null,"created_at","created_at",1484050750),new cljs.core.Keyword(null,"created-at","created-at",-89248644).cljs$core$IFn$_invoke$arity$1(first_image),new cljs.core.Keyword(null,"creator","creator",-1069241724),"Andrew Lai",new cljs.core.Keyword(null,"title","title",636505583),photo_title,new cljs.core.Keyword(null,"description","description",-1428560544),description,new cljs.core.Keyword(null,"versions","versions",536521978),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__18076){
var map__18077 = p__18076;
var map__18077__$1 = cljs.core.__destructure_map(map__18077);
var image = map__18077__$1;
var image_category = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18077__$1,new cljs.core.Keyword(null,"image-category","image-category",709567848));
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18077__$1,new cljs.core.Keyword(null,"path","path",-188191168));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(image_category),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),path], null));
}),cljs.core.PersistentArrayMap.EMPTY,images)], null);
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-image-metadata.success","load-image-metadata.success",1904563897),(function kaleidoscope$ui$events$image_editor$load_image_metadata_success(db,p__18078){
var vec__18079 = p__18078;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18079,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18079,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,97,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Retrieved all image metadata: found %s",cljs.core.count(response)], null);
}),null)),null,150061675,null);

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"kaleidoscope.ui.events.image-editor",null,98,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Image metadata %s",response], null);
}),null)),null,1625201554,null);

var xformed_data = cljs.core.map.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.events.image_editor.grouped_metadata__GT_gallery_object,cljs.core.group_by((function (photo){
return cljs.core.select_keys(photo,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hostname","hostname",2105669933),new cljs.core.Keyword(null,"photo-id","photo-id",108052797),new cljs.core.Keyword(null,"photo-title","photo-title",1699633014),new cljs.core.Keyword(null,"description","description",-1428560544)], null));
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__18082){
var map__18083 = p__18082;
var map__18083__$1 = cljs.core.__destructure_map(map__18083);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18083__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var image_category = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18083__$1,new cljs.core.Keyword(null,"image-category","image-category",709567848));
var and__5043__auto__ = path;
if(cljs.core.truth_(and__5043__auto__)){
return image_category;
} else {
return and__5043__auto__;
}
}),response)));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,105,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Transformed image metadata %s",xformed_data], null);
}),null)),null,913193935,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"images-metadata","images-metadata",909025836),xformed_data);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-image-metadata.failure","load-image-metadata.failure",1183451911),(function kaleidoscope$ui$events$image_editor$load_image_metadata_failure(db,p__18084){
var vec__18085 = p__18084;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18085,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18085,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"kaleidoscope.ui.events.image-editor",null,111,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to retrieve image metadata %s",response], null);
}),null)),null,-629164787,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"load-image-metadata","load-image-metadata",-1802194544),(function (p__18088,p__18089){
var map__18090 = p__18088;
var map__18090__$1 = cljs.core.__destructure_map(map__18090);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18090__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__18091 = p__18089;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18091,(0),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,116,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Requesting all branches"], null);
}),null)),null,-415631627,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.get_image_metadata(),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-image-metadata.success","load-image-metadata.success",1904563897)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-image-metadata.failure","load-image-metadata.failure",1183451911)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-photo.success","add-photo.success",-1697242005),(function kaleidoscope$ui$events$image_editor$add_photo_success(db,p__18094){
var vec__18095 = p__18094;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18095,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18095,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,126,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Added photos! %s",response], null);
}),null)),null,-2042405374,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-image-metadata","load-image-metadata",-1802194544)], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-photo.failure","add-photo.failure",1732869261),(function kaleidoscope$ui$events$image_editor$add_photo_failure(db,p__18098){
var vec__18099 = p__18098;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18099,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18099,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,133,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed adding photos! %s",response], null);
}),null)),null,-672201399,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"add-photo!","add-photo!",-214035333),(function (p__18102,p__18103){
var map__18104 = p__18102;
var map__18104__$1 = cljs.core.__destructure_map(map__18104);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18104__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__18105 = p__18103;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18105,(0),null);
var files = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18105,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,138,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding Photos",files], null);
}),null)),null,570295279,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.add_photo_BANG_(files),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-photo.success","add-photo.success",-1697242005)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add-photo.failure","add-photo.failure",1732869261)], null)], null)], 0))], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"edit-photo.success","edit-photo.success",102219711),(function kaleidoscope$ui$events$image_editor$edit_photo_success(db,p__18108){
var vec__18109 = p__18108;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18109,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18109,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,148,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Edited photos! %s",response], null);
}),null)),null,-158472559,null);

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"load-image-metadata","load-image-metadata",-1802194544)], null));

return db;
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"edit-photo.failure","edit-photo.failure",-2036122727),(function kaleidoscope$ui$events$image_editor$edit_photo_failure(db,p__18112){
var vec__18113 = p__18112;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18113,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18113,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,155,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed editing photos! %s",response], null);
}),null)),null,561747998,null);

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"edit-photo!","edit-photo!",-948161522),(function (p__18116,p__18117){
var map__18118 = p__18116;
var map__18118__$1 = cljs.core.__destructure_map(map__18118);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18118__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__18119 = p__18117;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18119,(0),null);
var payload = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18119,(1),null);
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.events.image-editor",null,160,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Editing Photo",payload], null);
}),null)),null,-259560251,null);

var token = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"keycloak","keycloak",605028133).cljs$core$IFn$_invoke$arity$1(db).token;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "test";
}
})();
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([kaleidoscope.ui.clients.kaleidoscope.with_authorization(kaleidoscope.ui.clients.kaleidoscope.edit_photo_BANG_(payload),token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-photo.success","edit-photo.success",102219711)], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-photo.failure","edit-photo.failure",-2036122727)], null)], null)], 0))], null);
}));

//# sourceMappingURL=kaleidoscope.ui.events.image_editor.js.map
