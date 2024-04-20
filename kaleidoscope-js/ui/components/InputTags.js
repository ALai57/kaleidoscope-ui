"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTags = void 0;
var _react = _interopRequireDefault(require("react"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const logger = (event, list, reason, detail) => console.log(event, list, reason, detail);
const onChange = (onAdd, onRemove) => (event, list, reason, detail) => {
  if (reason === 'selectOption') {
    //console.log('Added!', event, list, reason, detail);
    onAdd(detail);
  } else if (reason === 'removeOption') {
    //console.log('Removed!');
    onRemove(detail);
  }
};
const InputTags = ({
  options = [],
  width = 500,
  onAdd = logger,
  vals,
  onRemove = logger,
  tagType = "Albums"
}) => {
  const onChangeHandler = onChange(onAdd, onRemove);
  return /*#__PURE__*/_react.default.createElement(_Stack.default, {
    spacing: 3,
    sx: {
      width: {
        width
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_Autocomplete.default, {
    multiple: true,
    id: "tags-standard",
    options: options,
    getOptionLabel: option => option.title,
    isOptionEqualToValue: (option, value) => option.title === value.title,
    onChange: onChangeHandler,
    defaultValue: vals,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, params, {
      type: "text",
      label: tagType,
      placeholder: tagType,
      size: "small"
    }))
  }));
};
exports.InputTags = InputTags;