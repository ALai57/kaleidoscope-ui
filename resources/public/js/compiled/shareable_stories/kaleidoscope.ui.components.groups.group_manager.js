var $CLJS = require("./cljs_env");
var $jscomp = $CLJS.$jscomp;
var COMPILED = false;
require("./cljs.core.js");
require("./kaleidoscope.ui.components.table.js");
require("./kaleidoscope.ui.components.button.js");
require("./kaleidoscope.ui.components.input_box.js");
require("./kaleidoscope.ui.utils.events.js");
require("./kaleidoscope.ui.utils.core.js");
require("./reagent.core.js");
require("./reagent_mui.icons.account_circle.js");
require("./reagent_mui.icons.group_add.js");
require("./reagent_mui.icons.person_add.js");
require("./reagent_mui.icons.group.js");
require("./reagent_mui.icons.delete.js");
require("./reagent_mui.components.js");
require("./re_frame.core.js");
require("./taoensso.timbre.js");
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

$CLJS.SHADOW_ENV.setLoaded("kaleidoscope.ui.components.groups.group_manager.js");

goog.provide('kaleidoscope.ui.components.groups.group_manager');
kaleidoscope.ui.components.groups.group_manager.delete_member_cell = (function kaleidoscope$ui$components$groups$group_manager$delete_member_cell(props){
return reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
var row = kaleidoscope.ui.utils.core.clojurize(props.row);
var delete_member_BANG_ = new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610).cljs$core$IFn$_invoke$arity$1(row);
var G__19128 = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(row);
return (delete_member_BANG_.cljs$core$IFn$_invoke$arity$1 ? delete_member_BANG_.cljs$core$IFn$_invoke$arity$1(G__19128) : delete_member_BANG_.call(null,G__19128));
})], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null));
});
kaleidoscope.ui.components.groups.group_manager.USER_COLUMNS = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"headerName","headerName",555903558),"ID",new cljs.core.Keyword(null,"width","width",-384071477),(100)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"alias","alias",-2039751630),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Name",new cljs.core.Keyword(null,"width","width",-384071477),(180)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Email",new cljs.core.Keyword(null,"width","width",-384071477),(200)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"membership-created-at","membership-created-at",-287992449),new cljs.core.Keyword(null,"headerName","headerName",555903558),"Added",new cljs.core.Keyword(null,"width","width",-384071477),(180)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"field","field",-1302436500),new cljs.core.Keyword(null,"delete","delete",-1768633620),new cljs.core.Keyword(null,"headerName","headerName",555903558),"",new cljs.core.Keyword(null,"renderCell","renderCell",-454322680),kaleidoscope.ui.components.groups.group_manager.delete_member_cell], null)], null);
kaleidoscope.ui.components.groups.group_manager.add_group_item = (function kaleidoscope$ui$components$groups$group_manager$add_group_item(p__19129){
var map__19130 = p__19129;
var map__19130__$1 = cljs.core.__destructure_map(map__19130);
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19130__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19130__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19130__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (x){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked ",text], 0));
}));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_icon,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [icon], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,text], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.list_entry = (function kaleidoscope$ui$components$groups$group_manager$list_entry(p__19131){
var map__19132 = p__19131;
var map__19132__$1 = cljs.core.__destructure_map(map__19132);
var icon = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19132__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19132__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19132__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (x){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Clicked ",text], 0));
}));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19132__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"secondaryAction","secondaryAction",1740067390),reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.icon_button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edge","edge",919909153),"end",new cljs.core.Keyword(null,"on-click","on-click",1632826543),delete_group_BANG_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.delete$.delete$], null)], null)], null))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_icon,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [icon], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item_text,text], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.new_member_entry = (function kaleidoscope$ui$components$groups$group_manager$new_member_entry(add_member_BANG_){
var new_member_name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change_member_name = (function (e){
return cljs.core.reset_BANG_(new_member_name,kaleidoscope.ui.utils.events.event_value(e));
});
var new_member_email = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change_member_email = (function (e){
return cljs.core.reset_BANG_(new_member_email,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.person_add.person_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-member-name-input",new cljs.core.Keyword(null,"label","label",1718410804),"Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"250px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change_member_name], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-member-email-input",new cljs.core.Keyword(null,"label","label",1718410804),"Email",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"350px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change_member_email], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a member",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_member_BANG_,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"alias","alias",-2039751630),cljs.core.deref(new_member_name),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.deref(new_member_email)], null))], null)], null)], null);
});
});
kaleidoscope.ui.components.groups.group_manager.group_entry = (function kaleidoscope$ui$components$groups$group_manager$group_entry(p__19133){
var map__19134 = p__19133;
var map__19134__$1 = cljs.core.__destructure_map(map__19134);
var group = map__19134__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
var open_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"open?","open?",1238443125));
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
var memberships = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"memberships","memberships",1865599157));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756));
var delete_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610));
var add_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19134__$1,new cljs.core.Keyword(null,"add-member!","add-member!",-23827290));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.list_entry,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"icon","icon",1679606541),reagent_mui.icons.group.group,new cljs.core.Keyword(null,"text","text",-1790561697),display_name,new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),delete_group_BANG_], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.collapse,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),"40px"], null),new cljs.core.Keyword(null,"in","in",-1531184865),open_QMARK_,new cljs.core.Keyword(null,"timeout","timeout",-318625318),"auto",new cljs.core.Keyword(null,"unmountOnExit","unmountOnExit",301067374),true], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list_item,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"block"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.new_member_entry,add_member_BANG_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.table.table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"columns","columns",1998437288),kaleidoscope.ui.components.groups.group_manager.USER_COLUMNS,new cljs.core.Keyword(null,"rows","rows",850049680),((cljs.core.empty_QMARK_(memberships))?cljs.core.PersistentVector.EMPTY:cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (membership){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(clojure.set.rename_keys(membership,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"membership-id","membership-id",-723542492),new cljs.core.Keyword(null,"id","id",-1388402092)], null)),new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),delete_member_BANG_);
}),memberships)),new cljs.core.Keyword(null,"max-width","max-width",-1939924051),(800)], null)], null)], null)], null)], null);
});
kaleidoscope.ui.components.groups.group_manager.add_group_form = (function kaleidoscope$ui$components$groups$group_manager$add_group_form(p__19135){
var map__19136 = p__19135;
var map__19136__$1 = cljs.core.__destructure_map(map__19136);
var add_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19136__$1,new cljs.core.Keyword(null,"add-group!","add-group!",999555200));
var new_group_name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
var on_change = (function (e){
return cljs.core.reset_BANG_(new_group_name,kaleidoscope.ui.utils.events.event_value(e));
});
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"flex-end",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"20px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.group_add.group_add,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),"action.active",new cljs.core.Keyword(null,"mr","mr",-1224518357),(1),new cljs.core.Keyword(null,"my","my",-1055703269),0.5], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.text_field,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),"new-group-name-input",new cljs.core.Keyword(null,"label","label",1718410804),"Group Name",new cljs.core.Keyword(null,"variant","variant",-424354234),"standard",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"20px",new cljs.core.Keyword(null,"min-width","min-width",1926193728),"350px"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.button.button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),"Add a new group",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_group_BANG_,cljs.core.deref(new_group_name))], null)], null)], null);
});
});
kaleidoscope.ui.components.groups.group_manager.group_manager = (function kaleidoscope$ui$components$groups$group_manager$group_manager(p__19137){
var map__19138 = p__19137;
var map__19138__$1 = cljs.core.__destructure_map(map__19138);
var groups = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19138__$1,new cljs.core.Keyword(null,"groups","groups",-136896102));
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19138__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var add_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19138__$1,new cljs.core.Keyword(null,"add-group!","add-group!",999555200),(function (group_name){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,151,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding group `%s`!",group_name], null);
}),null)),null,-871937367,null);
}));
var delete_group_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19138__$1,new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),(function (group){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,152,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting group!"], null);
}),null)),null,1404001474,null);
}));
var add_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19138__$1,new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),(function (group,member){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,153,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding member!"], null);
}),null)),null,23794394,null);
}));
var delete_member_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19138__$1,new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),(function (group,member){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$11(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"kaleidoscope.ui.components.groups.group-manager",null,154,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deleting member!"], null);
}),null)),null,94670588,null);
}));
var indexed_groups = cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,group){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(group,new cljs.core.Keyword(null,"idx","idx",1053688473),idx,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"add-member!","add-member!",-23827290),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(add_member_BANG_,group),new cljs.core.Keyword(null,"delete-member!","delete-member!",-2061417610),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(delete_member_BANG_,group),new cljs.core.Keyword(null,"delete-group!","delete-group!",-2140004756),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(delete_group_BANG_,group),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(open,cljs.core.update,idx,cljs.core.not);
})], 0));
}),groups);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.add_group_form,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"add-group!","add-group!",999555200),add_group_BANG_], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.divider], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.components.list,(function (){var iter__5523__auto__ = (function kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__19139(s__19140){
return (new cljs.core.LazySeq(null,(function (){
var s__19140__$1 = s__19140;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__19140__$1);
if(temp__5804__auto__){
var s__19140__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19140__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__19140__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__19142 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__19141 = (0);
while(true){
if((i__19141 < size__5522__auto__)){
var map__19143 = cljs.core._nth(c__5521__auto__,i__19141);
var map__19143__$1 = cljs.core.__destructure_map(map__19143);
var group = map__19143__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19143__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
cljs.core.chunk_append(b__19142,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.group_entry,group], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)));

var G__19147 = (i__19141 + (1));
i__19141 = G__19147;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19142),kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__19139(cljs.core.chunk_rest(s__19140__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19142),null);
}
} else {
var map__19144 = cljs.core.first(s__19140__$2);
var map__19144__$1 = cljs.core.__destructure_map(map__19144);
var group = map__19144__$1;
var idx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19144__$1,new cljs.core.Keyword(null,"idx","idx",1053688473));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [kaleidoscope.ui.components.groups.group_manager.group_entry,group], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["idx-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(idx),"-ge"].join('')], null)),kaleidoscope$ui$components$groups$group_manager$group_manager_$_iter__19139(cljs.core.rest(s__19140__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (group,open_QMARK_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(group,new cljs.core.Keyword(null,"open?","open?",1238443125),open_QMARK_);
}),indexed_groups,cljs.core.deref(open)));
})()], null)], null);
});
Object.defineProperty(module.exports, "delete_member_cell", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.delete_member_cell; } });
Object.defineProperty(module.exports, "USER_COLUMNS", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.USER_COLUMNS; } });
Object.defineProperty(module.exports, "add_group_item", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.add_group_item; } });
Object.defineProperty(module.exports, "list_entry", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.list_entry; } });
Object.defineProperty(module.exports, "new_member_entry", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.new_member_entry; } });
Object.defineProperty(module.exports, "group_entry", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.group_entry; } });
Object.defineProperty(module.exports, "add_group_form", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.add_group_form; } });
Object.defineProperty(module.exports, "group_manager", { enumerable: false, get: function() { return kaleidoscope.ui.components.groups.group_manager.group_manager; } });
//# sourceMappingURL=kaleidoscope.ui.components.groups.group_manager.js.map
