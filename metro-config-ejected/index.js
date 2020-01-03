// Node has certain globals that modules may expect, such as Buffer or process.
// React Native does not provide these globals.
// The node-libs-react-native/globals module in this package will shim the
// global environment to add these globals.
// Just require (or import) this module in your app before anything else.
// Note that imports get hoisted above requires

import "node-libs-react-native/globals";

import { AppRegistry, Platform } from "react-native";
import App from "./App";

AppRegistry.registerComponent("ReactNativeIPFS", () => App);

if (Platform.OS === "web") {
  const rootTag =
    document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("ReactNativeIPFS", { rootTag });
}
