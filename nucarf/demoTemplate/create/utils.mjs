import { defOptions } from "./config.mjs";
import 'dotenv/config'

const { UI_PREFIX } = process.env;
export const noop = ()=>{};

// 转换为中线命名
export const upperCaseTohump = (value) => {
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
export const toFirstLowercase = value => value.replace(value[0], value[0].toLocaleLowerCase());

// 合并选项
export const mergeOptions = (userOptions)=>{
    Object.assign(defOptions, userOptions)
    // 设置导出组件的名称字段
    defOptions['exportCmtName'] = UI_PREFIX + defOptions.name;
    // 组件中华划线命名
    defOptions['humpName'] = upperCaseTohump(UI_PREFIX + defOptions.name);
    // 首字母小写
    defOptions['firstLowercaseName'] = toFirstLowercase(defOptions.name);
    return defOptions;
}