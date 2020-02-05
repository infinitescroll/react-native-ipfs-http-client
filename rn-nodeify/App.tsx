// TODO: Remove the .js extension from this import once we've
// confirmed it's working as-is
import "./shim.js";

import crypto from "crypto";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Experiments with directly browserifying the code rather than using
// the dist code transpiled using IPFS's Babel config
// const ipfs = require("./browserified.js");
// import ipfsClient from "./browserified.js";
// const ipfsClient = require("./browserified.js");

import ipfsClient from "ipfs-http-client";

// When not using the async iterators Babel plugin, you need to get the
// dist version of the file
// const ipfsClient = require("ipfs-http-client/dist/index.js");

// console.log(ipfsClient())

// For testing ky calls directly rather
// than via js-ipfs-http-client:
// const kyDefault = require("ky-universal").default;

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
    console.log("Blob", Blob);
    console.log("FormData", FormData);
    // console.log("globals.Request", globals.Request)
    const hash = await ipfs.id();
    console.log("HASH", hash);
    console.log("Symbol", Symbol);
    console.log("Symbol.iterator", Symbol.iterator);
    console.log("Getting updates");
    console.log("window.Request", window.Request);
    console.log("global.Request", global.Request);

    // Note: Something is up with the JSON parsing when using dag.put rather
    // than add
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
      //
      // console.log({ fetch });
      //
      // BREAKING CHANGE: addFromURL has been removed. Please use the exported
      // urlSource utility and pass the result to add. See the URL source
      // documentation for more details and an example.
      // const result = await ipfs.addFromURL("http://example.com/"); // deprecated
      // console.log("result");
      // return result;
      //
      // For the ndjson parsing step to work, the input data
      // needs to be newline-delimited JSON according to the spec
      // like `['{"id": 1}\n', '{"id"', ': 2}', '\n{"id": 3}\n']`
      //
      // Before add was returned an async iterable
      // const int = await ipfs.add(Buffer.from("hello native"));
      // console.log("TCL: test -> int", int);
      //
      // Now that add returns an async iterable:
      const int = await ipfs.add(Buffer.from("hello native"));
      for await (let chunk of int) {
        // console.log({ chunk });
        console.log("chunk", chunk);
      }
      //
      // console.log("About to make ky request");
      // (async () => {
      //   console.log("About to make ky request");
      //   const parsed = await ky
      //     .post("https://example.com", { json: { foo: true } })
      //     .json();

      //   console.log(parsed);
      //   //=> `{data: '🦄'}`
      // })();
      //
      // const out = await ipfs.cat(
      //   'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A',
      // );
      // console.log('TCL: test -> out', out.toString());
      //
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
      //
      // const files = [
      //   {
      //     path: "./tmp/myfile.txt",
      //     content: ipfsClient.Buffer.from("ABC")
      //   }
      // ];
      // const results = await ipfs.add(files);
      // console.log(results);
      //
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
