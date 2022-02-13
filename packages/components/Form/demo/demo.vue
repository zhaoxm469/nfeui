<template>
	<div class>
		<nfeForm @register="register1" style="margin-bottom: 20px" />

		<nfeForm
			@register="register"
			@submit="onSubmit"
			@cancel="onCancel"
			@reset="onReset"
		/>
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm, useMock } from "nfeui";
import { Search } from "@element-plus/icons-vue";
import { FormSubmitParams } from "../src/types";
import { h, toRefs } from "vue";
import { ElMessage } from "element-plus";

const { getRulesData } = useMock();

const getCityList = (keyword: string) => {
	console.log(`地址输入keyword：${keyword}`);

	return new Promise((reslove, reject) => {
		setTimeout(() => {
			const result = getRulesData({
				"list|10": [
					{
						ff: "@province()",
						cc: "@uid()",
					},
				],
			});
			reslove(result.list);
		}, 500);
	});
};

const getPriceOptions = () => {
	return new Promise<any[]>((reslove, reject) => {
		setTimeout(() => {
			const result = getRulesData({
				"list|1-20": [
					{
						"label|1-100": 1,
						"key|1-100000000": 1,
					},
				],
			}).list;
			reslove(result);
		}, 1000);
	});
};

const getClassifyList = () => {
	return [
		{
			key: 1,
			label: "家用电器",
			value: 1,
			child: [
				{
					key: 11,
					label: "电磁炉",
					value: 11,
				},
				{
					key: 12,
					label: "豆浆机",
					value: 12,
				},
			],
		},
		{
			key: 2,
			label: "电脑办公",
			value: 2,
			child: [
				{
					key: 21,
					label: "显卡",
					value: 21,
				},
				{
					key: 22,
					label: "显示器",
					value: 22,
				},
			],
		},
	];
};

const [
	register,
	{
		setFormItemValue,
		setProps,
		setFormItemProps,
		getFormData,
		setFormItemOptions,
	},
] = useForm({
	labelWidth: 80,
	colProps: {
		xs: 24,
		sm: 12,
		lg: 8,
	},
	showSubmitButton: true,
	showCancelButton: true,
	showMockButton: true,
	showResetButton: true,
	menuBtnProps: {
		position: "right",
	},
	gutter: 10,
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
					pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
					message: "姓名不合法",
				},
			],
		},
		{
			label: "单价",
			prop: "price",
			component: "Select",
			options: getPriceOptions,
			value: "",
			required: true,
			placeholder: "请选择单价",
			field: "label as value",
			styleProps: {
				flex: "1",
			},
			colProps: {
				row: true,
			},
			customSlot: {
				componentBottom: () =>
					h(
						"div",
						{
							style: {
								paddingLeft: "10px",
							},
						},
						"元"
					),
			},
		},
		{
			label: "个数",
			value: 1,
			component: "InputNumber",
			prop: "count",
			max: 10,
			min: 0,
			mock: {
				type: "@integer(0,10!)",
			},
			customSlot: {
				componentBottom: (formModel) => {
					const { price, count } = toRefs(formModel);
					return h(
						"span",
						{
							style: {
								color: "red",
							},
						},
						`总金额 ${price.value * count.value} 元`
					);
				},
			},
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "分类配置",
			prop: "isClassify",
			type: "button",
			isRadioButton: true,
			value: 1,
			mock: {
				type: "@integer(1,0)",
			},
			component: "Radio",
			options: [
				{
					label: "开启",
					value: 1,
					key: 1,
				},
				{
					label: "关闭",
					value: 0,
					key: 0,
				},
			],
		},
		{
			prop: "classify",
			label: "分类",
			value: "",
			filterable: true,
			component: "Select",
			styleProps: {
				width: "100%",
			},
			ifShow: (formData) => formData["isClassify"] === 1,
			placeholder: "请选择分类",
			rules: [
				{
					asyncValidator(rules, value, callback) {
						if (!value && getFormData().isClassify === 1) {
							return callback(new Error("请选择分类"));
						}
						return Promise.resolve();
					},
				},
			],
			customSlot: {
				componentBottom: () => h("span", "商品会根据分类进行联动"),
			},
			options: getClassifyList,
			onChange(value: number) {
				const options = getClassifyList().find(
					(item) => item.value === value
				)?.child;

				// setFormItemOptions({
				//     goods:options!
				// })

				// setFormItemValue({
				//     goods:''
				// })

				// 上边这种写法等于下边这种写法
				setFormItemProps({
					goods: {
						options,
						value: "",
					},
				});
			},
		},
		{
			label: "商品",
			prop: "goods",
			value: "",
			component: "Select",
			placeholder: "请选择商品",
			ifShow: (formData) => formData["isClassify"],
			styleProps: {
				width: "100%",
			},
			options: [],
			rules: [
				{
					asyncValidator(rules, value, callback) {
						if (!value && getFormData().isClassify === 1) {
							return callback(new Error("请选择商品"));
						}
						return Promise.resolve();
					},
				},
			],
		},
		{
			label: "多选",
			prop: "checkBox",
			value: [],
			component: "Checkbox",
			options: [
				{
					label: "第一",
					value: 1,
					key: 1,
					disabled: true,
				},
				{
					label: "第二",
					value: 2,
					key: 2,
				},
			],
		},
		{
			suffixIcon: Search,
			label: "地址",
			component: "Autocomplete",
			prop: "address",
			placeholder: "请输入详细地址",
			required: true,
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

		{
			label: "年龄",
			value: "",
			tip: "年龄就是岁月留下的痕迹",
			component: "Input",
			required: true,
			prop: "age",
			maxlength: 3,
			placeholder: "请输入年龄",
			mock: {
				type: "@integer(60, 100)",
			},

			componentSlot: {
				append: () => h("div", "岁"),
				// labelLeft: () => h('span', '888'),
				// labelRight: 'usenameLabelRight'
				// formItemTop: () => h('div', '44')
			},
		},
		{
			label: "滑块",
			prop: "slider",
			value: 0,
			component: "Slider",
			step: 10,
		},
		{
			label: "颜色",
			prop: "color",
			value: "",
			component: "ColorPicker",
			colProps: {
				row: true,
			},
			customSlot: {
				componentBottom: (formData) =>
					h(
						"span",
						{
							style: {
								marginLeft: "20px",
							},
						},
						`色值为：${formData["color"]}`
					),
			},
		},
		{
			label: "评分",
			prop: "rate",
			value: null,
			component: "Rate",
			// 设置三个等级的颜色
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
			// 允许半选
			allowHalf: true,
			// 等级辅助文字
			texts: ["oops", "disappointed", "normal", "good", "great"],
			styleProps: {
				top: "7px",
				position: "relative",
			},
			colProps: {
				row: true,
			},
			customSlot: {
				componentBottom: (formData) =>
					h(
						"div",
						{
							style: {
								marginLeft: "10px",
							},
						},
						`${formData["rate"] || ""}`
					),
			},
			// customSlot:{
			//     componentBottom:(formData)=>h('span',{
			//         style:{
			//             marginLeft:'20px'
			//         }
			//     },formData['color'])
			// }
		},
		{
			label: "级联选择器",
			prop: "",
			value: "",
			labelWidth: "90px",
			component: "Cascader",
			filterable: true,
			styleProps: {
				width: "100%",
			},
			options: () => {
				return new Promise((r) => {
					setTimeout(() => {
						const data = getRulesData({
							"options|3-10": [
								{
									value: "@integer()",
									label: "@cname()",
									"children|5-10": [
										{
											value: "@integer()",
											label: "@cname()",
											"children|5-10": [
												{
													value: "@integer()",
													label: "@cname()",
												},
											],
										},
									],
								},
							],
						});
						r(data.options);
					}, 1000);
				});
			},
			componentSlot: {
				default: ({ node, data }) => {
					return h("div", [
						h("span", data.label),
						!node.isLeaf && h("span", `(${data.children.length})`),
					]);
				},
			},
		},

		{
			label: "开关",
			prop: "switch",
			value: false,
			component: "Switch",
			loading: false,
			activeText: "开启",
			inactiveText: "关闭",
			inactiveColor: "#ff4949",
			beforeChange: () => {
				setFormItemProps({
					switch: {
						loading: true,
					},
				});
				return new Promise((reslove) => {
					setTimeout(() => {
						reslove(true);
						setFormItemProps({
							switch: {
								loading: false,
							},
						});
					}, 1000);
				});
			},
		},
		{
			label: "某一天",
			prop: "day",
			component: "DatePicker",
			value: new Date(),
			styleProps: {
				width: "100%",
			},
			shortcuts: [
				{
					text: "Today",
					value: new Date(),
				},
				{
					text: "Yesterday",
					value: () => {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24);
						return date;
					},
				},
				{
					text: "A week ago",
					value: () => {
						const date = new Date();
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
						return date;
					},
				},
			],
		},

		{
			label: "动态加载",
			prop: "dtjz",
			value: "",
			labelWidth: "90px",
			component: "Cascader",
			filterable: true,
			options: [],
			props: {
				lazy: true,
				lazyLoad: (node: any, resolve: Function) => {
					let id = 0;
					const { level } = node;
					setTimeout(() => {
						const nodes = Array.from({ length: level + 1 }).map((item) => ({
							value: ++id,
							label: `Option - ${id}`,
							leaf: level >= 2,
						}));
						resolve(nodes);
					}, 1000);
				},
			},
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "日期范围",
			prop: "day2",
			component: "DatePicker",
			value: [],
			type: "monthrange",
			rangeSeparator: "To",
			startPlaceholder: "Start month",
			endPlaceholder: "End month",
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "日期时间",
			prop: "time",
			value: "",
			type: "datetime",
			component: "DatePicker",
			placeholder: "请选择时间",
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "大数据渲染,虚拟列表",
			prop: "selectv2",
			value: "",
			labelWidth: "160px",
			component: "SelectV2",
			placeholder: "请选择",
			options: () => {
				return new Promise((r) => {
					setTimeout(() => {
						const data = getRulesData({
							"options|10000-20000": [
								{
									value: "@integer()",
									label: "@cname()",
								},
							],
						});
						r(data.options);
					}, 1000);
				});
			},
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "时间选择",
			component: "TimePicker",
			placeholder: "请选择时间",
			value: "",
			prop: "time2",
			styleProps: {
				width: "100%",
			},
		},
		{
			label: "时间选择2",
			component: "TimeSelect",
			placeholder: "请选择时间",
			value: "",
			start: "08:30",
			step: "00:15",
			end: "18:30",
			prop: "time3",
			styleProps: {
				width: "100%",
			},
		},
	],
});

const onSubmit = ({ formData, loading }: FormSubmitParams) => {
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

const [register1, {}] = useForm({
	labelWidth: "90px",
	colProps: {
		span: 8,
		xs: 24,
	},
	formItems: [
		{
			prop: "labelPosition",
			label: "对齐方式",
			component: "Radio",
			value: "right",
			isRadioButton: true,
			options: [
				{
					label: "Left",
					value: "left",
					key: "left",
				},
				{
					label: "Right",
					value: "right",
					key: "right",
				},
				{
					label: "Top",
					value: "top",
					key: "top",
				},
			],
			onChange: (labelPosition: any) => {
				setProps({
					labelPosition,
				});
			},
		},
		{
			prop: "size",
			label: "尺寸",
			component: "Radio",
			value: "default",
			isRadioButton: true,
			options: [
				{
					label: "large",
					value: "large",
					key: "large",
				},
				{
					label: "default",
					value: "default",
					key: "default",
				},
				{
					label: "small",
					value: "small",
					key: "small",
				},
			],
			onChange: (size: any) => {
				setProps({
					size,
				});
			},
		},
		{
			prop: "footBtn",
			label: "底部操作按钮",
			component: "Radio",
			value: "right",
			labelWidth: "120px",
			isRadioButton: true,
			options: [
				{
					label: "Left",
					value: "left",
					key: "left",
				},
				{
					label: "Center",
					value: "center",
					key: "center",
				},
				{
					label: "Right",
					value: "right",
					key: "right",
				},
			],
			onChange: (position: any) => {
				setProps({
					menuBtnProps: {
						position,
					},
				});
			},
		},
	],
});
</script>
