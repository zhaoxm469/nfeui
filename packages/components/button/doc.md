---
map:
    # 映射到docs的路径
    path: /components/button
---

# Button 按钮

自定义按钮。

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  desc="使用 type 来定义按钮的样式。">
</demo>

### loading 状态

<demo src="./demo/loading.vue"
  language="vue"
  desc="通过 loading 属性来设置按钮加载中的状态 ">
</demo>

### 点击

<demo src="./demo/click.vue"
  language="vue"
  desc="点击按钮触发 count++ ">
</demo>

### Props

| 参数    | 说明             | 类型    | 可选值   | 默认值  |
| ------- | ---------------- | ------- | -------- | ------- | ------- | --------- | ---------- |
| type    | 类型，可选值为   | String  | `default | success | info    | priamry ` | `default ` |
| loading | 是否显示加载动画 | Boolean | `false   | true`   | `false` |

### Events

| 参数          | 说明                 | 回调参数    |
| ------------- | -------------------- | ----------- |
| click         | 点击按钮触发         | event:Event |
| loadingChange | loading 状态改变触发 | -           |

### Button 插槽

| 插槽名 | 说明       |
| ------ | ---------- |
| -      | 自定义内容 |
