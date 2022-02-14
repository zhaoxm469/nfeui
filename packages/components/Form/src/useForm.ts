import { getConversionResultKey } from "./utils";
import { reactive, markRaw } from "vue";
import { FormProps, FormActionType, RegisterFn } from "./types";

type UseFormReturnType = [RegisterFn, MethodsType];

type MethodsOlimtKeys = "onSubmit" | "onCancel" | "onResetFields" | "onMock";

type MethodsType = Omit<FormActionType, MethodsOlimtKeys> & {
	sumbit: () => Promise<void>;
	resetFields: () => Promise<void>;
};

export default function useForm(
	formProps: Partial<FormProps>
): UseFormReturnType {
	// form/index.vue 内部的方法
	let formCptMethods: FormActionType | null = null;

	formProps.formItems?.forEach((item) => {
		// 提前把field字符串转换为 fieldObj对象，用于后面根据这个对象转换optionList
		item.fieldObj = getConversionResultKey(item.field!);
		// 这些是SVG组件，通过markRaw把他们标记为不是响应式的，有助于提升性能
		if (item.prefixIcon) item.prefixIcon = markRaw(item.prefixIcon);
		if (item.suffixIcon) item.suffixIcon = markRaw(item.suffixIcon);
		if (!item.resetValue) item.resetValue = item.value;
	});

	// 将formProps用户传入的数据，转换为响应式数据
	formProps = reactive(formProps);

	// form组件初始化成功，并把内部方法供useForm调用
	function register(instance: FormActionType): void {
		instance.setProps(formProps);
		formCptMethods = instance;
	}

	// 这个相当于十个中交枢纽站（也可以理解为代理模式，后期可以在这做一些操作）。
	const methods: MethodsType = {
		async setProps(formProps) {
			return formCptMethods?.setProps(formProps);
		},
		async setFormItemOptions(params) {
			return formCptMethods?.setFormItemOptions(params);
		},
		async setFormItemValue(params) {
			return formCptMethods?.setFormItemValue(params);
		},
		async setFormItemProps(params) {
			return formCptMethods?.setFormItemProps(params);
		},
		async sumbit() {
			return formCptMethods?.onSubmit!();
		},
		async resetFields() {
			return formCptMethods?.onResetFields!();
		},
		getFormData() {
			const data = formCptMethods?.getFormData!();
			return data || {};
		},
		// async sumbit() {
		//     return formCptMethods?.onSubmit!()
		// },
	};

	return [register, methods];
}
