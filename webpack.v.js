const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry:{
        react_vendor: ["react", "react-dom"], // 指定公共使用的第三方类库
    },
    // optimization: {
    //     splitChunks: {
    //       cacheGroups: {
    //         vendor: {
    //           chunks: "initial",
    //           test: "vendor",
    //           name: "react.min", // 使用 vendor 入口作为公共部分
    //           enforce: true,
    //         },
    //       },
    //     },
    // },
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].min.js"
    },
    module:{
        rules:[{
            test: require.resolve("react"),
            use: "expose-loader?React"
        },{
            test: require.resolve("react-dom"),
            use: "expose-loader?ReactDOM"
        }]
    }

}