<template>
    <div class>
        <div>
            <h4>任何插槽（customSlot->key,componentSlot->key）的value都支持两种类型</h4>
            <p class="nt-text-gray nt-text-14">
                1. 第一种 customSlotKey 类型为
                <b class="nt-text-rose-600">string</b>
                类型，然后在 nfeForm 元素中插入 template 元素 ，设置插槽名称为
                customSlotKey 对应的 value 即可。
            </p>
            <p class="nt-text-gray nt-text-14">
                2. 第二种 customSlotKey 类型为
                <b class="nt-text-rose-600">Function</b>
                ，返回值是一个VNode类型，我们可以利用h函数返回VNode对象。
            </p>
        </div>

        <div class="nfe-hr"></div>

        <nfeForm @register="register">
            <template #usernameLeftRight>
                <span class="nt-text-sky-700">label 右边插槽</span>
            </template>
        </nfeForm>

        <div class="nfe-hr"></div>

        <nfeForm @register="register2" />

        <div class="nfe-hr"></div>

        <nfeForm @register="register3" />

        <div class="nfe-hr nt-mt-30"></div>

        <nfeForm @register="register4">
            <template #passwordCompoentBottom="formData">
                <span>
                    template元素插槽监听数据变化,密码为：
                    <span
                        class="nt-text-green-800"
                    >{{ formData["password"] }}</span>
                </span>
            </template>
        </nfeForm>

        <div class="nfe-hr nt-mt-30"></div>

        <nfeForm @register="register5">
            <template #collapse>
                <el-collapse style="width:100%;">
                    <el-collapse-item title="Consistency" name="1">
                        <div>
                            Consistent with real life: in line with the process and logic of real
                            life, and comply with languages and habits that the users are used to;
                        </div>
                        <div>
                            Consistent within interface: all elements should be consistent, such
                            as: design style, icons and texts, position of elements, etc.
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </template>
        </nfeForm>
    </div>
</template>

<script lang="ts" setup>
import { ElCollapse, ElCollapseItem } from "element-plus";
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
                                color: "#006aa6",
                            },
                        },
                        "label 左边插入"
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
                                color: "#006aa6",
                            },
                        },
                        "el-input下边插入"
                    ),

                componentTop: () =>
                    h(
                        "span",
                        {
                            style: {
                                color: "#006aa6",
                            },
                        },
                        "el-input上边插入"
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
                wrapAppend: () =>
                    h(
                        "span",
                        {
                            style: {
                                color: "#006aa6",
                            },
                        },
                        "最外层 el-col 同级下方"
                    ),
                wrapBefore: () =>
                    h(
                        "span",
                        {
                            style: {
                                color: "#006aa6",
                            },
                        },
                        "最外层 el-col 同级上方"
                    ),
            },
        },
    ],
});

const [register4] = useForm({
    colProps: {
        span: 12,
        xs: 24,
    },
    labelWidth: 60,
    formItems: [
        {
            label: "用户名",
            prop: "username",
            component: "Input",
            value: "",
            placeholder: "请输入用户名",
            customSlot: {
                componentBottom: (formData) => {
                    return h("span", [
                        h("span", "h函数渲染的插槽监听数据变化,用户名为: "),
                        h(
                            "span",
                            {
                                style: {
                                    color: "red",
                                },
                            },
                            formData["username"]
                        ),
                    ]);
                },
            },
        },
        {
            label: "密码",
            value: "",
            type: "password",
            component: "Input",
            prop: "password",
            placeholder: "请输入密码",
            customSlot: {
                componentBottom: "passwordCompoentBottom",
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
                prepend: () => h("span", "prepend"),
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
                                padding: "0 10px",
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

const [register5] = useForm({
    colProps: {
        span: 12,
        xs: 24,
    },
    formItems: [
        {
            label: "用户名",
            prop: "username",
            component: "Input",
            placeholder: "请输入用户名",
        },
        {
            prop: "collapse",
            customSlot: {
                componentBottom: 'collapse'
            }
        },
    ],
});
</script>

<style scoped lang="scss">
@import "../../../style/tailwindcss.scss";
.nfe-hr {
    @apply nt-w-full nt-border-2 nt-border-gray-100 nt-mb-20 nt-border-solid;
    border-width: 1px;
}
</style>
