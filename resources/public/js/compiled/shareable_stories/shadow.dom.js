var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./clojure.string.js");
require("./cljs.core.async.js");
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

$CLJS.SHADOW_ENV.setLoaded("shadow.dom.js");

goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_18793 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_18793(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_18794 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_18794(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__17660 = coll;
var G__17662 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__17660,G__17662) : shadow.dom.lazy_native_coll_seq.call(null,G__17660,G__17662));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__17724 = arguments.length;
switch (G__17724) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__17733 = arguments.length;
switch (G__17733) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__17741 = arguments.length;
switch (G__17741) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__17777 = arguments.length;
switch (G__17777) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__17785 = arguments.length;
switch (G__17785) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__17817 = arguments.length;
switch (G__17817) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e17837){if((e17837 instanceof Object)){
var e = e17837;
return console.log("didnt support attachEvent",el,e);
} else {
throw e17837;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__17844 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__17845 = null;
var count__17846 = (0);
var i__17847 = (0);
while(true){
if((i__17847 < count__17846)){
var el = chunk__17845.cljs$core$IIndexed$_nth$arity$2(null,i__17847);
var handler_18883__$1 = ((function (seq__17844,chunk__17845,count__17846,i__17847,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__17844,chunk__17845,count__17846,i__17847,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_18883__$1);


var G__18884 = seq__17844;
var G__18885 = chunk__17845;
var G__18886 = count__17846;
var G__18887 = (i__17847 + (1));
seq__17844 = G__18884;
chunk__17845 = G__18885;
count__17846 = G__18886;
i__17847 = G__18887;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17844);
if(temp__5804__auto__){
var seq__17844__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17844__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17844__$1);
var G__18892 = cljs.core.chunk_rest(seq__17844__$1);
var G__18893 = c__5568__auto__;
var G__18894 = cljs.core.count(c__5568__auto__);
var G__18895 = (0);
seq__17844 = G__18892;
chunk__17845 = G__18893;
count__17846 = G__18894;
i__17847 = G__18895;
continue;
} else {
var el = cljs.core.first(seq__17844__$1);
var handler_18896__$1 = ((function (seq__17844,chunk__17845,count__17846,i__17847,el,seq__17844__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__17844,chunk__17845,count__17846,i__17847,el,seq__17844__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_18896__$1);


var G__18897 = cljs.core.next(seq__17844__$1);
var G__18898 = null;
var G__18899 = (0);
var G__18900 = (0);
seq__17844 = G__18897;
chunk__17845 = G__18898;
count__17846 = G__18899;
i__17847 = G__18900;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__17857 = arguments.length;
switch (G__17857) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__17874 = cljs.core.seq(events);
var chunk__17875 = null;
var count__17876 = (0);
var i__17877 = (0);
while(true){
if((i__17877 < count__17876)){
var vec__17890 = chunk__17875.cljs$core$IIndexed$_nth$arity$2(null,i__17877);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17890,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17890,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__18904 = seq__17874;
var G__18905 = chunk__17875;
var G__18906 = count__17876;
var G__18907 = (i__17877 + (1));
seq__17874 = G__18904;
chunk__17875 = G__18905;
count__17876 = G__18906;
i__17877 = G__18907;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17874);
if(temp__5804__auto__){
var seq__17874__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17874__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17874__$1);
var G__18909 = cljs.core.chunk_rest(seq__17874__$1);
var G__18910 = c__5568__auto__;
var G__18911 = cljs.core.count(c__5568__auto__);
var G__18912 = (0);
seq__17874 = G__18909;
chunk__17875 = G__18910;
count__17876 = G__18911;
i__17877 = G__18912;
continue;
} else {
var vec__17899 = cljs.core.first(seq__17874__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17899,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17899,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__18913 = cljs.core.next(seq__17874__$1);
var G__18914 = null;
var G__18915 = (0);
var G__18916 = (0);
seq__17874 = G__18913;
chunk__17875 = G__18914;
count__17876 = G__18915;
i__17877 = G__18916;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__17904 = cljs.core.seq(styles);
var chunk__17905 = null;
var count__17906 = (0);
var i__17907 = (0);
while(true){
if((i__17907 < count__17906)){
var vec__17921 = chunk__17905.cljs$core$IIndexed$_nth$arity$2(null,i__17907);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17921,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17921,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__18917 = seq__17904;
var G__18918 = chunk__17905;
var G__18919 = count__17906;
var G__18920 = (i__17907 + (1));
seq__17904 = G__18917;
chunk__17905 = G__18918;
count__17906 = G__18919;
i__17907 = G__18920;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17904);
if(temp__5804__auto__){
var seq__17904__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17904__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17904__$1);
var G__18921 = cljs.core.chunk_rest(seq__17904__$1);
var G__18922 = c__5568__auto__;
var G__18923 = cljs.core.count(c__5568__auto__);
var G__18924 = (0);
seq__17904 = G__18921;
chunk__17905 = G__18922;
count__17906 = G__18923;
i__17907 = G__18924;
continue;
} else {
var vec__17925 = cljs.core.first(seq__17904__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17925,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17925,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__18926 = cljs.core.next(seq__17904__$1);
var G__18927 = null;
var G__18928 = (0);
var G__18929 = (0);
seq__17904 = G__18926;
chunk__17905 = G__18927;
count__17906 = G__18928;
i__17907 = G__18929;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__17952_18930 = key;
var G__17952_18931__$1 = (((G__17952_18930 instanceof cljs.core.Keyword))?G__17952_18930.fqn:null);
switch (G__17952_18931__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_18935 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_18935,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_18935,"aria-");
}
})())){
el.setAttribute(ks_18935,value);
} else {
(el[ks_18935] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__18036){
var map__18037 = p__18036;
var map__18037__$1 = cljs.core.__destructure_map(map__18037);
var props = map__18037__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18037__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__18038 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18038,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18038,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18038,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__18044 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__18044,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__18044;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__18067 = arguments.length;
switch (G__18067) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__18077){
var vec__18078 = p__18077;
var seq__18079 = cljs.core.seq(vec__18078);
var first__18080 = cljs.core.first(seq__18079);
var seq__18079__$1 = cljs.core.next(seq__18079);
var nn = first__18080;
var first__18080__$1 = cljs.core.first(seq__18079__$1);
var seq__18079__$2 = cljs.core.next(seq__18079__$1);
var np = first__18080__$1;
var nc = seq__18079__$2;
var node = vec__18078;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__18082 = nn;
var G__18083 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__18082,G__18083) : create_fn.call(null,G__18082,G__18083));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__18084 = nn;
var G__18085 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__18084,G__18085) : create_fn.call(null,G__18084,G__18085));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__18091 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18091,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18091,(1),null);
var seq__18098_18956 = cljs.core.seq(node_children);
var chunk__18099_18957 = null;
var count__18100_18958 = (0);
var i__18101_18959 = (0);
while(true){
if((i__18101_18959 < count__18100_18958)){
var child_struct_18960 = chunk__18099_18957.cljs$core$IIndexed$_nth$arity$2(null,i__18101_18959);
var children_18961 = shadow.dom.dom_node(child_struct_18960);
if(cljs.core.seq_QMARK_(children_18961)){
var seq__18124_18962 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_18961));
var chunk__18126_18963 = null;
var count__18127_18964 = (0);
var i__18128_18965 = (0);
while(true){
if((i__18128_18965 < count__18127_18964)){
var child_18970 = chunk__18126_18963.cljs$core$IIndexed$_nth$arity$2(null,i__18128_18965);
if(cljs.core.truth_(child_18970)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18970);


var G__18971 = seq__18124_18962;
var G__18972 = chunk__18126_18963;
var G__18973 = count__18127_18964;
var G__18974 = (i__18128_18965 + (1));
seq__18124_18962 = G__18971;
chunk__18126_18963 = G__18972;
count__18127_18964 = G__18973;
i__18128_18965 = G__18974;
continue;
} else {
var G__18975 = seq__18124_18962;
var G__18976 = chunk__18126_18963;
var G__18977 = count__18127_18964;
var G__18978 = (i__18128_18965 + (1));
seq__18124_18962 = G__18975;
chunk__18126_18963 = G__18976;
count__18127_18964 = G__18977;
i__18128_18965 = G__18978;
continue;
}
} else {
var temp__5804__auto___18979 = cljs.core.seq(seq__18124_18962);
if(temp__5804__auto___18979){
var seq__18124_18980__$1 = temp__5804__auto___18979;
if(cljs.core.chunked_seq_QMARK_(seq__18124_18980__$1)){
var c__5568__auto___18981 = cljs.core.chunk_first(seq__18124_18980__$1);
var G__18982 = cljs.core.chunk_rest(seq__18124_18980__$1);
var G__18983 = c__5568__auto___18981;
var G__18984 = cljs.core.count(c__5568__auto___18981);
var G__18985 = (0);
seq__18124_18962 = G__18982;
chunk__18126_18963 = G__18983;
count__18127_18964 = G__18984;
i__18128_18965 = G__18985;
continue;
} else {
var child_18986 = cljs.core.first(seq__18124_18980__$1);
if(cljs.core.truth_(child_18986)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18986);


var G__18987 = cljs.core.next(seq__18124_18980__$1);
var G__18988 = null;
var G__18989 = (0);
var G__18990 = (0);
seq__18124_18962 = G__18987;
chunk__18126_18963 = G__18988;
count__18127_18964 = G__18989;
i__18128_18965 = G__18990;
continue;
} else {
var G__18991 = cljs.core.next(seq__18124_18980__$1);
var G__18992 = null;
var G__18993 = (0);
var G__18994 = (0);
seq__18124_18962 = G__18991;
chunk__18126_18963 = G__18992;
count__18127_18964 = G__18993;
i__18128_18965 = G__18994;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_18961);
}


var G__18995 = seq__18098_18956;
var G__18996 = chunk__18099_18957;
var G__18997 = count__18100_18958;
var G__18998 = (i__18101_18959 + (1));
seq__18098_18956 = G__18995;
chunk__18099_18957 = G__18996;
count__18100_18958 = G__18997;
i__18101_18959 = G__18998;
continue;
} else {
var temp__5804__auto___18999 = cljs.core.seq(seq__18098_18956);
if(temp__5804__auto___18999){
var seq__18098_19000__$1 = temp__5804__auto___18999;
if(cljs.core.chunked_seq_QMARK_(seq__18098_19000__$1)){
var c__5568__auto___19001 = cljs.core.chunk_first(seq__18098_19000__$1);
var G__19002 = cljs.core.chunk_rest(seq__18098_19000__$1);
var G__19003 = c__5568__auto___19001;
var G__19004 = cljs.core.count(c__5568__auto___19001);
var G__19005 = (0);
seq__18098_18956 = G__19002;
chunk__18099_18957 = G__19003;
count__18100_18958 = G__19004;
i__18101_18959 = G__19005;
continue;
} else {
var child_struct_19006 = cljs.core.first(seq__18098_19000__$1);
var children_19007 = shadow.dom.dom_node(child_struct_19006);
if(cljs.core.seq_QMARK_(children_19007)){
var seq__18147_19008 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_19007));
var chunk__18149_19009 = null;
var count__18150_19010 = (0);
var i__18151_19011 = (0);
while(true){
if((i__18151_19011 < count__18150_19010)){
var child_19012 = chunk__18149_19009.cljs$core$IIndexed$_nth$arity$2(null,i__18151_19011);
if(cljs.core.truth_(child_19012)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_19012);


var G__19013 = seq__18147_19008;
var G__19014 = chunk__18149_19009;
var G__19015 = count__18150_19010;
var G__19016 = (i__18151_19011 + (1));
seq__18147_19008 = G__19013;
chunk__18149_19009 = G__19014;
count__18150_19010 = G__19015;
i__18151_19011 = G__19016;
continue;
} else {
var G__19017 = seq__18147_19008;
var G__19018 = chunk__18149_19009;
var G__19019 = count__18150_19010;
var G__19020 = (i__18151_19011 + (1));
seq__18147_19008 = G__19017;
chunk__18149_19009 = G__19018;
count__18150_19010 = G__19019;
i__18151_19011 = G__19020;
continue;
}
} else {
var temp__5804__auto___19021__$1 = cljs.core.seq(seq__18147_19008);
if(temp__5804__auto___19021__$1){
var seq__18147_19022__$1 = temp__5804__auto___19021__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18147_19022__$1)){
var c__5568__auto___19023 = cljs.core.chunk_first(seq__18147_19022__$1);
var G__19024 = cljs.core.chunk_rest(seq__18147_19022__$1);
var G__19025 = c__5568__auto___19023;
var G__19026 = cljs.core.count(c__5568__auto___19023);
var G__19027 = (0);
seq__18147_19008 = G__19024;
chunk__18149_19009 = G__19025;
count__18150_19010 = G__19026;
i__18151_19011 = G__19027;
continue;
} else {
var child_19028 = cljs.core.first(seq__18147_19022__$1);
if(cljs.core.truth_(child_19028)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_19028);


var G__19029 = cljs.core.next(seq__18147_19022__$1);
var G__19030 = null;
var G__19031 = (0);
var G__19032 = (0);
seq__18147_19008 = G__19029;
chunk__18149_19009 = G__19030;
count__18150_19010 = G__19031;
i__18151_19011 = G__19032;
continue;
} else {
var G__19033 = cljs.core.next(seq__18147_19022__$1);
var G__19034 = null;
var G__19035 = (0);
var G__19036 = (0);
seq__18147_19008 = G__19033;
chunk__18149_19009 = G__19034;
count__18150_19010 = G__19035;
i__18151_19011 = G__19036;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_19007);
}


var G__19037 = cljs.core.next(seq__18098_19000__$1);
var G__19038 = null;
var G__19039 = (0);
var G__19040 = (0);
seq__18098_18956 = G__19037;
chunk__18099_18957 = G__19038;
count__18100_18958 = G__19039;
i__18101_18959 = G__19040;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__18170 = cljs.core.seq(node);
var chunk__18171 = null;
var count__18172 = (0);
var i__18173 = (0);
while(true){
if((i__18173 < count__18172)){
var n = chunk__18171.cljs$core$IIndexed$_nth$arity$2(null,i__18173);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__19054 = seq__18170;
var G__19055 = chunk__18171;
var G__19056 = count__18172;
var G__19057 = (i__18173 + (1));
seq__18170 = G__19054;
chunk__18171 = G__19055;
count__18172 = G__19056;
i__18173 = G__19057;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__18170);
if(temp__5804__auto__){
var seq__18170__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18170__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__18170__$1);
var G__19058 = cljs.core.chunk_rest(seq__18170__$1);
var G__19059 = c__5568__auto__;
var G__19060 = cljs.core.count(c__5568__auto__);
var G__19061 = (0);
seq__18170 = G__19058;
chunk__18171 = G__19059;
count__18172 = G__19060;
i__18173 = G__19061;
continue;
} else {
var n = cljs.core.first(seq__18170__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__19062 = cljs.core.next(seq__18170__$1);
var G__19063 = null;
var G__19064 = (0);
var G__19065 = (0);
seq__18170 = G__19062;
chunk__18171 = G__19063;
count__18172 = G__19064;
i__18173 = G__19065;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__18193 = arguments.length;
switch (G__18193) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__18206 = arguments.length;
switch (G__18206) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__18253 = arguments.length;
switch (G__18253) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19076 = arguments.length;
var i__5770__auto___19077 = (0);
while(true){
if((i__5770__auto___19077 < len__5769__auto___19076)){
args__5775__auto__.push((arguments[i__5770__auto___19077]));

var G__19078 = (i__5770__auto___19077 + (1));
i__5770__auto___19077 = G__19078;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__18296_19079 = cljs.core.seq(nodes);
var chunk__18297_19080 = null;
var count__18298_19081 = (0);
var i__18299_19082 = (0);
while(true){
if((i__18299_19082 < count__18298_19081)){
var node_19083 = chunk__18297_19080.cljs$core$IIndexed$_nth$arity$2(null,i__18299_19082);
fragment.appendChild(shadow.dom._to_dom(node_19083));


var G__19084 = seq__18296_19079;
var G__19085 = chunk__18297_19080;
var G__19086 = count__18298_19081;
var G__19087 = (i__18299_19082 + (1));
seq__18296_19079 = G__19084;
chunk__18297_19080 = G__19085;
count__18298_19081 = G__19086;
i__18299_19082 = G__19087;
continue;
} else {
var temp__5804__auto___19088 = cljs.core.seq(seq__18296_19079);
if(temp__5804__auto___19088){
var seq__18296_19089__$1 = temp__5804__auto___19088;
if(cljs.core.chunked_seq_QMARK_(seq__18296_19089__$1)){
var c__5568__auto___19093 = cljs.core.chunk_first(seq__18296_19089__$1);
var G__19094 = cljs.core.chunk_rest(seq__18296_19089__$1);
var G__19095 = c__5568__auto___19093;
var G__19096 = cljs.core.count(c__5568__auto___19093);
var G__19097 = (0);
seq__18296_19079 = G__19094;
chunk__18297_19080 = G__19095;
count__18298_19081 = G__19096;
i__18299_19082 = G__19097;
continue;
} else {
var node_19098 = cljs.core.first(seq__18296_19089__$1);
fragment.appendChild(shadow.dom._to_dom(node_19098));


var G__19099 = cljs.core.next(seq__18296_19089__$1);
var G__19100 = null;
var G__19101 = (0);
var G__19102 = (0);
seq__18296_19079 = G__19099;
chunk__18297_19080 = G__19100;
count__18298_19081 = G__19101;
i__18299_19082 = G__19102;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq18290){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq18290));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__18308_19107 = cljs.core.seq(scripts);
var chunk__18309_19108 = null;
var count__18310_19109 = (0);
var i__18311_19110 = (0);
while(true){
if((i__18311_19110 < count__18310_19109)){
var vec__18318_19111 = chunk__18309_19108.cljs$core$IIndexed$_nth$arity$2(null,i__18311_19110);
var script_tag_19112 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18318_19111,(0),null);
var script_body_19113 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18318_19111,(1),null);
eval(script_body_19113);


var G__19114 = seq__18308_19107;
var G__19115 = chunk__18309_19108;
var G__19116 = count__18310_19109;
var G__19117 = (i__18311_19110 + (1));
seq__18308_19107 = G__19114;
chunk__18309_19108 = G__19115;
count__18310_19109 = G__19116;
i__18311_19110 = G__19117;
continue;
} else {
var temp__5804__auto___19118 = cljs.core.seq(seq__18308_19107);
if(temp__5804__auto___19118){
var seq__18308_19119__$1 = temp__5804__auto___19118;
if(cljs.core.chunked_seq_QMARK_(seq__18308_19119__$1)){
var c__5568__auto___19120 = cljs.core.chunk_first(seq__18308_19119__$1);
var G__19121 = cljs.core.chunk_rest(seq__18308_19119__$1);
var G__19122 = c__5568__auto___19120;
var G__19123 = cljs.core.count(c__5568__auto___19120);
var G__19124 = (0);
seq__18308_19107 = G__19121;
chunk__18309_19108 = G__19122;
count__18310_19109 = G__19123;
i__18311_19110 = G__19124;
continue;
} else {
var vec__18333_19126 = cljs.core.first(seq__18308_19119__$1);
var script_tag_19127 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18333_19126,(0),null);
var script_body_19128 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18333_19126,(1),null);
eval(script_body_19128);


var G__19133 = cljs.core.next(seq__18308_19119__$1);
var G__19134 = null;
var G__19135 = (0);
var G__19136 = (0);
seq__18308_19107 = G__19133;
chunk__18309_19108 = G__19134;
count__18310_19109 = G__19135;
i__18311_19110 = G__19136;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__18336){
var vec__18337 = p__18336;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18337,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18337,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__18341 = arguments.length;
switch (G__18341) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__18351 = cljs.core.seq(style_keys);
var chunk__18352 = null;
var count__18353 = (0);
var i__18354 = (0);
while(true){
if((i__18354 < count__18353)){
var it = chunk__18352.cljs$core$IIndexed$_nth$arity$2(null,i__18354);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__19149 = seq__18351;
var G__19150 = chunk__18352;
var G__19151 = count__18353;
var G__19152 = (i__18354 + (1));
seq__18351 = G__19149;
chunk__18352 = G__19150;
count__18353 = G__19151;
i__18354 = G__19152;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__18351);
if(temp__5804__auto__){
var seq__18351__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__18351__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__18351__$1);
var G__19153 = cljs.core.chunk_rest(seq__18351__$1);
var G__19154 = c__5568__auto__;
var G__19155 = cljs.core.count(c__5568__auto__);
var G__19156 = (0);
seq__18351 = G__19153;
chunk__18352 = G__19154;
count__18353 = G__19155;
i__18354 = G__19156;
continue;
} else {
var it = cljs.core.first(seq__18351__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__19157 = cljs.core.next(seq__18351__$1);
var G__19158 = null;
var G__19159 = (0);
var G__19160 = (0);
seq__18351 = G__19157;
chunk__18352 = G__19158;
count__18353 = G__19159;
i__18354 = G__19160;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k18359,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__18365 = k18359;
var G__18365__$1 = (((G__18365 instanceof cljs.core.Keyword))?G__18365.fqn:null);
switch (G__18365__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k18359,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__18377){
var vec__18378 = p__18377;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18378,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18378,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__18358){
var self__ = this;
var G__18358__$1 = this;
return (new cljs.core.RecordIter((0),G__18358__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this18360,other18361){
var self__ = this;
var this18360__$1 = this;
return (((!((other18361 == null)))) && ((((this18360__$1.constructor === other18361.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18360__$1.x,other18361.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18360__$1.y,other18361.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18360__$1.__extmap,other18361.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k18359){
var self__ = this;
var this__5350__auto____$1 = this;
var G__18392 = k18359;
var G__18392__$1 = (((G__18392 instanceof cljs.core.Keyword))?G__18392.fqn:null);
switch (G__18392__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k18359);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__18358){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__18393 = cljs.core.keyword_identical_QMARK_;
var expr__18394 = k__5352__auto__;
if(cljs.core.truth_((pred__18393.cljs$core$IFn$_invoke$arity$2 ? pred__18393.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__18394) : pred__18393.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__18394)))){
return (new shadow.dom.Coordinate(G__18358,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__18393.cljs$core$IFn$_invoke$arity$2 ? pred__18393.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__18394) : pred__18393.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__18394)))){
return (new shadow.dom.Coordinate(self__.x,G__18358,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__18358),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__18358){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__18358,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__18364){
var extmap__5385__auto__ = (function (){var G__18409 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__18364,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__18364)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__18409);
} else {
return G__18409;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__18364),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__18364),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k18411,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__18418 = k18411;
var G__18418__$1 = (((G__18418 instanceof cljs.core.Keyword))?G__18418.fqn:null);
switch (G__18418__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k18411,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__18421){
var vec__18422 = p__18421;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18422,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18422,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__18410){
var self__ = this;
var G__18410__$1 = this;
return (new cljs.core.RecordIter((0),G__18410__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this18412,other18413){
var self__ = this;
var this18412__$1 = this;
return (((!((other18413 == null)))) && ((((this18412__$1.constructor === other18413.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18412__$1.w,other18413.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18412__$1.h,other18413.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this18412__$1.__extmap,other18413.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k18411){
var self__ = this;
var this__5350__auto____$1 = this;
var G__18438 = k18411;
var G__18438__$1 = (((G__18438 instanceof cljs.core.Keyword))?G__18438.fqn:null);
switch (G__18438__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k18411);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__18410){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__18451 = cljs.core.keyword_identical_QMARK_;
var expr__18452 = k__5352__auto__;
if(cljs.core.truth_((pred__18451.cljs$core$IFn$_invoke$arity$2 ? pred__18451.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__18452) : pred__18451.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__18452)))){
return (new shadow.dom.Size(G__18410,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__18451.cljs$core$IFn$_invoke$arity$2 ? pred__18451.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__18452) : pred__18451.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__18452)))){
return (new shadow.dom.Size(self__.w,G__18410,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__18410),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__18410){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__18410,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__18414){
var extmap__5385__auto__ = (function (){var G__18523 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__18414,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__18414)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__18523);
} else {
return G__18523;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__18414),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__18414),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__19291 = (i + (1));
var G__19292 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__19291;
ret = G__19292;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__18545){
var vec__18546 = p__18545;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18546,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18546,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__18550 = arguments.length;
switch (G__18550) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__19305 = ps;
var G__19306 = (i + (1));
el__$1 = G__19305;
i = G__19306;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__18566 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18566,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18566,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18566,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__18569_19308 = cljs.core.seq(props);
var chunk__18570_19309 = null;
var count__18571_19310 = (0);
var i__18572_19311 = (0);
while(true){
if((i__18572_19311 < count__18571_19310)){
var vec__18589_19312 = chunk__18570_19309.cljs$core$IIndexed$_nth$arity$2(null,i__18572_19311);
var k_19313 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18589_19312,(0),null);
var v_19314 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18589_19312,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_19313);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_19313),v_19314);


var G__19315 = seq__18569_19308;
var G__19316 = chunk__18570_19309;
var G__19317 = count__18571_19310;
var G__19318 = (i__18572_19311 + (1));
seq__18569_19308 = G__19315;
chunk__18570_19309 = G__19316;
count__18571_19310 = G__19317;
i__18572_19311 = G__19318;
continue;
} else {
var temp__5804__auto___19319 = cljs.core.seq(seq__18569_19308);
if(temp__5804__auto___19319){
var seq__18569_19320__$1 = temp__5804__auto___19319;
if(cljs.core.chunked_seq_QMARK_(seq__18569_19320__$1)){
var c__5568__auto___19321 = cljs.core.chunk_first(seq__18569_19320__$1);
var G__19322 = cljs.core.chunk_rest(seq__18569_19320__$1);
var G__19323 = c__5568__auto___19321;
var G__19324 = cljs.core.count(c__5568__auto___19321);
var G__19325 = (0);
seq__18569_19308 = G__19322;
chunk__18570_19309 = G__19323;
count__18571_19310 = G__19324;
i__18572_19311 = G__19325;
continue;
} else {
var vec__18592_19326 = cljs.core.first(seq__18569_19320__$1);
var k_19327 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18592_19326,(0),null);
var v_19328 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18592_19326,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_19327);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_19327),v_19328);


var G__19330 = cljs.core.next(seq__18569_19320__$1);
var G__19331 = null;
var G__19332 = (0);
var G__19333 = (0);
seq__18569_19308 = G__19330;
chunk__18570_19309 = G__19331;
count__18571_19310 = G__19332;
i__18572_19311 = G__19333;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__18634 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18634,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18634,(1),null);
var seq__18637_19338 = cljs.core.seq(node_children);
var chunk__18639_19339 = null;
var count__18640_19340 = (0);
var i__18641_19341 = (0);
while(true){
if((i__18641_19341 < count__18640_19340)){
var child_struct_19342 = chunk__18639_19339.cljs$core$IIndexed$_nth$arity$2(null,i__18641_19341);
if((!((child_struct_19342 == null)))){
if(typeof child_struct_19342 === 'string'){
var text_19343 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_19343),child_struct_19342].join(''));
} else {
var children_19344 = shadow.dom.svg_node(child_struct_19342);
if(cljs.core.seq_QMARK_(children_19344)){
var seq__18674_19345 = cljs.core.seq(children_19344);
var chunk__18676_19346 = null;
var count__18677_19347 = (0);
var i__18678_19348 = (0);
while(true){
if((i__18678_19348 < count__18677_19347)){
var child_19349 = chunk__18676_19346.cljs$core$IIndexed$_nth$arity$2(null,i__18678_19348);
if(cljs.core.truth_(child_19349)){
node.appendChild(child_19349);


var G__19350 = seq__18674_19345;
var G__19351 = chunk__18676_19346;
var G__19352 = count__18677_19347;
var G__19353 = (i__18678_19348 + (1));
seq__18674_19345 = G__19350;
chunk__18676_19346 = G__19351;
count__18677_19347 = G__19352;
i__18678_19348 = G__19353;
continue;
} else {
var G__19354 = seq__18674_19345;
var G__19355 = chunk__18676_19346;
var G__19356 = count__18677_19347;
var G__19357 = (i__18678_19348 + (1));
seq__18674_19345 = G__19354;
chunk__18676_19346 = G__19355;
count__18677_19347 = G__19356;
i__18678_19348 = G__19357;
continue;
}
} else {
var temp__5804__auto___19359 = cljs.core.seq(seq__18674_19345);
if(temp__5804__auto___19359){
var seq__18674_19360__$1 = temp__5804__auto___19359;
if(cljs.core.chunked_seq_QMARK_(seq__18674_19360__$1)){
var c__5568__auto___19361 = cljs.core.chunk_first(seq__18674_19360__$1);
var G__19362 = cljs.core.chunk_rest(seq__18674_19360__$1);
var G__19363 = c__5568__auto___19361;
var G__19364 = cljs.core.count(c__5568__auto___19361);
var G__19365 = (0);
seq__18674_19345 = G__19362;
chunk__18676_19346 = G__19363;
count__18677_19347 = G__19364;
i__18678_19348 = G__19365;
continue;
} else {
var child_19366 = cljs.core.first(seq__18674_19360__$1);
if(cljs.core.truth_(child_19366)){
node.appendChild(child_19366);


var G__19367 = cljs.core.next(seq__18674_19360__$1);
var G__19368 = null;
var G__19369 = (0);
var G__19370 = (0);
seq__18674_19345 = G__19367;
chunk__18676_19346 = G__19368;
count__18677_19347 = G__19369;
i__18678_19348 = G__19370;
continue;
} else {
var G__19371 = cljs.core.next(seq__18674_19360__$1);
var G__19372 = null;
var G__19373 = (0);
var G__19374 = (0);
seq__18674_19345 = G__19371;
chunk__18676_19346 = G__19372;
count__18677_19347 = G__19373;
i__18678_19348 = G__19374;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_19344);
}
}


var G__19375 = seq__18637_19338;
var G__19376 = chunk__18639_19339;
var G__19377 = count__18640_19340;
var G__19378 = (i__18641_19341 + (1));
seq__18637_19338 = G__19375;
chunk__18639_19339 = G__19376;
count__18640_19340 = G__19377;
i__18641_19341 = G__19378;
continue;
} else {
var G__19379 = seq__18637_19338;
var G__19380 = chunk__18639_19339;
var G__19381 = count__18640_19340;
var G__19382 = (i__18641_19341 + (1));
seq__18637_19338 = G__19379;
chunk__18639_19339 = G__19380;
count__18640_19340 = G__19381;
i__18641_19341 = G__19382;
continue;
}
} else {
var temp__5804__auto___19383 = cljs.core.seq(seq__18637_19338);
if(temp__5804__auto___19383){
var seq__18637_19384__$1 = temp__5804__auto___19383;
if(cljs.core.chunked_seq_QMARK_(seq__18637_19384__$1)){
var c__5568__auto___19385 = cljs.core.chunk_first(seq__18637_19384__$1);
var G__19386 = cljs.core.chunk_rest(seq__18637_19384__$1);
var G__19387 = c__5568__auto___19385;
var G__19388 = cljs.core.count(c__5568__auto___19385);
var G__19389 = (0);
seq__18637_19338 = G__19386;
chunk__18639_19339 = G__19387;
count__18640_19340 = G__19388;
i__18641_19341 = G__19389;
continue;
} else {
var child_struct_19390 = cljs.core.first(seq__18637_19384__$1);
if((!((child_struct_19390 == null)))){
if(typeof child_struct_19390 === 'string'){
var text_19391 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_19391),child_struct_19390].join(''));
} else {
var children_19392 = shadow.dom.svg_node(child_struct_19390);
if(cljs.core.seq_QMARK_(children_19392)){
var seq__18727_19393 = cljs.core.seq(children_19392);
var chunk__18729_19394 = null;
var count__18730_19395 = (0);
var i__18731_19396 = (0);
while(true){
if((i__18731_19396 < count__18730_19395)){
var child_19398 = chunk__18729_19394.cljs$core$IIndexed$_nth$arity$2(null,i__18731_19396);
if(cljs.core.truth_(child_19398)){
node.appendChild(child_19398);


var G__19399 = seq__18727_19393;
var G__19400 = chunk__18729_19394;
var G__19401 = count__18730_19395;
var G__19402 = (i__18731_19396 + (1));
seq__18727_19393 = G__19399;
chunk__18729_19394 = G__19400;
count__18730_19395 = G__19401;
i__18731_19396 = G__19402;
continue;
} else {
var G__19403 = seq__18727_19393;
var G__19404 = chunk__18729_19394;
var G__19405 = count__18730_19395;
var G__19406 = (i__18731_19396 + (1));
seq__18727_19393 = G__19403;
chunk__18729_19394 = G__19404;
count__18730_19395 = G__19405;
i__18731_19396 = G__19406;
continue;
}
} else {
var temp__5804__auto___19407__$1 = cljs.core.seq(seq__18727_19393);
if(temp__5804__auto___19407__$1){
var seq__18727_19408__$1 = temp__5804__auto___19407__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18727_19408__$1)){
var c__5568__auto___19409 = cljs.core.chunk_first(seq__18727_19408__$1);
var G__19410 = cljs.core.chunk_rest(seq__18727_19408__$1);
var G__19411 = c__5568__auto___19409;
var G__19412 = cljs.core.count(c__5568__auto___19409);
var G__19413 = (0);
seq__18727_19393 = G__19410;
chunk__18729_19394 = G__19411;
count__18730_19395 = G__19412;
i__18731_19396 = G__19413;
continue;
} else {
var child_19414 = cljs.core.first(seq__18727_19408__$1);
if(cljs.core.truth_(child_19414)){
node.appendChild(child_19414);


var G__19415 = cljs.core.next(seq__18727_19408__$1);
var G__19416 = null;
var G__19417 = (0);
var G__19418 = (0);
seq__18727_19393 = G__19415;
chunk__18729_19394 = G__19416;
count__18730_19395 = G__19417;
i__18731_19396 = G__19418;
continue;
} else {
var G__19419 = cljs.core.next(seq__18727_19408__$1);
var G__19420 = null;
var G__19421 = (0);
var G__19422 = (0);
seq__18727_19393 = G__19419;
chunk__18729_19394 = G__19420;
count__18730_19395 = G__19421;
i__18731_19396 = G__19422;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_19392);
}
}


var G__19423 = cljs.core.next(seq__18637_19384__$1);
var G__19424 = null;
var G__19425 = (0);
var G__19426 = (0);
seq__18637_19338 = G__19423;
chunk__18639_19339 = G__19424;
count__18640_19340 = G__19425;
i__18641_19341 = G__19426;
continue;
} else {
var G__19427 = cljs.core.next(seq__18637_19384__$1);
var G__19428 = null;
var G__19429 = (0);
var G__19430 = (0);
seq__18637_19338 = G__19427;
chunk__18639_19339 = G__19428;
count__18640_19340 = G__19429;
i__18641_19341 = G__19430;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19432 = arguments.length;
var i__5770__auto___19433 = (0);
while(true){
if((i__5770__auto___19433 < len__5769__auto___19432)){
args__5775__auto__.push((arguments[i__5770__auto___19433]));

var G__19434 = (i__5770__auto___19433 + (1));
i__5770__auto___19433 = G__19434;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq18753){
var G__18754 = cljs.core.first(seq18753);
var seq18753__$1 = cljs.core.next(seq18753);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18754,seq18753__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__18757 = arguments.length;
switch (G__18757) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__14281__auto___19440 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__14282__auto__ = (function (){var switch__13952__auto__ = (function (state_18770){
var state_val_18771 = (state_18770[(1)]);
if((state_val_18771 === (1))){
var state_18770__$1 = state_18770;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18770__$1,(2),once_or_cleanup);
} else {
if((state_val_18771 === (2))){
var inst_18767 = (state_18770[(2)]);
var inst_18768 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_18770__$1 = (function (){var statearr_18774 = state_18770;
(statearr_18774[(7)] = inst_18767);

return statearr_18774;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18770__$1,inst_18768);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__13953__auto__ = null;
var shadow$dom$state_machine__13953__auto____0 = (function (){
var statearr_18775 = [null,null,null,null,null,null,null,null];
(statearr_18775[(0)] = shadow$dom$state_machine__13953__auto__);

(statearr_18775[(1)] = (1));

return statearr_18775;
});
var shadow$dom$state_machine__13953__auto____1 = (function (state_18770){
while(true){
var ret_value__13966__auto__ = (function (){try{while(true){
var result__13967__auto__ = switch__13952__auto__(state_18770);
if(cljs.core.keyword_identical_QMARK_(result__13967__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__13967__auto__;
}
break;
}
}catch (e18776){var ex__13968__auto__ = e18776;
var statearr_18777_19444 = state_18770;
(statearr_18777_19444[(2)] = ex__13968__auto__);


if(cljs.core.seq((state_18770[(4)]))){
var statearr_18778_19445 = state_18770;
(statearr_18778_19445[(1)] = cljs.core.first((state_18770[(4)])));

} else {
throw ex__13968__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__13966__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19446 = state_18770;
state_18770 = G__19446;
continue;
} else {
return ret_value__13966__auto__;
}
break;
}
});
shadow$dom$state_machine__13953__auto__ = function(state_18770){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__13953__auto____0.call(this);
case 1:
return shadow$dom$state_machine__13953__auto____1.call(this,state_18770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__13953__auto____0;
shadow$dom$state_machine__13953__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__13953__auto____1;
return shadow$dom$state_machine__13953__auto__;
})()
})();
var state__14283__auto__ = (function (){var statearr_18781 = f__14282__auto__();
(statearr_18781[(6)] = c__14281__auto___19440);

return statearr_18781;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__14283__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);

Object.defineProperty(module.exports, "contains_QMARK_", { enumerable: false, get: function() { return shadow.dom.contains_QMARK_; } });
Object.defineProperty(module.exports, "eval_scripts", { enumerable: false, get: function() { return shadow.dom.eval_scripts; } });
Object.defineProperty(module.exports, "redirect", { enumerable: false, get: function() { return shadow.dom.redirect; } });
Object.defineProperty(module.exports, "native_coll", { enumerable: false, get: function() { return shadow.dom.native_coll; } });
Object.defineProperty(module.exports, "NativeColl", { enumerable: false, get: function() { return shadow.dom.NativeColl; } });
Object.defineProperty(module.exports, "query", { enumerable: false, get: function() { return shadow.dom.query; } });
Object.defineProperty(module.exports, "make_svg_node", { enumerable: false, get: function() { return shadow.dom.make_svg_node; } });
Object.defineProperty(module.exports, "str__GT_fragment", { enumerable: false, get: function() { return shadow.dom.str__GT_fragment; } });
Object.defineProperty(module.exports, "_to_svg", { enumerable: false, get: function() { return shadow.dom._to_svg; } });
Object.defineProperty(module.exports, "child_nodes", { enumerable: false, get: function() { return shadow.dom.child_nodes; } });
Object.defineProperty(module.exports, "insert_before", { enumerable: false, get: function() { return shadow.dom.insert_before; } });
Object.defineProperty(module.exports, "merge_class_string", { enumerable: false, get: function() { return shadow.dom.merge_class_string; } });
Object.defineProperty(module.exports, "has_class_QMARK_", { enumerable: false, get: function() { return shadow.dom.has_class_QMARK_; } });
Object.defineProperty(module.exports, "map__GT_Size", { enumerable: false, get: function() { return shadow.dom.map__GT_Size; } });
Object.defineProperty(module.exports, "text", { enumerable: false, get: function() { return shadow.dom.text; } });
Object.defineProperty(module.exports, "data", { enumerable: false, get: function() { return shadow.dom.data; } });
Object.defineProperty(module.exports, "transition_supported_QMARK_", { enumerable: false, get: function() { return shadow.dom.transition_supported_QMARK_; } });
Object.defineProperty(module.exports, "attr", { enumerable: false, get: function() { return shadow.dom.attr; } });
Object.defineProperty(module.exports, "remove_styles", { enumerable: false, get: function() { return shadow.dom.remove_styles; } });
Object.defineProperty(module.exports, "remove_event_handler", { enumerable: false, get: function() { return shadow.dom.remove_event_handler; } });
Object.defineProperty(module.exports, "remove_class", { enumerable: false, get: function() { return shadow.dom.remove_class; } });
Object.defineProperty(module.exports, "select_option_values", { enumerable: false, get: function() { return shadow.dom.select_option_values; } });
Object.defineProperty(module.exports, "insert_after", { enumerable: false, get: function() { return shadow.dom.insert_after; } });
Object.defineProperty(module.exports, "svg_node", { enumerable: false, get: function() { return shadow.dom.svg_node; } });
Object.defineProperty(module.exports, "children", { enumerable: false, get: function() { return shadow.dom.children; } });
Object.defineProperty(module.exports, "first_child", { enumerable: false, get: function() { return shadow.dom.first_child; } });
Object.defineProperty(module.exports, "get_html", { enumerable: false, get: function() { return shadow.dom.get_html; } });
Object.defineProperty(module.exports, "remove", { enumerable: false, get: function() { return shadow.dom.remove; } });
Object.defineProperty(module.exports, "__GT_Coordinate", { enumerable: false, get: function() { return shadow.dom.__GT_Coordinate; } });
Object.defineProperty(module.exports, "dom_listen_remove", { enumerable: false, get: function() { return shadow.dom.dom_listen_remove; } });
Object.defineProperty(module.exports, "by_id", { enumerable: false, get: function() { return shadow.dom.by_id; } });
Object.defineProperty(module.exports, "checked_QMARK_", { enumerable: false, get: function() { return shadow.dom.checked_QMARK_; } });
Object.defineProperty(module.exports, "tag_name", { enumerable: false, get: function() { return shadow.dom.tag_name; } });
Object.defineProperty(module.exports, "get_size", { enumerable: false, get: function() { return shadow.dom.get_size; } });
Object.defineProperty(module.exports, "dom_listen", { enumerable: false, get: function() { return shadow.dom.dom_listen; } });
Object.defineProperty(module.exports, "get_viewport_size", { enumerable: false, get: function() { return shadow.dom.get_viewport_size; } });
Object.defineProperty(module.exports, "add_event_listeners", { enumerable: false, get: function() { return shadow.dom.add_event_listeners; } });
Object.defineProperty(module.exports, "set_attr", { enumerable: false, get: function() { return shadow.dom.set_attr; } });
Object.defineProperty(module.exports, "reset", { enumerable: false, get: function() { return shadow.dom.reset; } });
Object.defineProperty(module.exports, "IElement", { enumerable: false, get: function() { return shadow.dom.IElement; } });
Object.defineProperty(module.exports, "make_dom_node", { enumerable: false, get: function() { return shadow.dom.make_dom_node; } });
Object.defineProperty(module.exports, "SVGElement", { enumerable: false, get: function() { return shadow.dom.SVGElement; } });
Object.defineProperty(module.exports, "form_elements", { enumerable: false, get: function() { return shadow.dom.form_elements; } });
Object.defineProperty(module.exports, "Size", { enumerable: false, get: function() { return shadow.dom.Size; } });
Object.defineProperty(module.exports, "lazy_native_coll_seq", { enumerable: false, get: function() { return shadow.dom.lazy_native_coll_seq; } });
Object.defineProperty(module.exports, "get_parent", { enumerable: false, get: function() { return shadow.dom.get_parent; } });
Object.defineProperty(module.exports, "get_height", { enumerable: false, get: function() { return shadow.dom.get_height; } });
Object.defineProperty(module.exports, "event_chan", { enumerable: false, get: function() { return shadow.dom.event_chan; } });
Object.defineProperty(module.exports, "fragment", { enumerable: false, get: function() { return shadow.dom.fragment; } });
Object.defineProperty(module.exports, "check", { enumerable: false, get: function() { return shadow.dom.check; } });
Object.defineProperty(module.exports, "Coordinate", { enumerable: false, get: function() { return shadow.dom.Coordinate; } });
Object.defineProperty(module.exports, "parse_tag", { enumerable: false, get: function() { return shadow.dom.parse_tag; } });
Object.defineProperty(module.exports, "del_attr", { enumerable: false, get: function() { return shadow.dom.del_attr; } });
Object.defineProperty(module.exports, "reload_BANG_", { enumerable: false, get: function() { return shadow.dom.reload_BANG_; } });
Object.defineProperty(module.exports, "destructure_node", { enumerable: false, get: function() { return shadow.dom.destructure_node; } });
Object.defineProperty(module.exports, "remove_style", { enumerable: false, get: function() { return shadow.dom.remove_style; } });
Object.defineProperty(module.exports, "append", { enumerable: false, get: function() { return shadow.dom.append; } });
Object.defineProperty(module.exports, "px", { enumerable: false, get: function() { return shadow.dom.px; } });
Object.defineProperty(module.exports, "get_value", { enumerable: false, get: function() { return shadow.dom.get_value; } });
Object.defineProperty(module.exports, "ev_stop", { enumerable: false, get: function() { return shadow.dom.ev_stop; } });
Object.defineProperty(module.exports, "_to_dom", { enumerable: false, get: function() { return shadow.dom._to_dom; } });
Object.defineProperty(module.exports, "xmlns", { enumerable: false, get: function() { return shadow.dom.xmlns; } });
Object.defineProperty(module.exports, "matches", { enumerable: false, get: function() { return shadow.dom.matches; } });
Object.defineProperty(module.exports, "insert_first", { enumerable: false, get: function() { return shadow.dom.insert_first; } });
Object.defineProperty(module.exports, "map__GT_Coordinate", { enumerable: false, get: function() { return shadow.dom.map__GT_Coordinate; } });
Object.defineProperty(module.exports, "create_dom_node", { enumerable: false, get: function() { return shadow.dom.create_dom_node; } });
Object.defineProperty(module.exports, "__GT_NativeColl", { enumerable: false, get: function() { return shadow.dom.__GT_NativeColl; } });
Object.defineProperty(module.exports, "get_position", { enumerable: false, get: function() { return shadow.dom.get_position; } });
Object.defineProperty(module.exports, "dom_node", { enumerable: false, get: function() { return shadow.dom.dom_node; } });
Object.defineProperty(module.exports, "set_data", { enumerable: false, get: function() { return shadow.dom.set_data; } });
Object.defineProperty(module.exports, "get_client_position", { enumerable: false, get: function() { return shadow.dom.get_client_position; } });
Object.defineProperty(module.exports, "get_page_offset", { enumerable: false, get: function() { return shadow.dom.get_page_offset; } });
Object.defineProperty(module.exports, "query_one", { enumerable: false, get: function() { return shadow.dom.query_one; } });
Object.defineProperty(module.exports, "get_next_sibling", { enumerable: false, get: function() { return shadow.dom.get_next_sibling; } });
Object.defineProperty(module.exports, "set_style", { enumerable: false, get: function() { return shadow.dom.set_style; } });
Object.defineProperty(module.exports, "pct", { enumerable: false, get: function() { return shadow.dom.pct; } });
Object.defineProperty(module.exports, "get_previous_sibling", { enumerable: false, get: function() { return shadow.dom.get_previous_sibling; } });
Object.defineProperty(module.exports, "ancestor_by_tag", { enumerable: false, get: function() { return shadow.dom.ancestor_by_tag; } });
Object.defineProperty(module.exports, "build", { enumerable: false, get: function() { return shadow.dom.build; } });
Object.defineProperty(module.exports, "set_html", { enumerable: false, get: function() { return shadow.dom.set_html; } });
Object.defineProperty(module.exports, "build_url", { enumerable: false, get: function() { return shadow.dom.build_url; } });
Object.defineProperty(module.exports, "ancestor_by_class", { enumerable: false, get: function() { return shadow.dom.ancestor_by_class; } });
Object.defineProperty(module.exports, "__GT_Size", { enumerable: false, get: function() { return shadow.dom.__GT_Size; } });
Object.defineProperty(module.exports, "add_class", { enumerable: false, get: function() { return shadow.dom.add_class; } });
Object.defineProperty(module.exports, "node_name", { enumerable: false, get: function() { return shadow.dom.node_name; } });
Object.defineProperty(module.exports, "parents", { enumerable: false, get: function() { return shadow.dom.parents; } });
Object.defineProperty(module.exports, "on_query", { enumerable: false, get: function() { return shadow.dom.on_query; } });
Object.defineProperty(module.exports, "create_svg_node", { enumerable: false, get: function() { return shadow.dom.create_svg_node; } });
Object.defineProperty(module.exports, "set_attrs", { enumerable: false, get: function() { return shadow.dom.set_attrs; } });
Object.defineProperty(module.exports, "svg", { enumerable: false, get: function() { return shadow.dom.svg; } });
Object.defineProperty(module.exports, "index_of", { enumerable: false, get: function() { return shadow.dom.index_of; } });
Object.defineProperty(module.exports, "replace_node", { enumerable: false, get: function() { return shadow.dom.replace_node; } });
Object.defineProperty(module.exports, "size__GT_clj", { enumerable: false, get: function() { return shadow.dom.size__GT_clj; } });
Object.defineProperty(module.exports, "set_attr_STAR_", { enumerable: false, get: function() { return shadow.dom.set_attr_STAR_; } });
Object.defineProperty(module.exports, "on", { enumerable: false, get: function() { return shadow.dom.on; } });
Object.defineProperty(module.exports, "remove_style_STAR_", { enumerable: false, get: function() { return shadow.dom.remove_style_STAR_; } });
Object.defineProperty(module.exports, "toggle_class", { enumerable: false, get: function() { return shadow.dom.toggle_class; } });
Object.defineProperty(module.exports, "set_value", { enumerable: false, get: function() { return shadow.dom.set_value; } });
//# sourceMappingURL=shadow.dom.js.map
