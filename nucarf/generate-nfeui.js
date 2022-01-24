const config = require('../src/config.json');
const package = require('../package.json');
const fs = require('fs-extra');
const path = require('path');

let importStr = `import { App } from 'vue';\n`;
const packages = [];

config.navs.forEach(item=>{
    item.packages.forEach(packs=>{
        const { show,name } = packs;
        if (show){
            importStr += `import ${name} from './__VUE/${name.toLowerCase()}/index.vue';\n`;
            packages.push(name);
        }
    })
})

let installFunction = `function install(app: App) {
  const packages = [${packages.join(',')}];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}`;
let fileStr = `${importStr}
${installFunction}
export { install, ${packages.join(',')}  };
export default { install, version:'${package.version}'};`;
fs.outputFile(
    path.resolve(__dirname, '../src/packages/nfeui.vue.ts'),
    fileStr,
    'utf8',
    error => {
        // logger.success(`${package_config_path} 文件写入成功`);
    }
);
