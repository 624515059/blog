功能及路由设计如下：

主页
    主页：GET /home

列表页
    get  /list
详情页
    get /detail/:id

登录
    登录页：get /login
    登录：post /login
    登出：get /signout

后台
    get /admin

**********************************************
查看一篇文章（包含留言）：GET /posts/:postId
发表文章
发表文章页：GET /posts/create
发表文章：POST /posts/create
修改文章
修改文章页：GET /posts/:postId/edit
修改文章：POST /posts/:postId/edit
删除文章：GET /posts/:postId/remove
留言
创建留言：POST /comments
删除留言：GET /comments/:commentId/remove

mongod 开启数据库
supervisor index.js
npm run dev
http://www.cmd5.com/

ssh root@39.106.11.71
CentOs 重启ssh
# service sshd restart
netstat -ntpl
scp /code/qq/package.json root@39.106.11.71:/opt/qq

http://demo.musiclhn.top

pm2 deploy ecosystem.json aliyun