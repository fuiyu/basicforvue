// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack")

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    // entry: path.resolve(__dirname, '../src/index.js'),
    entry: {
        // path.resolve([from ...], to) 将to参数解析为绝对路径
        index: path.resolve(__dirname, '../src/index.js'),
        // 需要被提取为公共模块的群组
        vendors: ['vue', 'vue-router','vue-resource'],
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../public'),
        // 相对路径
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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8124&name=[path][name].[ext]?[hash]'
            },
            // {
            //     test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            //     loader: 'file-loader',
            //     query: {
            //         limit: 10000,
            //         // 路径和生产环境下的不同，要与修改后的publickPath相结合
            //         name: 'fonts/[name].[ext]?[hash:7]',
            //         prefix: 'font'
            //     }
            // },
        ]
    },
    babel: {
        presets: ['es2015'] //编译其他文件中（etc:vue）es6
    },
    // Favlist: {
    //     loaders: {
    //         js: 'babel'
    //     }
    // },\
    // vue行内样式分离
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css")
        }
    },

    plugins: [
        // 自动生成html插件，如果创建多个HtmlWebpackPlugin的实例，就会生成多个页面
        new HtmlWebpackPlugin({
            // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
            filename: '../public/index.html',
            // 源文件，路径相对于本文件所在的位置
            template: path.resolve(__dirname, '../src/index.html'),
            // 需要引入entry里面的哪几个入口，如果entry里有公共模块，记住一定要引入
            chunks: ['vendors', 'index'],
            // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
            inject: 'body',
            // 生成html文件的标题
            title: ''
            // hash如果为true，将添加hash到所有包含的脚本和css文件，对于解除cache很有用
            // minify用于压缩html文件，其中的removeComments:true用于移除html中的注释，collapseWhitespace:true用于删除空白符与换行符
        }),
        // 提取css单文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合   
        new ExtractTextPlugin("[name].[contenthash].css"),
        // 提取入口文件里面的公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js',
            chunks:['vue', 'vue-router','vue-resource']
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling 
        // new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}