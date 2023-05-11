"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBrowser = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _FullImageCard = require("./FullImageCard");
var _ImageThumbnail = require("./ImageThumbnail");
var _InputTags = require("./InputTags");
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
  padding: "4px",
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
const ImageBrowser = ({
  images,
  authToken = null,
  albums = [],
  startingImage = 0
}) => {
  console.log("ARGUMENTS", images, albums);
  const [selectedImage, jumpTo] = _react.default.useState(startingImage);
  const focusNext = () => jumpTo(selectedImage === len(images) ? len(images) : selectedImage + 1);
  const focusBack = () => jumpTo(selectedImage === 0 ? 0 : selectedImage - 1);

  // A different kind of styling
  const EditableField = ({
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
        width: '100%'
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
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      ...editorStyle,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(EditableField, {
    label: "Name",
    id: "name",
    val: images[selectedImage].name,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField, {
    label: "Created At",
    id: "created_at",
    val: images[selectedImage].created_at,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField, {
    label: "Creator",
    id: "creator",
    val: images[selectedImage].creator,
    disabled: true
  }), /*#__PURE__*/_react.default.createElement(EditableField, {
    label: "Title",
    id: "title",
    val: images[selectedImage].title
  }), /*#__PURE__*/_react.default.createElement(EditableField, {
    label: "Alt",
    id: "alt",
    val: images[selectedImage].alt
  }), /*#__PURE__*/_react.default.createElement(_InputTags.InputTags, {
    options: albums,
    width: "100%",
    vals: [],
    onAdd: () => console.log('Added!'),
    onRemove: () => console.log('Removed!')
  }))), /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      position: 'absolute',
      left: '21vw',
      height: '100vh',
      width: '80vw'
    }
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: styleFocus
  }, /*#__PURE__*/_react.default.createElement(_FullImageCard.FullImageCard, {
    image: images[selectedImage].versions.raw,
    authToken: authToken
  })), /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: styleThumbnails
  }, images && images.map((image, index) => /*#__PURE__*/_react.default.createElement(_ImageThumbnail.ImageThumbnail, {
    image: image.versions.thumbnail,
    authToken: authToken,
    key: 'tmb' + image.versions.thumbnail.src,
    onClick: () => jumpTo(index)
  })))));
};
exports.ImageBrowser = ImageBrowser;