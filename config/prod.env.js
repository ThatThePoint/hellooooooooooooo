'use strict'
// npm run buildTest 打包测试环境
const target = process.env.npm_lifecycle_event;
// 测试
const test = {
        NODE_ENV: '"test"',
        BASE_API: '"http://localhost:8818"'
    }
    // 线上
const production = {
    NODE_ENV: '"production"',
    // BASE_API: '"http://172.26.82.59:5000/api"'
    BASE_API: '"http://39.100.67.92:5000/api"'
    // BASE_API: '"http://localhost:5000/api"'
    // BASE_API: '"http://digitalcamp.oicp.io:56031/api"'
};

module.exports = target == 'build' ? production : test;
