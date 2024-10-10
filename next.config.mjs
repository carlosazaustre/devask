/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
        "zlib-sync": "commonjs zlib-sync",
      });
    }

    // Support for JSON files
    config.module.rules.push({
      test: /\.json$/,
      type: "javascript/auto",
      use: [
        {
          loader: "json-loader",
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
