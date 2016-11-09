module.exports = {
  entry: {
    index: "./index.js",
    inject: "./inject.js",
  },
  output: {
    path: __dirname,
    filename: "[name].build.js"
  },
};