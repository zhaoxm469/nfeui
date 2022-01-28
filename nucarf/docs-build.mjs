#!/usr/bin/env zx
const { chalk } = require('zx');
await $`cross-env NODE_ENV=production vitepress-fc build --root=docs`;
await $`clear`;
console.log(`\n`);
console.log(
    `打包完成 请输入 ${chalk.blue('npm run docs-serve')} 命令可进行打包文件预览`
);
console.log(`\n`);
