const path = require('path')
const express = require('express')
const config = require('config-lite')(__dirname) //config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件 默认 config default
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')//session
const router = require('./router')//导入文件夹 默认寻找index文件执行
const connectHistoryApiFallback = require('connect-history-api-fallback');// 由js控制路由，要写在express.static前面

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    }
}))

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