'use strict'
// npm run buildTest 打包测试环境
const target = process.env.npm_lifecycle_event;
// 测试
const test = {
        NODE_ENV: '"test"',
        BASE_API: '"http://127.0.0.1:9020/api"'
    }
    // 线上
const production = {
    NODE_ENV: '"production"',
    BASE_API: '"http://47.93.122.31:9020/api"'
};

module.exports = target == 'build' ? production : test;
