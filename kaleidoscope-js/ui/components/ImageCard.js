"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCard = void 0;
var react_1 = __importDefault(require("react"));
var Card_1 = __importDefault(require("@mui/material/Card"));
var CardContent_1 = __importDefault(require("@mui/material/CardContent"));
var CardMedia_1 = __importDefault(require("@mui/material/CardMedia"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var material_1 = require("@mui/material");
var react_cool_inview_1 = require("react-cool-inview");
require("lazysizes");
function fetchWithAuthentication(url, authToken) {
    var headers = new Headers();
    if (authToken) {
        headers.set('Authorization', "Bearer ".concat(authToken));
    }
    ;
    return fetch(url, { headers: headers });
}
function displayProtectedImage(imageId, imageUrl, authToken) {
    return __awaiter(this, void 0, void 0, function () {
        var response, blob, objectUrl, imageElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchWithAuthentication(imageUrl, authToken)];
                case 1:
                    response = _a.sent();
                    return [4, response.blob()];
                case 2:
                    blob = _a.sent();
                    objectUrl = URL.createObjectURL(blob);
                    imageElement = document.getElementById(imageId);
                    imageElement.src = objectUrl;
                    return [2];
            }
        });
    });
}
var ImageCard = function (_a) {
    var image = _a.image, _b = _a.authToken, authToken = _b === void 0 ? null : _b, onClick = _a.onClick;
    var _c = (0, react_cool_inview_1.useInView)({ unobserveOnEnter: true,
        rootMargin: "50px",
        onEnter: function (_a) {
            var unobserve = _a.unobserve;
            console.log("Observing!");
            displayProtectedImage(image.src, image.src, authToken);
        } }), observe = _c.observe, inView = _c.inView;
    return (react_1.default.createElement("div", { className: "placeholder", style: inView
            ? { height: "fit-content", width: "fit-content", float: "left" }
            : { minHeight: "200px", minWidth: "200px", float: "left" }, ref: observe }, inView && react_1.default.createElement(Card_1.default, { sx: { maxWidth: 345, float: "left", margin: "5px", minHeight: "200px" } },
        react_1.default.createElement(material_1.CardActionArea, { onClick: onClick },
            react_1.default.createElement(CardMedia_1.default, { id: image.src, component: "img", height: image.height, alt: image.alt, className: 'lazyload thumbnail' }),
            react_1.default.createElement(CardContent_1.default, null,
                react_1.default.createElement(Typography_1.default, { gutterBottom: true, variant: "h5", component: "div" }, image.title),
                react_1.default.createElement(Typography_1.default, { variant: "body2", color: "text.secondary" }, image.body))),
        react_1.default.createElement(material_1.CardActions, null,
            react_1.default.createElement(material_1.Button, { size: "small", color: "primary" }, "Edit")))));
};
exports.ImageCard = ImageCard;
