const pkg = require('./package.json');

module.exports = {
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
