const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['fs'] = path.resolve(__dirname, 'node_modules/fs-extra');
    
    if (!isServer) {
      // For the client, provide a fallback mechanism
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        https: false,
        http: false,
        crypto: false,
        stream: false,
        net: false,
        tls: false,
        constants: false,
        zlib: false,
        child_process: false,
        console: false,
        async_hooks: false,
        ethereum_waffle: false,
        stream_web: false,
        util_types: false,
        fs_promises: false,
        querystring: false,
        util: false,
        webstream: false,
        perf_hooks: false,
        worker_threads: false,
        vm: false,
        chakraui: false,
        fspromises: false,
      };
    } else {
      // For the server, use your existing server-side configuration
      // ...

      // Add undici and axios to the externals for server-side rendering
      config.externals.push(
        'undici',
        'axios'
      );

      // Polyfill global objects like `process` and `Buffer` for Node.js modules
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
        new NodePolyfillPlugin()
      );
    }
    
    // ... other webpack configuration

    // NormalModuleReplacementPlugin
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
          case "buffer":
            resource.request = "buffer";
            break;
          case "stream":
            resource.request = "readable-stream";
            break;
          default:
            throw new Error(`Not found ${mod}`);
        }
      })
    );

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  },
  reactStrictMode: true,

  // ... other Next.js configuration

};
