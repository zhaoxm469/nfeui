const config = require('../src/config.json');
const path = require('path');
const fs = require('fs-extra');
let importStr = `import { App } from 'vue';
declare class UIComponent {
  static install(vue: App): void;
}\n`;
const packages = [];

config.navs.forEach(item => {
    item.packages.forEach(packs => {
        const { show, name } = packs;
        if (show) {
            importStr += `declare class ${name} extends UIComponent {}\n`;
            packages.push(name);
        }
    })
})


let installFunction = `
export interface InstallationOptions {
  locale?: any;
  lang?: any;
}
declare function install(app: App, options?: InstallationOptions): void;
export { ${packages.join(',')},install };
declare const _default: {
  install: typeof install;
  version: string;
};
export default _default;`;

let fileStr = importStr + installFunction;

fs.outputFile(
    path.resolve(__dirname, '../dist/nfeui.d.ts'),
    fileStr,
    'utf8',
);

fs.outputFile(
    path.resolve(__dirname, '../dist/index.d.ts'),
    `import * as NfeUI from './nfeui';
export default NfeUI;
export * from './nfeui';`,
    'utf8',
    error => {
        // logger.success(`${package_config_path} 文件写入成功`);
    }
);
