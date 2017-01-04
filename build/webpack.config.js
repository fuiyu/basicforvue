// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require("webpack")

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: path.resolve(__dirname, '../src/index.js'),
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
             {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            }, 
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8124&name=[path][name].[ext]?[hash]'
            }
        ]
    },
    babel: {
        presets: ['es2015']//编译其他文件中（etc:vue）es6
    },
    // Favlist: {
    //     loaders: {
    //         js: 'babel'
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../public/index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true
        }),
        // Webpack 1.0 
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling 
        // new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}