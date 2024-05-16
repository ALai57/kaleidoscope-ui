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
    width: "auto",
    maxHeight: "95%",
    maxWidth: "75%",
    bgcolor: "background.paper",
    height: "95%",
    boxShadow: 24,
    p: 4,
    display: "inline-block",
};
var styleFocusSmall = {
    width: "auto",
    maxHeight: "95%",
    maxWidth: "95%",
    bgcolor: "background.paper",
    height: "95%",
    boxShadow: 24,
    p: 4,
    padding: "6px",
    display: "inline-block",
};
var editorStyle = {
    top: "0%",
    left: "0%",
    width: "20vw",
    height: "65vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    padding: "4px",
    overflowY: "scroll",
    display: "inline-block",
    float: "left",
};
var styleThumbnails = {
    bottom: "10px",
    left: "0%",
    height: "128px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    padding: "2px",
    overflowX: "scroll",
};
var logger = function (event) { return console.log("Clicked!", event.target.files); };
var EditableField = function (_a) {
    var label = _a.label, id = _a.id, val = _a.val, disabled = _a.disabled, onChange = _a.onChange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.TextField, { label: label, id: id, type: "text", defaultValue: val, disabled: disabled, sx: { width: "100%" }, onChange: onChange, size: "small" }),
        react_1.default.createElement("br", null),
        react_1.default.createElement("br", null)));
};
var defaultImage = {
    src: "https://andrewslai.com/static/images/nav-bar/favicon.svg",
};
var VersionSelector = function (_a) {
    var _b;
    var onVersionChange = _a.onVersionChange, selectedVersion = _a.selectedVersion, imageVersions = _a.imageVersions;
    return (react_1.default.createElement(material_1.Select, { fullWidth: true, id: "version-select", onChange: onVersionChange, value: selectedVersion, size: "small" }, imageVersions &&
        ((_b = Object.entries(imageVersions)) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
            var name = _a[0], version = _a[1];
            return (react_1.default.createElement(material_1.MenuItem, { key: name, value: version }, name));
        }))));
};
var EditorPanel = function (_a) {
    var selectedImage = _a.selectedImage, selectedVersion = _a.selectedVersion, mode = _a.mode, onVersionChange = _a.onVersionChange, onEditPhoto = _a.onEditPhoto, albums = _a.albums, _b = _a.showVersionSelector, showVersionSelector = _b === void 0 ? true : _b;
    var _c = react_1.default.useState(selectedImage.title), title = _c[0], setTitle = _c[1];
    var _d = react_1.default.useState(selectedImage.description), description = _d[0], setDescription = _d[1];
    var date = Date.parse(selectedImage === null || selectedImage === void 0 ? void 0 : selectedImage.created_at);
    var dateFormat = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    };
    var displayDate = new Date(date).toLocaleString("en-US", dateFormat);
    var imageVersions = selectedImage === null || selectedImage === void 0 ? void 0 : selectedImage.versions;
    var SaveButton = function () { return (react_1.default.createElement(material_1.Button, { variant: "contained", startIcon: react_1.default.createElement(Save_1.Save, { style: { height: "20px" } }), component: "label", sx: { margin: "5px" }, onClick: function (x) {
            return onEditPhoto({
                photo_title: title,
                description: description,
                "photo-id": selectedImage.name,
            });
        } }, "Save")); };
    return (react_1.default.createElement(material_1.Box, null,
        react_1.default.createElement("form", null,
            react_1.default.createElement("br", null),
            react_1.default.createElement(EditableField, { key: selectedImage.name + "ef-1", label: "Name", id: "name", disabled: true, val: selectedImage.name }),
            react_1.default.createElement(EditableField, { key: selectedImage.name + "ef-2", label: "Created At", id: "created_at", disabled: true, val: displayDate }),
            react_1.default.createElement(EditableField, { key: selectedImage.name + "ef-3", label: "Creator", id: "creator", disabled: true, val: selectedImage.creator }),
            react_1.default.createElement(EditableField, { key: selectedImage.name + "ef-4", label: "Title", id: "title", disabled: mode === "edit" ? false : true, val: title, onChange: function (x) { return setTitle(x.target.value); } }),
            react_1.default.createElement(EditableField, { key: selectedImage.name + "ef-5", label: "Description", id: "description", disabled: mode === "edit" ? false : true, val: description, onChange: function (x) { return setDescription(x.target.value); } }),
            react_1.default.createElement(InputTags_1.InputTags, { options: albums, disabled: mode === "edit" ? false : true, width: "100%", vals: [], onAdd: function () { return console.log("Added!"); }, onRemove: function () { return console.log("Removed!"); } }),
            react_1.default.createElement("br", null),
            showVersionSelector && (react_1.default.createElement(material_1.FormControl, { fullWidth: true },
                react_1.default.createElement(material_1.InputLabel, { id: "version-select" }, "Version"),
                react_1.default.createElement(VersionSelector, { onVersionChange: onVersionChange, selectedVersion: selectedVersion, imageVersions: imageVersions })))),
        react_1.default.createElement("br", null),
        mode === "edit" && react_1.default.createElement(SaveButton, null)));
};
var ImageBrowser = function (_a) {
    var _b;
    var images = _a.images, _c = _a.authToken, authToken = _c === void 0 ? null : _c, _d = _a.albums, albums = _d === void 0 ? [] : _d, _e = _a.startingImage, startingImage = _e === void 0 ? 0 : _e, _f = _a.photoManager, photoManager = _f === void 0 ? {} : _f, _g = _a.mode, mode = _g === void 0 ? "edit" : _g;
    var _h = photoManager.addPhoto, addPhoto = _h === void 0 ? logger : _h, _j = photoManager.editPhoto, editPhoto = _j === void 0 ? logger : _j, _k = photoManager.selectPhoto, selectPhoto = _k === void 0 ? logger : _k;
    var _l = react_1.default.useState(startingImage), selectedImageIndex = _l[0], setSelectedImageIndex = _l[1];
    var currentImageVersions = images && ((_b = images[selectedImageIndex]) === null || _b === void 0 ? void 0 : _b.versions);
    var _m = react_1.default.useState((currentImageVersions === null || currentImageVersions === void 0 ? void 0 : currentImageVersions.raw) || defaultImage), selectedVersion = _m[0], setSelectedVersion = _m[1];
    var theSelectedImage = images ? images[selectedImageIndex] : {};
    var imageVersions = theSelectedImage === null || theSelectedImage === void 0 ? void 0 : theSelectedImage.versions;
    var jumpTo = function (newIndex) {
        var _a;
        setSelectedImageIndex(newIndex);
        var newImage = images[newIndex];
        setSelectedVersion(((_a = newImage.versions) === null || _a === void 0 ? void 0 : _a.raw) || defaultImage);
    };
    var _o = react_1.default.useState(false), modalOpen = _o[0], setModalOpen = _o[1];
    var onVersionChange = function (ev) {
        setSelectedVersion(ev.target.value);
    };
    var focusNext = function () {
        return jumpTo(selectedImageIndex === (images === null || images === void 0 ? void 0 : images.length)
            ? images.length
            : selectedImageIndex + 1);
    };
    var focusBack = function () {
        return jumpTo(selectedImageIndex === 0 ? 0 : selectedImageIndex - 1);
    };
    var keypressHandler = function (e) {
        switch (e.keyCode) {
            case 37:
                focusBack();
                break;
            case 39:
                focusNext();
                break;
            default:
                break;
        }
    };
    var NewPhotoButton = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Button, { variant: "contained", startIcon: react_1.default.createElement(ImageAdd_1.ImageAdd, { style: { height: "20px" } }), component: "label" },
            "Add new photo",
            react_1.default.createElement("input", { accept: "image/*", type: "file", hidden: true, onChange: addPhoto, multiple: true })))); };
    var SelectButton = function () { return (react_1.default.createElement(material_1.Button, { variant: "contained", component: "label", onClick: function (x) { return selectPhoto(selectedVersion.src); } }, "Add image version to article")); };
    var size = "small";
    return (react_1.default.createElement("div", null,
        mode === "edit" ? (react_1.default.createElement(material_1.Grid, { container: true, xs: 12 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 3, marginRight: "5px" },
                react_1.default.createElement(VersionSelector, { imageVersions: imageVersions, selectedVersion: selectedVersion, onVersionChange: onVersionChange })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 8 },
                react_1.default.createElement(NewPhotoButton, null)))) : (react_1.default.createElement(material_1.Grid, { container: true, xs: 12 },
            react_1.default.createElement(material_1.Grid, { item: true, xs: 3 },
                react_1.default.createElement(VersionSelector, { imageVersions: imageVersions, selectedVersion: selectedVersion, onVersionChange: onVersionChange })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 8 },
                react_1.default.createElement(SelectButton, null)))),
        size === "small" ? (react_1.default.createElement(material_1.Box, { sx: { width: "100vw", height: "65vh", textAlign: "center" } },
            react_1.default.createElement(material_1.Modal, { open: modalOpen, onClose: function () { return setModalOpen(false); }, BackdropProps: {
                    style: { backgroundColor: "rgba(0, 0, 40, 0.8)" },
                } },
                react_1.default.createElement(material_1.Box, { sx: { backgroundColor: "white", opacity: 0.9 } },
                    react_1.default.createElement(EditorPanel, { mode: mode, selectedImage: theSelectedImage, onVersionChange: onVersionChange, onEditPhoto: editPhoto, selectedVersion: selectedVersion, albums: albums, showVersionSelector: size === "small" ? false : true }))),
            react_1.default.createElement(material_1.Box, { sx: size === "small" ? styleFocusSmall : styleFocus },
                react_1.default.createElement(FullImageCard_1.FullImageCard, { image: selectedVersion || defaultImage, authToken: authToken, onClick: function () { return setModalOpen(true); } })))) : (react_1.default.createElement(material_1.Box, { sx: { width: "100vw", height: "75vh", textAlign: "center" } },
            react_1.default.createElement(material_1.Box, { sx: __assign(__assign({}, editorStyle), { overflow: "hidden" }) },
                react_1.default.createElement("br", null),
                react_1.default.createElement(EditorPanel, { mode: mode, selectedImage: theSelectedImage, onVersionChange: onVersionChange, onEditPhoto: editPhoto, selectedVersion: selectedVersion, albums: albums })),
            react_1.default.createElement(material_1.Box, { sx: size === "small" ? styleFocusSmall : styleFocus },
                react_1.default.createElement(FullImageCard_1.FullImageCard, { image: selectedVersion || defaultImage, authToken: authToken })))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Box, null,
                react_1.default.createElement(material_1.Box, { sx: styleThumbnails }, images &&
                    images.map(function (image, index) {
                        var _a, _b, _c;
                        return (react_1.default.createElement(ImageThumbnail_1.ImageThumbnail, { image: (_a = image === null || image === void 0 ? void 0 : image.versions) === null || _a === void 0 ? void 0 : _a.thumbnail, authToken: authToken, key: "tmb" + ((_c = (_b = image === null || image === void 0 ? void 0 : image.versions) === null || _b === void 0 ? void 0 : _b.thumbnail) === null || _c === void 0 ? void 0 : _c.src), onClick: function () { return jumpTo(index); } }));
                    }))))));
};
exports.ImageBrowser = ImageBrowser;
