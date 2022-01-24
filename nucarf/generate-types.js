const fs = require('fs-extra');
const { join } = require('path');

// 生成types类型提示
const createNfeUiTypes = () => {
    const components = require('../packages/nav.config.json')
    let exportResult = [];
    for (let item of components.navs) {
        item.children = item.children.filter(item=>item.show);
        if(!item.children.length) break;
        for (let navItem of item.children){
            exportResult.push(`export { default as nf${navItem.text} } from "./packages/components/${navItem.text.toLocaleLowerCase()}";`)
        }
    }

    return `

        ${exportResult.join('\n')}

        declare namespace _default {
            export { install };
            export { version };
        }
        export default _default;

        export function install(app: any): void;
        export const version: string;
    `
}


function init (){
    const temp = createNfeUiTypes();
    fs.writeFileSync(join(__dirname,'../dist/nfeui.d.ts'),temp,'utf-8')
    console.log('types 文件生成成功');
}


init();