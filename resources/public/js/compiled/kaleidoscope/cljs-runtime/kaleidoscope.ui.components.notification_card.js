goog.provide('kaleidoscope.ui.components.notification_card');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$styled_icons$remix_fill$ErrorWarning$ErrorWarning_esm=shadow.js.require("module$node_modules$$styled_icons$remix_fill$ErrorWarning$ErrorWarning_esm", {});
kaleidoscope.ui.components.notification_card.Error = reagent.core.create_element.cljs$core$IFn$_invoke$arity$2(module$node_modules$$styled_icons$remix_fill$ErrorWarning$ErrorWarning_esm.ErrorWarning,({"color": "red"}));
kaleidoscope.ui.components.notification_card.Warn = reagent.core.create_element.cljs$core$IFn$_invoke$arity$2(module$node_modules$$styled_icons$remix_fill$ErrorWarning$ErrorWarning_esm.ErrorWarning,({"color": "orange"}));
kaleidoscope.ui.components.notification_card.ICONS = new cljs.core.PersistentArrayMap(null, 2, ["error",kaleidoscope.ui.components.notification_card.Error,"warn",kaleidoscope.ui.components.notification_card.Warn], null);
kaleidoscope.ui.components.notification_card.notification_card = (function kaleidoscope$ui$components$notification_card$notification_card(p__42635){
var map__42636 = p__42635;
var map__42636__$1 = cljs.core.__destructure_map(map__42636);
var notification = map__42636__$1;
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__42636__$1,new cljs.core.Keyword(null,"level","level",1290497552),"error");
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42636__$1,new cljs.core.Keyword(null,"title","title",636505583));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42636__$1,new cljs.core.Keyword(null,"message","message",-406056002));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"text-white bg-light mb-3 article-card"], null),cljs.core.get.cljs$core$IFn$_invoke$arity$3(kaleidoscope.ui.components.notification_card.ICONS,level,kaleidoscope.ui.components.notification_card.Error),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_content,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"gutter-bottom","gutter-bottom",632945615),true,new cljs.core.Keyword(null,"variant","variant",-424354234),"h5",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"color","color",1011675173),"text.primary"], null),title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_content,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"body2",new cljs.core.Keyword(null,"color","color",1011675173),"text.primary"], null),message], null)], null)], null);
});

//# sourceMappingURL=kaleidoscope.ui.components.notification_card.js.map
