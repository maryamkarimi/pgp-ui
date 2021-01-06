const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#7829ca', '@link-color': '#97a0ba' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
