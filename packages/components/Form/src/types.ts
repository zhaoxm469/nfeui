import { Component, VNode } from "vue";
import { ComponentSize } from "element-plus/es/utils/types";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ColProps } from "element-plus";

export type PartialFormSchema = Partial<FormItemsSchema>;

export type FormSchemaOptions = {
	key?: string | number;
	label?: string;
	value?: string | number;
	[x: string]: any;
};

export interface FormActionType {
	// clearValidate: (name?: string | string[]) => Promise<void>;
	// updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
	setProps: (formProps: Partial<FormProps>) => Promise<void>;
	setValue: (params: Recordable) => Promise<void>;
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
	// scrollToError: BooleanConstructor;
} & Recordable;

export type FormItemComponentName =
	| "Input"
	| "Autocomplete"
	| "Cascade"
	| "Checkbox"
	| "ColorPicker"
	| "DatePicker"
	| "DateTimePicker"
	| "InputNumber"
	| "Radio"
	| "Rate"
	| "Select"
	| "Virtualized Select"
	| "Slider"
	| "Switch"
	| "Time Picker"
	| "Time Select"
	| "Transfer"
	| "Upload";

export enum FormItemCustomSlotNameEnum {
	// FormItem上方插入
	top = "top",
	// FormItem下方插入
	bottom = "bottom",
	// elComponet组件下方插入
	componentBottom = "componentBottom",
	// elComponet组件下方插入
	componentTop = "componentTop",
	// label标签左边插入
	labelLeft = "labelLeft",
	// label标签右边插入
	labelRight = "labelRight",
	// 跟COL同级的向后插入
	append = "append",
	// 跟COL同级的向前插入
	before = "before",
}

export type FormItemCustomSlotNameKey = keyof typeof FormItemCustomSlotNameEnum;

type FormItemCustomSlotReturn = (() => VNode) | string;

export type CustomSlot = Partial<
	Record<FormItemCustomSlotNameKey, FormItemCustomSlotReturn>
> & {
	[slotName: string]: FormItemCustomSlotReturn;
};

export type ComponentSlot = Record<string, FormItemCustomSlotReturn>;

export type FormItemsSchema = {
	/** 标签标题 */
	label: string;
	/** 表单域 model 字段 */
	prop: string;
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
	/** 字段筛选，需要 as 成前端组件支持的字段名 text、value。 例如 oldKey as newKey */
	field?: string;
	/** 存放的数据 */
	value: any;
	/** 是否展示清除按钮 */
	clearable?: boolean;
	/** 占位符 */
	placeholder?: string;
	/** label宽度 */
	labelWidth?: string;
	/** 后缀icon */
	suffixIcon?: Component;
	/** 前缀icon */
	prefixIcon?: Component;
	/** 最大长度 */
	maxlength?: number;
	/** 是否禁用 */
	disabled?: boolean;
	/** 最小长度 */
	minLength?: number;
	/** mock数据 */
	mock?: Mock;
	/** 表单验证规则 */
	rules?: FormItemRule[];
	/** 点击触发 */
	onClick?: Function;
	/** 操作label上层的Col 组件配置 */
	colProps?: Partial<ColProps> & { row?: boolean };
	/** 操作label上层的Col 组件配置 */
	options?: FormSchemaOptions[];
	/** 样式 */
	styleProps?: Recordable;
} & Recordable;

interface Mock {
	type?: string;
	rules?: Recordable;
}

export type FormSubmitParams = {
	formData: Recordable;
	loading: (isLoading?: boolean) => void;
};
