import * as elComponent from "./formItemUseElComponent";
import {
	computed,
	DefineComponent,
	defineComponent,
	h,
	resolveComponent,
} from "vue";
import { formItemProps } from "./formItemProps";
import {
	customComponentSlot,
	elFormItemSlot,
	getElComponentSlot,
	getElOptions,
} from "./slot";
import { FormItemComponentName, PartialFormSchema } from "./types";

// 不同el组件调用不同策略 , 来进行数据的适配
const elComponentStrategy: Partial<
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
	Radio(schema) {
		schema.component = "RadioGroup" as any;
	},
	Checkbox(schema) {
		schema.component = "CheckboxGroup" as any;
	},
	Cascader(schema) {
		schema.options = getElOptions(schema);
	},
	DatePicker(schema) {
		if (!schema.defaultValue) schema.defaultValue = new Date();
		if (!schema.type) schema.type = "date";
	},
	SelectV2(schema) {
		schema.options = getElOptions(schema);
	},
	TimePicker(schema) {
		if (!schema.defaultValue) schema.defaultValue = new Date();
	},
	// DateTimePicker(schema) {
	//     if (!schema.defaultValue) schema.defaultValue = new Date()
	//     if (!schema.type) schema.type = 'year'
	// },
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
	components: elComponent,
	props: formItemProps,
	setup(props, { emit }) {
		let { schema, slots, formModel } = props;

		// 不同组件可能需要不同的动作，例如远程搜索等，这里使用策略模式，后期只要elComponentStrategy加上不同的策略名跟方法就能扩展各组件的差异
		schema.component &&
			elComponentStrategy[schema.component] &&
			elComponentStrategy[schema.component]!(schema);

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
					// el组件插槽数据
					...getElComponentSlot(schema, slots),
				}
			);
		};

		// 获取自定义插槽
		const {
			componentBottom,
			formItemTop,
			formItemBottom,
			labelLeft,
			labelRight,
			wrapAppend,
			wrapBefore,
			componentTop,
		} = customComponentSlot(schema, slots, formModel);

		const colRow = schema.colProps?.row ? "display:flex" : "";
		const colProps = { ...props.colProps, ...schema.colProps };
		const ifShow = computed(() =>
			schema.ifShow ? schema.ifShow(formModel) : true
		);

		return () => (
			<>
				{wrapBefore()}
				<el-col {...colProps} v-show={ifShow.value}>
					{formItemTop()}
					<el-form-item
						v-slots={elFormItemSlot(schema, labelLeft, labelRight)}
						labelWidth={schema.labelWidth}
						prop={schema.prop}>
						{componentTop()}
						{getElComponent()}
						{componentBottom()}
					</el-form-item>
					{formItemBottom()}
				</el-col>
				{wrapAppend()}
			</>
		);
	},
});
