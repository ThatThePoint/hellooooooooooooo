'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://39.100.67.92:5000/api"', // 测试
    // BASE_API: '"http://digitalcamp.oicp.io:56031/api"', // 测试
    // BASE_API: '"http://192.168.0.83:9019/api"', //张召本地
    BASE_API: '"http://39.100.67.92:5000/api"', //军辉本地/swagger-ui.html
    // BASE_API: '"http://47.93.122.31:10469/api"',
    // BASE_API: '"http://47.93.122.31:11469/api"',
    // BASE_API: '"http://47.93.122.31:10469/api"', //龙飞
    // BASE_API:'"http://47.93.122.31:10469/api"'//线上测试 
    //
});
