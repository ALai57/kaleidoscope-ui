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
exports.InputTags = void 0;
var react_1 = __importDefault(require("react"));
var Autocomplete_1 = __importDefault(require("@mui/material/Autocomplete"));
var TextField_1 = __importDefault(require("@mui/material/TextField"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var logger = function (event, list, reason, detail) { return console.log(event, list, reason, detail); };
var onChange = function (onAdd, onRemove) {
    return function (event, list, reason, detail) {
        if (reason === 'selectOption') {
            console.log('Added!', event, list, reason, detail);
            onAdd(detail);
        }
        else if (reason === 'removeOption') {
            console.log('Removed!');
            onRemove(detail);
        }
    };
};
var InputTags = function (_a) {
    var _b = _a.options, options = _b === void 0 ? [] : _b, _c = _a.width, width = _c === void 0 ? 500 : _c, _d = _a.onAdd, onAdd = _d === void 0 ? logger : _d, vals = _a.vals, _e = _a.onRemove, onRemove = _e === void 0 ? logger : _e, _f = _a.tagType, tagType = _f === void 0 ? "Albums" : _f;
    var onChangeHandler = onChange(onAdd, onRemove);
    return (react_1.default.createElement(Stack_1.default, { spacing: 3, sx: { width: { width: width } } },
        react_1.default.createElement(Autocomplete_1.default, { multiple: true, id: "tags-standard", options: options, getOptionLabel: function (option) { return option.title; }, isOptionEqualToValue: function (option, value) { return option.title === value.title; }, onChange: onChangeHandler, defaultValue: vals, renderInput: function (params) { return (react_1.default.createElement(TextField_1.default, __assign({}, params, { type: "text", label: tagType, placeholder: tagType, size: 'small' }))); } })));
};
exports.InputTags = InputTags;
