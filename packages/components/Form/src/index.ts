/*
 * @Author: zhaoxm
 * @LastEditors: vscode
 * @Description: 组件的Event事件，和Props 最好在这里统一定义。
 */

import { extend } from './../../../utils/basic';
import { makeStringProp } from './../../../utils/props';

type FormType = 'primary' | 'success' | 'info' | 'default';

export const formEmits = ['register', 'reset', 'submit', 'cancel', 'reset'];

export const formProps = extend(
    {},
    {
        type: makeStringProp<FormType>('default'),
        /** 是否显示确认按钮 */
        showSubmitButton: Boolean,
        /** 是否显示重置按钮 */
        showResetButton: Boolean,
        /** 是否显示取消按钮 */
        showCancelButton: Boolean,
    }
);
