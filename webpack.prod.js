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

/*
loader
https://webpack.docschina.org/loaders
模式
https://webpack.js.org/concepts/mode/
*/
module.exports = {
    mode: 'production', 
    entry:{
        index:'./src/index.jsx'
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                // include: [
                //     path.resolve(__dirname, 'src'),
                // ],
                //exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ 
                  fallback: 'style-loader',
                  use: 'css-loader',
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                }),
                //exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 5000
                    }
                  }
                ]
            },
            {
              test:/\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: 'happypack/loader?id=babel',
            }
        ]
    },
    plugins: [

        new HappyPack({
            id: 'babel', //id值，与loader配置项对应
            threads: 6, //配置多少个子进程
            loaders: ['babel-loader'], //用什么loader处理
            debug:false
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index', 'this is a blog')),

    ],
    resolve:{
        extensions: ['.js', '.jsx', '.css','.scss', '.json'],
        modules:[path.join(__dirname, 'src'), 'node_modules']
    },
    externals:{
        "react":"React",//包名称（key）:暴露的全局变量(value)
        "react-dom":"ReactDOM",
    },

}