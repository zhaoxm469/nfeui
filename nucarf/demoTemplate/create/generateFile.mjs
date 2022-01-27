import { componentType } from './config.mjs';
import 'dotenv/config'

const { UI_PREFIX } = process.env;
const artTemplate = require('art-template');
const { copy, moveSync, writeFileSync, removeSync, ensureFileSync } = require('fs-extra')

// 差值表达式解析规则修改
artTemplate.defaults.rules[1].test = /{{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}}/;

// copy的文件重新命名 
const createFileRename = (file, { firstLowercaseName })=>{
    // 把0000test文件，文件名跟组件名对齐
    if (file.includes('0000.spec.ts')) return file.replace('0000', firstLowercaseName)
    return file;
}

// 创建DEMO相关文件
export async function createDemoFile (newCpt, {
    tempDemoTemplatePath,
    demoTemplatFilePath,
    outputPath
}) {

    const { name } = newCpt;

    // 拼接组件名称 .temp/Button
    const tempDemoCmtPath = path.join(tempDemoTemplatePath, name);

    // 读取全部文件，进行模板差值表达式解析
    const demoFiles = await globby(path.join(demoTemplatFilePath, '/**/*.*'));

    // 把文件copy到临时目录
    for (let file of demoFiles) {
        let tempDestPath = tempDemoCmtPath + file.replace(demoTemplatFilePath, '');
        tempDestPath = createFileRename(tempDestPath, newCpt);
        // 确定文件是否存在
        ensureFileSync(tempDestPath);
        const code = artTemplate(file, newCpt);
        await writeFileSync(tempDestPath, code,'utf-8' )
    }

    // 移动临时目录的文件到 用户packages目录下
    moveSync(tempDemoCmtPath, path.join(outputPath, newCpt.name),{
        overwrite:true
    });

    // // 删除.临时 目录 
    removeSync(tempDemoTemplatePath);
}



// 追加到路由文件
export function addToNavJson (newCpt, { navConfigPath }) {
    const navConfig = require(navConfigPath)

    const { cType, desc, author, name, cName, show ,version } = newCpt;

    const navs = JSON.parse(JSON.stringify(navConfig.navs))
    let navItem = navs.find(item => item.cType === cType);

    const navItemInfo = {
        "version": version,
        "text": `${name}`,
        "sort": 1,
        "cName": cName,
        "show": show,
        "desc": desc,
        "author": author,
        "link": `/components/${name}/doc`
    }

    // 如果找到路由名称
    if (navItem) {
        navItem.children.push(navItemInfo)
    } else {
        navs.push({
            text: componentType.find(item => item.id == cType).name,
            cType,
            children: [
                navItemInfo
            ]
        })
    }

    navConfig.navs = navs;

    writeFileSync(navConfigPath, JSON.stringify(navConfig, null, 4))
}

// 创建导出UI组件TS文件
export function createComponentExportFile ({ 
    navConfigPath,
    artExportComponentIndexTsPath,
    exportComponentIndexTsPath
 }) {
    const navConfig = require(navConfigPath)

    let cmtExportNames = [], imports = [];

    navConfig.navs.forEach(item => {
        item.children.forEach(({ show, text }) => {
            const cmtName = UI_PREFIX + text;
            if (show) {
                imports.push([cmtName, text])
                cmtExportNames.push(cmtName)
            }
        })
    })

    const code = artTemplate(artExportComponentIndexTsPath, {
        cmtExportNames: cmtExportNames.join(','),
        imports
    });

    writeFileSync(exportComponentIndexTsPath, code, 'utf-8')

}
