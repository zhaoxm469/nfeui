import {
	ElInput,
	ElFormItem,
	ElTooltip,
	ElIcon,
	ElAutocomplete,
	ElCol,
	ElInputNumber,
	ElSelect,
	ElOption,
} from "element-plus";
import { DefineComponent, defineComponent, h, resolveComponent } from "vue";
import {
	customComponentSlot,
	elFormItemSlot,
	getElComponentSlot,
} from "./slot";
import { FormItemComponentName, PartialFormSchema } from "./types";

// 需要使用到的饿了么的组件
const components = {
	ElFormItem,
	ElInput,
	ElAutocomplete,
	ElCol,
	ElTooltip,
	ElIcon,
	ElInputNumber,
	ElSelect,
	ElOption,
};

// 不同组件调用不同策略接口
const componentStrategy: Partial<
	Record<FormItemComponentName, (schema: PartialFormSchema) => void>
> = {
	Autocomplete(schema) {
		const apiFn = schema.api;
		schema.fetchSuggestions = async (
			queryString: string,
			cb: (arg: any) => void
		) => {
			const result = (await apiFn(queryString)) as any[];
			if (schema.field) {
				const fieldObj = schema.fieldObj;
				result.forEach((item) => {
					for (let key in item) {
						if (fieldObj[key]) item[fieldObj[key]] = item[key];
					}
				});
			}
			cb(result);
		};
	},
};

// 这里过滤掉一些数据，避免把不必要的数据也传递给组件的props
const componentSchemaPropsFilter = (schema: PartialFormSchema) => {
	const deleteKey = "api,styleProps,field,colProps,componentSlot".split(",");

	const result = { ...schema };

	Object.keys(schema).forEach((key) => {
		if (deleteKey.includes(key)) delete result[key];
	});

	return result;
};

export default defineComponent({
	components,
	props: {
		schema: {
			type: Object as PropType<PartialFormSchema>,
			default: () => {},
		},
		slots: {
			type: Object,
			default: () => {},
		},
	},
	setup(props, { emit }) {
		let { schema, slots } = props;

		// 不同组件可能需要不同的动作，例如远程搜索等，这里使用策略模式，后期只要componentStrategy加上不同的策略名跟方法就能扩展各组件的差异
		schema.component &&
			componentStrategy[schema.component] &&
			componentStrategy[schema.component]!(schema);

		// 同过component->Value获取组件
		const getElComponent = () => {
			const elComponent = resolveComponent(
				"El" + schema.component
			) as DefineComponent;

			return h(
				elComponent,
				{
					modelValue: schema.value,
					"onUpdate:modelValue": (value: any) => (schema.value = value),
					...componentSchemaPropsFilter(schema),
					style: schema.styleProps,
				},
				{
					// 组件插槽数据
					...getElComponentSlot(schema, slots),
				}
			);
		};

		// 获取自定义插槽组件
		const {
			componentBottom,
			top,
			bottom,
			labelLeft,
			labelRight,
			append,
			before,
			componentTop,
		} = customComponentSlot(schema, slots);
		const colRow = schema.colProps?.row ? "display:flex" : "";

		return () => (
			<>
				{before()}
				<el-col {...schema.colProps} style={colRow}>
					{top()}
					<el-form-item
						v-slots={elFormItemSlot(schema, labelLeft, labelRight)}
						labelWidth={schema.labelWidth}
						prop={schema.prop}>
						{componentTop()}
						{getElComponent()}
						{componentBottom()}
					</el-form-item>
					{bottom()}
				</el-col>
				{append()}
			</>
		);
	},
});
