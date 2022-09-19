(ns andrewslai.cljs.components.slate-editor
  (:require [reagent.core :as reagent]
            [goog.object :as g]
            ["pretty" :as pretty]
            ["@styled-icons/material/FormatQuote" :refer [FormatQuote]]
            ["@styled-icons/boxicons-regular/CodeBlock" :refer [CodeBlock]]
            ["@styled-icons/material/FormatAlignRight" :refer [FormatAlignRight]]
            ["@styled-icons/material/FormatAlignLeft" :refer [FormatAlignLeft]]
            ["@styled-icons/material/FormatAlignCenter" :refer [FormatAlignCenter]]
            ["@styled-icons/material/FormatAlignJustify" :refer [FormatAlignJustify]]
            ["@styled-icons/material/FormatListNumbered" :refer [FormatListNumbered]]
            ["@styled-icons/material/FormatListBulleted" :refer [FormatListBulleted]]
            ["@styled-icons/material/FormatIndentDecrease" :refer [FormatIndentDecrease]]
            ["@styled-icons/material/FormatIndentIncrease" :refer [FormatIndentIncrease]]
            ["@styled-icons/boxicons-regular/CodeAlt" :refer [CodeAlt]]
            ["@styled-icons/material/FormatBold" :refer [FormatBold]]
            ["@styled-icons/material/FormatItalic" :refer [FormatItalic]]
            ["@styled-icons/material/FormatStrikethrough" :refer [FormatStrikethrough]]
            ["@styled-icons/material/FormatUnderlined" :refer [FormatUnderlined]]
            ["@styled-icons/material/FormatColorText" :refer [FormatColorText]]
            ["@styled-icons/material/Check" :refer [Check]]
            ["@styled-icons/material/Link" :refer [Link]]
            ["prism-react-renderer" :as Highlight :refer [defaultProps]]
            ["prism-react-renderer/themes/dracula" :as theme]
            ["@udecode/plate" :as plate :refer
             [
              createBoldPlugin
              createItalicPlugin
              createUnderlinePlugin
              createStrikethroughPlugin
              createCodePlugin
              createCodeBlockPlugin

              createHeadingPlugin

              createBlockquotePlugin
              createParagraphPlugin
              createPlugins
              createHighlightPlugin

              createHorizontalRulePlugin   ;; Horizontal lines
              createIndentPlugin
              createLinkPlugin             ;; Hyperlinks
              createTablePlugin

              createListPlugin
              createAlignPlugin

              createFontColorPlugin
              createFontBackgroundColorPlugin
              createFontSizePlugin
              createIndentPlugin

              createSoftBreakPlugin
              SoftBreakPlugin

              createTrailingBlockPlugin
              TrailingBlockPlugin

              createExitBreakPlugin
              ExitBreakPlugin

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
              ELEMENT_OL
              ELEMENT_UL
              ELEMENT_H1
              ELEMENT_H2
              ELEMENT_H3
              ELEMENT_H4
              ELEMENT_H5
              ELEMENT_H6
              ELEMENT_ID

              MARK_BOLD
              MARK_CODE
              MARK_ITALIC
              MARK_STRIKETHROUGH
              MARK_SUBSCRIPT
              MARK_SUPERSCRIPT
              MARK_UNDERLINE
              MARK_BG_COLOR
              MARK_COLOR

              KEYS_HEADING

              HeadingToolbar

              ;; Toolbar buttons
              BlockToolbarButton
              CodeBlockToolbarButton
              AlignToolbarButton
              ListToolbarButton
              ToolbarButton
              MarkToolbarButton
              ColorPickerToolbarDropdown
              LinkToolbarButton

              indent
              outdent

              PlateProvider
              PlatePlugin
              getPluginType
              useEventPlateId
              usePlateEditorRef
              useEditorState
              serializeHtml

              PlateFloatingLink
              ]]))


;; TODO: Block selection.

;; https://plate.udecode.io/
;; Add Plate and use it and plugins for rich text editing
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

(def LINK-PLUGIN
  (createLinkPlugin #js {:renderAfterEditable PlateFloatingLink}))

(def INDENT-PLUGIN
  (createIndentPlugin #js {:inject
                           {:props
                            {:validTypes [ELEMENT_PARAGRAPH
                                          ELEMENT_H1
                                          ELEMENT_H2
                                          ELEMENT_H3
                                          ELEMENT_H4
                                          ELEMENT_H5
                                          ELEMENT_H6
                                          ELEMENT_BLOCKQUOTE
                                          ELEMENT_CODE_BLOCK
                                          ]}}}))

(def ALIGN-PLUGIN
  (createAlignPlugin #js {:inject
                          {:props
                           {:validTypes [ELEMENT_PARAGRAPH
                                         ELEMENT_H1
                                         ELEMENT_H2
                                         ELEMENT_H3
                                         ELEMENT_H4
                                         ELEMENT_H5
                                         ELEMENT_H6]}}}))

(def SOFT-BREAK-PLUGIN
  (createSoftBreakPlugin #js {:options
                              {:rules
                               [{:hotkey "shift+enter"}
                                {:hotkey "enter"
                                 :query {:allow [ELEMENT_CODE_BLOCK
                                                 ELEMENT_BLOCKQUOTE
                                                 ELEMENT_ID]}}]}}))

(def TRAILING-BLOCK-PLUGIN
  (createTrailingBlockPlugin #js {:options {:type ELEMENT_PARAGRAPH}}))

(def P-AFTER-H-PLUGIN
  (createExitBreakPlugin #js {:options
                              #js {:rules
                                   #js [#js {:hotkey "mod+enter"}
                                        #js {:hotkey "mod+shift+enter" :before true}
                                        #js {:hotkey "enter"
                                             :query  #js {:start true
                                                          :end   true
                                                          :allow KEYS_HEADING}}]}}))

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
                      (createCodePlugin)
                      (createFontColorPlugin)
                      (createFontBackgroundColorPlugin)
                      LINK-PLUGIN
                      (createListPlugin)
                      INDENT-PLUGIN
                      ALIGN-PLUGIN
                      SOFT-BREAK-PLUGIN
                      TRAILING-BLOCK-PLUGIN
                      P-AFTER-H-PLUGIN
                      ]
                 #js {:components PLATE-UI}))

(def PRISM
  (g/get Highlight/defaultProps "Prism"))

(def HighlightHTML
  Highlight/default)

(comment
  (js/console.log "HIGHLIGHT"
                  Highlight/default
                  theme/default
                  (g/get Highlight/defaultProps "Prism"))

  (pretty "<h1 class=\"slate-h1\">Deserialize HTML</h1><div class=\"slate-p\">By default, pasting content into a Slate editor will use the clipboard&apos;s <code class=\"slate-code\">&apos;text/plain&apos;</code>data. That&apos;s okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle <code class=\"slate-code\">&apos;text/html&apos;</code>data.</div><div class=\"slate-p\">This is an example of doing exactly that!</div><div class=\"slate-p\">Try it out for yourself! Copy and paste some rendered HTML rich text content (not the source code) from another site into this editor and it&apos;s formatting should be preserved.</div><div class=\"slate-p\"></div>")
  )

(defn Serialized
  []
  (let [editor (useEditorState)
        html   (serializeHtml editor #js {:nodes (.-children editor)})]
    ;;(js/console.log "EDITOR" editor "html" html "EL")
    [:div
     [:r> HighlightHTML
      #js {:Prism    PRISM
           :theme    theme/default
           :code     (pretty html)
           :language "jsx"}
      (fn [args]
        (let [{:keys [className style tokens getLineProps getTokenProps] :as clj-args}
              (js->clj args :keywordize-keys true)]
          ;;(js/console.log "ARGS" args clj-args)
          ;;(js/console.log "TOKENS" xxx)
          ;;(js/console.log "TOKENS" tokens (clj->js tokens))
          (reagent/as-element
           [:pre {:className className
                  :style     style}
            (map-indexed (fn [i line]
                           (let [line-props (getLineProps #js {:line line :key (str "line-" i)})]
                             [:div (assoc (js->clj line-props) :key i)
                              (map-indexed (fn [c token]
                                             (let [token-key   (str "token-" c)
                                                   token-props (getTokenProps (clj->js {:token token
                                                                                        :key   token-key}))]
                                               [:span (assoc (js->clj token-props)
                                                             :key token-key)]))
                                           (js->clj line))]))
                         tokens)])))]]))

;; https://plate.udecode.io/
;; https://codesandbox.io/s/sandpack-project-forked-fg0ipl?file=/ToolbarButtons.tsx:1457-1623
(defn toolbar
  []
  (let [editor-id  (useEventPlateId)
        editor-ref (usePlateEditorRef editor-id)]
    ;;(js/console.log "PLATE ID" editor-id "PLATE EDITOR REF" editor-ref)
    [:<>
     [:> MarkToolbarButton
      {:type (getPluginType editor-ref MARK_BOLD)
       :icon (reagent/create-element FormatBold)}]
     [:> MarkToolbarButton
      {:type (getPluginType editor-ref MARK_ITALIC)
       :icon (reagent/create-element FormatItalic)}]
     [:> MarkToolbarButton
      {:type (getPluginType editor-ref MARK_UNDERLINE)
       :icon (reagent/create-element FormatUnderlined)}]
     [:> MarkToolbarButton
      {:type (getPluginType editor-ref MARK_STRIKETHROUGH)
       :icon (reagent/create-element FormatStrikethrough)}]
     [:> MarkToolbarButton
      {:type (getPluginType editor-ref MARK_CODE)
       :icon (reagent/create-element CodeAlt)}]
     [:> ColorPickerToolbarDropdown
      {:pluginKey    MARK_COLOR
       :icon         (reagent/create-element FormatColorText)
       :selectedIcon (reagent/create-element Check)
       :tooltip      {:content "Text color"}}]
     [:> ColorPickerToolbarDropdown
      {:pluginKey    MARK_BG_COLOR
       :icon         (reagent/create-element FormatColorText)
       :selectedIcon (reagent/create-element Check)
       :tooltip      {:content "Highlight color"}}]
     [:> LinkToolbarButton
      {:icon (reagent/create-element Link)}]
     [:> BlockToolbarButton
      {:type (getPluginType editor-ref ELEMENT_BLOCKQUOTE)
       :icon (reagent/create-element FormatQuote)}]
     [:> CodeBlockToolbarButton
      {:type (getPluginType editor-ref ELEMENT_CODE_BLOCK)
       :icon (reagent/create-element CodeBlock)}]
     [:> ListToolbarButton
      {:type (getPluginType editor-ref ELEMENT_UL)
       :icon (reagent/create-element FormatListBulleted)}]
     [:> ListToolbarButton
      {:type (getPluginType editor-ref ELEMENT_OL)
       :icon (reagent/create-element FormatListNumbered)}]
     [:> ToolbarButton
      {:onMouseDown (fn [e]
                      (outdent editor-ref)
                      (.preventDefault e))
       :icon        (reagent/create-element FormatIndentDecrease)}]
     [:> ToolbarButton
      {:onMouseDown (fn [e]
                      (indent editor-ref)
                      (.preventDefault e))
       :icon        (reagent/create-element FormatIndentIncrease)}]
     [:> AlignToolbarButton
      {:value "left"
       :icon  (reagent/create-element FormatAlignLeft)}]
     [:> AlignToolbarButton
      {:value "center"
       :icon  (reagent/create-element FormatAlignCenter)}]
     [:> AlignToolbarButton
      {:value "right"
       :icon  (reagent/create-element FormatAlignRight)}]
     [:> AlignToolbarButton
      {:value "justify"
       :icon  (reagent/create-element FormatAlignJustify)}]
     ]))

(defn editor-ui
  [{:keys [none]}]
  (js/console.log "UI" PLATE-UI)
  (js/console.log "PLUGINS" PLUGINS)
  [:div
   [:> PlateProvider {:initialValue  INITIAL-VALUE
                      :plugins       PLUGINS}
    [:> HeadingToolbar
     ;; NOTE: Need to create a functional component. Since the component is
     ;; defined as a Clojurescript function, we need to do this where the CLJS
     ;; function is used, not inside the fn.
     [:f> toolbar]]
    [:> Plate
     {:editableProps {:placeholder "Type..."}
      :onChange      change-handler}
     [:f> Serialized]]
    ]])
