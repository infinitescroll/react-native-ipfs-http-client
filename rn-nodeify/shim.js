import { URL, URLSearchParams } from "whatwg-url";

// global.fetch = require("whatwg-fetch").fetch;
// global.fetch = require("./fetch.js").fetch;
// import "@stardazed/streams-polyfill";

// const ReadableStream = require("web-streams-polyfill/es2018").ReadableStream;
// global.ReadableStream = ReadableStream;

// response.clone() is undefined
// https://github.com/github/fetch/issues/746#issuecomment-573891642
// https://github.com/jonnyreeves/fetch-readablestream/issues/12
// global.fetch = require("fetch-readablestream");

// Going with import until we figure out exactly what would need to be
// done manually with a require style and directly editing the globals
// global.fetch = require("@stardazed/streams-polyfill");
import "@stardazed/streams-polyfill";

global.Symbol = require("core-js/es6/symbol");

// import symbol from "core-js/es6/symbol";
// global.Symbol = symbol;
require("core-js/fn/symbol/iterator");
require("core-js/fn/symbol/async-iterator");
// import "regenerator-runtime/runtime";

// global.Symbol = require("core-js/es6/symbol");
// require("core-js/fn/symbol/iterator");
// require("core-js/fn/symbol/async-iterator");

// Note to Jon:
// Another attempt to have the iterator piece working:
// Add more global polyfills for this syntax for the various data
// structures it might be used with.
// ---
// require("core-js/fn/map");
// require("core-js/fn/set");
// require("core-js/fn/array/find");
// ---

// To address
// Error: FileReader.readAsArrayBuffer is not implemented
// from: https://stackoverflow.com/questions/42829838/react-native-atob-btoa-not-working-without-remote-js-debugging
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const atob = (input = "") => {
  let str = input.replace(/=+$/, "");
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

FileReader.prototype.readAsArrayBuffer = function(blob) {
  console.log({"data": blob._data})
  if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
  this._setReadyState(this.LOADING);
  this._result = null;
  this._error = null;
  const fr = new FileReader();
  fr.onloadend = () => {
    const content = atob(
      fr.result.substr("data:application/octet-stream;base64,".length)
    );
    const buffer = new ArrayBuffer(content.length);
    const view = new Uint8Array(buffer);
    view.set(Array.from(content).map(c => c.charCodeAt(0)));
    this._result = buffer;
    this._setReadyState(this.DONE);
  };

  if (!blob._data) {
    return;
  }
  fr.readAsText(blob);
};

/// ---
// // Latest:
// import symbol from "core-js/es6/symbol";
// import iterator from "core-js/fn/symbol/iterator";
// import asyncIterator from "core-js/fn/symbol/async-iterator";

// // // console.log("symbol", symbol);

// global.Symbol = symbol;
// // global.Symbol.iterator = iterator;
// global.Symbol.iterator = Symbol("Symbol.iterator");
// global.Symbol.asyncIterator = Symbol("Symbol.asyncIterator");

// Note to Jon:
// One attempt to have the iterator piece working:
// Attempt to directly define what it's doing here (I think it's doing this?)
// ---
// Originally with arrays rather than objects
// TODO: Possibly readd these if that's what it-all is using

// ---
// Decoder
// var log = Math.log;
// var LN2 = Math.LN2;
// var clz32 =
//   Math.clz32 ||
//   function(x) {
//     return (31 - log(x >>> 0) / LN2) | 0;
//   };
// var fromCharCode = String.fromCharCode;
// var Object_prototype_toString = {}.toString;
// var NativeSharedArrayBuffer = window["SharedArrayBuffer"];
// var sharedArrayBufferString = NativeSharedArrayBuffer
//   ? Object_prototype_toString.call(NativeSharedArrayBuffer)
//   : "";
// var NativeUint8Array = window.Uint8Array;
// var patchedU8Array = NativeUint8Array || Array;
// var arrayBufferString = Object_prototype_toString.call(
//   (NativeUint8Array ? ArrayBuffer : patchedU8Array).prototype
// );
// function decoderReplacer(encoded) {
//   var codePoint = encoded.charCodeAt(0) << 24;
//   var leadingOnes = clz32(~codePoint) | 0;
//   var endPos = 0,
//     stringLen = encoded.length | 0;
//   var result = "";
//   if (leadingOnes < 5 && stringLen >= leadingOnes) {
//     codePoint = (codePoint << leadingOnes) >>> (24 + leadingOnes);
//     for (endPos = 1; endPos < leadingOnes; endPos = (endPos + 1) | 0)
//       codePoint =
//         (codePoint << 6) | (encoded.charCodeAt(endPos) & 0x3f) /*0b00111111*/;
//     if (codePoint <= 0xffff) {
//       // BMP code point
//       result += fromCharCode(codePoint);
//     } else if (codePoint <= 0x10ffff) {
//       // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
//       codePoint = (codePoint - 0x10000) | 0;
//       result += fromCharCode(
//         ((codePoint >> 10) + 0xd800) | 0, // highSurrogate
//         ((codePoint & 0x3ff) + 0xdc00) | 0 // lowSurrogate
//       );
//     } else endPos = 0; // to fill it in with INVALIDs
//   }
//   for (; endPos < stringLen; endPos = (endPos + 1) | 0) result += "\ufffd"; // replacement character
//   return result;
// }
// function TextDecoder() {}
// TextDecoder["prototype"]["decode"] = function(inputArrayOrBuffer) {
//   console.log({ inputArrayOrBuffer });
//   var buffer =
//     (inputArrayOrBuffer && inputArrayOrBuffer.buffer) || inputArrayOrBuffer;
//   var asObjectString = Object_prototype_toString.call(buffer);
//   if (
//     asObjectString !== arrayBufferString &&
//     asObjectString !== sharedArrayBufferString
//   )
//     throw Error(
//       "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"
//     );
//   var inputAs8 = NativeUint8Array ? new patchedU8Array(buffer) : buffer;
//   var resultingString = "";
//   for (
//     var index = 0, len = inputAs8.length | 0;
//     index < len;
//     index = (index + 32768) | 0
//   )
//     resultingString += fromCharCode.apply(
//       0,
//       inputAs8[NativeUint8Array ? "subarray" : "slice"](
//         index,
//         (index + 32768) | 0
//       )
//     );

//   return resultingString.replace(/[\xc0-\xff][\x80-\xbf]*/g, decoderReplacer);
// };

// global.TextDecoder = TextDecoder;

// if (typeof TextEncoder === "undefined") {
//   TextEncoder = function TextEncoder() {};
//   TextEncoder.prototype.encode = function encode(str) {
//     "use strict";
//     var Len = str.length,
//       resPos = -1;
//     // The Uint8Array's length must be at least 3x the length of the string because an invalid UTF-16
//     //  takes up the equivelent space of 3 UTF-8 characters to encode it properly. However, Array's
//     //  have an auto expanding length and 1.5x should be just the right balance for most uses.
//     var resArr =
//       typeof Uint8Array === "undefined"
//         ? new Array(Len * 1.5)
//         : new Uint8Array(Len * 3);
//     for (var point = 0, nextcode = 0, i = 0; i !== Len; ) {
//       (point = str.charCodeAt(i)), (i += 1);
//       if (point >= 0xd800 && point <= 0xdbff) {
//         if (i === Len) {
//           resArr[(resPos += 1)] = 0xef /*0b11101111*/;
//           resArr[(resPos += 1)] = 0xbf /*0b10111111*/;
//           resArr[(resPos += 1)] = 0xbd /*0b10111101*/;
//           break;
//         }
//         // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
//         nextcode = str.charCodeAt(i);
//         if (nextcode >= 0xdc00 && nextcode <= 0xdfff) {
//           point = (point - 0xd800) * 0x400 + nextcode - 0xdc00 + 0x10000;
//           i += 1;
//           if (point > 0xffff) {
//             resArr[(resPos += 1)] = (0x1e /*0b11110*/ << 3) | (point >>> 18);
//             resArr[(resPos += 1)] =
//               (0x2 /*0b10*/ << 6) | ((point >>> 12) & 0x3f) /*0b00111111*/;
//             resArr[(resPos += 1)] =
//               (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
//             resArr[(resPos += 1)] =
//               (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
//             continue;
//           }
//         } else {
//           resArr[(resPos += 1)] = 0xef /*0b11101111*/;
//           resArr[(resPos += 1)] = 0xbf /*0b10111111*/;
//           resArr[(resPos += 1)] = 0xbd /*0b10111101*/;
//           continue;
//         }
//       }
//       if (point <= 0x007f) {
//         resArr[(resPos += 1)] = (0x0 /*0b0*/ << 7) | point;
//       } else if (point <= 0x07ff) {
//         resArr[(resPos += 1)] = (0x6 /*0b110*/ << 5) | (point >>> 6);
//         resArr[(resPos += 1)] =
//           (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
//       } else {
//         resArr[(resPos += 1)] = (0xe /*0b1110*/ << 4) | (point >>> 12);
//         resArr[(resPos += 1)] =
//           (0x2 /*0b10*/ << 6) | ((point >>> 6) & 0x3f) /*0b00111111*/;
//         resArr[(resPos += 1)] =
//           (0x2 /*0b10*/ << 6) | (point & 0x3f) /*0b00111111*/;
//       }
//     }
//     if (typeof Uint8Array !== "undefined")
//       return resArr.subarray(0, resPos + 1);
//     // else // IE 6-9
//     resArr.length = resPos + 1; // trim off extra weight
//     return resArr;
//   };
//   TextEncoder.prototype.toString = function() {
//     return "[object TextEncoder]";
//   };
//   try {
//     // Object.defineProperty only works on DOM prototypes in IE8
//     Object.defineProperty(TextEncoder.prototype, "encoding", {
//       get: function() {
//         if (TextEncoder.prototype.isPrototypeOf(this)) return "utf-8";
//         else throw TypeError("Illegal invocation");
//       }
//     });
//   } catch (e) {
//     /*IE6-8 fallback*/ TextEncoder.prototype.encoding = "utf-8";
//   }
//   if (typeof Symbol !== "undefined")
//     TextEncoder.prototype[Symbol.toStringTag] = "TextEncoder";
// }

// if (Array.prototype["@@iterator"] === undefined) {
//   console.log("Manually defining array @@iterator");
//   Array.prototype["@@iterator"] = function() {
//     let i = 0;
//     return {
//       next: () => {
//         console.log("--- next called");
//         return {
//           done: i >= this.length,
//           value: this[i++]
//         };
//       }
//     };
//   };
// } else {
//   console.log("Array has @@iterator");
// }

// if (Array.prototype[Symbol.iterator] === undefined) {
//   console.log("Manually defining array Symbol.iterator");
//   Array.prototype[Symbol.iterator] = function() {
//     let i = 0;
//     return {
//       next: () => {
//         console.log("--- next called");
//         return {
//           done: i >= this.length,
//           value: this[i++]
//         };
//       }
//     };
//   };
// } else {
//   console.log("Array has Symbol.iterator");
// }

// // if (Array.prototype[Symbol.asyncIterator] === undefined) {
// console.log("Manually defining array async iterator");
// Array.prototype[Symbol.asyncIterator] = function() {
//   let i = 0;
//   return {
//     async next() {
//       console.log("--- Async next called");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
//       if (i <= this.length) {
//         return { done: false, value: this[i++] };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };
// } else {
//   console.log("Array has async iterator");
// }

// String
// Array
// Array-like objects (e.g., arguments or NodeList)
// TypedArray;
// Map;
// Set;

// if (String.prototype["@@iterator"] === undefined) {
// String.prototype[Symbol.asyncIterator] = function() {
//   let i = 0;
//   return {
//     async next() {
//       console.log("--- Async next called");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
//       if (i <= this.length) {
//         return { done: false, value: this[i++] };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };

// Map.prototype[Symbol.asyncIterator] = function() {
//   let i = 0;
//   return {
//     async next() {
//       console.log("--- Async next called");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
//       if (i <= this.length) {
//         return { done: false, value: this[i++] };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };

// Set.prototype[Symbol.asyncIterator] = function() {
//   let i = 0;
//   return {
//     async next() {
//       console.log("--- Async next called");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
//       if (i <= this.length) {
//         return { done: false, value: this[i++] };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };

// TypedArray.prototype[Symbol.asyncIterator] = function() {
//   let i = 0;
//   return {
//     async next() {
//       console.log("--- Async next called");
//       await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
//       if (i <= this.length) {
//         return { done: false, value: this[i++] };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };
// }

// TODO: Try polyfillying async iterators here
// START HERE NEXT

/// ---

// import "core-js";

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
