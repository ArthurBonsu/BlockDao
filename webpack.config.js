
const fixtures = path.resolve(__dirname, 'fixtures');

module.exports = {
    //...
    resolve: {
        
        roots: [__dirname, fixtures],
        importsFields: ['browser', 'module', 'main'],
        
      fallback: {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        console: require.resolve('console-browserify'),
        constants: require.resolve('constants-browserify'),
        crypto: require.resolve('crypto-browserify'),
      
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
        fs: require.resolve('fs/promises'),
        require :resolve('fs/promises'),
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
       
      },


    },
   

//...
resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
 
  };