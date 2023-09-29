const path = require('path');

const fixtures = path.resolve(__dirname, 'fixtures');
const nodeExternals = require('webpack-node-externals');

let fsPromises;
if (process.env.NODE_ENV === 'production') {
  fsPromises = require('fs/promises');
} else {
  // Provide an alternative implementation or polyfill for browser or client-side code
  fsPromises = require('fs-extra');
}

// N
module.exports = {
    //...
    target: 'node',
    externals: [nodeExternals()],
    mode: 'production',
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
    rules: [{
      test:  /\.js$, \.ts$, \.tsx$, \.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },

  devtool: 'source-map', 
  devServer:{contentBase: './'},
    resolve: {
      alias: {
        fs: path.resolve(__dirname, './customfs.js'),
      },
        roots: [__dirname, fixtures],
        importsFields: ['browser', 'module', 'main'],
        
      fallback: {

 
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        console: require.resolve('console-browserify'),
        constants: require.resolve('constants-browserify'),
        crypto: require.resolve('crypto-browserify'),
        worker_threads: require.resolve('worker_threads'),
        events: require.resolve('events'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        punycode: require.resolve('punycode'),
        process: require.resolve('process/browser'),
        querystring: require.resolve('querystring-es3'),
        stream: require.resolve('stream-browserify'),
        string_decoder: require.resolve('string_decoder'),
        util: require.resolve('util'),
        timers: require.resolve('timers-browserify'),
        tty: require.resolve('tty-browserify'),
        url: require.resolve('url'),
        util: require.resolve('util'),
        vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib'),
        fs : require.resolve('fs'),
        fspromises: require.resolve('fs/promises'),
        vm: require.resolve("vm-browserify"),
        webstream : require('web-streams-polyfill/ponyfill'),
        stream: require.resolve('stream'),
        util: require.resolve('util'),
     
       perf_hooks: require.resolve('perf_hooks'),
        
       querystring: require.resolve('querystring'),
       querystring: require.resolve('querystring-es3'),
       domain: require.resolve('domain'),
       domain: require.resolve('domain-browser'),
       worker_threads: require.resolve('worker_threads'),
       util_types: require.resolve('util/types'),
       assert: require.resolve('assert'),
       buffer: require.resolve('buffer'),
       console: require.resolve('console-browserify'),
       constants: require.resolve('constants-browserify'),
       crypto: require.resolve('crypto-browserify'),
       domain: require.resolve('domain-browser'),
       events: require.resolve('events'),
       http: require.resolve('stream-http'),
       https: require.resolve('https-browserify'),
       os: require.resolve('os-browserify/browser'),
       path: require.resolve('path-browserify'),
       punycode: require.resolve('punycode'),
       process: require.resolve('process/browser'),
       querystring: require.resolve('querystring-es3'),
       stream: require.resolve('stream-browserify'),
       string_decoder: require.resolve('string_decoder'),
       sys: require.resolve('util'),
       timers: require.resolve('timers-browserify'),
       tty: require.resolve('tty-browserify'),
       url: require.resolve('url'),
       util: require.resolve('util/types'),       
       util: require.resolve('util'),
       vm: require.resolve('vm-browserify'),
       zlib: require.resolve('browserify-zlib'),
        
       
      },


    },
   

//...
resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
 
  };