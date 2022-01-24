/*
 * @Author: zhaoxingming
 * @Date: 2022-01-22 17:45:21
 * @LastEditTime: 2022-01-24 07:12:45
 * @LastEditors: vscode
 * @Description: 监听路由文件发生变化，copy到在线文档目录
 * 
 */
const fs = require('fs');
const { resolve }= require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const generate = require('babel-generator').default
const t = require('babel-types');
const { existsSync, ensureFileSync ,writeFileSync} = require('fs-extra');

const navConfigPath = resolve(__dirname,'../packages/nav.config.json')
const vitepressConfigPath = resolve(__dirname, '../docs/.vitepress/config.js')
const vitepressTempConfigPath = resolve(__dirname, '../docs/.temp/.vitepress/config.js')

const isWatch = process.argv.slice(2)[0] === '--watch';

// 生成文档路由
const generatorDocNav = ()=>{
    try {
        var navConfigData = JSON.parse(fs.readFileSync(navConfigPath, 'utf-8'))
    } catch (err) {
        console.log('出错了');
        console.log(err);
        return;
    }
    const vitepressConfigCode = fs.readFileSync(vitepressConfigPath, 'utf-8');

    const ast = babylon.parse(vitepressConfigCode);

    traverse(ast, {
        Identifier (path) {
            if (path.node.name === 'sidebar') {
                const elements = path.parent.value.elements;

                navConfigData.navs.forEach(item => {

                    item.children = item.children.filter(item => item.show);
                    if (!item.children.length) return;

                    let child = [];
                    let arr = [
                        t.objectProperty(t.identifier('text'), t.stringLiteral(item.text)),
                        t.objectProperty(t.identifier('children'), t.arrayExpression(child)),
                    ]
                    item.children.forEach(it => {
                        child.push(t.objectExpression([
                            t.objectProperty(t.identifier('text'), t.stringLiteral(it.text + ' ' + it.cName)),
                            t.objectProperty(t.identifier('link'), t.stringLiteral(it.link))
                        ]));
                    })
                    elements.push(t.objectExpression(arr));
                })
            }
        },
    });

    const isExitFile = existsSync(vitepressTempConfigPath)
    if (!isExitFile) ensureFileSync(vitepressTempConfigPath)
    writeFileSync(vitepressTempConfigPath, generate(ast).code, 'utf-8')
}

/**
 * @description: 监听指定文件变化
 * @param { filePathName[] } fileList
 */
const watchFile = (fileList)=>{
    fileList.forEach(path=>{
        fs.watchFile(path, {
            interval:500,
        }, (curr, prev) => {
            onWatchFile();
        })
    })
}

// 监听文件变化
const onWatchFile = () => {
    generatorDocNav();
}

// 是否需要监听文件变化
if (isWatch) watchFile([navConfigPath, vitepressConfigPath])

module.exports = {
    generatorDocNav
}