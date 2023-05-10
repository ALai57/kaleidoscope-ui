"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageCardGallery = void 0;
var _react = _interopRequireDefault(require("react"));
var _ImageCard = require("./ImageCard");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logImageClick = (image, n) => event => console.log(`Clicked image ${n} ${JSON.stringify(image)}`);
const ImageCardGallery = ({
  images,
  authToken = null,
  clickHandler
}) => /*#__PURE__*/_react.default.createElement("div", {
  style: {
    height: "85vh",
    overflowY: "scroll"
  }
}, images && images.map((image, idx) => /*#__PURE__*/_react.default.createElement(_ImageCard.ImageCard, {
  image: image,
  authToken: authToken,
  key: image.src,
  onClick: clickHandler ? clickHandler(image, idx) : logImageClick(image, idx)
})));
exports.ImageCardGallery = ImageCardGallery;