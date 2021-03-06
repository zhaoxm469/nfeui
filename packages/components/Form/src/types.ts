import { VNode } from "vue";
import { ComponentSize } from "element-plus/es/utils/types";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";

export type PartialFormSchema = Partial<FormItemsSchema>;

type ColProps = {
    /** 自定义元素标签 */
    tag: string;
    /** 栅格占据的列数 */
    span: number;
    /** 栅格左侧的间隔格数 */
    offset: number;
    /** 栅格向左移动格数 */
    pull: number;
    /** 栅格向右移动格数 */
    push: number;
    /** <768px 响应式栅格数或者栅格属性对象 */
    xs: number;
    /** ≥768px 响应式栅格数或者栅格属性对象 */
    sm: number;
    /** ≥992px 响应式栅格数或者栅格属性对象 */
    md: number;
    /** ≥1200px 响应式栅格数或者栅格属性对象 */
    lg: number;
    /** ≥1920px 响应式栅格数或者栅格属性对象 */
    xl: number;
};

export type FormSchemaOptions = {
    key: string | number;
    label: string;
    value: string | number;
    [x: string]: any;
};

export interface FormActionType {
    // clearValidate: (name?: string | string[]) => Promise<void>;
    // updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
    setProps: (formProps: Partial<FormProps>) => Promise<void>;
    setFormItemValue: (params: Recordable) => Promise<void>;
    setFormItemOptions: (
        params: Recordable<FormSchemaOptions[]>
    ) => Promise<void>;
    setFormItemProps: (params: Recordable<PartialFormSchema>) => Promise<void>;
    onSubmit: () => Promise<void>;
    onCancel: () => Promise<void>;
    onResetFields: () => Promise<void>;
    onMock: () => Promise<void>;
    getFormData: () => Recordable;
    // removeSchemaByFiled: (field: string | string[]) => Promise<void>;
    // appendSchemaByField: (
    //     schema: FormSchema,
    //     prefixField: string | undefined,
    //     first?: boolean | undefined,
    // ) => Promise<void>;
    // validateFields: (nameList?: NamePath[]) => Promise<any>;
    // validate: (nameList?: NamePath[]) => Promise<any>;
    // scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}
export type RegisterFn = (formInstance: FormActionType) => void;

type FormPropsMenuBtnProps = {
    position: FormPropsMenuBtnPropsPosition;
};

export type FormProps = {
    /** 行内表单模式 */
    inline?: boolean;
    /** 用于控制该表单内组件的尺寸 */
    size?: ComponentSize;
    /** 对齐方式,表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width */
    labelPosition?: "left" | "top" | "right";
    /** 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。 */
    labelWidth?: string | number;
    /** 是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效 */
    disabled?: boolean;
    /** 表单每一列的数据 */
    formItems: FormItemsSchema[];
    /** Show reset button */
    showResetButton?: boolean;
    /** Show confirmation button */
    showSubmitButton?: boolean;
    /** Show confirmation button */
    showMockButton?: boolean;
    /** Show cancel button */
    showCancelButton?: boolean;
    /** el props 配置项，子集formItems会继承此属性 */
    colProps?: Partial<ColProps>;
    /** 栅格间隔 */
    gutter?: number;
    /** 底部菜单按钮Props配置 */
    menuBtnProps?: FormPropsMenuBtnProps;
    // scrollToError: BooleanConstructor;
    // footBottonSlot: {}
} & Recordable;

export type FormItemComponentName =
    | "Input"
    | "Autocomplete"
    | "Cascader"
    | "Checkbox"
    | "ColorPicker"
    | "DatePicker"
    | "InputNumber"
    | "Radio"
    | "Rate"
    | "Select"
    | "VirtualizedSelect"
    | "Slider"
    | "Switch"
    | "TimePicker"
    | "TimeSelect"
    | "Transfer"
    | "SelectV2"
    | "Upload";

export enum FormItemCustomSlotNameEnum {
    // FormItem上方插入
    formItemTop = "formItemTop",
    // FormItem下方插入
    formItemBottom = "formItemBottom",
    // elComponet组件下方插入
    componentBottom = "componentBottom",
    // elComponet组件下方插入
    componentTop = "componentTop",
    // label标签左边插入
    labelLeft = "labelLeft",
    // label标签右边插入
    labelRight = "labelRight",
    // 跟COL同级的向后插入
    wrapAppend = "wrapAppend",
    // 跟COL同级的向前插入
    wrapBefore = "wrapBefore",
}

export type FormRules = Recordable<FormItemRule[]>;

export type FormItemCustomSlotNameKey = keyof typeof FormItemCustomSlotNameEnum;

type FormItemCustomSlotReturn = ((formData: Recordable) => VNode) | string;

export type CustomSlot = Partial<
    Record<FormItemCustomSlotNameKey, FormItemCustomSlotReturn>
>;

export type ComponentSlot = Record<string, FormItemCustomSlotReturn>;

export type WatchValueParams = {
    newValue: any;
    oldValue: any;
};

export type FormItemOptions =
    | FormSchemaOptions[]
    | (() => FormSchemaOptions[] | Promise<any[]>);

export type FormItemsSchema = {
    /** 标签标题 */
    label?: string;
    /** 表单域 model 字段 */
    prop: string;
    /** 是否显示 */
    ifShow?: (formModal: Recordable) => boolean;
    /** 使用的组件 */
    component?: FormItemComponentName;
    /** formItem自定义插槽 */
    customSlot?: CustomSlot;
    /** component组件对应的插槽 */
    componentSlot?: ComponentSlot;
    /** 是否必填，如不设置，则会根据校验规则自动生成 */
    required?: boolean;
    /** 提示 */
    tip?: string;
    /** 监听value发生变化 */
    watchValue?: (params: WatchValueParams) => void;
    /** 字段筛选，需要 as 成前端组件支持的字段名 text、value。 例如 oldKey as newKey */
    field?: string;
    /** 只有在日期时间组件时有效，指定绑定值的格式。绑定值的格式。 不指定则绑定值为 Date 对象 */
    valueFormat?: string;
    // 显示在输入框中的格式
    format?: string;
    /** 存放的数据 */
    value?: any;
    /** 只有在component=Radio 的时候才有效 , 是否展示按钮的样式 */
    isRadioButton?: boolean;
    /** 尺寸设置 */
    size?: ComponentSize;
    /** 只有在component=CheckBox 的时候才有效 ， 是否展示按钮的样式 */
    isCheckBoxButton?: boolean;
    /** 是否展示清除按钮 */
    clearable?: boolean;
    /** 占位符 */
    placeholder?: string;
    /** label宽度 */
    labelWidth?: string;
    /** 最大长度 */
    maxlength?: number;
    /** 是否禁用 */
    disabled?: boolean;
    /** 最小长度 */
    minLength?: number;
    /** mock数据 */
    mock?: Mock | ((formItem: PartialFormSchema & { options?: any[] }) => any);
    /** 是否可搜索(部分组件可用，详细查看componmentKey 对应的el组件是否支持 )*/
    filterable?: boolean;
    /** 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。(部分组件可用) */
    allowCreate?: boolean;
    /** 选项为空时显示的文字，也可以使用 empty 插槽自定义该内容(部分组件可用，详细查看componmentKey 对应的el组件是否支持 ) */
    noDataText?: string;
    /** 是否多选(部分组件可用，详细查看componmentKey 对应的el组件是否支持 ) */
    multiple?: boolean;
    /** 表单验证规则 */
    rules?: FormItemRule[];
    /** 点击触发 */
    onClick?: Function;
    /** componetKey 组件的type */
    type?: string;
    /** 操作label上层的Col 组件配置 */
    colProps?: Partial<ColProps> & { row?: boolean };
    /** 操作label上层的Col 组件配置 */
    options?: FormItemOptions;
    /** 重置表单的默认值 */
    resetValue?: any;
    /** 样式 */
    styleProps?: Recordable;
    /** 用于日期组件 这个这代表选择器打开默认显示的时间 */
    defaultValue?: any;
} & Recordable;

interface Mock {
    /**
     * @description:MockJs 占位符字符串
     *
     * 以下占位符字符串均可支持
     *
     *
     * ===============Basic=============
     *
     * @boolean( min?, max?, current? )
     * @natural( min?, max? )       -> 返回一个随机的自然数（大于等于 0 的整数）。
     * @integer( min?, max? )       -> 返回一个随机字符。
     * @float( min?, max?, dmin?, dmax? )"
     * @character( pool? )"         -> 返回一个随机字符。
     * @string( pool?, min?, max? )"
     * @range(start?, stop, step?)" -> 返回一个整型数组。
     *
     * ===============Date=============
     *
     * @date( format? )"
     * @time( format? )"
     * @datetime( format? )"
     * @now( unit?, format? )"
     *
     * ===============Image==============
     *
     * @image( size?, background?, foreground?, format?, text? )"
     * @dataImage( size?, text? )"
     *
     * ===============Color==============
     *
     * @color()"
     * @hex()"
     * @rgb()"
     * @rgba()"
     * @hsl()"
     *
     * ===============Text==============
     *
     *
     * @paragraph( min?, max? )"        -> 随机生成一段文本。
     * @sentence( min?, max? )"         -> 随机生成一个句子，第一个单词的首字母大写。
     * @word( min?, max? )"             -> 随机生成一个单词。
     * @title( min?, max? )"            -> 随机生成一句标题，其中每个单词的首字母大写。
     * @cparagraph( min?, max? )"       -> 随机生成一段中文文本。
     * @csentence( min?, max? )"        -> 随机生成一段中文文本。
     * @cword( pool?, min?, max? )"     -> 随机生成一个汉字。
     * @ctitle( min?, max? )"           -> 随机生成一句中文标题。
     *
     *
     * ===============NAME==============
     *
     * @first()"            -> 随机生成一个常见的英文名。
     * @last()"             -> 随机生成一个常见的英文姓。
     * @name( middle? )"    -> 随机生成一个常见的英文姓名。
     * @cfirst()"           -> 随机生成一个常见的中文名。
     * @clast()"            -> 随机生成一个常见的中文姓。
     * @cname()"            -> 随机生成一个常见的中文姓名。
     *
     * ===============Web==============
     *
     *
     * @url()"              -> 随机生成一个 URL。
     * @domain()"           -> 随机生成一个域名。
     * @protocol()"         -> 随机生成一个 URL 协议。返回以下值之
     * @tld()"              -> 随机生成一个顶级域名（Top Level Domain）。
     * @email()"            -> 随机生成一个邮件地址。
     * @ip()"               -> 随机生成一个 IP 地址。
     *
     * ===============Address==============
     *
     * @region()"           -> 随机生成一个（中国）大区。
     * @province()"         -> 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
     * @city( prefix? )"    -> 随机生成一个（中国）市。
     * @county( prefix? )"  -> 随机生成一个（中国）县。
     * @zip()"              -> 随机生成一个邮政编码（六位数字）。
     *
     * ===============Helper==============
     *
     * @capitalize( word )" -> 把字符串的第一个字母转换为大写。
     * @upper( str )"       -> 把字符串转换为大写。
     * @lower( str )"       -> 把字符串转换为小写。
     * @pick( arr )"        -> 从数组中随机选取一个元素，并返回。
     * @shuffle( arr )"     -> 打乱数组中元素的顺序，并返回。
     *
     * ===============Miscellaneous==============
     *
     * @guid()"             -> 随机生成一个 GUID。
     * @id()"               -> 随机生成一个 18 位身份证。
     * @increment( step? )  -> 整数自增的步长。默认值为 1。
     * @mobile()            -> 随机生成手机号
     * @constellation()     -> 随机生成某一个星座
     */
    type?: any;
    rules?: Recordable;
}

export type FormSubmitParams = {
    formData: Recordable;
    loading: (isLoading?: boolean) => void;
};

export type FormPropsMenuBtnPropsPosition = "left" | "center" | "right";

export type MnuButtonPositionConfig = {
    justify: "start" | "end" | "center" | "space-around" | "space-between";
    align: "top" | "middle" | "bottom";
};
