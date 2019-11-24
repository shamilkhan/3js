const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const paths = {
    lib: "./lib",
    dist: path.resolve(__dirname, "./dist")
}

module.exports = {
    entry: `${paths.lib}/index.js`,
    output: {
        path: paths.dist,
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)s/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        overlay: true,
        hot: true,
        contentBase: paths.dist,
        port: 8888
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: './index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            { from: `${paths.lib}/img`, to: `${paths.dist}/img` }
        ])
    ]
}