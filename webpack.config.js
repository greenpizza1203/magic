const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path")

module.exports = {
    devtool: false,
    entry: {content: "./src/content/content.ts", background: "./src/background.ts"},
    output: {
        path: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: "./assets"},
            ]
        })
    ]
}
