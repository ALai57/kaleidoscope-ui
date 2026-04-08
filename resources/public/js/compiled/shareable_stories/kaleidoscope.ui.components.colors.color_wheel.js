var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./shadow.js.shim.module$$mui$material$styles.js");
require("./shadow.js.shim.module$$mui$material$Slider.js");
require("./kaleidoscope.ui.utils.events.js");
require("./kaleidoscope.ui.components.colors.saturation_lightness_grid.js");
require("./reagent.core.js");
require("./reagent_mui.components.js");
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

$CLJS.SHADOW_ENV.setLoaded("kaleidoscope.ui.components.colors.color_wheel.js");

goog.provide('kaleidoscope.ui.components.colors.color_wheel');
kaleidoscope.ui.components.colors.color_wheel.ColorWheel = (function (){var G__19796 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"400px",new cljs.core.Keyword(null,"height","height",1025178622),"400px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"background","background",-863952629),"conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red)"], null));
});
var fexpr__19795 = shadow.js.shim.module$$mui$material$styles.styled("div");
return (fexpr__19795.cljs$core$IFn$_invoke$arity$1 ? fexpr__19795.cljs$core$IFn$_invoke$arity$1(G__19796) : fexpr__19795.call(null,G__19796));
})();
kaleidoscope.ui.components.colors.color_wheel.ColorBand = (function (){var G__19798 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"50px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"10px",new cljs.core.Keyword(null,"background","background",-863952629),"linear-gradient(to right, red,#ff0,#0f0,#0ff,#00f,#f0f,red)"], null));
});
var fexpr__19797 = shadow.js.shim.module$$mui$material$styles.styled("div");
return (fexpr__19797.cljs$core$IFn$_invoke$arity$1 ? fexpr__19797.cljs$core$IFn$_invoke$arity$1(G__19798) : fexpr__19797.call(null,G__19798));
})();
kaleidoscope.ui.components.colors.color_wheel.Donut = (function (){var G__19800 = (function (theme){
return cljs.core.clj__GT_js(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"transform","transform",1381301764),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"background","background",-863952629),new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"boxShadow","boxShadow",-1591689862),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"left","left",-399115937)],["translate(-50%,-50%)","50%","50%","200px","white","relative","inset 0 1px 9px 10px rgb(15 10 2 / 60%)","200px","50%"]));
});
var fexpr__19799 = shadow.js.shim.module$$mui$material$styles.styled("div");
return (fexpr__19799.cljs$core$IFn$_invoke$arity$1 ? fexpr__19799.cljs$core$IFn$_invoke$arity$1(G__19800) : fexpr__19799.call(null,G__19800));
})();
kaleidoscope.ui.components.colors.color_wheel.HueMarker = (function (){var G__19802 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"50%",new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"black",new cljs.core.Keyword(null,"opacity","opacity",397153780),"65%",new cljs.core.Keyword(null,"width","width",-384071477),"20px",new cljs.core.Keyword(null,"height","height",1025178622),"20px",new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"left","left",-399115937),"90px",new cljs.core.Keyword(null,"top","top",-1856271961),"90px"], null));
});
var fexpr__19801 = shadow.js.shim.module$$mui$material$styles.styled("div");
return (fexpr__19801.cljs$core$IFn$_invoke$arity$1 ? fexpr__19801.cljs$core$IFn$_invoke$arity$1(G__19802) : fexpr__19801.call(null,G__19802));
})();
kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider = (function (){var G__19805 = (function (theme){
return cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"position","position",-2011731912),"absolute","& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"50px",new cljs.core.Keyword(null,"height","height",1025178622),"50px",new cljs.core.Keyword(null,"top","top",-1856271961),"0px",new cljs.core.Keyword(null,"border","border",1444987323),"2px solid black"], null),"& .MuiSlider-track",new cljs.core.PersistentArrayMap(null, 1, ["visibility","hidden"], null),"& .MuiSlider-rail",new cljs.core.PersistentArrayMap(null, 1, ["visibility","hidden"], null),"& .MuiSlider-active",new cljs.core.PersistentArrayMap(null, 1, ["color","green"], null)], null));
});
var fexpr__19804 = shadow.js.shim.module$$mui$material$styles.styled(shadow.js.shim.module$$mui$material$Slider.default);
return (fexpr__19804.cljs$core$IFn$_invoke$arity$1 ? fexpr__19804.cljs$core$IFn$_invoke$arity$1(G__19805) : fexpr__19804.call(null,G__19805));
})();
kaleidoscope.ui.components.colors.color_wheel.coords__GT_rads = (function kaleidoscope$ui$components$colors$color_wheel$coords__GT_rads(x,y){
return Math.atan2(x,y);
});
kaleidoscope.ui.components.colors.color_wheel.rads__GT_deg = (function kaleidoscope$ui$components$colors$color_wheel$rads__GT_deg(radians){
return (radians * ((180) / Math.PI));
});
/**
 * Calculate the hue's angle in degrees.
 *   Red is 0 degrees, green is ~120, Blue is ~240
 */
kaleidoscope.ui.components.colors.color_wheel.calculate_angle = (function kaleidoscope$ui$components$colors$color_wheel$calculate_angle(color_wheel,event){
var click_x = event.clientX;
var click_y = event.clientY;
var container_target = color_wheel.getBoundingClientRect();
var container_x = container_target.x;
var container_y = container_target.y;
var container_w = container_target.width;
var container_h = container_target.height;
var x = (container_x - click_x);
var y = (container_y - click_y);
var offset_x = (container_w / (2));
var offset_y = (container_h / (2));
var final_x = (- (offset_x + x));
var final_y = (offset_y + y);
return cljs.core.mod((kaleidoscope.ui.components.colors.color_wheel.rads__GT_deg(kaleidoscope.ui.components.colors.color_wheel.coords__GT_rads(final_x,final_y)) + (360)),(360));
});
kaleidoscope.ui.components.colors.color_wheel.hsl = (function kaleidoscope$ui$components$colors$color_wheel$hsl(hue,saturation,lightness){
return goog.string.format("hsl(%s, %s%, %s%)",hue,saturation,lightness);
});
kaleidoscope.ui.components.colors.color_wheel.mini_square = (function kaleidoscope$ui$components$colors$color_wheel$mini_square(p__19807){
var map__19808 = p__19807;
var map__19808__$1 = cljs.core.__destructure_map(map__19808);
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"n","n",562130025));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19808__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var mini_size = (size / (6));
var padding = (mini_size / (4));
var position = (function (){var G__19810 = n;
switch (G__19810) {
case (1):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((3) * padding) + ((2) * mini_size))),"px"].join('')], null);

break;
case (2):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((2) * padding) + ((1) * mini_size))),"px"].join('')], null);

break;
case (3):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
case (4):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((2) * padding) + ((1) * mini_size))),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
case (5):
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((((3) * padding) + ((2) * mini_size))),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(padding),"px"].join('')], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__19810)].join('')));

}
})();
var new_sl = kaleidoscope.ui.components.colors.saturation_lightness_grid.calculate_marker_coordinates(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"base-saturation","base-saturation",-1809016794),saturation,new cljs.core.Keyword(null,"base-lightness","base-lightness",-193691637),lightness,new cljs.core.Keyword(null,"theta","theta",-427510258),theta,new cljs.core.Keyword(null,"r","r",-471384190),((function (){var G__19811 = n;
switch (G__19811) {
case (1):
return (-2);

break;
case (2):
return (-1);

break;
case (3):
return (0);

break;
case (4):
return (1);

break;
case (5):
return (2);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__19811)].join('')));

}
})() * spacing)], null));
var color = kaleidoscope.ui.components.colors.color_wheel.hsl(hue,new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(new_sl),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(new_sl));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mini_size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mini_size),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"absolute",new cljs.core.Keyword(null,"background-color","background-color",570434026),color], null),position], 0))], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.color_squares = (function kaleidoscope$ui$components$colors$color_wheel$color_squares(p__19812){
var map__19813 = p__19812;
var map__19813__$1 = cljs.core.__destructure_map(map__19813);
var args = map__19813__$1;
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"r","r",-471384190));
var primary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"primary","primary",817773892));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var tertiary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"tertiary","tertiary",-1163116473));
var complementary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"complementary","complementary",-540744215));
var secondary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"secondary","secondary",-669381460));
var theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"size","size",1098693007));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19813__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(((2) * size)),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(((2) * size)),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),"grey"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(primary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19814(s__19815){
return (new cljs.core.LazySeq(null,(function (){
var s__19815__$1 = s__19815;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19815__$1);
if(temp__5804__auto__){
var s__19815__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19815__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19815__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19817 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19816 = (0);
while(true){
if((i__19816 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__19816);
cljs.core.chunk_append(b__19817,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),primary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["primary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__19860 = (i__19816 + (1));
i__19816 = G__19860;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19817),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19814(cljs.core.chunk_rest(s__19815__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19817),null);
}
} else {
var n = cljs.core.first(s__19815__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),primary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["primary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19814(cljs.core.rest(s__19815__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(tertiary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19818(s__19819){
return (new cljs.core.LazySeq(null,(function (){
var s__19819__$1 = s__19819;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19819__$1);
if(temp__5804__auto__){
var s__19819__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19819__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19819__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19821 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19820 = (0);
while(true){
if((i__19820 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__19820);
cljs.core.chunk_append(b__19821,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),tertiary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["tertiary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__19865 = (i__19820 + (1));
i__19820 = G__19865;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19821),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19818(cljs.core.chunk_rest(s__19819__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19821),null);
}
} else {
var n = cljs.core.first(s__19819__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),tertiary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["tertiary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19818(cljs.core.rest(s__19819__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(secondary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19822(s__19823){
return (new cljs.core.LazySeq(null,(function (){
var s__19823__$1 = s__19823;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19823__$1);
if(temp__5804__auto__){
var s__19823__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19823__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19823__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19825 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19824 = (0);
while(true){
if((i__19824 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__19824);
cljs.core.chunk_append(b__19825,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),secondary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["secondary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__19866 = (i__19824 + (1));
i__19824 = G__19866;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19825),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19822(cljs.core.chunk_rest(s__19823__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19825),null);
}
} else {
var n = cljs.core.first(s__19823__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),secondary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["secondary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19822(cljs.core.rest(s__19823__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"px"].join(''),new cljs.core.Keyword(null,"background-color","background-color",570434026),kaleidoscope.ui.components.colors.color_wheel.hsl(complementary,saturation,lightness),new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19826(s__19827){
return (new cljs.core.LazySeq(null,(function (){
var s__19827__$1 = s__19827;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19827__$1);
if(temp__5804__auto__){
var s__19827__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19827__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19827__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19829 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19828 = (0);
while(true){
if((i__19828 < size__5522__auto__)){
var n = cljs.core._nth(c__5521__auto__,i__19828);
cljs.core.chunk_append(b__19829,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),complementary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["complementary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)));

var G__19873 = (i__19828 + (1));
i__19828 = G__19873;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19829),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19826(cljs.core.chunk_rest(s__19827__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19829),null);
}
} else {
var n = cljs.core.first(s__19827__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.mini_square,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(args,new cljs.core.Keyword(null,"n","n",562130025),n,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"hue","hue",-508078848),complementary], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["complementary-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)].join('')], null)),kaleidoscope$ui$components$colors$color_wheel$color_squares_$_iter__19826(cljs.core.rest(s__19827__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(6)));
})()], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.hue_marker = (function kaleidoscope$ui$components$colors$color_wheel$hue_marker(p__19832){
var map__19833 = p__19832;
var map__19833__$1 = cljs.core.__destructure_map(map__19833);
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19833__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19833__$1,new cljs.core.Keyword(null,"radius","radius",-2073122258));
var wheel_radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19833__$1,new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881));
var wheel_thickness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19833__$1,new cljs.core.Keyword(null,"wheel-thickness","wheel-thickness",-1884775667));
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19833__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780));
var offset = (wheel_radius - radius);
var translation = (wheel_radius - (wheel_thickness / (2)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.HueMarker,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((radius * (2))),"px"].join(''),new cljs.core.Keyword(null,"left","left",-399115937),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(offset),"px"].join(''),new cljs.core.Keyword(null,"top","top",-1856271961),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(offset),"px"].join(''),new cljs.core.Keyword(null,"opacity","opacity",397153780),(function (){var or__5045__auto__ = opacity;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "50%";
}
})(),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("rotate(%sdeg) translateX(%spx)",hue,translation)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.value_slider = (function kaleidoscope$ui$components$colors$color_wheel$value_slider(p__19834){
var map__19835 = p__19834;
var map__19835__$1 = cljs.core.__destructure_map(map__19835);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var state_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"state-key","state-key",1501674933));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"max","max",61366548));
var max_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19835__$1,new cljs.core.Keyword(null,"max-width","max-width",-1939924051));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(max_width),"px"].join('')], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.typography,label], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.slider,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"item","item",249373802),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.input,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
}),new cljs.core.Keyword(null,"inputProps","inputProps",1208237697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"step","step",1288888124),(1),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"type","type",1174270348),"number"], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.color_control = (function kaleidoscope$ui$components$colors$color_wheel$color_control(p__19844){
var map__19845 = p__19844;
var map__19845__$1 = cljs.core.__destructure_map(map__19845);
var max_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"max-width","max-width",-1939924051));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var state_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"state-key","state-key",1501674933));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"max","max",61366548));
var slider_el = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19845__$1,new cljs.core.Keyword(null,"slider-el","slider-el",-875087585));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"color-control",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(max_width),"px"].join(''),new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),"10px"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),true,new cljs.core.Keyword(null,"spacing","spacing",204422175),(2),new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),"slider-container",new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),(9)], null),slider_el], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.grid,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),true,new cljs.core.Keyword(null,"xs","xs",649443341),(3)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.input,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),"slider-input",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(state),state_key),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state,cljs.core.merge,cljs.core.PersistentArrayMap.createAsIfByAssoc([state_key,kaleidoscope.ui.utils.events.event_value(event)]));
}),new cljs.core.Keyword(null,"inputProps","inputProps",1208237697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"step","step",1288888124),(1),new cljs.core.Keyword(null,"min","min",444991522),(function (){var or__5045__auto__ = min;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"max","max",61366548),(function (){var or__5045__auto__ = max;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (100);
}
})(),new cljs.core.Keyword(null,"type","type",1174270348),"number"], null)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.colors.color_wheel.saturation_band = (function kaleidoscope$ui$components$colors$color_wheel$saturation_band(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19878 = arguments.length;
var i__5770__auto___19879 = (0);
while(true){
if((i__5770__auto___19879 < len__5769__auto___19878)){
args__5775__auto__.push((arguments[i__5770__auto___19879]));

var G__19880 = (i__5770__auto___19879 + (1));
i__5770__auto___19879 = G__19880;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$core$IFn$_invoke$arity$variadic = (function (p__19848,children){
var map__19849 = p__19848;
var map__19849__$1 = cljs.core.__destructure_map(map__19849);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19849__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19849__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19849__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(height),"px"].join(''),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(to right, %s, %s)",kaleidoscope.ui.components.colors.color_wheel.hsl(hue,(0),lightness),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,(100),lightness))], null)], null)], null),children);
}));

(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.colors.color_wheel.saturation_band.cljs$lang$applyTo = (function (seq19846){
var G__19847 = cljs.core.first(seq19846);
var seq19846__$1 = cljs.core.next(seq19846);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19847,seq19846__$1);
}));

kaleidoscope.ui.components.colors.color_wheel.lightness_band = (function kaleidoscope$ui$components$colors$color_wheel$lightness_band(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19882 = arguments.length;
var i__5770__auto___19883 = (0);
while(true){
if((i__5770__auto___19883 < len__5769__auto___19882)){
args__5775__auto__.push((arguments[i__5770__auto___19883]));

var G__19884 = (i__5770__auto___19883 + (1));
i__5770__auto___19883 = G__19884;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$core$IFn$_invoke$arity$variadic = (function (p__19852,children){
var map__19853 = p__19852;
var map__19853__$1 = cljs.core.__destructure_map(map__19853);
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19853__$1,new cljs.core.Keyword(null,"height","height",1025178622));
var hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19853__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19853__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),height,new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(height),"px"].join(''),new cljs.core.Keyword(null,"background","background",-863952629),goog.string.format("linear-gradient(to right, %s, %s, %s)",kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(0)),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(50)),kaleidoscope.ui.components.colors.color_wheel.hsl(hue,saturation,(100)))], null)], null)], null),children);
}));

(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(kaleidoscope.ui.components.colors.color_wheel.lightness_band.cljs$lang$applyTo = (function (seq19850){
var G__19851 = cljs.core.first(seq19850);
var seq19850__$1 = cljs.core.next(seq19850);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19851,seq19850__$1);
}));

kaleidoscope.ui.components.colors.color_wheel.color_wheel = (function kaleidoscope$ui$components$colors$color_wheel$color_wheel(p__19854){
var map__19855 = p__19854;
var map__19855__$1 = cljs.core.__destructure_map(map__19855);
var initial_palette = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19855__$1,new cljs.core.Keyword(null,"initial-palette","initial-palette",-1982967781));
var ring_thickness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19855__$1,new cljs.core.Keyword(null,"ring-thickness","ring-thickness",-1173851465));
var wheel_radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19855__$1,new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19855__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (new_palette){
return null;
}));
var map__19856 = initial_palette;
var map__19856__$1 = cljs.core.__destructure_map(map__19856);
var initial_hue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"hue","hue",-508078848));
var initial_saturation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"saturation","saturation",-14247929));
var initial_lightness = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"lightness","lightness",-2040901930));
var initial_spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var initial_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"angle","angle",1622094254));
var initial_theta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19856__$1,new cljs.core.Keyword(null,"theta","theta",-427510258));
var palette = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"hue","hue",-508078848),(function (){var or__5045__auto__ = initial_hue;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (0);
}
})(),new cljs.core.Keyword(null,"saturation","saturation",-14247929),(function (){var or__5045__auto__ = initial_saturation;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})(),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),(function (){var or__5045__auto__ = initial_lightness;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})(),new cljs.core.Keyword(null,"spacing","spacing",204422175),(function (){var or__5045__auto__ = initial_spacing;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (15);
}
})(),new cljs.core.Keyword(null,"theta","theta",-427510258),(function (){var or__5045__auto__ = initial_theta;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (45);
}
})(),new cljs.core.Keyword(null,"angle","angle",1622094254),(function (){var or__5045__auto__ = initial_angle;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (45);
}
})()], null));
var hue_active_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var _BANG_color_wheel = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var ring_thickness__$1 = (function (){var or__5045__auto__ = ring_thickness;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (50);
}
})();
var wheel_radius__$1 = (function (){var or__5045__auto__ = wheel_radius;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (200);
}
})();
var wheel_diameter = (wheel_radius__$1 * (2));
var donut_diameter = ((2) * (wheel_radius__$1 - ring_thickness__$1));
var control_bar_thickness = (ring_thickness__$1 / (2));
var sat_lightness_grid_width = (donut_diameter / Math.sqrt((2)));
var hue_marker_props = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"radius","radius",-2073122258),(10),new cljs.core.Keyword(null,"wheel-radius","wheel-radius",-1144574881),wheel_radius__$1,new cljs.core.Keyword(null,"wheel-thickness","wheel-thickness",-1884775667),ring_thickness__$1], null);
var update_palette_BANG_ = (function (new_palette){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(palette,cljs.core.merge,new_palette);

var G__19857 = cljs.core.deref(palette);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__19857) : on_change.call(null,G__19857));
});
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"direction","direction",-633359395),"row"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.ColorWheel,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"class","class",-2030961996),"color-wheel",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(wheel_diameter),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(wheel_diameter),"px"].join('')], null),new cljs.core.Keyword(null,"ref","ref",1289896967),(function (el){
return cljs.core.reset_BANG_(_BANG_color_wheel,el);
}),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,true);
}),new cljs.core.Keyword(null,"on-mouse-up","on-mouse-up",-1340533320),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,false);
}),new cljs.core.Keyword(null,"on-mouse-leave","on-mouse-leave",-1864319528),(function (_event){
return cljs.core.reset_BANG_(hue_active_QMARK_,false);
}),new cljs.core.Keyword(null,"on-mouse-move","on-mouse-move",-1386320874),(function (event){
if(cljs.core.truth_(cljs.core.deref(hue_active_QMARK_))){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),kaleidoscope.ui.components.colors.color_wheel.calculate_angle(cljs.core.deref(_BANG_color_wheel),event)], null));
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),kaleidoscope.ui.components.colors.color_wheel.calculate_angle(cljs.core.deref(_BANG_color_wheel),event)], null));
})], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.Donut,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),"thedonut",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(donut_diameter),"px"].join(''),new cljs.core.Keyword(null,"height","height",1025178622),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(donut_diameter),"px"].join('')], null)], null),(function (){var offset = ((donut_diameter / (2)) - (sat_lightness_grid_width / (2)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),"relative",new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(%spx,%spx)",offset,offset)], null)], null),cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.saturation_lightness_grid.saturation_lightness_grid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"grid-size","grid-size",2138480144),sat_lightness_grid_width,new cljs.core.Keyword(null,"origin","origin",1037372088),palette,new cljs.core.Keyword(null,"on-change","on-change",-732046149),update_palette_BANG_], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))], null))], null);
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (270)),new cljs.core.Keyword(null,"radius","radius",-2073122258),(15)], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)),new cljs.core.Keyword(null,"opacity","opacity",397153780),"10%"], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)) + new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))),new cljs.core.Keyword(null,"opacity","opacity",397153780),"30%"], null)], 0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.hue_marker,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hue_marker_props,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hue","hue",-508078848),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (90)) + (- new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))),new cljs.core.Keyword(null,"opacity","opacity",397153780),"30%"], null)], 0))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_squares,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"size","size",1098693007),wheel_radius__$1,new cljs.core.Keyword(null,"primary","primary",817773892),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"complementary","complementary",-540744215),(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)),new cljs.core.Keyword(null,"secondary","secondary",-669381460),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)) + new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))),new cljs.core.Keyword(null,"tertiary","tertiary",-1163116473),((new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) + (180)) + (- new cljs.core.Keyword(null,"angle","angle",1622094254).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette))))], null),cljs.core.deref(palette)], 0))], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.stack,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"direction","direction",-633359395),"column",new cljs.core.Keyword(null,"spacing","spacing",204422175),(3)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.ColorBand,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness,new cljs.core.Keyword(null,"position","position",-2011731912),"relative"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),(100),(50))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),((100) * (new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)) / (360))),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hue","hue",-508078848),((kaleidoscope.ui.utils.events.event_value(event) * (360)) / (100))], null));
})], null)], null)], null),new cljs.core.Keyword(null,"min","min",444991522),(0),new cljs.core.Keyword(null,"max","max",61366548),(360)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"saturation","saturation",-14247929),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.saturation_band,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"saturation","saturation",-14247929),kaleidoscope.ui.utils.events.event_value(event)], null));
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.color_control,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"lightness","lightness",-2040901930),new cljs.core.Keyword(null,"slider-el","slider-el",-875087585),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.lightness_band,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"hue","hue",-508078848),new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"height","height",1025178622),control_bar_thickness], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, ["& .MuiSlider-thumb",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),kaleidoscope.ui.components.colors.color_wheel.hsl(new cljs.core.Keyword(null,"hue","hue",-508078848).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"saturation","saturation",-14247929).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)))], null),new cljs.core.Keyword(null,"transform","transform",1381301764),goog.string.format("translate(0px,%spx)",(control_bar_thickness / (2)))], null),new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"lightness","lightness",-2040901930).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(palette)),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return update_palette_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"lightness","lightness",-2040901930),kaleidoscope.ui.utils.events.event_value(event)], null));
})], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.colors.color_wheel.value_slider,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"label","label",1718410804),"Secondary angle",new cljs.core.Keyword(null,"state","state",-1988618099),palette,new cljs.core.Keyword(null,"state-key","state-key",1501674933),new cljs.core.Keyword(null,"angle","angle",1622094254),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),wheel_diameter,new cljs.core.Keyword(null,"max","max",61366548),(180)], null)], null)], null)], null);
});
});
Object.defineProperty(module.exports, "Donut", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.Donut; } });
Object.defineProperty(module.exports, "ColorWheel", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.ColorWheel; } });
Object.defineProperty(module.exports, "color_wheel", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.color_wheel; } });
Object.defineProperty(module.exports, "mini_square", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.mini_square; } });
Object.defineProperty(module.exports, "HueMarker", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.HueMarker; } });
Object.defineProperty(module.exports, "coords__GT_rads", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.coords__GT_rads; } });
Object.defineProperty(module.exports, "value_slider", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.value_slider; } });
Object.defineProperty(module.exports, "color_squares", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.color_squares; } });
Object.defineProperty(module.exports, "color_control", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.color_control; } });
Object.defineProperty(module.exports, "calculate_angle", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.calculate_angle; } });
Object.defineProperty(module.exports, "hsl", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.hsl; } });
Object.defineProperty(module.exports, "NoTrackSlider", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.NoTrackSlider; } });
Object.defineProperty(module.exports, "ColorBand", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.ColorBand; } });
Object.defineProperty(module.exports, "saturation_band", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.saturation_band; } });
Object.defineProperty(module.exports, "hue_marker", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.hue_marker; } });
Object.defineProperty(module.exports, "rads__GT_deg", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.rads__GT_deg; } });
Object.defineProperty(module.exports, "lightness_band", { enumerable: false, get: function() { return kaleidoscope.ui.components.colors.color_wheel.lightness_band; } });
//# sourceMappingURL=kaleidoscope.ui.components.colors.color_wheel.js.map
