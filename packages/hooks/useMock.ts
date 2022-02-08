/*
 * @Author: zhaoxingming
 * @Date: 2022-02-07 13:42:05
 * @LastEditTime: 2022-02-07 15:31:35
 * @LastEditors: vscode
 * @Description: 用户传入的mock规则和占位符实际调用的是这里的方法，然后在返回给用户
 * 
 * mockjs 文档地址：http://mockjs.com/examples.html#Array
 * 
 */
const mockJsCdn = 'https://cdn.nucarf.cn/common/v1.0/js/mock-min.js';
let Mock: any = null;
// 自带的占位符
// type DefaultTypes = "@boolean" | "@natural" | "@integer" | "@float" | "@character" | "@string" | "@range" | "@date" | "@time" | "@datetime" | "@now" | "@image" | "@dataImage" | "@color" | "@hex" | "@rgb" | "@rgba" | "@hsl" | "@paragraph" | "@sentence" | "@word" | "@title" | "@cparagraph" | "@csentence" | "@cword" | "@ctitle" | "@first" | "@last" | "@name" | "@cfirst" | "@clast" | "@cname" | "@url" | "@domain" | "@protocol" | "@tld" | "@email" | "@ip" | "@region" | "@province" | "@city" | "@county" | "@zip" | "@capitalize" | "@upper" | "@lower" | "@pick" | "@shuffle" | "@guid" | "@id" | "@increment"
type NewTypeKey = 'constellation' | 'mobile'
// 新增的占位符
type NewTypes = Record<NewTypeKey, any>
// export type Mockypes = keyof NewTypes | DefaultTypes | string;

export default function useMock() {

    // 异步插入MOCKJS
    createMockJsScript()?.then(() => {
        Mock = window.Mock;
        registerType()
    });

    const methods = {
        // 根据占位符获取数据
        getTyperData(type: string) {
            return Mock.mock!(type)
        },
        // 根据用户传入的mock规则获取数据
        getRulesData(rules: any) {
            return Mock.mock!(rules)
        }
    }

    // 利用 AOP 方式 ，给函数调用的时候 增加校验 
    Object.keys(methods).forEach((cbName: keyof typeof methods) => {
        const oldFn = methods[cbName];
        methods[cbName] = function (...arg) {
            if (!Mock.mock) throw '没有加载成功cdn的mockjs 就开始调用方法！'
            return oldFn.apply(null, arg)
        }
    })

    return { ...methods }
}

// 动态创建script 标签
function createMockJsScript() {
    if (Mock) return;
    const oScript = document.createElement('script');
    oScript.src = mockJsCdn;
    document.body.appendChild(oScript)
    return new Promise((reslove, reject) => {
        oScript.onload = () => {
            reslove('加载完成');
        }
        oScript.onerror = (err) => {
            reject(err);
        }
    })
}

const types: NewTypes = {
    // 星座
    constellation: function () {
        let constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return Mock.Random.pick(constellations)
    },
    // 手机号
    mobile: function () {
        var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
        return Mock.Random.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
}

// 注册更多的占位符
function registerType() {
    Mock.Random.extend({
        ...types
    })
}