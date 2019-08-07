/* global process, __dirname */

const webpackConfig = require('./webpack.config');

webpackConfig.output.publicPath = '/';

module.exports = webpackConfig;
