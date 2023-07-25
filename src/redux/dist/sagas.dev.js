"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLoadRecipeAsync = onLoadRecipeAsync;
exports.onLoadRecipe = onLoadRecipe;
exports["default"] = rootSaga;

var _effects = require("redux-saga/effects");

var types = _interopRequireWildcard(require("./actionTypes"));

var _api = require("./api");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(onLoadRecipeAsync),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(onLoadRecipe),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

function onLoadRecipeAsync(_ref) {
  var query, response;
  return regeneratorRuntime.wrap(function onLoadRecipeAsync$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_api.getRecipes, query);

        case 4:
          response = _context.sent;
          _context.next = 7;
          return (0, _effects.put)({
            type: types.FETCH_RECIPE_SUCCESS,
            payload: response.data
          });

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return (0, _effects.put)({
            type: types.FETCH_RECIPE_FAIL,
            payload: _context.t0
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}

function onLoadRecipe() {
  return regeneratorRuntime.wrap(function onLoadRecipe$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(types.FETCH_RECIPE_START, onLoadRecipeAsync);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

var recipeSaga = [(0, _effects.fork)(onLoadRecipe)];

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.all)([].concat(recipeSaga));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}