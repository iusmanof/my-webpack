const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
    allowedNodeEnvironmentFlags
} = require('process')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], // Post => Post.js   
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
        port: 9000,
        open: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },

            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),

    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public/path/to/',
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpeg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
        ]
    }
}