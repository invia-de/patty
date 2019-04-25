const pkg = require('./package.json');

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
  styles: {
    StyleGuide: {
      '@global *': {
        fontFamily: 'Arial'
      }
    }
  },
  styleguideDir: 'public',
  components: 'src/**/[A-Z]*.js',
  title: 'Find Package Pattern Library v' + pkg.version,
  usageMode: 'expand',
  sections: [
    {
      name: 'Atoms',
      components: 'src/components/atoms/**/[A-Z]*.js'
    },
    {
      name: 'Molecules',
      components: 'src/components/molecules/**/[A-Z]*.js'
    },
    {
      name: 'Organisms',
      components: 'src/components/organisms/**/[A-Z]*.js'
    },
    {
      name: 'Layouts',
      components: 'src/components/layout/**/[A-Z]*.js'
    },
    {
      name: 'Utilities',
      components: 'src/components/utilities/**/[A-Z]*.js'
    },
    {
      name: 'Legacy',
      components: 'src/legacy/**/[A-Z]*.js'
    }
  ]
};
