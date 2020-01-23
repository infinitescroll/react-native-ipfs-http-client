module.exports = function(api) {
  api.cache(true);
  return {
    // presets: [
    //   [
    //     "@babel/preset-env",
    //     {
    //       useBuiltIns: "usage",
    //       corejs: 3
    //     }
    //   ],
    //   "babel-preset-expo"
    // ]

    // presets: [
    //   [
    //     "@babel/preset-env",
    //     {
    //       useBuiltIns: "usage",
    //       corejs: 2
    //     }
    //   ],
    //   "babel-preset-expo"
    // ]

    // presets: [
    //   "@babel/preset-env",
    //   {
    //     useBuiltIns: "usage",
    //     corejs: 3
    //   }
    // ]

    presets: ["babel-preset-expo"],
    // plugins: ["@babel/plugin-transform-regenerator"]
    plugins: ["@babel/plugin-proposal-async-generator-functions"]
  };
};
