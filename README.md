# sails-universal-react-starter

A full ES2015 universal/isomorphic [SailsJS](http://sailsjs.org) + [ReactJS](https://facebook.github.io/react) starter project with server and client side rendering, routing and styles.
Powered with [Webpack](https://webpack.github.io/) ([`sails-hook-webpack`](https://github.com/teamfa/sails-hook-webpack)),  [React Router](https://github.com/reactjs/react-router) ([`sails-hook-react-router`](https://github.com/teamfa/sails-hook-react-router)),
and [Babel](https://babeljs.io), the project features Hot Module Reloading (HMR), automatic `react-router` routes on the server and hot reloading of SailsJS routes, controllers and services.

**Note:** this is still a work in progress, but the general concept works.

### Quick Start

- Git clone/fork or download the project.
- `npm install`.
- `npm run build-watch` (watch the `/src` directory for changes and build to `/dist`).
- `npm start` (start the SailsJS app from `/dist`).
- Open [http://localhost:1337](http://localhost:1337) and enjoy!

> Currently only has a webpack dev setup. No production.

### Related Modules/Projects
- [`linker-webpack-plugin`](https://github.com/teamfa/linker-webpack-plugin)
- [`sails-hook-react-router`](https://github.com/teamfa/sails-hook-react-router)
- [`sails-hook-webpack`](https://github.com/teamfa/sails-hook-webpack)
