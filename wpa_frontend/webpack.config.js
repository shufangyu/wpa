const path = require('path');
const webpack = require('webpack');

// module.exports = {
//   entry: './node_modules/recrypt-js/index.js',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//     library: "PRE",
//     libraryTarget: 'umd'
//   },
// };

module.exports = {
  mode: 'development',
  entry: './node_modules/eff-pre/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundleEff.js',
    library: "EFFPRE",
    libraryTarget: 'umd'
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),

  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      path: false,
      fs: false,
      "crypto": require.resolve("crypto-browserify"), 
      assert: false,
      perf_hooks: false,
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
    }
  },
  target: 'web'
};