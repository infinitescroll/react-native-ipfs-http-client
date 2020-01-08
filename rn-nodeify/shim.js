import { URL, URLSearchParams } from "whatwg-url";

global.Symbol = require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");

// Note to Jon:
// Another attempt to have the iterator piece working:
// Add more global polyfills for this syntax for the various data
// structures it might be used with.
// ---
// require("core-js/fn/map");
// require("core-js/fn/set");
// require("core-js/fn/array/find");
// ---

/// ---
// Latest:
// import symbol from "core-js/es6/symbol";
// import iterator from "core-js/fn/symbol/iterator";
// // import "core-js/fn/symbol/iterator";

// console.log("symbol", symbol);

// global.Symbol = symbol;
// global.Symbol.iterator = iterator;

// Note to Jon:
// One attempt to have the iterator piece working:
// Attempt to directly define what it's doing here (I think it's doing this?)
// ---
// if (Array.prototype["@@iterator"] === undefined) {
//   Array.prototype["@@iterator"] = function() {
//     let i = 0;
//     return {
//       next: () => ({
//         done: i >= this.length,
//         value: this[i++]
//       })
//     };
//   };
// }
/// ---

import "core-js";

// if (Platform.OS === 'android') {
//   if (typeof Symbol === 'undefined') {
//     if (Array.prototype['@@iterator'] === undefined) {
//       Array.prototype['@@iterator'] = function() {
//         let i = 0;
//         return {
//           next: () => ({
//             done: i >= this.length,
//             value: this[i++],
//           }),
//         };
//       };
//     }
//   }
// }

global.URL = URL;
global.URLSearchParams = URLSearchParams;

if (typeof __dirname === "undefined") global.__dirname = "/";
if (typeof __filename === "undefined") global.__filename = "";
if (typeof process === "undefined") {
  global.process = require("process");
} else {
  const bProcess = require("process");
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;
if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === "boolean" && __DEV__;
process.env["NODE_ENV"] = isDev ? "development" : "production";
if (typeof localStorage !== "undefined") {
  localStorage.debug = isDev ? "*" : "";
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require("crypto");
