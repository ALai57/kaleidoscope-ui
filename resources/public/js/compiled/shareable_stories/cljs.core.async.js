var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./cljs.core.async.impl.protocols.js");
require("./cljs.core.async.impl.channels.js");
require("./cljs.core.async.impl.buffers.js");
require("./cljs.core.async.impl.timers.js");
require("./cljs.core.async.impl.dispatch.js");
require("./cljs.core.async.impl.ioc_helpers.js");
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

$CLJS.SHADOW_ENV.setLoaded("cljs.core.async.js");

goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14357 = (function (f,blockable,meta14358){
this.f = f;
this.blockable = blockable;
this.meta14358 = meta14358;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14359,meta14358__$1){
var self__ = this;
var _14359__$1 = this;
return (new cljs.core.async.t_cljs$core$async14357(self__.f,self__.blockable,meta14358__$1));
}));

(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14359){
var self__ = this;
var _14359__$1 = this;
return self__.meta14358;
}));

(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async14357.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async14357.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta14358","meta14358",-1469653858,null)], null);
}));

(cljs.core.async.t_cljs$core$async14357.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14357.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14357");

(cljs.core.async.t_cljs$core$async14357.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async14357");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14357.
 */
cljs.core.async.__GT_t_cljs$core$async14357 = (function cljs$core$async$__GT_t_cljs$core$async14357(f,blockable,meta14358){
return (new cljs.core.async.t_cljs$core$async14357(f,blockable,meta14358));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__14354 = arguments.length;
switch (G__14354) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async14357(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__14363 = arguments.length;
switch (G__14363) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__14376 = arguments.length;
switch (G__14376) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__14378 = arguments.length;
switch (G__14378) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_17277 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_17277) : fn1.call(null,val_17277));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_17277) : fn1.call(null,val_17277));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__14386 = arguments.length;
switch (G__14386) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___17287 = n;
var x_17288 = (0);
while(true){
if((x_17288 < n__5636__auto___17287)){
(a[x_17288] = x_17288);

var G__17290 = (x_17288 + (1));
x_17288 = G__17290;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14395 = (function (flag,meta14396){
this.flag = flag;
this.meta14396 = meta14396;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14397,meta14396__$1){
var self__ = this;
var _14397__$1 = this;
return (new cljs.core.async.t_cljs$core$async14395(self__.flag,meta14396__$1));
}));

(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14397){
var self__ = this;
var _14397__$1 = this;
return self__.meta14396;
}));

(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14395.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async14395.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta14396","meta14396",-1941531307,null)], null);
}));

(cljs.core.async.t_cljs$core$async14395.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14395.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14395");

(cljs.core.async.t_cljs$core$async14395.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async14395");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14395.
 */
cljs.core.async.__GT_t_cljs$core$async14395 = (function cljs$core$async$__GT_t_cljs$core$async14395(flag,meta14396){
return (new cljs.core.async.t_cljs$core$async14395(flag,meta14396));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async14395(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14399 = (function (flag,cb,meta14400){
this.flag = flag;
this.cb = cb;
this.meta14400 = meta14400;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14401,meta14400__$1){
var self__ = this;
var _14401__$1 = this;
return (new cljs.core.async.t_cljs$core$async14399(self__.flag,self__.cb,meta14400__$1));
}));

(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14401){
var self__ = this;
var _14401__$1 = this;
return self__.meta14400;
}));

(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async14399.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async14399.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta14400","meta14400",491250982,null)], null);
}));

(cljs.core.async.t_cljs$core$async14399.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14399.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14399");

(cljs.core.async.t_cljs$core$async14399.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async14399");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14399.
 */
cljs.core.async.__GT_t_cljs$core$async14399 = (function cljs$core$async$__GT_t_cljs$core$async14399(flag,cb,meta14400){
return (new cljs.core.async.t_cljs$core$async14399(flag,cb,meta14400));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async14399(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__14408_SHARP_){
var G__14413 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__14408_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__14413) : fret.call(null,G__14413));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__14409_SHARP_){
var G__14415 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__14409_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__14415) : fret.call(null,G__14415));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__17310 = (i + (1));
i = G__17310;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___17312 = arguments.length;
var i__5770__auto___17313 = (0);
while(true){
if((i__5770__auto___17313 < len__5769__auto___17312)){
args__5775__auto__.push((arguments[i__5770__auto___17313]));

var G__17314 = (i__5770__auto___17313 + (1));
i__5770__auto___17313 = G__17314;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__14422){
var map__14423 = p__14422;
var map__14423__$1 = cljs.core.__destructure_map(map__14423);
var opts = map__14423__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq14418){
var G__14419 = cljs.core.first(seq14418);
var seq14418__$1 = cljs.core.next(seq14418);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14419,seq14418__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__14442 = arguments.length;
switch (G__14442) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__14281__auto___17320 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_14507){
var state_val_14520 = (state_14507[(1)]);
if((state_val_14520 === (7))){
var inst_14495 = (state_14507[(2)]);
var state_14507__$1 = state_14507;
var statearr_14571_17321 = state_14507__$1;
(statearr_14571_17321[(2)] = inst_14495);

(statearr_14571_17321[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (1))){
var state_14507__$1 = state_14507;
var statearr_14574_17322 = state_14507__$1;
(statearr_14574_17322[(2)] = null);

(statearr_14574_17322[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (4))){
var inst_14463 = (state_14507[(7)]);
var inst_14463__$1 = (state_14507[(2)]);
var inst_14471 = (inst_14463__$1 == null);
var state_14507__$1 = (function (){var statearr_14588 = state_14507;
(statearr_14588[(7)] = inst_14463__$1);

return statearr_14588;
})();
if(cljs.core.truth_(inst_14471)){
var statearr_14589_17323 = state_14507__$1;
(statearr_14589_17323[(1)] = (5));

} else {
var statearr_14590_17324 = state_14507__$1;
(statearr_14590_17324[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (13))){
var state_14507__$1 = state_14507;
var statearr_14595_17325 = state_14507__$1;
(statearr_14595_17325[(2)] = null);

(statearr_14595_17325[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (6))){
var inst_14463 = (state_14507[(7)]);
var state_14507__$1 = state_14507;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14507__$1,(11),to,inst_14463);
} else {
if((state_val_14520 === (3))){
var inst_14499 = (state_14507[(2)]);
var state_14507__$1 = state_14507;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14507__$1,inst_14499);
} else {
if((state_val_14520 === (12))){
var state_14507__$1 = state_14507;
var statearr_14612_17326 = state_14507__$1;
(statearr_14612_17326[(2)] = null);

(statearr_14612_17326[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (2))){
var state_14507__$1 = state_14507;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14507__$1,(4),from);
} else {
if((state_val_14520 === (11))){
var inst_14486 = (state_14507[(2)]);
var state_14507__$1 = state_14507;
if(cljs.core.truth_(inst_14486)){
var statearr_14625_17327 = state_14507__$1;
(statearr_14625_17327[(1)] = (12));

} else {
var statearr_14626_17328 = state_14507__$1;
(statearr_14626_17328[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (9))){
var state_14507__$1 = state_14507;
var statearr_14627_17329 = state_14507__$1;
(statearr_14627_17329[(2)] = null);

(statearr_14627_17329[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (5))){
var state_14507__$1 = state_14507;
if(cljs.core.truth_(close_QMARK_)){
var statearr_14628_17330 = state_14507__$1;
(statearr_14628_17330[(1)] = (8));

} else {
var statearr_14629_17331 = state_14507__$1;
(statearr_14629_17331[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (14))){
var inst_14493 = (state_14507[(2)]);
var state_14507__$1 = state_14507;
var statearr_14636_17332 = state_14507__$1;
(statearr_14636_17332[(2)] = inst_14493);

(statearr_14636_17332[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (10))){
var inst_14483 = (state_14507[(2)]);
var state_14507__$1 = state_14507;
var statearr_14644_17333 = state_14507__$1;
(statearr_14644_17333[(2)] = inst_14483);

(statearr_14644_17333[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14520 === (8))){
var inst_14478 = cljs.core.async.close_BANG_(to);
var state_14507__$1 = state_14507;
var statearr_14655_17334 = state_14507__$1;
(statearr_14655_17334[(2)] = inst_14478);

(statearr_14655_17334[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_14660 = [null,null,null,null,null,null,null,null];
(statearr_14660[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_14660[(1)] = (1));

return statearr_14660;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_14507){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14507);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14667){var ex__13968__auto__ = e14667;
var statearr_14670_17340 = state_14507;
(statearr_14670_17340[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14507[(4)]))){
var statearr_14676_17341 = state_14507;
(statearr_14676_17341[(1)] = cljs.core.first((state_14507[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17342 = state_14507;
state_14507 = G__17342;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_14507){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_14507);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_14682 = f__14282__auto__();
(statearr_14682[(6)] = c__14281__auto___17320);

return statearr_14682;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__14685){
var vec__14686 = p__14685;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14686,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14686,(1),null);
var job = vec__14686;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__14281__auto___17345 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_14694){
var state_val_14695 = (state_14694[(1)]);
if((state_val_14695 === (1))){
var state_14694__$1 = state_14694;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14694__$1,(2),res,v);
} else {
if((state_val_14695 === (2))){
var inst_14691 = (state_14694[(2)]);
var inst_14692 = cljs.core.async.close_BANG_(res);
var state_14694__$1 = (function (){var statearr_14696 = state_14694;
(statearr_14696[(7)] = inst_14691);

return statearr_14696;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_14694__$1,inst_14692);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_14700 = [null,null,null,null,null,null,null,null];
(statearr_14700[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_14700[(1)] = (1));

return statearr_14700;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_14694){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14694);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14705){var ex__13968__auto__ = e14705;
var statearr_14714_17353 = state_14694;
(statearr_14714_17353[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14694[(4)]))){
var statearr_14715_17354 = state_14694;
(statearr_14715_17354[(1)] = cljs.core.first((state_14694[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17355 = state_14694;
state_14694 = G__17355;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_14694){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_14694);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_14732 = f__14282__auto__();
(statearr_14732[(6)] = c__14281__auto___17345);

return statearr_14732;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__14741){
var vec__14742 = p__14741;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14742,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14742,(1),null);
var job = vec__14742;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___17356 = n;
var __17357 = (0);
while(true){
if((__17357 < n__5636__auto___17356)){
var G__14745_17358 = type;
var G__14745_17359__$1 = (((G__14745_17358 instanceof cljs.core.Keyword))?G__14745_17358.fqn:null);
switch (G__14745_17359__$1) {
case "compute":
var c__14281__auto___17361 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__17357,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = ((function (__17357,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function (state_14759){
var state_val_14760 = (state_14759[(1)]);
if((state_val_14760 === (1))){
var state_14759__$1 = state_14759;
var statearr_14761_17362 = state_14759__$1;
(statearr_14761_17362[(2)] = null);

(statearr_14761_17362[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14760 === (2))){
var state_14759__$1 = state_14759;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14759__$1,(4),jobs);
} else {
if((state_val_14760 === (3))){
var inst_14757 = (state_14759[(2)]);
var state_14759__$1 = state_14759;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14759__$1,inst_14757);
} else {
if((state_val_14760 === (4))){
var inst_14748 = (state_14759[(2)]);
var inst_14750 = process__$1(inst_14748);
var state_14759__$1 = state_14759;
if(cljs.core.truth_(inst_14750)){
var statearr_14762_17363 = state_14759__$1;
(statearr_14762_17363[(1)] = (5));

} else {
var statearr_14763_17369 = state_14759__$1;
(statearr_14763_17369[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14760 === (5))){
var state_14759__$1 = state_14759;
var statearr_14764_17370 = state_14759__$1;
(statearr_14764_17370[(2)] = null);

(statearr_14764_17370[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14760 === (6))){
var state_14759__$1 = state_14759;
var statearr_14765_17371 = state_14759__$1;
(statearr_14765_17371[(2)] = null);

(statearr_14765_17371[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14760 === (7))){
var inst_14755 = (state_14759[(2)]);
var state_14759__$1 = state_14759;
var statearr_14766_17372 = state_14759__$1;
(statearr_14766_17372[(2)] = inst_14755);

(statearr_14766_17372[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__17357,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
;
return ((function (__17357,switch__13952__auto__,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_14767 = [null,null,null,null,null,null,null];
(statearr_14767[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_14767[(1)] = (1));

return statearr_14767;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_14759){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14759);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14768){var ex__13968__auto__ = e14768;
var statearr_14769_17374 = state_14759;
(statearr_14769_17374[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14759[(4)]))){
var statearr_14770_17375 = state_14759;
(statearr_14770_17375[(1)] = cljs.core.first((state_14759[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17376 = state_14759;
state_14759 = G__17376;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_14759){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_14759);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
;})(__17357,switch__13952__auto__,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
})();
var state__14283__auto__ = (function (){var statearr_14771 = f__14282__auto__();
(statearr_14771[(6)] = c__14281__auto___17361);

return statearr_14771;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
});})(__17357,c__14281__auto___17361,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
);


break;
case "async":
var c__14281__auto___17384 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__17357,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = ((function (__17357,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function (state_14784){
var state_val_14785 = (state_14784[(1)]);
if((state_val_14785 === (1))){
var state_14784__$1 = state_14784;
var statearr_14786_17388 = state_14784__$1;
(statearr_14786_17388[(2)] = null);

(statearr_14786_17388[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14785 === (2))){
var state_14784__$1 = state_14784;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14784__$1,(4),jobs);
} else {
if((state_val_14785 === (3))){
var inst_14782 = (state_14784[(2)]);
var state_14784__$1 = state_14784;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14784__$1,inst_14782);
} else {
if((state_val_14785 === (4))){
var inst_14774 = (state_14784[(2)]);
var inst_14775 = async(inst_14774);
var state_14784__$1 = state_14784;
if(cljs.core.truth_(inst_14775)){
var statearr_14799_17389 = state_14784__$1;
(statearr_14799_17389[(1)] = (5));

} else {
var statearr_14800_17390 = state_14784__$1;
(statearr_14800_17390[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14785 === (5))){
var state_14784__$1 = state_14784;
var statearr_14809_17391 = state_14784__$1;
(statearr_14809_17391[(2)] = null);

(statearr_14809_17391[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14785 === (6))){
var state_14784__$1 = state_14784;
var statearr_14810_17392 = state_14784__$1;
(statearr_14810_17392[(2)] = null);

(statearr_14810_17392[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14785 === (7))){
var inst_14780 = (state_14784[(2)]);
var state_14784__$1 = state_14784;
var statearr_14811_17396 = state_14784__$1;
(statearr_14811_17396[(2)] = inst_14780);

(statearr_14811_17396[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__17357,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
;
return ((function (__17357,switch__13952__auto__,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_14812 = [null,null,null,null,null,null,null];
(statearr_14812[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_14812[(1)] = (1));

return statearr_14812;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_14784){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14784);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14813){var ex__13968__auto__ = e14813;
var statearr_14814_17398 = state_14784;
(statearr_14814_17398[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14784[(4)]))){
var statearr_14815_17399 = state_14784;
(statearr_14815_17399[(1)] = cljs.core.first((state_14784[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17401 = state_14784;
state_14784 = G__17401;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_14784){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_14784);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
;})(__17357,switch__13952__auto__,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
})();
var state__14283__auto__ = (function (){var statearr_14816 = f__14282__auto__();
(statearr_14816[(6)] = c__14281__auto___17384);

return statearr_14816;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
});})(__17357,c__14281__auto___17384,G__14745_17358,G__14745_17359__$1,n__5636__auto___17356,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14745_17359__$1)].join('')));

}

var G__17402 = (__17357 + (1));
__17357 = G__17402;
continue;
} else {
}
break;
}

var c__14281__auto___17403 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_14888){
var state_val_14889 = (state_14888[(1)]);
if((state_val_14889 === (7))){
var inst_14884 = (state_14888[(2)]);
var state_14888__$1 = state_14888;
var statearr_14890_17409 = state_14888__$1;
(statearr_14890_17409[(2)] = inst_14884);

(statearr_14890_17409[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14889 === (1))){
var state_14888__$1 = state_14888;
var statearr_14891_17410 = state_14888__$1;
(statearr_14891_17410[(2)] = null);

(statearr_14891_17410[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14889 === (4))){
var inst_14821 = (state_14888[(7)]);
var inst_14821__$1 = (state_14888[(2)]);
var inst_14822 = (inst_14821__$1 == null);
var state_14888__$1 = (function (){var statearr_14892 = state_14888;
(statearr_14892[(7)] = inst_14821__$1);

return statearr_14892;
})();
if(cljs.core.truth_(inst_14822)){
var statearr_14893_17411 = state_14888__$1;
(statearr_14893_17411[(1)] = (5));

} else {
var statearr_14894_17412 = state_14888__$1;
(statearr_14894_17412[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14889 === (6))){
var inst_14826 = (state_14888[(8)]);
var inst_14821 = (state_14888[(7)]);
var inst_14826__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_14875 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14876 = [inst_14821,inst_14826__$1];
var inst_14877 = (new cljs.core.PersistentVector(null,2,(5),inst_14875,inst_14876,null));
var state_14888__$1 = (function (){var statearr_14895 = state_14888;
(statearr_14895[(8)] = inst_14826__$1);

return statearr_14895;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14888__$1,(8),jobs,inst_14877);
} else {
if((state_val_14889 === (3))){
var inst_14886 = (state_14888[(2)]);
var state_14888__$1 = state_14888;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14888__$1,inst_14886);
} else {
if((state_val_14889 === (2))){
var state_14888__$1 = state_14888;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14888__$1,(4),from);
} else {
if((state_val_14889 === (9))){
var inst_14881 = (state_14888[(2)]);
var state_14888__$1 = (function (){var statearr_14896 = state_14888;
(statearr_14896[(9)] = inst_14881);

return statearr_14896;
})();
var statearr_14897_17421 = state_14888__$1;
(statearr_14897_17421[(2)] = null);

(statearr_14897_17421[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14889 === (5))){
var inst_14824 = cljs.core.async.close_BANG_(jobs);
var state_14888__$1 = state_14888;
var statearr_14898_17422 = state_14888__$1;
(statearr_14898_17422[(2)] = inst_14824);

(statearr_14898_17422[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14889 === (8))){
var inst_14826 = (state_14888[(8)]);
var inst_14879 = (state_14888[(2)]);
var state_14888__$1 = (function (){var statearr_14899 = state_14888;
(statearr_14899[(10)] = inst_14879);

return statearr_14899;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14888__$1,(9),results,inst_14826);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_14900 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_14900[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_14900[(1)] = (1));

return statearr_14900;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_14888){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14888);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14901){var ex__13968__auto__ = e14901;
var statearr_14902_17426 = state_14888;
(statearr_14902_17426[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14888[(4)]))){
var statearr_14903_17427 = state_14888;
(statearr_14903_17427[(1)] = cljs.core.first((state_14888[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17445 = state_14888;
state_14888 = G__17445;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_14888){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_14888);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_14904 = f__14282__auto__();
(statearr_14904[(6)] = c__14281__auto___17403);

return statearr_14904;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_14946){
var state_val_14949 = (state_14946[(1)]);
if((state_val_14949 === (7))){
var inst_14940 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14956_17466 = state_14946__$1;
(statearr_14956_17466[(2)] = inst_14940);

(statearr_14956_17466[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (20))){
var state_14946__$1 = state_14946;
var statearr_14957_17470 = state_14946__$1;
(statearr_14957_17470[(2)] = null);

(statearr_14957_17470[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (1))){
var state_14946__$1 = state_14946;
var statearr_14958_17471 = state_14946__$1;
(statearr_14958_17471[(2)] = null);

(statearr_14958_17471[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (4))){
var inst_14907 = (state_14946[(7)]);
var inst_14907__$1 = (state_14946[(2)]);
var inst_14908 = (inst_14907__$1 == null);
var state_14946__$1 = (function (){var statearr_14959 = state_14946;
(statearr_14959[(7)] = inst_14907__$1);

return statearr_14959;
})();
if(cljs.core.truth_(inst_14908)){
var statearr_14960_17473 = state_14946__$1;
(statearr_14960_17473[(1)] = (5));

} else {
var statearr_14961_17474 = state_14946__$1;
(statearr_14961_17474[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (15))){
var inst_14920 = (state_14946[(8)]);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14946__$1,(18),to,inst_14920);
} else {
if((state_val_14949 === (21))){
var inst_14933 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14968_17478 = state_14946__$1;
(statearr_14968_17478[(2)] = inst_14933);

(statearr_14968_17478[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (13))){
var inst_14935 = (state_14946[(2)]);
var state_14946__$1 = (function (){var statearr_14969 = state_14946;
(statearr_14969[(9)] = inst_14935);

return statearr_14969;
})();
var statearr_14970_17480 = state_14946__$1;
(statearr_14970_17480[(2)] = null);

(statearr_14970_17480[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (6))){
var inst_14907 = (state_14946[(7)]);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14946__$1,(11),inst_14907);
} else {
if((state_val_14949 === (17))){
var inst_14928 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
if(cljs.core.truth_(inst_14928)){
var statearr_14975_17481 = state_14946__$1;
(statearr_14975_17481[(1)] = (19));

} else {
var statearr_14976_17483 = state_14946__$1;
(statearr_14976_17483[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (3))){
var inst_14942 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14946__$1,inst_14942);
} else {
if((state_val_14949 === (12))){
var inst_14917 = (state_14946[(10)]);
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14946__$1,(14),inst_14917);
} else {
if((state_val_14949 === (2))){
var state_14946__$1 = state_14946;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14946__$1,(4),results);
} else {
if((state_val_14949 === (19))){
var state_14946__$1 = state_14946;
var statearr_14978_17484 = state_14946__$1;
(statearr_14978_17484[(2)] = null);

(statearr_14978_17484[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (11))){
var inst_14917 = (state_14946[(2)]);
var state_14946__$1 = (function (){var statearr_14979 = state_14946;
(statearr_14979[(10)] = inst_14917);

return statearr_14979;
})();
var statearr_14980_17486 = state_14946__$1;
(statearr_14980_17486[(2)] = null);

(statearr_14980_17486[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (9))){
var state_14946__$1 = state_14946;
var statearr_14981_17487 = state_14946__$1;
(statearr_14981_17487[(2)] = null);

(statearr_14981_17487[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (5))){
var state_14946__$1 = state_14946;
if(cljs.core.truth_(close_QMARK_)){
var statearr_14982_17488 = state_14946__$1;
(statearr_14982_17488[(1)] = (8));

} else {
var statearr_14983_17489 = state_14946__$1;
(statearr_14983_17489[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (14))){
var inst_14920 = (state_14946[(8)]);
var inst_14922 = (state_14946[(11)]);
var inst_14920__$1 = (state_14946[(2)]);
var inst_14921 = (inst_14920__$1 == null);
var inst_14922__$1 = cljs.core.not(inst_14921);
var state_14946__$1 = (function (){var statearr_14984 = state_14946;
(statearr_14984[(8)] = inst_14920__$1);

(statearr_14984[(11)] = inst_14922__$1);

return statearr_14984;
})();
if(inst_14922__$1){
var statearr_14985_17494 = state_14946__$1;
(statearr_14985_17494[(1)] = (15));

} else {
var statearr_14986_17495 = state_14946__$1;
(statearr_14986_17495[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (16))){
var inst_14922 = (state_14946[(11)]);
var state_14946__$1 = state_14946;
var statearr_14987_17496 = state_14946__$1;
(statearr_14987_17496[(2)] = inst_14922);

(statearr_14987_17496[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (10))){
var inst_14914 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14988_17497 = state_14946__$1;
(statearr_14988_17497[(2)] = inst_14914);

(statearr_14988_17497[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (18))){
var inst_14925 = (state_14946[(2)]);
var state_14946__$1 = state_14946;
var statearr_14989_17498 = state_14946__$1;
(statearr_14989_17498[(2)] = inst_14925);

(statearr_14989_17498[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14949 === (8))){
var inst_14911 = cljs.core.async.close_BANG_(to);
var state_14946__$1 = state_14946;
var statearr_14990_17499 = state_14946__$1;
(statearr_14990_17499[(2)] = inst_14911);

(statearr_14990_17499[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_14991 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14991[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__);

(statearr_14991[(1)] = (1));

return statearr_14991;
});
var cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1 = (function (state_14946){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_14946);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e14992){var ex__13968__auto__ = e14992;
var statearr_14993_17500 = state_14946;
(statearr_14993_17500[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_14946[(4)]))){
var statearr_14994_17501 = state_14946;
(statearr_14994_17501[(1)] = cljs.core.first((state_14946[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17509 = state_14946;
state_14946 = G__17509;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__ = function(state_14946){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1.call(this,state_14946);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_14995 = f__14282__auto__();
(statearr_14995[(6)] = c__14281__auto__);

return statearr_14995;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__14997 = arguments.length;
switch (G__14997) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__15001 = arguments.length;
switch (G__15001) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__15003 = arguments.length;
switch (G__15003) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__14281__auto___17543 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15031){
var state_val_15032 = (state_15031[(1)]);
if((state_val_15032 === (7))){
var inst_15027 = (state_15031[(2)]);
var state_15031__$1 = state_15031;
var statearr_15033_17547 = state_15031__$1;
(statearr_15033_17547[(2)] = inst_15027);

(statearr_15033_17547[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (1))){
var state_15031__$1 = state_15031;
var statearr_15034_17548 = state_15031__$1;
(statearr_15034_17548[(2)] = null);

(statearr_15034_17548[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (4))){
var inst_15008 = (state_15031[(7)]);
var inst_15008__$1 = (state_15031[(2)]);
var inst_15009 = (inst_15008__$1 == null);
var state_15031__$1 = (function (){var statearr_15035 = state_15031;
(statearr_15035[(7)] = inst_15008__$1);

return statearr_15035;
})();
if(cljs.core.truth_(inst_15009)){
var statearr_15036_17549 = state_15031__$1;
(statearr_15036_17549[(1)] = (5));

} else {
var statearr_15037_17550 = state_15031__$1;
(statearr_15037_17550[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (13))){
var state_15031__$1 = state_15031;
var statearr_15038_17551 = state_15031__$1;
(statearr_15038_17551[(2)] = null);

(statearr_15038_17551[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (6))){
var inst_15008 = (state_15031[(7)]);
var inst_15014 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_15008) : p.call(null,inst_15008));
var state_15031__$1 = state_15031;
if(cljs.core.truth_(inst_15014)){
var statearr_15039_17552 = state_15031__$1;
(statearr_15039_17552[(1)] = (9));

} else {
var statearr_15040_17553 = state_15031__$1;
(statearr_15040_17553[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (3))){
var inst_15029 = (state_15031[(2)]);
var state_15031__$1 = state_15031;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15031__$1,inst_15029);
} else {
if((state_val_15032 === (12))){
var state_15031__$1 = state_15031;
var statearr_15047_17554 = state_15031__$1;
(statearr_15047_17554[(2)] = null);

(statearr_15047_17554[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (2))){
var state_15031__$1 = state_15031;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15031__$1,(4),ch);
} else {
if((state_val_15032 === (11))){
var inst_15008 = (state_15031[(7)]);
var inst_15018 = (state_15031[(2)]);
var state_15031__$1 = state_15031;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15031__$1,(8),inst_15018,inst_15008);
} else {
if((state_val_15032 === (9))){
var state_15031__$1 = state_15031;
var statearr_15051_17555 = state_15031__$1;
(statearr_15051_17555[(2)] = tc);

(statearr_15051_17555[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (5))){
var inst_15011 = cljs.core.async.close_BANG_(tc);
var inst_15012 = cljs.core.async.close_BANG_(fc);
var state_15031__$1 = (function (){var statearr_15056 = state_15031;
(statearr_15056[(8)] = inst_15011);

return statearr_15056;
})();
var statearr_15059_17556 = state_15031__$1;
(statearr_15059_17556[(2)] = inst_15012);

(statearr_15059_17556[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (14))){
var inst_15025 = (state_15031[(2)]);
var state_15031__$1 = state_15031;
var statearr_15061_17558 = state_15031__$1;
(statearr_15061_17558[(2)] = inst_15025);

(statearr_15061_17558[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (10))){
var state_15031__$1 = state_15031;
var statearr_15066_17562 = state_15031__$1;
(statearr_15066_17562[(2)] = fc);

(statearr_15066_17562[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15032 === (8))){
var inst_15020 = (state_15031[(2)]);
var state_15031__$1 = state_15031;
if(cljs.core.truth_(inst_15020)){
var statearr_15078_17563 = state_15031__$1;
(statearr_15078_17563[(1)] = (12));

} else {
var statearr_15079_17564 = state_15031__$1;
(statearr_15079_17564[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_15080 = [null,null,null,null,null,null,null,null,null];
(statearr_15080[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_15080[(1)] = (1));

return statearr_15080;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_15031){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15031);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15081){var ex__13968__auto__ = e15081;
var statearr_15082_17565 = state_15031;
(statearr_15082_17565[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15031[(4)]))){
var statearr_15083_17566 = state_15031;
(statearr_15083_17566[(1)] = cljs.core.first((state_15031[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17567 = state_15031;
state_15031 = G__17567;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_15031){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_15031);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15084 = f__14282__auto__();
(statearr_15084[(6)] = c__14281__auto___17543);

return statearr_15084;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15106){
var state_val_15107 = (state_15106[(1)]);
if((state_val_15107 === (7))){
var inst_15102 = (state_15106[(2)]);
var state_15106__$1 = state_15106;
var statearr_15109_17573 = state_15106__$1;
(statearr_15109_17573[(2)] = inst_15102);

(statearr_15109_17573[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (1))){
var inst_15085 = init;
var inst_15086 = inst_15085;
var state_15106__$1 = (function (){var statearr_15110 = state_15106;
(statearr_15110[(7)] = inst_15086);

return statearr_15110;
})();
var statearr_15111_17574 = state_15106__$1;
(statearr_15111_17574[(2)] = null);

(statearr_15111_17574[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (4))){
var inst_15089 = (state_15106[(8)]);
var inst_15089__$1 = (state_15106[(2)]);
var inst_15090 = (inst_15089__$1 == null);
var state_15106__$1 = (function (){var statearr_15112 = state_15106;
(statearr_15112[(8)] = inst_15089__$1);

return statearr_15112;
})();
if(cljs.core.truth_(inst_15090)){
var statearr_15113_17575 = state_15106__$1;
(statearr_15113_17575[(1)] = (5));

} else {
var statearr_15114_17576 = state_15106__$1;
(statearr_15114_17576[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (6))){
var inst_15086 = (state_15106[(7)]);
var inst_15093 = (state_15106[(9)]);
var inst_15089 = (state_15106[(8)]);
var inst_15093__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_15086,inst_15089) : f.call(null,inst_15086,inst_15089));
var inst_15094 = cljs.core.reduced_QMARK_(inst_15093__$1);
var state_15106__$1 = (function (){var statearr_15115 = state_15106;
(statearr_15115[(9)] = inst_15093__$1);

return statearr_15115;
})();
if(inst_15094){
var statearr_15116_17579 = state_15106__$1;
(statearr_15116_17579[(1)] = (8));

} else {
var statearr_15118_17580 = state_15106__$1;
(statearr_15118_17580[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (3))){
var inst_15104 = (state_15106[(2)]);
var state_15106__$1 = state_15106;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15106__$1,inst_15104);
} else {
if((state_val_15107 === (2))){
var state_15106__$1 = state_15106;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15106__$1,(4),ch);
} else {
if((state_val_15107 === (9))){
var inst_15093 = (state_15106[(9)]);
var inst_15086 = inst_15093;
var state_15106__$1 = (function (){var statearr_15122 = state_15106;
(statearr_15122[(7)] = inst_15086);

return statearr_15122;
})();
var statearr_15123_17584 = state_15106__$1;
(statearr_15123_17584[(2)] = null);

(statearr_15123_17584[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (5))){
var inst_15086 = (state_15106[(7)]);
var state_15106__$1 = state_15106;
var statearr_15125_17587 = state_15106__$1;
(statearr_15125_17587[(2)] = inst_15086);

(statearr_15125_17587[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (10))){
var inst_15100 = (state_15106[(2)]);
var state_15106__$1 = state_15106;
var statearr_15126_17591 = state_15106__$1;
(statearr_15126_17591[(2)] = inst_15100);

(statearr_15126_17591[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15107 === (8))){
var inst_15093 = (state_15106[(9)]);
var inst_15096 = cljs.core.deref(inst_15093);
var state_15106__$1 = state_15106;
var statearr_15128_17594 = state_15106__$1;
(statearr_15128_17594[(2)] = inst_15096);

(statearr_15128_17594[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__13953__auto__ = null;
var cljs$core$async$reduce_$_state_machine__13953__auto____0 = (function (){
var statearr_15129 = [null,null,null,null,null,null,null,null,null,null];
(statearr_15129[(0)] = cljs$core$async$reduce_$_state_machine__13953__auto__);

(statearr_15129[(1)] = (1));

return statearr_15129;
});
var cljs$core$async$reduce_$_state_machine__13953__auto____1 = (function (state_15106){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15106);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15130){var ex__13968__auto__ = e15130;
var statearr_15131_17597 = state_15106;
(statearr_15131_17597[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15106[(4)]))){
var statearr_15133_17609 = state_15106;
(statearr_15133_17609[(1)] = cljs.core.first((state_15106[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17610 = state_15106;
state_15106 = G__17610;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__13953__auto__ = function(state_15106){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__13953__auto____1.call(this,state_15106);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__13953__auto____0;
cljs$core$async$reduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__13953__auto____1;
return cljs$core$async$reduce_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15136 = f__14282__auto__();
(statearr_15136[(6)] = c__14281__auto__);

return statearr_15136;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15156){
var state_val_15157 = (state_15156[(1)]);
if((state_val_15157 === (1))){
var inst_15151 = cljs.core.async.reduce(f__$1,init,ch);
var state_15156__$1 = state_15156;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15156__$1,(2),inst_15151);
} else {
if((state_val_15157 === (2))){
var inst_15153 = (state_15156[(2)]);
var inst_15154 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_15153) : f__$1.call(null,inst_15153));
var state_15156__$1 = state_15156;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15156__$1,inst_15154);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__13953__auto__ = null;
var cljs$core$async$transduce_$_state_machine__13953__auto____0 = (function (){
var statearr_15162 = [null,null,null,null,null,null,null];
(statearr_15162[(0)] = cljs$core$async$transduce_$_state_machine__13953__auto__);

(statearr_15162[(1)] = (1));

return statearr_15162;
});
var cljs$core$async$transduce_$_state_machine__13953__auto____1 = (function (state_15156){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15156);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15163){var ex__13968__auto__ = e15163;
var statearr_15164_17614 = state_15156;
(statearr_15164_17614[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15156[(4)]))){
var statearr_15165_17615 = state_15156;
(statearr_15165_17615[(1)] = cljs.core.first((state_15156[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17616 = state_15156;
state_15156 = G__17616;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__13953__auto__ = function(state_15156){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__13953__auto____1.call(this,state_15156);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__13953__auto____0;
cljs$core$async$transduce_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__13953__auto____1;
return cljs$core$async$transduce_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15168 = f__14282__auto__();
(statearr_15168[(6)] = c__14281__auto__);

return statearr_15168;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__15175 = arguments.length;
switch (G__15175) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15207){
var state_val_15208 = (state_15207[(1)]);
if((state_val_15208 === (7))){
var inst_15185 = (state_15207[(2)]);
var state_15207__$1 = state_15207;
var statearr_15210_17626 = state_15207__$1;
(statearr_15210_17626[(2)] = inst_15185);

(statearr_15210_17626[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (1))){
var inst_15179 = cljs.core.seq(coll);
var inst_15180 = inst_15179;
var state_15207__$1 = (function (){var statearr_15215 = state_15207;
(statearr_15215[(7)] = inst_15180);

return statearr_15215;
})();
var statearr_15216_17627 = state_15207__$1;
(statearr_15216_17627[(2)] = null);

(statearr_15216_17627[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (4))){
var inst_15180 = (state_15207[(7)]);
var inst_15183 = cljs.core.first(inst_15180);
var state_15207__$1 = state_15207;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15207__$1,(7),ch,inst_15183);
} else {
if((state_val_15208 === (13))){
var inst_15201 = (state_15207[(2)]);
var state_15207__$1 = state_15207;
var statearr_15219_17628 = state_15207__$1;
(statearr_15219_17628[(2)] = inst_15201);

(statearr_15219_17628[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (6))){
var inst_15189 = (state_15207[(2)]);
var state_15207__$1 = state_15207;
if(cljs.core.truth_(inst_15189)){
var statearr_15221_17629 = state_15207__$1;
(statearr_15221_17629[(1)] = (8));

} else {
var statearr_15222_17631 = state_15207__$1;
(statearr_15222_17631[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (3))){
var inst_15205 = (state_15207[(2)]);
var state_15207__$1 = state_15207;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15207__$1,inst_15205);
} else {
if((state_val_15208 === (12))){
var state_15207__$1 = state_15207;
var statearr_15228_17632 = state_15207__$1;
(statearr_15228_17632[(2)] = null);

(statearr_15228_17632[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (2))){
var inst_15180 = (state_15207[(7)]);
var state_15207__$1 = state_15207;
if(cljs.core.truth_(inst_15180)){
var statearr_15238_17634 = state_15207__$1;
(statearr_15238_17634[(1)] = (4));

} else {
var statearr_15239_17635 = state_15207__$1;
(statearr_15239_17635[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (11))){
var inst_15198 = cljs.core.async.close_BANG_(ch);
var state_15207__$1 = state_15207;
var statearr_15252_17639 = state_15207__$1;
(statearr_15252_17639[(2)] = inst_15198);

(statearr_15252_17639[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (9))){
var state_15207__$1 = state_15207;
if(cljs.core.truth_(close_QMARK_)){
var statearr_15254_17640 = state_15207__$1;
(statearr_15254_17640[(1)] = (11));

} else {
var statearr_15255_17641 = state_15207__$1;
(statearr_15255_17641[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (5))){
var inst_15180 = (state_15207[(7)]);
var state_15207__$1 = state_15207;
var statearr_15257_17642 = state_15207__$1;
(statearr_15257_17642[(2)] = inst_15180);

(statearr_15257_17642[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (10))){
var inst_15203 = (state_15207[(2)]);
var state_15207__$1 = state_15207;
var statearr_15258_17643 = state_15207__$1;
(statearr_15258_17643[(2)] = inst_15203);

(statearr_15258_17643[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15208 === (8))){
var inst_15180 = (state_15207[(7)]);
var inst_15192 = cljs.core.next(inst_15180);
var inst_15180__$1 = inst_15192;
var state_15207__$1 = (function (){var statearr_15259 = state_15207;
(statearr_15259[(7)] = inst_15180__$1);

return statearr_15259;
})();
var statearr_15260_17644 = state_15207__$1;
(statearr_15260_17644[(2)] = null);

(statearr_15260_17644[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_15269 = [null,null,null,null,null,null,null,null];
(statearr_15269[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_15269[(1)] = (1));

return statearr_15269;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_15207){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15207);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15271){var ex__13968__auto__ = e15271;
var statearr_15272_17648 = state_15207;
(statearr_15272_17648[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15207[(4)]))){
var statearr_15273_17649 = state_15207;
(statearr_15273_17649[(1)] = cljs.core.first((state_15207[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17650 = state_15207;
state_15207 = G__17650;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_15207){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_15207);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15276 = f__14282__auto__();
(statearr_15276[(6)] = c__14281__auto__);

return statearr_15276;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__15279 = arguments.length;
switch (G__15279) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_17652 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_17652(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_17653 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_17653(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_17654 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_17654(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_17655 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_17655(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15281 = (function (ch,cs,meta15282){
this.ch = ch;
this.cs = cs;
this.meta15282 = meta15282;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15283,meta15282__$1){
var self__ = this;
var _15283__$1 = this;
return (new cljs.core.async.t_cljs$core$async15281(self__.ch,self__.cs,meta15282__$1));
}));

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15283){
var self__ = this;
var _15283__$1 = this;
return self__.meta15282;
}));

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async15281.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async15281.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta15282","meta15282",364138117,null)], null);
}));

(cljs.core.async.t_cljs$core$async15281.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15281.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15281");

(cljs.core.async.t_cljs$core$async15281.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15281");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15281.
 */
cljs.core.async.__GT_t_cljs$core$async15281 = (function cljs$core$async$__GT_t_cljs$core$async15281(ch,cs,meta15282){
return (new cljs.core.async.t_cljs$core$async15281(ch,cs,meta15282));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async15281(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__14281__auto___17663 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15423){
var state_val_15424 = (state_15423[(1)]);
if((state_val_15424 === (7))){
var inst_15417 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15427_17664 = state_15423__$1;
(statearr_15427_17664[(2)] = inst_15417);

(statearr_15427_17664[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (20))){
var inst_15317 = (state_15423[(7)]);
var inst_15329 = cljs.core.first(inst_15317);
var inst_15330 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15329,(0),null);
var inst_15331 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15329,(1),null);
var state_15423__$1 = (function (){var statearr_15430 = state_15423;
(statearr_15430[(8)] = inst_15330);

return statearr_15430;
})();
if(cljs.core.truth_(inst_15331)){
var statearr_15431_17669 = state_15423__$1;
(statearr_15431_17669[(1)] = (22));

} else {
var statearr_15432_17671 = state_15423__$1;
(statearr_15432_17671[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (27))){
var inst_15361 = (state_15423[(9)]);
var inst_15363 = (state_15423[(10)]);
var inst_15286 = (state_15423[(11)]);
var inst_15370 = (state_15423[(12)]);
var inst_15370__$1 = cljs.core._nth(inst_15361,inst_15363);
var inst_15371 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_15370__$1,inst_15286,done);
var state_15423__$1 = (function (){var statearr_15434 = state_15423;
(statearr_15434[(12)] = inst_15370__$1);

return statearr_15434;
})();
if(cljs.core.truth_(inst_15371)){
var statearr_15435_17672 = state_15423__$1;
(statearr_15435_17672[(1)] = (30));

} else {
var statearr_15436_17673 = state_15423__$1;
(statearr_15436_17673[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (1))){
var state_15423__$1 = state_15423;
var statearr_15437_17674 = state_15423__$1;
(statearr_15437_17674[(2)] = null);

(statearr_15437_17674[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (24))){
var inst_15317 = (state_15423[(7)]);
var inst_15336 = (state_15423[(2)]);
var inst_15337 = cljs.core.next(inst_15317);
var inst_15295 = inst_15337;
var inst_15296 = null;
var inst_15297 = (0);
var inst_15298 = (0);
var state_15423__$1 = (function (){var statearr_15438 = state_15423;
(statearr_15438[(13)] = inst_15336);

(statearr_15438[(14)] = inst_15297);

(statearr_15438[(15)] = inst_15298);

(statearr_15438[(16)] = inst_15295);

(statearr_15438[(17)] = inst_15296);

return statearr_15438;
})();
var statearr_15439_17675 = state_15423__$1;
(statearr_15439_17675[(2)] = null);

(statearr_15439_17675[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (39))){
var state_15423__$1 = state_15423;
var statearr_15443_17676 = state_15423__$1;
(statearr_15443_17676[(2)] = null);

(statearr_15443_17676[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (4))){
var inst_15286 = (state_15423[(11)]);
var inst_15286__$1 = (state_15423[(2)]);
var inst_15287 = (inst_15286__$1 == null);
var state_15423__$1 = (function (){var statearr_15444 = state_15423;
(statearr_15444[(11)] = inst_15286__$1);

return statearr_15444;
})();
if(cljs.core.truth_(inst_15287)){
var statearr_15445_17678 = state_15423__$1;
(statearr_15445_17678[(1)] = (5));

} else {
var statearr_15446_17679 = state_15423__$1;
(statearr_15446_17679[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (15))){
var inst_15297 = (state_15423[(14)]);
var inst_15298 = (state_15423[(15)]);
var inst_15295 = (state_15423[(16)]);
var inst_15296 = (state_15423[(17)]);
var inst_15313 = (state_15423[(2)]);
var inst_15314 = (inst_15298 + (1));
var tmp15440 = inst_15297;
var tmp15441 = inst_15295;
var tmp15442 = inst_15296;
var inst_15295__$1 = tmp15441;
var inst_15296__$1 = tmp15442;
var inst_15297__$1 = tmp15440;
var inst_15298__$1 = inst_15314;
var state_15423__$1 = (function (){var statearr_15448 = state_15423;
(statearr_15448[(14)] = inst_15297__$1);

(statearr_15448[(15)] = inst_15298__$1);

(statearr_15448[(18)] = inst_15313);

(statearr_15448[(16)] = inst_15295__$1);

(statearr_15448[(17)] = inst_15296__$1);

return statearr_15448;
})();
var statearr_15449_17681 = state_15423__$1;
(statearr_15449_17681[(2)] = null);

(statearr_15449_17681[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (21))){
var inst_15340 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15453_17685 = state_15423__$1;
(statearr_15453_17685[(2)] = inst_15340);

(statearr_15453_17685[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (31))){
var inst_15370 = (state_15423[(12)]);
var inst_15374 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_15370);
var state_15423__$1 = state_15423;
var statearr_15454_17686 = state_15423__$1;
(statearr_15454_17686[(2)] = inst_15374);

(statearr_15454_17686[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (32))){
var inst_15361 = (state_15423[(9)]);
var inst_15363 = (state_15423[(10)]);
var inst_15362 = (state_15423[(19)]);
var inst_15360 = (state_15423[(20)]);
var inst_15376 = (state_15423[(2)]);
var inst_15377 = (inst_15363 + (1));
var tmp15450 = inst_15361;
var tmp15451 = inst_15362;
var tmp15452 = inst_15360;
var inst_15360__$1 = tmp15452;
var inst_15361__$1 = tmp15450;
var inst_15362__$1 = tmp15451;
var inst_15363__$1 = inst_15377;
var state_15423__$1 = (function (){var statearr_15455 = state_15423;
(statearr_15455[(9)] = inst_15361__$1);

(statearr_15455[(10)] = inst_15363__$1);

(statearr_15455[(19)] = inst_15362__$1);

(statearr_15455[(20)] = inst_15360__$1);

(statearr_15455[(21)] = inst_15376);

return statearr_15455;
})();
var statearr_15457_17690 = state_15423__$1;
(statearr_15457_17690[(2)] = null);

(statearr_15457_17690[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (40))){
var inst_15390 = (state_15423[(22)]);
var inst_15394 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_15390);
var state_15423__$1 = state_15423;
var statearr_15458_17691 = state_15423__$1;
(statearr_15458_17691[(2)] = inst_15394);

(statearr_15458_17691[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (33))){
var inst_15380 = (state_15423[(23)]);
var inst_15382 = cljs.core.chunked_seq_QMARK_(inst_15380);
var state_15423__$1 = state_15423;
if(inst_15382){
var statearr_15460_17692 = state_15423__$1;
(statearr_15460_17692[(1)] = (36));

} else {
var statearr_15461_17693 = state_15423__$1;
(statearr_15461_17693[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (13))){
var inst_15307 = (state_15423[(24)]);
var inst_15310 = cljs.core.async.close_BANG_(inst_15307);
var state_15423__$1 = state_15423;
var statearr_15462_17694 = state_15423__$1;
(statearr_15462_17694[(2)] = inst_15310);

(statearr_15462_17694[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (22))){
var inst_15330 = (state_15423[(8)]);
var inst_15333 = cljs.core.async.close_BANG_(inst_15330);
var state_15423__$1 = state_15423;
var statearr_15465_17695 = state_15423__$1;
(statearr_15465_17695[(2)] = inst_15333);

(statearr_15465_17695[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (36))){
var inst_15380 = (state_15423[(23)]);
var inst_15385 = cljs.core.chunk_first(inst_15380);
var inst_15386 = cljs.core.chunk_rest(inst_15380);
var inst_15387 = cljs.core.count(inst_15385);
var inst_15360 = inst_15386;
var inst_15361 = inst_15385;
var inst_15362 = inst_15387;
var inst_15363 = (0);
var state_15423__$1 = (function (){var statearr_15468 = state_15423;
(statearr_15468[(9)] = inst_15361);

(statearr_15468[(10)] = inst_15363);

(statearr_15468[(19)] = inst_15362);

(statearr_15468[(20)] = inst_15360);

return statearr_15468;
})();
var statearr_15470_17696 = state_15423__$1;
(statearr_15470_17696[(2)] = null);

(statearr_15470_17696[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (41))){
var inst_15380 = (state_15423[(23)]);
var inst_15396 = (state_15423[(2)]);
var inst_15397 = cljs.core.next(inst_15380);
var inst_15360 = inst_15397;
var inst_15361 = null;
var inst_15362 = (0);
var inst_15363 = (0);
var state_15423__$1 = (function (){var statearr_15472 = state_15423;
(statearr_15472[(9)] = inst_15361);

(statearr_15472[(25)] = inst_15396);

(statearr_15472[(10)] = inst_15363);

(statearr_15472[(19)] = inst_15362);

(statearr_15472[(20)] = inst_15360);

return statearr_15472;
})();
var statearr_15473_17697 = state_15423__$1;
(statearr_15473_17697[(2)] = null);

(statearr_15473_17697[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (43))){
var state_15423__$1 = state_15423;
var statearr_15474_17698 = state_15423__$1;
(statearr_15474_17698[(2)] = null);

(statearr_15474_17698[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (29))){
var inst_15405 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15477_17699 = state_15423__$1;
(statearr_15477_17699[(2)] = inst_15405);

(statearr_15477_17699[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (44))){
var inst_15414 = (state_15423[(2)]);
var state_15423__$1 = (function (){var statearr_15478 = state_15423;
(statearr_15478[(26)] = inst_15414);

return statearr_15478;
})();
var statearr_15479_17700 = state_15423__$1;
(statearr_15479_17700[(2)] = null);

(statearr_15479_17700[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (6))){
var inst_15351 = (state_15423[(27)]);
var inst_15349 = cljs.core.deref(cs);
var inst_15351__$1 = cljs.core.keys(inst_15349);
var inst_15352 = cljs.core.count(inst_15351__$1);
var inst_15353 = cljs.core.reset_BANG_(dctr,inst_15352);
var inst_15359 = cljs.core.seq(inst_15351__$1);
var inst_15360 = inst_15359;
var inst_15361 = null;
var inst_15362 = (0);
var inst_15363 = (0);
var state_15423__$1 = (function (){var statearr_15482 = state_15423;
(statearr_15482[(9)] = inst_15361);

(statearr_15482[(28)] = inst_15353);

(statearr_15482[(10)] = inst_15363);

(statearr_15482[(19)] = inst_15362);

(statearr_15482[(20)] = inst_15360);

(statearr_15482[(27)] = inst_15351__$1);

return statearr_15482;
})();
var statearr_15483_17701 = state_15423__$1;
(statearr_15483_17701[(2)] = null);

(statearr_15483_17701[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (28))){
var inst_15380 = (state_15423[(23)]);
var inst_15360 = (state_15423[(20)]);
var inst_15380__$1 = cljs.core.seq(inst_15360);
var state_15423__$1 = (function (){var statearr_15484 = state_15423;
(statearr_15484[(23)] = inst_15380__$1);

return statearr_15484;
})();
if(inst_15380__$1){
var statearr_15485_17703 = state_15423__$1;
(statearr_15485_17703[(1)] = (33));

} else {
var statearr_15486_17707 = state_15423__$1;
(statearr_15486_17707[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (25))){
var inst_15363 = (state_15423[(10)]);
var inst_15362 = (state_15423[(19)]);
var inst_15365 = (inst_15363 < inst_15362);
var inst_15366 = inst_15365;
var state_15423__$1 = state_15423;
if(cljs.core.truth_(inst_15366)){
var statearr_15487_17708 = state_15423__$1;
(statearr_15487_17708[(1)] = (27));

} else {
var statearr_15488_17709 = state_15423__$1;
(statearr_15488_17709[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (34))){
var state_15423__$1 = state_15423;
var statearr_15489_17710 = state_15423__$1;
(statearr_15489_17710[(2)] = null);

(statearr_15489_17710[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (17))){
var state_15423__$1 = state_15423;
var statearr_15490_17711 = state_15423__$1;
(statearr_15490_17711[(2)] = null);

(statearr_15490_17711[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (3))){
var inst_15419 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15423__$1,inst_15419);
} else {
if((state_val_15424 === (12))){
var inst_15345 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15495_17712 = state_15423__$1;
(statearr_15495_17712[(2)] = inst_15345);

(statearr_15495_17712[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (2))){
var state_15423__$1 = state_15423;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15423__$1,(4),ch);
} else {
if((state_val_15424 === (23))){
var state_15423__$1 = state_15423;
var statearr_15497_17714 = state_15423__$1;
(statearr_15497_17714[(2)] = null);

(statearr_15497_17714[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (35))){
var inst_15403 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15498_17716 = state_15423__$1;
(statearr_15498_17716[(2)] = inst_15403);

(statearr_15498_17716[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (19))){
var inst_15317 = (state_15423[(7)]);
var inst_15321 = cljs.core.chunk_first(inst_15317);
var inst_15322 = cljs.core.chunk_rest(inst_15317);
var inst_15323 = cljs.core.count(inst_15321);
var inst_15295 = inst_15322;
var inst_15296 = inst_15321;
var inst_15297 = inst_15323;
var inst_15298 = (0);
var state_15423__$1 = (function (){var statearr_15499 = state_15423;
(statearr_15499[(14)] = inst_15297);

(statearr_15499[(15)] = inst_15298);

(statearr_15499[(16)] = inst_15295);

(statearr_15499[(17)] = inst_15296);

return statearr_15499;
})();
var statearr_15500_17720 = state_15423__$1;
(statearr_15500_17720[(2)] = null);

(statearr_15500_17720[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (11))){
var inst_15317 = (state_15423[(7)]);
var inst_15295 = (state_15423[(16)]);
var inst_15317__$1 = cljs.core.seq(inst_15295);
var state_15423__$1 = (function (){var statearr_15501 = state_15423;
(statearr_15501[(7)] = inst_15317__$1);

return statearr_15501;
})();
if(inst_15317__$1){
var statearr_15502_17721 = state_15423__$1;
(statearr_15502_17721[(1)] = (16));

} else {
var statearr_15503_17723 = state_15423__$1;
(statearr_15503_17723[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (9))){
var inst_15347 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15504_17725 = state_15423__$1;
(statearr_15504_17725[(2)] = inst_15347);

(statearr_15504_17725[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (5))){
var inst_15293 = cljs.core.deref(cs);
var inst_15294 = cljs.core.seq(inst_15293);
var inst_15295 = inst_15294;
var inst_15296 = null;
var inst_15297 = (0);
var inst_15298 = (0);
var state_15423__$1 = (function (){var statearr_15505 = state_15423;
(statearr_15505[(14)] = inst_15297);

(statearr_15505[(15)] = inst_15298);

(statearr_15505[(16)] = inst_15295);

(statearr_15505[(17)] = inst_15296);

return statearr_15505;
})();
var statearr_15507_17726 = state_15423__$1;
(statearr_15507_17726[(2)] = null);

(statearr_15507_17726[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (14))){
var state_15423__$1 = state_15423;
var statearr_15508_17727 = state_15423__$1;
(statearr_15508_17727[(2)] = null);

(statearr_15508_17727[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (45))){
var inst_15411 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15509_17728 = state_15423__$1;
(statearr_15509_17728[(2)] = inst_15411);

(statearr_15509_17728[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (26))){
var inst_15351 = (state_15423[(27)]);
var inst_15407 = (state_15423[(2)]);
var inst_15408 = cljs.core.seq(inst_15351);
var state_15423__$1 = (function (){var statearr_15510 = state_15423;
(statearr_15510[(29)] = inst_15407);

return statearr_15510;
})();
if(inst_15408){
var statearr_15511_17729 = state_15423__$1;
(statearr_15511_17729[(1)] = (42));

} else {
var statearr_15512_17730 = state_15423__$1;
(statearr_15512_17730[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (16))){
var inst_15317 = (state_15423[(7)]);
var inst_15319 = cljs.core.chunked_seq_QMARK_(inst_15317);
var state_15423__$1 = state_15423;
if(inst_15319){
var statearr_15513_17732 = state_15423__$1;
(statearr_15513_17732[(1)] = (19));

} else {
var statearr_15514_17734 = state_15423__$1;
(statearr_15514_17734[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (38))){
var inst_15400 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15516_17735 = state_15423__$1;
(statearr_15516_17735[(2)] = inst_15400);

(statearr_15516_17735[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (30))){
var state_15423__$1 = state_15423;
var statearr_15519_17736 = state_15423__$1;
(statearr_15519_17736[(2)] = null);

(statearr_15519_17736[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (10))){
var inst_15298 = (state_15423[(15)]);
var inst_15296 = (state_15423[(17)]);
var inst_15306 = cljs.core._nth(inst_15296,inst_15298);
var inst_15307 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15306,(0),null);
var inst_15308 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15306,(1),null);
var state_15423__$1 = (function (){var statearr_15554 = state_15423;
(statearr_15554[(24)] = inst_15307);

return statearr_15554;
})();
if(cljs.core.truth_(inst_15308)){
var statearr_15557_17737 = state_15423__$1;
(statearr_15557_17737[(1)] = (13));

} else {
var statearr_15558_17738 = state_15423__$1;
(statearr_15558_17738[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (18))){
var inst_15343 = (state_15423[(2)]);
var state_15423__$1 = state_15423;
var statearr_15560_17739 = state_15423__$1;
(statearr_15560_17739[(2)] = inst_15343);

(statearr_15560_17739[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (42))){
var state_15423__$1 = state_15423;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15423__$1,(45),dchan);
} else {
if((state_val_15424 === (37))){
var inst_15380 = (state_15423[(23)]);
var inst_15286 = (state_15423[(11)]);
var inst_15390 = (state_15423[(22)]);
var inst_15390__$1 = cljs.core.first(inst_15380);
var inst_15391 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_15390__$1,inst_15286,done);
var state_15423__$1 = (function (){var statearr_15573 = state_15423;
(statearr_15573[(22)] = inst_15390__$1);

return statearr_15573;
})();
if(cljs.core.truth_(inst_15391)){
var statearr_15577_17742 = state_15423__$1;
(statearr_15577_17742[(1)] = (39));

} else {
var statearr_15586_17743 = state_15423__$1;
(statearr_15586_17743[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15424 === (8))){
var inst_15297 = (state_15423[(14)]);
var inst_15298 = (state_15423[(15)]);
var inst_15300 = (inst_15298 < inst_15297);
var inst_15301 = inst_15300;
var state_15423__$1 = state_15423;
if(cljs.core.truth_(inst_15301)){
var statearr_15593_17746 = state_15423__$1;
(statearr_15593_17746[(1)] = (10));

} else {
var statearr_15597_17747 = state_15423__$1;
(statearr_15597_17747[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__13953__auto__ = null;
var cljs$core$async$mult_$_state_machine__13953__auto____0 = (function (){
var statearr_15607 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15607[(0)] = cljs$core$async$mult_$_state_machine__13953__auto__);

(statearr_15607[(1)] = (1));

return statearr_15607;
});
var cljs$core$async$mult_$_state_machine__13953__auto____1 = (function (state_15423){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15423);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15608){var ex__13968__auto__ = e15608;
var statearr_15609_17748 = state_15423;
(statearr_15609_17748[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15423[(4)]))){
var statearr_15610_17749 = state_15423;
(statearr_15610_17749[(1)] = cljs.core.first((state_15423[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17750 = state_15423;
state_15423 = G__17750;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__13953__auto__ = function(state_15423){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__13953__auto____1.call(this,state_15423);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__13953__auto____0;
cljs$core$async$mult_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__13953__auto____1;
return cljs$core$async$mult_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15611 = f__14282__auto__();
(statearr_15611[(6)] = c__14281__auto___17663);

return statearr_15611;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__15614 = arguments.length;
switch (G__15614) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_17755 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_17755(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_17756 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_17756(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_17758 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_17758(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_17759 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_17759(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_17760 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_17760(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___17761 = arguments.length;
var i__5770__auto___17762 = (0);
while(true){
if((i__5770__auto___17762 < len__5769__auto___17761)){
args__5775__auto__.push((arguments[i__5770__auto___17762]));

var G__17763 = (i__5770__auto___17762 + (1));
i__5770__auto___17762 = G__17763;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__15657){
var map__15658 = p__15657;
var map__15658__$1 = cljs.core.__destructure_map(map__15658);
var opts = map__15658__$1;
var statearr_15659_17776 = state;
(statearr_15659_17776[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_15660_17778 = state;
(statearr_15660_17778[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_15667_17779 = state;
(statearr_15667_17779[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq15653){
var G__15654 = cljs.core.first(seq15653);
var seq15653__$1 = cljs.core.next(seq15653);
var G__15655 = cljs.core.first(seq15653__$1);
var seq15653__$2 = cljs.core.next(seq15653__$1);
var G__15656 = cljs.core.first(seq15653__$2);
var seq15653__$3 = cljs.core.next(seq15653__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__15654,G__15655,G__15656,seq15653__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15677 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15678){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta15678 = meta15678;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15679,meta15678__$1){
var self__ = this;
var _15679__$1 = this;
return (new cljs.core.async.t_cljs$core$async15677(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta15678__$1));
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15679){
var self__ = this;
var _15679__$1 = this;
return self__.meta15678;
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15677.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15677.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta15678","meta15678",-133079570,null)], null);
}));

(cljs.core.async.t_cljs$core$async15677.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15677.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15677");

(cljs.core.async.t_cljs$core$async15677.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15677");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15677.
 */
cljs.core.async.__GT_t_cljs$core$async15677 = (function cljs$core$async$__GT_t_cljs$core$async15677(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15678){
return (new cljs.core.async.t_cljs$core$async15677(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15678));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async15677(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__14281__auto___17781 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15766){
var state_val_15767 = (state_15766[(1)]);
if((state_val_15767 === (7))){
var inst_15723 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
if(cljs.core.truth_(inst_15723)){
var statearr_15773_17782 = state_15766__$1;
(statearr_15773_17782[(1)] = (8));

} else {
var statearr_15774_17783 = state_15766__$1;
(statearr_15774_17783[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (20))){
var inst_15714 = (state_15766[(7)]);
var state_15766__$1 = state_15766;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15766__$1,(23),out,inst_15714);
} else {
if((state_val_15767 === (1))){
var inst_15694 = calc_state();
var inst_15695 = cljs.core.__destructure_map(inst_15694);
var inst_15696 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15695,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_15697 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15695,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_15698 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15695,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_15699 = inst_15694;
var state_15766__$1 = (function (){var statearr_15783 = state_15766;
(statearr_15783[(8)] = inst_15699);

(statearr_15783[(9)] = inst_15697);

(statearr_15783[(10)] = inst_15696);

(statearr_15783[(11)] = inst_15698);

return statearr_15783;
})();
var statearr_15784_17789 = state_15766__$1;
(statearr_15784_17789[(2)] = null);

(statearr_15784_17789[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (24))){
var inst_15705 = (state_15766[(12)]);
var inst_15699 = inst_15705;
var state_15766__$1 = (function (){var statearr_15785 = state_15766;
(statearr_15785[(8)] = inst_15699);

return statearr_15785;
})();
var statearr_15787_17797 = state_15766__$1;
(statearr_15787_17797[(2)] = null);

(statearr_15787_17797[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (4))){
var inst_15714 = (state_15766[(7)]);
var inst_15718 = (state_15766[(13)]);
var inst_15713 = (state_15766[(2)]);
var inst_15714__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15713,(0),null);
var inst_15715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15713,(1),null);
var inst_15718__$1 = (inst_15714__$1 == null);
var state_15766__$1 = (function (){var statearr_15788 = state_15766;
(statearr_15788[(14)] = inst_15715);

(statearr_15788[(7)] = inst_15714__$1);

(statearr_15788[(13)] = inst_15718__$1);

return statearr_15788;
})();
if(cljs.core.truth_(inst_15718__$1)){
var statearr_15789_17801 = state_15766__$1;
(statearr_15789_17801[(1)] = (5));

} else {
var statearr_15790_17802 = state_15766__$1;
(statearr_15790_17802[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (15))){
var inst_15737 = (state_15766[(15)]);
var inst_15706 = (state_15766[(16)]);
var inst_15737__$1 = cljs.core.empty_QMARK_(inst_15706);
var state_15766__$1 = (function (){var statearr_15791 = state_15766;
(statearr_15791[(15)] = inst_15737__$1);

return statearr_15791;
})();
if(inst_15737__$1){
var statearr_15792_17806 = state_15766__$1;
(statearr_15792_17806[(1)] = (17));

} else {
var statearr_15793_17807 = state_15766__$1;
(statearr_15793_17807[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (21))){
var inst_15705 = (state_15766[(12)]);
var inst_15699 = inst_15705;
var state_15766__$1 = (function (){var statearr_15794 = state_15766;
(statearr_15794[(8)] = inst_15699);

return statearr_15794;
})();
var statearr_15795_17808 = state_15766__$1;
(statearr_15795_17808[(2)] = null);

(statearr_15795_17808[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (13))){
var inst_15730 = (state_15766[(2)]);
var inst_15731 = calc_state();
var inst_15699 = inst_15731;
var state_15766__$1 = (function (){var statearr_15798 = state_15766;
(statearr_15798[(8)] = inst_15699);

(statearr_15798[(17)] = inst_15730);

return statearr_15798;
})();
var statearr_15799_17809 = state_15766__$1;
(statearr_15799_17809[(2)] = null);

(statearr_15799_17809[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (22))){
var inst_15760 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
var statearr_15800_17810 = state_15766__$1;
(statearr_15800_17810[(2)] = inst_15760);

(statearr_15800_17810[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (6))){
var inst_15715 = (state_15766[(14)]);
var inst_15721 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_15715,change);
var state_15766__$1 = state_15766;
var statearr_15801_17811 = state_15766__$1;
(statearr_15801_17811[(2)] = inst_15721);

(statearr_15801_17811[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (25))){
var state_15766__$1 = state_15766;
var statearr_15802_17812 = state_15766__$1;
(statearr_15802_17812[(2)] = null);

(statearr_15802_17812[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (17))){
var inst_15715 = (state_15766[(14)]);
var inst_15707 = (state_15766[(18)]);
var inst_15739 = (inst_15707.cljs$core$IFn$_invoke$arity$1 ? inst_15707.cljs$core$IFn$_invoke$arity$1(inst_15715) : inst_15707.call(null,inst_15715));
var inst_15740 = cljs.core.not(inst_15739);
var state_15766__$1 = state_15766;
var statearr_15803_17814 = state_15766__$1;
(statearr_15803_17814[(2)] = inst_15740);

(statearr_15803_17814[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (3))){
var inst_15764 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15766__$1,inst_15764);
} else {
if((state_val_15767 === (12))){
var state_15766__$1 = state_15766;
var statearr_15805_17815 = state_15766__$1;
(statearr_15805_17815[(2)] = null);

(statearr_15805_17815[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (2))){
var inst_15699 = (state_15766[(8)]);
var inst_15705 = (state_15766[(12)]);
var inst_15705__$1 = cljs.core.__destructure_map(inst_15699);
var inst_15706 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15705__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_15707 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15705__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_15708 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15705__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_15766__$1 = (function (){var statearr_15806 = state_15766;
(statearr_15806[(18)] = inst_15707);

(statearr_15806[(16)] = inst_15706);

(statearr_15806[(12)] = inst_15705__$1);

return statearr_15806;
})();
return cljs.core.async.ioc_alts_BANG_(state_15766__$1,(4),inst_15708);
} else {
if((state_val_15767 === (23))){
var inst_15748 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
if(cljs.core.truth_(inst_15748)){
var statearr_15807_17816 = state_15766__$1;
(statearr_15807_17816[(1)] = (24));

} else {
var statearr_15808_17818 = state_15766__$1;
(statearr_15808_17818[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (19))){
var inst_15743 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
var statearr_15809_17819 = state_15766__$1;
(statearr_15809_17819[(2)] = inst_15743);

(statearr_15809_17819[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (11))){
var inst_15715 = (state_15766[(14)]);
var inst_15727 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_15715);
var state_15766__$1 = state_15766;
var statearr_15811_17820 = state_15766__$1;
(statearr_15811_17820[(2)] = inst_15727);

(statearr_15811_17820[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (9))){
var inst_15715 = (state_15766[(14)]);
var inst_15734 = (state_15766[(19)]);
var inst_15706 = (state_15766[(16)]);
var inst_15734__$1 = (inst_15706.cljs$core$IFn$_invoke$arity$1 ? inst_15706.cljs$core$IFn$_invoke$arity$1(inst_15715) : inst_15706.call(null,inst_15715));
var state_15766__$1 = (function (){var statearr_15813 = state_15766;
(statearr_15813[(19)] = inst_15734__$1);

return statearr_15813;
})();
if(cljs.core.truth_(inst_15734__$1)){
var statearr_15814_17821 = state_15766__$1;
(statearr_15814_17821[(1)] = (14));

} else {
var statearr_15815_17822 = state_15766__$1;
(statearr_15815_17822[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (5))){
var inst_15718 = (state_15766[(13)]);
var state_15766__$1 = state_15766;
var statearr_15816_17823 = state_15766__$1;
(statearr_15816_17823[(2)] = inst_15718);

(statearr_15816_17823[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (14))){
var inst_15734 = (state_15766[(19)]);
var state_15766__$1 = state_15766;
var statearr_15817_17824 = state_15766__$1;
(statearr_15817_17824[(2)] = inst_15734);

(statearr_15817_17824[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (26))){
var inst_15756 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
var statearr_15818_17825 = state_15766__$1;
(statearr_15818_17825[(2)] = inst_15756);

(statearr_15818_17825[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (16))){
var inst_15745 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
if(cljs.core.truth_(inst_15745)){
var statearr_15819_17827 = state_15766__$1;
(statearr_15819_17827[(1)] = (20));

} else {
var statearr_15820_17828 = state_15766__$1;
(statearr_15820_17828[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (10))){
var inst_15762 = (state_15766[(2)]);
var state_15766__$1 = state_15766;
var statearr_15821_17829 = state_15766__$1;
(statearr_15821_17829[(2)] = inst_15762);

(statearr_15821_17829[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (18))){
var inst_15737 = (state_15766[(15)]);
var state_15766__$1 = state_15766;
var statearr_15822_17830 = state_15766__$1;
(statearr_15822_17830[(2)] = inst_15737);

(statearr_15822_17830[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15767 === (8))){
var inst_15714 = (state_15766[(7)]);
var inst_15725 = (inst_15714 == null);
var state_15766__$1 = state_15766;
if(cljs.core.truth_(inst_15725)){
var statearr_15825_17831 = state_15766__$1;
(statearr_15825_17831[(1)] = (11));

} else {
var statearr_15826_17832 = state_15766__$1;
(statearr_15826_17832[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__13953__auto__ = null;
var cljs$core$async$mix_$_state_machine__13953__auto____0 = (function (){
var statearr_15827 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15827[(0)] = cljs$core$async$mix_$_state_machine__13953__auto__);

(statearr_15827[(1)] = (1));

return statearr_15827;
});
var cljs$core$async$mix_$_state_machine__13953__auto____1 = (function (state_15766){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15766);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e15828){var ex__13968__auto__ = e15828;
var statearr_15829_17833 = state_15766;
(statearr_15829_17833[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15766[(4)]))){
var statearr_15830_17834 = state_15766;
(statearr_15830_17834[(1)] = cljs.core.first((state_15766[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17835 = state_15766;
state_15766 = G__17835;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__13953__auto__ = function(state_15766){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__13953__auto____1.call(this,state_15766);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__13953__auto____0;
cljs$core$async$mix_$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__13953__auto____1;
return cljs$core$async$mix_$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_15831 = f__14282__auto__();
(statearr_15831[(6)] = c__14281__auto___17781);

return statearr_15831;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_17836 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_17836(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_17838 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_17838(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_17839 = (function() {
var G__17840 = null;
var G__17840__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__17840__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__17840 = function(p,v){
switch(arguments.length){
case 1:
return G__17840__1.call(this,p);
case 2:
return G__17840__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__17840.cljs$core$IFn$_invoke$arity$1 = G__17840__1;
G__17840.cljs$core$IFn$_invoke$arity$2 = G__17840__2;
return G__17840;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__15853 = arguments.length;
switch (G__15853) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_17839(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_17839(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15866 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta15867){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta15867 = meta15867;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15868,meta15867__$1){
var self__ = this;
var _15868__$1 = this;
return (new cljs.core.async.t_cljs$core$async15866(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta15867__$1));
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15868){
var self__ = this;
var _15868__$1 = this;
return self__.meta15867;
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async15866.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async15866.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta15867","meta15867",96612006,null)], null);
}));

(cljs.core.async.t_cljs$core$async15866.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15866.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15866");

(cljs.core.async.t_cljs$core$async15866.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15866");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15866.
 */
cljs.core.async.__GT_t_cljs$core$async15866 = (function cljs$core$async$__GT_t_cljs$core$async15866(ch,topic_fn,buf_fn,mults,ensure_mult,meta15867){
return (new cljs.core.async.t_cljs$core$async15866(ch,topic_fn,buf_fn,mults,ensure_mult,meta15867));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__15859 = arguments.length;
switch (G__15859) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__15857_SHARP_){
if(cljs.core.truth_((p1__15857_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__15857_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__15857_SHARP_.call(null,topic)))){
return p1__15857_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__15857_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async15866(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__14281__auto___17853 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_15949){
var state_val_15950 = (state_15949[(1)]);
if((state_val_15950 === (7))){
var inst_15945 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15952_17855 = state_15949__$1;
(statearr_15952_17855[(2)] = inst_15945);

(statearr_15952_17855[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (20))){
var state_15949__$1 = state_15949;
var statearr_15953_17856 = state_15949__$1;
(statearr_15953_17856[(2)] = null);

(statearr_15953_17856[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (1))){
var state_15949__$1 = state_15949;
var statearr_15954_17858 = state_15949__$1;
(statearr_15954_17858[(2)] = null);

(statearr_15954_17858[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (24))){
var inst_15928 = (state_15949[(7)]);
var inst_15937 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_15928);
var state_15949__$1 = state_15949;
var statearr_15955_17859 = state_15949__$1;
(statearr_15955_17859[(2)] = inst_15937);

(statearr_15955_17859[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (4))){
var inst_15876 = (state_15949[(8)]);
var inst_15876__$1 = (state_15949[(2)]);
var inst_15877 = (inst_15876__$1 == null);
var state_15949__$1 = (function (){var statearr_15956 = state_15949;
(statearr_15956[(8)] = inst_15876__$1);

return statearr_15956;
})();
if(cljs.core.truth_(inst_15877)){
var statearr_15957_17860 = state_15949__$1;
(statearr_15957_17860[(1)] = (5));

} else {
var statearr_15958_17861 = state_15949__$1;
(statearr_15958_17861[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (15))){
var inst_15922 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15959_17862 = state_15949__$1;
(statearr_15959_17862[(2)] = inst_15922);

(statearr_15959_17862[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (21))){
var inst_15942 = (state_15949[(2)]);
var state_15949__$1 = (function (){var statearr_15960 = state_15949;
(statearr_15960[(9)] = inst_15942);

return statearr_15960;
})();
var statearr_15961_17863 = state_15949__$1;
(statearr_15961_17863[(2)] = null);

(statearr_15961_17863[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (13))){
var inst_15904 = (state_15949[(10)]);
var inst_15906 = cljs.core.chunked_seq_QMARK_(inst_15904);
var state_15949__$1 = state_15949;
if(inst_15906){
var statearr_15962_17864 = state_15949__$1;
(statearr_15962_17864[(1)] = (16));

} else {
var statearr_15963_17865 = state_15949__$1;
(statearr_15963_17865[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (22))){
var inst_15934 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
if(cljs.core.truth_(inst_15934)){
var statearr_15965_17869 = state_15949__$1;
(statearr_15965_17869[(1)] = (23));

} else {
var statearr_15966_17870 = state_15949__$1;
(statearr_15966_17870[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (6))){
var inst_15928 = (state_15949[(7)]);
var inst_15930 = (state_15949[(11)]);
var inst_15876 = (state_15949[(8)]);
var inst_15928__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_15876) : topic_fn.call(null,inst_15876));
var inst_15929 = cljs.core.deref(mults);
var inst_15930__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15929,inst_15928__$1);
var state_15949__$1 = (function (){var statearr_15967 = state_15949;
(statearr_15967[(7)] = inst_15928__$1);

(statearr_15967[(11)] = inst_15930__$1);

return statearr_15967;
})();
if(cljs.core.truth_(inst_15930__$1)){
var statearr_15968_17871 = state_15949__$1;
(statearr_15968_17871[(1)] = (19));

} else {
var statearr_15969_17872 = state_15949__$1;
(statearr_15969_17872[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (25))){
var inst_15939 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15970_17873 = state_15949__$1;
(statearr_15970_17873[(2)] = inst_15939);

(statearr_15970_17873[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (17))){
var inst_15904 = (state_15949[(10)]);
var inst_15913 = cljs.core.first(inst_15904);
var inst_15914 = cljs.core.async.muxch_STAR_(inst_15913);
var inst_15915 = cljs.core.async.close_BANG_(inst_15914);
var inst_15916 = cljs.core.next(inst_15904);
var inst_15886 = inst_15916;
var inst_15887 = null;
var inst_15888 = (0);
var inst_15889 = (0);
var state_15949__$1 = (function (){var statearr_15972 = state_15949;
(statearr_15972[(12)] = inst_15888);

(statearr_15972[(13)] = inst_15887);

(statearr_15972[(14)] = inst_15915);

(statearr_15972[(15)] = inst_15886);

(statearr_15972[(16)] = inst_15889);

return statearr_15972;
})();
var statearr_15973_17881 = state_15949__$1;
(statearr_15973_17881[(2)] = null);

(statearr_15973_17881[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (3))){
var inst_15947 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15949__$1,inst_15947);
} else {
if((state_val_15950 === (12))){
var inst_15924 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15977_17882 = state_15949__$1;
(statearr_15977_17882[(2)] = inst_15924);

(statearr_15977_17882[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (2))){
var state_15949__$1 = state_15949;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15949__$1,(4),ch);
} else {
if((state_val_15950 === (23))){
var state_15949__$1 = state_15949;
var statearr_15978_17883 = state_15949__$1;
(statearr_15978_17883[(2)] = null);

(statearr_15978_17883[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (19))){
var inst_15930 = (state_15949[(11)]);
var inst_15876 = (state_15949[(8)]);
var inst_15932 = cljs.core.async.muxch_STAR_(inst_15930);
var state_15949__$1 = state_15949;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15949__$1,(22),inst_15932,inst_15876);
} else {
if((state_val_15950 === (11))){
var inst_15886 = (state_15949[(15)]);
var inst_15904 = (state_15949[(10)]);
var inst_15904__$1 = cljs.core.seq(inst_15886);
var state_15949__$1 = (function (){var statearr_15979 = state_15949;
(statearr_15979[(10)] = inst_15904__$1);

return statearr_15979;
})();
if(inst_15904__$1){
var statearr_15980_17887 = state_15949__$1;
(statearr_15980_17887[(1)] = (13));

} else {
var statearr_15981_17888 = state_15949__$1;
(statearr_15981_17888[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (9))){
var inst_15926 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15982_17889 = state_15949__$1;
(statearr_15982_17889[(2)] = inst_15926);

(statearr_15982_17889[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (5))){
var inst_15883 = cljs.core.deref(mults);
var inst_15884 = cljs.core.vals(inst_15883);
var inst_15885 = cljs.core.seq(inst_15884);
var inst_15886 = inst_15885;
var inst_15887 = null;
var inst_15888 = (0);
var inst_15889 = (0);
var state_15949__$1 = (function (){var statearr_15983 = state_15949;
(statearr_15983[(12)] = inst_15888);

(statearr_15983[(13)] = inst_15887);

(statearr_15983[(15)] = inst_15886);

(statearr_15983[(16)] = inst_15889);

return statearr_15983;
})();
var statearr_15984_17893 = state_15949__$1;
(statearr_15984_17893[(2)] = null);

(statearr_15984_17893[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (14))){
var state_15949__$1 = state_15949;
var statearr_15988_17894 = state_15949__$1;
(statearr_15988_17894[(2)] = null);

(statearr_15988_17894[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (16))){
var inst_15904 = (state_15949[(10)]);
var inst_15908 = cljs.core.chunk_first(inst_15904);
var inst_15909 = cljs.core.chunk_rest(inst_15904);
var inst_15910 = cljs.core.count(inst_15908);
var inst_15886 = inst_15909;
var inst_15887 = inst_15908;
var inst_15888 = inst_15910;
var inst_15889 = (0);
var state_15949__$1 = (function (){var statearr_15989 = state_15949;
(statearr_15989[(12)] = inst_15888);

(statearr_15989[(13)] = inst_15887);

(statearr_15989[(15)] = inst_15886);

(statearr_15989[(16)] = inst_15889);

return statearr_15989;
})();
var statearr_15990_17902 = state_15949__$1;
(statearr_15990_17902[(2)] = null);

(statearr_15990_17902[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (10))){
var inst_15888 = (state_15949[(12)]);
var inst_15887 = (state_15949[(13)]);
var inst_15886 = (state_15949[(15)]);
var inst_15889 = (state_15949[(16)]);
var inst_15898 = cljs.core._nth(inst_15887,inst_15889);
var inst_15899 = cljs.core.async.muxch_STAR_(inst_15898);
var inst_15900 = cljs.core.async.close_BANG_(inst_15899);
var inst_15901 = (inst_15889 + (1));
var tmp15985 = inst_15888;
var tmp15986 = inst_15887;
var tmp15987 = inst_15886;
var inst_15886__$1 = tmp15987;
var inst_15887__$1 = tmp15986;
var inst_15888__$1 = tmp15985;
var inst_15889__$1 = inst_15901;
var state_15949__$1 = (function (){var statearr_15992 = state_15949;
(statearr_15992[(12)] = inst_15888__$1);

(statearr_15992[(13)] = inst_15887__$1);

(statearr_15992[(15)] = inst_15886__$1);

(statearr_15992[(17)] = inst_15900);

(statearr_15992[(16)] = inst_15889__$1);

return statearr_15992;
})();
var statearr_15993_17903 = state_15949__$1;
(statearr_15993_17903[(2)] = null);

(statearr_15993_17903[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (18))){
var inst_15919 = (state_15949[(2)]);
var state_15949__$1 = state_15949;
var statearr_15994_17908 = state_15949__$1;
(statearr_15994_17908[(2)] = inst_15919);

(statearr_15994_17908[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15950 === (8))){
var inst_15888 = (state_15949[(12)]);
var inst_15889 = (state_15949[(16)]);
var inst_15891 = (inst_15889 < inst_15888);
var inst_15892 = inst_15891;
var state_15949__$1 = state_15949;
if(cljs.core.truth_(inst_15892)){
var statearr_15999_17912 = state_15949__$1;
(statearr_15999_17912[(1)] = (10));

} else {
var statearr_16000_17913 = state_15949__$1;
(statearr_16000_17913[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16001 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16001[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16001[(1)] = (1));

return statearr_16001;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_15949){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_15949);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16006){var ex__13968__auto__ = e16006;
var statearr_16008_17914 = state_15949;
(statearr_16008_17914[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_15949[(4)]))){
var statearr_16009_17915 = state_15949;
(statearr_16009_17915[(1)] = cljs.core.first((state_15949[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17916 = state_15949;
state_15949 = G__17916;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_15949){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_15949);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16010 = f__14282__auto__();
(statearr_16010[(6)] = c__14281__auto___17853);

return statearr_16010;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__16021 = arguments.length;
switch (G__16021) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__16025 = arguments.length;
switch (G__16025) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__16030 = arguments.length;
switch (G__16030) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__14281__auto___17929 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16129){
var state_val_16131 = (state_16129[(1)]);
if((state_val_16131 === (7))){
var state_16129__$1 = state_16129;
var statearr_16139_17930 = state_16129__$1;
(statearr_16139_17930[(2)] = null);

(statearr_16139_17930[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (1))){
var state_16129__$1 = state_16129;
var statearr_16140_17931 = state_16129__$1;
(statearr_16140_17931[(2)] = null);

(statearr_16140_17931[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (4))){
var inst_16065 = (state_16129[(7)]);
var inst_16064 = (state_16129[(8)]);
var inst_16067 = (inst_16065 < inst_16064);
var state_16129__$1 = state_16129;
if(cljs.core.truth_(inst_16067)){
var statearr_16147_17940 = state_16129__$1;
(statearr_16147_17940[(1)] = (6));

} else {
var statearr_16148_17944 = state_16129__$1;
(statearr_16148_17944[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (15))){
var inst_16115 = (state_16129[(9)]);
var inst_16120 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_16115);
var state_16129__$1 = state_16129;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16129__$1,(17),out,inst_16120);
} else {
if((state_val_16131 === (13))){
var inst_16115 = (state_16129[(9)]);
var inst_16115__$1 = (state_16129[(2)]);
var inst_16116 = cljs.core.some(cljs.core.nil_QMARK_,inst_16115__$1);
var state_16129__$1 = (function (){var statearr_16151 = state_16129;
(statearr_16151[(9)] = inst_16115__$1);

return statearr_16151;
})();
if(cljs.core.truth_(inst_16116)){
var statearr_16152_17948 = state_16129__$1;
(statearr_16152_17948[(1)] = (14));

} else {
var statearr_16153_17949 = state_16129__$1;
(statearr_16153_17949[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (6))){
var state_16129__$1 = state_16129;
var statearr_16154_17950 = state_16129__$1;
(statearr_16154_17950[(2)] = null);

(statearr_16154_17950[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (17))){
var inst_16122 = (state_16129[(2)]);
var state_16129__$1 = (function (){var statearr_16161 = state_16129;
(statearr_16161[(10)] = inst_16122);

return statearr_16161;
})();
var statearr_16162_17951 = state_16129__$1;
(statearr_16162_17951[(2)] = null);

(statearr_16162_17951[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (3))){
var inst_16127 = (state_16129[(2)]);
var state_16129__$1 = state_16129;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16129__$1,inst_16127);
} else {
if((state_val_16131 === (12))){
var _ = (function (){var statearr_16165 = state_16129;
(statearr_16165[(4)] = cljs.core.rest((state_16129[(4)])));

return statearr_16165;
})();
var state_16129__$1 = state_16129;
var ex16160 = (state_16129__$1[(2)]);
var statearr_16171_17953 = state_16129__$1;
(statearr_16171_17953[(5)] = ex16160);


if((ex16160 instanceof Object)){
var statearr_16176_17954 = state_16129__$1;
(statearr_16176_17954[(1)] = (11));

(statearr_16176_17954[(5)] = null);

} else {
throw ex16160;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (2))){
var inst_16063 = cljs.core.reset_BANG_(dctr,cnt);
var inst_16064 = cnt;
var inst_16065 = (0);
var state_16129__$1 = (function (){var statearr_16186 = state_16129;
(statearr_16186[(11)] = inst_16063);

(statearr_16186[(7)] = inst_16065);

(statearr_16186[(8)] = inst_16064);

return statearr_16186;
})();
var statearr_16187_17955 = state_16129__$1;
(statearr_16187_17955[(2)] = null);

(statearr_16187_17955[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (11))){
var inst_16087 = (state_16129[(2)]);
var inst_16091 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_16129__$1 = (function (){var statearr_16188 = state_16129;
(statearr_16188[(12)] = inst_16087);

return statearr_16188;
})();
var statearr_16190_17956 = state_16129__$1;
(statearr_16190_17956[(2)] = inst_16091);

(statearr_16190_17956[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (9))){
var inst_16065 = (state_16129[(7)]);
var _ = (function (){var statearr_16191 = state_16129;
(statearr_16191[(4)] = cljs.core.cons((12),(state_16129[(4)])));

return statearr_16191;
})();
var inst_16099 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_16065) : chs__$1.call(null,inst_16065));
var inst_16100 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_16065) : done.call(null,inst_16065));
var inst_16101 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_16099,inst_16100);
var ___$1 = (function (){var statearr_16193 = state_16129;
(statearr_16193[(4)] = cljs.core.rest((state_16129[(4)])));

return statearr_16193;
})();
var state_16129__$1 = state_16129;
var statearr_16197_17957 = state_16129__$1;
(statearr_16197_17957[(2)] = inst_16101);

(statearr_16197_17957[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (5))){
var inst_16112 = (state_16129[(2)]);
var state_16129__$1 = (function (){var statearr_16199 = state_16129;
(statearr_16199[(13)] = inst_16112);

return statearr_16199;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16129__$1,(13),dchan);
} else {
if((state_val_16131 === (14))){
var inst_16118 = cljs.core.async.close_BANG_(out);
var state_16129__$1 = state_16129;
var statearr_16200_17958 = state_16129__$1;
(statearr_16200_17958[(2)] = inst_16118);

(statearr_16200_17958[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (16))){
var inst_16125 = (state_16129[(2)]);
var state_16129__$1 = state_16129;
var statearr_16201_17959 = state_16129__$1;
(statearr_16201_17959[(2)] = inst_16125);

(statearr_16201_17959[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (10))){
var inst_16065 = (state_16129[(7)]);
var inst_16104 = (state_16129[(2)]);
var inst_16106 = (inst_16065 + (1));
var inst_16065__$1 = inst_16106;
var state_16129__$1 = (function (){var statearr_16202 = state_16129;
(statearr_16202[(14)] = inst_16104);

(statearr_16202[(7)] = inst_16065__$1);

return statearr_16202;
})();
var statearr_16203_17960 = state_16129__$1;
(statearr_16203_17960[(2)] = null);

(statearr_16203_17960[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16131 === (8))){
var inst_16110 = (state_16129[(2)]);
var state_16129__$1 = state_16129;
var statearr_16204_17967 = state_16129__$1;
(statearr_16204_17967[(2)] = inst_16110);

(statearr_16204_17967[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16205 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16205[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16205[(1)] = (1));

return statearr_16205;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16129){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16129);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16206){var ex__13968__auto__ = e16206;
var statearr_16207_17968 = state_16129;
(statearr_16207_17968[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16129[(4)]))){
var statearr_16208_17969 = state_16129;
(statearr_16208_17969[(1)] = cljs.core.first((state_16129[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17970 = state_16129;
state_16129 = G__17970;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16129){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16129);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16210 = f__14282__auto__();
(statearr_16210[(6)] = c__14281__auto___17929);

return statearr_16210;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__16213 = arguments.length;
switch (G__16213) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___17986 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16252){
var state_val_16253 = (state_16252[(1)]);
if((state_val_16253 === (7))){
var inst_16232 = (state_16252[(7)]);
var inst_16231 = (state_16252[(8)]);
var inst_16231__$1 = (state_16252[(2)]);
var inst_16232__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16231__$1,(0),null);
var inst_16233 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_16231__$1,(1),null);
var inst_16234 = (inst_16232__$1 == null);
var state_16252__$1 = (function (){var statearr_16255 = state_16252;
(statearr_16255[(9)] = inst_16233);

(statearr_16255[(7)] = inst_16232__$1);

(statearr_16255[(8)] = inst_16231__$1);

return statearr_16255;
})();
if(cljs.core.truth_(inst_16234)){
var statearr_16256_17993 = state_16252__$1;
(statearr_16256_17993[(1)] = (8));

} else {
var statearr_16261_17994 = state_16252__$1;
(statearr_16261_17994[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (1))){
var inst_16217 = cljs.core.vec(chs);
var inst_16218 = inst_16217;
var state_16252__$1 = (function (){var statearr_16265 = state_16252;
(statearr_16265[(10)] = inst_16218);

return statearr_16265;
})();
var statearr_16267_17995 = state_16252__$1;
(statearr_16267_17995[(2)] = null);

(statearr_16267_17995[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (4))){
var inst_16218 = (state_16252[(10)]);
var state_16252__$1 = state_16252;
return cljs.core.async.ioc_alts_BANG_(state_16252__$1,(7),inst_16218);
} else {
if((state_val_16253 === (6))){
var inst_16248 = (state_16252[(2)]);
var state_16252__$1 = state_16252;
var statearr_16278_17996 = state_16252__$1;
(statearr_16278_17996[(2)] = inst_16248);

(statearr_16278_17996[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (3))){
var inst_16250 = (state_16252[(2)]);
var state_16252__$1 = state_16252;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16252__$1,inst_16250);
} else {
if((state_val_16253 === (2))){
var inst_16218 = (state_16252[(10)]);
var inst_16220 = cljs.core.count(inst_16218);
var inst_16221 = (inst_16220 > (0));
var state_16252__$1 = state_16252;
if(cljs.core.truth_(inst_16221)){
var statearr_16282_17997 = state_16252__$1;
(statearr_16282_17997[(1)] = (4));

} else {
var statearr_16283_17998 = state_16252__$1;
(statearr_16283_17998[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (11))){
var inst_16218 = (state_16252[(10)]);
var inst_16241 = (state_16252[(2)]);
var tmp16279 = inst_16218;
var inst_16218__$1 = tmp16279;
var state_16252__$1 = (function (){var statearr_16284 = state_16252;
(statearr_16284[(11)] = inst_16241);

(statearr_16284[(10)] = inst_16218__$1);

return statearr_16284;
})();
var statearr_16286_17999 = state_16252__$1;
(statearr_16286_17999[(2)] = null);

(statearr_16286_17999[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (9))){
var inst_16232 = (state_16252[(7)]);
var state_16252__$1 = state_16252;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16252__$1,(11),out,inst_16232);
} else {
if((state_val_16253 === (5))){
var inst_16246 = cljs.core.async.close_BANG_(out);
var state_16252__$1 = state_16252;
var statearr_16295_18002 = state_16252__$1;
(statearr_16295_18002[(2)] = inst_16246);

(statearr_16295_18002[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (10))){
var inst_16244 = (state_16252[(2)]);
var state_16252__$1 = state_16252;
var statearr_16296_18003 = state_16252__$1;
(statearr_16296_18003[(2)] = inst_16244);

(statearr_16296_18003[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16253 === (8))){
var inst_16233 = (state_16252[(9)]);
var inst_16232 = (state_16252[(7)]);
var inst_16218 = (state_16252[(10)]);
var inst_16231 = (state_16252[(8)]);
var inst_16236 = (function (){var cs = inst_16218;
var vec__16227 = inst_16231;
var v = inst_16232;
var c = inst_16233;
return (function (p1__16211_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__16211_SHARP_);
});
})();
var inst_16237 = cljs.core.filterv(inst_16236,inst_16218);
var inst_16218__$1 = inst_16237;
var state_16252__$1 = (function (){var statearr_16297 = state_16252;
(statearr_16297[(10)] = inst_16218__$1);

return statearr_16297;
})();
var statearr_16298_18004 = state_16252__$1;
(statearr_16298_18004[(2)] = null);

(statearr_16298_18004[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16300 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16300[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16300[(1)] = (1));

return statearr_16300;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16252){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16252);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16304){var ex__13968__auto__ = e16304;
var statearr_16306_18006 = state_16252;
(statearr_16306_18006[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16252[(4)]))){
var statearr_16311_18007 = state_16252;
(statearr_16311_18007[(1)] = cljs.core.first((state_16252[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18008 = state_16252;
state_16252 = G__18008;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16252){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16252);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16319 = f__14282__auto__();
(statearr_16319[(6)] = c__14281__auto___17986);

return statearr_16319;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__16335 = arguments.length;
switch (G__16335) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___18010 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16378){
var state_val_16379 = (state_16378[(1)]);
if((state_val_16379 === (7))){
var inst_16356 = (state_16378[(7)]);
var inst_16356__$1 = (state_16378[(2)]);
var inst_16358 = (inst_16356__$1 == null);
var inst_16359 = cljs.core.not(inst_16358);
var state_16378__$1 = (function (){var statearr_16387 = state_16378;
(statearr_16387[(7)] = inst_16356__$1);

return statearr_16387;
})();
if(inst_16359){
var statearr_16389_18011 = state_16378__$1;
(statearr_16389_18011[(1)] = (8));

} else {
var statearr_16391_18012 = state_16378__$1;
(statearr_16391_18012[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (1))){
var inst_16351 = (0);
var state_16378__$1 = (function (){var statearr_16393 = state_16378;
(statearr_16393[(8)] = inst_16351);

return statearr_16393;
})();
var statearr_16394_18016 = state_16378__$1;
(statearr_16394_18016[(2)] = null);

(statearr_16394_18016[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (4))){
var state_16378__$1 = state_16378;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16378__$1,(7),ch);
} else {
if((state_val_16379 === (6))){
var inst_16370 = (state_16378[(2)]);
var state_16378__$1 = state_16378;
var statearr_16400_18017 = state_16378__$1;
(statearr_16400_18017[(2)] = inst_16370);

(statearr_16400_18017[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (3))){
var inst_16372 = (state_16378[(2)]);
var inst_16373 = cljs.core.async.close_BANG_(out);
var state_16378__$1 = (function (){var statearr_16410 = state_16378;
(statearr_16410[(9)] = inst_16372);

return statearr_16410;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16378__$1,inst_16373);
} else {
if((state_val_16379 === (2))){
var inst_16351 = (state_16378[(8)]);
var inst_16353 = (inst_16351 < n);
var state_16378__$1 = state_16378;
if(cljs.core.truth_(inst_16353)){
var statearr_16411_18018 = state_16378__$1;
(statearr_16411_18018[(1)] = (4));

} else {
var statearr_16412_18019 = state_16378__$1;
(statearr_16412_18019[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (11))){
var inst_16351 = (state_16378[(8)]);
var inst_16362 = (state_16378[(2)]);
var inst_16363 = (inst_16351 + (1));
var inst_16351__$1 = inst_16363;
var state_16378__$1 = (function (){var statearr_16415 = state_16378;
(statearr_16415[(10)] = inst_16362);

(statearr_16415[(8)] = inst_16351__$1);

return statearr_16415;
})();
var statearr_16416_18020 = state_16378__$1;
(statearr_16416_18020[(2)] = null);

(statearr_16416_18020[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (9))){
var state_16378__$1 = state_16378;
var statearr_16417_18021 = state_16378__$1;
(statearr_16417_18021[(2)] = null);

(statearr_16417_18021[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (5))){
var state_16378__$1 = state_16378;
var statearr_16418_18022 = state_16378__$1;
(statearr_16418_18022[(2)] = null);

(statearr_16418_18022[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (10))){
var inst_16367 = (state_16378[(2)]);
var state_16378__$1 = state_16378;
var statearr_16419_18023 = state_16378__$1;
(statearr_16419_18023[(2)] = inst_16367);

(statearr_16419_18023[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16379 === (8))){
var inst_16356 = (state_16378[(7)]);
var state_16378__$1 = state_16378;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16378__$1,(11),out,inst_16356);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16423 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16423[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16423[(1)] = (1));

return statearr_16423;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16378){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16378);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16424){var ex__13968__auto__ = e16424;
var statearr_16425_18024 = state_16378;
(statearr_16425_18024[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16378[(4)]))){
var statearr_16426_18025 = state_16378;
(statearr_16426_18025[(1)] = cljs.core.first((state_16378[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18026 = state_16378;
state_16378 = G__18026;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16378){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16378);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16427 = f__14282__auto__();
(statearr_16427[(6)] = c__14281__auto___18010);

return statearr_16427;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16434 = (function (f,ch,meta16431,_,fn1,meta16435){
this.f = f;
this.ch = ch;
this.meta16431 = meta16431;
this._ = _;
this.fn1 = fn1;
this.meta16435 = meta16435;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16436,meta16435__$1){
var self__ = this;
var _16436__$1 = this;
return (new cljs.core.async.t_cljs$core$async16434(self__.f,self__.ch,self__.meta16431,self__._,self__.fn1,meta16435__$1));
}));

(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16436){
var self__ = this;
var _16436__$1 = this;
return self__.meta16435;
}));

(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async16434.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__16428_SHARP_){
var G__16449 = (((p1__16428_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__16428_SHARP_) : self__.f.call(null,p1__16428_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__16449) : f1.call(null,G__16449));
});
}));

(cljs.core.async.t_cljs$core$async16434.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16431","meta16431",1336456563,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async16430","cljs.core.async/t_cljs$core$async16430",1581927924,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta16435","meta16435",-1341677051,null)], null);
}));

(cljs.core.async.t_cljs$core$async16434.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16434.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16434");

(cljs.core.async.t_cljs$core$async16434.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16434");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16434.
 */
cljs.core.async.__GT_t_cljs$core$async16434 = (function cljs$core$async$__GT_t_cljs$core$async16434(f,ch,meta16431,_,fn1,meta16435){
return (new cljs.core.async.t_cljs$core$async16434(f,ch,meta16431,_,fn1,meta16435));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16430 = (function (f,ch,meta16431){
this.f = f;
this.ch = ch;
this.meta16431 = meta16431;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16432,meta16431__$1){
var self__ = this;
var _16432__$1 = this;
return (new cljs.core.async.t_cljs$core$async16430(self__.f,self__.ch,meta16431__$1));
}));

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16432){
var self__ = this;
var _16432__$1 = this;
return self__.meta16431;
}));

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async16434(self__.f,self__.ch,self__.meta16431,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__16457 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__16457) : self__.f.call(null,G__16457));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16430.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async16430.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16431","meta16431",1336456563,null)], null);
}));

(cljs.core.async.t_cljs$core$async16430.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16430.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16430");

(cljs.core.async.t_cljs$core$async16430.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16430");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16430.
 */
cljs.core.async.__GT_t_cljs$core$async16430 = (function cljs$core$async$__GT_t_cljs$core$async16430(f,ch,meta16431){
return (new cljs.core.async.t_cljs$core$async16430(f,ch,meta16431));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async16430(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16464 = (function (f,ch,meta16465){
this.f = f;
this.ch = ch;
this.meta16465 = meta16465;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16466,meta16465__$1){
var self__ = this;
var _16466__$1 = this;
return (new cljs.core.async.t_cljs$core$async16464(self__.f,self__.ch,meta16465__$1));
}));

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16466){
var self__ = this;
var _16466__$1 = this;
return self__.meta16465;
}));

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16464.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async16464.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16465","meta16465",2042947792,null)], null);
}));

(cljs.core.async.t_cljs$core$async16464.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16464.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16464");

(cljs.core.async.t_cljs$core$async16464.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16464");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16464.
 */
cljs.core.async.__GT_t_cljs$core$async16464 = (function cljs$core$async$__GT_t_cljs$core$async16464(f,ch,meta16465){
return (new cljs.core.async.t_cljs$core$async16464(f,ch,meta16465));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async16464(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16478 = (function (p,ch,meta16479){
this.p = p;
this.ch = ch;
this.meta16479 = meta16479;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16480,meta16479__$1){
var self__ = this;
var _16480__$1 = this;
return (new cljs.core.async.t_cljs$core$async16478(self__.p,self__.ch,meta16479__$1));
}));

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16480){
var self__ = this;
var _16480__$1 = this;
return self__.meta16479;
}));

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16478.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async16478.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16479","meta16479",-1693566681,null)], null);
}));

(cljs.core.async.t_cljs$core$async16478.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16478.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16478");

(cljs.core.async.t_cljs$core$async16478.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16478");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16478.
 */
cljs.core.async.__GT_t_cljs$core$async16478 = (function cljs$core$async$__GT_t_cljs$core$async16478(p,ch,meta16479){
return (new cljs.core.async.t_cljs$core$async16478(p,ch,meta16479));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async16478(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__16491 = arguments.length;
switch (G__16491) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___18046 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16527){
var state_val_16528 = (state_16527[(1)]);
if((state_val_16528 === (7))){
var inst_16523 = (state_16527[(2)]);
var state_16527__$1 = state_16527;
var statearr_16533_18050 = state_16527__$1;
(statearr_16533_18050[(2)] = inst_16523);

(statearr_16533_18050[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (1))){
var state_16527__$1 = state_16527;
var statearr_16535_18051 = state_16527__$1;
(statearr_16535_18051[(2)] = null);

(statearr_16535_18051[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (4))){
var inst_16506 = (state_16527[(7)]);
var inst_16506__$1 = (state_16527[(2)]);
var inst_16507 = (inst_16506__$1 == null);
var state_16527__$1 = (function (){var statearr_16538 = state_16527;
(statearr_16538[(7)] = inst_16506__$1);

return statearr_16538;
})();
if(cljs.core.truth_(inst_16507)){
var statearr_16540_18052 = state_16527__$1;
(statearr_16540_18052[(1)] = (5));

} else {
var statearr_16541_18053 = state_16527__$1;
(statearr_16541_18053[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (6))){
var inst_16506 = (state_16527[(7)]);
var inst_16514 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_16506) : p.call(null,inst_16506));
var state_16527__$1 = state_16527;
if(cljs.core.truth_(inst_16514)){
var statearr_16543_18054 = state_16527__$1;
(statearr_16543_18054[(1)] = (8));

} else {
var statearr_16544_18055 = state_16527__$1;
(statearr_16544_18055[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (3))){
var inst_16525 = (state_16527[(2)]);
var state_16527__$1 = state_16527;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16527__$1,inst_16525);
} else {
if((state_val_16528 === (2))){
var state_16527__$1 = state_16527;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16527__$1,(4),ch);
} else {
if((state_val_16528 === (11))){
var inst_16517 = (state_16527[(2)]);
var state_16527__$1 = state_16527;
var statearr_16548_18059 = state_16527__$1;
(statearr_16548_18059[(2)] = inst_16517);

(statearr_16548_18059[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (9))){
var state_16527__$1 = state_16527;
var statearr_16550_18060 = state_16527__$1;
(statearr_16550_18060[(2)] = null);

(statearr_16550_18060[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (5))){
var inst_16512 = cljs.core.async.close_BANG_(out);
var state_16527__$1 = state_16527;
var statearr_16553_18061 = state_16527__$1;
(statearr_16553_18061[(2)] = inst_16512);

(statearr_16553_18061[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (10))){
var inst_16520 = (state_16527[(2)]);
var state_16527__$1 = (function (){var statearr_16562 = state_16527;
(statearr_16562[(8)] = inst_16520);

return statearr_16562;
})();
var statearr_16563_18062 = state_16527__$1;
(statearr_16563_18062[(2)] = null);

(statearr_16563_18062[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16528 === (8))){
var inst_16506 = (state_16527[(7)]);
var state_16527__$1 = state_16527;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16527__$1,(11),out,inst_16506);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16567 = [null,null,null,null,null,null,null,null,null];
(statearr_16567[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16567[(1)] = (1));

return statearr_16567;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16527){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16527);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16569){var ex__13968__auto__ = e16569;
var statearr_16570_18063 = state_16527;
(statearr_16570_18063[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16527[(4)]))){
var statearr_16571_18064 = state_16527;
(statearr_16571_18064[(1)] = cljs.core.first((state_16527[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18066 = state_16527;
state_16527 = G__18066;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16527){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16527);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16572 = f__14282__auto__();
(statearr_16572[(6)] = c__14281__auto___18046);

return statearr_16572;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__16576 = arguments.length;
switch (G__16576) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__14281__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16647){
var state_val_16648 = (state_16647[(1)]);
if((state_val_16648 === (7))){
var inst_16643 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
var statearr_16649_18075 = state_16647__$1;
(statearr_16649_18075[(2)] = inst_16643);

(statearr_16649_18075[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (20))){
var inst_16610 = (state_16647[(7)]);
var inst_16624 = (state_16647[(2)]);
var inst_16625 = cljs.core.next(inst_16610);
var inst_16595 = inst_16625;
var inst_16596 = null;
var inst_16597 = (0);
var inst_16598 = (0);
var state_16647__$1 = (function (){var statearr_16651 = state_16647;
(statearr_16651[(8)] = inst_16595);

(statearr_16651[(9)] = inst_16598);

(statearr_16651[(10)] = inst_16597);

(statearr_16651[(11)] = inst_16624);

(statearr_16651[(12)] = inst_16596);

return statearr_16651;
})();
var statearr_16653_18076 = state_16647__$1;
(statearr_16653_18076[(2)] = null);

(statearr_16653_18076[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (1))){
var state_16647__$1 = state_16647;
var statearr_16654_18081 = state_16647__$1;
(statearr_16654_18081[(2)] = null);

(statearr_16654_18081[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (4))){
var inst_16584 = (state_16647[(13)]);
var inst_16584__$1 = (state_16647[(2)]);
var inst_16585 = (inst_16584__$1 == null);
var state_16647__$1 = (function (){var statearr_16656 = state_16647;
(statearr_16656[(13)] = inst_16584__$1);

return statearr_16656;
})();
if(cljs.core.truth_(inst_16585)){
var statearr_16657_18097 = state_16647__$1;
(statearr_16657_18097[(1)] = (5));

} else {
var statearr_16659_18102 = state_16647__$1;
(statearr_16659_18102[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (15))){
var state_16647__$1 = state_16647;
var statearr_16664_18112 = state_16647__$1;
(statearr_16664_18112[(2)] = null);

(statearr_16664_18112[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (21))){
var state_16647__$1 = state_16647;
var statearr_16666_18113 = state_16647__$1;
(statearr_16666_18113[(2)] = null);

(statearr_16666_18113[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (13))){
var inst_16595 = (state_16647[(8)]);
var inst_16598 = (state_16647[(9)]);
var inst_16597 = (state_16647[(10)]);
var inst_16596 = (state_16647[(12)]);
var inst_16606 = (state_16647[(2)]);
var inst_16607 = (inst_16598 + (1));
var tmp16660 = inst_16595;
var tmp16661 = inst_16597;
var tmp16662 = inst_16596;
var inst_16595__$1 = tmp16660;
var inst_16596__$1 = tmp16662;
var inst_16597__$1 = tmp16661;
var inst_16598__$1 = inst_16607;
var state_16647__$1 = (function (){var statearr_16669 = state_16647;
(statearr_16669[(14)] = inst_16606);

(statearr_16669[(8)] = inst_16595__$1);

(statearr_16669[(9)] = inst_16598__$1);

(statearr_16669[(10)] = inst_16597__$1);

(statearr_16669[(12)] = inst_16596__$1);

return statearr_16669;
})();
var statearr_16671_18114 = state_16647__$1;
(statearr_16671_18114[(2)] = null);

(statearr_16671_18114[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (22))){
var state_16647__$1 = state_16647;
var statearr_16672_18121 = state_16647__$1;
(statearr_16672_18121[(2)] = null);

(statearr_16672_18121[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (6))){
var inst_16584 = (state_16647[(13)]);
var inst_16593 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_16584) : f.call(null,inst_16584));
var inst_16594 = cljs.core.seq(inst_16593);
var inst_16595 = inst_16594;
var inst_16596 = null;
var inst_16597 = (0);
var inst_16598 = (0);
var state_16647__$1 = (function (){var statearr_16674 = state_16647;
(statearr_16674[(8)] = inst_16595);

(statearr_16674[(9)] = inst_16598);

(statearr_16674[(10)] = inst_16597);

(statearr_16674[(12)] = inst_16596);

return statearr_16674;
})();
var statearr_16675_18122 = state_16647__$1;
(statearr_16675_18122[(2)] = null);

(statearr_16675_18122[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (17))){
var inst_16610 = (state_16647[(7)]);
var inst_16616 = cljs.core.chunk_first(inst_16610);
var inst_16617 = cljs.core.chunk_rest(inst_16610);
var inst_16618 = cljs.core.count(inst_16616);
var inst_16595 = inst_16617;
var inst_16596 = inst_16616;
var inst_16597 = inst_16618;
var inst_16598 = (0);
var state_16647__$1 = (function (){var statearr_16678 = state_16647;
(statearr_16678[(8)] = inst_16595);

(statearr_16678[(9)] = inst_16598);

(statearr_16678[(10)] = inst_16597);

(statearr_16678[(12)] = inst_16596);

return statearr_16678;
})();
var statearr_16679_18137 = state_16647__$1;
(statearr_16679_18137[(2)] = null);

(statearr_16679_18137[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (3))){
var inst_16645 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16647__$1,inst_16645);
} else {
if((state_val_16648 === (12))){
var inst_16633 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
var statearr_16684_18140 = state_16647__$1;
(statearr_16684_18140[(2)] = inst_16633);

(statearr_16684_18140[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (2))){
var state_16647__$1 = state_16647;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16647__$1,(4),in$);
} else {
if((state_val_16648 === (23))){
var inst_16641 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
var statearr_16688_18143 = state_16647__$1;
(statearr_16688_18143[(2)] = inst_16641);

(statearr_16688_18143[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (19))){
var inst_16628 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
var statearr_16689_18144 = state_16647__$1;
(statearr_16689_18144[(2)] = inst_16628);

(statearr_16689_18144[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (11))){
var inst_16610 = (state_16647[(7)]);
var inst_16595 = (state_16647[(8)]);
var inst_16610__$1 = cljs.core.seq(inst_16595);
var state_16647__$1 = (function (){var statearr_16691 = state_16647;
(statearr_16691[(7)] = inst_16610__$1);

return statearr_16691;
})();
if(inst_16610__$1){
var statearr_16694_18153 = state_16647__$1;
(statearr_16694_18153[(1)] = (14));

} else {
var statearr_16697_18157 = state_16647__$1;
(statearr_16697_18157[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (9))){
var inst_16635 = (state_16647[(2)]);
var inst_16636 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_16647__$1 = (function (){var statearr_16700 = state_16647;
(statearr_16700[(15)] = inst_16635);

return statearr_16700;
})();
if(cljs.core.truth_(inst_16636)){
var statearr_16701_18158 = state_16647__$1;
(statearr_16701_18158[(1)] = (21));

} else {
var statearr_16703_18159 = state_16647__$1;
(statearr_16703_18159[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (5))){
var inst_16587 = cljs.core.async.close_BANG_(out);
var state_16647__$1 = state_16647;
var statearr_16704_18160 = state_16647__$1;
(statearr_16704_18160[(2)] = inst_16587);

(statearr_16704_18160[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (14))){
var inst_16610 = (state_16647[(7)]);
var inst_16613 = cljs.core.chunked_seq_QMARK_(inst_16610);
var state_16647__$1 = state_16647;
if(inst_16613){
var statearr_16708_18161 = state_16647__$1;
(statearr_16708_18161[(1)] = (17));

} else {
var statearr_16709_18162 = state_16647__$1;
(statearr_16709_18162[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (16))){
var inst_16631 = (state_16647[(2)]);
var state_16647__$1 = state_16647;
var statearr_16711_18163 = state_16647__$1;
(statearr_16711_18163[(2)] = inst_16631);

(statearr_16711_18163[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16648 === (10))){
var inst_16598 = (state_16647[(9)]);
var inst_16596 = (state_16647[(12)]);
var inst_16604 = cljs.core._nth(inst_16596,inst_16598);
var state_16647__$1 = state_16647;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16647__$1,(13),out,inst_16604);
} else {
if((state_val_16648 === (18))){
var inst_16610 = (state_16647[(7)]);
var inst_16621 = cljs.core.first(inst_16610);
var state_16647__$1 = state_16647;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16647__$1,(20),out,inst_16621);
} else {
if((state_val_16648 === (8))){
var inst_16598 = (state_16647[(9)]);
var inst_16597 = (state_16647[(10)]);
var inst_16601 = (inst_16598 < inst_16597);
var inst_16602 = inst_16601;
var state_16647__$1 = state_16647;
if(cljs.core.truth_(inst_16602)){
var statearr_16719_18167 = state_16647__$1;
(statearr_16719_18167[(1)] = (10));

} else {
var statearr_16720_18168 = state_16647__$1;
(statearr_16720_18168[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0 = (function (){
var statearr_16727 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16727[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__);

(statearr_16727[(1)] = (1));

return statearr_16727;
});
var cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1 = (function (state_16647){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16647);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16730){var ex__13968__auto__ = e16730;
var statearr_16731_18174 = state_16647;
(statearr_16731_18174[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16647[(4)]))){
var statearr_16733_18175 = state_16647;
(statearr_16733_18175[(1)] = cljs.core.first((state_16647[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18176 = state_16647;
state_16647 = G__18176;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__ = function(state_16647){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1.call(this,state_16647);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__13953__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16737 = f__14282__auto__();
(statearr_16737[(6)] = c__14281__auto__);

return statearr_16737;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

return c__14281__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__16744 = arguments.length;
switch (G__16744) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__16757 = arguments.length;
switch (G__16757) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__16769 = arguments.length;
switch (G__16769) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___18187 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16813){
var state_val_16814 = (state_16813[(1)]);
if((state_val_16814 === (7))){
var inst_16804 = (state_16813[(2)]);
var state_16813__$1 = state_16813;
var statearr_16819_18192 = state_16813__$1;
(statearr_16819_18192[(2)] = inst_16804);

(statearr_16819_18192[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (1))){
var inst_16780 = null;
var state_16813__$1 = (function (){var statearr_16823 = state_16813;
(statearr_16823[(7)] = inst_16780);

return statearr_16823;
})();
var statearr_16824_18194 = state_16813__$1;
(statearr_16824_18194[(2)] = null);

(statearr_16824_18194[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (4))){
var inst_16785 = (state_16813[(8)]);
var inst_16785__$1 = (state_16813[(2)]);
var inst_16787 = (inst_16785__$1 == null);
var inst_16788 = cljs.core.not(inst_16787);
var state_16813__$1 = (function (){var statearr_16826 = state_16813;
(statearr_16826[(8)] = inst_16785__$1);

return statearr_16826;
})();
if(inst_16788){
var statearr_16831_18195 = state_16813__$1;
(statearr_16831_18195[(1)] = (5));

} else {
var statearr_16832_18196 = state_16813__$1;
(statearr_16832_18196[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (6))){
var state_16813__$1 = state_16813;
var statearr_16836_18197 = state_16813__$1;
(statearr_16836_18197[(2)] = null);

(statearr_16836_18197[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (3))){
var inst_16809 = (state_16813[(2)]);
var inst_16810 = cljs.core.async.close_BANG_(out);
var state_16813__$1 = (function (){var statearr_16839 = state_16813;
(statearr_16839[(9)] = inst_16809);

return statearr_16839;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16813__$1,inst_16810);
} else {
if((state_val_16814 === (2))){
var state_16813__$1 = state_16813;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16813__$1,(4),ch);
} else {
if((state_val_16814 === (11))){
var inst_16785 = (state_16813[(8)]);
var inst_16796 = (state_16813[(2)]);
var inst_16780 = inst_16785;
var state_16813__$1 = (function (){var statearr_16845 = state_16813;
(statearr_16845[(10)] = inst_16796);

(statearr_16845[(7)] = inst_16780);

return statearr_16845;
})();
var statearr_16849_18198 = state_16813__$1;
(statearr_16849_18198[(2)] = null);

(statearr_16849_18198[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (9))){
var inst_16785 = (state_16813[(8)]);
var state_16813__$1 = state_16813;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16813__$1,(11),out,inst_16785);
} else {
if((state_val_16814 === (5))){
var inst_16785 = (state_16813[(8)]);
var inst_16780 = (state_16813[(7)]);
var inst_16790 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_16785,inst_16780);
var state_16813__$1 = state_16813;
if(inst_16790){
var statearr_16859_18203 = state_16813__$1;
(statearr_16859_18203[(1)] = (8));

} else {
var statearr_16860_18204 = state_16813__$1;
(statearr_16860_18204[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (10))){
var inst_16800 = (state_16813[(2)]);
var state_16813__$1 = state_16813;
var statearr_16864_18205 = state_16813__$1;
(statearr_16864_18205[(2)] = inst_16800);

(statearr_16864_18205[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16814 === (8))){
var inst_16780 = (state_16813[(7)]);
var tmp16854 = inst_16780;
var inst_16780__$1 = tmp16854;
var state_16813__$1 = (function (){var statearr_16866 = state_16813;
(statearr_16866[(7)] = inst_16780__$1);

return statearr_16866;
})();
var statearr_16867_18207 = state_16813__$1;
(statearr_16867_18207[(2)] = null);

(statearr_16867_18207[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_16875 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16875[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_16875[(1)] = (1));

return statearr_16875;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16813){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16813);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e16879){var ex__13968__auto__ = e16879;
var statearr_16880_18211 = state_16813;
(statearr_16880_18211[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16813[(4)]))){
var statearr_16882_18212 = state_16813;
(statearr_16882_18212[(1)] = cljs.core.first((state_16813[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18213 = state_16813;
state_16813 = G__18213;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16813){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16813);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_16892 = f__14282__auto__();
(statearr_16892[(6)] = c__14281__auto___18187);

return statearr_16892;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__16898 = arguments.length;
switch (G__16898) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___18215 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_16975){
var state_val_16976 = (state_16975[(1)]);
if((state_val_16976 === (7))){
var inst_16970 = (state_16975[(2)]);
var state_16975__$1 = state_16975;
var statearr_16982_18216 = state_16975__$1;
(statearr_16982_18216[(2)] = inst_16970);

(statearr_16982_18216[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (1))){
var inst_16929 = (new Array(n));
var inst_16930 = inst_16929;
var inst_16931 = (0);
var state_16975__$1 = (function (){var statearr_16986 = state_16975;
(statearr_16986[(7)] = inst_16930);

(statearr_16986[(8)] = inst_16931);

return statearr_16986;
})();
var statearr_16989_18221 = state_16975__$1;
(statearr_16989_18221[(2)] = null);

(statearr_16989_18221[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (4))){
var inst_16934 = (state_16975[(9)]);
var inst_16934__$1 = (state_16975[(2)]);
var inst_16936 = (inst_16934__$1 == null);
var inst_16937 = cljs.core.not(inst_16936);
var state_16975__$1 = (function (){var statearr_16992 = state_16975;
(statearr_16992[(9)] = inst_16934__$1);

return statearr_16992;
})();
if(inst_16937){
var statearr_17016_18225 = state_16975__$1;
(statearr_17016_18225[(1)] = (5));

} else {
var statearr_17021_18226 = state_16975__$1;
(statearr_17021_18226[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (15))){
var inst_16964 = (state_16975[(2)]);
var state_16975__$1 = state_16975;
var statearr_17024_18227 = state_16975__$1;
(statearr_17024_18227[(2)] = inst_16964);

(statearr_17024_18227[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (13))){
var state_16975__$1 = state_16975;
var statearr_17027_18228 = state_16975__$1;
(statearr_17027_18228[(2)] = null);

(statearr_17027_18228[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (6))){
var inst_16931 = (state_16975[(8)]);
var inst_16960 = (inst_16931 > (0));
var state_16975__$1 = state_16975;
if(cljs.core.truth_(inst_16960)){
var statearr_17032_18229 = state_16975__$1;
(statearr_17032_18229[(1)] = (12));

} else {
var statearr_17033_18230 = state_16975__$1;
(statearr_17033_18230[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (3))){
var inst_16972 = (state_16975[(2)]);
var state_16975__$1 = state_16975;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16975__$1,inst_16972);
} else {
if((state_val_16976 === (12))){
var inst_16930 = (state_16975[(7)]);
var inst_16962 = cljs.core.vec(inst_16930);
var state_16975__$1 = state_16975;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16975__$1,(15),out,inst_16962);
} else {
if((state_val_16976 === (2))){
var state_16975__$1 = state_16975;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16975__$1,(4),ch);
} else {
if((state_val_16976 === (11))){
var inst_16953 = (state_16975[(2)]);
var inst_16955 = (new Array(n));
var inst_16930 = inst_16955;
var inst_16931 = (0);
var state_16975__$1 = (function (){var statearr_17042 = state_16975;
(statearr_17042[(10)] = inst_16953);

(statearr_17042[(7)] = inst_16930);

(statearr_17042[(8)] = inst_16931);

return statearr_17042;
})();
var statearr_17044_18234 = state_16975__$1;
(statearr_17044_18234[(2)] = null);

(statearr_17044_18234[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (9))){
var inst_16930 = (state_16975[(7)]);
var inst_16951 = cljs.core.vec(inst_16930);
var state_16975__$1 = state_16975;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16975__$1,(11),out,inst_16951);
} else {
if((state_val_16976 === (5))){
var inst_16942 = (state_16975[(11)]);
var inst_16930 = (state_16975[(7)]);
var inst_16931 = (state_16975[(8)]);
var inst_16934 = (state_16975[(9)]);
var inst_16940 = (inst_16930[inst_16931] = inst_16934);
var inst_16942__$1 = (inst_16931 + (1));
var inst_16944 = (inst_16942__$1 < n);
var state_16975__$1 = (function (){var statearr_17052 = state_16975;
(statearr_17052[(11)] = inst_16942__$1);

(statearr_17052[(12)] = inst_16940);

return statearr_17052;
})();
if(cljs.core.truth_(inst_16944)){
var statearr_17053_18235 = state_16975__$1;
(statearr_17053_18235[(1)] = (8));

} else {
var statearr_17055_18236 = state_16975__$1;
(statearr_17055_18236[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (14))){
var inst_16967 = (state_16975[(2)]);
var inst_16968 = cljs.core.async.close_BANG_(out);
var state_16975__$1 = (function (){var statearr_17058 = state_16975;
(statearr_17058[(13)] = inst_16967);

return statearr_17058;
})();
var statearr_17061_18237 = state_16975__$1;
(statearr_17061_18237[(2)] = inst_16968);

(statearr_17061_18237[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (10))){
var inst_16958 = (state_16975[(2)]);
var state_16975__$1 = state_16975;
var statearr_17064_18238 = state_16975__$1;
(statearr_17064_18238[(2)] = inst_16958);

(statearr_17064_18238[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16976 === (8))){
var inst_16942 = (state_16975[(11)]);
var inst_16930 = (state_16975[(7)]);
var tmp17057 = inst_16930;
var inst_16930__$1 = tmp17057;
var inst_16931 = inst_16942;
var state_16975__$1 = (function (){var statearr_17066 = state_16975;
(statearr_17066[(7)] = inst_16930__$1);

(statearr_17066[(8)] = inst_16931);

return statearr_17066;
})();
var statearr_17068_18239 = state_16975__$1;
(statearr_17068_18239[(2)] = null);

(statearr_17068_18239[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_17072 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17072[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_17072[(1)] = (1));

return statearr_17072;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_16975){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_16975);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e17074){var ex__13968__auto__ = e17074;
var statearr_17075_18240 = state_16975;
(statearr_17075_18240[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_16975[(4)]))){
var statearr_17079_18241 = state_16975;
(statearr_17079_18241[(1)] = cljs.core.first((state_16975[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18242 = state_16975;
state_16975 = G__18242;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_16975){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_16975);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_17083 = f__14282__auto__();
(statearr_17083[(6)] = c__14281__auto___18215);

return statearr_17083;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__17085 = arguments.length;
switch (G__17085) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__14281__auto___18250 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_17138){
var state_val_17139 = (state_17138[(1)]);
if((state_val_17139 === (7))){
var inst_17133 = (state_17138[(2)]);
var state_17138__$1 = state_17138;
var statearr_17142_18252 = state_17138__$1;
(statearr_17142_18252[(2)] = inst_17133);

(statearr_17142_18252[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (1))){
var inst_17089 = [];
var inst_17090 = inst_17089;
var inst_17091 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_17138__$1 = (function (){var statearr_17146 = state_17138;
(statearr_17146[(7)] = inst_17091);

(statearr_17146[(8)] = inst_17090);

return statearr_17146;
})();
var statearr_17147_18257 = state_17138__$1;
(statearr_17147_18257[(2)] = null);

(statearr_17147_18257[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (4))){
var inst_17094 = (state_17138[(9)]);
var inst_17094__$1 = (state_17138[(2)]);
var inst_17096 = (inst_17094__$1 == null);
var inst_17097 = cljs.core.not(inst_17096);
var state_17138__$1 = (function (){var statearr_17149 = state_17138;
(statearr_17149[(9)] = inst_17094__$1);

return statearr_17149;
})();
if(inst_17097){
var statearr_17150_18262 = state_17138__$1;
(statearr_17150_18262[(1)] = (5));

} else {
var statearr_17151_18263 = state_17138__$1;
(statearr_17151_18263[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (15))){
var inst_17090 = (state_17138[(8)]);
var inst_17124 = cljs.core.vec(inst_17090);
var state_17138__$1 = state_17138;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17138__$1,(18),out,inst_17124);
} else {
if((state_val_17139 === (13))){
var inst_17118 = (state_17138[(2)]);
var state_17138__$1 = state_17138;
var statearr_17153_18267 = state_17138__$1;
(statearr_17153_18267[(2)] = inst_17118);

(statearr_17153_18267[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (6))){
var inst_17090 = (state_17138[(8)]);
var inst_17121 = inst_17090.length;
var inst_17122 = (inst_17121 > (0));
var state_17138__$1 = state_17138;
if(cljs.core.truth_(inst_17122)){
var statearr_17154_18268 = state_17138__$1;
(statearr_17154_18268[(1)] = (15));

} else {
var statearr_17157_18269 = state_17138__$1;
(statearr_17157_18269[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (17))){
var inst_17129 = (state_17138[(2)]);
var inst_17131 = cljs.core.async.close_BANG_(out);
var state_17138__$1 = (function (){var statearr_17158 = state_17138;
(statearr_17158[(10)] = inst_17129);

return statearr_17158;
})();
var statearr_17159_18270 = state_17138__$1;
(statearr_17159_18270[(2)] = inst_17131);

(statearr_17159_18270[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (3))){
var inst_17135 = (state_17138[(2)]);
var state_17138__$1 = state_17138;
return cljs.core.async.impl.ioc_helpers.return_chan(state_17138__$1,inst_17135);
} else {
if((state_val_17139 === (12))){
var inst_17090 = (state_17138[(8)]);
var inst_17111 = cljs.core.vec(inst_17090);
var state_17138__$1 = state_17138;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_17138__$1,(14),out,inst_17111);
} else {
if((state_val_17139 === (2))){
var state_17138__$1 = state_17138;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_17138__$1,(4),ch);
} else {
if((state_val_17139 === (11))){
var inst_17094 = (state_17138[(9)]);
var inst_17100 = (state_17138[(11)]);
var inst_17090 = (state_17138[(8)]);
var inst_17108 = inst_17090.push(inst_17094);
var tmp17161 = inst_17090;
var inst_17090__$1 = tmp17161;
var inst_17091 = inst_17100;
var state_17138__$1 = (function (){var statearr_17163 = state_17138;
(statearr_17163[(12)] = inst_17108);

(statearr_17163[(7)] = inst_17091);

(statearr_17163[(8)] = inst_17090__$1);

return statearr_17163;
})();
var statearr_17165_18271 = state_17138__$1;
(statearr_17165_18271[(2)] = null);

(statearr_17165_18271[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (9))){
var inst_17091 = (state_17138[(7)]);
var inst_17104 = cljs.core.keyword_identical_QMARK_(inst_17091,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_17138__$1 = state_17138;
var statearr_17168_18275 = state_17138__$1;
(statearr_17168_18275[(2)] = inst_17104);

(statearr_17168_18275[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (5))){
var inst_17094 = (state_17138[(9)]);
var inst_17101 = (state_17138[(13)]);
var inst_17100 = (state_17138[(11)]);
var inst_17091 = (state_17138[(7)]);
var inst_17100__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_17094) : f.call(null,inst_17094));
var inst_17101__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_17100__$1,inst_17091);
var state_17138__$1 = (function (){var statearr_17171 = state_17138;
(statearr_17171[(13)] = inst_17101__$1);

(statearr_17171[(11)] = inst_17100__$1);

return statearr_17171;
})();
if(inst_17101__$1){
var statearr_17172_18279 = state_17138__$1;
(statearr_17172_18279[(1)] = (8));

} else {
var statearr_17173_18280 = state_17138__$1;
(statearr_17173_18280[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (14))){
var inst_17094 = (state_17138[(9)]);
var inst_17100 = (state_17138[(11)]);
var inst_17113 = (state_17138[(2)]);
var inst_17114 = [];
var inst_17115 = inst_17114.push(inst_17094);
var inst_17090 = inst_17114;
var inst_17091 = inst_17100;
var state_17138__$1 = (function (){var statearr_17174 = state_17138;
(statearr_17174[(14)] = inst_17113);

(statearr_17174[(15)] = inst_17115);

(statearr_17174[(7)] = inst_17091);

(statearr_17174[(8)] = inst_17090);

return statearr_17174;
})();
var statearr_17177_18283 = state_17138__$1;
(statearr_17177_18283[(2)] = null);

(statearr_17177_18283[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (16))){
var state_17138__$1 = state_17138;
var statearr_17179_18288 = state_17138__$1;
(statearr_17179_18288[(2)] = null);

(statearr_17179_18288[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (10))){
var inst_17106 = (state_17138[(2)]);
var state_17138__$1 = state_17138;
if(cljs.core.truth_(inst_17106)){
var statearr_17180_18289 = state_17138__$1;
(statearr_17180_18289[(1)] = (11));

} else {
var statearr_17181_18291 = state_17138__$1;
(statearr_17181_18291[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (18))){
var inst_17126 = (state_17138[(2)]);
var state_17138__$1 = state_17138;
var statearr_17182_18292 = state_17138__$1;
(statearr_17182_18292[(2)] = inst_17126);

(statearr_17182_18292[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17139 === (8))){
var inst_17101 = (state_17138[(13)]);
var state_17138__$1 = state_17138;
var statearr_17190_18293 = state_17138__$1;
(statearr_17190_18293[(2)] = inst_17101);

(statearr_17190_18293[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__13953__auto__ = null;
var cljs$core$async$state_machine__13953__auto____0 = (function (){
var statearr_17207 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17207[(0)] = cljs$core$async$state_machine__13953__auto__);

(statearr_17207[(1)] = (1));

return statearr_17207;
});
var cljs$core$async$state_machine__13953__auto____1 = (function (state_17138){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_17138);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e17209){var ex__13968__auto__ = e17209;
var statearr_17210_18294 = state_17138;
(statearr_17210_18294[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_17138[(4)]))){
var statearr_17211_18295 = state_17138;
(statearr_17211_18295[(1)] = cljs.core.first((state_17138[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18300 = state_17138;
state_17138 = G__18300;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
cljs$core$async$state_machine__13953__auto__ = function(state_17138){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__13953__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__13953__auto____1.call(this,state_17138);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__13953__auto____0;
cljs$core$async$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__13953__auto____1;
return cljs$core$async$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_17215 = f__14282__auto__();
(statearr_17215[(6)] = c__14281__auto___18250);

return statearr_17215;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);

Object.defineProperty(module.exports, "Pub", { enumerable: false, get: function() { return cljs.core.async.Pub; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async15677", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async15677; } });
Object.defineProperty(module.exports, "reduce", { enumerable: false, get: function() { return cljs.core.async.reduce; } });
Object.defineProperty(module.exports, "remove_GT_", { enumerable: false, get: function() { return cljs.core.async.remove_GT_; } });
Object.defineProperty(module.exports, "timeout", { enumerable: false, get: function() { return cljs.core.async.timeout; } });
Object.defineProperty(module.exports, "unsub_STAR_", { enumerable: false, get: function() { return cljs.core.async.unsub_STAR_; } });
Object.defineProperty(module.exports, "admix_STAR_", { enumerable: false, get: function() { return cljs.core.async.admix_STAR_; } });
Object.defineProperty(module.exports, "unmix_STAR_", { enumerable: false, get: function() { return cljs.core.async.unmix_STAR_; } });
Object.defineProperty(module.exports, "mapcat_STAR_", { enumerable: false, get: function() { return cljs.core.async.mapcat_STAR_; } });
Object.defineProperty(module.exports, "t_cljs$core$async15677", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async15677; } });
Object.defineProperty(module.exports, "mix", { enumerable: false, get: function() { return cljs.core.async.mix; } });
Object.defineProperty(module.exports, "pub", { enumerable: false, get: function() { return cljs.core.async.pub; } });
Object.defineProperty(module.exports, "take", { enumerable: false, get: function() { return cljs.core.async.take; } });
Object.defineProperty(module.exports, "t_cljs$core$async16464", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async16464; } });
Object.defineProperty(module.exports, "unsub_all_STAR_", { enumerable: false, get: function() { return cljs.core.async.unsub_all_STAR_; } });
Object.defineProperty(module.exports, "_LT__BANG_", { enumerable: false, get: function() { return cljs.core.async._LT__BANG_; } });
Object.defineProperty(module.exports, "map", { enumerable: false, get: function() { return cljs.core.async.map; } });
Object.defineProperty(module.exports, "Mux", { enumerable: false, get: function() { return cljs.core.async.Mux; } });
Object.defineProperty(module.exports, "mapcat_GT_", { enumerable: false, get: function() { return cljs.core.async.mapcat_GT_; } });
Object.defineProperty(module.exports, "fhnop", { enumerable: false, get: function() { return cljs.core.async.fhnop; } });
Object.defineProperty(module.exports, "t_cljs$core$async16478", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async16478; } });
Object.defineProperty(module.exports, "buffer", { enumerable: false, get: function() { return cljs.core.async.buffer; } });
Object.defineProperty(module.exports, "close_BANG_", { enumerable: false, get: function() { return cljs.core.async.close_BANG_; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async14357", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async14357; } });
Object.defineProperty(module.exports, "offer_BANG_", { enumerable: false, get: function() { return cljs.core.async.offer_BANG_; } });
Object.defineProperty(module.exports, "chan", { enumerable: false, get: function() { return cljs.core.async.chan; } });
Object.defineProperty(module.exports, "solo_mode_STAR_", { enumerable: false, get: function() { return cljs.core.async.solo_mode_STAR_; } });
Object.defineProperty(module.exports, "onto_chan_BANG_", { enumerable: false, get: function() { return cljs.core.async.onto_chan_BANG_; } });
Object.defineProperty(module.exports, "tap", { enumerable: false, get: function() { return cljs.core.async.tap; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async15866", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async15866; } });
Object.defineProperty(module.exports, "admix", { enumerable: false, get: function() { return cljs.core.async.admix; } });
Object.defineProperty(module.exports, "promise_chan", { enumerable: false, get: function() { return cljs.core.async.promise_chan; } });
Object.defineProperty(module.exports, "unique", { enumerable: false, get: function() { return cljs.core.async.unique; } });
Object.defineProperty(module.exports, "muxch_STAR_", { enumerable: false, get: function() { return cljs.core.async.muxch_STAR_; } });
Object.defineProperty(module.exports, "solo_mode", { enumerable: false, get: function() { return cljs.core.async.solo_mode; } });
Object.defineProperty(module.exports, "transduce", { enumerable: false, get: function() { return cljs.core.async.transduce; } });
Object.defineProperty(module.exports, "onto_chan", { enumerable: false, get: function() { return cljs.core.async.onto_chan; } });
Object.defineProperty(module.exports, "to_chan", { enumerable: false, get: function() { return cljs.core.async.to_chan; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async15281", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async15281; } });
Object.defineProperty(module.exports, "dropping_buffer", { enumerable: false, get: function() { return cljs.core.async.dropping_buffer; } });
Object.defineProperty(module.exports, "untap_all", { enumerable: false, get: function() { return cljs.core.async.untap_all; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async16478", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async16478; } });
Object.defineProperty(module.exports, "into", { enumerable: false, get: function() { return cljs.core.async.into; } });
Object.defineProperty(module.exports, "to_chan_BANG_", { enumerable: false, get: function() { return cljs.core.async.to_chan_BANG_; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async14399", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async14399; } });
Object.defineProperty(module.exports, "t_cljs$core$async14395", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async14395; } });
Object.defineProperty(module.exports, "t_cljs$core$async16434", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async16434; } });
Object.defineProperty(module.exports, "t_cljs$core$async14399", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async14399; } });
Object.defineProperty(module.exports, "pipeline", { enumerable: false, get: function() { return cljs.core.async.pipeline; } });
Object.defineProperty(module.exports, "sub", { enumerable: false, get: function() { return cljs.core.async.sub; } });
Object.defineProperty(module.exports, "alt_flag", { enumerable: false, get: function() { return cljs.core.async.alt_flag; } });
Object.defineProperty(module.exports, "t_cljs$core$async16430", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async16430; } });
Object.defineProperty(module.exports, "map_GT_", { enumerable: false, get: function() { return cljs.core.async.map_GT_; } });
Object.defineProperty(module.exports, "pipeline_STAR_", { enumerable: false, get: function() { return cljs.core.async.pipeline_STAR_; } });
Object.defineProperty(module.exports, "pipe", { enumerable: false, get: function() { return cljs.core.async.pipe; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async14395", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async14395; } });
Object.defineProperty(module.exports, "unmix", { enumerable: false, get: function() { return cljs.core.async.unmix; } });
Object.defineProperty(module.exports, "filter_LT_", { enumerable: false, get: function() { return cljs.core.async.filter_LT_; } });
Object.defineProperty(module.exports, "sub_STAR_", { enumerable: false, get: function() { return cljs.core.async.sub_STAR_; } });
Object.defineProperty(module.exports, "remove_LT_", { enumerable: false, get: function() { return cljs.core.async.remove_LT_; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async16430", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async16430; } });
Object.defineProperty(module.exports, "untap_STAR_", { enumerable: false, get: function() { return cljs.core.async.untap_STAR_; } });
Object.defineProperty(module.exports, "t_cljs$core$async15281", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async15281; } });
Object.defineProperty(module.exports, "toggle", { enumerable: false, get: function() { return cljs.core.async.toggle; } });
Object.defineProperty(module.exports, "untap_all_STAR_", { enumerable: false, get: function() { return cljs.core.async.untap_all_STAR_; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async16434", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async16434; } });
Object.defineProperty(module.exports, "sliding_buffer", { enumerable: false, get: function() { return cljs.core.async.sliding_buffer; } });
Object.defineProperty(module.exports, "partition", { enumerable: false, get: function() { return cljs.core.async.partition; } });
Object.defineProperty(module.exports, "Mult", { enumerable: false, get: function() { return cljs.core.async.Mult; } });
Object.defineProperty(module.exports, "merge", { enumerable: false, get: function() { return cljs.core.async.merge; } });
Object.defineProperty(module.exports, "__GT_t_cljs$core$async16464", { enumerable: false, get: function() { return cljs.core.async.__GT_t_cljs$core$async16464; } });
Object.defineProperty(module.exports, "partition_by", { enumerable: false, get: function() { return cljs.core.async.partition_by; } });
Object.defineProperty(module.exports, "unsub_all", { enumerable: false, get: function() { return cljs.core.async.unsub_all; } });
Object.defineProperty(module.exports, "_GT__BANG_", { enumerable: false, get: function() { return cljs.core.async._GT__BANG_; } });
Object.defineProperty(module.exports, "unmix_all_STAR_", { enumerable: false, get: function() { return cljs.core.async.unmix_all_STAR_; } });
Object.defineProperty(module.exports, "nop", { enumerable: false, get: function() { return cljs.core.async.nop; } });
Object.defineProperty(module.exports, "split", { enumerable: false, get: function() { return cljs.core.async.split; } });
Object.defineProperty(module.exports, "unmix_all", { enumerable: false, get: function() { return cljs.core.async.unmix_all; } });
Object.defineProperty(module.exports, "filter_GT_", { enumerable: false, get: function() { return cljs.core.async.filter_GT_; } });
Object.defineProperty(module.exports, "tap_STAR_", { enumerable: false, get: function() { return cljs.core.async.tap_STAR_; } });
Object.defineProperty(module.exports, "untap", { enumerable: false, get: function() { return cljs.core.async.untap; } });
Object.defineProperty(module.exports, "alt_handler", { enumerable: false, get: function() { return cljs.core.async.alt_handler; } });
Object.defineProperty(module.exports, "alts_BANG_", { enumerable: false, get: function() { return cljs.core.async.alts_BANG_; } });
Object.defineProperty(module.exports, "unsub", { enumerable: false, get: function() { return cljs.core.async.unsub; } });
Object.defineProperty(module.exports, "poll_BANG_", { enumerable: false, get: function() { return cljs.core.async.poll_BANG_; } });
Object.defineProperty(module.exports, "map_LT_", { enumerable: false, get: function() { return cljs.core.async.map_LT_; } });
Object.defineProperty(module.exports, "fn_handler", { enumerable: false, get: function() { return cljs.core.async.fn_handler; } });
Object.defineProperty(module.exports, "do_alts", { enumerable: false, get: function() { return cljs.core.async.do_alts; } });
Object.defineProperty(module.exports, "random_array", { enumerable: false, get: function() { return cljs.core.async.random_array; } });
Object.defineProperty(module.exports, "pipeline_async", { enumerable: false, get: function() { return cljs.core.async.pipeline_async; } });
Object.defineProperty(module.exports, "Mix", { enumerable: false, get: function() { return cljs.core.async.Mix; } });
Object.defineProperty(module.exports, "t_cljs$core$async15866", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async15866; } });
Object.defineProperty(module.exports, "toggle_STAR_", { enumerable: false, get: function() { return cljs.core.async.toggle_STAR_; } });
Object.defineProperty(module.exports, "mult", { enumerable: false, get: function() { return cljs.core.async.mult; } });
Object.defineProperty(module.exports, "mapcat_LT_", { enumerable: false, get: function() { return cljs.core.async.mapcat_LT_; } });
Object.defineProperty(module.exports, "ioc_alts_BANG_", { enumerable: false, get: function() { return cljs.core.async.ioc_alts_BANG_; } });
Object.defineProperty(module.exports, "unblocking_buffer_QMARK_", { enumerable: false, get: function() { return cljs.core.async.unblocking_buffer_QMARK_; } });
Object.defineProperty(module.exports, "put_BANG_", { enumerable: false, get: function() { return cljs.core.async.put_BANG_; } });
Object.defineProperty(module.exports, "take_BANG_", { enumerable: false, get: function() { return cljs.core.async.take_BANG_; } });
Object.defineProperty(module.exports, "t_cljs$core$async14357", { enumerable: false, get: function() { return cljs.core.async.t_cljs$core$async14357; } });
//# sourceMappingURL=cljs.core.async.js.map
