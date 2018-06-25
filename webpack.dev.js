const webpack = require('webpack');
const path = require('path');
//模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//HappyPack可以开启多个子进程去并发执行
const HappyPack = require('happypack');
//html配置
const getHtmlConfig = (name, title) => { 
    return { 
        title:title,
        inject : true, 
        filename: name + '.html', // 配置输出文件名和路径
        template: 'src/tpl.html', // 配置文件模板
        chunks: ["common",name],//文件名
        hash:false,//哈希
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
    mode: 'development', 
    entry:{
        index:'./src/index.jsx'
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js",
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test: /(\.css|\.scss)$/,
                use:[
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                //exclude: /node_modules/, antd里面有些样式需要冲这里拿
            },
            
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8000
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

        //这个开发环境默认会设置 用于启动 HMR 时可以显示模块的相对路径
        //new webpack.NamedModulesPlugin(), 
        //server 热更新 配置
        new webpack.HotModuleReplacementPlugin(), 

        new HtmlWebpackPlugin(getHtmlConfig('index','this is a blog')),

    ],
    resolve:{
        extensions: ['.js', '.jsx', '.css','.scss', '.json'],
        modules:[path.join(__dirname, 'src'), 'node_modules']
    },
    devServer:{
        contentBase: path.join(__dirname, "virtual"),
        hot: true,
        https: false,
        port: 9000,
        historyApiFallback: true,
        compress: true,//gzip
        proxy: {
          "/api": "http://localhost:9000"
        },
         // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },
    devtool:"inline-source-map",
    externals:{
        //包名称（key）:暴露的全局变量(value)
        "react":"React",
        "react-dom":"ReactDOM"
    }
}