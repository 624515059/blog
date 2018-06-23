const webpack = require('webpack');
const path = require('path');
//模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//提取css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//HappyPack可以开启多个子进程去并发执行
const HappyPack = require('happypack');
//html配置
const getHtmlConfig = (name, title) => { 
    return { 
        title:title,
        inject : true, 
        filename: 'view/' + name + '.html', // 配置输出文件名和路径
        template: 'src/tpl.html', // 配置文件模板
        chunks: ["common",name],//文件名
        hash:true,//哈希
        cache: true,//缓存
    }
};

//常用loader简介
//https://webpack.docschina.org/loaders

module.exports = {
    //不同的模式，内置插件会自动帮忙处理一些事情  https://webpack.js.org/concepts/mode/
    mode: 'development', 
    entry:{
        index:'./src/index.js',
        my:'./src/my.js'
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                // use:[
                //     'style-loader','css-loader'
                // ],
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ 
                  fallback: 'style-loader',
                  use: 'css-loader',
                })
            },
            {
                test: /\.scss$/,
                // use:[
                //      'style-loader','css-loader','sass-loader'
                // ]
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 2000
                    }
                  }
                ]
            },
            {
              test:/\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              //use: 'babel-loader',
              use: 'happypack/loader?id=babel',
            }

        ]
    },
    plugins: [
        //如果你的项目是用ES2015的模块语法，并且webpack3+，那么建议启用这一插件，把所有的模块放到一个函数里，减少了函数声明，文件体积变小，函数作用域变少。
        //new webpack.optimize.ModuleConcatenationPlugin(),

        new HappyPack({
            id: 'babel', //id值，与loader配置项对应
            threads: 6, //配置多少个子进程
            loaders: ['babel-loader'], //用什么loader处理
            debug:false
        }),

        new ExtractTextPlugin('[name].css'),

        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('my','个人中心')),

        //这个开发环境默认会设置
        //new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        //server 热更新 配置
        new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件

    ],
    resolve:{
        extensions: ['.js', '.jsx', '.css','.scss', '.json'],
        modules:[path.join(__dirname, 'src'), 'node_modules']
    },
    devServer:{
        contentBase: path.join(__dirname, "dev"),
        hot: true,
        https: false,
        port: 9000,
        compress: true,//gzip
        proxy: {
          "/api": "http://localhost:9000"
        }
    },
    devtool:"inline-source-map",
    // externals:{
    //     "react":"window.React",//包名称（key）:暴露的全局变量(value)
    //     "react-dom":"window.ReactDOM",
    //     "jquery": 'window.jQuery'
    // },

}