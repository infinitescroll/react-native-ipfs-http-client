// TODO: Remove the .js extension from this import once we've
// confirmed it's working as-is
import "./shim.js";

import crypto from "crypto";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ipfsClient from "ipfs-http-client";

const ipfs = ipfsClient({ host: "localhost", port: "5001", protocol: "http" });
// const ipfs = ipfsClient({
//   host: "ipfs.infura.io",
//   port: "5001",
//   protocol: "https"
// });

export default function App() {
  console.log({ ipfs });
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
      // const cid = await ipfs.dag.put(obj, {
      //   format: "dag-cbor",
      //   hashAlg: "sha2-256"
      // });
      // console.log("cid", cid);
      // // console.log("cid", cid.toString());
      // return cid;

      // const result = await ipfs.addFromURL("http://example.com/");
      // // TODO: Polyfill Symbol
      // console.log("result");
      // return result;

      // function* gen() {
      //   yield* ["a", "b", "c"];
      // }

      // console.log(gen().next()); // { value: "a", done: false }

      var fibonacci = {
        [Symbol.iterator]: function*() {
          var pre = 0,
            cur = 1;
          for (;;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
          }
        }
      };

      for (var n of fibonacci) {
        // truncate the sequence at 1000
        if (n > 1000) break;
        console.log(n);
      }

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
