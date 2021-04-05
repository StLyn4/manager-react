const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
  plugins: [
    {
      plugin: require('craco-less'),
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: true, // Enable dark mode
                compact: true, // Enable compact mode
              }),
              'body-background': '#262626',
              'primary-color': '#1DA57A'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
      plugins: [
        ["import", {
          libraryName: "antd",
          style: true
        }]
      ],
  },
};
