const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    performance: {
      hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Tack',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader'                
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}
