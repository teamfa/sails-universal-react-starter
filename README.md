# sails-universal-react-starter

A full ES2015 universal sails + react starter project with server and client side rendering with styles.

### Features:
- HMR for react + styles.
- Webpack - no grunt or gulp.
- Sails and react can be both written in ES2015 syntax. Sails compiles to `/dist`.
- Automatic `react-router` routes server side.
- Automatic hot reload of sails routes, controllers and services on change.


Currently only has a webpack dev setup. No production.

#### Development
`npm run build-watch` - will watch for sails src changes and build to /dist.
`npm run start` - start the sails app - runs sails from dist/app.js so you will need the above running.


And that's it, everything else will hot reload as required.

This is still a WIP but everything above works.

Other modules:
- [`linker-webpack-plugin`](https://github.com/teamfa/linker-webpack-plugin)
- [`sails-hook-react-router`](https://github.com/teamfa/sails-hook-react-router)
- [`sails-hook-webpack`](https://github.com/teamfa/sails-hook-webpack)


