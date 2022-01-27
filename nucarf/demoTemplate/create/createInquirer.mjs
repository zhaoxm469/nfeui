import { componentType } from "./config.mjs";
const inquirer = require('inquirer');

export default function createInquirer ({ navConfigPath}) {
    const navConfig = require(navConfigPath)

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
