"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullImageCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
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
  const imageElement = document.getElementById('full-' + imageId);
  imageElement.src = objectUrl;
  //imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
}

const FullImageCard = ({
  image,
  authToken = null,
  forceRerender = false
}) => {
  _react.default.useEffect(() => {
    console.log(`Loading ${image.src}`);
    displayProtectedImage(image.src, image.src, authToken);
  });
  return /*#__PURE__*/_react.default.createElement(_material.Card, {
    sx: {
      float: "left",
      margin: "5px",
      minHeight: "200px",
      display: 'inherit',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardActionArea, {
    sx: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.CardMedia, {
    id: 'full-' + image.src,
    component: "img",
    height: image.height,
    alt: image.alt,
    className: "lazyload",
    sx: {
      height: '100%'
    }
  })));
};
exports.FullImageCard = FullImageCard;