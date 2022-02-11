<template>
	<div class>
		<nfeForm @register="register" @submit="onSubmit" @reset="onReset" />
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm } from "nfeui";
import { FormSubmitParams } from "../src/types";

const [register] = useForm({
	labelWidth: 80,
	colProps: {
		xs: 24,
		sm: 12,
		lg: 12,
	},
	showSubmitButton: true,
	showMockButton: true,
	showResetButton: true,
	formItems: [
		{
			prop: "isAge",
			label: "是否展示年龄",
			value: "0",
			component: "Select",
			labelWidth: "100px",
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
			component: "Input",
			prop: "age",
			ifShow: (formData) => {
				return formData["isAge"] === "0";
			},
			placeholder: "请输入年龄",
			mock: {
				type: "@integer(60, 100)",
			},
		},
	],
});

const onSubmit = ({ formData, loading }: FormSubmitParams) => {
	console.log(formData);
	loading();
	setTimeout(() => {
		loading(false);
	}, 1000);
};

const onReset = () => {
	console.log("重置数据");
};
</script>
