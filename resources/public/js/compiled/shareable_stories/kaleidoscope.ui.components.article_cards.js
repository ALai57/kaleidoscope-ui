var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./shadow.js.shim.module$react.js");
require("./shadow.js.shim.module$$styled_icons$remix_fill$GitBranch.js");
require("./kaleidoscope.ui.utils.core.js");
require("./clojure.string.js");
require("./re_frame.core.js");
require("./reagent.core.js");
require("./reagent_mui.components.js");
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

$CLJS.SHADOW_ENV.setLoaded("kaleidoscope.ui.components.article_cards.js");

goog.provide('kaleidoscope.ui.components.article_cards');
kaleidoscope.ui.components.article_cards.article_tags__GT_icon = (function kaleidoscope$ui$components$article_cards$article_tags__GT_icon(article_tags){
var G__22356 = article_tags;
switch (G__22356) {
case "research":
return "/images/nav-bar/neuron-icon.svg";

break;
case "archive":
return "/images/nav-bar/archive-icon.svg";

break;
case "about":
return "/images/nav-bar/andrew-silhouette-icon.svg";

break;
case "thoughts":
return "/images/nav-bar/andrew-head-icon.svg";

break;
default:
return "/images/nav-bar/unknown-user.svg";

}
});
kaleidoscope.ui.components.article_cards.article_card = (function kaleidoscope$ui$components$article_cards$article_card(p__22357){
var map__22358 = p__22357;
var map__22358__$1 = cljs.core.__destructure_map(map__22358);
var article = map__22358__$1;
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22358__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22358__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22358__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22358__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var created_at = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22358__$1,new cljs.core.Keyword(null,"created-at","created-at",-89248644));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"text-white bg-light mb-3 article-card"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container-fluid","div.container-fluid",3929737),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row.flex-items-xs-middle","div.row.flex-items-xs-middle",1736113744),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-3.bg-primary.text-xs-center.card-icon","div.col-sm-3.bg-primary.text-xs-center.card-icon",1873295004),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.p-y-3","div.p-y-3",304236630),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.p-y-2","h1.p-y-2",-69111140),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.fa.fa-2x","img.fa.fa-2x",-1972534193),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),kaleidoscope.ui.components.article_cards.article_tags__GT_icon(article_tags),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-9.bg-light.text-dark.card-description","div.col-sm-9.bg-light.text-dark.card-description",53051943),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5.card-title>a","h5.card-title>a",2040660040),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),goog.string.format("#/%s/content/%s",article_tags,article_url)], null),article_title], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.card-text","p.card-text",815200113),kaleidoscope.ui.utils.core.date(created_at)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.article_cards.truncate = (function kaleidoscope$ui$components$article_cards$truncate(article_title,chars_per_row,rows){
var chars = (chars_per_row * rows);
if((cljs.core.count(article_title) <= chars)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(article_title),"\n"].join('');
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.take.cljs$core$IFn$_invoke$arity$2((chars - (3)),article_title),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["..."], null)));
}
});
kaleidoscope.ui.components.article_cards.log_click = (function kaleidoscope$ui$components$article_cards$log_click(event){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked thin article card"], 0));
});
kaleidoscope.ui.components.article_cards.article_branch = (function kaleidoscope$ui$components$article_cards$article_branch(p__22363,branch_name){
var map__22364 = p__22363;
var map__22364__$1 = cljs.core.__destructure_map(map__22364);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22364__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22364__$1,new cljs.core.Keyword(null,"style","style",-496642736));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"startIcon","startIcon",-640516750),reagent.core.create_element.cljs$core$IFn$_invoke$arity$2(shadow.js.shim.module$$styled_icons$remix_fill$GitBranch.GitBranch,({"width": "20px"})),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([style,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null)], 0)),new cljs.core.Keyword(null,"onClick","onClick",-1991238530),on_click], null),branch_name], null);
});
kaleidoscope.ui.components.article_cards.latest = (function kaleidoscope$ui$components$article_cards$latest(coll){
if(cljs.core.empty_QMARK_(coll)){
return null;
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,coll);
}
});
/**
 * For displaying an article's lineage and branches
 */
kaleidoscope.ui.components.article_cards.thin_article_card = (function kaleidoscope$ui$components$article_cards$thin_article_card(var_args){
var G__22368 = arguments.length;
switch (G__22368) {
case 1:
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$1 = (function (article){
return kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2(article,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"n-rows","n-rows",1762514969),(2)], null));
}));

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$core$IFn$_invoke$arity$2 = (function (p__22369,p__22370){
var map__22371 = p__22369;
var map__22371__$1 = cljs.core.__destructure_map(map__22371);
var article = map__22371__$1;
var article_tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22371__$1,new cljs.core.Keyword(null,"article-tags","article-tags",1728644725));
var article_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22371__$1,new cljs.core.Keyword(null,"article-url","article-url",-1760823624));
var article_title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22371__$1,new cljs.core.Keyword(null,"article-title","article-title",-1665332721));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22371__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22371__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var map__22372 = p__22370;
var map__22372__$1 = cljs.core.__destructure_map(map__22372);
var options = map__22372__$1;
var n_rows = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22372__$1,new cljs.core.Keyword(null,"n-rows","n-rows",1762514969),(2));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22372__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),kaleidoscope.ui.components.article_cards.log_click);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion_summary,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"text-white bg-light thin-article-card zoom-card-icon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.card_action_area,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container-fluid","div.container-fluid",3929737),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px",new cljs.core.Keyword(null,"height","height",1025178622),"50px"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.row.flex-items-xs-middle","div.row.flex-items-xs-middle",1736113744),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col-sm-1.bg-primary.text-xs-center.thin-card-icon","div.col-sm-1.bg-primary.text-xs-center.thin-card-icon",596604423),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.fa.fa-2x","img.fa.fa-2x",-1972534193),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),kaleidoscope.ui.components.article_cards.article_tags__GT_icon(article_tags),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"max-height","max-height",-612563804),"50px",new cljs.core.Keyword(null,"padding","padding",1660304693),"3px",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.col.bg-light.text-dark.thin-card-description","div.col.bg-light.text-dark.thin-card-description",495773494),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h6","h6",557293780),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px"], null)], null),kaleidoscope.ui.components.article_cards.truncate(article_title,(33),n_rows)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.card-text","p.card-text",815200113),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"darkgray"], null)], null),(function (){var published_at = kaleidoscope.ui.components.article_cards.latest(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"published-at","published-at",249684621),branches));
var created_at = kaleidoscope.ui.components.article_cards.latest(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"created-at","created-at",-89248644),branches));
if(cljs.core.truth_(published_at)){
return goog.string.format("PUB: %s",kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_DAY_YEAR,published_at));
} else {
if(cljs.core.truth_(created_at)){
return goog.string.format("NEW: %s",kaleidoscope.ui.utils.core.format_date(kaleidoscope.ui.utils.core.MONTH_DAY_YEAR,created_at));
} else {
return null;
}
}
})()], null)], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.accordion_details,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$iter__22373(s__22374){
return (new cljs.core.LazySeq(null,(function (){
var s__22374__$1 = s__22374;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22374__$1);
if(temp__5804__auto__){
var s__22374__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22374__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22374__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22376 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22375 = (0);
while(true){
if((i__22375 < size__5522__auto__)){
var map__22377 = cljs.core._nth(c__5521__auto__,i__22375);
var map__22377__$1 = cljs.core.__destructure_map(map__22377);
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22377__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22377__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
cljs.core.chunk_append(b__22376,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_branch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__22375,map__22377,map__22377__$1,branch_name,branch_id,c__5521__auto__,size__5522__auto__,b__22376,s__22374__$2,temp__5804__auto__,map__22371,map__22371__$1,article,article_tags,article_url,article_title,article_id,branches,map__22372,map__22372__$1,options,n_rows,on_click){
return (function (event){
var G__22378 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),branch_name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),branch_id], 0));
return (on_click.cljs$core$IFn$_invoke$arity$1 ? on_click.cljs$core$IFn$_invoke$arity$1(G__22378) : on_click.call(null,G__22378));
});})(i__22375,map__22377,map__22377__$1,branch_name,branch_id,c__5521__auto__,size__5522__auto__,b__22376,s__22374__$2,temp__5804__auto__,map__22371,map__22371__$1,article,article_tags,article_url,article_title,article_id,branches,map__22372,map__22372__$1,options,n_rows,on_click))
], null),branch_name], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),branch_name], null)));

var G__22400 = (i__22375 + (1));
i__22375 = G__22400;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22376),kaleidoscope$ui$components$article_cards$iter__22373(cljs.core.chunk_rest(s__22374__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22376),null);
}
} else {
var map__22379 = cljs.core.first(s__22374__$2);
var map__22379__$1 = cljs.core.__destructure_map(map__22379);
var branch_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22379__$1,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162));
var branch_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22379__$1,new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_branch,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (map__22379,map__22379__$1,branch_name,branch_id,s__22374__$2,temp__5804__auto__,map__22371,map__22371__$1,article,article_tags,article_url,article_title,article_id,branches,map__22372,map__22372__$1,options,n_rows,on_click){
return (function (event){
var G__22380 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(article,new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),branch_name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),branch_id], 0));
return (on_click.cljs$core$IFn$_invoke$arity$1 ? on_click.cljs$core$IFn$_invoke$arity$1(G__22380) : on_click.call(null,G__22380));
});})(map__22379,map__22379__$1,branch_name,branch_id,s__22374__$2,temp__5804__auto__,map__22371,map__22371__$1,article,article_tags,article_url,article_title,article_id,branches,map__22372,map__22372__$1,options,n_rows,on_click))
], null),branch_name], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),branch_name], null)),kaleidoscope$ui$components$article_cards$iter__22373(cljs.core.rest(s__22374__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(branches);
})()], null)], null);
}));

(kaleidoscope.ui.components.article_cards.thin_article_card.cljs$lang$maxFixedArity = 2);

kaleidoscope.ui.components.article_cards.thin_content_cards = (function kaleidoscope$ui$components$article_cards$thin_content_cards(p__22383){
var map__22384 = p__22383;
var map__22384__$1 = cljs.core.__destructure_map(map__22384);
var branches = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22384__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var grouped_branches = cljs.core.reduce_kv((function (acc,m,xs){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"branches","branches",-1240337268),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__22381_SHARP_){
return cljs.core.select_keys(p1__22381_SHARP_,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"branch-name","branch-name",2030030162),new cljs.core.Keyword(null,"branch-id","branch-id",-1859932285),new cljs.core.Keyword(null,"created-at","created-at",-89248644),new cljs.core.Keyword(null,"published-at","published-at",249684621)], null));
}),xs)));
}),cljs.core.PersistentVector.EMPTY,cljs.core.group_by((function (p1__22382_SHARP_){
return cljs.core.select_keys(p1__22382_SHARP_,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"article-id","article-id",793965839),new cljs.core.Keyword(null,"author","author",2111686192),new cljs.core.Keyword(null,"article-url","article-url",-1760823624),new cljs.core.Keyword(null,"article-title","article-title",-1665332721),new cljs.core.Keyword(null,"article-tags","article-tags",1728644725)], null));
}),branches));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),"500px"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__22385(s__22386){
return (new cljs.core.LazySeq(null,(function (){
var s__22386__$1 = s__22386;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22386__$1);
if(temp__5804__auto__){
var s__22386__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22386__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22386__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22388 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22387 = (0);
while(true){
if((i__22387 < size__5522__auto__)){
var map__22389 = cljs.core._nth(c__5521__auto__,i__22387);
var map__22389__$1 = cljs.core.__destructure_map(map__22389);
var content = map__22389__$1;
var branches__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22389__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22389__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
cljs.core.chunk_append(b__22388,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.thin_article_card,content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),goog.string.format("%s-%s",branches__$1,article_id)], null)));

var G__22401 = (i__22387 + (1));
i__22387 = G__22401;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22388),kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__22385(cljs.core.chunk_rest(s__22386__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22388),null);
}
} else {
var map__22390 = cljs.core.first(s__22386__$2);
var map__22390__$1 = cljs.core.__destructure_map(map__22390);
var content = map__22390__$1;
var branches__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22390__$1,new cljs.core.Keyword(null,"branches","branches",-1240337268));
var article_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22390__$1,new cljs.core.Keyword(null,"article-id","article-id",793965839));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.thin_article_card,content,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),goog.string.format("%s-%s",branches__$1,article_id)], null)),kaleidoscope$ui$components$article_cards$thin_content_cards_$_iter__22385(cljs.core.rest(s__22386__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(grouped_branches);
})()], null);
});
kaleidoscope.ui.components.article_cards.recent_content_cards = (function kaleidoscope$ui$components$article_cards$recent_content_cards(p__22391){
var map__22392 = p__22391;
var map__22392__$1 = cljs.core.__destructure_map(map__22392);
var recent_content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22392__$1,new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#recent-content","div#recent-content",897607431),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#recent-article-cards.card-group","div#recent-article-cards.card-group",1086768140),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__22393(s__22394){
return (new cljs.core.LazySeq(null,(function (){
var s__22394__$1 = s__22394;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__22394__$1);
if(temp__5804__auto__){
var s__22394__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__22394__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__22394__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__22396 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__22395 = (0);
while(true){
if((i__22395 < size__5522__auto__)){
var article = cljs.core._nth(c__5521__auto__,i__22395);
cljs.core.chunk_append(b__22396,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_card,article], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article)], null)));

var G__22402 = (i__22395 + (1));
i__22395 = G__22402;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__22396),kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__22393(cljs.core.chunk_rest(s__22394__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__22396),null);
}
} else {
var article = cljs.core.first(s__22394__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.article_card,article], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.str.cljs$core$IFn$_invoke$arity$1(article)], null)),kaleidoscope$ui$components$article_cards$recent_content_cards_$_iter__22393(cljs.core.rest(s__22394__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(recent_content);
})()], null)], null);
});
kaleidoscope.ui.components.article_cards.recent_content_display = (function kaleidoscope$ui$components$article_cards$recent_content_display(content_type){
var recent_content = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460)], null)));
var the_content = (cljs.core.truth_(content_type)?cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__22397_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"article-tags","article-tags",1728644725).cljs$core$IFn$_invoke$arity$1(p1__22397_SHARP_),content_type);
}),recent_content):recent_content);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.article_cards.recent_content_cards,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"recent-content","recent-content",-1697726460),the_content], null)], null);
});
Object.defineProperty(module.exports, "log_click", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.log_click; } });
Object.defineProperty(module.exports, "article_tags__GT_icon", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.article_tags__GT_icon; } });
Object.defineProperty(module.exports, "recent_content_cards", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.recent_content_cards; } });
Object.defineProperty(module.exports, "truncate", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.truncate; } });
Object.defineProperty(module.exports, "thin_article_card", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.thin_article_card; } });
Object.defineProperty(module.exports, "article_branch", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.article_branch; } });
Object.defineProperty(module.exports, "recent_content_display", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.recent_content_display; } });
Object.defineProperty(module.exports, "thin_content_cards", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.thin_content_cards; } });
Object.defineProperty(module.exports, "latest", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.latest; } });
Object.defineProperty(module.exports, "article_card", { enumerable: false, get: function() { return kaleidoscope.ui.components.article_cards.article_card; } });
//# sourceMappingURL=kaleidoscope.ui.components.article_cards.js.map
