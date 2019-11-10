var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = function (env) {
  env = env || {};

  var config = {
    entry: './src/main.js',
    output: {
      library: 'sculptgl',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'app'),
      filename: 'main.js'
    },
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'lib'),
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: [{
        test: /\.glsl$/,
        loader: 'raw-loader'
      }]
    },
    plugins: [],
    devServer: {
        contentBase: path.join(__dirname, 'app'),
        compress: true,
        port: 9000
      }
  };
  
  config.mode = (env.release || env.website) ? 'production' : 'development';


  config.plugins.push(new CopyWebpackPlugin([
    { from: './src/index.html', to: './index.html' },
    { from: './src/yagui.css', to: './yagui.css' },
    { from: './src/resources', to: './resources' }
  ]));

  if (env.release) {
    config.module.rules.push({
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    });
  }

  return config;
};
