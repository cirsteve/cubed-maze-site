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
            }
        ],
    }
}
