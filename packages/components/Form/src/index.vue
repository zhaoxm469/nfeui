<template>
	<div class="nfe-form">
		<el-form
			ref="ruleFormRef"
			v-bind="formPropsRef"
			:model="formModel"
			:rules="formRules"
		>
			<el-row :gutter="formPropsRef.gutter">
				<template v-for="schema in formItemSchema" :key="schema.prop">
					<FormItems
						:schema="schema"
						:slots="$slots"
						:colProps="formPropsRef.colProps"
						:formModel="formModel"
					></FormItems>
				</template>
			</el-row>
			<el-row
				:span="24"
				v-if="showFootBtn"
				v-bind="menuButtonPosition(formPropsRef.menuBtnProps?.position)"
			>
				<el-button
					type="primary"
					v-if="formPropsRef.showSubmitButton"
					:loading="isSubmitLoading"
					:disabled="isSubmitLoading"
					@click="onSubmit"
					>确定</el-button
				>
				<el-button
					v-if="formPropsRef.showResetButton"
					:disabled="isSubmitLoading"
					@click="onResetFields"
					>重置</el-button
				>
				<el-button
					type="primary"
					:disabled="isSubmitLoading"
					v-if="formPropsRef.showMockButton"
					@click="onMock"
					>模拟数据</el-button
				>
				<el-button
					:disabled="isSubmitLoading"
					v-if="formPropsRef.showCancelButton"
					@click="onCancel"
					>取消</el-button
				>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElRow } from "element-plus";
// import isEqual from "lodash/isEqual";

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
import { formEmits, formProps, menuButtonPosition } from ".";
import FormItems from "./FormItems";
import useMock from "../../../hooks/useMock";
import getFormRules from "./formRules";
import { deepEqual, extend } from "../../../utils/basic";

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
		// TODO 这里后期可以加上节流
		watch(
			() => state.formItemSchema,
			(newFormItemSchema) => {
				console.count("formItemSchema watch");

				toRaw(newFormItemSchema)?.forEach((item) => {
					// 给formModel赋值的时候 首先判断 跟原来的value 是否相等，如果不想等在赋值
					if (state.formModel[item.prop] !== item.value) {
						// 值发生变化调用给用户传入的watchValue
						item.watchValue &&
							item.watchValue({
								newValue: item.value,
								oldValue: state.formModel[item.prop],
							});
						state.formModel[item.prop] = item.value;
					}

					// console.log(oldFormItemSchema && oldFormItemSchema.find(it => it.prop === item.prop))
					// console.log(oldFormItemSchema && oldFormItemSchema[item])
				});

				// 获取新的fule校验规则
				let formRules = getFormRules(toRaw(newFormItemSchema!));
				// 这里要判断老的规则 跟监听 formItem新生成的规则是否一样，如果一样代表虽然formItems数据发生变化了，但是用户没有修改规则
				// 就无需重新设置formRules对象了，避免其他值发生更改页面规则全部触发的bug
				if (!deepEqual(formRules, toRaw(state.formRules))) {
					state.formRules = formRules;
				}
			},
			{
				deep: true,
			}
		);

		const methods: FormActionType = {
			async setProps(formProps) {
				extend(state.formPropsRef, formProps);
			},
			async setFormItemProps(params) {
				state.formPropsRef.formItems?.forEach((item) => {
					Object.keys(params).forEach((paramsKey) => {
						if (item.prop === paramsKey) {
							extend(item, params[paramsKey]);
						}
					});
				});
			},
			async setFormItemOptions(params) {
				state.formPropsRef.formItems?.forEach((item) => {
					Object.keys(params).forEach((paramsKey) => {
						if (item.prop === paramsKey) {
							item.options = params[paramsKey];
						}
					});
				});
			},
			async setFormItemValue(params) {
				state.formItemSchema?.forEach((item) => {
					Object.keys(params).forEach((paramsKey) => {
						if (item.prop === paramsKey) item.value = params[item.prop];
					});
				});
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
				state.formItemSchema?.forEach((item) => {
					item.value = item.resetValue;
				});
				ruleFormRef.value?.resetFields();

				emit("reset");
			},
			async onMock() {
				state.formItemSchema?.forEach(async (item) => {
					if (typeof item.mock === "function") {
						return (item.value = await item.mock(toRaw(item) as any));
					}

					if (
						item.mock &&
						typeof item.mock !== "function" &&
						(item.mock.type || item.mock.rules)
					) {
						const mockData = item.mock.type
							? await getTyperData(item.mock.type)
							: await getRulesData(item.mock.rules);
						item.value = mockData;
					}
				});
			},
		};

		onMounted(() => {
			emit("register", methods);
		});

		return {
			slots,
			ruleFormRef,
			menuButtonPosition,
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
