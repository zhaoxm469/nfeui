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
import { nfeForm } from "nfeui";
import useForm from "../src/useForm";
import { Search } from "@element-plus/icons-vue";
import { FormSubmitParams } from "../src/types";
import { h, nextTick } from "vue";
import { ElMessage } from "element-plus";

const getCityList = (keyword: string) => {
	return new Promise((reslove, reject) => {
		setTimeout(() => {
			reslove([
				{
					ff: "北京",
					cc: "bj",
				},
				{
					ff: "上海",
					cc: "sh",
				},
			]);
		}, 1000);
	});
};

const [register, { setValue, getFormData }] = useForm({
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
		lg: 8,
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
			onClick() {
				console.log("点击");
			},
			onChange() {
				console.log("发生改变");
			},
			onInput() {
				console.log("oninput....");
			},
			onClear() {
				console.log("清空数据");
				// 清空数据以后，给电话号输入框随便写点啥把
				setValue({
					tel: "17888",
				});
			},
			onSelect() {
				console.log("选中文字");
			},
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
			label: "个数",
			value: 0,
			component: "InputNumber",
			prop: "count",
			step: 2,
			max: 10,
			min: 0,
			mock: {
				type: "@integer(0,10!)",
			},
			onChange() {
				nextTick(() => {
					const { count } = getFormData();

					console.log(`个数发生改变${count}`);
				});
			},
			styleProps: {
				width: "100%",
			},
		},
		{
			prop: "classify",
			label: "分类",
			value: "",
			component: "Select",
			styleProps: {
				width: "100%",
			},
			placeholder: "请选择分类",
			options: [
				{
					key: "0",
					label: "中石化",
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
			tip: "年龄就是岁月留下的痕迹",
			component: "Input",
			disabled: true,
			prop: "age",
			placeholder: "请输入年龄",
			mock: {
				type: "@integer(60, 100)",
			},
			customSlot: {
				componentBottom: () =>
					h(
						"span",
						{
							style: {
								color: "red",
							},
						},
						"插槽：下面搞点东西"
					),
			},
			componentSlot: {
				append: () => h("div", "岁"),
				// labelLeft: () => h('span', '888'),
				// labelRight: 'usenameLabelRight'
				// formItemTop: () => h('div', '44')
			},
		},
		{
			label: "手机号",
			component: "Input",
			value: "",
			prop: "tel",
			mock: {
				type: "@mobile",
			},
			placeholder: "请输入手机号",
			customSlot: {
				// top: () => h('div', '顶部'),
				// bottom: 'telRight',
				// top: 'telLeft',
				// labelLeft: () => h('span', '前'),
				// append: () => h('span', '后面'),
				// before: () => h('span', '前面'),
				// // : () => h('span', '底部'),
				// // labelRight: () => h('span', '后'),
				// componentBottom: () => h('div', {
				//     style: {
				//         color: 'red'
				//     }
				// }, '我也在下边搞点事情把')
			},
		},
		{
			suffixIcon: Search,
			label: "地址",
			component: "Autocomplete",
			prop: "address",
			placeholder: "请输入内容",
			api: getCityList,
			mock: {
				type: "@county(true)",
			},
			styleProps: {
				width: "100%",
			},
			value: "",
			field: "ff as value,cc as id",
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
