const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const SuppressChunksPlugin = require('suppress-chunks-webpack-plugin').default;
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');

const host = 
    '10.0.0.3'
    // 'localhost'
    // '172.4.2.46'
;

module.exports = {

    entry: {
        script: ['./src/js/script.js', './src/scss/style.scss'],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/'
    },

    
    devtool: 'inline-source-map',
    // devtool: 'source-map',
    devServer: {
        contentBase: "./public",
        watchContentBase: true,
        publicPath: '/assets/',
        hot: true,
        host: host,
        stats: {
            chunks: false,
            assets: true,
            modules: false,
            source: false,
            chunkModules: false,
        }
    },

    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: { sourceMap: true, }
                    },

                    {
                        loader: "css-loader",
                        options: { sourceMap: true, }
                    },

                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            },

                            sourceMap: true
                        }
                    },

                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },

            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: { sourceMap: true, }
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: true, }
                    }
                ]
            },

            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '../',
                            // Do not emit files 
                            emitFile: false
                        }
                    }
                ]
            },

            {
                // Expose the jQuery object to the global scope
                test: require.resolve('jquery'),
                use: [
                    { loader: 'expose-loader', options: 'jQuery' }, 
                    { loader: 'expose-loader', options: '$' }
                ]
            }
        ]
    },

    plugins: [

        new ExtractTextPlugin({
            filename: "css/[name].css",
        }),

        // new SuppressChunksPlugin([
        //     {
        //         name: 'style',
        //         match: /\.(js|js\.map)$/
        //     },
        // ]),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        
        new webpack.HotModuleReplacementPlugin(),
        
        new WebpackBuildNotifierPlugin({
            title: "Build"
        })
    ],

    
}
