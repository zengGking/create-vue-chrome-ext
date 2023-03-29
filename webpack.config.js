const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');

module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    entry: {
        popup: "./src/popupView/popup.js",
        options: './src/optionsView/options.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        assetModuleFilename: 'asset/[hash:8][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|public)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
                        cacheDirectory: true,
                        cacheCompression: false,
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            }
                        }
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            }
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'img/[hash:8][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: 'asset/resource',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/vue-loader")
                }
            }


        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'html/popup.html',
            template: path.resolve(__dirname, 'public/popup.html'),
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/options.html',
            template: path.resolve(__dirname, 'public/options.html'),
            chunks: ['options']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
        process.env.NODE_ENV == 'production' && new CssMinimizerPlugin(),//css压缩
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                    toType: "dir",
                    globOptions: {
                        ignore: ["**/popup.html", "**/options.html"]
                    },
                    info: {
                        minimized: true
                    }
                },
                {
                    from: path.resolve(__dirname, "src/scripts"),
                    to: 'js',
                    toType: "dir",
                    info: {
                        minimized: true
                    }
                },
                {
                    from: path.resolve(__dirname, "src/manifest.json"),
                    to: "manifest.json",
                    transform(content, path)  {
                        const manifest = JSON.parse(content.toString());
                        manifest.version = package.version;
                        manifest.name = package.name;
                        manifest.description = package.description;
                        return JSON.stringify(manifest,null, 2);
                    }

                },

            ],
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: 'true',
            __VUE_PROD_DEVTOOLS__: "false"
        })
    ].filter(Boolean),
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devtool: process.env.NODE_ENV == 'production' ? 'source-map' : 'inline-cheap-source-map',
}