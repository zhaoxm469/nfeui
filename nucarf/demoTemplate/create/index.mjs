import { createDemoFile, addToNavJson, createComponentExportFile } from './generateFile.mjs'
import { demoGeneratePathConfig } from './config.mjs';
import createInquirer from "./createInquirer.mjs";
import { mergeOptions } from "./utils.mjs";
import { chalk } from "zx";

const rootPath = process.cwd();
// 生成路径配置文件
const generatePathConfig = demoGeneratePathConfig(rootPath);

async function init () {
    // 获取命令行交互结果
    // const opts = await createInquirer(generatePathConfig);
    // 生成新的配置对象
    let newCpt = mergeOptions();
    // 生成DEMO相关文件
    await createDemoFile(newCpt, generatePathConfig);
    // 修改docs文档路由
    await addToNavJson(newCpt, generatePathConfig);
    // 创建组件导出文件
    await createComponentExportFile(generatePathConfig);

    // await $`clear`;
    console.log(chalk.green('\n组件生成成功，请开始你的表演吧！！！！\n'))
  
}


init();