/** @type {import('next').NextConfig} */
const nextConfig = {
  
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {

    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
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
    fs_promises: false,
    stream_web: false,
    querystring_es3: false,
    domain: false,
    worker_threads: false,
    vm:false,
    chakraui: false
      }
  }
 
     config.resolve.fallback ={fs:false};
   
     config.resolve.fallback ={domain:false};
     config.resolve.fallback ={querystring:false};
     config.resolve.fallback ={fs:false};
     config.resolve.fallback ={domain:false};
     config.resolve.fallback ={stream:false};
     config.resolve.fallback ={util:false};
     config.resolve.fallback ={webstream:false};
     config.resolve.fallback={perf_hooks:false};
     config.resolve.fallback={worker_threads:false};
     config.resolve.fallback={util_types:false};
     config.resolve.fallback={vm:false};
     config.resolve.fallback={path:false};
     config.resolve.fallback={os:false};
     config.resolve.fallback={chakraui:false};
     config.resolve.fallback = {
      url: require.resolve("url"),
      fs: require.resolve("graceful-fs"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
  };

  
     config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),


    ]);


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
  }),

config.ignoreWarnings = [/Failed to parse source map/];


    
    return config
  },
  reactStrictMode: true,



}

module.exports = nextConfig
