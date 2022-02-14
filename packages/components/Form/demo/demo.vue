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

const { getRulesData, getMock } = useMock();

const getCityList = async (keyword: string) => {
	console.log(`地址输入keyword：${keyword}`);

	const result = await getRulesData({
		"list|10": [
			{
				ff: "@province()",
				cc: "@uid()",
			},
		],
	});

	return [...result.list];
};

const getPriceOptions = async () => {
	const result = await getRulesData({
		"list|5": [
			{
				label: "@float(4,10,2,2)",
			},
		],
	});
	return [...result.list];
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
					key: 11,
					label: "显卡",
					value: 11,
				},
				{
					key: 12,
					label: "显示器",
					value: 12,
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
			field: "label as value",
			required: true,
			placeholder: "请选择单价",
			styleProps: {
				flex: "1",
			},
			mock: (item) => {
				return getMock().pick(item.options?.map((item) => item.value));
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
					const total = (price.value * count.value).toFixed(2);
					return h(
						"span",
						{
							style: {
								color: "red",
							},
						},
						`总金额 ${total} 元`
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
			mock: {
				type: "@pick(1,2)",
			},
			watchValue({ newValue }) {
				const options =
					getClassifyList().find((item) => item.value === newValue)?.child ||
					[];

				// setFormItemOptions({
				//     goods:options!
				// })

				// setFormItemValue({
				//     goods:''
				// })

				// 上边这两种写法等于下边这种写法
				setFormItemProps({
					goods: {
						options,
						value: "",
					},
				});
			},
			options: getClassifyList,
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
			mock: {
				type: "@pick(11,12)",
			},
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
				{
					label: "第三",
					value: 3,
					key: 3,
				},
			],
			mock: {
				type: "@pick([1,2,3],2)",
			},
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
			},
		},
		{
			label: "滑块",
			prop: "slider",
			value: 0,
			component: "Slider",
			step: 10,
			mock: {
				type: "@integer(1,100)",
			},
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
			mock: {
				type: "@color()",
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
			mock: {
				type: "@integer(0,5)",
			},
		},
		{
			label: "级联选择器",
			prop: "cascader",
			value: "",
			labelWidth: "90px",
			component: "Cascader",
			filterable: true,
			styleProps: {
				width: "100%",
			},
			options: async () => {
				const data = await getRulesData({
					"options|10": [
						{
							value: "@increment()",
							label: "@cname()",
							"children|5-10": [
								{
									value: "@increment()",
									label: "@cname()",
									"children|5-10": [
										{
											value: "@increment()",
											label: "@cname()",
										},
									],
								},
							],
						},
					],
				});
				return data.options;
			},
			mock: (item) => {
				const Mock = getMock();
				const getValue = (options: any[]) => {
					let index = Mock.integer(0, options.length - 1);
					return options[index].value;
				};
				const options = item.options!;
				const index1 = getValue(options);
				const index2 = getValue(
					options.find((item) => item.value === index1).children
				);
				const index3 = getValue(
					options
						.find((item) => item.value === index1)
						.children.find((item: any) => item.value === index2).children
				);
				return [index1, index2, index3];
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
			mock: {
				type: "@boolean()",
			},
		},
		{
			label: "某一天",
			prop: "day",
			component: "DatePicker",
			value: "",
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
			mock: {
				type: "@date()",
			},
		},

		{
			label: "动态加载",
			prop: "dtjz",
			value: [],
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
			mock: async () => {
				const result = await getRulesData({
					list: [
						{
							label: "@cname()",
							leaf: false,
							value: 1,
							"children|2": [
								{
									label: "@cname()",
									leaf: false,
									value: 1,
									children: [
										{
											label: "@cname()",
											value: 1,
											leaf: true,
										},
									],
								},
							],
						},
					],
				});

				setFormItemOptions({
					dtjz: result.list,
				});

				return [1, 1, 1];
			},
			clearable: true,
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
			valueFormat: "YYYY-MM-DD",
			styleProps: {
				width: "100%",
			},
			async mock() {
				return [await getRulesData("@date()"), await getRulesData("@date()")];
			},
		},
		{
			label: "日期时间",
			prop: "time",
			value: "",
			type: "datetime",
			component: "DatePicker",
			valueFormat: "x",
			placeholder: "请选择时间",
			styleProps: {
				width: "100%",
			},
			async mock() {
				return new Date(await getRulesData("@datetime()")).getTime();
			},
			customSlot: {
				componentBottom: (f) => h("span", f["time"]),
			},
		},
		{
			label: "大数据渲染,虚拟列表",
			prop: "selectv2",
			value: [],
			labelWidth: "160px",
			component: "SelectV2",
			multiple: true,
			placeholder: "请选择",
			options: async () => {
				const result = await getRulesData({
					"options|3000": [
						{
							value: "@integer(1,3000)",
							label: "@cname()",
						},
					],
				});
				return result.options;
			},
			async mock(item) {
				return getMock().pick(
					item.options?.map((item) => item.value),
					2
				);
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
			valueFormat: "x",
			styleProps: {
				width: "100%",
			},
			async mock() {
				return new Date(await getRulesData("@now()")).getTime();
			},
		},
		{
			label: "时间选择2",
			component: "TimeSelect",
			placeholder: "请选择时间",
			value: "",
			start: "06:00",
			step: "00:30",
			end: "24:00",
			prop: "time3",
			valueFormat: "x",
			styleProps: {
				width: "100%",
			},
			async mock() {
				return `${await getRulesData("@integer(6,23)")}:${await getRulesData(
					'@pick("00",30)'
				)}`;
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
	ElMessage({
		message: "点击取消按钮",
		type: "info",
	});
};

const onReset = () => {
	ElMessage({
		message: "点击重置按钮",
		type: "success",
	});
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
