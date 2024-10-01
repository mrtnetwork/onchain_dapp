// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // Your main JavaScript file
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js', // Output bundled file
    },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            url: require.resolve('url/'),
            util: require.resolve('util/'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            zlib: require.resolve('browserify-zlib'),
            assert: require.resolve('assert/'),
            // Add other Node.js core modules here as needed
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 8080,
        open: true,
    },
};
