const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;

const enableSourceMap = false;

module.exports = {

    entry: {
        script: './src/js/script.js',
        style: './src/scss/style.scss',
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/'
    },

    devtool: enableSourceMap && 'source-map',

    stats: {
        chunks: false,
        assets: true,
        modules: false,
        source: false,
        chunkModules: false,
    },

    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader", 
                            options: { 
                                sourceMap: enableSourceMap, 
                                minimize: true,
                            }
                        }, 

                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('autoprefixer'),
                                    ];
                                },

                                sourceMap: enableSourceMap,
                            }
                        },
                        
                        { 
                            loader: 'sass-loader', 
                            options: { 
                                sourceMap: enableSourceMap ,
                            } 
                        }
                    ]
                })
            },

            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: { 
                                sourceMap: enableSourceMap, 
                                minimize: true,
                            }
                        }
                    ]

                })
            },

            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: './public',
                            // Do not emit files 
                            useRelativePath: true,
                            emitFile: false
                        }
                    }
                ]
            },
            
        ]
    },

    plugins: [
        new UglifyJsPlugin(),
        
        new ExtractTextPlugin({
            filename:"css/[name].css",
        }),

        new SuppressChunksPlugin([
            {
                name: 'style',
                match: /\.(js|js\.map)$/ 
            },
        ]),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        
        new WebpackBuildNotifierPlugin({
            title: "Build"
        })
    ]
}
