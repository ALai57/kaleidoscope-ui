(ns kaleidoscope.ui.components.slate-editor
  (:require [kaleidoscope.ui.components.navbar :as navbar]
            [kaleidoscope.ui.components.slate.serialization :as serialization]
            [kaleidoscope.ui.components.slate.code-block-helpers :as cb]
            [kaleidoscope.ui.components.modal :refer [modal-template MODAL-BACKGROUND]]
            [kaleidoscope.ui.core-api.user :as user]
            [kaleidoscope.ui.utils.core :as u]
            [goog.string :as gstr]
            [reagent.core :as reagent]
            [reagent-mui.components :refer [modal box]]
            ["@styled-icons/boxicons-regular/CodeAlt"      :refer [CodeAlt]]
            ["@styled-icons/boxicons-regular/CodeBlock"    :refer [CodeBlock]]
            ["@styled-icons/boxicons-regular/ImageAdd"     :refer [ImageAdd]]
            ["@styled-icons/boxicons-regular/Rocket"       :refer [Rocket]]
            ["@styled-icons/material/Check"                :refer [Check]]
            ["@styled-icons/material/FormatAlignCenter"    :refer [FormatAlignCenter]]
            ["@styled-icons/material/FormatAlignJustify"   :refer [FormatAlignJustify]]
            ["@styled-icons/material/FormatAlignLeft"      :refer [FormatAlignLeft]]
            ["@styled-icons/material/FormatAlignRight"     :refer [FormatAlignRight]]
            ["@styled-icons/material/FormatBold"           :refer [FormatBold]]
            ["@styled-icons/material/FormatColorText"      :refer [FormatColorText]]
            ["@styled-icons/material/FormatIndentDecrease" :refer [FormatIndentDecrease]]
            ["@styled-icons/material/FormatIndentIncrease" :refer [FormatIndentIncrease]]
            ["@styled-icons/material/FormatItalic"         :refer [FormatItalic]]
            ["@styled-icons/material/FormatListBulleted"   :refer [FormatListBulleted]]
            ["@styled-icons/material/FormatListNumbered"   :refer [FormatListNumbered]]
            ["@styled-icons/material/FormatQuote"          :refer [FormatQuote]]
            ["@styled-icons/material/FormatStrikethrough"  :refer [FormatStrikethrough]]
            ["@styled-icons/material/FormatUnderlined"     :refer [FormatUnderlined]]
            ["@styled-icons/material/Link"                 :refer [Link]]
            ["@styled-icons/remix-fill/Save3"              :refer [Save3]]
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
              createIndentPlugin

              createAutoformatPlugin
              unwrapList
              insertEmptyCodeBlock

              createSoftBreakPlugin

              createTrailingBlockPlugin

              createExitBreakPlugin

              createImagePlugin
              createMediaEmbedPlugin

              Plate

              CodeBlockToolbarButton
              createPlateUI

              ;; Element constants
              ELEMENT_DEFAULT
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
              ImageToolbarButton

              indent
              outdent

              PlateProvider
              getPluginType
              useEventPlateId
              usePlateEditorRef

              PlateFloatingLink
              ]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Log suppresion for known spammy logs
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn wrap-suppress-errors
  "Filter out useLayoutEffect warnings. These are known and really annoying/spammy

  See https://github.com/udecode/plate/issues/1047 for more details.

  The short story is that the serializeHtml function uses ReactDOMServer under
  the hood, which incorrectly assumes that it is running on the Server (it is
  rendering on the client because this is in Javascript!)."
  [logger]
  (fn [message url line column e]
    ;;(js/console.log "MY CUSTOM logger MESSAGE")
    ;;(js/console.log message url line column (type message) (re-matches #"Warning: useLayoutEffect does nothing on the server.*" message))
    (cond
      (not (string? message))                                                       (js/console.log "Unknown error" message)
      (re-matches #"Warning: useLayoutEffect does nothing on the server.*" message) nil
      :else                                                                         (logger message))))

(do
  (let [new-console (update (u/clojurize js/console)
                            :error
                            wrap-suppress-errors)]
    ;;(println new-console)
    ;;((:error new-console) "HI HI")
    ;;((:error new-console) "Warning: useLayoutEffect does nothing on the server.*")
    (set! js/console (clj->js new-console))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Core code
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(comment
  ;; https://plate.udecode.io/
  (def INITIAL-VALUE
    "This is what a serialized version of HTML looks like"
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
     ]))

(defn change-handler
  [x]
  (js/console.log "CHANGE" x))

(def PLATE-UI
  (createPlateUI (clj->js {ELEMENT_CODE_BLOCK
                           (reagent/reactify-component cb/CustomCodeBlock)
                           ;;CodeBlockElement
                           })))

(def LINK-PLUGIN
  (createLinkPlugin #js {:renderAfterEditable PlateFloatingLink}))

(def INDENT-PLUGIN
  (createIndentPlugin #js {:inject
                           #js {:props
                                #js {:validTypes (clj->js [ELEMENT_PARAGRAPH
                                                           ELEMENT_H1
                                                           ELEMENT_H2
                                                           ELEMENT_H3
                                                           ELEMENT_H4
                                                           ELEMENT_H5
                                                           ELEMENT_H6
                                                           ELEMENT_BLOCKQUOTE
                                                           ELEMENT_CODE_BLOCK
                                                           ])}}}))

(def ALIGN-PLUGIN
  (createAlignPlugin #js {:inject
                          #js {:props
                               #js {:validTypes (clj->js [ELEMENT_PARAGRAPH
                                                          ELEMENT_H1
                                                          ELEMENT_H2
                                                          ELEMENT_H3
                                                          ELEMENT_H4
                                                          ELEMENT_H5
                                                          ELEMENT_H6])}}}))

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

(def H-AUTOFORMATTERS
  [{:mode      "block"
    :type      ELEMENT_H1
    :match     "# "
    :preFormat (fn [editor] (unwrapList editor))}
   {:mode      "block"
    :type      ELEMENT_H2
    :match     "## "
    :preFormat (fn [editor] (unwrapList editor))}
   {:mode      "block"
    :type      ELEMENT_H3
    :match     "### "
    :preFormat (fn [editor] (unwrapList editor))}
   {:mode      "block"
    :type      ELEMENT_H4
    :match     "#### "
    :preFormat (fn [editor] (unwrapList editor))}
   {:mode      "block"
    :type      ELEMENT_H5
    :match     "##### "
    :preFormat (fn [editor] (unwrapList editor))}
   {:mode      "block"
    :type      ELEMENT_H6
    :match     "###### "
    :preFormat (fn [editor] (unwrapList editor))}
   ])

(def BLOCKQUOTE-AUTOFORMATTERS
  [{:mode  "block"
    :type  ELEMENT_BLOCKQUOTE
    :match "> "
    :preFormat (fn [editor] (unwrapList editor))}])

(def CODE-BLOCK-AUTOFORMATTERS
  [{:mode                "block"
    :type                ELEMENT_CODE_BLOCK
    :match               "```"
    :triggerAtBlockStart false
    :preFormat           (fn [editor] (unwrapList editor))
    :format              (fn [editor]
                           (insertEmptyCodeBlock editor #js {:defaultType        (getPluginType editor ELEMENT_DEFAULT)
                                                             :insertNodesOptions #js {:select true}}))}
   {:mode  "mark"
    :type  MARK_CODE
    :match "`"}
   ])

(def AUTOFORMAT-PLUGIN
  (createAutoformatPlugin
   #js {:options
        #js {:rules              (clj->js (concat H-AUTOFORMATTERS
                                                  BLOCKQUOTE-AUTOFORMATTERS
                                                  CODE-BLOCK-AUTOFORMATTERS))
             :enableUndoOnDelete true}}))

;; https://docs.slatejs.org/concepts/09-rendering#decorations
;; However, decorations are computed at render-time based on the content itself. This is helpful for dynamic formatting like syntax highlighting or search keywords, where changes to the content (or some external data) has the potential to change the formatting.
;; Decorations are different from Marks in that they are not stored on editor state.
(def CODE-BLOCK-PLUGIN
  (createCodeBlockPlugin
   #js {:syntax             true
        :syntaxPopularFirst true
        :deserializeHtml    cb/CODE-BLOCK-DESERIALIZATION
        :serializeHtml      cb/serialize-code-block}))

(def PLUGINS
  (createPlugins #js [(createParagraphPlugin)
                      (createBlockquotePlugin)
                      CODE-BLOCK-PLUGIN
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
                      (createImagePlugin #js {:props #js {:caption #js {:disabled true}}})
                      (createMediaEmbedPlugin)
                      AUTOFORMAT-PLUGIN
                      LINK-PLUGIN
                      (createListPlugin)
                      INDENT-PLUGIN
                      ALIGN-PLUGIN
                      SOFT-BREAK-PLUGIN
                      TRAILING-BLOCK-PLUGIN
                      P-AFTER-H-PLUGIN
                      ]
                 #js {:components PLATE-UI}))


(def nav-images-path "images/nav-bar/")
(defn img-path
  [fname]
  (str nav-images-path fname))

;; https://plate.udecode.io/
;; https://codesandbox.io/s/sandpack-project-forked-fg0ipl?file=/ToolbarButtons.tsx:1457-1623
(defn editing-toolbar
  [{:keys [show-modal]}]
  (let [editor-id  (useEventPlateId)
        editor-ref (usePlateEditorRef editor-id)]
    ;;(js/console.log "PLATE ID" editor-id "PLATE EDITOR REF" editor-ref)
    [:<>
     [:> navbar/zoom-icon {:style {:float            "left"
                                   :height           "48px"
                                   :margin-right     "20px"}}
      [:img.navbutton {:src      (img-path "favicon.svg")
                       :style    {:height "48px"}
                       :on-click (fn [event]
                                   (reset! show-modal true))}]]
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
     [:> CodeBlockToolbarButton
      {:icon (reagent/create-element CodeBlock)}]
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
     [:> ImageToolbarButton
      {:icon (reagent/create-element ImageAdd)}]
     [:> LinkToolbarButton
      {:icon (reagent/create-element Link)}]
     [:> BlockToolbarButton
      {:type (getPluginType editor-ref ELEMENT_BLOCKQUOTE)
       :icon (reagent/create-element FormatQuote)}]
     #_[:> CodeBlockToolbarButton
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

(defn management-toolbar
  [{:keys [user save-fn publish-fn initial-branch] :as args}]
  (let [{:keys [article-title branch-name article-url published-at]} initial-branch

        editor-id  (useEventPlateId)
        editor-ref (usePlateEditorRef editor-id)]
    [:<>
     [:div {:style {:width "100px"}}]
     [:> ToolbarButton
      {:icon        (reagent/create-element Save3)
       :tooltip     {:content "Save article"}
       :onMouseDown (fn [event]
                      (let [html (serialization/serialize editor-ref)]
                        (save-fn {:article-tags  "thoughts"
                                  :branch-name   branch-name
                                  :content       (gstr/format "<div>%s</div>" html)
                                  :article-url   article-url
                                  :article-title article-title})))}]
     [:> ToolbarButton
      {:icon        (reagent/create-element Rocket)
       :tooltip     {:content (if published-at (str "Published at " published-at) "Publish article!")}
       :onMouseDown (fn [event]
                      (publish-fn initial-branch))}]]))

(def PLATE
  (plate/createPlateUIEditor #js {:plugins PLUGINS}))

(defn plate-deserialize
  [content]
  (plate/deserializeHtml PLATE #js {:element         content
                                    :stripWhitespace false}))

(defn basic-modal
  [{:keys [open? title body footer level on-close]
    :or   {level "info"}}]
  [modal {:open          @open?
          :on-close      #(reset! open? false)
          :BackdropProps {:style {:background-color MODAL-BACKGROUND}}}
   [box {:class "modal-box"}
    [modal-template {:title    title
                     :body     body
                     :footer   footer
                     :on-close #(reset! open? false)
                     :level    level}]]])

(defn editor
  [{:keys [user save-fn initial-branch]
    :as   args}]
  ;;(js/console.log "UI" PLATE-UI)
  ;;(js/console.log "PLUGINS" PLUGINS)
  (let [{:keys [content article-title branch-id branch-name]} initial-branch

        plate-html (reagent/atom (plate-deserialize (or content "Start typing...")))
        show-modal (reagent/atom false)]
    ;;(js/console.log "*****************")
    ;;(js/console.log (plate-deserialize "SOME STUFF!"))
    ;;(js/console.log "*****************")
    (fn []
      ;;(println "PLATE HTML" plate-html "LOADED" loaded "INITIAL VALUE" initial-value)
      [:div {:key (str "editor" content)}
       [basic-modal {:open?    show-modal
                     :level    "warn"
                     :title    "Do you want to leave the editor? Any unsaved changes will be lost."
                     :body     [:div
                                [:button {:type     "button" :title "Not yet"
                                          :class    "btn btn-default"
                                          :on-click #(reset! show-modal false)}
                                 "Not yet"]
                                [:button {:type     "button" :title "Ok, I'm ready"
                                          :class    "btn btn-default"
                                          :on-click navbar/navigate-home!}
                                 "Ok, I'm ready"]]}]
       [:> PlateProvider {:initialValue @plate-html
                          :plugins      PLUGINS}
        [:div.divider.py-1.bg-dark]
        [:> HeadingToolbar {:style {:top "0px"}}
         ;; NOTE: Need to create a functional component. Since the component is
         ;; defined as a Clojurescript function, we need to do this where the CLJS
         ;; function is used, not inside the fn.
         [:f> editing-toolbar {:show-modal show-modal}]
         [:<> [:f> management-toolbar args]]
         ]

        [:div {:style {:height "120px"}}]
        [:div#primary-content
         [:div.article-title article-title]
         [:div.article-subheading (gstr/format "Author: %s" (user/get-username user))]
         [:div.article-subheading (u/date (.toISOString (new js/Date)))]
         [:div.divider.py-1.bg-dark]
         [:br][:br]
         [:div#article-content
          (try [:> Plate
                {:editableProps {:placeholder "Type..."}
                 :onChange      change-handler}
                [:f> serialization/PrettyHtml]]
               (catch js/Error e
                 (println "Error occurred")))]]]])))




(comment
  (plate/deserializeHtml (plate/Plate {:plugins PLUGINS}) #js {:element         content
                                                               :stripWhitespace false})

  )
