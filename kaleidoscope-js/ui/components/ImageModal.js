"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModal = void 0;
var react_1 = __importDefault(require("react"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Modal_1 = __importDefault(require("@mui/material/Modal"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var FullImageCard_1 = __importDefault(require("./FullImageCard"));
var ImageThumbnail_1 = __importDefault(require("./ImageThumbnail"));
var InputTags_1 = __importDefault(require("./InputTags"));
var SelectedImage_1 = require("./hooks/SelectedImage");
var styleFocus = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
var editorStyle = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '20vw',
    height: '100vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "2px",
    overflowY: 'scroll'
};
var styleThumbnails = {
    position: 'absolute',
    bottom: '10px',
    left: '0%',
    width: '78vw',
    height: '128px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    padding: "2px",
    overflowX: "scroll",
};
var ImageModal = function (_a) {
    var images = _a.images, _b = _a.authToken, authToken = _b === void 0 ? null : _b, _c = _a.albums, albums = _c === void 0 ? [] : _c, _d = _a.open, open = _d === void 0 ? false : _d, handleClose = _a.handleClose, contentAdder = _a.contentAdder, contentRemover = _a.contentRemover;
    var _e = (0, SelectedImage_1.useSelectedImage)(), selectedImage = _e.selectedImage, focusNext = _e.focusNext, focusBack = _e.focusBack, jumpTo = _e.jumpTo;
    var EditableField3 = function (_a) {
        var label = _a.label, id = _a.id, val = _a.val, disabled = _a.disabled;
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(TextField_1.default, { label: label, id: id, type: "text", defaultValue: val, disabled: disabled, sx: { width: '20vw' }, size: 'small' }),
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
    return (react_1.default.createElement("div", null, images && images.length > 0 &&
        react_1.default.createElement(Modal_1.default, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description", onKeyDown: keypressHandler },
            react_1.default.createElement("div", null,
                react_1.default.createElement(Box_1.default, { sx: editorStyle },
                    react_1.default.createElement("form", null,
                        react_1.default.createElement("br", null),
                        react_1.default.createElement(EditableField3, { label: 'Name', id: 'name', val: images[selectedImage].name, disabled: true }),
                        react_1.default.createElement(EditableField3, { label: 'Created At', id: 'created_at', val: images[selectedImage].created_at, disabled: true }),
                        react_1.default.createElement(EditableField3, { label: 'Creator', id: 'creator', val: images[selectedImage].creator, disabled: true }),
                        react_1.default.createElement(EditableField3, { label: 'Title', id: 'title', val: images[selectedImage].title }),
                        react_1.default.createElement(EditableField3, { label: 'Alt', id: 'alt', val: images[selectedImage].alt }),
                        react_1.default.createElement(InputTags_1.default, { options: albums, width: '20vw', onAdd: InputTags_1.default.logger, onRemove: InputTags_1.default.logger }))),
                react_1.default.createElement(Box_1.default, { sx: { position: 'absolute', left: '21vw', height: '100vh', width: '80vw' } },
                    react_1.default.createElement(Box_1.default, { sx: styleFocus },
                        react_1.default.createElement(FullImageCard_1.default, { image: images[selectedImage].versions.raw, authToken: authToken })),
                    react_1.default.createElement(Box_1.default, { sx: styleThumbnails }, images && images.map(function (image, index) {
                        return react_1.default.createElement(ImageThumbnail_1.default, { image: image.versions.thumbnail, authToken: authToken, key: 'tmb' + image.versions.thumbnail.src, onClick: function () { return jumpTo(index); } });
                    }))),
                react_1.default.createElement(IconButton_1.default, { size: 'large', sx: { position: 'absolute', right: '0%', zIndex: '100' }, onClick: handleClose },
                    react_1.default.createElement(Close_1.default, null))))));
};
exports.ImageModal = ImageModal;
