// 创建模板
const demoTemplate = require('./demoTemplate');
const navConfig = require('../packages/nav.config.json');
const pck = require('../package.json');
const inquirer = require('inquirer');
const { join } = require('path');
const fs = require('fs');
const componentDesPath = 'packages/components/'
const { navs } = navConfig;
const prefix = 'nf'
let dirPath = '';

let newCpt = {
    version: pck.version,
    name: '',
    type: '',
    cName: '',
    desc: '',
    cType: '',
    show: true,
    author: ''
};

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

function init () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: '组件英文名(每个单词的首字母都大写，如TextButton)：',
                validate (value) {
                    let repeat = false;

                    for(let item of navs) {
                        for (let nav of item.children) {
                            if (nav.name === value) {
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
                    '请选择组件分类(输入编号)：' + componentType.map(item=>`${item.id}.${item.name}`).join(','),
                validate (value) {
                    if (componentType.some(item=>item.id== value)) return true;
                    return '输入有误！请输入选项前编号';
                }
            },
            {
                type: 'input',
                name: 'author',
                message: '组件作者:'
            }
        ])
        .then(function (answers) {
            newCpt = Object.assign(newCpt, answers);
            // 设置生成文件夹目录
            setDirPath();
            // 生成相关文件
            createAllFile();
        });
}

// 设置目标文件夹
function setDirPath (){
    dirPath = join(componentDesPath + newCpt.name.toLowerCase());
}

// 生成所需目录
function createDir () {
    const srcDirPath = join(dirPath, 'src');
    const demoDirPath = join(dirPath, 'demo');
    const testDirPath = join(dirPath, '__test__');
    [dirPath, srcDirPath, demoDirPath, testDirPath].forEach(dirPath => {
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    })
}

// 生成文件
function createFile (fileName, demoTemplateName){
    // 读取模板内容
    let content = demoTemplate(newCpt)[demoTemplateName];
    const filePath = join(dirPath, fileName);
    return new Promise((reslove, reject)=> {
        fs.writeFile(filePath, content, (err) => {
            if (err) reject(err);
            reslove(`生成${fileName}文件成功`);
        });
    })
}

// 追加到路由文件
function addToNavJson () {
    const { cType, desc,author, name, cName, show } = newCpt;
    const cNav = JSON.parse(JSON.stringify(navs))
    let navItem = cNav.find(item => item.cType === cType);

    const navItemInfo = {
        "version": pck.version,
        "text": `${name}`,
        "sort": 1,
        "cName": cName,
        "show": show,
        "desc": desc,
        "author": author,
        "link": `/components/${name.toLowerCase()}/doc`
    }

    // 如果找到路由名称
    if (navItem) {
        navItem.children.push(navItemInfo)
    } else {
        cNav.push({
            text: componentType.find(item => item.id == cType).name,
            cType,
            children: [
                navItemInfo
            ]
        })
    }
  
    return new Promise((resolve, reject) => {
        navConfig.navs = cNav;
        let tempfile = JSON.stringify(navConfig, null, 4);
        
        fs.writeFile(join(componentDesPath,'../nav.config.json'), tempfile, (err) => {
            if (err) throw err;
            resolve(`修改config.json文件成功`);
        });
    });
}

// 添加组件到UI导出
function addUiExport(){
    let cNames = [];
    let tpl = '';
    tpl += "import { App } from 'vue';\n"
    
    navConfig.navs.forEach(item=>{
        item.children.forEach(cmt=>{
            let cName = `${prefix + cmt.text}`;
            if(cmt.show) {
                tpl += `import ${cName} from './components/${cmt.text.toLowerCase()}/index';\n`
                cNames.push(cName)
            }
        })
    })

    tpl += `
function install (app: App) {
    const packages = [${cNames.join(',')}];
    packages.forEach((item: any) => {
        if (item.install) {
            app.use(item);
        } else if (item.name) {
            app.component(item.name, item);
        }
    });
}
export { install,  ${cNames.join(',')}};
export default { install, version: '0.0.1' };
   `

    return new Promise((reslove,reject)=>{
        fs.writeFile(join(componentDesPath, '../index.ts'), tpl, (err) => {
            if (err) throw err;
            reslove(`修改导出index.ts文件成功`);
        });
    })

}


// 开始生成全部文件
async function createAllFile () {
    // 创建目录
    await createDir()
    // 生成IndexTs文件
    await createFile('index.ts', 'indexTs');
    // 生成doc.md文档
    await createFile('doc.md', 'doc');
    // 生成src/index.vue 文件
    await createFile('./src/index.vue', 'srcIndexVue');
    // 生成src/index.ts 文件
    await createFile('./src/index.ts', 'srcIndexTs');
    // 生成src/index.scss 文件
    await createFile('./src/index.scss', 'srcIndexScss');
    // 生成demo.vue文件
    await createFile('./demo/demo.vue', 'demo');
    // 添加到文档路由
    await addToNavJson();
    // 添加到UI导出文件
    await addUiExport();
}

function createComponent () {
    init();
}

createComponent();
