var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./clojure.string.js");
require("./shadow.json.js");
require("./shadow.cljs.devtools.client.env.js");
require("./shadow.cljs.devtools.client.console.js");
require("./shadow.cljs.devtools.client.hud.js");
require("./shadow.cljs.devtools.client.websocket.js");
require("./shadow.cljs.devtools.client.shared.js");
require("./shadow.remote.runtime.api.js");
require("./shadow.remote.runtime.shared.js");
var module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard=$CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard || ($CLJS.module$shadow_js_shim_module$kaleidoscope_js$ui$components$FullImageCard = {});
var cognitect=$CLJS.cognitect || ($CLJS.cognitect = {});
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
var module$shadow_js_shim_module$$mui$material$StepIcon=$CLJS.module$shadow_js_shim_module$$mui$material$StepIcon || ($CLJS.module$shadow_js_shim_module$$mui$material$StepIcon = {});
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

$CLJS.SHADOW_ENV.setLoaded("shadow.cljs.devtools.client.browser.js");

goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21408 = arguments.length;
var i__5770__auto___21409 = (0);
while(true){
if((i__5770__auto___21409 < len__5769__auto___21408)){
args__5775__auto__.push((arguments[i__5770__auto___21409]));

var G__21410 = (i__5770__auto___21409 + (1));
i__5770__auto___21409 = G__21410;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq20797){
var G__20798 = cljs.core.first(seq20797);
var seq20797__$1 = cljs.core.next(seq20797);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20798,seq20797__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__20799 = cljs.core.seq(sources);
var chunk__20800 = null;
var count__20801 = (0);
var i__20802 = (0);
while(true){
if((i__20802 < count__20801)){
var map__20807 = chunk__20800.cljs$core$IIndexed$_nth$arity$2(null,i__20802);
var map__20807__$1 = cljs.core.__destructure_map(map__20807);
var src = map__20807__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20807__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20807__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20807__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20807__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20808){var e_21411 = e20808;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21411);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21411.message)].join('')));
}

var G__21412 = seq__20799;
var G__21413 = chunk__20800;
var G__21414 = count__20801;
var G__21415 = (i__20802 + (1));
seq__20799 = G__21412;
chunk__20800 = G__21413;
count__20801 = G__21414;
i__20802 = G__21415;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20799);
if(temp__5804__auto__){
var seq__20799__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20799__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20799__$1);
var G__21416 = cljs.core.chunk_rest(seq__20799__$1);
var G__21417 = c__5568__auto__;
var G__21418 = cljs.core.count(c__5568__auto__);
var G__21419 = (0);
seq__20799 = G__21416;
chunk__20800 = G__21417;
count__20801 = G__21418;
i__20802 = G__21419;
continue;
} else {
var map__20810 = cljs.core.first(seq__20799__$1);
var map__20810__$1 = cljs.core.__destructure_map(map__20810);
var src = map__20810__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20810__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20810__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20810__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20810__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20811){var e_21420 = e20811;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21420);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21420.message)].join('')));
}

var G__21421 = cljs.core.next(seq__20799__$1);
var G__21422 = null;
var G__21423 = (0);
var G__21424 = (0);
seq__20799 = G__21421;
chunk__20800 = G__21422;
count__20801 = G__21423;
i__20802 = G__21424;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__20812 = cljs.core.seq(js_requires);
var chunk__20813 = null;
var count__20814 = (0);
var i__20815 = (0);
while(true){
if((i__20815 < count__20814)){
var js_ns = chunk__20813.cljs$core$IIndexed$_nth$arity$2(null,i__20815);
var require_str_21425 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21425);


var G__21426 = seq__20812;
var G__21427 = chunk__20813;
var G__21428 = count__20814;
var G__21429 = (i__20815 + (1));
seq__20812 = G__21426;
chunk__20813 = G__21427;
count__20814 = G__21428;
i__20815 = G__21429;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20812);
if(temp__5804__auto__){
var seq__20812__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20812__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20812__$1);
var G__21430 = cljs.core.chunk_rest(seq__20812__$1);
var G__21431 = c__5568__auto__;
var G__21432 = cljs.core.count(c__5568__auto__);
var G__21433 = (0);
seq__20812 = G__21430;
chunk__20813 = G__21431;
count__20814 = G__21432;
i__20815 = G__21433;
continue;
} else {
var js_ns = cljs.core.first(seq__20812__$1);
var require_str_21434 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21434);


var G__21435 = cljs.core.next(seq__20812__$1);
var G__21436 = null;
var G__21437 = (0);
var G__21438 = (0);
seq__20812 = G__21435;
chunk__20813 = G__21436;
count__20814 = G__21437;
i__20815 = G__21438;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__20817){
var map__20818 = p__20817;
var map__20818__$1 = cljs.core.__destructure_map(map__20818);
var msg = map__20818__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20818__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20818__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20819(s__20820){
return (new cljs.core.LazySeq(null,(function (){
var s__20820__$1 = s__20820;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__20820__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__20825 = cljs.core.first(xs__6360__auto__);
var map__20825__$1 = cljs.core.__destructure_map(map__20825);
var src = map__20825__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20825__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20825__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__20820__$1,map__20825,map__20825__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20818,map__20818__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20819_$_iter__20821(s__20822){
return (new cljs.core.LazySeq(null,((function (s__20820__$1,map__20825,map__20825__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20818,map__20818__$1,msg,info,reload_info){
return (function (){
var s__20822__$1 = s__20822;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__20822__$1);
if(temp__5804__auto____$1){
var s__20822__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__20822__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20822__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20824 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20823 = (0);
while(true){
if((i__20823 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__20823);
cljs.core.chunk_append(b__20824,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__21439 = (i__20823 + (1));
i__20823 = G__21439;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20824),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20819_$_iter__20821(cljs.core.chunk_rest(s__20822__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20824),null);
}
} else {
var warning = cljs.core.first(s__20822__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20819_$_iter__20821(cljs.core.rest(s__20822__$2)));
}
} else {
return null;
}
break;
}
});})(s__20820__$1,map__20825,map__20825__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20818,map__20818__$1,msg,info,reload_info))
,null,null));
});})(s__20820__$1,map__20825,map__20825__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20818,map__20818__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20819(cljs.core.rest(s__20820__$1)));
} else {
var G__21440 = cljs.core.rest(s__20820__$1);
s__20820__$1 = G__21440;
continue;
}
} else {
var G__21441 = cljs.core.rest(s__20820__$1);
s__20820__$1 = G__21441;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__20828_21442 = cljs.core.seq(warnings);
var chunk__20829_21443 = null;
var count__20830_21444 = (0);
var i__20831_21445 = (0);
while(true){
if((i__20831_21445 < count__20830_21444)){
var map__20842_21446 = chunk__20829_21443.cljs$core$IIndexed$_nth$arity$2(null,i__20831_21445);
var map__20842_21447__$1 = cljs.core.__destructure_map(map__20842_21446);
var w_21448 = map__20842_21447__$1;
var msg_21449__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20842_21447__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21450 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20842_21447__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20842_21447__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21452 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20842_21447__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21452)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21450),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21451),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21449__$1)].join(''));


var G__21453 = seq__20828_21442;
var G__21454 = chunk__20829_21443;
var G__21455 = count__20830_21444;
var G__21456 = (i__20831_21445 + (1));
seq__20828_21442 = G__21453;
chunk__20829_21443 = G__21454;
count__20830_21444 = G__21455;
i__20831_21445 = G__21456;
continue;
} else {
var temp__5804__auto___21457 = cljs.core.seq(seq__20828_21442);
if(temp__5804__auto___21457){
var seq__20828_21458__$1 = temp__5804__auto___21457;
if(cljs.core.chunked_seq_QMARK_(seq__20828_21458__$1)){
var c__5568__auto___21459 = cljs.core.chunk_first(seq__20828_21458__$1);
var G__21460 = cljs.core.chunk_rest(seq__20828_21458__$1);
var G__21461 = c__5568__auto___21459;
var G__21462 = cljs.core.count(c__5568__auto___21459);
var G__21463 = (0);
seq__20828_21442 = G__21460;
chunk__20829_21443 = G__21461;
count__20830_21444 = G__21462;
i__20831_21445 = G__21463;
continue;
} else {
var map__20849_21464 = cljs.core.first(seq__20828_21458__$1);
var map__20849_21465__$1 = cljs.core.__destructure_map(map__20849_21464);
var w_21466 = map__20849_21465__$1;
var msg_21467__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20849_21465__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21468 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20849_21465__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21469 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20849_21465__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21470 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20849_21465__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21470)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21468),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21469),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21467__$1)].join(''));


var G__21471 = cljs.core.next(seq__20828_21458__$1);
var G__21472 = null;
var G__21473 = (0);
var G__21474 = (0);
seq__20828_21442 = G__21471;
chunk__20829_21443 = G__21472;
count__20830_21444 = G__21473;
i__20831_21445 = G__21474;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__20816_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__20816_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__20884){
var map__20885 = p__20884;
var map__20885__$1 = cljs.core.__destructure_map(map__20885);
var msg = map__20885__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20885__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20885__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__20886 = cljs.core.seq(updates);
var chunk__20888 = null;
var count__20889 = (0);
var i__20890 = (0);
while(true){
if((i__20890 < count__20889)){
var path = chunk__20888.cljs$core$IIndexed$_nth$arity$2(null,i__20890);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__21192_21475 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__21196_21476 = null;
var count__21197_21477 = (0);
var i__21198_21478 = (0);
while(true){
if((i__21198_21478 < count__21197_21477)){
var node_21479 = chunk__21196_21476.cljs$core$IIndexed$_nth$arity$2(null,i__21198_21478);
if(cljs.core.not(node_21479.shadow$old)){
var path_match_21480 = shadow.cljs.devtools.client.browser.match_paths(node_21479.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21480)){
var new_link_21481 = (function (){var G__21238 = node_21479.cloneNode(true);
G__21238.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21480),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21238;
})();
(node_21479.shadow$old = true);

(new_link_21481.onload = ((function (seq__21192_21475,chunk__21196_21476,count__21197_21477,i__21198_21478,seq__20886,chunk__20888,count__20889,i__20890,new_link_21481,path_match_21480,node_21479,path,map__20885,map__20885__$1,msg,updates,reload_info){
return (function (e){
var seq__21239_21482 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21241_21483 = null;
var count__21242_21484 = (0);
var i__21243_21485 = (0);
while(true){
if((i__21243_21485 < count__21242_21484)){
var map__21247_21486 = chunk__21241_21483.cljs$core$IIndexed$_nth$arity$2(null,i__21243_21485);
var map__21247_21487__$1 = cljs.core.__destructure_map(map__21247_21486);
var task_21488 = map__21247_21487__$1;
var fn_str_21489 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21247_21487__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21490 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21247_21487__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21491 = goog.getObjectByName(fn_str_21489,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21490)].join(''));

(fn_obj_21491.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21491.cljs$core$IFn$_invoke$arity$2(path,new_link_21481) : fn_obj_21491.call(null,path,new_link_21481));


var G__21492 = seq__21239_21482;
var G__21493 = chunk__21241_21483;
var G__21494 = count__21242_21484;
var G__21495 = (i__21243_21485 + (1));
seq__21239_21482 = G__21492;
chunk__21241_21483 = G__21493;
count__21242_21484 = G__21494;
i__21243_21485 = G__21495;
continue;
} else {
var temp__5804__auto___21496 = cljs.core.seq(seq__21239_21482);
if(temp__5804__auto___21496){
var seq__21239_21497__$1 = temp__5804__auto___21496;
if(cljs.core.chunked_seq_QMARK_(seq__21239_21497__$1)){
var c__5568__auto___21498 = cljs.core.chunk_first(seq__21239_21497__$1);
var G__21499 = cljs.core.chunk_rest(seq__21239_21497__$1);
var G__21500 = c__5568__auto___21498;
var G__21501 = cljs.core.count(c__5568__auto___21498);
var G__21502 = (0);
seq__21239_21482 = G__21499;
chunk__21241_21483 = G__21500;
count__21242_21484 = G__21501;
i__21243_21485 = G__21502;
continue;
} else {
var map__21248_21503 = cljs.core.first(seq__21239_21497__$1);
var map__21248_21504__$1 = cljs.core.__destructure_map(map__21248_21503);
var task_21505 = map__21248_21504__$1;
var fn_str_21506 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21248_21504__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21507 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21248_21504__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21508 = goog.getObjectByName(fn_str_21506,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21507)].join(''));

(fn_obj_21508.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21508.cljs$core$IFn$_invoke$arity$2(path,new_link_21481) : fn_obj_21508.call(null,path,new_link_21481));


var G__21509 = cljs.core.next(seq__21239_21497__$1);
var G__21510 = null;
var G__21511 = (0);
var G__21512 = (0);
seq__21239_21482 = G__21509;
chunk__21241_21483 = G__21510;
count__21242_21484 = G__21511;
i__21243_21485 = G__21512;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21479);
});})(seq__21192_21475,chunk__21196_21476,count__21197_21477,i__21198_21478,seq__20886,chunk__20888,count__20889,i__20890,new_link_21481,path_match_21480,node_21479,path,map__20885,map__20885__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21480], 0));

goog.dom.insertSiblingAfter(new_link_21481,node_21479);


var G__21513 = seq__21192_21475;
var G__21514 = chunk__21196_21476;
var G__21515 = count__21197_21477;
var G__21516 = (i__21198_21478 + (1));
seq__21192_21475 = G__21513;
chunk__21196_21476 = G__21514;
count__21197_21477 = G__21515;
i__21198_21478 = G__21516;
continue;
} else {
var G__21517 = seq__21192_21475;
var G__21518 = chunk__21196_21476;
var G__21519 = count__21197_21477;
var G__21520 = (i__21198_21478 + (1));
seq__21192_21475 = G__21517;
chunk__21196_21476 = G__21518;
count__21197_21477 = G__21519;
i__21198_21478 = G__21520;
continue;
}
} else {
var G__21521 = seq__21192_21475;
var G__21522 = chunk__21196_21476;
var G__21523 = count__21197_21477;
var G__21524 = (i__21198_21478 + (1));
seq__21192_21475 = G__21521;
chunk__21196_21476 = G__21522;
count__21197_21477 = G__21523;
i__21198_21478 = G__21524;
continue;
}
} else {
var temp__5804__auto___21525 = cljs.core.seq(seq__21192_21475);
if(temp__5804__auto___21525){
var seq__21192_21526__$1 = temp__5804__auto___21525;
if(cljs.core.chunked_seq_QMARK_(seq__21192_21526__$1)){
var c__5568__auto___21527 = cljs.core.chunk_first(seq__21192_21526__$1);
var G__21528 = cljs.core.chunk_rest(seq__21192_21526__$1);
var G__21529 = c__5568__auto___21527;
var G__21530 = cljs.core.count(c__5568__auto___21527);
var G__21531 = (0);
seq__21192_21475 = G__21528;
chunk__21196_21476 = G__21529;
count__21197_21477 = G__21530;
i__21198_21478 = G__21531;
continue;
} else {
var node_21532 = cljs.core.first(seq__21192_21526__$1);
if(cljs.core.not(node_21532.shadow$old)){
var path_match_21533 = shadow.cljs.devtools.client.browser.match_paths(node_21532.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21533)){
var new_link_21534 = (function (){var G__21253 = node_21532.cloneNode(true);
G__21253.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21533),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21253;
})();
(node_21532.shadow$old = true);

(new_link_21534.onload = ((function (seq__21192_21475,chunk__21196_21476,count__21197_21477,i__21198_21478,seq__20886,chunk__20888,count__20889,i__20890,new_link_21534,path_match_21533,node_21532,seq__21192_21526__$1,temp__5804__auto___21525,path,map__20885,map__20885__$1,msg,updates,reload_info){
return (function (e){
var seq__21256_21535 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21258_21536 = null;
var count__21259_21537 = (0);
var i__21260_21538 = (0);
while(true){
if((i__21260_21538 < count__21259_21537)){
var map__21269_21539 = chunk__21258_21536.cljs$core$IIndexed$_nth$arity$2(null,i__21260_21538);
var map__21269_21540__$1 = cljs.core.__destructure_map(map__21269_21539);
var task_21541 = map__21269_21540__$1;
var fn_str_21542 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21269_21540__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21543 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21269_21540__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21544 = goog.getObjectByName(fn_str_21542,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21543)].join(''));

(fn_obj_21544.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21544.cljs$core$IFn$_invoke$arity$2(path,new_link_21534) : fn_obj_21544.call(null,path,new_link_21534));


var G__21545 = seq__21256_21535;
var G__21546 = chunk__21258_21536;
var G__21547 = count__21259_21537;
var G__21548 = (i__21260_21538 + (1));
seq__21256_21535 = G__21545;
chunk__21258_21536 = G__21546;
count__21259_21537 = G__21547;
i__21260_21538 = G__21548;
continue;
} else {
var temp__5804__auto___21549__$1 = cljs.core.seq(seq__21256_21535);
if(temp__5804__auto___21549__$1){
var seq__21256_21550__$1 = temp__5804__auto___21549__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21256_21550__$1)){
var c__5568__auto___21551 = cljs.core.chunk_first(seq__21256_21550__$1);
var G__21552 = cljs.core.chunk_rest(seq__21256_21550__$1);
var G__21553 = c__5568__auto___21551;
var G__21554 = cljs.core.count(c__5568__auto___21551);
var G__21555 = (0);
seq__21256_21535 = G__21552;
chunk__21258_21536 = G__21553;
count__21259_21537 = G__21554;
i__21260_21538 = G__21555;
continue;
} else {
var map__21275_21556 = cljs.core.first(seq__21256_21550__$1);
var map__21275_21557__$1 = cljs.core.__destructure_map(map__21275_21556);
var task_21558 = map__21275_21557__$1;
var fn_str_21559 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21275_21557__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21560 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21275_21557__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21561 = goog.getObjectByName(fn_str_21559,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21560)].join(''));

(fn_obj_21561.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21561.cljs$core$IFn$_invoke$arity$2(path,new_link_21534) : fn_obj_21561.call(null,path,new_link_21534));


var G__21562 = cljs.core.next(seq__21256_21550__$1);
var G__21563 = null;
var G__21564 = (0);
var G__21565 = (0);
seq__21256_21535 = G__21562;
chunk__21258_21536 = G__21563;
count__21259_21537 = G__21564;
i__21260_21538 = G__21565;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21532);
});})(seq__21192_21475,chunk__21196_21476,count__21197_21477,i__21198_21478,seq__20886,chunk__20888,count__20889,i__20890,new_link_21534,path_match_21533,node_21532,seq__21192_21526__$1,temp__5804__auto___21525,path,map__20885,map__20885__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21533], 0));

goog.dom.insertSiblingAfter(new_link_21534,node_21532);


var G__21566 = cljs.core.next(seq__21192_21526__$1);
var G__21567 = null;
var G__21568 = (0);
var G__21569 = (0);
seq__21192_21475 = G__21566;
chunk__21196_21476 = G__21567;
count__21197_21477 = G__21568;
i__21198_21478 = G__21569;
continue;
} else {
var G__21570 = cljs.core.next(seq__21192_21526__$1);
var G__21571 = null;
var G__21572 = (0);
var G__21573 = (0);
seq__21192_21475 = G__21570;
chunk__21196_21476 = G__21571;
count__21197_21477 = G__21572;
i__21198_21478 = G__21573;
continue;
}
} else {
var G__21574 = cljs.core.next(seq__21192_21526__$1);
var G__21575 = null;
var G__21576 = (0);
var G__21577 = (0);
seq__21192_21475 = G__21574;
chunk__21196_21476 = G__21575;
count__21197_21477 = G__21576;
i__21198_21478 = G__21577;
continue;
}
}
} else {
}
}
break;
}


var G__21578 = seq__20886;
var G__21579 = chunk__20888;
var G__21580 = count__20889;
var G__21581 = (i__20890 + (1));
seq__20886 = G__21578;
chunk__20888 = G__21579;
count__20889 = G__21580;
i__20890 = G__21581;
continue;
} else {
var G__21582 = seq__20886;
var G__21583 = chunk__20888;
var G__21584 = count__20889;
var G__21585 = (i__20890 + (1));
seq__20886 = G__21582;
chunk__20888 = G__21583;
count__20889 = G__21584;
i__20890 = G__21585;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20886);
if(temp__5804__auto__){
var seq__20886__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20886__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20886__$1);
var G__21586 = cljs.core.chunk_rest(seq__20886__$1);
var G__21587 = c__5568__auto__;
var G__21588 = cljs.core.count(c__5568__auto__);
var G__21589 = (0);
seq__20886 = G__21586;
chunk__20888 = G__21587;
count__20889 = G__21588;
i__20890 = G__21589;
continue;
} else {
var path = cljs.core.first(seq__20886__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__21282_21590 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__21286_21591 = null;
var count__21287_21592 = (0);
var i__21288_21593 = (0);
while(true){
if((i__21288_21593 < count__21287_21592)){
var node_21594 = chunk__21286_21591.cljs$core$IIndexed$_nth$arity$2(null,i__21288_21593);
if(cljs.core.not(node_21594.shadow$old)){
var path_match_21595 = shadow.cljs.devtools.client.browser.match_paths(node_21594.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21595)){
var new_link_21596 = (function (){var G__21340 = node_21594.cloneNode(true);
G__21340.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21595),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21340;
})();
(node_21594.shadow$old = true);

(new_link_21596.onload = ((function (seq__21282_21590,chunk__21286_21591,count__21287_21592,i__21288_21593,seq__20886,chunk__20888,count__20889,i__20890,new_link_21596,path_match_21595,node_21594,path,seq__20886__$1,temp__5804__auto__,map__20885,map__20885__$1,msg,updates,reload_info){
return (function (e){
var seq__21345_21597 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21347_21598 = null;
var count__21348_21599 = (0);
var i__21349_21600 = (0);
while(true){
if((i__21349_21600 < count__21348_21599)){
var map__21353_21601 = chunk__21347_21598.cljs$core$IIndexed$_nth$arity$2(null,i__21349_21600);
var map__21353_21602__$1 = cljs.core.__destructure_map(map__21353_21601);
var task_21603 = map__21353_21602__$1;
var fn_str_21604 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21353_21602__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21605 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21353_21602__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21606 = goog.getObjectByName(fn_str_21604,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21605)].join(''));

(fn_obj_21606.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21606.cljs$core$IFn$_invoke$arity$2(path,new_link_21596) : fn_obj_21606.call(null,path,new_link_21596));


var G__21607 = seq__21345_21597;
var G__21608 = chunk__21347_21598;
var G__21609 = count__21348_21599;
var G__21610 = (i__21349_21600 + (1));
seq__21345_21597 = G__21607;
chunk__21347_21598 = G__21608;
count__21348_21599 = G__21609;
i__21349_21600 = G__21610;
continue;
} else {
var temp__5804__auto___21611__$1 = cljs.core.seq(seq__21345_21597);
if(temp__5804__auto___21611__$1){
var seq__21345_21612__$1 = temp__5804__auto___21611__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21345_21612__$1)){
var c__5568__auto___21613 = cljs.core.chunk_first(seq__21345_21612__$1);
var G__21614 = cljs.core.chunk_rest(seq__21345_21612__$1);
var G__21615 = c__5568__auto___21613;
var G__21616 = cljs.core.count(c__5568__auto___21613);
var G__21617 = (0);
seq__21345_21597 = G__21614;
chunk__21347_21598 = G__21615;
count__21348_21599 = G__21616;
i__21349_21600 = G__21617;
continue;
} else {
var map__21358_21618 = cljs.core.first(seq__21345_21612__$1);
var map__21358_21619__$1 = cljs.core.__destructure_map(map__21358_21618);
var task_21620 = map__21358_21619__$1;
var fn_str_21621 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21358_21619__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21622 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21358_21619__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21623 = goog.getObjectByName(fn_str_21621,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21622)].join(''));

(fn_obj_21623.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21623.cljs$core$IFn$_invoke$arity$2(path,new_link_21596) : fn_obj_21623.call(null,path,new_link_21596));


var G__21624 = cljs.core.next(seq__21345_21612__$1);
var G__21625 = null;
var G__21626 = (0);
var G__21627 = (0);
seq__21345_21597 = G__21624;
chunk__21347_21598 = G__21625;
count__21348_21599 = G__21626;
i__21349_21600 = G__21627;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21594);
});})(seq__21282_21590,chunk__21286_21591,count__21287_21592,i__21288_21593,seq__20886,chunk__20888,count__20889,i__20890,new_link_21596,path_match_21595,node_21594,path,seq__20886__$1,temp__5804__auto__,map__20885,map__20885__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21595], 0));

goog.dom.insertSiblingAfter(new_link_21596,node_21594);


var G__21628 = seq__21282_21590;
var G__21629 = chunk__21286_21591;
var G__21630 = count__21287_21592;
var G__21631 = (i__21288_21593 + (1));
seq__21282_21590 = G__21628;
chunk__21286_21591 = G__21629;
count__21287_21592 = G__21630;
i__21288_21593 = G__21631;
continue;
} else {
var G__21632 = seq__21282_21590;
var G__21633 = chunk__21286_21591;
var G__21634 = count__21287_21592;
var G__21635 = (i__21288_21593 + (1));
seq__21282_21590 = G__21632;
chunk__21286_21591 = G__21633;
count__21287_21592 = G__21634;
i__21288_21593 = G__21635;
continue;
}
} else {
var G__21636 = seq__21282_21590;
var G__21637 = chunk__21286_21591;
var G__21638 = count__21287_21592;
var G__21639 = (i__21288_21593 + (1));
seq__21282_21590 = G__21636;
chunk__21286_21591 = G__21637;
count__21287_21592 = G__21638;
i__21288_21593 = G__21639;
continue;
}
} else {
var temp__5804__auto___21640__$1 = cljs.core.seq(seq__21282_21590);
if(temp__5804__auto___21640__$1){
var seq__21282_21641__$1 = temp__5804__auto___21640__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21282_21641__$1)){
var c__5568__auto___21642 = cljs.core.chunk_first(seq__21282_21641__$1);
var G__21643 = cljs.core.chunk_rest(seq__21282_21641__$1);
var G__21644 = c__5568__auto___21642;
var G__21645 = cljs.core.count(c__5568__auto___21642);
var G__21646 = (0);
seq__21282_21590 = G__21643;
chunk__21286_21591 = G__21644;
count__21287_21592 = G__21645;
i__21288_21593 = G__21646;
continue;
} else {
var node_21647 = cljs.core.first(seq__21282_21641__$1);
if(cljs.core.not(node_21647.shadow$old)){
var path_match_21648 = shadow.cljs.devtools.client.browser.match_paths(node_21647.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21648)){
var new_link_21649 = (function (){var G__21361 = node_21647.cloneNode(true);
G__21361.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21648),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21361;
})();
(node_21647.shadow$old = true);

(new_link_21649.onload = ((function (seq__21282_21590,chunk__21286_21591,count__21287_21592,i__21288_21593,seq__20886,chunk__20888,count__20889,i__20890,new_link_21649,path_match_21648,node_21647,seq__21282_21641__$1,temp__5804__auto___21640__$1,path,seq__20886__$1,temp__5804__auto__,map__20885,map__20885__$1,msg,updates,reload_info){
return (function (e){
var seq__21362_21650 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21364_21651 = null;
var count__21365_21652 = (0);
var i__21366_21653 = (0);
while(true){
if((i__21366_21653 < count__21365_21652)){
var map__21370_21654 = chunk__21364_21651.cljs$core$IIndexed$_nth$arity$2(null,i__21366_21653);
var map__21370_21655__$1 = cljs.core.__destructure_map(map__21370_21654);
var task_21656 = map__21370_21655__$1;
var fn_str_21657 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21370_21655__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21658 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21370_21655__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21659 = goog.getObjectByName(fn_str_21657,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21658)].join(''));

(fn_obj_21659.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21659.cljs$core$IFn$_invoke$arity$2(path,new_link_21649) : fn_obj_21659.call(null,path,new_link_21649));


var G__21660 = seq__21362_21650;
var G__21661 = chunk__21364_21651;
var G__21662 = count__21365_21652;
var G__21663 = (i__21366_21653 + (1));
seq__21362_21650 = G__21660;
chunk__21364_21651 = G__21661;
count__21365_21652 = G__21662;
i__21366_21653 = G__21663;
continue;
} else {
var temp__5804__auto___21664__$2 = cljs.core.seq(seq__21362_21650);
if(temp__5804__auto___21664__$2){
var seq__21362_21665__$1 = temp__5804__auto___21664__$2;
if(cljs.core.chunked_seq_QMARK_(seq__21362_21665__$1)){
var c__5568__auto___21666 = cljs.core.chunk_first(seq__21362_21665__$1);
var G__21667 = cljs.core.chunk_rest(seq__21362_21665__$1);
var G__21668 = c__5568__auto___21666;
var G__21669 = cljs.core.count(c__5568__auto___21666);
var G__21670 = (0);
seq__21362_21650 = G__21667;
chunk__21364_21651 = G__21668;
count__21365_21652 = G__21669;
i__21366_21653 = G__21670;
continue;
} else {
var map__21386_21671 = cljs.core.first(seq__21362_21665__$1);
var map__21386_21672__$1 = cljs.core.__destructure_map(map__21386_21671);
var task_21673 = map__21386_21672__$1;
var fn_str_21674 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21386_21672__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21675 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21386_21672__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21676 = goog.getObjectByName(fn_str_21674,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21675)].join(''));

(fn_obj_21676.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21676.cljs$core$IFn$_invoke$arity$2(path,new_link_21649) : fn_obj_21676.call(null,path,new_link_21649));


var G__21677 = cljs.core.next(seq__21362_21665__$1);
var G__21678 = null;
var G__21679 = (0);
var G__21680 = (0);
seq__21362_21650 = G__21677;
chunk__21364_21651 = G__21678;
count__21365_21652 = G__21679;
i__21366_21653 = G__21680;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21647);
});})(seq__21282_21590,chunk__21286_21591,count__21287_21592,i__21288_21593,seq__20886,chunk__20888,count__20889,i__20890,new_link_21649,path_match_21648,node_21647,seq__21282_21641__$1,temp__5804__auto___21640__$1,path,seq__20886__$1,temp__5804__auto__,map__20885,map__20885__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21648], 0));

goog.dom.insertSiblingAfter(new_link_21649,node_21647);


var G__21681 = cljs.core.next(seq__21282_21641__$1);
var G__21682 = null;
var G__21683 = (0);
var G__21684 = (0);
seq__21282_21590 = G__21681;
chunk__21286_21591 = G__21682;
count__21287_21592 = G__21683;
i__21288_21593 = G__21684;
continue;
} else {
var G__21685 = cljs.core.next(seq__21282_21641__$1);
var G__21686 = null;
var G__21687 = (0);
var G__21688 = (0);
seq__21282_21590 = G__21685;
chunk__21286_21591 = G__21686;
count__21287_21592 = G__21687;
i__21288_21593 = G__21688;
continue;
}
} else {
var G__21689 = cljs.core.next(seq__21282_21641__$1);
var G__21690 = null;
var G__21691 = (0);
var G__21692 = (0);
seq__21282_21590 = G__21689;
chunk__21286_21591 = G__21690;
count__21287_21592 = G__21691;
i__21288_21593 = G__21692;
continue;
}
}
} else {
}
}
break;
}


var G__21693 = cljs.core.next(seq__20886__$1);
var G__21694 = null;
var G__21695 = (0);
var G__21696 = (0);
seq__20886 = G__21693;
chunk__20888 = G__21694;
count__20889 = G__21695;
i__20890 = G__21696;
continue;
} else {
var G__21697 = cljs.core.next(seq__20886__$1);
var G__21698 = null;
var G__21699 = (0);
var G__21700 = (0);
seq__20886 = G__21697;
chunk__20888 = G__21698;
count__20889 = G__21699;
i__20890 = G__21700;
continue;
}
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$3 = (function (this$,ns,p__21387){
var map__21388 = p__21387;
var map__21388__$1 = cljs.core.__destructure_map(map__21388);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21388__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__21389,done,error){
var map__21390 = p__21389;
var map__21390__$1 = cljs.core.__destructure_map(map__21390);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21390__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__21391,done,error){
var map__21392 = p__21391;
var map__21392__$1 = cljs.core.__destructure_map(map__21392);
var msg = map__21392__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21392__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21392__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21392__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__21393){
var map__21394 = p__21393;
var map__21394__$1 = cljs.core.__destructure_map(map__21394);
var src = map__21394__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21394__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__21395 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__21395) : done.call(null,G__21395));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__21396){
var map__21397 = p__21396;
var map__21397__$1 = cljs.core.__destructure_map(map__21397);
var msg__$1 = map__21397__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21397__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e21398){var ex = e21398;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__21399){
var map__21400 = p__21399;
var map__21400__$1 = cljs.core.__destructure_map(map__21400);
var env = map__21400__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21400__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__21401){
var map__21402 = p__21401;
var map__21402__$1 = cljs.core.__destructure_map(map__21402);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21402__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21402__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__21405){
var map__21406 = p__21405;
var map__21406__$1 = cljs.core.__destructure_map(map__21406);
var svc = map__21406__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21406__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}
Object.defineProperty(module.exports, "script_eval", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.script_eval; } });
Object.defineProperty(module.exports, "global_eval", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.global_eval; } });
Object.defineProperty(module.exports, "do_js_load", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.do_js_load; } });
Object.defineProperty(module.exports, "handle_asset_update", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.handle_asset_update; } });
Object.defineProperty(module.exports, "page_load_uri", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.page_load_uri; } });
Object.defineProperty(module.exports, "do_js_requires", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.do_js_requires; } });
Object.defineProperty(module.exports, "client_info", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.client_info; } });
Object.defineProperty(module.exports, "runtime_info", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.runtime_info; } });
Object.defineProperty(module.exports, "match_paths", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.match_paths; } });
Object.defineProperty(module.exports, "devtools_msg", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.devtools_msg; } });
Object.defineProperty(module.exports, "do_js_reload", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.do_js_reload; } });
Object.defineProperty(module.exports, "ws_was_welcome_ref", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.ws_was_welcome_ref; } });
Object.defineProperty(module.exports, "handle_build_complete", { enumerable: false, get: function() { return shadow.cljs.devtools.client.browser.handle_build_complete; } });
//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
