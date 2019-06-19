const pkg = require('./package.json');

module.exports = {
  title: 'Find Package Pattern Library v' + pkg.version,
  usageMode: 'expand',
  styleguideDir: 'public',
  components: 'src/**/[A-Z]*.js',
  styles: {
    StyleGuide: {
      '@global *': {
        fontFamily: 'Arial'
      },
      '@global html': {
        fontSize: '12px'
      }
    }
  },
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
  ],
  /**
   * needed for whitelabel theming (dev server and styleguide build uses aidu.de as default styling)
   */
  dangerouslyUpdateWebpackConfig(config) {
    if (config && config.module && config.module.rules) {
      config.module.rules.forEach(rule => {
        if (rule.oneOf) {
          rule.oneOf.forEach(subRule => {
            if (subRule.test && subRule.test.toString().includes('scss|sass')) {
              subRule.use.forEach(function(subSubRule) {
                if (
                  subSubRule &&
                  subSubRule.loader &&
                  subSubRule.loader.includes('sass-loader')
                ) {
                  subSubRule.options = {
                    ...subSubRule.options,
                    includePaths: [
                      '.',
                      './src/style/' +
                        (process.env.BUILD_TARGET || 'aidu') +
                        '/'
                    ]
                  };
                }
              });
            }
          });
        }
      });
    }

    return config;
  }
};
