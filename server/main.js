const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../build/webpack.dev.config');
const project = require('../config/project.conf');

const app = express();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    progress: true, 
    hot: true,
    quiet: false,
    lazy: false
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(project.PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost: ${project.PORT} `);
});