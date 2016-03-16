module.exports = {
    context: __dirname + "/app",
    entry: ["babel-polyfill","./app"],
    output: {
        filename: "app.js",
        path: __dirname + "/dist",
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                //loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                loader: "style-loader!css-loader!less-loader"
            }
        ],
    }
}
