// TODO: Remove the .js extension from this import once we've
// confirmed it's working as-is
import "./shim.js";

import crypto from "crypto";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

// const ipfs = require("./browserified.js");
// import ipfsClient from "./browserified.js";
// import ipfsClient from "ipfs-http-client";
// const ipfsClient = require("./browserified.js");
const ipfsClient = require("ipfs-http-client/dist/index.js");
// console.log(ipfsClient())
const kyDefault = require("ky-universal").default;

// Imports internal to ipfs
// const FormData = require('form-data')
// const { Buffer } = require('buffer')
// const toStream = require('it-to-stream')
// const normaliseInput = require('ipfs-utils/src/files/normalise-input')
// const ndjson = require('iterable-ndjson')
// const configure = require('../lib/configure')
// const { toFormData } = require('./form-data')

const ipfs = ipfsClient({
  host: "localhost",
  port: "5001",
  protocol: "http"
});
// const ipfs = ipfsClient({
//   host: "ipfs.infura.io",
//   port: "5001",
//   protocol: "https"
// });

// Source code
// [TypeError: _iterator[typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator"] is not a function. (In '_iterator[typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator"]()', '_iterator[typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator"]' is undefined)]
// Bundle
// [TypeError: undefined is not an object (evaluating 'body[typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator"]')]

export default function App() {
  // console.log({ ipfs });
  const dagPut = async () => {
    const hash = await ipfs.id();
    console.log("HASH", hash);
    console.log("Symbol", Symbol);
    console.log("Symbol.iterator", Symbol.iterator);

    // Note: Something is up with the JSON parsing when using dag.put rather
    // than addFromURL
    // const obj = { simple: "object" };
    // const cid = await ipfs.dag.put(obj, {
    //   format: "dag-cbor",
    //   hashAlg: "sha3-512"
    // });
    try {
      // const obj = { simple: "object" };
      // const cid = await ipfs.dag.put(`{"menu": {
      //   "id": "file",
      //   "value": "File"
      // }}`);
      // console.log("cid", cid);
      // // console.log("cid", cid.toString());
      // return cid;

      console.log({ fetch });
      const result = await ipfs.addFromURL("http://example.com/");
      console.log("result");
      return result;

      // async function getResponseSize(url) {
      //   const response = await fetch(url);
      //   // const body = response["_bodyBlob"];
      //   const body = response.json();
      //   let total = 0;

      //   console.log("response", response);
      //   // const { body } = response;
      //   console.log({ body });
      //   (async () => {
      //     for await (const chunk of body) {
      //       total += chunk.length;
      //       console.log({ total });
      //     }
      //   })().catch(e => {
      //     console.log("Async iterator error stack", e.stack);
      //     console.log({ e });
      //   });
      // }

      // getResponseSize("http://google.com");

      // const files = [
      //   {
      //     path: "./tmp/myfile.txt",
      //     content: ipfsClient.Buffer.from("ABC")
      //   }
      // ];
      // const results = await ipfs.add(files);
      // console.log(results);
      // var fibonacci = {
      //   [Symbol.iterator]: function*() {
      //     var pre = 0,
      //       cur = 1;
      //     for (;;) {
      //       var temp = pre;
      //       pre = cur;
      //       cur += temp;
      //       yield cur;
      //     }
      //   }
      // };
      // for (var n of fibonacci) {
      //   // truncate the sequence at 1000
      //   if (n > 1000) break;
      //   console.log(n);
      // }

      // let range = {
      //   from: 1,
      //   to: 5,
      //   // for await..of calls this method once in the very beginning
      //   [Symbol.asyncIterator]() {
      //     // (1)
      //     // ...it returns the iterator object:
      //     // onward, for await..of works only with that object,
      //     // asking it for next values using next()
      //     return {
      //       current: this.from,
      //       last: this.to,
      //       // next() is called on each iteration by the for await..of loop
      //       async next() {
      //         // (2)
      //         // it should return the value as an object {done:.., value :...}
      //         // (automatically wrapped into a promise by async)
      //         // can use await inside, do async stuff:
      //         await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
      //         if (this.current <= this.last) {
      //           return { done: false, value: this.current++ };
      //         } else {
      //           return { done: true };
      //         }
      //       }
      //     };
      //   }
      // };
      // console.log("Type of async iterable is", typeof range);
      // (async () => {
      //   for await (let value of range) {
      //     // (4)
      //     console.log(value); // 1,2,3,4,5
      //   }
      // })().catch(e => {
      //   console.log("Async iterator error stack", e.stack);
      //   console.log({ e });
      // });

      // async function* generateSequence(start, end) {
      //   for (let i = start; i <= end; i++) {
      //     // yay, can use await!
      //     await new Promise(resolve => setTimeout(resolve, 1000));
      //     yield i;
      //   }
      // }
      // (async () => {
      //   let generator = generateSequence(1, 5);
      //   for await (let value of generator) {
      //     console.log(value); // 1, then 2, then 3, then 4, then 5
      //   }
      // })().catch(e => {
      //   console.log("Async iterator error stack", e.stack);
      //   console.log("Async iterator error", e);
      // });

      // ---

      //  const toFormData = async input => {
      //   const files = normaliseInput(input)
      //   const formData = new FormData()
      //   let i = 0
      //   for await (const file of files) {
      //     if (file.content) {
      //       // In Node.js, FormData can be passed a stream so no need to buffer
      //       formData.append(
      //         `file-${i}`,
      //         // FIXME: add a `path` property to the stream so `form-data` doesn't set
      //         // a Content-Length header that is only the sum of the size of the
      //         // header/footer when knownLength option (below) is null.
      //         Object.assign(
      //           toStream.readable(file.content),
      //           { path: file.path || `file-${i}` }
      //         ),
      //         {
      //           filepath: encodeURIComponent(file.path),
      //           contentType: 'application/octet-stream',
      //           knownLength: file.content.length // Send Content-Length header if known
      //         }
      //       )
      //     } else {
      //       formData.append(`dir-${i}`, Buffer.alloc(0), {
      //         filepath: encodeURIComponent(file.path),
      //         contentType: 'application/x-directory'
      //       })
      //     }
      //     i++
      //   }
      //   return formData
      // }
      //       function toIterable (body) {
      //         // Node.js stream
      //         if (body[Symbol.asyncIterator]) return body
      //         // Browser ReadableStream
      //         if (body.getReader) {
      //           return (async function * () {
      //             const reader = body.getReader()
      //             try {
      //               while (true) {
      //                 const { done, value } = await reader.read()
      //                 if (done) return
      //                 yield value
      //               }
      //             } finally {
      //               reader.releaseLock()
      //             }
      //           })()
      //         }
      //         throw new Error('unknown stream')
      //       }
      //       const toCamel = obj => {
      //         if (obj == null) return obj
      //         const caps = /^[A-Z]+$/
      //         return Object.keys(obj).reduce((camelObj, k) => {
      //           if (caps.test(k)) { // all caps
      //             camelObj[k.toLowerCase()] = obj[k]
      //           } else if (caps.test(k[0])) { // pascal
      //             camelObj[k[0].toLowerCase() + k.slice(1)] = obj[k]
      //           } else {
      //             camelObj[k] = obj[k]
      //           }
      //           return camelObj
      //         }, {})
      // }
      //       const add = configure(({ ky }) => {
      //         return async function * add (input, options) {
      //           options = options || {}
      //           const searchParams = new URLSearchParams(options.searchParams)
      //           searchParams.set('stream-channels', true)
      //           if (options.chunker) searchParams.set('chunker', options.chunker)
      //           if (options.cidVersion) searchParams.set('cid-version', options.cidVersion)
      //           if (options.cidBase) searchParams.set('cid-base', options.cidBase)
      //           if (options.enableShardingExperiment != null) searchParams.set('enable-sharding-experiment', options.enableShardingExperiment)
      //           if (options.hashAlg) searchParams.set('hash', options.hashAlg)
      //           if (options.onlyHash != null) searchParams.set('only-hash', options.onlyHash)
      //           if (options.pin != null) searchParams.set('pin', options.pin)
      //           if (options.progress) searchParams.set('progress', true)
      //           if (options.quiet != null) searchParams.set('quiet', options.quiet)
      //           if (options.quieter != null) searchParams.set('quieter', options.quieter)
      //           if (options.rawLeaves != null) searchParams.set('raw-leaves', options.rawLeaves)
      //           if (options.shardSplitThreshold) searchParams.set('shard-split-threshold', options.shardSplitThreshold)
      //           if (options.silent) searchParams.set('silent', options.silent)
      //           if (options.trickle != null) searchParams.set('trickle', options.trickle)
      //           if (options.wrapWithDirectory != null) searchParams.set('wrap-with-directory', options.wrapWithDirectory)
      //           if (options.preload != null) searchParams.set('preload', options.preload)
      //           if (options.fileImportConcurrency != null) searchParams.set('file-import-concurrency', options.fileImportConcurrency)
      //           if (options.blockWriteConcurrency != null) searchParams.set('block-write-concurrency', options.blockWriteConcurrency)
      //           const res = await ky.post('add', {
      //             timeout: options.timeout,
      //             signal: options.signal,
      //             headers: options.headers,
      //             searchParams,
      //             body: await toFormData(input)
      //           })
      //           for await (let file of ndjson(toIterable(res.body))) {
      //             file = toCamel(file)
      //             // console.log(file)
      //             if (options.progress && file.bytes) {
      //               options.progress(file.bytes)
      //             } else {
      //               yield toCoreInterface(file)
      //             }
      //           }
      //         }
      //       })
      //       function toCoreInterface ({ name, hash, size }) {
      //         return { path: name, hash, size: parseInt(size) }
      //       }
      // return async function* addFromURL(url, options) {
      //   options = options || {};
      //   const { body } = await kyDefault.get(url);
      //   const input = {
      //     path: decodeURIComponent(
      //       new URL(url).pathname.split("/").pop() || ""
      //     ),
      //     content: toIterable(body)
      //   };
      //   yield* add(input, options);
      // };
      // // Local reproduction of the addFromURL error:
      // const all = async iterator => {
      //   const arr = [];
      //   for await (const entry of iterator) {
      //     arr.push(entry);
      //   }
      //   return arr;
      // };
      // all(addFromURL("http://example.com/")
      // example obj
      // const obj = {
      //   a: 1,
      //   b: [1, 2, 3],
      //   c: {
      //     ca: [5, 6, 7],
      //     cb: "foo"
      //   }
      // };
      // const cid = await ipfs.dag.put(obj, {
      //   format: "dag-cbor",
      //   hashAlg: "sha2-256"
      // });
      // console.log(cid);
      // function* gen() {
      //   yield* ["a", "b", "c"];
      // }
      // console.log(gen().next()); // { value: "a", done: false }
      // const iterable1 = new Object();
      // iterable1[Symbol.iterator] = function*() {
      //   yield 1;
      //   yield 2;
      //   yield 3;
      // };
      // console.log([...iterable1]);
      // let myMap = new Map();
      // let keyString = "a string";
      // let keyObj = {};
      // let keyFunc = function() {};
      // // setting the values
      // myMap.set(keyString, "value associated with 'a string'");
      // myMap.set(keyObj, "value associated with keyObj");
      // myMap.set(keyFunc, "value associated with keyFunc");
      // for (let oneThing of myMap) {
      //   console.log(oneThing);
      // }
    } catch (error) {
      console.log("error.stack", error.stack);
      console.log("error", error);
    }
  };
  dagPut();
  return (
    <View style={styles.container}>
      <Text>{`Open up App.tsx to start working on your app!`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
