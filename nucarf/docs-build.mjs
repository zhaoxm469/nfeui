#!/usr/bin/env zx

const { fs, path, chalk } = require('zx');
// const { generatorDocNav } = require("./generate-cnavconfig")
const vitepressPath = path.join(__dirname, '../docs/.vitepress/');
const vitepressConfigPath = path.join(vitepressPath, 'config.js');
const tempVitepressConfigPath = path.join(
    __dirname,
    '../docs/.temp/.vitepress/config.js'
);

await $`rimraf docs/dist`;
// generatorDocNav();
const rawVitepressData = fs.readFileSync(vitepressConfigPath, 'utf-8');
const tempVitepressData = fs.readFileSync(tempVitepressConfigPath, 'utf-8');
fs.writeFileSync(vitepressConfigPath, tempVitepressData);
await $`cross-env NODE_ENV=production vitepress-fc build --root=docs`;
fs.writeFileSync(vitepressConfigPath, rawVitepressData);
await $`clear`;

console.log(`\n`);
console.log(
    `打包完成 请输入 ${chalk.blue('npm run docs-serve')} 命令可进行打包文件预览`
);
console.log(`\n`);
process.exit();
