var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./re_frame.events.js");
require("./re_frame.subs.js");
require("./re_frame.interop.js");
require("./re_frame.db.js");
require("./re_frame.fx.js");
require("./re_frame.cofx.js");
require("./re_frame.router.js");
require("./re_frame.settings.js");
require("./re_frame.loggers.js");
require("./re_frame.registrar.js");
require("./re_frame.interceptor.js");
require("./re_frame.std_interceptors.js");
require("./re_frame.utils.js");
require("./clojure.set.js");
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

$CLJS.SHADOW_ENV.setLoaded("re_frame.core.js");

goog.provide('re_frame.core');
/**
 * Queue `event` for processing (handling).
 * 
 *   `event` is a vector and the first element is typically a keyword
 *   which identifies the kind of event.
 * 
 *   The event will be added to a FIFO processing queue, so event
 *   handling does not happen immediately. It will happen 'very soon'
 *   bit not now. And if the queue already contains events, they
 *   will be processed first.
 * 
 *   Usage:
 * 
 *    #!clj
 *    (dispatch [:order "pizza" {:supreme 2 :meatlovers 1 :veg 1}])
 *   
 */
re_frame.core.dispatch = (function re_frame$core$dispatch(event){
return re_frame.router.dispatch(event);
});
/**
 * Synchronously (immediately) process `event`. It does **not** queue
 *   the event for handling later as `dispatch` does.
 * 
 *   `event` is a vector and the first element is typically a keyword
 *   which identifies the kind of event.
 * 
 *   It is an error to use `dispatch-sync` within an event handler because
 *   you can't immediately process an new event when one is already
 *   part way through being processed.
 * 
 *   Generally, avoid using this function, and instead, use `dispatch`.
 *   Only use it in the narrow set of cases where any delay in
 *   processing is a problem:
 * 
 *  1. the `:on-change` handler of a text field where we are expecting fast typing
 *  2. when initialising your app - see 'main' in examples/todomvc/src/core.cljs
 *  3. in a unit test where immediate, synchronous processing is useful
 * 
 *   Usage:
 * 
 *    #!clj
 *    (dispatch-sync [:sing :falsetto "piano accordion"])
 *   
 */
re_frame.core.dispatch_sync = (function re_frame$core$dispatch_sync(event){
return re_frame.router.dispatch_sync(event);
});
/**
 * Register the given event `handler` (function) for the given `id`. Optionally, provide
 *   an `interceptors` chain:
 * 
 *  - `id` is typically a namespaced keyword  (but can be anything)
 *  - `handler` is a function: (db event) -> db
 *  - `interceptors` is a collection of interceptors. Will be flattened and nils removed.
 * 
 *   Example Usage:
 * 
 *    #!clj
 *    (reg-event-db
 *      :token
 *      (fn [db event]
 *        (assoc db :some-key (get event 2)))  ;; return updated db
 * 
 *   Or perhaps:
 * 
 *    #!clj
 *    (reg-event-db
 *      :namespaced/id           ;; <-- namespaced keywords are often used
 *      [one two three]          ;; <-- a seq of interceptors
 *      (fn [db [_ arg1 arg2]]   ;; <-- event vector is destructured
 *        (-> db
 *          (dissoc arg1)
 *          (update :key + arg2))))   ;; return updated db
 *   
 */
re_frame.core.reg_event_db = (function re_frame$core$reg_event_db(var_args){
var G__23583 = arguments.length;
switch (G__23583) {
case 2:
return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2 = (function (id,handler){
return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$3(id,null,handler);
}));

(re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$3 = (function (id,interceptors,handler){
return re_frame.events.register(id,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.cofx.inject_db,re_frame.fx.do_fx,re_frame.std_interceptors.inject_global_interceptors,interceptors,re_frame.std_interceptors.db_handler__GT_interceptor(handler)], null));
}));

(re_frame.core.reg_event_db.cljs$lang$maxFixedArity = 3);

/**
 * Register the given event `handler` (function) for the given `id`. Optionally, provide
 *   an `interceptors` chain:
 * 
 *  - `id` is typically a namespaced keyword  (but can be anything)
 *  - `handler` is a function: (coeffects-map event-vector) -> effects-map
 *  - `interceptors` is a collection of interceptors. Will be flattened and nils removed.
 * 
 * 
 *   Example Usage:
 * 
 *    #!clj
 *    (reg-event-fx
 *      :event-id
 *      (fn [cofx event]
 *        {:db (assoc (:db cofx) :some-key (get event 2))}))   ;; return a map of effects
 * 
 * 
 *   Or perhaps:
 * 
 *    #!clj
 *    (reg-event-fx
 *      :namespaced/id           ;; <-- namespaced keywords are often used
 *      [one two three]          ;; <-- a seq of interceptors
 *      (fn [{:keys [db] :as cofx} [_ arg1 arg2]] ;; destructure both arguments
 *        {:db       (assoc db :some-key arg1)          ;; return a map of effects
 *         :dispatch [:some-event arg2]}))
 *   
 */
re_frame.core.reg_event_fx = (function re_frame$core$reg_event_fx(var_args){
var G__23585 = arguments.length;
switch (G__23585) {
case 2:
return re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2 = (function (id,handler){
return re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$3(id,null,handler);
}));

(re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$3 = (function (id,interceptors,handler){
return re_frame.events.register(id,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.cofx.inject_db,re_frame.fx.do_fx,re_frame.std_interceptors.inject_global_interceptors,interceptors,re_frame.std_interceptors.fx_handler__GT_interceptor(handler)], null));
}));

(re_frame.core.reg_event_fx.cljs$lang$maxFixedArity = 3);

/**
 * Register the given event `handler` (function) for the given `id`. Optionally, provide
 *   an `interceptors` chain:
 * 
 *  - `id` is typically a namespaced keyword  (but can be anything)
 *  - `handler` is a function: context-map -> context-map
 * 
 *   You can explore what is provided in `context` [here](https://day8.github.io/re-frame/Interceptors/#what-is-context).
 * 
 *   Example Usage:
 * 
 *    #!clj
 *    (reg-event-ctx
 *      :event-id
 *      (fn [{:keys [coeffects] :as context}]
 *        (let [initial  {:db     (:db coeffects)
 *                        :event  (:event coeffects)
 *                        :fx     []}
 *              result   (-> initial
 *                           function1
 *                           function2
 *                           function3)
 *              effects  (select-keys result [:db :fx])]
 *           (assoc context :effects effects))))
 *   
 */
re_frame.core.reg_event_ctx = (function re_frame$core$reg_event_ctx(var_args){
var G__23587 = arguments.length;
switch (G__23587) {
case 2:
return re_frame.core.reg_event_ctx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frame.core.reg_event_ctx.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.reg_event_ctx.cljs$core$IFn$_invoke$arity$2 = (function (id,handler){
return re_frame.core.reg_event_ctx.cljs$core$IFn$_invoke$arity$3(id,null,handler);
}));

(re_frame.core.reg_event_ctx.cljs$core$IFn$_invoke$arity$3 = (function (id,interceptors,handler){
return re_frame.events.register(id,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frame.cofx.inject_db,re_frame.fx.do_fx,re_frame.std_interceptors.inject_global_interceptors,interceptors,re_frame.std_interceptors.ctx_handler__GT_interceptor(handler)], null));
}));

(re_frame.core.reg_event_ctx.cljs$lang$maxFixedArity = 3);

/**
 * Unregisters event handlers (presumably registered previously via the use of `reg-event-db` or `reg-event-fx`).
 * 
 *   When called with no args, it will unregister all currently registered event handlers.
 * 
 *   When given one arg, assumed to be the `id` of a previously registered
 *   event handler, it will unregister the associated handler. Will produce a warning to
 *   console if it finds no matching registration.
 */
re_frame.core.clear_event = (function re_frame$core$clear_event(var_args){
var G__23589 = arguments.length;
switch (G__23589) {
case 0:
return re_frame.core.clear_event.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return re_frame.core.clear_event.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.clear_event.cljs$core$IFn$_invoke$arity$0 = (function (){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1(re_frame.events.kind);
}));

(re_frame.core.clear_event.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2(re_frame.events.kind,id);
}));

(re_frame.core.clear_event.cljs$lang$maxFixedArity = 1);

/**
 * A call to `reg-sub` associates a `query-id` WITH two functions.
 * 
 *   The two functions provide 'a mechanism' for creating a node
 *   in the Signal Graph. When a node of type `query-id` is needed,
 *   the two functions can be used to create it.
 * 
 *   The three arguments are:
 * 
 *   - `query-id` - typically a namespaced keyword (later used in subscribe)
 *   - optionally, an `input signals` function which returns the input data
 *  flows required by this kind of node.
 *   - a `computation function` which computes the value (output) of the
 *  node (from the input data flows)
 * 
 *   Later, during app execution, a call to `(subscribe [:sub-id 3 :blue])`,
 *   will trigger the need for a new `:sub-id` Signal Graph node (matching the
 *   query `[:sub-id 3 :blue]`). And, to create that node the two functions
 *   associated with `:sub-id` will be looked up and used.
 * 
 *   Just to be clear: calling `reg-sub` does not immediately create a node.
 *   It only registers 'a mechanism' (the two functions) by which nodes
 *   can be created later, when a node is bought into existence by the
 *   use of `subscribe` in a `View Function`.
 * 
 *   The `computation function` is expected to take two arguments:
 * 
 *  - `input-values` - the values which flow into this node (how is it wierd into the graph?)
 *  - `query-vector` - the vector given to `subscribe`
 * 
 *   and it returns a computed value (which then becomes the output of the node)
 * 
 *   When `computation function` is called, the 2nd `query-vector` argument will be that
 *   vector supplied to the `subscribe`. So, if the call was `(subscribe [:sub-id 3 :blue])`,
 *   then the `query-vector` supplied to the computaton function will be `[:sub-id 3 :blue]`.
 * 
 *   The argument(s) supplied to `reg-sub` between `query-id` and the `computation-function`
 *   can vary in 3 ways, but whatever is there defines the `input signals` part
 *   of `the mechanism`, specifying what input values "flow into" the
 *   `computation function` (as the 1st argument) when it is called.
 * 
 *   So, `reg-sub` can be called in one of three ways, because there are three ways
 *   to define the input signals part. But note, the 2nd method, in which a
 *   `signals function` is explicitly supplied, is the most canonical and
 *   instructive. The other two are really just sugary variations.
 * 
 *   **First variation** - no input signal function given:
 * 
 *    #!clj
 *    (reg-sub
 *      :query-id
 *      a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
 * 
 *   In the absence of an explicit `signals function`, the node's input signal defaults to `app-db`
 *   and, as a result, the value within `app-db` (a map) is
 *   is given as the 1st argument when `a-computation-fn` is called.
 * 
 * 
 *   **Second variation** - a signal function is explicitly supplied:
 * 
 *    #!clj
 *    (reg-sub
 *      :query-id
 *      signal-fn     ;; <-- here
 *      computation-fn)
 * 
 *   This is the most canonical and instructive of the three variations.
 * 
 *   When a node is created from the template, the `signal function` will be called and it
 *   is expected to return the input signal(s) as either a singleton, if there is only
 *   one, or a sequence if there are many, or a map with the signals as the values.
 * 
 *   The current values of the returned signals will be supplied as the 1st argument to
 *   the `a-computation-fn` when it is called - and subject to what this `signal-fn` returns,
 *   this value will be either a singleton, sequence or map of them (paralleling
 *   the structure returned by the `signal function`).
 * 
 *   This example `signal function` returns a 2-vector of input signals.
 * 
 *    #!clj
 *    (fn [query-vec dynamic-vec]
 *       [(subscribe [:a-sub])
 *        (subscribe [:b-sub])])
 * 
 *   The associated computation function must be written
 *   to expect a 2-vector of values for its first argument:
 * 
 *    #!clj
 *    (fn [[a b] query-vec]     ;; 1st argument is a seq of two values
 *      ....)
 * 
 *   If, on the other hand, the signal function was simpler and returned a singleton, like this:
 * 
 *    #!clj
 *    (fn [query-vec dynamic-vec]
 *      (subscribe [:a-sub]))      ;; <-- returning a singleton
 * 
 *   then the associated computation function must be written to expect a single value
 *   as the 1st argument:
 * 
 *    #!clj
 *    (fn [a query-vec]       ;; 1st argument is a single value
 *       ...)
 * 
 *   Further Note: variation #1 above, in which an `input-fn` was not supplied, like this:
 * 
 *    #!clj
 *    (reg-sub
 *      :query-id
 *      a-computation-fn)   ;; has signature:  (fn [db query-vec]  ... ret-value)
 * 
 *   is the equivalent of using this
 *   2nd variation and explicitly suppling a `signal-fn` which returns `app-db`:
 * 
 *    #!clj
 *    (reg-sub
 *      :query-id
 *      (fn [_ _]  re-frame/app-db)   ;; <--- explicit signal-fn
 *      a-computation-fn)             ;; has signature:  (fn [db query-vec]  ... ret-value)
 * 
 *   **Third variation** - syntax Sugar
 * 
 *    #!clj
 *    (reg-sub
 *      :a-b-sub
 *      :<- [:a-sub]
 *      :<- [:b-sub]
 *      (fn [[a b] query-vec]    ;; 1st argument is a seq of two values
 *        {:a a :b b}))
 * 
 *   This 3rd variation is just syntactic sugar for the 2nd.  Instead of providing an
 *   `signals-fn` you provide one or more pairs of `:<-` and a subscription vector.
 * 
 *   If you supply only one pair a singleton will be supplied to the computation function,
 *   as if you had supplied a `signal-fn` returning only a single value:
 * 
 *    #!clj
 *    (reg-sub
 *      :a-sub
 *      :<- [:a-sub]
 *      (fn [a query-vec]      ;; only one pair, so 1st argument is a single value
 *        ...))
 * 
 *   For further understanding, read the tutorials, and look at the detailed comments in
 *   /examples/todomvc/src/subs.cljs.
 * 
 *   See also: `subscribe`
 *   
 */
re_frame.core.reg_sub = (function re_frame$core$reg_sub(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23704 = arguments.length;
var i__5770__auto___23705 = (0);
while(true){
if((i__5770__auto___23705 < len__5769__auto___23704)){
args__5775__auto__.push((arguments[i__5770__auto___23705]));

var G__23707 = (i__5770__auto___23705 + (1));
i__5770__auto___23705 = G__23707;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic = (function (query_id,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.subs.reg_sub,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [query_id], null),args));
}));

(re_frame.core.reg_sub.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frame.core.reg_sub.cljs$lang$applyTo = (function (seq23592){
var G__23593 = cljs.core.first(seq23592);
var seq23592__$1 = cljs.core.next(seq23592);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23593,seq23592__$1);
}));

/**
 * Given a `query` vector, returns a Reagent `reaction` which will, over
 *   time, reactively deliver a stream of values. So, in FRP-ish terms,
 *   it returns a `Signal`.
 * 
 *   To obtain the current value from the Signal, it must be dereferenced:
 * 
 *    #!clj
 *    (let [signal (subscribe [:items])
 *          value  (deref signal)]     ;; could be written as @signal
 *      ...)
 * 
 * which is typically written tersely as simple:
 * 
 *    #!clj
 *    (let [items  @(subscribe [:items])]
 *      ...)
 * 
 * 
 *   `query` is a vector of at least one element. The first element is the
 *   `query-id`, typically a namespaced keyword. The rest of the vector's
 *   elements are optional, additional values which parameterise the query
 *   performed.
 * 
 *   `dynv` is an optional 3rd argument, which is a vector of further input
 *   signals (atoms, reactions, etc), NOT values. This argument exists for
 *   historical reasons and is borderline deprecated these days.
 * 
 *   **Example Usage**:
 * 
 *    #!clj
 *    (subscribe [:items])
 *    (subscribe [:items "blue" :small])
 *    (subscribe [:items {:colour "blue"  :size :small}])
 * 
 *   Note: for any given call to `subscribe` there must have been a previous call
 *   to `reg-sub`, registering the query handler (functions) associated with
 *   `query-id`.
 * 
 *   **Hint**
 * 
 *   When used in a view function BE SURE to `deref` the returned value.
 *   In fact, to avoid any mistakes, some prefer to define:
 * 
 *    #!clj
 *    (def <sub  (comp deref re-frame.core/subscribe))
 * 
 *   And then, within their views, they call  `(<sub [:items :small])` rather
 *   than using `subscribe` directly.
 * 
 *   **De-duplication**
 * 
 *   Two, or more, concurrent subscriptions for the same query will
 *   source reactive updates from the one executing handler.
 * 
 *   See also: `reg-sub`
 *   
 */
re_frame.core.subscribe = (function re_frame$core$subscribe(var_args){
var G__23599 = arguments.length;
switch (G__23599) {
case 1:
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1 = (function (query){
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$1(query);
}));

(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$2 = (function (query,dynv){
return re_frame.subs.subscribe.cljs$core$IFn$_invoke$arity$2(query,dynv);
}));

(re_frame.core.subscribe.cljs$lang$maxFixedArity = 2);

/**
 * Unregisters subscription handlers (presumably registered previously via the use of `reg-sub`).
 * 
 *   When called with no args, it will unregister all currently registered subscription handlers.
 * 
 *   When given one arg, assumed to be the `id` of a previously registered
 *   subscription handler, it will unregister the associated handler. Will produce a warning to
 *   console if it finds no matching registration.
 * 
 *   NOTE: Depending on the usecase, it may be necessary to call `clear-subscription-cache!` afterwards
 */
re_frame.core.clear_sub = (function re_frame$core$clear_sub(var_args){
var G__23602 = arguments.length;
switch (G__23602) {
case 0:
return re_frame.core.clear_sub.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return re_frame.core.clear_sub.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.clear_sub.cljs$core$IFn$_invoke$arity$0 = (function (){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1(re_frame.subs.kind);
}));

(re_frame.core.clear_sub.cljs$core$IFn$_invoke$arity$1 = (function (query_id){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2(re_frame.subs.kind,query_id);
}));

(re_frame.core.clear_sub.cljs$lang$maxFixedArity = 1);

/**
 * This is a low level, advanced function.  You should probably be
 *   using `reg-sub` instead.
 * 
 *   Some explanation is available in the docs at
 *   <a href="http://day8.github.io/re-frame/flow-mechanics/" target="_blank">http://day8.github.io/re-frame/flow-mechanics/</a>
 */
re_frame.core.reg_sub_raw = (function re_frame$core$reg_sub_raw(query_id,handler_fn){
return re_frame.registrar.register_handler(re_frame.subs.kind,query_id,handler_fn);
});
/**
 * Removes all subscriptions from the cache.
 * 
 *   This function can be used at development time or test time. Useful when hot realoding
 *   namespaces containing subscription handlers. Also call it after a React/render exception,
 *   because React components won't have been cleaned up properly. And this, in turn, means
 *   the subscriptions within those components won't have been cleaned up correctly. So this
 *   forces the issue.
 *   
 */
re_frame.core.clear_subscription_cache_BANG_ = (function re_frame$core$clear_subscription_cache_BANG_(){
return re_frame.subs.clear_subscription_cache_BANG_();
});
/**
 * Register the given effect `handler` for the given `id`:
 * 
 *  - `id` is keyword, often namespaced.
 *  - `handler` is a side-effecting function which takes a single argument and whose return
 *    value is ignored.
 * 
 *   To use, first, associate `:effect2` with a handler:
 * 
 *    #!clj
 *    (reg-fx
 *       :effect2
 *       (fn [value]
 *          ... do something side-effect-y))
 * 
 *   Then, later, if an event handler were to return this effects map:
 * 
 *    #!clj
 *    {:effect2  [1 2]}
 * 
 *   then the `handler` `fn` we registered previously, using `reg-fx`, will be
 *   called with an argument of `[1 2]`.
 *   
 */
re_frame.core.reg_fx = (function re_frame$core$reg_fx(id,handler){
return re_frame.fx.reg_fx(id,handler);
});
/**
 * Unregisters effect handlers (presumably registered previously via the use of `reg-fx`).
 * 
 *   When called with no args, it will unregister all currently registered effect handlers.
 * 
 *   When given one arg, assumed to be the `id` of a previously registered
 *   effect handler, it will unregister the associated handler. Will produce a warning to
 *   console if it finds no matching registration.
 *   
 */
re_frame.core.clear_fx = (function re_frame$core$clear_fx(var_args){
var G__23605 = arguments.length;
switch (G__23605) {
case 0:
return re_frame.core.clear_fx.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return re_frame.core.clear_fx.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.clear_fx.cljs$core$IFn$_invoke$arity$0 = (function (){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind);
}));

(re_frame.core.clear_fx.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2(re_frame.fx.kind,id);
}));

(re_frame.core.clear_fx.cljs$lang$maxFixedArity = 1);

/**
 * Register the given coeffect `handler` for the given `id`, for later use
 *   within `inject-cofx`:
 * 
 *  - `id` is keyword, often namespaced.
 *  - `handler` is a function which takes either one or two arguements, the first of which is
 *     always `coeffects` and which returns an updated `coeffects`.
 * 
 *   See also: `inject-cofx`
 *   
 */
re_frame.core.reg_cofx = (function re_frame$core$reg_cofx(id,handler){
return re_frame.cofx.reg_cofx(id,handler);
});
/**
 * Given an `id`, and an optional, arbitrary `value`, returns an interceptor
 *   whose `:before` adds to the `:coeffects` (map) by calling a pre-registered
 *   'coeffect handler' identified by the `id`.
 * 
 *   The previous association of a `coeffect handler` with an `id` will have
 *   happened via a call to `re-frame.core/reg-cofx` - generally on program startup.
 * 
 *   Within the created interceptor, this 'looked up' `coeffect handler` will
 *   be called (within the `:before`) with two arguments:
 * 
 *   - the current value of `:coeffects`
 *   - optionally, the originally supplied arbitrary `value`
 * 
 *   This `coeffect handler` is expected to modify and return its first, `coeffects` argument.
 * 
 *   **Example of `inject-cofx` and `reg-cofx` working together**
 * 
 * 
 *   First - Early in app startup, you register a `coeffect handler` for `:datetime`:
 * 
 *    #!clj
 *    (re-frame.core/reg-cofx
 *      :datetime                        ;; usage  (inject-cofx :datetime)
 *      (fn coeffect-handler
 *        [coeffect]
 *        (assoc coeffect :now (js/Date.))))   ;; modify and return first arg
 * 
 *   Second - Later, add an interceptor to an -fx event handler, using `inject-cofx`:
 * 
 *    #!clj
 *    (re-frame.core/reg-event-fx            ;; when registering an event handler
 *      :event-id
 *      [ ... (inject-cofx :datetime) ... ]  ;; <-- create an injecting interceptor
 *      (fn event-handler
 *        [coeffect event]
 *          ;;... in here can access (:now coeffect) to obtain current datetime ...
 *        )))
 * 
 *   **Background**
 * 
 *   `coeffects` are the input resources required by an event handler
 *   to perform its job. The two most obvious ones are `db` and `event`.
 *   But sometimes an event handler might need other resources.
 * 
 *   Perhaps an event handler needs a random number or a GUID or the current
 *   datetime. Perhaps it needs access to a DataScript database connection.
 * 
 *   If an event handler directly accesses these resources, it stops being
 *   pure and, consequently, it becomes harder to test, etc. So we don't
 *   want that.
 * 
 *   Instead, the interceptor created by this function is a way to 'inject'
 *   'necessary resources' into the `:coeffects` (map) subsequently given
 *   to the event handler at call time.
 * 
 *   See also `reg-cofx`
 *   
 */
re_frame.core.inject_cofx = (function re_frame$core$inject_cofx(var_args){
var G__23609 = arguments.length;
switch (G__23609) {
case 1:
return re_frame.core.inject_cofx.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.core.inject_cofx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.inject_cofx.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$1(id);
}));

(re_frame.core.inject_cofx.cljs$core$IFn$_invoke$arity$2 = (function (id,value){
return re_frame.cofx.inject_cofx.cljs$core$IFn$_invoke$arity$2(id,value);
}));

(re_frame.core.inject_cofx.cljs$lang$maxFixedArity = 2);

/**
 * Unregisters coeffect handlers (presumably registered previously via the use of `reg-cofx`).
 * 
 *   When called with no args, it will unregister all currently registered coeffect handlers.
 * 
 *   When given one arg, assumed to be the `id` of a previously registered
 *   coeffect handler, it will unregister the associated handler. Will produce a warning to
 *   console if it finds no matching registration.
 */
re_frame.core.clear_cofx = (function re_frame$core$clear_cofx(var_args){
var G__23611 = arguments.length;
switch (G__23611) {
case 0:
return re_frame.core.clear_cofx.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return re_frame.core.clear_cofx.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.clear_cofx.cljs$core$IFn$_invoke$arity$0 = (function (){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$1(re_frame.cofx.kind);
}));

(re_frame.core.clear_cofx.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.registrar.clear_handlers.cljs$core$IFn$_invoke$arity$2(re_frame.cofx.kind,id);
}));

(re_frame.core.clear_cofx.cljs$lang$maxFixedArity = 1);

/**
 * An interceptor which logs/instruments an event handler's actions to
 *   `js/console.debug`. See examples/todomvc/src/events.cljs for use.
 * 
 *   Output includes:
 * 
 *  1. the event vector
 *  2. a `clojure.data/diff` of db, before vs after, which shows
 *     the changes caused by the event handler. To understand the output,
 *     you should understand:
 *     <a href="https://clojuredocs.org/clojure.data/diff" target="_blank">https://clojuredocs.org/clojure.data/diff</a>.
 * 
 *   You'd typically include this interceptor after (to the right of) any
 *   `path` interceptor.
 * 
 *   Warning:  calling `clojure.data/diff` on large, complex data structures
 *   can be slow. So, you won't want this interceptor present in production
 *   code. So, you should condition it out like this:
 * 
 *    #!clj
 *    (re-frame.core/reg-event-db
 *      :evt-id
 *      [(when ^boolean goog.DEBUG re-frame.core/debug)]  ;; <-- conditional
 *      (fn [db v]
 *         ...))
 * 
 *   To make this code fragment work, you'll also have to set `goog.DEBUG` to
 *   `false` in your production builds. For an example, look in `project.clj` of /examples/todomvc.
 *   
 */
re_frame.core.debug = re_frame.std_interceptors.debug;
/**
 * Returns an interceptor which acts somewhat like `clojure.core/update-in`, in the sense that
 *   the event handler is given a specific part of `app-db` to change, not all of `app-db`.
 * 
 *   The interceptor has both a `:before` and `:after` functions. The `:before` replaces
 *   the `:db` key within coeffects with a sub-path within `app-db`. The `:after` reverses the process,
 *   and it grafts the handler's return value back into db, at the right path.
 * 
 *   Examples:
 * 
 *    #!clj
 *    (path :some :path)
 *    (path [:some :path])
 *    (path [:some :path] :to :here)
 *    (path [:some :path] [:to] :here)
 * 
 *   Example Use:
 * 
 *    #!clj
 *    (reg-event-db
 *      :event-id
 *      (path [:a :b])  ;; <-- used here, in interceptor chain
 *      (fn [b v]       ;; 1st arg is not db. Is the value from path [:a :b] within db
 *        ... new-b))   ;; returns a new value for that path (not the entire db)
 * 
 *   Notes:
 * 
 *  1. `path` may appear more than once in an interceptor chain. Progressive narrowing.
 *  2. if `:effects` contains no `:db` effect, can't graft a value back in.
 *   
 */
re_frame.core.path = (function re_frame$core$path(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23713 = arguments.length;
var i__5770__auto___23714 = (0);
while(true){
if((i__5770__auto___23714 < len__5769__auto___23713)){
args__5775__auto__.push((arguments[i__5770__auto___23714]));

var G__23715 = (i__5770__auto___23714 + (1));
i__5770__auto___23714 = G__23715;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frame.core.path.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frame.core.path.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.std_interceptors.path,args);
}));

(re_frame.core.path.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.core.path.cljs$lang$applyTo = (function (seq23612){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq23612));
}));

/**
 * Returns an Interceptor which will run the given function `f` in the `:after`
 *   position.
 * 
 *   `f` is called with two arguments: `db` and `v`, and is expected to
 *   return a modified `db`.
 * 
 *   Unlike the `after` interceptor which is only about side effects, `enrich`
 *   expects `f` to process and alter the given `db` coeffect in some useful way,
 *   contributing to the derived data, flowing vibe.
 * 
 *   #### Example Use:
 * 
 *   Imagine that todomvc needed to do duplicate detection - if any two todos had
 *   the same text, then highlight their background, and report them via a warning
 *   at the bottom of the panel.
 * 
 *   Almost any user action (edit text, add new todo, remove a todo) requires a
 *   complete reassessment of duplication errors and warnings. Eg: that edit
 *   just made might have introduced a new duplicate, or removed one. Same with
 *   any todo removal. So we need to re-calculate warnings after any CRUD events
 *   associated with the todos list.
 * 
 *   Unless we are careful, we might end up coding subtly different checks
 *   for each kind of CRUD operation.  The duplicates check made after
 *   'delete todo' event might be subtly different to that done after an
 *   editing operation. Nice and efficient, but fiddly. A bug generator
 *   approach.
 * 
 *   So, instead, we create an `f` which recalculates ALL warnings from scratch
 *   every time there is ANY change. It will inspect all the todos, and
 *   reset ALL FLAGS every time (overwriting what was there previously)
 *   and fully recalculate the list of duplicates (displayed at the bottom?).
 * 
 *   <a href="https://twitter.com/nathanmarz/status/879722740776939520" target="_blank">https://twitter.com/nathanmarz/status/879722740776939520</a>
 * 
 *   By applying `f` in an `:enrich` interceptor, after every CRUD event,
 *   we keep the handlers simple and yet we ensure this important step
 *   (of getting warnings right) is not missed on any change.
 * 
 *   We can test `f` easily - it is a pure function - independently of
 *   any CRUD operation.
 * 
 *   This brings huge simplicity at the expense of some re-computation
 *   each time. This may be a very satisfactory trade-off in many cases.
 */
re_frame.core.enrich = (function re_frame$core$enrich(f){
return re_frame.std_interceptors.enrich(f);
});
/**
 * > New in v1.2.0
 * 
 * An interceptor which decreases the amount of destructuring necessary in an
 * event handler where the event is structured as a 2-vector of
 * [event-id payload-map].
 * 
 * It promotes the `payload-map` part to be the event ultimately given to the
 * event handler. Should you want the full original event, it can be found in
 * `coeffects` under the key `:original-event`.
 * 
 * If a dispatch looked like this:
 * 
 *    #!clj
 *     (dispatch [:event-id {:x 1 :y 2 :z 3}])
 * 
 * Your event handlers can look like this:
 * 
 *    #!clj
 *     (reg-event-fx
 *       :event-id
 *       [... unwrap ...]                    ;; <-- added to the interceptors
 *       (fn [{:keys [db]} {:keys [x y z]}]  ;; <-- instead of [_ {:keys [x y z]}]
 *         ...)
 * 
 */
re_frame.core.unwrap = re_frame.std_interceptors.unwrap;
/**
 * An interceptor which removes the first element of the event vector,
 *   before it is supplied to the event handler, allowing you to write more
 * aesthetically pleasing event handlers. No leading underscore on the event-v!
 * 
 *   Should you want the full original event, it can be found in `coeffects` under
 *   the key `:original-event`.
 * 
 *   Your event handlers will look like this:
 * 
 *    #!clj
 *    (reg-event-db
 *      :event-id
 *      [... trim-v ...]    ;; <-- added to the interceptors
 *      (fn [db [x y z]]    ;; <-- instead of [_ x y z]
 *        ...)
 *  
 */
re_frame.core.trim_v = re_frame.std_interceptors.trim_v;
/**
 * Returns an interceptor which runs the given function `f` in the `:after`
 *   position, presumably for side effects.
 * 
 *   `f` is called with two arguments: the `:effects` value for `:db`
 *   (or the `:coeffect` value of `:db` if no `:db` effect is returned) and the event.
 *   Its return value is ignored, so `f` can only side-effect.
 * 
 *   An example of use can be seen in the re-frame github repo in `/examples/todomvc/events.cljs`:
 * 
 *   - `f` runs schema validation (reporting any errors found).
 *   - `f` writes to localstorage.
 */
re_frame.core.after = (function re_frame$core$after(f){
return re_frame.std_interceptors.after(f);
});
/**
 * Returns an interceptor which will observe N paths within `db`, and if any of them
 *   test not `identical?` to their previous value  (as a result of a event handler
 *   being run), then it will run `f` to compute a new value, which is then assoc-ed
 *   into the given `out-path` within `db`.
 * 
 *   Example Usage:
 * 
 *    #!clj
 *    (defn my-f
 *      [a-val b-val]
 *      ... some computation on a and b in here)
 * 
 *    ;; use it
 *    (def my-interceptor (on-changes my-f [:c] [:a] [:b]))
 * 
 *    (reg-event-db
 *      :event-id
 *      [... my-interceptor ...]  ;; <-- ultimately used here
 *      (fn [db v]
 *         ...))
 * 
 * 
 *   If you put this Interceptor on handlers which might change paths `:a` or `:b`,
 *   it will:
 * 
 *  - call `f` each time the value at path `[:a]` or `[:b]` changes
 *  - call `f` with the values extracted from `[:a]` `[:b]`
 *  - assoc the return value from `f` into the path  `[:c]`
 *   
 */
re_frame.core.on_changes = (function re_frame$core$on_changes(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23716 = arguments.length;
var i__5770__auto___23717 = (0);
while(true){
if((i__5770__auto___23717 < len__5769__auto___23716)){
args__5775__auto__.push((arguments[i__5770__auto___23717]));

var G__23718 = (i__5770__auto___23717 + (1));
i__5770__auto___23717 = G__23718;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return re_frame.core.on_changes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(re_frame.core.on_changes.cljs$core$IFn$_invoke$arity$variadic = (function (f,out_path,in_paths){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.std_interceptors.on_changes,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,out_path], null),in_paths));
}));

(re_frame.core.on_changes.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(re_frame.core.on_changes.cljs$lang$applyTo = (function (seq23613){
var G__23614 = cljs.core.first(seq23613);
var seq23613__$1 = cljs.core.next(seq23613);
var G__23615 = cljs.core.first(seq23613__$1);
var seq23613__$2 = cljs.core.next(seq23613__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23614,G__23615,seq23613__$2);
}));

/**
 * Registers the given `interceptor` as a global interceptor. Global interceptors are
 * included in the processing chain of every event.
 * 
 * When you register an event handler, you have the option of supplying an
 * interceptor chain. Any global interceptors you register are effectively
 * prepending to this chain.
 * 
 * Global interceptors are run in the order that they are registered.
 */
re_frame.core.reg_global_interceptor = (function re_frame$core$reg_global_interceptor(interceptor){
return re_frame.settings.reg_global_interceptor(interceptor);
});
/**
 * Unregisters global interceptors (presumably registered previously via the use of `reg-global-interceptor`).
 * 
 *   When called with no args, it will unregister all currently registered global interceptors.
 * 
 *   When given one arg, assumed to be the `id` of a previously registered
 *   global interceptors, it will unregister the associated interceptor. Will produce a warning to
 *   console if it finds no matching registration.
 */
re_frame.core.clear_global_interceptor = (function re_frame$core$clear_global_interceptor(var_args){
var G__23621 = arguments.length;
switch (G__23621) {
case 0:
return re_frame.core.clear_global_interceptor.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return re_frame.core.clear_global_interceptor.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.clear_global_interceptor.cljs$core$IFn$_invoke$arity$0 = (function (){
return re_frame.settings.clear_global_interceptors.cljs$core$IFn$_invoke$arity$0();
}));

(re_frame.core.clear_global_interceptor.cljs$core$IFn$_invoke$arity$1 = (function (id){
return re_frame.settings.clear_global_interceptors.cljs$core$IFn$_invoke$arity$1(id);
}));

(re_frame.core.clear_global_interceptor.cljs$lang$maxFixedArity = 1);

/**
 * A utility function for creating interceptors.
 * 
 *   Accepts three optional, named arguments:
 * 
 *   - `:id` - an id for the interceptor (decorative only)
 *   - `:before` - the interceptor's before function
 *   - `:after`  - the interceptor's after function
 * 
 *   Example use:
 * 
 *    #!clj
 *    (def my-interceptor
 *      (->interceptor
 *       :id     :my-interceptor
 *       :before (fn [context]
 *                 ... modifies and returns `context`)
 *       :after  (fn [context]
 *                 ... modifies and returns `context`)))
 * 
 *   Notes:
 * 
 *  - `:before` functions modify and return their `context` argument. Sometimes they
 *    only side effect, in which case, they'll perform the side effect and return
 *    `context` unchanged.
 *  - `:before` functions often modify the `:coeffects` map within `context` and,
 *    if they do, then they should use the utility functions `get-coeffect` and
 *    `assoc-coeffect`.
 *  - `:after` functions modify and return their `context` argument. Sometimes they
 *    only side effect, in which case, they'll perform the side effect and return
 *    `context` unchanged.
 *  - `:after` functions often modify the `:effects` map within `context` and,
 *    if they do, then they should use the utility functions `get-effect`
 *    and `assoc-effect`
 */
re_frame.core.__GT_interceptor = (function re_frame$core$__GT_interceptor(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23720 = arguments.length;
var i__5770__auto___23721 = (0);
while(true){
if((i__5770__auto___23721 < len__5769__auto___23720)){
args__5775__auto__.push((arguments[i__5770__auto___23721]));

var G__23722 = (i__5770__auto___23721 + (1));
i__5770__auto___23721 = G__23722;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic = (function (p__23629){
var map__23630 = p__23629;
var map__23630__$1 = cljs.core.__destructure_map(map__23630);
var m = map__23630__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23630__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var before = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23630__$1,new cljs.core.Keyword(null,"before","before",-1633692388));
var after = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23630__$1,new cljs.core.Keyword(null,"after","after",594996914));
return re_frame.utils.apply_kw.cljs$core$IFn$_invoke$arity$variadic(re_frame.interceptor.__GT_interceptor,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([m], 0));
}));

(re_frame.core.__GT_interceptor.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.core.__GT_interceptor.cljs$lang$applyTo = (function (seq23628){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq23628));
}));

/**
 * A utility function, typically used when writing an interceptor's `:before` function.
 * 
 * When called with one argument, it returns the `:coeffects` map from with that `context`.
 * 
 * When called with two or three arguments, behaves like `clojure.core/get` and
 * returns the value mapped to `key` in the `:coeffects` map within `context`, `not-found` or
 * `nil` if `key` is not present.
 */
re_frame.core.get_coeffect = (function re_frame$core$get_coeffect(var_args){
var G__23637 = arguments.length;
switch (G__23637) {
case 1:
return re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$1 = (function (context){
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$1(context);
}));

(re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2 = (function (context,key){
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$2(context,key);
}));

(re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$3 = (function (context,key,not_found){
return re_frame.interceptor.get_coeffect.cljs$core$IFn$_invoke$arity$3(context,key,not_found);
}));

(re_frame.core.get_coeffect.cljs$lang$maxFixedArity = 3);

/**
 * A utility function, typically used when writing an interceptor's `:before` function.
 * 
 * Adds or updates a key/value pair in the `:coeffects` map within `context`. 
 */
re_frame.core.assoc_coeffect = (function re_frame$core$assoc_coeffect(context,key,value){
return re_frame.interceptor.assoc_coeffect(context,key,value);
});
/**
 * A utility function, used when writing interceptors, typically within an `:after` function.
 * 
 * When called with one argument, returns the `:effects` map from the `context`.
 * 
 * When called with two or three arguments, behaves like `clojure.core/get` and
 * returns the value mapped to `key` in the effects map, `not-found` or
 * `nil` if `key` is not present.
 */
re_frame.core.get_effect = (function re_frame$core$get_effect(var_args){
var G__23643 = arguments.length;
switch (G__23643) {
case 1:
return re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$1 = (function (context){
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$1(context);
}));

(re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$2 = (function (context,key){
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$2(context,key);
}));

(re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$3 = (function (context,key,not_found){
return re_frame.interceptor.get_effect.cljs$core$IFn$_invoke$arity$3(context,key,not_found);
}));

(re_frame.core.get_effect.cljs$lang$maxFixedArity = 3);

/**
 * A utility function, typically used when writing an interceptor's `:after` function.
 * 
 * Adds or updates a key/value pair in the `:effects` map within `context`. 
 */
re_frame.core.assoc_effect = (function re_frame$core$assoc_effect(context,key,value){
return re_frame.interceptor.assoc_effect(context,key,value);
});
/**
 * A utility function, used when writing an interceptor's `:before` function.
 * 
 *   Adds the given collection of `interceptors` to those already in `context's`
 *   execution `:queue`. It returns the updated `context`.
 * 
 *   So, it provides a way for one Interceptor to add more interceptors to the
 *   currently executing interceptor chain.
 *   
 */
re_frame.core.enqueue = (function re_frame$core$enqueue(context,interceptors){
return re_frame.interceptor.enqueue(context,interceptors);
});
/**
 * re-frame outputs warnings and errors via the API function `console`
 * which, by default, delegates to `js/console`'s default implementation for
 *   `log`, `error`, `warn`, `debug`, `group` and `groupEnd`. But, using this function,
 * you can override that behaviour with your own functions.
 * 
 *   The argument `new-loggers` should be a map containing a subset of they keys
 *   for the standard `loggers`, namely  `:log` `:error` `:warn` `:debug` `:group`
 *   or `:groupEnd`.
 * 
 *   Example Usage:
 * 
 *    #!clj
 *    (defn my-logger      ;; my alternative logging function
 *      [& args]
 *      (post-it-somewhere (apply str args)))
 * 
 *    ;; now install my alternative loggers
 *    (re-frame.core/set-loggers!  {:warn my-logger :log my-logger})
 * 
 */
re_frame.core.set_loggers_BANG_ = (function re_frame$core$set_loggers_BANG_(new_loggers){
return re_frame.loggers.set_loggers_BANG_(new_loggers);
});
/**
 * A utility logging function which is used internally within re-frame to produce
 *   warnings and other output. It can also be used by libraries which
 *   extend re-frame, such as effect handlers.
 * 
 *   By default, it will output the given `args` to `js/console` at the given log `level`.
 *   However, an application using re-frame can redirect `console` output via `set-loggers!`.
 * 
 *   `level` can be one of `:log`, `:error`, `:warn`, `:debug`, `:group` or `:groupEnd`.
 * 
 *   Example usage:
 * 
 *    #!clj
 *    (console :error "Sure enough it happened:" a-var "and" another)
 *    (console :warn "Possible breach of containment wall at:" dt)
 *   
 */
re_frame.core.console = (function re_frame$core$console(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23726 = arguments.length;
var i__5770__auto___23727 = (0);
while(true){
if((i__5770__auto___23727 < len__5769__auto___23726)){
args__5775__auto__.push((arguments[i__5770__auto___23727]));

var G__23729 = (i__5770__auto___23727 + (1));
i__5770__auto___23727 = G__23729;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return re_frame.core.console.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(re_frame.core.console.cljs$core$IFn$_invoke$arity$variadic = (function (level,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.loggers.console,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [level], null),args));
}));

(re_frame.core.console.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frame.core.console.cljs$lang$applyTo = (function (seq23659){
var G__23660 = cljs.core.first(seq23659);
var seq23659__$1 = cljs.core.next(seq23659);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__23660,seq23659__$1);
}));

/**
 * This is a utility function, typically used in testing.
 * 
 *   It checkpoints the current state of re-frame and returns a function which, when
 *   later called, will restore re-frame to the checkpointed state.
 * 
 *   The checkpoint includes `app-db`, all registered handlers and all subscriptions.
 *   
 */
re_frame.core.make_restore_fn = (function re_frame$core$make_restore_fn(){
var handlers = cljs.core.deref(re_frame.registrar.kind__GT_id__GT_handler);
var app_db = cljs.core.deref(re_frame.db.app_db);
var subs_cache = cljs.core.deref(re_frame.subs.query__GT_reaction);
return (function (){
var original_subs_23731 = cljs.core.set(cljs.core.vals(subs_cache));
var current_subs_23732 = cljs.core.set(cljs.core.vals(cljs.core.deref(re_frame.subs.query__GT_reaction)));
var seq__23662_23733 = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(current_subs_23732,original_subs_23731));
var chunk__23663_23734 = null;
var count__23664_23735 = (0);
var i__23665_23736 = (0);
while(true){
if((i__23665_23736 < count__23664_23735)){
var sub_23737 = chunk__23663_23734.cljs$core$IIndexed$_nth$arity$2(null,i__23665_23736);
re_frame.interop.dispose_BANG_(sub_23737);


var G__23738 = seq__23662_23733;
var G__23739 = chunk__23663_23734;
var G__23740 = count__23664_23735;
var G__23741 = (i__23665_23736 + (1));
seq__23662_23733 = G__23738;
chunk__23663_23734 = G__23739;
count__23664_23735 = G__23740;
i__23665_23736 = G__23741;
continue;
} else {
var temp__5804__auto___23742 = cljs.core.seq(seq__23662_23733);
if(temp__5804__auto___23742){
var seq__23662_23743__$1 = temp__5804__auto___23742;
if(cljs.core.chunked_seq_QMARK_(seq__23662_23743__$1)){
var c__5568__auto___23744 = cljs.core.chunk_first(seq__23662_23743__$1);
var G__23746 = cljs.core.chunk_rest(seq__23662_23743__$1);
var G__23747 = c__5568__auto___23744;
var G__23748 = cljs.core.count(c__5568__auto___23744);
var G__23749 = (0);
seq__23662_23733 = G__23746;
chunk__23663_23734 = G__23747;
count__23664_23735 = G__23748;
i__23665_23736 = G__23749;
continue;
} else {
var sub_23750 = cljs.core.first(seq__23662_23743__$1);
re_frame.interop.dispose_BANG_(sub_23750);


var G__23751 = cljs.core.next(seq__23662_23743__$1);
var G__23752 = null;
var G__23753 = (0);
var G__23754 = (0);
seq__23662_23733 = G__23751;
chunk__23663_23734 = G__23752;
count__23664_23735 = G__23753;
i__23665_23736 = G__23754;
continue;
}
} else {
}
}
break;
}

cljs.core.reset_BANG_(re_frame.registrar.kind__GT_id__GT_handler,handlers);

cljs.core.reset_BANG_(re_frame.db.app_db,app_db);

return null;
});
});
/**
 * Removes all events currently queued for processing
 */
re_frame.core.purge_event_queue = (function re_frame$core$purge_event_queue(){
return re_frame.router.event_queue.re_frame$router$IEventQueue$purge$arity$1(null);
});
/**
 * Registers the given function `f` to be called after each event is processed.
 * 
 * `f` will be called with two arguments:
 * 
 *  - `event`: a vector. The event just processed.
 *  - `queue`: a PersistentQueue, possibly empty, of events yet to be processed.
 * 
 * This facility is useful in advanced cases like:
 * 
 *   - you are implementing a complex bootstrap pipeline
 *   - you want to create your own handling infrastructure, with perhaps multiple
 *     handlers for the one event, etc.  Hook in here.
 *   - libraries providing 'isomorphic javascript' rendering on  Nodejs or Nashorn.
 * 
 *   `id` is typically a keyword. If it supplied when an `f` is added, it can be
 *   subsequently be used to identify it for removal. See `remove-post-event-callback`.
 *   
 */
re_frame.core.add_post_event_callback = (function re_frame$core$add_post_event_callback(var_args){
var G__23668 = arguments.length;
switch (G__23668) {
case 1:
return re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$1 = (function (f){
return re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$2(f,f);
}));

(re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$2 = (function (id,f){
return re_frame.router.event_queue.re_frame$router$IEventQueue$add_post_event_callback$arity$3(null,id,f);
}));

(re_frame.core.add_post_event_callback.cljs$lang$maxFixedArity = 2);

/**
 * Unregisters a post event callback function, identified by `id`.
 * 
 *   Such a function must have been previously registered via `add-post-event-callback`
 */
re_frame.core.remove_post_event_callback = (function re_frame$core$remove_post_event_callback(id){
return re_frame.router.event_queue.re_frame$router$IEventQueue$remove_post_event_callback$arity$2(null,id);
});
/**
 * Deprecated. Use `reg-event-db` instead.
 */
re_frame.core.register_handler = (function re_frame$core$register_handler(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23756 = arguments.length;
var i__5770__auto___23757 = (0);
while(true){
if((i__5770__auto___23757 < len__5769__auto___23756)){
args__5775__auto__.push((arguments[i__5770__auto___23757]));

var G__23758 = (i__5770__auto___23757 + (1));
i__5770__auto___23757 = G__23758;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frame.core.register_handler.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frame.core.register_handler.cljs$core$IFn$_invoke$arity$variadic = (function (args){
re_frame.core.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \"register-handler\" has been renamed \"reg-event-db\" (look for registration of ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args)),")"], 0));

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.core.reg_event_db,args);
}));

(re_frame.core.register_handler.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.core.register_handler.cljs$lang$applyTo = (function (seq23672){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq23672));
}));

/**
 * Deprecated. Use `reg-sub-raw` instead.
 */
re_frame.core.register_sub = (function re_frame$core$register_sub(var_args){
var args__5775__auto__ = [];
var len__5769__auto___23759 = arguments.length;
var i__5770__auto___23760 = (0);
while(true){
if((i__5770__auto___23760 < len__5769__auto___23759)){
args__5775__auto__.push((arguments[i__5770__auto___23760]));

var G__23761 = (i__5770__auto___23760 + (1));
i__5770__auto___23760 = G__23761;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frame.core.register_sub.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frame.core.register_sub.cljs$core$IFn$_invoke$arity$variadic = (function (args){
re_frame.core.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \"register-sub\" is used to register the event ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(args))," but it is a deprecated part of the API. Please use \"reg-sub-raw\" instead."], 0));

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(re_frame.core.reg_sub_raw,args);
}));

(re_frame.core.register_sub.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frame.core.register_sub.cljs$lang$applyTo = (function (seq23683){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq23683));
}));

Object.defineProperty(module.exports, "console", { enumerable: false, get: function() { return re_frame.core.console; } });
Object.defineProperty(module.exports, "unwrap", { enumerable: false, get: function() { return re_frame.core.unwrap; } });
Object.defineProperty(module.exports, "on_changes", { enumerable: false, get: function() { return re_frame.core.on_changes; } });
Object.defineProperty(module.exports, "enrich", { enumerable: false, get: function() { return re_frame.core.enrich; } });
Object.defineProperty(module.exports, "reg_sub_raw", { enumerable: false, get: function() { return re_frame.core.reg_sub_raw; } });
Object.defineProperty(module.exports, "subscribe", { enumerable: false, get: function() { return re_frame.core.subscribe; } });
Object.defineProperty(module.exports, "reg_global_interceptor", { enumerable: false, get: function() { return re_frame.core.reg_global_interceptor; } });
Object.defineProperty(module.exports, "assoc_coeffect", { enumerable: false, get: function() { return re_frame.core.assoc_coeffect; } });
Object.defineProperty(module.exports, "register_sub", { enumerable: false, get: function() { return re_frame.core.register_sub; } });
Object.defineProperty(module.exports, "purge_event_queue", { enumerable: false, get: function() { return re_frame.core.purge_event_queue; } });
Object.defineProperty(module.exports, "remove_post_event_callback", { enumerable: false, get: function() { return re_frame.core.remove_post_event_callback; } });
Object.defineProperty(module.exports, "path", { enumerable: false, get: function() { return re_frame.core.path; } });
Object.defineProperty(module.exports, "reg_sub", { enumerable: false, get: function() { return re_frame.core.reg_sub; } });
Object.defineProperty(module.exports, "make_restore_fn", { enumerable: false, get: function() { return re_frame.core.make_restore_fn; } });
Object.defineProperty(module.exports, "clear_fx", { enumerable: false, get: function() { return re_frame.core.clear_fx; } });
Object.defineProperty(module.exports, "get_effect", { enumerable: false, get: function() { return re_frame.core.get_effect; } });
Object.defineProperty(module.exports, "reg_event_db", { enumerable: false, get: function() { return re_frame.core.reg_event_db; } });
Object.defineProperty(module.exports, "dispatch_sync", { enumerable: false, get: function() { return re_frame.core.dispatch_sync; } });
Object.defineProperty(module.exports, "clear_event", { enumerable: false, get: function() { return re_frame.core.clear_event; } });
Object.defineProperty(module.exports, "__GT_interceptor", { enumerable: false, get: function() { return re_frame.core.__GT_interceptor; } });
Object.defineProperty(module.exports, "set_loggers_BANG_", { enumerable: false, get: function() { return re_frame.core.set_loggers_BANG_; } });
Object.defineProperty(module.exports, "inject_cofx", { enumerable: false, get: function() { return re_frame.core.inject_cofx; } });
Object.defineProperty(module.exports, "clear_global_interceptor", { enumerable: false, get: function() { return re_frame.core.clear_global_interceptor; } });
Object.defineProperty(module.exports, "get_coeffect", { enumerable: false, get: function() { return re_frame.core.get_coeffect; } });
Object.defineProperty(module.exports, "debug", { enumerable: false, get: function() { return re_frame.core.debug; } });
Object.defineProperty(module.exports, "assoc_effect", { enumerable: false, get: function() { return re_frame.core.assoc_effect; } });
Object.defineProperty(module.exports, "enqueue", { enumerable: false, get: function() { return re_frame.core.enqueue; } });
Object.defineProperty(module.exports, "clear_cofx", { enumerable: false, get: function() { return re_frame.core.clear_cofx; } });
Object.defineProperty(module.exports, "reg_event_ctx", { enumerable: false, get: function() { return re_frame.core.reg_event_ctx; } });
Object.defineProperty(module.exports, "reg_fx", { enumerable: false, get: function() { return re_frame.core.reg_fx; } });
Object.defineProperty(module.exports, "trim_v", { enumerable: false, get: function() { return re_frame.core.trim_v; } });
Object.defineProperty(module.exports, "clear_sub", { enumerable: false, get: function() { return re_frame.core.clear_sub; } });
Object.defineProperty(module.exports, "dispatch", { enumerable: false, get: function() { return re_frame.core.dispatch; } });
Object.defineProperty(module.exports, "after", { enumerable: false, get: function() { return re_frame.core.after; } });
Object.defineProperty(module.exports, "add_post_event_callback", { enumerable: false, get: function() { return re_frame.core.add_post_event_callback; } });
Object.defineProperty(module.exports, "reg_cofx", { enumerable: false, get: function() { return re_frame.core.reg_cofx; } });
Object.defineProperty(module.exports, "reg_event_fx", { enumerable: false, get: function() { return re_frame.core.reg_event_fx; } });
Object.defineProperty(module.exports, "register_handler", { enumerable: false, get: function() { return re_frame.core.register_handler; } });
Object.defineProperty(module.exports, "clear_subscription_cache_BANG_", { enumerable: false, get: function() { return re_frame.core.clear_subscription_cache_BANG_; } });
//# sourceMappingURL=re_frame.core.js.map
