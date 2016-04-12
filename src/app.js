require('babel-polyfill');

// src/app.js
// this assumes your build directory is /dist
import Module from 'module';
import Path from 'path';

const originalRequire = Module.prototype.require;
const originalResolve = Path.resolve;

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
    if (args[0].endsWith('/dist') && args[1] === 'node_modules') {
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
  }
  return originalRequire.apply(this, args);
};

(function lift() {
  require('sails').lift(Object.assign(require('rc')('sails'), {
    appPath: __dirname, // set the appPath to this dir - so when compiled it's projectDir/dist
  }));
}());





