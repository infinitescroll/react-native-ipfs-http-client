const nodelibs = require("node-libs-react-native");

// Did this because of this issue:
// https://github.com/parshap/node-libs-react-native/issues/6
nodelibs.vm = require.resolve("vm-browserify");

// Did this because of this issue to test if js-ipfs-http-client
// really needs an implementation of the crypto package (it does)
// https://github.com/parshap/node-libs-react-native/issues/23
// nodelibs.crypto = null;
// Can try alternate implementations other than react-native-crypto next,
// or follow the instructions to eject and link react-native-randombytes

// Consider using expo-crypto instead
// https://github.com/expo/expo/tree/master/packages/expo-crypto

module.exports = {
  resolver: {
    extraNodeModules: nodelibs
  }
};
