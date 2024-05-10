"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBrowser = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var ImageAdd_1 = require("@styled-icons/boxicons-regular/ImageAdd");
var FullImageCard_1 = require("./FullImageCard");
var ImageThumbnail_1 = require("./ImageThumbnail");
var InputTags_1 = require("./InputTags");
var styleFocus = {
    width: 'auto',
    maxHeight: '100%',
    maxWidth: '75%',
    height: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'inline-block',
};
var editorStyle = {
    top: '0%',
    left: '0%',
    width: '20vw',
    height: '70vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "4px",
    overflowY: 'scroll',
    display: 'inline-block',
    float: 'left'
};
var styleThumbnails = {
    bottom: '10px',
    left: '0%',
    height: '128px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "2px",
    overflowX: "scroll",
};
var logger = function (event) { return console.log('Clicked!', event.target.files); };
var ImageBrowser = function (_a) {
    var _b, _c, _d, _e, _f;
    var images = _a.images, _g = _a.authToken, authToken = _g === void 0 ? null : _g, _h = _a.albums, albums = _h === void 0 ? [] : _h, _j = _a.startingImage, startingImage = _j === void 0 ? 0 : _j, _k = _a.photoManager, photoManager = _k === void 0 ? {} : _k;
    var _l = photoManager.addPhoto, addPhoto = _l === void 0 ? logger : _l;
    var _m = react_1.default.useState(startingImage), selectedImage = _m[0], jumpTo = _m[1];
    var focusNext = function () { return jumpTo(selectedImage === (images === null || images === void 0 ? void 0 : images.length) ? images.length : selectedImage + 1); };
    var focusBack = function () { return jumpTo(selectedImage === 0 ? 0 : selectedImage - 1); };
    var EditableField = function (_a) {
        var label = _a.label, id = _a.id, val = _a.val, disabled = _a.disabled;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.TextField, { label: label, id: id, type: "text", defaultValue: val, disabled: disabled, sx: { width: '100%' }, size: 'small' }),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null));
    };
    var keypressHandler = function (e) {
        switch (e.keyCode) {
            case 37:
                focusBack();
                break;
            case 39:
                focusNext();
                break;
            default: break;
        }
        ;
    };
    var defaultImage = { src: 'https://andrewslai.com/images/nav-bar/favicon.svg' };
    var date = Date.parse(images && ((_b = images[selectedImage]) === null || _b === void 0 ? void 0 : _b.created_at));
    var dateFormat = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(material_1.Box, { sx: { width: '100vw', height: '75vh', textAlign: 'center' } },
            react_1.default.createElement(material_1.Box, { sx: __assign(__assign({}, editorStyle), { overflow: 'hidden' }) },
                react_1.default.createElement("form", null,
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(EditableField, { label: 'Name', id: 'name', val: images && ((_c = images[selectedImage]) === null || _c === void 0 ? void 0 : _c.name), disabled: true }),
                    react_1.default.createElement(EditableField, { label: 'Created At', id: 'created_at', val: images && date && new Date(date).toLocaleString('en-US', dateFormat), disabled: true }),
                    react_1.default.createElement(EditableField, { label: 'Creator', id: 'creator', val: images && ((_d = images[selectedImage]) === null || _d === void 0 ? void 0 : _d.creator), disabled: true }),
                    react_1.default.createElement(EditableField, { label: 'Title', id: 'title', val: images && ((_e = images[selectedImage]) === null || _e === void 0 ? void 0 : _e.title), disabled: false }),
                    react_1.default.createElement(EditableField, { label: 'Alt', id: 'alt', val: images && ((_f = images[selectedImage]) === null || _f === void 0 ? void 0 : _f.alt), disabled: false }),
                    react_1.default.createElement(InputTags_1.InputTags, { options: albums, width: '100%', vals: [], onAdd: function () { return console.log('Added!'); }, onRemove: function () { return console.log('Removed!'); } })),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(material_1.Button, { variant: 'contained', startIcon: react_1.default.createElement(ImageAdd_1.ImageAdd, { style: { height: '20px' } }), component: 'label' },
                    "Add photo",
                    react_1.default.createElement("input", { accept: 'image/*', type: "file", hidden: true, onChange: addPhoto, multiple: true }))),
            react_1.default.createElement(material_1.Box, { sx: styleFocus },
                react_1.default.createElement(FullImageCard_1.FullImageCard, { image: images && images[selectedImage] ? images[selectedImage].versions.raw : defaultImage, authToken: authToken }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Box, null,
                react_1.default.createElement(material_1.Box, { sx: styleThumbnails }, images && images.map(function (image, index) {
                    var _a, _b, _c;
                    return react_1.default.createElement(ImageThumbnail_1.ImageThumbnail, { image: (_a = image === null || image === void 0 ? void 0 : image.versions) === null || _a === void 0 ? void 0 : _a.thumbnail, authToken: authToken, key: 'tmb' + ((_c = (_b = image === null || image === void 0 ? void 0 : image.versions) === null || _b === void 0 ? void 0 : _b.thumbnail) === null || _c === void 0 ? void 0 : _c.src), onClick: function () { return jumpTo(index); } });
                }))))));
};
exports.ImageBrowser = ImageBrowser;
