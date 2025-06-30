// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // Your main JavaScript file
    output: {
        path: path.resolve(__dirname, 'docs'),
        // publicPath: '/mrt_wallet_web3_js_examples/', 
        filename: 'bundle.js', // Output bundled file
    },
    optimization: {
        minimize: false, // ⛔ disables minification
      },
    experiments: {
        asyncWebAssembly: true, // Enable support for .wasm files
    },
    module: {
        rules: [
            {
                test: /\.css$/i, // Match CSS files
                use: ["style-loader", "css-loader"], // Loaders to process CSS
            },
        ],
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
            "crypto": false
            // Add other Node.js core modules here as needed
        },
        extensions: [".js", ".jsx", ".css",".wasm"], // Ensure Webpack recognizes CSS files

    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
    mode: 'development',
    devtool: 'source-map',
    // devServer: {
    //     static: path.resolve(__dirname, 'docs'),
    //     port: 8080,
    //     open: true,
    // },
};
