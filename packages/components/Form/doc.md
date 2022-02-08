---
map:
    # 映射到docs的路径
    path: /components/Form
---

# Form 表单

基于Element plus 二次封装的表单组件 , 扩展了一些常用功能 .

使用本组件，务必引用 Element plus 的样式 

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="点击按钮触发 count++">
</demo>

### useForm Methods

```js
const [ register , methods ] = useForm(formProps);
const { setValue,... } = methods;
```

| 方法名    | 说明             | 类型    | 可选值  | 示例   | 默认值  |
| ------- | ---------------- | ------- | -------- | ------- | ------- | --------- | ---------- |
| setValue    | 动态设置表单数据 value的值   |  (params: Record<string, any>) => Promise<void\>  |  - | setValue({username:'123456'}) | - |
| setProps | 动态修改表单Props数据 |  (formProps:Partial<FormProps\>) => Promise<void\>  | - | - | - |
| sumbit | 触发表单提交动作 |  () => Promise<void\>  | - | sumbit() | - |
| resetFields | 触发表单重置动作 |  () => Promise<void\>  | - | resetFields() | - |
| getFormData | 获取表单数据 |  () => Record<string,any>  | - | - | - |


### useForm FormProps

> 最外层的数据是控制ElFrom的，基本上ElForm所有的props

```js
const formProps = {
    labelWidth:'100px',
    disabled: true,
    showSubmitButton: true,
    ...
}
const [ register ] = useForm(formProps);
```

| 属性    | 说明             | 类型    | 可选值  | 默认值  |
| ------- | ---------------- | ------- | -------- | ------- | ------- | --------- | ---------- |
| inline    | 行内表单模式   | boolean  |  true | false |
| size    | 用于控制该表单内组件的尺寸   | string  |  default,large,small | default |
| labelPosition    | 对齐方式,表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width   | string  |  'left' , 'top' ,'right' | right |
| labelWidth    | 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。   | string|number  |  - | - |
| disabled    | 是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效   | boolean  |  true | false |
| formItems    | 表单每一列的数据   | 详见底部 FormSchema 文档介绍  |  - | - |
| showResetButton    | 是否显示重置按钮   | boolean  |  true | false |
| showSubmitButton    | 是否显示提交按钮   | boolean  |  true | false |
| showMockButton    | 是否显示Mock按钮   | boolean  |  true | false |
| showCancelButton    | 是否显示取消按钮   | boolean  |  true | false |


### useForm FormProps.FormItems

> 文档没有全部记录，因为咱们component字段适配的组件比较多，所以也可以参考element ui 文档。

| 属性    | 说明             | 类型    | 可选值  | 默认值  |
| ------- | ---------------- | ------- | -------- | ------- | ------- | --------- | ---------- |
| label    | 标签标题   | string  |  - | - |
| prop    | 表单域 model 字段   | string  |  - | - |
| component    | 使用的组件   | string  |  Input , Autocomplete , Cascade , Checkbox , Color Picker , Date Picker , DateTime Picker , Input Number , Radio , Rate , Select , Virtualized Select , Slider , Switch , Time Picker , Time Select , Transfer , Upload | - |
| componentSlot    | 组件插槽   | Record<string, any\>  |  - | - |
| required    | 是否必填，如不设置，则会根据校验规则自动生成   | boolean  |  true | false |
| field    | 字段筛选，需要 as 成前端组件支持的字段名 text、value。 例如 oldKey as newKey   | string  |  - | - |
| value    | 双向绑定存放的数据   | string  |  - | - |
| clearable    | 是否展示清除按钮   | boolean  |  true | false |
| placeholder    | 占位符   | string  |  - | - |
| labelWidth    | label宽度   | string  |  - | - |
| suffixIcon    | 后缀icon   | Component  |  - | - |
| prefixIcon    | 前缀icon   | Component  |  - | - |
| colProps    | 间距配置   | {span:number}  |  - | - |
| maxlength    | 最大长度   | number  |  - | - |
| minLength    | 最小长度   | number  |  - | - |
| disabled    | 是否禁用   | boolean  |  true | false |
| mock    | mock数据规则   | {type:string,rules?: Record<string, any\>}  |  - | - |
| styleProps    | 组件样式设置   |  Record<string, any\>  |  - | - |
