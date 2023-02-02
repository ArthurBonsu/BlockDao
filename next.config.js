/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
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
     config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ]);
    return config
  },
  reactStrictMode: true,



}

module.exports = nextConfig
