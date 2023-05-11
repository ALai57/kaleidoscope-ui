"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageThumbnail = void 0;
var _react = _interopRequireDefault(require("react"));
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
  const imageElement = document.getElementById('thumbnail-' + imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const ImageThumbnail = ({
  image,
  authToken = null,
  onClick
}) => {
  const {
    observe,
    inView
  } = (0, _reactCoolInview.useInView)({
    unobserveOnEnter: true,
    rootMargin: "5px",
    onEnter: ({
      unobserve
    }) => {
      console.log(`Loading Thumbnail ${image.src}!`);
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
      height: "100px",
      width: "100px",
      float: "left"
    },
    ref: observe
  }, inView && /*#__PURE__*/_react.default.createElement(_material.Card, {
    sx: {
      float: "left",
      margin: "5px",
      height: "100px",
      width: "100px"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardActionArea, null, /*#__PURE__*/_react.default.createElement(_material.CardMedia, {
    id: 'thumbnail-' + image.src,
    component: "img",
    height: "100px",
    alt: image.alt,
    onClick: onClick,
    sx: {
      overflow: 'hidden'
    },
    className: "lazyload"
  }))));
};
exports.ImageThumbnail = ImageThumbnail;