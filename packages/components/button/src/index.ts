import { extend } from './../../../utils/basic';
import { makeStringProp } from './../../../utils/props';

type ButtonSize = 'large' | 'normal' | 'small' | 'mini';

export const buttonProps = extend({}, {
    text: String,
    icon: String,
    size: makeStringProp<ButtonSize>('normal'),
});
