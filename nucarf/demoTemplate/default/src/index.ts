/*
 * @Author: zhaoxingming
 * @Date: 2022-01-24 20:03:06
 * @LastEditTime: 2022-01-25 21:11:57
 * @LastEditors: vscode
 * @Description: 类型最好在这里统一定义，组件的入参以及事件等信息
 *
 */

import { extend } from './../../../utils/basic';
import { makeStringProp } from './../../../utils/props';

type <%= name %>Type = 'primary' | 'success' | 'info' | 'default';

export const <%= firstLowercaseName %>Emits =['click', 'loadingChange'];

export const <%= firstLowercaseName %>Props = extend(
    {},
    {
        type: makeStringProp <<%= name %>Type > ('default'),
        loading: Boolean
    }
);
