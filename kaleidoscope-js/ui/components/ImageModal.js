"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Modal = _interopRequireDefault(require("@mui/material/Modal"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
var _FullImageCard = _interopRequireDefault(require("./FullImageCard"));
var _ImageThumbnail = _interopRequireDefault(require("./ImageThumbnail"));
var _InputTags = _interopRequireDefault(require("./InputTags"));
var _SelectedImage = require("./hooks/SelectedImage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const styleFocus = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -20%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};
const editorStyle = {
  position: 'absolute',
  top: '0%',
  left: '0%',
  //transform: 'translate(-50%, -50%)',
  width: '20vw',
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  padding: "2px",
  overflowY: 'scroll'
};
const styleThumbnails = {
  position: 'absolute',
  bottom: '10px',
  left: '0%',
  width: '78vw',
  height: '128px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  padding: "2px",
  overflowX: "scroll"
};
const ImageModal = ({
  images,
  authToken = null,
  albums = [],
  open = false,
  handleClose,
  contentAdder,
  contentRemover
}) => {
  const {
    selectedImage,
    focusNext,
    focusBack,
    jumpTo
  } = (0, _SelectedImage.useSelectedImage)();

  // A different kind of styling
  const EditableField3 = ({
    label,
    id,
    val,
    disabled
  }) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
      label: label,
      id: id,
      type: "text",
      defaultValue: val,
      disabled: disabled,
      sx: {
        width: '20vw'
      },
      size: "small"
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null));
  };
  const keypressHandler = e => {
    switch (e.keyCode) {
      // Left
      case 37:
        focusBack();
        break;
      // Right
      case 39:
        focusNext();
        break;
      default:
        break;
    }
    ;
  };

  // TODO: Add a focus button to the Image Thumbnails (highlight yellow or something like that?)
  //       Allow the user to jump to the thumbnail somehow (from the image modal viewer)?
  return /*#__PURE__*/_react.default.createElement("div", null, images && images.length > 0 && /*#__PURE__*/_react.default.createElement(_Modal.default, {
    open: open,
    onClose: handleClose,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description",
    onKeyDown: keypressHandler
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: editorStyle
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(EditableField3, {
    label: "Name",
    id: "name",
    val: images[selectedImage].name,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField3, {
    label: "Created At",
    id: "created_at",
    val: images[selectedImage].created_at,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField3, {
    label: "Creator",
    id: "creator",
    val: images[selectedImage].creator,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField3, {
    label: "Title",
    id: "title",
    val: images[selectedImage].title
  }), /*#__PURE__*/_react.default.createElement(EditableField3, {
    label: "Alt",
    id: "alt",
    val: images[selectedImage].alt
  }), /*#__PURE__*/_react.default.createElement(_InputTags.default, {
    options: albums,
    width: "20vw",
    onAdd: _InputTags.default.logger,
    onRemove: _InputTags.default.logger
  }))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      position: 'absolute',
      left: '21vw',
      height: '100vh',
      width: '80vw'
    }
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: styleFocus
  }, /*#__PURE__*/_react.default.createElement(_FullImageCard.default, {
    image: images[selectedImage].versions.raw,
    authToken: authToken
  })), /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: styleThumbnails
  }, images && images.map((image, index) => /*#__PURE__*/_react.default.createElement(_ImageThumbnail.default, {
    image: image.versions.thumbnail,
    authToken: authToken,
    key: 'tmb' + image.versions.thumbnail.src,
    onClick: () => jumpTo(index)
  })))), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "large",
    sx: {
      position: 'absolute',
      right: '0%',
      zIndex: '100'
    },
    onClick: handleClose
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null)))));
};
exports.ImageModal = ImageModal;