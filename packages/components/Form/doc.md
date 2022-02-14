---
map:
  # 映射到docs的路径
  path: /components/Form
---

# Form 万能表单（wip）

基于 Element plus 二次封装的表单组件 , 扩展了一些常用功能 , 通过配置 JSON 就能快速生成表单 .

> 本组件不包含样式文件 ， 使用此组件项目中务必自行引入 Element UI 样式文件。

## 相关文档

- [MockJs](http://mockjs.com/examples.html#DPD) - 用于配置 FormItems.mock 选项
- [ElementPlus](https://element-plus.gitee.io/zh-CN/component/button.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95) - 饿了么 UI 组件文档

## 基础使用

<demo src="./demo/demo.vue"  ></demo>

<!-- <demo src="./demo/mock.vue"  ></demo> -->

### 插槽使用

> 适用于 FormItems[].customSlot | FormItems[].componentSlot

针对每一项 FormItem 组件都设置了`丰富的插槽`。  
如固定布局不满足业务需求，可跟根据插槽随意扩展。同时也支持 formItems[].`componentKey` 所对应的饿了么组件的插槽

<demo src="./demo/slot.vue"></demo>

### 动态控制是否显示隐藏 FormItem

<demo src="./demo/demo2.vue" desc="监听 是否显示年龄选项的变化，通过formItem[].isShow属性 动态设置 年龄输入框 的显示隐藏 " ></demo>

### 表单校验

<demo src="./demo/demo3.vue" desc="FormItems.rules 用法跟Element form.rules 保持一致"  ></demo>

## useForm Methods

```js
const [ register , methods ] = useForm(formProps);
const { setValue,... } = methods;
```

| 方法名             | 说明                                    | 类型                                                   | 可选值 | 示例                          | 默认值 |
| ------------------ | --------------------------------------- | ------------------------------------------------------ | ------ | ----------------------------- | ------ |
| setProps           | 动态修改 FormProps                      | (formProps:Partial<FormProps\>) => Promise<void\>      | -      | setProps({size:'small'})      | -      |
| setFormItemOptions | 根据 propKey,动态修改 options           | (params: Record<propsName=string,FormSchemaOptions[]>) | -      | setFormItemOptions({xxx:[]})  | -      |
| setFormItemValue   | 根据 propKey,动态修改 value             | (params: Record<propsName=string,any>)                 | -      | setValue({username:'123456'}) | -      |
| setFormItemProps   | 根据 propKey,动态设置表单 FormItemProps | (params: Record<propsName=string,FormItemsSchema>)     | -      | setValue({username:'123456'}) | -      |
| sumbit             | 触发表单提交动作                        | () => Promise<void\>                                   | -      | sumbit()                      | -      |
| resetFields        | 触发表单重置动作                        | () => Promise<void\>                                   | -      | resetFields()                 | -      |
| getFormData        | 获取表单数据                            | () => Record<string,any>                               | -      | getFormData()                 | -      |

## useForm FormProps

> 最外层的数据是控制 ElFrom 的，支持 ElForm 所有的 props

```js
const formProps = {
    labelWidth:'100px',
    disabled: true,
    showSubmitButton: true,
    ...
}
const [ register ] = useForm(formProps);
```

| 属性             | 说明                                                                                      | 类型                         | 可选值              | 默认值  |
| ---------------- | ----------------------------------------------------------------------------------------- | ---------------------------- | ------------------- | ------- | --- |
| inline           | 行内表单模式                                                                              | boolean                      | true                | false   |
| size             | 用于控制该表单内组件的尺寸                                                                | string                       | default,large,small | default |
| colProps         | el-col 删格化属性，默认会继承 formProps.colProps                                          | Record<'xl'...,number>       | -                   | -       |
| labelPosition    | 对齐方式,表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width           | string                       | left , top ,right   | right   |
| labelWidth       | 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。 | string                       | number              | -       | -   |
| disabled         | 是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效        | boolean                      | true                | false   |
| formItems        | 表单每一列的数据                                                                          | 详见底部 FormSchema 文档介绍 | -                   | -       |
| showResetButton  | 是否显示重置按钮                                                                          | boolean                      | true                | false   |
| showSubmitButton | 是否显示提交按钮                                                                          | boolean                      | true                | false   |
| showMockButton   | 是否显示 Mock 按钮                                                                        | boolean                      | true                | false   |
| showCancelButton | 是否显示取消按钮                                                                          | boolean                      | true                | false   |
| menuBtnProps     | 表单底部菜单按钮 Props ，详见下方文档                                                     | FormPropsMenuBtnProps        | -                   |

## FormProps.menuBtnProps

> 用于 formProps.menuBtnProps[menuBtnPropsKey] = xxx ;

| 属性     | 说明     | 类型   | 可选值            | 默认值 |
| -------- | -------- | ------ | ----------------- | ------ |
| position | 按钮方向 | string | left,center,right | center |

## useForm FormProps.FormItems

> FormItems 包含了 FormItems.componentKey 对应饿了么组件的 props , 并且扩展一些其他属性。

| 属性          | 说明                                                                                   | 类型                                                        | 可选值 | 默认值 |
| ------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------ | ------ |
| label         | 标签标题                                                                               | string                                                      | -      | -      |
| prop          | 表单域 model 字段                                                                      | string                                                      | -      | -      |
| component     | FormItemComponentName                                                                  | Record<string, any\>                                        | -      | -      |
| customSlot    | 自定义组件插槽                                                                         | Record<FormItemCustomSlotNameKey, FormItemCustomSlotReturn> | -      | -      |
| compoentSlot  | componet 对应饿了么组件支持的插槽                                                      | Record<FormItemCustomSlotNameKey, FormItemCustomSlotReturn> | -      | -      |
| required      | 是否必填，如不设置，则会根据校验规则自动生成                                           | boolean                                                     | true   | false  |
| field         | 字段筛选，需要 as 成前端组件支持的字段名 text、value。 例如 oldKey as newKey           | string                                                      | -      | -      |
| value         | 选中项绑定值                                                                           | string                                                      | -      | -      |
| watchValue    | 监听 value 发生变化                                                                    | ({newValue,oldValue})=>void                                 | -      | -      |
| valueFormat   | 只有在日期/时间组件时有效，指定绑定值的格式。绑定值的格式。 不指定则绑定值为 Date 对象 | string                                                      | -      | -      |
| format        | 只有在时间/日期组件时使用，显示在输入框中的格式                                        | string                                                      | -      | -      |
| clearable     | 是否展示清除按钮                                                                       | boolean                                                     | true   | false  |
| placeholder   | 占位符                                                                                 | string                                                      | -      | -      |
| isRadioButton | 单选按钮是否为按钮样式，只有在 component=Radio 的时候才有效                            | string                                                      | -      | -      |
| ifShow        | 是否显示                                                                               | (formData:Record)=>boolean                                  | -      | -      |
| labelWidth    | label 宽度                                                                             | string                                                      | -      | -      |
| filterable    | 是否可搜索(部分组件可用，详细查看 componmentKey 对应的 el 组件是否支持 )               | boolean                                                     | -      | -      |
| allowCreate   | 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。(部分组件可用)      | boolean                                                     | -      | -      |
| noDataText    | 间距配置                                                                               | string                                                      | -      | -      |
| multiple      | 是否多选(部分组件可用，详细查看 componmentKey 对应的 el 组件是否支持 )                 | boolean                                                     | -      | -      |
| colProps      | 间距配置                                                                               | {span:number}                                               | -      | -      |
| maxlength     | 最大长度                                                                               | number                                                      | -      | -      |
| minLength     | 最小长度                                                                               | number                                                      | -      | -      |
| disabled      | 是否禁用                                                                               | boolean                                                     | true   | false  |
| mock          | mock 数据规则                                                                          | {type?:MockType,rules?: Record<string, any\>}               | -      | -      |
| styleProps    | 组件样式设置                                                                           | Record<string, any\>                                        | -      | -      |
| resetValue    | 触发重置表单的默认值 ，如果不写默认取首次设置 value 的默认值                           | any                                                         | -      | -      |
| defaultValue  | 用于日期组件 这个这代表选择器打开默认显示的时间                                        | any                                                         | -      | -      |

## FormItems Type

FormItems 选项内常用 Type 类型的定义

### FormSchema

> 用于 formProps.formItems

```typescript
type FormItemsSchema = {
	/** 标签标题 */
	label: string;
	/** 表单域 model 字段 */
	prop: string;
	/** 是否显示 */
	ifShow?: (formModal: Recordable) => boolean;
	/** 使用的组件 */
	component: FormItemComponentName;
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
	value: any;
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
```

### FormItemComponentName

> 用于 formProps.formItems[].component = FormItemComponentName;

```typescript
// component key 目前支持的饿了么组件
type FormItemComponentName =
	| "Input"
	| "Select"
	| "Autocomplete"
	| "InputNumber"
	| "Radio"
	| "Checkbox"
	| "ColorPicker"
	| "Rate"
	| "Slider"
	| "Switch"
	| "Cascader"
	| "DatePicker"
	| "SelectV2"
	| "TimePicker"
	| "TimeSelect";
// | "Transfer"
// | "Upload";
```

### FormItemCustomSlotNameKey

> 用于 formProps.formItems[].customSlot = FormItemCustomSlotNameKey;

| 名称            | 说明                    |
| --------------- | ----------------------- |
| formItemTop     | FormItem 上方插入       |
| formItemBottom  | FormItem 下方插入       |
| componentBottom | elComponet 组件下方插入 |
| componentTop    | elComponet 组件下方插入 |
| labelLeft       | label 标签左边插入      |
| labelRight      | label 标签右边插入      |
| wrapAppend      | 跟 COL 同级的向后插入   |
| wrapBefore      | 跟 COL 同级的向前插入   |

### MockType

MockType 对应[MockJs 文档](http://mockjs.com/examples.html#Basic)的占位符

> 用于 formProps.formItems[].mock.type = MockType;

```typescript
typeof MockType =
    "@boolean( min?, max?, current? )"
    | "@natural( min?, max? )"
    | "@integer( min?, max? )"
    | "@float( min?, max?, dmin?, dmax? )"
    | "@character( pool? )"
    | "@string( pool?, min?, max? )"
    | "@range(start?, stop, step?)"
    | "@date( format? )"
    | "@time( format? )"
    | "@datetime( format? )"
    | "@now( unit?, format? )"
    | "@image( size?, background?, foreground?, format?, text? )"
    | "@dataImage( size?, text? )"
    | "@color()"
    | "@hex()"
    | "@rgb()"
    | "@rgba()"
    | "@hsl()"
    | "@paragraph( min?, max? )"
    | "@sentence( min?, max? )"
    | "@word( min?, max? )"
    | "@title( min?, max? )"
    | "@cparagraph( min?, max? )"
    | "@csentence( min?, max? )"
    | "@cword( pool?, min?, max? )"
    | "@ctitle( min?, max? )"
    | "@first()"
    | "@last()"
    | "@name( middle? )"
    | "@cfirst()"
    | "@clast()"
    | "@cname()"
    | "@url()"
    | "@domain()"
    | "@protocol()"
    | "@tld()"
    | "@email()"
    | "@ip()"
    | "@region()"
    | "@province()"
    | "@city( prefix? )"
    | "@county( prefix? )"
    | "@zip()"
    | "@capitalize( word )"
    | "@upper( str )"
    | "@lower( str )"
    | "@pick( arr )"
    | "@shuffle( arr )"
    | "@guid()"
    | "@id()"
    | "@increment( step? )"

```
