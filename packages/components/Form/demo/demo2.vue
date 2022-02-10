<template>
	<div class>
		<nfeForm
			@register="register"
			@submit="onSubmit"
			@cancel="onCancel"
			@reset="onReset"
		/>
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm } from "nfeui";
import { FormSubmitParams } from "../src/types";
import { h } from "vue";
import { ElMessage } from "element-plus";

const [register] = useForm({
	// inline: true,
	labelWidth: 80,
	// labelPosition: 'top',
	// disabled: !true,
	// size: 'default',
	// inlineMessage: true,
	// statusIcon: true,
	colProps: {
		xs: 24,
		sm: 12,
		lg: 12,
	},
	showSubmitButton: true,
	showCancelButton: true,
	showMockButton: true,
	showResetButton: true,
	formItems: [
		{
			value: "",
			label: "姓名",
			component: "Input",
			prop: "username",
			placeholder: "请输入姓名",
			clearable: true,
			mock: {
				type: "@cname",
			},
			rules: [
				{
					required: true,
					message: "请输入姓名",
					trigger: "blur",
				},
				{
					min: 2,
					message: "姓名长度不能小于2",
				},
			],
		},
		{
			prop: "isAge",
			label: "是否展示年龄",
			value: "0",
			component: "Select",
			labelWidth: "130px",
			styleProps: {
				width: "100%",
			},
			placeholder: "请选择分类",
			options: [
				{
					key: "0",
					label: "显示",
					value: "0",
				},
				{
					key: "1",
					label: "隐藏",
					value: "1",
				},
			],
			mock: {
				type: '@pick(["0","1"])',
			},
		},
		{
			label: "年龄",
			value: "",
			tip: "年龄就是岁月留下的痕迹",
			component: "Input",
			prop: "age",
			ifShow: (formData) => {
				return formData["isAge"] === "0";
			},
			placeholder: "请输入年龄",
			mock: {
				type: "@integer(60, 100)",
			},
			componentSlot: {
				append: () => h("div", "岁"),
			},
		},
	],
});

const onSubmit = ({ formData, loading }: FormSubmitParams) => {
	console.log(formData);
	loading();
	setTimeout(() => {
		ElMessage({
			message: "提交成功",
			type: "success",
		});
		loading(false);
	}, 1000);
};

const onCancel = () => {
	console.log("触发取消");
};

const onReset = () => {
	console.log("重置数据");
};
</script>
