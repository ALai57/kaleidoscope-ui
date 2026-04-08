var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./reagent.core.js");
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

$CLJS.SHADOW_ENV.setLoaded("kaleidoscope.ui.components.colors.saturation_lightness_grid.js");

goog.provide('kaleidoscope.ui.components.colors.saturation_lightness_grid');
kaleidoscope.ui.components.colors.saturation_lightness_grid.hsl = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$hsl(hue,saturation,lightness){
return goog.string.format("hsl(%s, %s%, %s%)",hue,saturation,lightness);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$deg__GT_rad(deg){
return ((deg * Math.PI) / (180));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.rad__GT_deg = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$rad__GT_deg(rad){
return ((180) * (rad / Math.PI));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$clamp(val,p__19666){
var map__19668 = p__19666;
var map__19668__$1 = cljs.core.__destructure_map(map__19668);
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19668__$1,new cljs.core.Keyword(null,"min","min",444991522),(0));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19668__$1,new cljs.core.Keyword(null,"max","max",61366548),(100));
if((val < min)){
return min;
} else {
if((val > max)){
return max;
} else {
return val;

}
}
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.euclidean_distance = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$euclidean_distance(p__19678,p__19679){
var vec__19680 = p__19678;
var x1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19680,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19680,(1),null);
var vec__19683 = p__19679;
var x2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19683,(0),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19683,(1),null);
return Math.sqrt((Math.pow((x1 - x2),(2)) + Math.pow((y1 - y2),(2))));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.coords__GT_rads = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$coords__GT_rads(x,y){
return Math.atan2(x,y);
});
/**
 * Calculate the saturation (x), lightness (y) coordinates
 */
kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$calculate_sl_coordinates(grid_ref,event){
var event_x = event.clientX;
var event_y = event.clientY;
var container_target = grid_ref.getBoundingClientRect();
var container_x = container_target.x;
var container_y = container_target.y;
var container_w = container_target.width;
var container_h = container_target.height;
var x = (container_x - event_x);
var y = (container_y - event_y);
var saturation = (- ((x / container_w) * (100)));
var lightness = (((y / container_h) * (100)) + (100));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$calculate_marker_coordinates(p__19692){
var map__19694 = p__19692;
var map__19694__$1 = cljs.core.__destructure_map(map__19694);
var base_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19694__$1,new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794));
var base_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19694__$1,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19694__$1,new cljs.core.Keyword(null,"r","r",-471384190),(20));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19694__$1,new cljs.core.Keyword(null,"theta","theta",-427510258),(-45));
var dx = (Math.cos(kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad(theta)) * r);
var dy = (Math.sin(kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad(theta)) * r);
var new_saturation = (base_saturation + dx);
var new_lightness = (base_lightness + dy);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),new_saturation,new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new_lightness], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid._centered_dot = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$_centered_dot(p__19698){
var map__19699 = p__19698;
var map__19699__$1 = cljs.core.__destructure_map(map__19699);
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19699__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19699__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19699__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"centered",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateX(-%spx) translateY(-%spx)",radius,radius)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),"dot",new cljs.core.Keyword(null,"unitsfromorigin","unitsfromorigin",923214131),units_from_origin,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"opacity","opacity",397153780),(function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "50%";
}
})(),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"background","background",-863952629),"white"], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.marker = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$marker(p__19703){
var map__19704 = p__19703;
var map__19704__$1 = cljs.core.__destructure_map(map__19704);
var activate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"activate","activate",441219614));
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"r","r",-471384190));
var base_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794));
var base_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637));
var deactivate = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
var border_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19704__$1,new cljs.core.Keyword(null,"border-size","border-size",991975640));
var map__19709 = kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),base_saturation,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),base_lightness,new cljs.core.Keyword(null,"r","r",-471384190),r,new cljs.core.Keyword(null,"theta","theta",-427510258),theta], null));
var map__19709__$1 = cljs.core.__destructure_map(map__19709);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19709__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19709__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var normalized_saturation = (border_size * (saturation / (100)));
var normalized_lightness = (- (border_size * (lightness / (100))));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (event){
event.stopPropagation();

return (activate.cljs$core$IFn$_invoke$arity$1 ? activate.cljs$core$IFn$_invoke$arity$1(event) : activate.call(null,event));
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (event){
event.stopPropagation();

return (deactivate.cljs$core$IFn$_invoke$arity$1 ? deactivate.cljs$core$IFn$_invoke$arity$1(event) : deactivate.call(null,event));
}),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateX(%spx) translateY(%spx)",normalized_saturation,normalized_lightness)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"origin-bottom-left",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translateY(%spx)",border_size)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid._centered_dot,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"radius","radius",-2073122258),radius,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),units_from_origin,new cljs.core.Keyword(null,"opacity","opacity",397153780),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})()),"%"].join('')], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.translate_origin_BANG_ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$translate_origin_BANG_(p__19716){
var map__19717 = p__19716;
var map__19717__$1 = cljs.core.__destructure_map(map__19717);
var mouse_coordinates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19717__$1,new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19717__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19717__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var map__19718 = mouse_coordinates;
var map__19718__$1 = cljs.core.__destructure_map(map__19718);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19718__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19718__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(saturation,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var lightness__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(lightness,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(origin,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),lightness__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929),saturation__$1], null));

var G__19725 = cljs.core.deref(origin);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__19725) : on_change.call(null,G__19725));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.rotate_BANG_ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$rotate_BANG_(p__19726){
var map__19727 = p__19726;
var map__19727__$1 = cljs.core.__destructure_map(map__19727);
var mouse_coordinates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19727__$1,new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19727__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19727__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var units_from_origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19727__$1,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642));
var map__19728 = mouse_coordinates;
var map__19728__$1 = cljs.core.__destructure_map(map__19728);
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19728__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19728__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(saturation,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var lightness__$1 = kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp(lightness,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(100)], null));
var map__19729 = cljs.core.deref(origin);
var map__19729__$1 = cljs.core.__destructure_map(map__19729);
var origin_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19729__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var origin_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19729__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var new_spacing = (kaleidoscope.ui.components.colors.saturation_lightness_grid.euclidean_distance(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [saturation__$1,lightness__$1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [origin_saturation,origin_lightness], null)) / units_from_origin);
var dx = (origin_saturation - saturation__$1);
var dy = (origin_lightness - lightness__$1);
var new_theta = ((90) - kaleidoscope.ui.components.colors.saturation_lightness_grid.rad__GT_deg(kaleidoscope.ui.components.colors.saturation_lightness_grid.coords__GT_rads(dx,dy)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(origin,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spacing","spacing",204422175),new_spacing,new cljs.core.Keyword(null,"theta","theta",-427510258),new_theta], null));

var G__19734 = cljs.core.deref(origin);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__19734) : on_change.call(null,G__19734));
});
kaleidoscope.ui.components.colors.saturation_lightness_grid.saturation_lightness_grid = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid(p__19745){
var map__19746 = p__19745;
var map__19746__$1 = cljs.core.__destructure_map(map__19746);
var grid_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19746__$1,new cljs.core.Keyword(null,"grid-size","grid-size",2138480144));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19746__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var origin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19746__$1,new cljs.core.Keyword(null,"origin","origin",1037372088));
var _BANG_grid_ref = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var active_element = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var grid_props = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(grid_size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(grid_size),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute"], null);
var origin_marker_QMARK_ = (function (el){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("0",el.getAttribute("unitsfromorigin"));
});
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"ref","ref",1289896967),(function (el){
return cljs.core.reset_BANG_(_BANG_grid_ref,el);
}),new cljs.core.Keyword(null,"on-mouse-move","on-mouse-move",-1386320874),(function (event){
event.stopPropagation();

if(cljs.core.truth_(cljs.core.deref(active_element))){
if(origin_marker_QMARK_(cljs.core.deref(active_element))){
return kaleidoscope.ui.components.colors.saturation_lightness_grid.translate_origin_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568),kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates(cljs.core.deref(_BANG_grid_ref),event),new cljs.core.Keyword(null,"origin","origin",1037372088),origin,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null));
} else {
return kaleidoscope.ui.components.colors.saturation_lightness_grid.rotate_BANG_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"mouse-coordinates","mouse-coordinates",1702910568),kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates(cljs.core.deref(_BANG_grid_ref),event),new cljs.core.Keyword(null,"origin","origin",1037372088),origin,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change,new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),(cljs.core.deref(active_element).getAttribute("unitsfromorigin") | (0))], null));
}
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return event.stopPropagation();
}),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"style","style",-496642736),grid_props,"z-index",(100)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19773(s__19774){
return (new cljs.core.LazySeq(null,(function (){
var s__19774__$1 = s__19774;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19774__$1);
if(temp__5804__auto__){
var s__19774__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19774__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19774__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19776 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19775 = (0);
while(true){
if((i__19775 < size__5522__auto__)){
var background = cljs.core._nth(c__5521__auto__,i__19775);
cljs.core.chunk_append(b__19776,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([grid_props,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),background], null)], 0))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["background-component-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background)].join('')], null)));

var G__19806 = (i__19775 + (1));
i__19775 = G__19806;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19776),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19773(cljs.core.chunk_rest(s__19774__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19776),null);
}
} else {
var background = cljs.core.first(s__19774__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([grid_props,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),background], null)], 0))], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["background-component-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(background)].join('')], null)),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19773(cljs.core.rest(s__19774__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(100),(50)),"linear-gradient(to right, #fff, rgba(255,255,255,0))","linear-gradient(to top, #000, rgba(0,0,0,0))"], null));
})(),cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19789(s__19790){
return (new cljs.core.LazySeq(null,(function (){
var s__19790__$1 = s__19790;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19790__$1);
if(temp__5804__auto__){
var s__19790__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19790__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19790__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19792 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19791 = (0);
while(true){
if((i__19791 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__19791);
cljs.core.chunk_append(b__19792,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.marker,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"r","r",-471384190),new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707),new cljs.core.Keyword(null,"theta","theta",-427510258),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"opacity","opacity",397153780),new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),new cljs.core.Keyword(null,"border-size","border-size",991975640),new cljs.core.Keyword(null,"activate","activate",441219614)],[(n * new cljs.core.Keyword(null,"spacing","spacing",204422175).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin))),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),((function (i__19791,n,c__5521__auto__,size__5522__auto__,b__19792,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin){
return (function (_event){
return cljs.core.reset_BANG_(active_element,null);
});})(i__19791,n,c__5521__auto__,size__5522__auto__,b__19792,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin))
,new cljs.core.Keyword(null,"theta","theta",-427510258).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(10),(((n === (0)))?(70):(30)),n,grid_size,((function (i__19791,n,c__5521__auto__,size__5522__auto__,b__19792,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin){
return (function (event){
return cljs.core.reset_BANG_(active_element,event.target);
});})(i__19791,n,c__5521__auto__,size__5522__auto__,b__19792,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin))
])], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["marker-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__19809 = (i__19791 + (1));
i__19791 = G__19809;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19792),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19789(cljs.core.chunk_rest(s__19790__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19792),null);
}
} else {
var n = cljs.core.first(s__19790__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.marker,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"r","r",-471384190),new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),new cljs.core.Keyword(null,"deactivate","deactivate",-1313810707),new cljs.core.Keyword(null,"theta","theta",-427510258),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"opacity","opacity",397153780),new cljs.core.Keyword(null,"units-from-origin","units-from-origin",-530337642),new cljs.core.Keyword(null,"border-size","border-size",991975640),new cljs.core.Keyword(null,"activate","activate",441219614)],[(n * new cljs.core.Keyword(null,"spacing","spacing",204422175).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin))),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),((function (n,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin){
return (function (_event){
return cljs.core.reset_BANG_(active_element,null);
});})(n,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin))
,new cljs.core.Keyword(null,"theta","theta",-427510258).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(origin)),(10),(((n === (0)))?(70):(30)),n,grid_size,((function (n,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin){
return (function (event){
return cljs.core.reset_BANG_(active_element,event.target);
});})(n,s__19790__$2,temp__5804__auto__,_BANG_grid_ref,active_element,grid_props,origin_marker_QMARK_,map__19746,map__19746__$1,grid_size,on_change,origin))
])], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["marker-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$saturation_lightness_grid$saturation_lightness_grid_$_iter__19789(cljs.core.rest(s__19790__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((-2),(3)));
})())], null);
});
});
Object.defineProperty(module.exports, "rotate_BANG_", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.rotate_BANG_; } });
Object.defineProperty(module.exports, "clamp", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.clamp; } });
Object.defineProperty(module.exports, "deg__GT_rad", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.deg__GT_rad; } });
Object.defineProperty(module.exports, "coords__GT_rads", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.coords__GT_rads; } });
Object.defineProperty(module.exports, "_centered_dot", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid._centered_dot; } });
Object.defineProperty(module.exports, "marker", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.marker; } });
Object.defineProperty(module.exports, "hsl", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.hsl; } });
Object.defineProperty(module.exports, "calculate_marker_coordinates", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates; } });
Object.defineProperty(module.exports, "euclidean_distance", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.euclidean_distance; } });
Object.defineProperty(module.exports, "translate_origin_BANG_", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.translate_origin_BANG_; } });
Object.defineProperty(module.exports, "calculate_sl_coordinates", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_sl_coordinates; } });
Object.defineProperty(module.exports, "saturation_lightness_grid", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.saturation_lightness_grid; } });
Object.defineProperty(module.exports, "rad__GT_deg", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.saturation_lightness_grid.rad__GT_deg; } });
//# sourceMappingURL=kaleidoscope.ui.components.colors.saturation_lightness_grid.js.map
