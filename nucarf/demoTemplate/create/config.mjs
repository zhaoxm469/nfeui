const pck = require('../../../package.json');
import { join } from 'path'
import { noop } from './utils.mjs';

// options 
export const defOptions = {
    // 版本号
    version: pck.version,
    // 组件英文名称
    name: 'TestButton',
    // 组件中文名称
    cName: '按钮',
    // 组件描述
    desc: '自定义按钮',
    // 组件类型
    cType: '1',
    // 是否显示组件
    show: true,
    // 作者
    author: 'zxm',
    // 设置导出组件的名称字段 ,例如 nfeTestButton
    exportCmtName:'',
    // 中划线命名，一般样式会用到 nfe-test-button
    humpName:'',
    // 首字母小写的组件名 testButton
    firstLowercaseName:''
};

// 组件类型
export const componentType = [{
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

export const demoGeneratePathConfig = (root, userConfigFn = noop )=>{
    const userConfig = userConfigFn() || {};
    
    let pathConfig = {
        // 默认名称
        demoTemplatFilePathName:'default',
        // 默认使用DEMO生成模板文件夹
        demoTemplatFilePath:'nucarf/demoTemplate/',
        // 临时文件夹路径
        tempDemoTemplatePath:'.temp',
        // 输出目录
        outputPath:'packages/components/',
        // UI 导出文件
        exportComponentIndexTsPath:'packages/index.ts',
        // 组件路由文件
        navConfigPath:'packages/nav.config.json',
        // 组件导出文件模板路径
        artExportComponentIndexTsPath:'nucarf/demoTemplate/componetExportIndex.txt',
    }

    Object.assign(pathConfig, userConfig)

    // 组装成新的 模板生成文件夹路径
    pathConfig.demoTemplatFilePath += pathConfig.demoTemplatFilePathName;

    Object.keys(pathConfig).forEach(key => pathConfig[key] = join(root, pathConfig[key]))

    pathConfig['root'] = root;

    return pathConfig;
}
