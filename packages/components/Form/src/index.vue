<template>
	<div class="nfe-form">
		<el-form
			ref="ruleFormRef"
			v-bind="formPropsRef"
			:model="formModel"
			:rules="formRules"
		>
			<el-row>
				<template v-for="schema in formItemSchema" :key="schema.prop">
					<FormItems
						:schema="schema"
						:slots="$slots"
						:colProps="formPropsRef.colProps"
						:formModel="formModel"
					></FormItems>
				</template>
			</el-row>
			<el-row :span="24" v-if="showFootBtn" align="middle" justify="center">
				<el-button
					type="primary"
					v-if="formPropsRef.showSubmitButton"
					:loading="isSubmitLoading"
					@click="onSubmit"
					>确定</el-button
				>
				<el-button v-if="formPropsRef.showResetButton" @click="onResetFields"
					>重置</el-button
				>
				<el-button
					type="primary"
					v-if="formPropsRef.showMockButton"
					@click="onMock"
					>模拟数据</el-button
				>
				<el-button v-if="formPropsRef.showCancelButton" @click="onCancel"
					>取消</el-button
				>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElRow } from "element-plus";
import isEqual from "lodash/isEqual";

import {
	computed,
	defineComponent,
	onMounted,
	toRefs,
	reactive,
	ref,
	watch,
	toRaw,
} from "vue";
import {
	FormActionType,
	FormItemsSchema,
	FormProps,
	FormRules,
	FormSubmitParams,
} from "./types";
import { formEmits, formProps } from ".";
import FormItems from "./FormItems";
import useMock from "../../../hooks/useMock";
import getFormRules from "./formRules";

type FormInstance = InstanceType<typeof ElForm>;

interface State {
	formPropsRef: Partial<FormProps>;
	formModel: Recordable;
	formItemSchema: FormItemsSchema[] | undefined;
	showFootBtn: boolean | undefined;
	isSubmitLoading: boolean;
	formRules: FormRules;
}

export default defineComponent({
	name: "nfeForm",
	props: formProps,
	emits: formEmits,
	components: {
		FormItems,
		ElForm,
		ElFormItem,
		ElRow,
		ElInput,
		ElButton,
	},
	setup(props, { emit, slots }) {
		const ruleFormRef = ref<FormInstance>();
		const { getRulesData, getTyperData } = useMock();

		const state: State = reactive({
			formPropsRef: {},
			formModel: {},
			formItemSchema: computed(() => {
				return state.formPropsRef.formItems;
			}),
			showFootBtn: computed(() => {
				const {
					showCancelButton,
					showMockButton,
					showResetButton,
					showSubmitButton,
				} = state.formPropsRef;
				return (
					showCancelButton ||
					showMockButton ||
					showResetButton ||
					showSubmitButton
				);
			}),
			isSubmitLoading: false,
			formRules: {},
		});

		// 监听formItemSchema数据变化，重新生成formModel
		watch(
			() => state.formItemSchema,
			(newFormItemSchema) => {
				console.count("formItemSchema watch");

				toRaw(newFormItemSchema)?.forEach((item) => {
					if (state.formModel[item.prop] != item.value) {
						state.formModel[item.prop] = item.value;
					}
				});

				// 获取新的fule校验规则
				let formRules = getFormRules(toRaw(state.formItemSchema!));
				// 这里要判断老的规则 跟监听 formItem新生成的规则是否一样，如果一样代表虽然formItems数据发生变化了，但是用户没有修改规则
				// 就无需重新设置formRules对象了，避免其他值发生更改页面规则全部触发的bug
				if (!isEqual(formRules, toRaw(state.formRules)))
					state.formRules = formRules;
			},
			{
				deep: true,
			}
		);

		const methods: FormActionType = {
			async setProps(formProps: FormProps) {
				Object.assign(state.formPropsRef, formProps);
			},
			async onSubmit() {
				const loading = (isLoading = true) => {
					state.isSubmitLoading = isLoading;
				};

				loading();
				ruleFormRef.value?.validate((valid) => {
					loading(false);

					if (valid) {
						emit("submit", {
							formData: toRaw(state.formModel),
							loading,
						} as FormSubmitParams);
					} else {
						console.log("error submit!");
						return false;
					}
				});
			},
			getFormData() {
				return { ...toRaw(state.formModel) };
			},
			async onCancel() {
				emit("cancel");
			},
			async onResetFields() {
				// console.log(toRaw(state.formItemSchema));
				state.formItemSchema?.forEach((item) => {
					item.value = item.defaultValue;
				});
				ruleFormRef.value?.resetFields();

				emit("reset");
			},
			async onMock() {
				state.formItemSchema?.forEach((item) => {
					if (item.mock && (item.mock.type || item.mock.rules)) {
						const mockData = item.mock.type
							? getTyperData(item.mock.type)
							: getRulesData(item.mock.rules);
						item.value = mockData;
					}
				});
			},
			async setValue(params) {
				state.formItemSchema?.forEach((item) => {
					if (params[item.prop!]) item.value = params[item.prop!];
				});
			},
		};

		onMounted(() => {
			emit("register", methods);
		});

		return {
			slots,
			ruleFormRef,
			...toRefs(state),
			...methods,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "../../../style/tailwindcss.scss";
@import "./index.scss";
</style>
