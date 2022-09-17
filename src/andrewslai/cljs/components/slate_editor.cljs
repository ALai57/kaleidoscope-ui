(ns andrewslai.cljs.components.slate-editor
  (:require [reagent.core :as reagent]
            ["@udecode/plate" :as plate :refer
             [createBlockquotePlugin
              createBoldPlugin
              createCodeBlockPlugin
              createCodePlugin
              createHeadingPlugin
              createItalicPlugin
              createParagraphPlugin
              createPlugins
              createStrikethroughPlugin
              createUnderlinePlugin
              createHighlightPlugin

              createHorizontalRulePlugin   ;; Horizontal lines
              createIndentPlugin
              createLinkPlugin             ;; Hyperlinks
              createTablePlugin

              Plate
              TEditableProps

              CodeBlockElement
              createPlateUI
              StyledElement
              withProps

              ;; Element constants
              ELEMENT_BLOCKQUOTE
              ELEMENT_CODE_BLOCK
              ELEMENT_PARAGRAPH

              ;; Toolbar buttons
              BlockToolbarButton,
              CodeBlockToolbarButton

              PlateProvider
              getPluginType
              useEventPlateId
              usePlateEditorRef
              ]]))


;; https://plate.udecode.io/
;; Add Plate and use it and plugins for rich text editing

(def BASIC-ELEMENTS
  [:hh1 "🧱 Elements"])

(def x
  {:type "p"
   :children [{:text "This is editable plain text"}]})

(def INITIAL-VALUE
  [{:type "p" :children [{:text "This is editable plain text"}]}
   {:type "h1" :children [{:text "🧱 Elements"}]}
   {:type "h2" :children [{:text "🔥 Basic Elements"}]}
   {:type "h1" :children [{:text "Heading 1"}]}
   {:type "h2" :children [{:text "Heading 2"}]}
   {:type "h3" :children [{:text "Heading 3"}]}
   {:type "h4" :children [{:text "Heading 4"}]}
   {:type "h5" :children [{:text "Heading 5"}]}
   {:type "h6" :children [{:text "Heading 6"}]}
   {:type "blockquote" :children [{:text "Blockquote"}]}
   {:type "codeblock" :children [{:type "codeline" :children [{:text "const a = 'Hello';"}]}
                                 {:type "codeline" :children [{:text "const b = 'Bye';"}]}]}


   {:type "h1" :children [{:text "💅 Marks"}]}
   {:type "h2" :children [{:text "💧 Basic marks"}]}
   {:type "p" :children [{:text (str "The basic marks consist of text formatting such as "
                                     "bold, italic, underline, strikethrough, subscript, superscript, and code.")}]}
   {:type "p" :children [{:text "This text is bold"
                          :bold true}]}
   {:type "p" :children [{:text   "This text is italic"
                          :italic true}]}
   {:type "p" :children [{:text      "This text is underlined"
                          :underline true}]}
   {:type "p" :children [{:text      "This text is bold italic and underlined"
                          :bold      true
                          :italic    true
                          :underline true}]}
   {:type "p" :children [{:text          "This text is strikethrough"
                          :strikethrough true}]}
   {:type "p" :children [{:text "This text is inline code"
                          :code true}]}
   ])

(defn change-handler
  [x]
  (js/console.log "CHANGE" x))

(def PLATE-UI
  (createPlateUI {[ELEMENT_CODE_BLOCK] CodeBlockElement
                  [ELEMENT_PARAGRAPH]  (withProps StyledElement
                                                  {:prefixClassNames "p"
                                                   :styles           {:root
                                                                      {:margin  0
                                                                       :padding "4 px 0"}}})}))

(def PLUGINS
  (createPlugins #js [(createParagraphPlugin)
                      (createBlockquotePlugin)
                      (createCodeBlockPlugin)
                      (createHeadingPlugin)
                      (createBoldPlugin)
                      (createHighlightPlugin)
                      (createHorizontalRulePlugin)
                      (createItalicPlugin)
                      (createUnderlinePlugin)
                      (createStrikethroughPlugin)
                      (createLinkPlugin)
                      (createTablePlugin)
                      (createCodePlugin)]
                 #js {:components PLATE-UI}))

(defn toolbar
  []
  [:> BlockToolbarButton
   {:type (getPluginType (usePlateEditorRef (useEventPlateId)))}])

(defn editor-ui
  [{:keys [none]}]
  (js/console.log "UI" PLATE-UI)
  (js/console.log "PLUGINS" PLUGINS)
  [:> PlateProvider
   {:initialValue  INITIAL-VALUE
    :plugins       PLUGINS}
   [:> Plate
    {:editableProps {:placeholder "Type..."}
     :onChange      change-handler}]])
