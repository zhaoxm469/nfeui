---
map:
    # 映射到docs的路径
    path: /components/<%= name %>
---

# <%= name %> <%= cName %>

<%= desc %>

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="点击切换。">
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

### <%= name %> 插槽

| 插槽名 | 说明       |
| ------ | ---------- |
| -      | 自定义内容 |
