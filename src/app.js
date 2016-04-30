require('babel-polyfill');

// src/app.js
// this assumes your build directory is /dist
import Module from 'module';
import Path from 'path';
import slash from 'slash';

const originalRequire = Module.prototype.require;
const originalResolve = Path.resolve;

// TODO
// not sure how to fix this otherwise,
// without these webpack dupes them, even with the de-dupe plugin
// only an issue when using npm link on sails-hook-react-router as devDependencies exist
const requireOverrides = [
  'react',
  'react-dom/server',
  'isomorphic-style-loader',
  'react-router',
  'history/lib/createLocation',
  'history/lib/createMemoryHistory',
  'sails/lib/hooks/views/res.view',
];

global.__SERVER__ = true;
global.__CLIENT__ = false;
global.__DEBUG__ = true;

/* eslint no-console:0 */
if (!console.debug) {
  // electron - for 'devtool'
  console.debug = () => {};
}

// override resolve to intercept invalid sails node_module paths
Path.resolve = function resolve(...args) {
  if (args.length >= 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    if (slash(args[0]).endsWith('/dist') && args[1] === 'node_modules') {
      args[1] = './../node_modules'; // force resolve to go up one dir
    }
  }
  return originalResolve.apply(this, args);
};

// override require to intercept invalid sails node_module require paths
Module.prototype.require = function require(...args) {
  if (args.length && typeof args[0] === 'string') {
    if (args[0].includes('/dist/node_modules/')) {
      args[0] = args[0].replace('/dist/node_modules/', '/node_modules/');
    }
    if (requireOverrides.includes(args[0])) {
      args[0] = originalResolve(__dirname, `./../node_modules/${args[0]}`);
    }
  }

  return originalRequire.apply(this, args);
};

(function lift() {
  require('sails').lift(Object.assign(require('rc')('sails'), {
    appPath: __dirname, // set the appPath to this dir - so when compiled it's projectDir/dist
  }));
}());





