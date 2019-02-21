module.exports = {
  /**
   * @todo: test if this can be removed after react-styleguidst 9.0.0 release
   */
  webpackConfig: require('react-scripts/config/webpack.config'),

  /**
   * @todo: test if this can be removed after react-styleguidst 9.0.0 release
   * @see: https://github.com/styleguidist/react-styleguidist/issues/1247#issuecomment-454644352
   */
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.output = {
      ...webpackConfig.output,
      publicPath: process.env.PUBLIC_URL || ''
    };
    return webpackConfig;
  },
  components: 'src/**/[A-Z]*.js'
};
