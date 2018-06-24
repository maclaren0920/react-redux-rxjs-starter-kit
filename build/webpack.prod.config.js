const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('../package.json');
const config = require('../config');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir);
}

module.exports = {
    entry: {
        main: resolve('src/main.jsx'),
        vendor: Object.keys(pkg.dependencies)
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
                    fallback: 'style-loader',
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
                    fallback: 'style-loader',
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
                    fallback: 'style-loader',
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]',
                            limit: 10000,
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                            progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],      
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
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                  limit: 10000,
                },
                include: config.srcPath,
                exclude: config.libPath
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.json'],
        alias: {
            '@': config.srcPath
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.NamedChunksPlugin(),
        new ParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/static/template.html'),
            title: 'React Router Redux Rxjs Generator',
            chunks: ['main', 'vendor', 'manifest'],
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
            names: ['vendor', 'manifest'],
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
