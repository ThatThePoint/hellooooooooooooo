'use strict'
// npm run buildTest 打包测试环境
const target = process.env.npm_lifecycle_event;
// 测试
const test = {
        NODE_ENV: '"test"',
        BASE_API: '"http://localhost:8110"'
    }
    // 线上
const production = {
    NODE_ENV: '"production"',
    BASE_API: '"http://localhost:8110"'
};

module.exports = target == 'build' ? production : test;
