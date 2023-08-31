const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // Target environment for Node.js
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)(\.node)?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Add a rule to exclude solidity-analyzer module
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    alias: {
      fs: path.resolve(__dirname, './customfs.js'),
    },
    fallback: {
      assert: require.resolve('assert'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      // ... other fallbacks
      undici: require.resolve('undici'), // Add this line
      axios: require.resolve('axios'),   // Add this line
    },
  },
  externals: {
    fs: 'commonjs fs',
    'stream/web': 'commonjs stream/web',
    'util/types': 'commonjs util/types',
    // ... other externals
    '@nomicfoundation/solidity-analyzer-win32-x64-msvc/solidity-analyzer.win32-x64-msvc.node': 'commonjs2 @nomicfoundation/solidity-analyzer-win32-x64-msvc/solidity-analyzer.win32-x64-msvc.node',

  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  node: {
    process: false,
    Buffer: false,
    fs: false,
  },
};
