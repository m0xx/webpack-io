var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        editor: [
            './src/editor',
            'webpack/hot/only-dev-server',
        ]
    },
    output: {
        path: path.join(__dirname, '.build/js/'),
        publicPath: "js/",
        filename: "[name].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    devtool: "eval",
    debug: true,
    watch: true,
    cache: true,
    keepalive: true,
    module: {
        loaders: [
            {
                test: require.resolve('tinymce/tinymce'),
                loaders: [
                    'imports?this=>window',
                    'exports?window.tinymce'
                ]
            },
            {
                test: /tinymce\/(themes|plugins)\//,
                loaders: [
                    'imports?this=>window'
                ]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.md$/,
                loader: "html!markdown"
            },
            {
                test: /\.html$/,
                loader: "html"
            }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        root: [
            path.join(__dirname, "node_modules"),
            path.join(__dirname, "src")
        ]
    }
};