const path = require('path');


module.exports.react = {

  // the resolved path to your react-router routes file
  // it's best not to clutter this file with anything except your routes
  // and their subsequent components

  // a path is used so it can be watched in development for hot reloads
  // note that this needs to be the compiled babel version unless you have
  // the babel require hook in your app
  routes: path.resolve(__dirname, './../.tmp/react-router/routes'),

  // hot reload routes, sails controllers, services etc after every webpack
  // build - this only applies to development.
  reloadOnWebpackBuild: true,

  isomorphicStyleLoader: true,

};
