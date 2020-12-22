const path = require('path');

module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    APP_BASEURL: 'http://localhost:3000',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      app: path.resolve(__dirname),
    };

    return config;
  },
};
