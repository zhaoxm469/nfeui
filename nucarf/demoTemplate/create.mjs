const { copy, writeFileSync, removeSync, moveSync } = require('fs-extra')
const artTemplate = require('art-template');
const pck = require('../../package.json');
import { chalk, globby, path } from "zx";
const inquirer = require('inquirer');
const { UI_PREFIX } = process.env;
import 'dotenv/config'

// 默认使用的demo模板名称
const demoTemplatFileName = 'default';
// demo模板路径
const demoTemplatePath = path.join(__dirname, demoTemplatFileName);
// 临时文件夹路径
const tempDemoTemplatePath = path.join(__dirname, '../../.../../.temp/')
// 匹配模板临时路径下的所有文件
const tempDemoTemplatePathPatterns = path.join(tempDemoTemplatePath, '/**/*.*');
// 模板最终生成到的用户路径
const destComponetPath = path.join(__dirname,'../../packages/components/')
// 导出UI组件的index.ts文件路径
const exportComponentIndexTsPath = path.join(__dirname, '../../packages/index.ts')
// nav.config路径
const navConfigPath = path.join(__dirname, '../../packages/nav.config.json')
// 导出组件 art Index.ts模板路径
const artExportComponentIndexTsPath = path.join(__dirname, './componetExportIndex.txt')
const navConfig = require(navConfigPath)

artTemplate.defaults.rules[1].test = /{{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}}/;


// 合并用户选项
function createNewOptions (opts={}) {
    // 默认参数
    let defOptions = {
        version: pck.version,
        name: 'Alert',
        cName: '按钮',
        desc: '自定义按钮',
        cType: '1',
        show: true,
        author: 'zxm'
    };
    Object.assign(defOptions, opts);

    // 设置导出组件的名称字段
    defOptions['exportCmtName'] = UI_PREFIX + defOptions.name;
    // 组件中华划线命名
    defOptions['humpName'] = upperCaseTohump(UI_PREFIX + defOptions.name);
    // 首字母小写
    defOptions['firstLowercaseName'] = toFirstLowercase(defOptions.name);

    return defOptions;
}


// 转换为中线命名
const upperCaseTohump = (value) => {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        let s = value[i].toLocaleLowerCase();
        if (/[A-Z]/.test(value[i]) && i !== 0) {
            result += '-' + s.toLocaleLowerCase()
        } else {
            result += s;
        }
    }
    return result;
}

// 首字母小写
const toFirstLowercase = value => value.replace(value[0], value[0].toLocaleLowerCase());

// 组件类型
const componentType = [{
    name: '布局组件',
    id: 1,
}, {
    name: '操作反馈',
    id: 2,
}, {
    name: '基础组件',
    id: 3,
}, {
    name: '导航组件',
    id: 4,
}, {
    name: '数据录入',
    id: 5,
}, {
    name: '业务组件',
    id: 6,
}]


// 创建DEMO相关文件
async function createDemoFile (newCpt){

    const { name } = newCpt;

    // 组件临时目录路径
    const tempDemoCmtPath = path.join(tempDemoTemplatePath , name);
    
    // 把文件copy到缓存目录
    await copy(demoTemplatePath, tempDemoCmtPath)

    // 读取全部文件，进行模板差值表达式解析
    const demoFiles = await globby(tempDemoTemplatePathPatterns);

    // demo模板差值表达式换成用户传入的动态数据
    for (let demoPath of demoFiles ) {
        const code = artTemplate(demoPath, newCpt);
        // 解析差值表达式以后，重新写入缓存目录
        writeFileSync(demoPath,code,'utf8')
    }

}


// 命令行交互询问
function cliInquirer () {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: '组件英文名(每个单词的首字母都大写，如TestButton)：',
                validate (value) {
                    let repeat = false;

                    for (let item of navConfig.navs) {
                        for (let nav of item.children) {
                            if (nav.text === value) {
                                repeat = true;
                                break;
                            }
                        }
                    }

                    if (repeat) {
                        return '该组件名已存在！';
                    }

                    const pass = value && value.match(/^[A-Z]/);
                    if (!pass) return '不能为空，且每个单词的首字母都要大写，如TextBox';

                    return true;
                }
            },
            {
                type: 'input',
                name: 'cName',
                message: '组件中文名(十个字以内)：',
                validate (value) {
                    const pass = value && value.length <= 10;
                    if (pass) return true
                    return '不能为空，且不能超过十个字符';
                }
            },
            {
                type: 'input',
                name: 'desc',
                message: '组件描述(五十个字以内)：'
            },
            // {
            //     type: 'rawlist',
            //     name: 'type',
            //     message: '请选择组件类型(输入编号)：目前只支持组建模板',
            //     choices: ['component', 'filter', 'directive', 'method'],
            //     validate (value) {
            //         const pass = value && /^[1-4]$/.test(value);
            //         if (pass) return true;
            //         return '输入有误！请输入选项前编号';
            //     }
            // },
            {
                type: 'input',
                name: 'cType',
                message:
                    '请选择组件分类(输入编号)：' + componentType.map(item => `${item.id}.${item.name}`).join(','),
                validate (value) {
                    if (componentType.some(item => item.id == value)) return true;
                    return '输入有误！请输入选项前编号';
                }
            },
            {
                type: 'input',
                name: 'author',
                message: '组件作者:'
            }
        ])

}

// // 追加到路由文件
function addToNavJson (newCpt) {
    const navConfig = require(navConfigPath)
    
    const { cType, desc, author, name, cName, show } = newCpt;

    const navs = JSON.parse(JSON.stringify(navConfig.navs))
    let navItem = navs.find(item => item.cType === cType);

    const navItemInfo = {
        "version": pck.version,
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
function createComponentExportFile () {
    const navConfig = require(navConfigPath)


    let cmtExportNames = [], imports = [];

    navConfig.navs.forEach(item => {
        item.children.forEach(({show,text}) => {
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

    writeFileSync(exportComponentIndexTsPath, code,'utf-8')

}



async function init () {
    // 获取命令行交互结果
    const opts = await cliInquirer();
    // 生成新的配置对象
    let newCpt = createNewOptions(opts);
    // 生成DEMO相关文件
    await createDemoFile(newCpt);
    // 修改docs文档路由
    await addToNavJson(newCpt);
    // 创建组件导出文件
    await createComponentExportFile();

    // 移动临时目录的文件到 用户packages目录下
    moveSync(path.join(tempDemoTemplatePath, newCpt.name), path.join(destComponetPath, newCpt.name),{
        overwrite:true
    })
    // 删除.临时 目录 
    removeSync(tempDemoTemplatePath);

    await $`clear`;
    console.log(chalk.green('\n组件生成成功，请开始你的表演吧！！！！\n'))
  
}


init();