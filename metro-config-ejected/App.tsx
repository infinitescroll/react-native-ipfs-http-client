import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ipfsClient from "ipfs-http-client";

const ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

export default function App() {
  console.log({ ipfs });
  const dagPut = async () => {
    const hash = await ipfs.id();
    console.log("HASH", hash);
    return hash;
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
