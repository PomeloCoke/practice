"use strict";
const development = {
    envName: '开发环境',
    env: 'development',
    envAlia: 'dev',
};
const devtest = {
    envName: '开发测试环境',
    env: 'devtest',
    envAlia: 'devtest',
};
const test = {
    envName: '测试环境',
    env: 'test',
    envAlia: 'test',
};
const sandbox = {
    envName: '沙箱环境',
    env: 'sandbox',
    envAlia: 'sand',
};
const production = {
    envName: '生产环境',
    env: 'production',
    envAlia: 'prod',
};
const env = process.env.NODE_ENV;
let envConfig = {};
switch (env) {
    case 'development':
        envConfig = development;
        break;
    case 'devtest':
        envConfig = devtest;
        break;
    case 'test':
        envConfig = test;
        break;
    case 'sandbox':
        envConfig = sandbox;
        break;
    case 'production':
        envConfig = production;
        break;
    default:
        envConfig = development;
        break;
}
module.exports = envConfig;
