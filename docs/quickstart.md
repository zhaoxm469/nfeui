# 快速开始

本节将介绍如何在项目中使用 NfeUI

## 使用包管理器安装

我们建议您使用包管理器 (NPM, Yarn, pnpm) 安装 NfeUI, 然后您就可以使用打包工具，例如 Vite 和 webpack

```bash
# 选择一个你喜欢的包管理器

# NPM
$ npm install nfeui --save

# Yarn
$ yarn add nfeui

# pnpm
$ pnpm install nfeui
```

## 在项目中使用

### 完整引入  

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。  

```TypeScript
// main.ts
import { createApp } from 'vue'
import NfeUI from 'nfeui'
import 'nfeui/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(NfeUI)
app.mount('#app')
```

### 按需引入 （后续完善）

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 NfeUI，然后就可以使用全局变量 NfeUI 了 。  

### jsDelivr

```html
<head>
  <!-- 导入样式 -->
  <link
    rel="stylesheet"
    href="//cdn.jsdelivr.net/npm/nfeui/dist/index.css"
  />
  <!-- 导入 Vue 3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@next"></script>
  <!-- 导入组件库 -->
  <script src="//cdn.jsdelivr.net/npm/nfeui"></script>
</head>
```