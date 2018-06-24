const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./build/webpack.dev.config');
const config = require('./config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    progress: true,
    stats: {
        colors: true
    },
    hot: true,
    quiet: false,
    lazy: false
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, '/')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'src', 'static/index.html'));
});

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${config.port}`);
});