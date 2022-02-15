require("dotenv/config");
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import config from "./package.json";
import visualizer from "rollup-plugin-visualizer";

const { UI_NAME } = process.env;

// viteSvgIcons

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2022 @nucarf.
*/`;

// import AutoImport from "unplugin-auto-import/vite";
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import ElementPlus from "unplugin-element-plus/vite";

/**
 * @type {import('vite').UserConfig}
 */
export default {
	optimizeDeps: {
		include: [],
		exclude: [],
	},
	plugins: [
		vue(),
		vueJsx(),
		// 可视化打包
		visualizer({
			open: true,
		}),
		// ElementPlus(),
		// AutoImport({
		//     resolvers: [ElementPlusResolver()],
		// }),
		// Components({
		//     resolvers: [ElementPlusResolver()],
		// }),
	],
	build: {
		minify: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		lib: {
			entry: resolve("./packages/index.ts"),
			name: UI_NAME.toLocaleLowerCase(),
			fileName: UI_NAME.toLocaleLowerCase(),
			formats: ["es", "umd"],
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			// external: ['vue', 'element-plus'],
			output: {
				banner,
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: "Vue",
					// "element-plus": "ElementPlus",
				},
				exports: "named",
			},
		},
	},
};
