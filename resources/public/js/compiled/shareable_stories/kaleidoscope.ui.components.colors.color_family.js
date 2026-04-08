var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./kaleidoscope.ui.components.colors.color_picker.js");
require("./kaleidoscope.ui.utils.core.js");
require("./kaleidoscope.ui.clients.leonardo.js");
require("./kaleidoscope.ui.components.slider.js");
require("./shadow.js.shim.module$$mui$material$styles.js");
require("./shadow.js.shim.module$$mui$material$Paper.js");
require("./reagent.core.js");
require("./reagent_mui.components.js");
require("./taoensso.timbre.js");
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard = {});
var cognitect=$CLJS.cognitect || ($CLJS.cognitect = {});
var module$shadow_js_shim_module$$mui$material$styles=$CLJS.module$shadow_js_shim_module$$mui$material$styles || ($CLJS.module$shadow_js_shim_module$$mui$material$styles = {});
var module$shadow_js_shim_module$$mui$material$Drawer=$CLJS.module$shadow_js_shim_module$$mui$material$Drawer || ($CLJS.module$shadow_js_shim_module$$mui$material$Drawer = {});
var module$shadow_js_shim_module$$mui$material$Container=$CLJS.module$shadow_js_shim_module$$mui$material$Container || ($CLJS.module$shadow_js_shim_module$$mui$material$Container = {});
var module$shadow_js_shim_module$$mui$material$Slider=$CLJS.module$shadow_js_shim_module$$mui$material$Slider || ($CLJS.module$shadow_js_shim_module$$mui$material$Slider = {});
var module$shadow_js_shim_module$$mui$material$Grid=$CLJS.module$shadow_js_shim_module$$mui$material$Grid || ($CLJS.module$shadow_js_shim_module$$mui$material$Grid = {});
var module$shadow_js_shim_module$$mui$material$utils=$CLJS.module$shadow_js_shim_module$$mui$material$utils || ($CLJS.module$shadow_js_shim_module$$mui$material$utils = {});
var module$shadow_js_shim_module$$mui$material$AppBar=$CLJS.module$shadow_js_shim_module$$mui$material$AppBar || ($CLJS.module$shadow_js_shim_module$$mui$material$AppBar = {});
var module$shadow_js_shim_module$$mui$material$ScopedCssBaseline=$CLJS.module$shadow_js_shim_module$$mui$material$ScopedCssBaseline || ($CLJS.module$shadow_js_shim_module$$mui$material$ScopedCssBaseline = {});
var module$shadow_js_shim_module$$mui$material$DialogActions=$CLJS.module$shadow_js_shim_module$$mui$material$DialogActions || ($CLJS.module$shadow_js_shim_module$$mui$material$DialogActions = {});
var module$shadow_js_shim_module$$mui$material$TableSortLabel=$CLJS.module$shadow_js_shim_module$$mui$material$TableSortLabel || ($CLJS.module$shadow_js_shim_module$$mui$material$TableSortLabel = {});
var module$shadow_js_shim_module$$mui$material$PaginationItem=$CLJS.module$shadow_js_shim_module$$mui$material$PaginationItem || ($CLJS.module$shadow_js_shim_module$$mui$material$PaginationItem = {});
var module$shadow_js_shim_module$prism_react_renderer=$CLJS.module$shadow_js_shim_module$prism_react_renderer || ($CLJS.module$shadow_js_shim_module$prism_react_renderer = {});
var kaleidoscope=$CLJS.kaleidoscope || ($CLJS.kaleidoscope = {});
var module$shadow_js_shim_module$$styled_icons$material$Link=$CLJS.module$shadow_js_shim_module$$styled_icons$material$Link || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$Link = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatUnderlined=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatUnderlined || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatUnderlined = {});
var re_frame=$CLJS.re_frame || ($CLJS.re_frame = {});
var module$shadow_js_shim_module$$styled_icons$remix_fill$ErrorWarning=$CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$ErrorWarning || ($CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$ErrorWarning = {});
var module$shadow_js_shim_module$$mui$material$StepButton=$CLJS.module$shadow_js_shim_module$$mui$material$StepButton || ($CLJS.module$shadow_js_shim_module$$mui$material$StepButton = {});
var module$shadow_js_shim_module$react=$CLJS.module$shadow_js_shim_module$react || ($CLJS.module$shadow_js_shim_module$react = {});
var module$shadow_js_shim_module$$mui$material$Popover=$CLJS.module$shadow_js_shim_module$$mui$material$Popover || ($CLJS.module$shadow_js_shim_module$$mui$material$Popover = {});
var module$shadow_js_shim_module$$mui$material$Badge=$CLJS.module$shadow_js_shim_module$$mui$material$Badge || ($CLJS.module$shadow_js_shim_module$$mui$material$Badge = {});
var module$shadow_js_shim_module$$mui$material$MenuList=$CLJS.module$shadow_js_shim_module$$mui$material$MenuList || ($CLJS.module$shadow_js_shim_module$$mui$material$MenuList = {});
var module$shadow_js_shim_module$$mui$material$NativeSelect=$CLJS.module$shadow_js_shim_module$$mui$material$NativeSelect || ($CLJS.module$shadow_js_shim_module$$mui$material$NativeSelect = {});
var module$shadow_js_shim_module$$styled_icons$remix_fill$Save3=$CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$Save3 || ($CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$Save3 = {});
var module$shadow_js_shim_module$$mui$material$SpeedDialIcon=$CLJS.module$shadow_js_shim_module$$mui$material$SpeedDialIcon || ($CLJS.module$shadow_js_shim_module$$mui$material$SpeedDialIcon = {});
var module$shadow_js_shim_module$$mui$material$Toolbar=$CLJS.module$shadow_js_shim_module$$mui$material$Toolbar || ($CLJS.module$shadow_js_shim_module$$mui$material$Toolbar = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatIndentDecrease=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatIndentDecrease || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatIndentDecrease = {});
var clojure=$CLJS.clojure || ($CLJS.clojure = {});
var module$shadow_js_shim_module$$mui$material$Autocomplete=$CLJS.module$shadow_js_shim_module$$mui$material$Autocomplete || ($CLJS.module$shadow_js_shim_module$$mui$material$Autocomplete = {});
var module$shadow_js_shim_module$$mui$material$AlertTitle=$CLJS.module$shadow_js_shim_module$$mui$material$AlertTitle || ($CLJS.module$shadow_js_shim_module$$mui$material$AlertTitle = {});
var module$shadow_js_shim_module$$mui$material$CardContent=$CLJS.module$shadow_js_shim_module$$mui$material$CardContent || ($CLJS.module$shadow_js_shim_module$$mui$material$CardContent = {});
var module$shadow_js_shim_module$$mui$material$useAutocomplete=$CLJS.module$shadow_js_shim_module$$mui$material$useAutocomplete || ($CLJS.module$shadow_js_shim_module$$mui$material$useAutocomplete = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatQuote=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatQuote || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatQuote = {});
var reagent_mui=$CLJS.reagent_mui || ($CLJS.reagent_mui = {});
var module$shadow_js_shim_module$$mui$material$SwipeableDrawer=$CLJS.module$shadow_js_shim_module$$mui$material$SwipeableDrawer || ($CLJS.module$shadow_js_shim_module$$mui$material$SwipeableDrawer = {});
var module$shadow_js_shim_module$$mui$material$Skeleton=$CLJS.module$shadow_js_shim_module$$mui$material$Skeleton || ($CLJS.module$shadow_js_shim_module$$mui$material$Skeleton = {});
var module$shadow_js_shim_module$$mui$material$Collapse=$CLJS.module$shadow_js_shim_module$$mui$material$Collapse || ($CLJS.module$shadow_js_shim_module$$mui$material$Collapse = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$Hide=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Hide || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Hide = {});
var module$shadow_js_shim_module$$mui$material$TabScrollButton=$CLJS.module$shadow_js_shim_module$$mui$material$TabScrollButton || ($CLJS.module$shadow_js_shim_module$$mui$material$TabScrollButton = {});
var module$shadow_js_shim_module$$mui$material$Box=$CLJS.module$shadow_js_shim_module$$mui$material$Box || ($CLJS.module$shadow_js_shim_module$$mui$material$Box = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatAlignRight=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignRight || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignRight = {});
var module$shadow_js_shim_module$$mui$material$FormLabel=$CLJS.module$shadow_js_shim_module$$mui$material$FormLabel || ($CLJS.module$shadow_js_shim_module$$mui$material$FormLabel = {});
var module$shadow_js_shim_module$$mui$material$TableCell=$CLJS.module$shadow_js_shim_module$$mui$material$TableCell || ($CLJS.module$shadow_js_shim_module$$mui$material$TableCell = {});
var module$shadow_js_shim_module$$mui$material$InputAdornment=$CLJS.module$shadow_js_shim_module$$mui$material$InputAdornment || ($CLJS.module$shadow_js_shim_module$$mui$material$InputAdornment = {});
var module$shadow_js_shim_module$$udecode$plate=$CLJS.module$shadow_js_shim_module$$udecode$plate || ($CLJS.module$shadow_js_shim_module$$udecode$plate = {});
var module$shadow_js_shim_module$$mui$material$Stepper=$CLJS.module$shadow_js_shim_module$$mui$material$Stepper || ($CLJS.module$shadow_js_shim_module$$mui$material$Stepper = {});
var module$shadow_js_shim_module$$mui$x_data_grid=$CLJS.module$shadow_js_shim_module$$mui$x_data_grid || ($CLJS.module$shadow_js_shim_module$$mui$x_data_grid = {});
var module$shadow_js_shim_module$$mui$material$Rating=$CLJS.module$shadow_js_shim_module$$mui$material$Rating || ($CLJS.module$shadow_js_shim_module$$mui$material$Rating = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeBlock=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeBlock || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeBlock = {});
var module$shadow_js_shim_module$$mui$material$Grow=$CLJS.module$shadow_js_shim_module$$mui$material$Grow || ($CLJS.module$shadow_js_shim_module$$mui$material$Grow = {});
var module$shadow_js_shim_module$$mui$material$ButtonBase=$CLJS.module$shadow_js_shim_module$$mui$material$ButtonBase || ($CLJS.module$shadow_js_shim_module$$mui$material$ButtonBase = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatAlignCenter=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignCenter || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignCenter = {});
var module$shadow_js_shim_module$$mui$material$LinearProgress=$CLJS.module$shadow_js_shim_module$$mui$material$LinearProgress || ($CLJS.module$shadow_js_shim_module$$mui$material$LinearProgress = {});
var cljs=$CLJS.cljs || ($CLJS.cljs = {});
var module$shadow_js_shim_module$$mui$material$Typography=$CLJS.module$shadow_js_shim_module$$mui$material$Typography || ($CLJS.module$shadow_js_shim_module$$mui$material$Typography = {});
var module$shadow_js_shim_module$$mui$material$BottomNavigation=$CLJS.module$shadow_js_shim_module$$mui$material$BottomNavigation || ($CLJS.module$shadow_js_shim_module$$mui$material$BottomNavigation = {});
var module$shadow_js_shim_module$$mui$material$Step=$CLJS.module$shadow_js_shim_module$$mui$material$Step || ($CLJS.module$shadow_js_shim_module$$mui$material$Step = {});
var module$shadow_js_shim_module$$mui$material$Accordion=$CLJS.module$shadow_js_shim_module$$mui$material$Accordion || ($CLJS.module$shadow_js_shim_module$$mui$material$Accordion = {});
var module$shadow_js_shim_module$$mui$material$GlobalStyles=$CLJS.module$shadow_js_shim_module$$mui$material$GlobalStyles || ($CLJS.module$shadow_js_shim_module$$mui$material$GlobalStyles = {});
var module$shadow_js_shim_module$$mui$material$AccordionActions=$CLJS.module$shadow_js_shim_module$$mui$material$AccordionActions || ($CLJS.module$shadow_js_shim_module$$mui$material$AccordionActions = {});
var module$shadow_js_shim_module$$mui$material$Button=$CLJS.module$shadow_js_shim_module$$mui$material$Button || ($CLJS.module$shadow_js_shim_module$$mui$material$Button = {});
var module$shadow_js_shim_module$$mui$material$SpeedDial=$CLJS.module$shadow_js_shim_module$$mui$material$SpeedDial || ($CLJS.module$shadow_js_shim_module$$mui$material$SpeedDial = {});
var module$shadow_js_shim_module$$mui$material$Modal=$CLJS.module$shadow_js_shim_module$$mui$material$Modal || ($CLJS.module$shadow_js_shim_module$$mui$material$Modal = {});
var module$shadow_js_shim_module$prism_react_renderer$themes$dracula=$CLJS.module$shadow_js_shim_module$prism_react_renderer$themes$dracula || ($CLJS.module$shadow_js_shim_module$prism_react_renderer$themes$dracula = {});
var module$shadow_js_shim_module$$mui$material$Snackbar=$CLJS.module$shadow_js_shim_module$$mui$material$Snackbar || ($CLJS.module$shadow_js_shim_module$$mui$material$Snackbar = {});
var module$shadow_js_shim_module$$mui$material$ListItemIcon=$CLJS.module$shadow_js_shim_module$$mui$material$ListItemIcon || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItemIcon = {});
var module$shadow_js_shim_module$$mui$material$TableFooter=$CLJS.module$shadow_js_shim_module$$mui$material$TableFooter || ($CLJS.module$shadow_js_shim_module$$mui$material$TableFooter = {});
var ajax=$CLJS.ajax || ($CLJS.ajax = {});
var module$shadow_js_shim_module$$mui$material$CircularProgress=$CLJS.module$shadow_js_shim_module$$mui$material$CircularProgress || ($CLJS.module$shadow_js_shim_module$$mui$material$CircularProgress = {});
var module$shadow_js_shim_module$$mui$material$Select=$CLJS.module$shadow_js_shim_module$$mui$material$Select || ($CLJS.module$shadow_js_shim_module$$mui$material$Select = {});
var module$shadow_js_shim_module$$mui$material$Icon=$CLJS.module$shadow_js_shim_module$$mui$material$Icon || ($CLJS.module$shadow_js_shim_module$$mui$material$Icon = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatColorText=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatColorText || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatColorText = {});
var module$shadow_js_shim_module$react_colorful=$CLJS.module$shadow_js_shim_module$react_colorful || ($CLJS.module$shadow_js_shim_module$react_colorful = {});
var module$shadow_js_shim_module$$mui$material$StepIcon=$CLJS.module$shadow_js_shim_module$$mui$material$StepIcon || ($CLJS.module$shadow_js_shim_module$$mui$material$StepIcon = {});
var module$shadow_js_shim_module$$mui$material$colors=$CLJS.module$shadow_js_shim_module$$mui$material$colors || ($CLJS.module$shadow_js_shim_module$$mui$material$colors = {});
var module$shadow_js_shim_module$$mui$material$ListItemText=$CLJS.module$shadow_js_shim_module$$mui$material$ListItemText || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItemText = {});
var module$shadow_js_shim_module$$mui$material$List=$CLJS.module$shadow_js_shim_module$$mui$material$List || ($CLJS.module$shadow_js_shim_module$$mui$material$List = {});
var module$shadow_js_shim_module$$mui$material$AvatarGroup=$CLJS.module$shadow_js_shim_module$$mui$material$AvatarGroup || ($CLJS.module$shadow_js_shim_module$$mui$material$AvatarGroup = {});
var module$shadow_js_shim_module$$mui$material$AccordionSummary=$CLJS.module$shadow_js_shim_module$$mui$material$AccordionSummary || ($CLJS.module$shadow_js_shim_module$$mui$material$AccordionSummary = {});
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageBrowser=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageBrowser || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageBrowser = {});
var shadow=$CLJS.shadow || ($CLJS.shadow = {});
var module$shadow_js_shim_module$$mui$material$Unstable_TrapFocus=$CLJS.module$shadow_js_shim_module$$mui$material$Unstable_TrapFocus || ($CLJS.module$shadow_js_shim_module$$mui$material$Unstable_TrapFocus = {});
var module$shadow_js_shim_module$$mui$material$Card=$CLJS.module$shadow_js_shim_module$$mui$material$Card || ($CLJS.module$shadow_js_shim_module$$mui$material$Card = {});
var module$shadow_js_shim_module$$mui$material$useScrollTrigger=$CLJS.module$shadow_js_shim_module$$mui$material$useScrollTrigger || ($CLJS.module$shadow_js_shim_module$$mui$material$useScrollTrigger = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeAlt=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeAlt || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$CodeAlt = {});
var module$shadow_js_shim_module$$mui$material$SpeedDialAction=$CLJS.module$shadow_js_shim_module$$mui$material$SpeedDialAction || ($CLJS.module$shadow_js_shim_module$$mui$material$SpeedDialAction = {});
var module$shadow_js_shim_module$$mui$material$TextField=$CLJS.module$shadow_js_shim_module$$mui$material$TextField || ($CLJS.module$shadow_js_shim_module$$mui$material$TextField = {});
var module$shadow_js_shim_module$$mui$material$Hidden=$CLJS.module$shadow_js_shim_module$$mui$material$Hidden || ($CLJS.module$shadow_js_shim_module$$mui$material$Hidden = {});
var goog=$CLJS.goog || ($CLJS.goog = {});
var module$shadow_js_shim_module$$mui$material$TableBody=$CLJS.module$shadow_js_shim_module$$mui$material$TableBody || ($CLJS.module$shadow_js_shim_module$$mui$material$TableBody = {});
var module$shadow_js_shim_module$$mui$material$Radio=$CLJS.module$shadow_js_shim_module$$mui$material$Radio || ($CLJS.module$shadow_js_shim_module$$mui$material$Radio = {});
var module$shadow_js_shim_module$$mui$material$Alert=$CLJS.module$shadow_js_shim_module$$mui$material$Alert || ($CLJS.module$shadow_js_shim_module$$mui$material$Alert = {});
var module$shadow_js_shim_module$$mui$material$CssBaseline=$CLJS.module$shadow_js_shim_module$$mui$material$CssBaseline || ($CLJS.module$shadow_js_shim_module$$mui$material$CssBaseline = {});
var module$shadow_js_shim_module$$mui$material$IconButton=$CLJS.module$shadow_js_shim_module$$mui$material$IconButton || ($CLJS.module$shadow_js_shim_module$$mui$material$IconButton = {});
var module$shadow_js_shim_module$$mui$material$Menu=$CLJS.module$shadow_js_shim_module$$mui$material$Menu || ($CLJS.module$shadow_js_shim_module$$mui$material$Menu = {});
var module$shadow_js_shim_module$$mui$material$BottomNavigationAction=$CLJS.module$shadow_js_shim_module$$mui$material$BottomNavigationAction || ($CLJS.module$shadow_js_shim_module$$mui$material$BottomNavigationAction = {});
var module$shadow_js_shim_module$$mui$material$Avatar=$CLJS.module$shadow_js_shim_module$$mui$material$Avatar || ($CLJS.module$shadow_js_shim_module$$mui$material$Avatar = {});
var module$shadow_js_shim_module$$mui$material$ListItemButton=$CLJS.module$shadow_js_shim_module$$mui$material$ListItemButton || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItemButton = {});
var reagent=$CLJS.reagent || ($CLJS.reagent = {});
var module$shadow_js_shim_module$$mui$material$useMediaQuery=$CLJS.module$shadow_js_shim_module$$mui$material$useMediaQuery || ($CLJS.module$shadow_js_shim_module$$mui$material$useMediaQuery = {});
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$InputTags=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$InputTags || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$InputTags = {});
var camel_snake_kebab=$CLJS.camel_snake_kebab || ($CLJS.camel_snake_kebab = {});
var module$shadow_js_shim_module$$mui$material$FormGroup=$CLJS.module$shadow_js_shim_module$$mui$material$FormGroup || ($CLJS.module$shadow_js_shim_module$$mui$material$FormGroup = {});
var module$shadow_js_shim_module$$mui$material$ListItemSecondaryAction=$CLJS.module$shadow_js_shim_module$$mui$material$ListItemSecondaryAction || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItemSecondaryAction = {});
var module$shadow_js_shim_module$$mui$material$Unstable_Grid2=$CLJS.module$shadow_js_shim_module$$mui$material$Unstable_Grid2 || ($CLJS.module$shadow_js_shim_module$$mui$material$Unstable_Grid2 = {});
var module$shadow_js_shim_module$$mui$material$useTouchRipple=$CLJS.module$shadow_js_shim_module$$mui$material$useTouchRipple || ($CLJS.module$shadow_js_shim_module$$mui$material$useTouchRipple = {});
var module$shadow_js_shim_module$$mui$material$StepConnector=$CLJS.module$shadow_js_shim_module$$mui$material$StepConnector || ($CLJS.module$shadow_js_shim_module$$mui$material$StepConnector = {});
var module$shadow_js_shim_module$$mui$material$FormHelperText=$CLJS.module$shadow_js_shim_module$$mui$material$FormHelperText || ($CLJS.module$shadow_js_shim_module$$mui$material$FormHelperText = {});
var module$shadow_js_shim_module$$mui$material$Backdrop=$CLJS.module$shadow_js_shim_module$$mui$material$Backdrop || ($CLJS.module$shadow_js_shim_module$$mui$material$Backdrop = {});
var module$shadow_js_shim_module$$mui$material$SnackbarContent=$CLJS.module$shadow_js_shim_module$$mui$material$SnackbarContent || ($CLJS.module$shadow_js_shim_module$$mui$material$SnackbarContent = {});
var module$shadow_js_shim_module$$mui$material$ListItemAvatar=$CLJS.module$shadow_js_shim_module$$mui$material$ListItemAvatar || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItemAvatar = {});
var module$shadow_js_shim_module$$mui$material$Portal=$CLJS.module$shadow_js_shim_module$$mui$material$Portal || ($CLJS.module$shadow_js_shim_module$$mui$material$Portal = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatAlignLeft=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignLeft || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignLeft = {});
var module$shadow_js_shim_module$$mui$material$ListSubheader=$CLJS.module$shadow_js_shim_module$$mui$material$ListSubheader || ($CLJS.module$shadow_js_shim_module$$mui$material$ListSubheader = {});
var module$shadow_js_shim_module$$mui$material$RadioGroup=$CLJS.module$shadow_js_shim_module$$mui$material$RadioGroup || ($CLJS.module$shadow_js_shim_module$$mui$material$RadioGroup = {});
var module$shadow_js_shim_module$$mui$material$AccordionDetails=$CLJS.module$shadow_js_shim_module$$mui$material$AccordionDetails || ($CLJS.module$shadow_js_shim_module$$mui$material$AccordionDetails = {});
var module$shadow_js_shim_module$$mui$material$ImageList=$CLJS.module$shadow_js_shim_module$$mui$material$ImageList || ($CLJS.module$shadow_js_shim_module$$mui$material$ImageList = {});
var module$shadow_js_shim_module$$mui$material$Table=$CLJS.module$shadow_js_shim_module$$mui$material$Table || ($CLJS.module$shadow_js_shim_module$$mui$material$Table = {});
var module$shadow_js_shim_module$$mui$material$StepContent=$CLJS.module$shadow_js_shim_module$$mui$material$StepContent || ($CLJS.module$shadow_js_shim_module$$mui$material$StepContent = {});
var module$shadow_js_shim_module$$mui$material$Stack=$CLJS.module$shadow_js_shim_module$$mui$material$Stack || ($CLJS.module$shadow_js_shim_module$$mui$material$Stack = {});
var module$shadow_js_shim_module$$mui$material$Zoom=$CLJS.module$shadow_js_shim_module$$mui$material$Zoom || ($CLJS.module$shadow_js_shim_module$$mui$material$Zoom = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatItalic=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatItalic || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatItalic = {});
var module$shadow_js_shim_module$$mui$material$OutlinedInput=$CLJS.module$shadow_js_shim_module$$mui$material$OutlinedInput || ($CLJS.module$shadow_js_shim_module$$mui$material$OutlinedInput = {});
var module$shadow_js_shim_module$$mui$material$StyledEngineProvider=$CLJS.module$shadow_js_shim_module$$mui$material$StyledEngineProvider || ($CLJS.module$shadow_js_shim_module$$mui$material$StyledEngineProvider = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatStrikethrough=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatStrikethrough || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatStrikethrough = {});
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$Example=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$Example || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$Example = {});
var module$shadow_js_shim_module$$mui$material$Paper=$CLJS.module$shadow_js_shim_module$$mui$material$Paper || ($CLJS.module$shadow_js_shim_module$$mui$material$Paper = {});
var module$shadow_js_shim_module$$mui$material$Switch=$CLJS.module$shadow_js_shim_module$$mui$material$Switch || ($CLJS.module$shadow_js_shim_module$$mui$material$Switch = {});
var module$shadow_js_shim_module$$mui$material$MenuItem=$CLJS.module$shadow_js_shim_module$$mui$material$MenuItem || ($CLJS.module$shadow_js_shim_module$$mui$material$MenuItem = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatIndentIncrease=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatIndentIncrease || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatIndentIncrease = {});
var module$shadow_js_shim_module$$mui$material$Fab=$CLJS.module$shadow_js_shim_module$$mui$material$Fab || ($CLJS.module$shadow_js_shim_module$$mui$material$Fab = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatAlignJustify=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignJustify || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatAlignJustify = {});
var module$shadow_js_shim_module$$storybook$addon_viewport=$CLJS.module$shadow_js_shim_module$$storybook$addon_viewport || ($CLJS.module$shadow_js_shim_module$$storybook$addon_viewport = {});
var module$shadow_js_shim_module$$mui$material$FilledInput=$CLJS.module$shadow_js_shim_module$$mui$material$FilledInput || ($CLJS.module$shadow_js_shim_module$$mui$material$FilledInput = {});
var module$shadow_js_shim_module$$mui$material$Input=$CLJS.module$shadow_js_shim_module$$mui$material$Input || ($CLJS.module$shadow_js_shim_module$$mui$material$Input = {});
var module$shadow_js_shim_module$$mui$material$Dialog=$CLJS.module$shadow_js_shim_module$$mui$material$Dialog || ($CLJS.module$shadow_js_shim_module$$mui$material$Dialog = {});
var module$shadow_js_shim_module$keycloak_js=$CLJS.module$shadow_js_shim_module$keycloak_js || ($CLJS.module$shadow_js_shim_module$keycloak_js = {});
var module$shadow_js_shim_module$$mui$material$Fade=$CLJS.module$shadow_js_shim_module$$mui$material$Fade || ($CLJS.module$shadow_js_shim_module$$mui$material$Fade = {});
var module$shadow_js_shim_module$$mui$material$TableHead=$CLJS.module$shadow_js_shim_module$$mui$material$TableHead || ($CLJS.module$shadow_js_shim_module$$mui$material$TableHead = {});
var module$shadow_js_shim_module$$mui$material$Pagination=$CLJS.module$shadow_js_shim_module$$mui$material$Pagination || ($CLJS.module$shadow_js_shim_module$$mui$material$Pagination = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$ImageAdd=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$ImageAdd || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$ImageAdd = {});
var module$shadow_js_shim_module$$mui$material$StepLabel=$CLJS.module$shadow_js_shim_module$$mui$material$StepLabel || ($CLJS.module$shadow_js_shim_module$$mui$material$StepLabel = {});
var module$shadow_js_shim_module$$mui$material$DialogContentText=$CLJS.module$shadow_js_shim_module$$mui$material$DialogContentText || ($CLJS.module$shadow_js_shim_module$$mui$material$DialogContentText = {});
var taoensso=$CLJS.taoensso || ($CLJS.taoensso = {});
var module$shadow_js_shim_module$$mui$material$CardMedia=$CLJS.module$shadow_js_shim_module$$mui$material$CardMedia || ($CLJS.module$shadow_js_shim_module$$mui$material$CardMedia = {});
var module$shadow_js_shim_module$$mui$material$MobileStepper=$CLJS.module$shadow_js_shim_module$$mui$material$MobileStepper || ($CLJS.module$shadow_js_shim_module$$mui$material$MobileStepper = {});
var module$shadow_js_shim_module$$mui$material$Link=$CLJS.module$shadow_js_shim_module$$mui$material$Link || ($CLJS.module$shadow_js_shim_module$$mui$material$Link = {});
var module$shadow_js_shim_module$$mui$material$Tab=$CLJS.module$shadow_js_shim_module$$mui$material$Tab || ($CLJS.module$shadow_js_shim_module$$mui$material$Tab = {});
var module$shadow_js_shim_module$$styled_icons$remix_fill$GitBranch=$CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$GitBranch || ($CLJS.module$shadow_js_shim_module$$styled_icons$remix_fill$GitBranch = {});
var module$shadow_js_shim_module$$mui$material$NoSsr=$CLJS.module$shadow_js_shim_module$$mui$material$NoSsr || ($CLJS.module$shadow_js_shim_module$$mui$material$NoSsr = {});
var module$shadow_js_shim_module$$mui$material$SvgIcon=$CLJS.module$shadow_js_shim_module$$mui$material$SvgIcon || ($CLJS.module$shadow_js_shim_module$$mui$material$SvgIcon = {});
var module$shadow_js_shim_module$$mui$material$Chip=$CLJS.module$shadow_js_shim_module$$mui$material$Chip || ($CLJS.module$shadow_js_shim_module$$mui$material$Chip = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatBold=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatBold || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatBold = {});
var module$shadow_js_shim_module$$mui$material$ClickAwayListener=$CLJS.module$shadow_js_shim_module$$mui$material$ClickAwayListener || ($CLJS.module$shadow_js_shim_module$$mui$material$ClickAwayListener = {});
var module$shadow_js_shim_module$$mui$material$CardHeader=$CLJS.module$shadow_js_shim_module$$mui$material$CardHeader || ($CLJS.module$shadow_js_shim_module$$mui$material$CardHeader = {});
var module$shadow_js_shim_module$$mui$material$usePagination=$CLJS.module$shadow_js_shim_module$$mui$material$usePagination || ($CLJS.module$shadow_js_shim_module$$mui$material$usePagination = {});
var hickory=$CLJS.hickory || ($CLJS.hickory = {});
var module$shadow_js_shim_module$$mui$material$DialogContent=$CLJS.module$shadow_js_shim_module$$mui$material$DialogContent || ($CLJS.module$shadow_js_shim_module$$mui$material$DialogContent = {});
var module$shadow_js_shim_module$$mui$material$TablePagination=$CLJS.module$shadow_js_shim_module$$mui$material$TablePagination || ($CLJS.module$shadow_js_shim_module$$mui$material$TablePagination = {});
var module$shadow_js_shim_module$$mui$material$TableContainer=$CLJS.module$shadow_js_shim_module$$mui$material$TableContainer || ($CLJS.module$shadow_js_shim_module$$mui$material$TableContainer = {});
var module$shadow_js_shim_module$$adobe$leonardo_contrast_colors=$CLJS.module$shadow_js_shim_module$$adobe$leonardo_contrast_colors || ($CLJS.module$shadow_js_shim_module$$adobe$leonardo_contrast_colors = {});
var module$shadow_js_shim_module$$react_three$drei=$CLJS.module$shadow_js_shim_module$$react_three$drei || ($CLJS.module$shadow_js_shim_module$$react_three$drei = {});
var module$shadow_js_shim_module$$mui$material$Tooltip=$CLJS.module$shadow_js_shim_module$$mui$material$Tooltip || ($CLJS.module$shadow_js_shim_module$$mui$material$Tooltip = {});
var module$shadow_js_shim_module$$mui$material$ListItem=$CLJS.module$shadow_js_shim_module$$mui$material$ListItem || ($CLJS.module$shadow_js_shim_module$$mui$material$ListItem = {});
var module$shadow_js_shim_module$$storybook$addon_actions=$CLJS.module$shadow_js_shim_module$$storybook$addon_actions || ($CLJS.module$shadow_js_shim_module$$storybook$addon_actions = {});
var module$shadow_js_shim_module$pretty=$CLJS.module$shadow_js_shim_module$pretty || ($CLJS.module$shadow_js_shim_module$pretty = {});
var module$shadow_js_shim_module$$mui$material$ButtonGroup=$CLJS.module$shadow_js_shim_module$$mui$material$ButtonGroup || ($CLJS.module$shadow_js_shim_module$$mui$material$ButtonGroup = {});
var module$shadow_js_shim_module$$mui$material$Divider=$CLJS.module$shadow_js_shim_module$$mui$material$Divider || ($CLJS.module$shadow_js_shim_module$$mui$material$Divider = {});
var module$shadow_js_shim_module$$mui$material$CardActions=$CLJS.module$shadow_js_shim_module$$mui$material$CardActions || ($CLJS.module$shadow_js_shim_module$$mui$material$CardActions = {});
var module$shadow_js_shim_module$$mui$material$InputLabel=$CLJS.module$shadow_js_shim_module$$mui$material$InputLabel || ($CLJS.module$shadow_js_shim_module$$mui$material$InputLabel = {});
var module$shadow_js_shim_module$$mui$material$CardActionArea=$CLJS.module$shadow_js_shim_module$$mui$material$CardActionArea || ($CLJS.module$shadow_js_shim_module$$mui$material$CardActionArea = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatListBulleted=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatListBulleted || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatListBulleted = {});
var module$shadow_js_shim_module$$mui$material$FormControl=$CLJS.module$shadow_js_shim_module$$mui$material$FormControl || ($CLJS.module$shadow_js_shim_module$$mui$material$FormControl = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$Rocket=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Rocket || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Rocket = {});
var module$shadow_js_shim_module$$mui$material$TableRow=$CLJS.module$shadow_js_shim_module$$mui$material$TableRow || ($CLJS.module$shadow_js_shim_module$$mui$material$TableRow = {});
var module$shadow_js_shim_module$$styled_icons$boxicons_regular$Library=$CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Library || ($CLJS.module$shadow_js_shim_module$$styled_icons$boxicons_regular$Library = {});
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCard=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCard || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCard = {});
var module$shadow_js_shim_module$$mui$material$Slide=$CLJS.module$shadow_js_shim_module$$mui$material$Slide || ($CLJS.module$shadow_js_shim_module$$mui$material$Slide = {});
var module$shadow_js_shim_module$$mui$material$Tabs=$CLJS.module$shadow_js_shim_module$$mui$material$Tabs || ($CLJS.module$shadow_js_shim_module$$mui$material$Tabs = {});
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCardGallery=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCardGallery || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$ImageCardGallery = {});
var module$shadow_js_shim_module$$mui$material$ToggleButton=$CLJS.module$shadow_js_shim_module$$mui$material$ToggleButton || ($CLJS.module$shadow_js_shim_module$$mui$material$ToggleButton = {});
var module$shadow_js_shim_module$$styled_icons$material$FormatListNumbered=$CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatListNumbered || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$FormatListNumbered = {});
var module$shadow_js_shim_module$$mui$material$ImageListItem=$CLJS.module$shadow_js_shim_module$$mui$material$ImageListItem || ($CLJS.module$shadow_js_shim_module$$mui$material$ImageListItem = {});
var module$shadow_js_shim_module$$mui$material$InputBase=$CLJS.module$shadow_js_shim_module$$mui$material$InputBase || ($CLJS.module$shadow_js_shim_module$$mui$material$InputBase = {});
var module$shadow_js_shim_module$$mui$material$ImageListItemBar=$CLJS.module$shadow_js_shim_module$$mui$material$ImageListItemBar || ($CLJS.module$shadow_js_shim_module$$mui$material$ImageListItemBar = {});
var module$shadow_js_shim_module$$mui$material$Breadcrumbs=$CLJS.module$shadow_js_shim_module$$mui$material$Breadcrumbs || ($CLJS.module$shadow_js_shim_module$$mui$material$Breadcrumbs = {});
var module$shadow_js_shim_module$$mui$material$Checkbox=$CLJS.module$shadow_js_shim_module$$mui$material$Checkbox || ($CLJS.module$shadow_js_shim_module$$mui$material$Checkbox = {});
var com=$CLJS.com || ($CLJS.com = {});
var module$shadow_js_shim_module$$mui$material$Popper=$CLJS.module$shadow_js_shim_module$$mui$material$Popper || ($CLJS.module$shadow_js_shim_module$$mui$material$Popper = {});
var module$shadow_js_shim_module$$mui$material$ToggleButtonGroup=$CLJS.module$shadow_js_shim_module$$mui$material$ToggleButtonGroup || ($CLJS.module$shadow_js_shim_module$$mui$material$ToggleButtonGroup = {});
var module$shadow_js_shim_module$$styled_icons$material$Check=$CLJS.module$shadow_js_shim_module$$styled_icons$material$Check || ($CLJS.module$shadow_js_shim_module$$styled_icons$material$Check = {});
var module$shadow_js_shim_module$$react_three$fiber=$CLJS.module$shadow_js_shim_module$$react_three$fiber || ($CLJS.module$shadow_js_shim_module$$react_three$fiber = {});
var module$shadow_js_shim_module$$mui$material$DialogTitle=$CLJS.module$shadow_js_shim_module$$mui$material$DialogTitle || ($CLJS.module$shadow_js_shim_module$$mui$material$DialogTitle = {});
var module$shadow_js_shim_module$$mui$material$FormControlLabel=$CLJS.module$shadow_js_shim_module$$mui$material$FormControlLabel || ($CLJS.module$shadow_js_shim_module$$mui$material$FormControlLabel = {});

$CLJS.SHADOW_ENV.setLoaded("kaleidoscope.ui.components.colors.color_family.js");

goog.provide('kaleidoscope.ui.components.colors.color_family');
kaleidoscope.ui.components.colors.color_family.Item = (function (){var G__22740 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"transition","transition",765692007),"transform 0.3s",new cljs.core.Keyword(null,"padding","padding",1660304693),"right",new cljs.core.Keyword(null,"textAlign","textAlign",-711351626),"center",new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null));
});
var fexpr__22739 = shadow.js.shim.module$$mui$material$styles.styled(shadow.js.shim.module$$mui$material$Paper.default);
return (fexpr__22739.cljs$core$IFn$_invoke$arity$1 ? fexpr__22739.cljs$core$IFn$_invoke$arity$1(G__22740) : fexpr__22739.call(null,G__22740));
})();
kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [1.2,(2),(4),(6),(10)], null);
kaleidoscope.ui.components.colors.color_family.color_family = (function kaleidoscope$ui$components$colors$color_family$color_family(p__22741){
var map__22742 = p__22741;
var map__22742__$1 = cljs.core.__destructure_map(map__22742);
var family_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22742__$1,new cljs.core.Keyword(null,"family-name","family-name",660184252));
var base_color = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22742__$1,new cljs.core.Keyword(null,"base-color","base-color",-1117474436));
var background_colors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22742__$1,new cljs.core.Keyword(null,"background-colors","background-colors",657802834));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22742__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var theme_props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22742__$1,new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644));
var family = kaleidoscope.ui.clients.leonardo.make_color(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),family_name,new cljs.core.Keyword(null,"colorKeys","colorKeys",908311225),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [base_color], null),new cljs.core.Keyword(null,"ratios","ratios",596401607),kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS], null));
var map__22743 = theme_props;
var map__22743__$1 = cljs.core.__destructure_map(map__22743);
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22743__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22743__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var contrast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22743__$1,new cljs.core.Keyword(null,"contrast","contrast",568337131));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"inline-flex",new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"25px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),base_color,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744(s__22745){
return (new cljs.core.LazySeq(null,(function (){
var s__22745__$1 = s__22745;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22745__$1);
if(temp__5804__auto__){
var s__22745__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22745__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22745__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22747 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22746 = (0);
while(true){
if((i__22746 < size__5522__auto__)){
var vec__22748 = cljs.core._nth(c__5521__auto__,i__22746);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22748,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22748,(1),null);
cljs.core.chunk_append(b__22747,(function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (i__22746,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22751(s__22752){
return (new cljs.core.LazySeq(null,((function (i__22746,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (){
var s__22752__$1 = s__22752;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__22752__$1);
if(temp__5804__auto____$1){
var s__22752__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__22752__$2)){
var c__5521__auto____$1 = cljs.core.chunk_first(s__22752__$2);
var size__5522__auto____$1 = cljs.core.count(c__5521__auto____$1);
var b__22754 = cljs.core.chunk_buffer(size__5522__auto____$1);
if((function (){var i__22753 = (0);
while(true){
if((i__22753 < size__5522__auto____$1)){
var vec__22755 = cljs.core._nth(c__5521__auto____$1,i__22753);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22755,(0),null);
var vec__22758 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22755,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22758,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22758,(1),null);
cljs.core.chunk_append(b__22754,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__22854 = (i__22753 + (1));
i__22753 = G__22854;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22754),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22751(cljs.core.chunk_rest(s__22752__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22754),null);
}
} else {
var vec__22761 = cljs.core.first(s__22752__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22761,(0),null);
var vec__22764 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22761,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22764,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22764,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22751(cljs.core.rest(s__22752__$2)));
}
} else {
return null;
}
break;
}
});})(i__22746,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
,null,null));
});})(i__22746,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (i__22746,iter__5523__auto__,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(i__22746,iter__5523__auto__,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i__22746,iter__5523__auto__,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__22769){
var vec__22770 = p__22769;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22770,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22770,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(i__22746,iter__5523__auto__,theme,clj_theme,vec__22748,background_idx,background_color,c__5521__auto__,size__5522__auto__,b__22747,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})());

var G__22855 = (i__22746 + (1));
i__22746 = G__22855;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22747),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744(cljs.core.chunk_rest(s__22745__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22747),null);
}
} else {
var vec__22775 = cljs.core.first(s__22745__$2);
var background_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22775,(0),null);
var background_color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22775,(1),null);
return cljs.core.cons((function (){var theme = kaleidoscope.ui.clients.leonardo.make_theme(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"colors","colors",1157174732),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [family], null),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),background_color,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness,new cljs.core.Keyword(null,"contrast","contrast",568337131),(contrast / (100)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation], null));
var clj_theme = kaleidoscope.ui.utils.core.clojurize(theme.contrastColorPairs);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["CLOJURE THEME",clj_theme], 0));

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),new cljs.core.Keyword(null,"background","background",-863952629).cljs$core$IFn$_invoke$arity$1(clj_theme),new cljs.core.Keyword(null,"padding","padding",1660304693),"20px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2)], null),(function (){var iter__5523__auto__ = ((function (theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22780(s__22781){
return (new cljs.core.LazySeq(null,(function (){
var s__22781__$1 = s__22781;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__22781__$1);
if(temp__5804__auto____$1){
var s__22781__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__22781__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22781__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22783 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22782 = (0);
while(true){
if((i__22782 < size__5522__auto__)){
var vec__22786 = cljs.core._nth(c__5521__auto__,i__22782);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22786,(0),null);
var vec__22789 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22786,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22789,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22789,(1),null);
cljs.core.chunk_append(b__22783,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)));

var G__22856 = (i__22782 + (1));
i__22782 = G__22856;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22783),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22780(cljs.core.chunk_rest(s__22781__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22783),null);
}
} else {
var vec__22792 = cljs.core.first(s__22781__$2);
var color_idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22792,(0),null);
var vec__22795 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22792,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22795,(0),null);
var color = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22795,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),color,new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),k], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx),"-color",cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_idx)].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744_$_iter__22780(cljs.core.rest(s__22781__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
;
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
});})(iter__5523__auto__,theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (iter__5523__auto__,theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props){
return (function (p__22798){
var vec__22799 = p__22798;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22799,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22799,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"background","background",-863952629));
});})(iter__5523__auto__,theme,clj_theme,vec__22775,background_idx,background_color,s__22745__$2,temp__5804__auto__,family,map__22743,map__22743__$1,lightness,saturation,contrast,map__22742,map__22742__$1,family_name,base_color,background_colors,on_change,theme_props))
,clj_theme)));
})()], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(family_name),"-background-display-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background_idx)].join('')], null));
})(),kaleidoscope$ui$components$colors$color_family$color_family_$_iter__22744(cljs.core.rest(s__22745__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,v], null);
}),background_colors));
})()], null)], null);
});
kaleidoscope.ui.components.colors.color_family.background_color_QMARK_ = (function kaleidoscope$ui$components$colors$color_family$background_color_QMARK_(p__22802){
var vec__22803 = p__22802;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22803,(0),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22803,(1),null);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-light","background-light",-1612638727),null,new cljs.core.Keyword(null,"background-dark","background-dark",-589825250),null], null), null),k);
});
kaleidoscope.ui.components.colors.color_family.color_theme = (function kaleidoscope$ui$components$colors$color_family$color_theme(p__22806){
var map__22807 = p__22806;
var map__22807__$1 = cljs.core.__destructure_map(map__22807);
var palette = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22807__$1,new cljs.core.Keyword(null,"palette","palette",-456203511));
var colors = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var backgrounds = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.vec(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(kaleidoscope.ui.components.colors.color_family.background_color_QMARK_,palette)));
var lightness = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
var contrast = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((30));
var saturation = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(0.1);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,"BACKGROUNDS)",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_family.Item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(4),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22808(s__22809){
return (new cljs.core.LazySeq(null,(function (){
var s__22809__$1 = s__22809;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22809__$1);
if(temp__5804__auto__){
var s__22809__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22809__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22809__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22811 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22810 = (0);
while(true){
if((i__22810 < size__5522__auto__)){
var vec__22812 = cljs.core._nth(c__5521__auto__,i__22810);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22812,(0),null);
var vec__22815 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22812,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22815,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22815,(1),null);
cljs.core.chunk_append(b__22811,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__22810,vec__22812,idx,vec__22815,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22811,s__22809__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__22810,vec__22812,idx,vec__22815,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22811,s__22809__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__22857 = (i__22810 + (1));
i__22810 = G__22857;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22811),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22808(cljs.core.chunk_rest(s__22809__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22811),null);
}
} else {
var vec__22818 = cljs.core.first(s__22809__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22818,(0),null);
var vec__22821 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22818,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22821,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22821,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_picker.basic_color_picker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__22818,idx,vec__22821,color_name,color_swatch,s__22809__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(backgrounds,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__22818,idx,vec__22821,color_name,color_swatch,s__22809__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22808(cljs.core.rest(s__22809__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,ele){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,ele], null);
}),cljs.core.deref(backgrounds)));
})(),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"300px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"title","title",636505583),"Contrast",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),(30),new cljs.core.Keyword(null,"min","min",444991522),(15),new cljs.core.Keyword(null,"max","max",61366548),(500),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(contrast,new_val);
})], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Saturation",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),0.1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(saturation,new_val);
})], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.slider.value_slider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"Lightness",new cljs.core.Keyword(null,"initial-value","initial-value",470619381),0.1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_val){
return cljs.core.reset_BANG_(lightness,new_val);
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22830(s__22831){
return (new cljs.core.LazySeq(null,(function (){
var s__22831__$1 = s__22831;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22831__$1);
if(temp__5804__auto__){
var s__22831__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22831__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22831__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22833 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22832 = (0);
while(true){
if((i__22832 < size__5522__auto__)){
var vec__22834 = cljs.core._nth(c__5521__auto__,i__22832);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22834,(0),null);
var vec__22837 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22834,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22837,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22837,(1),null);
cljs.core.chunk_append(b__22833,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (i__22832,vec__22834,idx,vec__22837,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22833,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (p__22840){
var vec__22841 = p__22840;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22841,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22841,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(i__22832,vec__22834,idx,vec__22837,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22833,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (i__22832,vec__22834,idx,vec__22837,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22833,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(i__22832,vec__22834,idx,vec__22837,color_name,color_swatch,c__5521__auto__,size__5522__auto__,b__22833,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)));

var G__22858 = (i__22832 + (1));
i__22832 = G__22858;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22833),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22830(cljs.core.chunk_rest(s__22831__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22833),null);
}
} else {
var vec__22844 = cljs.core.first(s__22831__$2);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22844,(0),null);
var vec__22847 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22844,(1),null);
var color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22847,(0),null);
var color_swatch = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22847,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),idx,") ",color_name,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_family.color_family,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"family-name","family-name",660184252),color_name,new cljs.core.Keyword(null,"base-color","base-color",-1117474436),new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch),new cljs.core.Keyword(null,"background-colors","background-colors",657802834),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (vec__22844,idx,vec__22847,color_name,color_swatch,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (p__22850){
var vec__22851 = p__22850;
var _color_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22851,(0),null);
var color_swatch__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22851,(1),null);
return new cljs.core.Keyword(null,"main","main",-2117802661).cljs$core$IFn$_invoke$arity$1(color_swatch__$1);
});})(vec__22844,idx,vec__22847,color_name,color_swatch,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
,cljs.core.deref(backgrounds)),new cljs.core.Keyword(null,"theme-props","theme-props",-1959239644),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),cljs.core.deref(lightness),new cljs.core.Keyword(null,"contrast","contrast",568337131),cljs.core.deref(contrast),new cljs.core.Keyword(null,"saturation","saturation",-14247929),cljs.core.deref(saturation)], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (vec__22844,idx,vec__22847,color_name,color_swatch,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette){
return (function (new_color){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(colors,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [color_name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"main","main",-2117802661),kaleidoscope.ui.components.colors.color_picker.upcase(new_color)], null)], null));
});})(vec__22844,idx,vec__22847,color_name,color_swatch,s__22831__$2,temp__5804__auto__,colors,backgrounds,lightness,contrast,saturation,map__22807,map__22807__$1,palette))
], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(color_name),"-color-picker"].join('')], null)),kaleidoscope$ui$components$colors$color_family$color_theme_$_iter__22830(cljs.core.rest(s__22831__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,ele){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [idx,ele], null);
}),cljs.core.deref(colors)));
})())], null)], null);
});
});
Object.defineProperty(module.exports, "Item", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_family.Item; } });
Object.defineProperty(module.exports, "STANDARD_RATIOS", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_family.STANDARD_RATIOS; } });
Object.defineProperty(module.exports, "color_family", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_family.color_family; } });
Object.defineProperty(module.exports, "background_color_QMARK_", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_family.background_color_QMARK_; } });
Object.defineProperty(module.exports, "color_theme", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_family.color_theme; } });
//# sourceMappingURL=kaleidoscope.ui.components.colors.color_family.js.map
