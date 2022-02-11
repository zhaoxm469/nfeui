<template>
	<div class>
		<div>
			<h4>任何插槽value属性都支持两种类型</h4>
			<p class="nt-text-gray nt-text-14">
				1. 第一种 customSlotKey 类型为 <b class="nt-text-rose-600">string</b>
				类型，然后在 nfeForm 组件中模板种 ，插入 template 元素 ，设置插槽名称为
				customSlotKey 的 value 即可。
			</p>
			<p class="nt-text-gray nt-text-14">
				2. 第二种 customSlotKey 类型为
				<b class="nt-text-rose-600">Function</b>
				，返回值是一个VNode类型，我们直接返回执行的h函数即可。
			</p>
		</div>

		<div class="nfe-hr"></div>

		<nfeForm @register="register">
			<template #usernameLeftRight="formData">
				<span class="nt-text-rose-600">
					{{ formData["username"] }} 右边插槽</span
				>
			</template>
		</nfeForm>

		<div class="nfe-hr"></div>

		<nfeForm @register="register2" />

		<div class="nfe-hr"></div>

		<nfeForm @register="register3" />

		<div class="nfe-hr nt-mt-30"></div>

		<nfeForm @register="register4" />
	</div>
</template>

<script lang="ts" setup>
import { nfeForm, useForm } from "nfeui";
import { h } from "vue";

const [register] = useForm({
	formItems: [
		{
			label: "用户名",
			prop: "username",
			component: "Input",
			value: "",
			placeholder: "请输入用户名",
			customSlot: {
				labelLeft: () =>
					h(
						"span",
						{
							style: {
								color: "#e42a4f",
							},
						},
						"左插槽"
					),
				labelRight: "usernameLeftRight",
			},
		},
	],
});

const [register2] = useForm({
	formItems: [
		{
			label: "用户名",
			prop: "username",
			component: "Input",
			value: "",
			placeholder: "请输入用户名",
			customSlot: {
				componentBottom: () =>
					h(
						"span",
						{
							style: {
								color: "#e42a4f",
							},
						},
						"下边插入啥"
					),

				componentTop: () =>
					h(
						"span",
						{
							style: {
								color: "#e42a4f",
							},
						},
						"上边插入点"
					),
			},
		},
	],
});

const [register3] = useForm({
	formItems: [
		{
			label: "用户名",
			prop: "username",
			component: "Input",
			value: "",
			placeholder: "请输入用户名",
			customSlot: {
				append: () =>
					h(
						"span",
						{
							style: {
								color: "#e42a4f",
							},
						},
						"el-col 并集下方"
					),
				before: () =>
					h(
						"span",
						{
							style: {
								color: "#e42a4f",
							},
						},
						"el-col 并集上方"
					),
			},
		},
	],
});

const [register4] = useForm({
	colProps: {
		span: 12,
	},
	labelWidth: 130,
	formItems: [
		{
			label: "用户名",
			prop: "username",
			component: "Input",
			value: "",
			placeholder: "请输入用户名",
			customSlot: {
				componentBottom: (formData) => {
					return h("span", `插槽监听数据变化:${formData["username"]}`);
				},
			},
		},
		{
			label: "价格",
			prop: "price",
			component: "Input",
			value: "",
			placeholder: "请输入加个",
			colProps: {
				row: true,
			},
			componentSlot: {
				append: () => h("span", "元"),
				suffix: () => h("span", "suffix"),
				prefix: () => h("span", "prefix"),
			},
			customSlot: {
				componentBottom: () =>
					h(
						"span",
						{
							style: {
								background: "green",
								color: "#fff",
								textAlign: "center",
								padding: "0 20px",
							},
						},
						"componentBottom"
					),
			},
			styleProps: {
				flex: "1",
			},
		},
	],
});
</script>

<style scoped lang="scss">
@import "../../../style/tailwindcss.scss";
.nfe-hr {
	@apply nt-w-full nt-border-2 nt-border-gray-100 nt-mb-20 nt-border-solid;
}
</style>
