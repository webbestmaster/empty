/* global process, __dirname */

/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */

const path = require('path');

const modeDevelopment = 'development';
const modeProduction = 'production';

const nodeEnvironment = process.env.NODE_ENV || modeDevelopment;

// module.exports.NODE_ENV = process.env.NODE_ENV || DEVELOPMENT;
module.exports.isBuildServer = process.env.IS_BUILD_SERVER === 'YES';

module.exports.isDevelopment = nodeEnvironment === modeDevelopment;
module.exports.isProduction = nodeEnvironment === modeProduction;

module.exports.cwd = path.join(__dirname, '/../');

module.exports.fileRegExp = /\.(png|jpg|jpeg|gif|svg|otf|ttf|woff2?)$/;

module.exports.pathToDist = '/dist';

module.exports.pathToStaticFileFolder = '/static/';

module.exports.serverPort = 8282;
