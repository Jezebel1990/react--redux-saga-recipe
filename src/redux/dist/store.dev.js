"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _rootReducer = _interopRequireDefault(require("./root-reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import rootSaga from "./sagas";
var sagaMiddleware = (0, _reduxSaga["default"])();
var middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(_reduxLogger["default"]);
}

var store = (0, _redux.createStore)(_rootReducer["default"], _redux.applyMiddleware.apply(void 0, middleware)); // sagaMiddleware.run(rootSaga);

var _default = store;
exports["default"] = _default;