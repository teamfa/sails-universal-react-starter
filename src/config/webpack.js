import extend from 'extend';
import { resolve, join } from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import LinkerPlugin from 'linker-webpack-plugin';

const DEBUG = process.argv && !process.argv.includes('--release');
const VERBOSE = process.argv && process.argv.includes('--verbose');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  __DEBUG__: DEBUG,
  __SERVER__: false,
  __CLIENT__: true
};

const defaultConfig = {
  output: {
    publicPath: '/',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json', '.scss', '.css'],
    root: [
      resolve(__dirname, './../../src/app/'),
      resolve(__dirname, './../../src/assets'),
    ],
    alias: {
      withStyles: 'isomorphic-style-loader/lib/withStyles',
      react: 'react',
      'isomorphic-style-loader': 'isomorphic-style-loader'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|sails-hook-react-router|sails-hook-react)/,
        loaders: ['react-hot'],
        include: resolve(__dirname, './../../src/app')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|sails-hook-react-router|sails-hook-react)/,
        loader: 'babel',
        query: {
          plugins: []
        }
      },
      {
        test: /\.s?css$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !DEBUG
          })}`,
          'postcss-loader?parser=postcss-scss',
          'sass-loader?sourceMap'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.txt$/,
        loader: 'raw-loader'
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
      }, {
        test: /\.jade$/,
        loader: 'jade-loader'
      }
    ]
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ];
  }
};

const defaultConfig2 = defaultConfig;

let developmentClient = extend(true, {}, defaultConfig, {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    resolve(__dirname, './../../src/app/index')
  ],

  output: {
    path: resolve(__dirname, './../.tmp/public/js'),
    filename: 'bundle-[hash].js',
    publicPath: 'http://localhost:3000/'
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'eval' : false,

  target: 'web',

  node: {
    // console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  browser: {
    net: false,
    tls: false,
    'sails-hook-webpack': false,
    'sails-hook-react': false,
    'sails-hook-react-router': false
  },

  plugins: [
    ...defaultConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ ...GLOBALS, __CLIENT__: true, __SERVER__: false }),
    // assets list into sails config so we can access them in sails
    new AssetsPlugin({
      path: resolve(__dirname, './../../dist/config'),
      filename: 'assets.js',
      processOutput: x => `module.exports.assets = ${JSON.stringify(x)};`
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: VERBOSE
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),

    new LinkerPlugin({
      entry: './src/views/layout.ejs',
      hash: '[hash]',
      output: './dist/views/layout.ejs',
      data: {
        css: '',
        templates: '',
        scripts: '<script src="//localhost:3000/bundle-[hash].js"></script>'
      }
    })
  ]
});

const developmentServerBuild = extend(true, {}, defaultConfig2, {
  entry: resolve(__dirname, './../../src/app/routes'),

  output: {
    path: resolve(__dirname, './../../dist/.tmp/react-router'),
    filename: 'routes.js',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:3000/'
  },

  target: 'async-node',

  externals: [nodeExternals()],

  node: {
    net: false,
    tls: false,
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [
    ...defaultConfig2.plugins,
    new webpack.DefinePlugin({ ...GLOBALS, __CLIENT__: false, __SERVER__: true }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: VERBOSE
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true, entryOnly: false
    })
  ]
});

developmentServerBuild.module.loaders.shift();

export default {
  webpack: {
    config: developmentServerBuild,
    development: {
      webpack: developmentClient,
      config: {
        port: 3000
      }
    },
    watchOptions: {
      aggregateTimeout: 300
    }
  }
};
