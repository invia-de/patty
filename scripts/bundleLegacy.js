const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rewire = require('rewire');
const buildFileName = process.argv[2];
const buildFilePath = path.resolve(
  __dirname + './../src/legacy/build-files/' + buildFileName + '.js'
);
const fileNameWithExt = path.basename(buildFilePath);
const fileName = fileNameWithExt.replace('.js', '');

try {
  fs.readFileSync(buildFilePath);
} catch (e) {
  console.log('[WARN] \x1b[31mBUILD FILE NOT FOUND\x1b[0m ' + buildFilePath);
  // simply return to not break the pipline
  return;
}

// we turn off sourcemap generation completly
process.env.GENERATE_SOURCEMAP = false;

function rewireModule(modulePath, customizer) {
  let defaults = rewire(modulePath);
  let paths = defaults.__get__('paths');
  let config = defaults.__get__('config');
  
  defaults.__set__('printFileSizesAfterBuild', () => {});
  defaults.__set__('copyPublicFolder', () => {});
  defaults.__set__('fs', {...fsx, emptyDirSync: ()=> {}});

  // change appBuild path so that we still get nice size reports
  paths.appBuild = path.resolve(__dirname + './../legacybuild/' + buildFileName);

  // change the webpack configuration to build a monolithic bundle
  customizer(config);
}

rewireModule('react-scripts/scripts/build.js', function(config) {
  // the path to src/build-files/stepX.js
  // that file determines what we want to bundle for each AIDU step
  config.entry = buildFilePath;

  // change the output of webpack so we get a nice and consumable bundle file
  config.output = {
    path: path.resolve(__dirname + '/../legacybuild/' + fileName),
    filename: fileNameWithExt,
    libraryTarget: 'var',
    // global variable name to access the componts inside AIDU code
    library: '_preactComponents'
  };

  // turn off all the chunking
  // this makes consuming in AIDU way more easier
  // because we just need to import one JS file for each step
  config.optimization = {
    ...config.optimization,
    splitChunks: false,
    runtimeChunk: false
  };

  // remove all plugins we do not need but keep MiniCssExtractPlugin
  config.plugins = [
    new MiniCssExtractPlugin({
      filename: fileName + '.css'
    })
  ];

  // alias react and react-dom to preact/compat
  // react & react-dom is 4 times larger in bundle size
  config.resolve.alias = {
    ...config.resolve.alias,
    react: 'preact/compat',
    'react-dom': 'preact/compat'
  };
});