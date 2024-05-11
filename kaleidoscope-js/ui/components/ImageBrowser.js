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
var Save_1 = require("@styled-icons/boxicons-regular/Save");
var FullImageCard_1 = require("./FullImageCard");
var ImageThumbnail_1 = require("./ImageThumbnail");
var InputTags_1 = require("./InputTags");
var styleFocus = {
    width: 'auto',
    maxHeight: '95%',
    maxWidth: '75%',
    bgcolor: 'background.paper',
    height: '95%',
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
var EditableField = function (_a) {
    var label = _a.label, id = _a.id, val = _a.val, disabled = _a.disabled, onChange = _a.onChange;
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.TextField, { label: label, id: id, type: "text", defaultValue: val, disabled: disabled, sx: { width: '100%' }, onChange: onChange, size: 'small' }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null));
};
var ImageBrowser = function (_a) {
    var _b, _c, _d;
    var images = _a.images, _e = _a.authToken, authToken = _e === void 0 ? null : _e, _f = _a.albums, albums = _f === void 0 ? [] : _f, _g = _a.startingImage, startingImage = _g === void 0 ? 0 : _g, _h = _a.photoManager, photoManager = _h === void 0 ? {} : _h;
    var defaultImage = { src: 'https://andrewslai.com/static/images/nav-bar/favicon.svg' };
    var _j = photoManager.addPhoto, addPhoto = _j === void 0 ? logger : _j, _k = photoManager.editPhoto, editPhoto = _k === void 0 ? logger : _k;
    var _l = react_1.default.useState(startingImage), selectedImageIndex = _l[0], setSelectedImageIndex = _l[1];
    var currentImageVersions = images && ((_b = images[selectedImageIndex]) === null || _b === void 0 ? void 0 : _b.versions);
    var _m = react_1.default.useState((currentImageVersions === null || currentImageVersions === void 0 ? void 0 : currentImageVersions.raw) || defaultImage), selectedVersion = _m[0], setSelectedVersion = _m[1];
    var theSelectedImage = images ? images[selectedImageIndex] : {};
    var _o = react_1.default.useState(theSelectedImage.title), title = _o[0], setTitle = _o[1];
    var _p = react_1.default.useState(theSelectedImage.description), description = _p[0], setDescription = _p[1];
    var jumpTo = function (newIndex) {
        var _a;
        setSelectedImageIndex(newIndex);
        var newImage = images[newIndex];
        setSelectedVersion(((_a = newImage.versions) === null || _a === void 0 ? void 0 : _a.raw) || defaultImage);
        setTitle(newImage.title);
        setDescription(newImage.description);
    };
    var focusNext = function () { return jumpTo(selectedImageIndex === (images === null || images === void 0 ? void 0 : images.length) ? images.length : selectedImageIndex + 1); };
    var focusBack = function () { return jumpTo(selectedImageIndex === 0 ? 0 : selectedImageIndex - 1); };
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
    var date = Date.parse(images && ((_c = images[selectedImageIndex]) === null || _c === void 0 ? void 0 : _c.created_at));
    var dateFormat = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    var displayDate = images && date && new Date(date).toLocaleString('en-US', dateFormat);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(material_1.Box, { sx: { width: '100vw', height: '75vh', textAlign: 'center' } },
            react_1.default.createElement(material_1.Box, { sx: __assign(__assign({}, editorStyle), { overflow: 'hidden' }) },
                react_1.default.createElement("form", null,
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(EditableField, { key: theSelectedImage.name || "ef-1", label: 'Name', id: 'name', disabled: true, val: theSelectedImage.name }),
                    react_1.default.createElement(EditableField, { key: theSelectedImage.date || "ef-2", label: 'Created At', id: 'created_at', disabled: true, val: displayDate }),
                    react_1.default.createElement(EditableField, { key: theSelectedImage.creator || "ef-3", label: 'Creator', id: 'creator', disabled: true, val: theSelectedImage.creator }),
                    react_1.default.createElement(EditableField, { key: theSelectedImage.title || "ef-4", label: 'Title', id: 'title', disabled: false, val: title, onChange: function (x) { return setTitle(x.target.value); } }),
                    react_1.default.createElement(EditableField, { key: theSelectedImage.description || "ef-5", label: 'Description', id: 'description', disabled: false, val: description, onChange: function (x) { return setDescription(x.target.value); } }),
                    react_1.default.createElement(InputTags_1.InputTags, { options: albums, width: '100%', vals: [], onAdd: function () { return console.log('Added!'); }, onRemove: function () { return console.log('Removed!'); } }),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(material_1.FormControl, { fullWidth: true },
                        react_1.default.createElement(material_1.InputLabel, { id: "version-select" }, "Version"),
                        react_1.default.createElement(material_1.Select, { id: "version-select", onChange: function (ev) {
                                setSelectedVersion(ev.target.value);
                            }, value: selectedVersion }, currentImageVersions && ((_d = Object.entries(currentImageVersions)) === null || _d === void 0 ? void 0 : _d.map(function (_a) {
                            var name = _a[0], version = _a[1];
                            return react_1.default.createElement(material_1.MenuItem, { key: name, value: version }, name);
                        }))))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement(material_1.Button, { variant: 'contained', startIcon: react_1.default.createElement(Save_1.Save, { style: { height: '20px' } }), component: 'label', onClick: function (x) {
                        var _a;
                        return editPhoto({ photo_title: title, description: description, "photo-id": (_a = images[selectedImageIndex]) === null || _a === void 0 ? void 0 : _a.name });
                    } }, "Save"),
                " ",
                react_1.default.createElement(material_1.Button, { variant: 'contained', startIcon: react_1.default.createElement(ImageAdd_1.ImageAdd, { style: { height: '20px' } }), component: 'label' },
                    "Add new photo",
                    react_1.default.createElement("input", { accept: 'image/*', type: "file", hidden: true, onChange: addPhoto, multiple: true }))),
            react_1.default.createElement(material_1.Box, { sx: styleFocus },
                react_1.default.createElement(FullImageCard_1.FullImageCard, { image: selectedVersion || defaultImage, authToken: authToken }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Box, null,
                react_1.default.createElement(material_1.Box, { sx: styleThumbnails }, images && images.map(function (image, index) {
                    var _a, _b, _c;
                    return react_1.default.createElement(ImageThumbnail_1.ImageThumbnail, { image: (_a = image === null || image === void 0 ? void 0 : image.versions) === null || _a === void 0 ? void 0 : _a.thumbnail, authToken: authToken, key: 'tmb' + ((_c = (_b = image === null || image === void 0 ? void 0 : image.versions) === null || _b === void 0 ? void 0 : _b.thumbnail) === null || _c === void 0 ? void 0 : _c.src), onClick: function () { return jumpTo(index); } });
                }))))));
};
exports.ImageBrowser = ImageBrowser;
