"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _Card = _interopRequireDefault(require("@mui/material/Card"));
var _CardContent = _interopRequireDefault(require("@mui/material/CardContent"));
var _CardMedia = _interopRequireDefault(require("@mui/material/CardMedia"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _material = require("@mui/material");
var _reactCoolInview = require("react-cool-inview");
require("lazysizes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function fetchWithAuthentication(url, authToken) {
  const headers = new Headers();
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  ;
  return fetch(url, {
    headers
  });
}

// https://alphahydrae.com/2021/02/how-to-display-an-image-protected-by-header-based-authentication/
async function displayProtectedImage(imageId, imageUrl, authToken) {
  // Fetch the image.
  const response = await fetchWithAuthentication(imageUrl, authToken);

  // Create an object URL from the data.
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  // Update the source of the image.
  const imageElement = document.getElementById(imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const ImageCard = ({
  image,
  authToken = null,
  onClick
}) => {
  const {
    observe,
    inView
  } = (0, _reactCoolInview.useInView)({
    unobserveOnEnter: true,
    rootMargin: "50px",
    onEnter: ({
      unobserve
    }) => {
      console.log("Observing!");
      displayProtectedImage(image.src, image.src, authToken);
    }
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "placeholder",
    style: inView ? {
      height: "fit-content",
      width: "fit-content",
      float: "left"
    } : {
      minHeight: "200px",
      minWidth: "200px",
      float: "left"
    },
    ref: observe
  }, inView && /*#__PURE__*/_react.default.createElement(_Card.default, {
    sx: {
      maxWidth: 345,
      float: "left",
      margin: "5px",
      minHeight: "200px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardActionArea, {
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_CardMedia.default, {
    id: image.src,
    component: "img",
    height: image.height,
    alt: image.alt,
    className: "lazyload thumbnail"
  }), /*#__PURE__*/_react.default.createElement(_CardContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    gutterBottom: true,
    variant: "h5",
    component: "div"
  }, image.title), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body2",
    color: "text.secondary"
  }, image.body))), /*#__PURE__*/_react.default.createElement(_material.CardActions, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    size: "small",
    color: "primary"
  }, "Edit"))));
};
exports.ImageCard = ImageCard;