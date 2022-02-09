<template>
	<div class="nfe-form">
		<el-form
			ref="ruleFormRef"
			v-bind="formPropsRef"
			:model="formModel"
			:rules="rules"
		>
			<el-row>
				<template v-for="schema in formItemSchema" :key="schema.prop">
					<FormItems :schema="schema" :slots="$slots"></FormItems>
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
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ElForm, ElFormItem, ElInput, ElButton, ElRow } from "element-plus";
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
	FormProps,
	FormSubmitParams,
	PartialFormSchema,
} from "./types";
import { formEmits, formProps } from ".";
import FormItems from "./FormItems";
import useMock from "../../../hooks/useMock";

type FormInstance = InstanceType<typeof ElForm>;
type Rules = Record<string, FormItemRule[]>;

interface State {
	formPropsRef: Partial<FormProps>;
	formModel: Recordable;
	formItemSchema: PartialFormSchema[] | undefined;
	showFootBtn: boolean | undefined;
	rules: Rules;
	isSubmitLoading: boolean;
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
			rules: computed(() => {
				let rulesResult: Rules = {};
				state.formPropsRef.formItems?.forEach((item) => {
					if (item.rules) {
						rulesResult[item.prop!] = item.rules;
					}
				});
				return rulesResult;
			}),
			isSubmitLoading: false,
		});

		// 监听formItemSchema数据变化，传递到formModel用于表单校验
		watch(
			() => state.formItemSchema,
			(newFormItemSchema) => {
				toRaw(newFormItemSchema)?.forEach(
					(item) => (state.formModel[item.prop!] = item.value || "")
				);
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
				ruleFormRef.value?.validate((valid) => {
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
				return toRaw(state.formModel);
			},
			async onCancel() {
				emit("cancel");
			},
			async onResetFields() {
				ruleFormRef.value?.resetFields();
				// console.log(toRaw(state.formItemSchema));
				state.formItemSchema?.forEach((item) => {
					if (typeof item.value === "number" && item.component !== "Input") {
						item.value = 0;
					} else {
						item.value = "";
					}
				});
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
