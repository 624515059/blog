const path = require('path')
const express = require('express')
const config = require('config-lite')(__dirname) //config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件 默认 config default
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./router')//导入文件夹 默认寻找index文件执行
const connectHistoryApiFallback = require('connect-history-api-fallback');// 由js控制路由，要写在express.static前面

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(connectHistoryApiFallback(
    {
        rewrites: [
            {
                from: /^\/api\/.*$/,
                to: function (context) {
                    return context.parsedUrl.path
                }
            }
        ]
    }
)); 
app.use(express.static(path.join(__dirname, 'dist')));
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use('/api', router);

// 监听端口，启动程序
app.listen(config.port, () => {
    console.log(`程序启动监听端口： ${config.port}`);
})