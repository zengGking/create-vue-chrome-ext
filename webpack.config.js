const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        popup: "./src/popupView/popup.js",
        options: './src/optionsView/options.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        assetModuleFilename: 'media/[hash:8][ext][query]',
        clean:true
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
                        cacheCompression:false,
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
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
                // generator:{
                //     filename:'media/[hash:8][ext][query]'
                // }
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
        new CssMinimizerPlugin(),//cssy压缩
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                    to: path.resolve(__dirname, 'dist'),
                    toType: "dir",
                    globOptions: {
                        ignore: ["**/popup.html", "**/options.html"]
                    },
                    info: {
                        minimized: true
                    }
                },
                {
                    from: path.resolve(__dirname, "manifest.json"),
                    to: path.resolve(__dirname, 'dist')
                },

            ],
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            _VUE_OPTIONS_API_: 'true',
            _VUE_PROD_DEVTOOLS_: "fasle"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: (entrypoint) => 'runtime~' + entrypoint.name
        }
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devtool:'source-map',//发布时建议关闭
}