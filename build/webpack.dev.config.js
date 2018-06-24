const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const project = require('../config/project.conf');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir);
}

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        resolve('src/main')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude:  project.libPath,
                use: [
                    {loader: 'eslint-loader'}
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                include: project.srcPath,
                exclude: project.libPath
            },
            {
                test: /\.css$/,
                include: project.srcPath,
                exclude: project.libPath,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]-[local]-[hash:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: project.libPath,
                exclude: project.srcPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    }
                ]

            },
            {
                test: /\.less$/,
                include: project.srcPath,
                exclude: project.libPath,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 3,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: project.srcPath,
                exclude: project.libPath,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 3,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    broswers: ['last 5 versions']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: project.srcPath,
                exclude: project.libPath
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[hash:5].[ext]',
                    limit: 10000
                },
                include: project.srcPath,
                exclude: project.libPath
            },
            {
                test: /\.(eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash:5].[ext]',
                    limit: 10000,
                },
                exclude: project.libPath
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                  limit: 10000
                },
                include: project.srcPath,
                exclude: project.libPath
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss', '.json'],
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:' + project.PORT
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            '__DEV__': JSON.stringify('true')
        }),
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            filename: 'index.html',
            title: 'React Router Redux Rxjs Generator'
        })
    ]
};


