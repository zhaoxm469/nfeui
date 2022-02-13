import { h, toRaw, VNode } from "vue";
import {
	ComponentSlot,
	FormItemComponentName,
	FormItemCustomSlotNameEnum,
	FormItemCustomSlotNameKey,
	FormSchemaOptions,
	PartialFormSchema,
} from "./types";
import { QuestionFilled } from "@element-plus/icons-vue";
import {
	ElCheckbox,
	ElCheckboxButton,
	ElOption,
	ElRadio,
	ElRadioButton,
} from "element-plus";
import { isPromise } from "../../../utils/basic";

type SlotStrategy = Partial<Record<FormItemComponentName, () => void>> &
	Recordable;

// 获取用户在FormItem[].options 用户传递过来的options数据 ，把不同类型的value 统一适配一下
export const getElOptions = (
	schema: PartialFormSchema
): FormSchemaOptions[] => {
	let options = schema.options;

	// 如果用户没有传递options，提示一下用户
	if (!options) {
		console.warn(`${schema.label}{props:${schema.prop}}，缺少options选项`);
		return [];
	}

	// 如果是函数执行函数
	if (typeof options === "function") {
		const value = options();
		// 函数可能是异步函数，也可能是同步函数，同步函数直接返回执行结果即可
		if (isPromise(value)) {
			(value as Promise<any[]>).then((options) => (schema.options = options));
			// 如果是promise 先默认给插槽放个空数组，等待上边promise执行完成以后 再重新赋值
			return [];
		} else {
			return value as FormSchemaOptions[];
		}
	}

	return options;
};

const optionsMap = (schema: PartialFormSchema) => {
	// 获取适配的options数据
	let options = getElOptions(schema);
	let elOptions: VNode[] = [];

	// 将用户传递的 field 转换到 options 组数
	const field2Options = (item: FormSchemaOptions) => {
		if (schema.fieldObj) {
			for (let key in schema.fieldObj) {
				if (item[key]) item[schema.fieldObj[key]] = item[key];
			}
		}
	};

	return {
		map: function (callback: Function) {
			elOptions = options.map((item) => {
				field2Options(item);
				return callback(item);
			});

			return elOptions;
		},
	};
};

// 有的组件需要插槽，比如Select，这里存放各种组件对应默认插槽的策略
const elSlotStrategy = (
	componentSlot: Recordable = {},
	schema: PartialFormSchema
): Recordable => {
	const strategy: SlotStrategy = {
		Select() {
			const elOptions = optionsMap(schema).map((item: FormSchemaOptions) =>
				h(ElOption, {
					key: item.key!,
					value: item.value!,
					label: item.label,
				})
			);

			// TODO: 这样写样式有点丑陋，以后有时间优化这个
			// componentSlot["empty"] = () => h('span', '暂无数据')
			componentSlot["default"] = () => h("div", elOptions);
		},
		RadioGroup() {
			const component = schema.isRadioButton ? ElRadioButton : ElRadio;
			const elOptions = optionsMap(schema).map((item: FormSchemaOptions) =>
				h(
					component,
					{
						...item,
						label: item.value,
					},
					{
						default: () => h("span", item.label),
					}
				)
			);

			componentSlot["default"] = () => elOptions;
		},
		CheckboxGroup() {
			const component = schema.isCheckBoxButton ? ElCheckboxButton : ElCheckbox;
			const elOptions = optionsMap(schema).map((item: FormSchemaOptions) =>
				h(
					component,
					{
						...item,
						label: item.value,
					},
					{
						default: () => h("span", item.label),
					}
				)
			);

			componentSlot["default"] = () => elOptions;
		},
	};

	strategy[schema.component!] && strategy[schema.component!]!();

	return componentSlot;
};

// 标准化插槽数据，一个数据适配器的接口
export const normalizationSlotData = (
	componentSlot: ComponentSlot | undefined,
	slots: Recordable
) => {
	if (!componentSlot) return {};

	componentSlot = toRaw(componentSlot);

	for (let slotName in componentSlot) {
		const vnodeOrRfe = componentSlot[slotName];

		// 如果是键值对，则代表用户传递的是插槽模板的名称，否则这代表用户传入的是个函数，返回的是渲染函数
		if (vnodeOrRfe && typeof vnodeOrRfe !== "function") {
			// 这里在slot中没有找到对应的插槽，说明用户可能单词拼写错误，也可能没有在模板中定义插槽
			if (!slots[vnodeOrRfe]) {
				console.warn(`请检查您是否在模板中定义${vnodeOrRfe}插槽了`);
				break;
			}
			componentSlot[slotName] = slots[vnodeOrRfe];
		}
	}

	return componentSlot;
};

// 获取Element Component 组件的插槽
export const getElComponentSlot = (
	schema: PartialFormSchema,
	slots: Recordable
) => {
	return elSlotStrategy(
		normalizationSlotData(schema.componentSlot, slots),
		schema
	);
};

// 获取自定义插槽数据
const getCustomComponentSlot = (
	schema: PartialFormSchema,
	slots: Recordable
) => {
	return normalizationSlotData(schema.customSlot, slots);
};

// 自定义插槽
export const customComponentSlot = (
	schema: PartialFormSchema,
	slots: Recordable,
	formModel?: Recordable
) => {
	// @ts-ignore
	const custimComponent = (props, { slots }) =>
		Object.keys(FormItemCustomSlotNameEnum).map(
			(key: FormItemCustomSlotNameKey) =>
				slots[FormItemCustomSlotNameEnum[key]]?.(formModel)
		);

	// 获取适配器转换过的新的插槽对象
	const newSlot = getCustomComponentSlot(schema, slots);

	let componentSlots: Partial<Record<FormItemCustomSlotNameKey, any>> = {};

	Object.keys(FormItemCustomSlotNameEnum).forEach(
		(key: FormItemCustomSlotNameKey) => {
			let value = FormItemCustomSlotNameEnum[key];
			componentSlots[value] = () => {
				const slot = {
					[value]: newSlot[value],
				};
				return newSlot[value] ? <custimComponent v-slots={slot} /> : "";
			};
		}
	);

	return componentSlots;
};

// 饿了么label 插槽
export const elFormItemSlot = (
	schema: PartialFormSchema,
	labelLeft: Function,
	labelRight: Function
) => {
	return {
		label: () => {
			const tooltipStyle =
				"margin-left:4px;margin-top:4px;cursor: pointer;position: relative;top:2px;";

			// label 右侧 提示组件
			const tooltComponent = () =>
				schema.tip ? (
					<el-tooltip content={schema.tip} placement="top">
						<el-icon size={16} style={tooltipStyle}>
							<QuestionFilled />
						</el-icon>
					</el-tooltip>
				) : (
					""
				);

			return (
				<>
					{labelLeft()}
					<span>{schema.label}</span>
					{tooltComponent()}
					{labelRight()}
				</>
			);
		},
	};
};
