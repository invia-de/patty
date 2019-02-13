# Whitelabel Pattern Library

This is built upon create-react-app, react-styleguidist, Jest and react-testing-library.

## local development

- clone the repo
- run `npm install`
- run `npm start` to spin up the local dev-server

## create new components

- run `npm run create` (only on Linux/Mac)
- follow the instructions shown in the terminal
- stop! hammer time!

## writing tests

- this repo ships with Jest and react-testing-library
- when running `npm run create` you will always get a super basic snaphsot test
- add your own tests to the Component.test.js file
- run your tests via `npm test`

## build the bundles for consuming in other non react projects

- create .js file inside src/build-files/
- import all components you want your bundle to include
- export them as one object
- change the parameter given to the bundle command inside the package.json to match the filename from step 1
- run `npm run bundle`

## consume the components in non react apps

- the .css and .js file created by the bundle command to your legacy app build pipeline or simply insert it inside your HTML
- after the code is loaded mount your components via `_preactComponents.render<YOURCOMPONENTNAME>(props, container, callback)`
- the variable name can be changed inside `./scripts/bundle.js:51:15`

## build styleguide for deployment

- run `npm run build`

## how to configure the styleguide

See: https://react-styleguidist.js.org/
