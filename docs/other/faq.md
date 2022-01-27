# 常见问题

这里列举了一些常见问题汇总。

## scss 中使用 tailwindcss @apply , IDE 提示 Unknown at rule @applyscss(unknownAtRules)

![alt](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fcb4b1b9-2325-4e40-b77b-04cd59163ef7/e8542e28-cbbb-4654-b199-e3e9ea1aae47.png)

调整 VsCode 设置 , 通过 chtr+shift+p 输入 `settings.json` 在下方加入如下代码

```bash

"css.validate": false,
"less.validate": false,
"scss.validate": false

```

不启用这些内置的校验，统一由项目中 Stylelint 的配置处理。
