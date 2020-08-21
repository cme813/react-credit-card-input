module.exports = {
  stories: ['../src/**/*.stories.js'],
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
