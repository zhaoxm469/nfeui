import { toRaw } from "vue";
import {
	ComponentSlot,
	FormItemComponentName,
	FormItemCustomSlotNameEnum,
	FormItemCustomSlotNameKey,
	PartialFormSchema,
} from "./types";
import { QuestionFilled } from "@element-plus/icons-vue";
type SlotStrategy = Partial<Record<FormItemComponentName, () => void>>;

// 有的组件需要插槽，比如Select，这里存放各种组件对应默认插槽的策略
const elSlotStrategy = (
	componentSlot: Recordable = {},
	schema: PartialFormSchema
): Recordable => {
	const strategy: SlotStrategy = {
		Select() {
			componentSlot["default"] = () =>
				schema.options?.map((item) => {
					if (schema.fieldObj) {
						for (let key in schema.fieldObj) {
							if (item[key]) item[schema.fieldObj[key]] = item[key];
						}
					}
					return (
						<el-option key={item.key} label={item.label} value={item.value} />
					);
				});
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
				console.error(`请检查您是否在模板中定义${vnodeOrRfe}插槽了`);
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
