(ns andrewslai.cljs.components.slate-editor
  (:require [andrewslai.cljs.components.article-selector :as article-selector]
            [reagent.core :as reagent]
            ["react" :as react]
            [re-frame.core :refer [dispatch dispatch-sync]]
            [reagent-mui.components :refer [text-field button]]
            [goog.object :as g]
            [goog.string :as gstr]
            [andrewslai.cljs.article-cards :as article-cards]
            ["pretty" :as pretty]
            ["@styled-icons/material/FormatQuote" :refer [FormatQuote]]
            ["@styled-icons/boxicons-regular/Library" :refer [Library]]
            ["@styled-icons/boxicons-regular/CodeBlock" :refer [CodeBlock]]
            ["@styled-icons/boxicons-regular/Hide" :refer [Hide]]
            ["@styled-icons/boxicons-regular/Rocket" :refer [Rocket]]
            ["@styled-icons/boxicons-regular/ImageAdd" :refer [ImageAdd]]
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
            ["@styled-icons/remix-fill/Save3" :refer [Save3]]
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

              createImagePlugin
              createMediaEmbedPlugin

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
              ImageToolbarButton

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
              parseHtmlDocument
              ]]
            [taoensso.timbre :refer-macros [infof]]))

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
    ;;(js/console.log message (type message) (re-matches #"Warning: useLayoutEffect does nothing on the server.*" message))
    (if-not (re-matches #"Warning: useLayoutEffect does nothing on the server.*" message)
      (logger message))))

(do
  (let [new-console (update (js->clj js/console :keywordize-keys true)
                            :error
                            wrap-suppress-errors)]
    ;;(println new-console)
    ;;((:error new-console) "HI HI")
    ;;((:error new-console) "Warning: useLayoutEffect does nothing on the server.*")
    (set! js/console (clj->js new-console))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Core code
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; TODO: Block selection.

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
                      (createImagePlugin #js {:props #js {:caption #js {:disabled true}}})
                      (createMediaEmbedPlugin)
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

(defn unescape
  "https://github.com/reagent-project/reagent/issues/413"
  [s]
  (and s (gstr/unescapeEntities s)))

(defn Serialized
  []
  (let [editor (useEditorState)
        html   (serializeHtml editor #js {:nodes (.-children editor)})]
    ;;(js/console.log "EDITOR" editor)
    ;;(js/console.log "SERIALIZED HTML" html)
    ;;(js/console.log "CHILDREN" (.-children editor))
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
                             (into [:<>]
                                   (map-indexed (fn [c token]
                                                  (let [token-key   (str "token-" c)
                                                        token-props (getTokenProps (clj->js {:token token
                                                                                             :key   token-key}))
                                                        m           (-> token-props
                                                                        (js->clj)
                                                                        (assoc :key token-key)
                                                                        (update "children" unescape))]
                                                    [:span m]))
                                                (js->clj line)))]))
                        tokens)])))]))

;; https://plate.udecode.io/
;; https://codesandbox.io/s/sandpack-project-forked-fg0ipl?file=/ToolbarButtons.tsx:1457-1623
(defn editing-toolbar
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
     [:> ImageToolbarButton
      {:icon (reagent/create-element ImageAdd)}]
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

(defn expand-button
  [{:keys [on-click]}]
  [:> ToolbarButton
   {:onMouseDown on-click
    :icon        (reagent/create-element Library)}])

(defn management-toolbar
  [{:keys [user save-fn load-fn publish-fn branches initial-branch] :as args}]
  (let [{:keys [title branch-name article-url published-at]} initial-branch

        editor-id  (useEventPlateId)
        editor-ref (usePlateEditorRef editor-id)]
    [:<>
     [article-selector/article-selector
      {:expand-button expand-button
       :branches      branches
       :on-click      load-fn}]
     [:> ToolbarButton
      {:icon        (reagent/create-element Save3)
       :onMouseDown (fn [event]
                      (let [html (serializeHtml editor-ref #js {:nodes (.-children editor-ref)})]
                        (save-fn {:article-tags "thoughts"
                                  :branch-name  branch-name
                                  :content      (gstr/format "<div>%s</div>" html)
                                  :article-url  article-url
                                  :title        title})))}]
     (if published-at
       [:> ToolbarButton
        {:icon        (reagent/create-element Hide)
         :onMouseDown (fn [event]
                        (js/console.log "Deleting branch not implemented yet"))}]
       [:> ToolbarButton
        {:icon        (reagent/create-element Rocket)
         :onMouseDown (fn [event]
                        (publish-fn initial-branch))}])]))

(defn deserializer
  [{:keys [raw-html deserialized-html loaded]
    :or   {raw-html ""}}]
  (infof "Checking if HTML is loaded: %s" @loaded)
  (if-not @loaded
    (let [editor-id  (useEventPlateId)
          editor-ref (usePlateEditorRef editor-id)
          html       (plate/deserializeHtml editor-ref #js {:element raw-html})]
      (infof "Deserializing HTML.\nRaw HTML: %s\nDeserialized-html: %s" raw-html (js->clj html))
      (reset! deserialized-html html)
      (reset! loaded true))
    (infof "HTML is already loaded. Skipping HTML import."))

  (fn []
    [:div]))

;; TODO: Move to user namespace
(defn get-username
  [user]
  (gstr/format "%s %s" (get user :firstName "Not") (get user :lastName "Logged in")))

(defn editor
  [{:keys [user save-fn load-fn initial-branch]
    :as args}]
  ;;(js/console.log "UI" PLATE-UI)
  ;;(js/console.log "PLUGINS" PLUGINS)
  (let [{:keys [content title branch-id branch-name]} initial-branch

        plate-html (reagent/atom [])
        loaded     (reagent/atom false)
        title      (reagent/atom (or title "<<YOUR NEW ARTICLE'S TITLE HERE>>"))]
    (fn []
      ;;(println "PLATE HTML" plate-html "LOADED" loaded "INITIAL VALUE" initial-value)
      [:div {:key (str "editor" content @loaded)}
       [:> PlateProvider {:initialValue @plate-html
                          :plugins      PLUGINS}
        [:div {:style {:padding          "10px"
                       :position         "fixed"
                       :width            "100%"
                       :z-index          100
                       :background-color "white"}}
         [text-field {:variant  "standard"
                      :class    "article-title"
                      :required true
                      :label    "Article Title"
                      :value    @title
                      :style    {:padding-right "50px"
                                 :width         "400px"}
                      :onChange (fn [event]
                                  (reset! title (.. event -target -value)))}]

         [article-cards/article-branch {:on-click (fn [event]
                                                    (js/console.log "Clicked branch!"))}
          (or branch-name "main")]
         [article-cards/article-branch {:on-click (fn new-branch [event]
                                                    (js/console.log "Creating new branch"))
                                        :style    {:background-color "green"}}
          (gstr/format "Branch off of %s" (or branch-name "main"))]

         (when-not @loaded
           [:f> deserializer
            {:loaded            loaded
             :raw-html          (or content "")
             :deserialized-html plate-html}])]
        [:div.divider.py-1.bg-dark]
        [:> HeadingToolbar {:style {:top "60px"}}
         ;; NOTE: Need to create a functional component. Since the component is
         ;; defined as a Clojurescript function, we need to do this where the CLJS
         ;; function is used, not inside the fn.
         [:f> editing-toolbar]]
        [:> HeadingToolbar {:style {:float            "right"
                                    :background-color "aliceblue"
                                    :right            "0px"
                                    :top              "60px"
                                    :width            "70px"}}
         [:f> management-toolbar
          (update args :initial-branch assoc :title @title)]]
        [:div {:style {:height "120px"}}]
        [:div#primary-content
         [:h2.article-title @title]
         [:div.article-subheading (gstr/format "Author: %s" (get-username user))]
         [:div.article-subheading "2022-01-01T00:00:00"]
         [:div.divider.py-1.bg-dark]
         [:br][:br]
         [:div#article-content
          (try [:> Plate
                {:editableProps {:placeholder "Type..."}
                 :onChange      change-handler}
                [:f> Serialized]]
               (catch js/Error e
                 (println "Error occurred")))]]]])))


(comment
  #_["@udecode/plate-media" :as plate.media :refer
     [ELEMENT_IMAGE]]
  #_(defn get-caption
      [node]
      (.. node -element -caption))

  #_ #js {:serializeHtml (fn [props]
                           (js/console.log "Serializing an image to HTML" props)
                           (reagent/as-element [:span "Hello"]))}


  #_ #js {:then (fn [editor props]
                  (js/console.log "PLUGIN TYPE" (getPluginType editor ELEMENT_IMAGE))
                  #js {:getNode (fn [el]
                                  (js/console.log "GET NODE" el)
                                  #js {:type (.type el)
                                       :url  (.getAttribute el "src")})
                       :inject #js {:props
                                    #js {:nodeKey            ELEMENT_IMAGE,
                                         :validTypes         #js [(getPluginType editor ELEMENT_IMAGE)],
                                         :transformNodeValue (fn [x]
                                                               (js/console.log "TRANSFORMING NODE VALUE" x)
                                                               x)}}})}


  #_(defn set-children!
      [node new-children]
      (js/console.log "CURRENT CHILDREN" (.. node -element -children))
      (set! (.. node -children) new-children)
      (set! (.. node -element -children) new-children)
      (js/console.log "AFTER CURRENT CHILDREN" (.. node -element -children))
      nil)
  #_#js {:inject
         #js {:props
              #js {:nodeKey            "url",
                   :validTypes         (clj->js [ELEMENT_IMAGE])
                   :transformNodeValue (fn [node]
                                         (let [caption (get-caption node)]
                                           (js/console.log "TRANSFORMING NODE:" node caption)
                                           (if caption
                                             (update-children node caption)
                                             node)))}}}

  #_(defn update-children
      [node new-children]
      ;;(js/console.log "CURRENT CHILDREN" (.. node -element -children))
      (let [clj-node (js->clj node :keywordize-keys true)
            new-node (-> clj-node
                         (assoc-in [:element :children] new-children)
                         (assoc :children new-children)
                         clj->js)]
        (js/console.log new-node)
        new-node))
  )
