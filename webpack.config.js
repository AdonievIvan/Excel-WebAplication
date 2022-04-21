const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd


const filename = (ext) => isDev ? `bundle.${ext}`: `bundle.[hash].${ext}`





module.exports = {
    context: path.resolve(__dirname, 'src'),
    cache: !isDev,
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output:{
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devtool: isDev ? 'eval-source-map': 'source-map',
    devServer:{
      port: 3000,
      hot: isDev,
    },
    resolve: {
        extensions: ['.js'],
        alias:{
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'favicon.ico',
            minify:{
              removeComments: isProd,
            }
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist')},
            ],
          }),
          new MiniCssExtractPlugin({
              filename: filename('css')
          })

    ],
    module:{
        rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                ],
            },
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
        ],    
    },
    
}