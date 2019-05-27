[![pipeline status](https://gitlab.l.invia.lan/find-package/aidu-whitelabel/find-package-pattern-library/badges/master/pipeline.svg)](https://gitlab.l.invia.lan/find-package/aidu-whitelabel/find-package-pattern-library/commits/master)

# Patty - React Pattern Library Framework

Get started with your Styleguide with great tools at your hand, utilizing [create-react-app](https://github.com/facebook/create-react-app), [react-styleguidist](https://github.com/styleguidist/react-styleguidist), [react-styleguidist-visual](https://github.com/unindented/react-styleguidist-visual), [Jest](https://jestjs.io/) and [react-testing-library](https://github.com/kentcdodds/react-testing-library)!

Maintained with ❤ by [Eric Zieger](https://github.com/thezieger) and [Sven Bischoff](https://github.com/medienlampe).

## Local development

- clone the repo
- run `npm install`
- run `npm start` to spin up the local dev server

## Creating new components

- run `npm run create` (atm. only Linux/Mac)
- follow the instructions shown in the terminal

## Writing tests

### Code tests

- this repo ships with Jest and react-testing-library
- when running `npm run create` you will always get a super basic snaphsot test
- add your own tests to the Component.test.js file
- run your tests via `npm run test-code`
- you can also run a watcher via `npm run test-watch`

### Visual tests

- this repo ships with [react-styleguidist-visual](https://github.com/unindented/react-styleguidist-visual)
- every iteration of the your pattern library will be checked visually against the former version, failing if there are changes
- run your visual tests via `npm run test-visual`
- if the test returns a false positive (e.g. the changes marked are intended), just approve them via `npm run approve`

## Build your components for consuming in other projects

- run `npm run build`

## Deployment

- run `npm run build-styleguide`
- copy the contents of the folder `/styleguide` to the `htdocs`-Directory of your server

## Build the bundles for consuming in other projects

- create bundler index file, where you're importing all components you want your bundle to include and export them as one object - e.g. `src/build-files/somefancyproject.js`:
  ```
  import { renderSomeFancyComponent } from '../SomeFancyComponent/SomeFancyComponent.js';
  import { renderAnotherFancyComponent } from '../AnotherFancyComponent/AnotherFancyComponent.js';
  export { renderSomeFancyComponent, renderAnotherFancyComponent };
  ```
- run the bundler for your project: `npm run bundleLegacy somefancyproject`

## Consume the components in non-react apps

- the .css and .js file created by the bundle command to your legacy app build pipeline or simply insert it inside your HTML
- after the code is loaded mount your components, via `_preactComponents.render<YOURCOMPONENTNAME>(props, container, callback)` e.g.
  ```
  _preactComponents.renderSomeFancyComponent(
    {"foo": "bar"},
    document.getElementById("foo"),
    function(){ console.log("Rendered foo!");
  });
  ```
- the variable name can be changed by editing `library` inside `config.output` in the file `./scripts/bundle.js`
- it is possible to set another namespace instead of `_preactComponents` by running `npm run bundleLegacy somefancyproject anotherNamespace`. It might be interesting if you include more than one of these bundles in your project (otherwise the last one would overwrite the others).

## build styleguide for deployment

- run `npm run build`

## How to configure the styleguide

See: https://react-styleguidist.js.org/

## List of all available commands

| Command                    | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `npm run start`            | Starts the development server                                        |
| `npm run build-styleguide` | Builds the documentation and puts it inside `/styleguide`            |
| `npm run test`             | Runs all tests (`npm run test-code` and `npm run test-visual` )      |
| `npm run test-code`        | Runs all component tests with Jest                                   |
| `npm run test-watch`       | Starts the component test watcher                                    |
| `npm run test-visual`      | Runs all visual tests with react-styleguidist-visual                 |
| `npm run approve`          | Approves all visual changes for react-styleguidist-visuals test      |
| `npm run create`           | Creates a new component with predefined skeleton files               |
| `npm run transpile`        | Transpiles the JavaScript to `/dist` for consuming in other projects |
| `npm run scss`             | Copies the Sass to `/dist` for consuming in other projects           |
| `npm run build`            | Builds all components for consuming in other projects to `/dist`     |
| `npm run bundleLegacy`     | Build the bundles for consuming in other projects                    |
