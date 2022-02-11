<template>
	<div class>
		<nfeForm @register="register" @submit="onSubmit" @reset="onReset" />
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm } from "nfeui";
import { FormSubmitParams } from "../src/types";
import { h } from "vue";
import { ElMessage } from "element-plus";

const [register] = useForm({
	labelWidth: 80,
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
					min: 3,
					message: "姓名长度不能小于3",
				},
				{
					pattern: /^(?:[\u4e00-\u9fa5·]{3,16})$/,
					message: "姓名不合法",
				},
			],
		},
		{
			prop: "class",
			label: "类型",
			value: "",
			component: "Select",
			styleProps: {
				width: "100%",
			},
			required: true,
			placeholder: "请选择分类",
			options: [
				{
					key: "0",
					label: "万金油",
					value: "0",
				},
				{
					key: "1",
					label: "中石油",
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
			placeholder: "请输入年龄",
			rules: [
				{
					validator(rules, value, callback) {
						if (!value) {
							callback(new Error("请输入年龄"));
						} else if (isNaN(Number(value))) {
							callback(new Error("年龄输入不合法"));
						} else if (value < 18) {
							callback(new Error("年龄不能小于18岁哦"));
						} else {
							callback();
						}
					},
				},
			],
			mock: {
				type: "@integer(60, 100)",
			},
			customSlot: {
				componentBottom: () => h("span", "validator函数自定义校验"),
			},
		},
		{
			label: "爱好",
			value: "",
			component: "Input",
			prop: "hobby",
			placeholder: "请输入爱好",
			rules: [
				{
					asyncValidator(rules, value, callback) {
						if (!value) {
							return callback(new Error("请输入爱好"));
						}

						return new Promise((resolve, reject) => {
							setTimeout(() => {
								if (value === "xx") reject("爱好不能是xx");
								resolve();
							}, 2000);
						});
					},
				},
			],
			customSlot: {
				componentBottom: () =>
					h("div", [
						h("span", "异步校验,爱好不能填写"),
						h(
							"span",
							{
								style: {
									color: "red",
								},
							},
							"xx"
						),
					]),
			},
			mock: {
				type: "@mobile()",
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

const onReset = () => {
	console.log("重置数据");
};
</script>
