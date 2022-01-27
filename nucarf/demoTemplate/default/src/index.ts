/*
 * @Author: <%= author %>
 * @LastEditors: vscode
 * @Description: 组件的Event事件，和Props 最好在这里统一定义。
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
