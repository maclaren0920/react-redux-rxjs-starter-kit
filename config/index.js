const path = require('path');
module.exports = {
    port: 8000,
    srcPath: path.resolve(__dirname, '..', 'src'),
    buildPath: path.resolve(__dirname, '..', 'dist'),
    libPath: path.resolve(__dirname, '..', 'node_modules'),
    publicPath: './'
};