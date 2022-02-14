<template>
	<div class>
		<nfeForm @register="register" @submit="onSubmit" @reset="onReset" />
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm, useMock } from "nfeui";
import { FormSubmitParams } from "../src/types";
const { getRulesData } = useMock();

const getOptions = async () => {
	const result = await getRulesData({
		"list|10": [
			{
				label: "@cname()",
				value: "@id",
				key: "@id",
			},
		],
	});
	return [...result.list];
};

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
			label: "姓名",
			value: "",
			component: "Select",
			labelWidth: "100px",
			styleProps: {
				width: "100%",
			},
			placeholder: "请选择分类",
			options: getOptions,
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
};

const onReset = () => {
	console.log("重置数据");
};
</script>
