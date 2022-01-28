# 开发组件

本节将介绍如何在本项目中开发组件，并集成到 nfeui 当中。

## 环境准备

本地环境需要安装 npm7.x 或者（[Yarn1.x](https://yarnpkg.com/)）、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

::: warning 注意

-   [Node.js](http://nodejs.org/) 这里推荐 `14.x` 及以上。

:::

## 工具配置

这里推荐您使用 [vscode](https://code.visualstudio.com/)，可以安装以下工具来提高开发效率及代码格式化

-   [volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - vue3 开发必备，不支持 vue2，启用这个插件的时候记得禁用`Vetur`插件哦
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
-   [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化
-   [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env 文件 高亮
-   [Tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - tailwindcss 智能感知提示

## 代码获取

从 Nucarf [GitLab](https://git.nucarf.cn/frontend/n-p-m/nfeui) 获取代码

```bash
git clone https://git.nucarf.cn/frontend/n-p-m/nfeui
```

## 安装依赖

```bash
# npm
npm install

# or

# yarn
yarn
```

## 项目核心目录介绍

```bash
 ├── dist                               # UI组件打包文件
 ├── postcss.config.js                  # post.config配置
 ├── tsconfig.json                      # ts配置文件
 ├── packages                           # 组件源码核心目录
 │   ├── index.ts                       # 组件导出模块，一般不用修改这个文件，打包的时候 会根据nav.config.json自动生成导出的模块
 │   ├── nav.config.json                # 组件JSON列表，该文件发生变化会自动映射到文档侧边栏
 │   ├── components                     # 自定义组件目录（我们开发自定义组件的时候，重点使用这个目录）
 │   │   └── Button                     # xxx 组件（所有自定义组件最好都按照这个格式开发，可直接通过 npm run add 自动生成组件模板）
 │   │   │    └── src                   # xxx 组件核心源码
 │   │   │    │     ├── index.scss      # scss 文件
 │   │   │    │     ├── index.ts        # 组件的props类型，以及emit 类型存放在这里，自己在这个目录也可以把一些逻辑的更细的拆分
 │   │   │    │     └── index.vue       # 使用者最终引入的sfc模板
 │   │   │    ├── __test__              # 组件测试目录
 │   │   │    ├── doc.md                # 组件使用文档，会自动同步到在线文档页面
 │   │   │    ├── index.ts              # 组件导出口（一般不需要修改这个文件）
 │   │   │    └── demo                  # demo示例文件夹
 │   │   │          └── demo.vue        # demo示例模板，可直接在doc文档引入
 │   ├── style                          # 样式目录
 │   ├── utils                          # 工具方法目录
 ├── vite.config.js                     # vite 打包配置
 ├── jest.config.js                     # jest 配置
 ├── nucarf                             # ci 脚本
 │   ├── demoTemplate                   # 组件模板目录
 │   │   ├── create.mjs                 # ci 组件生成命令
 │   │   ├── default                    # npm run add 默认生成组件的模板
 ├── tailwind.config.js                 # tailwind 配置文件
```

> 当我们开发自定义组件的时候 其实重点只需要关注 packages 目录下的文件即可。

## npm script 命令介绍

```bash
{
    "scripts": {
        # 运行项目
        "dev": "zx nucarf/dev.mjs",
        # UI组件打包 && 打包UI在线文档
        "build": "npm run ui-build && npm run docs-build",
        # 生成vue组件type.d.ts文件
        "type": "vue-tsc --declaration --emitDeclarationOnly",
        # 全量jest测试脚本执行
        "test": "jest",
        # cli快捷生成组件模板文件
        "add": "zx nucarf/demoTemplate/create.mjs ",
        # npm发包
        "np": "np",
        # 生成UI组件打包后的type.d类型文件
        "generate:types": "zx nucarf/generate-types.mjs ",
        # UI文档站点打包
        "docs-build": "zx nucarf/docs-build.mjs",
        # UI 打包
        "ui-build": "vite build && npm run type && npm run generate:types",
        # 文档站点打包文件预览
        "docs-serve": "cross-env NODE_ENV=production gc-vitepress serve --root=docs",
        # 文档打包&预览
        "docs-build-serve": "zx nucarf/docs-build-serve.mjs",
        # 根据项目的commit 自动生成 changelogs
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
        # eslint 修复
        "lint:eslint": "eslint --cache --max-warnings 0  \"{packages,mock}/**/*.{vue,ts,tsx}\" --fix",
        # prettier 修复
        "lint:prettier": "prettier --write  \"packages/**/*.{js,json,tsx,css,less,scss,vue,html,md}\" "
    }
}
```

## 开发自定义组件

上部分内容大致了解完一户，接下来就可以开发自己的自定义组件啦。

### 运行项目

```bash
npm run dev
```

运行成功以后，就可以通过 http://localhost:3000 访问我们的组件文档了。

### 通过命令生成组件基础模板

为了统一组件开发的目录规范，减少一些手动配置的繁琐操作，让咱们更专注于组件的开发。建议使用 `npm run add` 命令方式生成组件模板！

```bash
# 生成组件命令
npm run add

# 然后根据命令提示，扒拉扒拉一顿填写

# ? 组件英文名(每个单词的首字母都大写，如TestButton)： TestButton
# ? 组件中文名(十个字以内)： 按钮2
# ? 组件描述(五十个字以内)： 写一个按钮组件玩玩
# ? 请选择组件分类(输入编号)：1.布局组件,2.操作反馈,3.基础组件,4.导航组件,5.数据录入,6.业务组件 6
# ? 组件作者: zhaodage

# 组件生成成功，请开始你的表演吧！！！！
```

这个时候可以看到我们项目里 `packages` 文件下多出了几个文件，还有一些文件的更改。

现在再访问我们的 http://localhost:3000 , 就可以在侧边栏可以看到多了一个 `TestButton 按钮2`的导航。

![alt](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fcb4b1b9-2325-4e40-b77b-04cd59163ef7/51dbb028-560e-426f-8f8d-e7f9cd8cde2f.png)

最后我们只需要修改 `packages/components/TestButton` （命令工具帮我们创建好的目录结构）下的文件就可以了。  
并且组件代码修改以后会热更新到在线文档，可以边调试边预览边开发~

## 发布

输入 `npm run build ` 命令， 打包完成以后申请合并到`master`分支。 合并通过以后 会自动同步到 https://nfeui.nucarf.cn 。

> 后续会完善这系列流程，自动发布到 cdn，文档增加版本更新提示等
