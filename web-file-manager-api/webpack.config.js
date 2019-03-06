const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    node: {
        __dirname: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new Dotenv()
    ]
};