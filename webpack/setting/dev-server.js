const path = require('path');

const {cwd, pathToDist, serverPort, isBuildServer} = require('./../config');

module.exports.devServer = {
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.join(cwd, pathToDist),
    historyApiFallback: {
        disableDotRule: true,
    },
    writeToDisk: isBuildServer,
    // inline: false,
    // hot: true,
    // hotOnly: false,
    disableHostCheck: true,
    proxy: {
        '/api/': {
            target: 'http://localhost:' + serverPort + '/',
            changeOrigin: true, // for this option only: see documentations here https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware-options
        },
    },
};
