const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const package = require('./package.json');
const config = require('./config');

let getDependencies = () => {
    let deps = Object.keys(package.dependencies);
    if(deps.indexOf('babel-runtime') != -1) {
        deps.splice(deps.indexOf('babel-runtime'), 1);
    }
    return deps;
}

module.exports = {
    entry: {
        main: './src/index',
        vendor: getDependencies()
    },
    output: {
        path: config.buildPath,
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
        publicPath: config.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path][name]-[local]-[hash:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                include: config.libPath,
                exclude: config.srcPath,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: config.srcPath,
                exclude: config.libPath,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 3,
                                localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        broswers: ['last 5 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash:5].[ext]'
                },
                include: config.srcPath,
                exclude: config.libPath
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:5].[ext]',
                    limit: 10000,
                },
                exclude: config.libPath
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.json'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: false,
            comments: false
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/static/template.html',
            title: 'React Router Redux Rxjs Generator',
            chunks: ['main', 'vendor'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].[chunkhash:8].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
