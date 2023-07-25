"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRecipes = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var YOUR_APP_KEY = "2c3c813a5b4d8fc91cb6833a6374fa88";
var YOUR_APP_ID = "eaae0a2c";

var getRecipes = function getRecipes(query) {
  var url;
  return regeneratorRuntime.async(function getRecipes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://api.edamam.com/search?q=".concat(query, "&app_id=").concat(YOUR_APP_ID, "&app_key=").concat(YOUR_APP_KEY);
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getRecipes = getRecipes;