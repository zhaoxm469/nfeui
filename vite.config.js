// yarn build 用到的vite配置
require('dotenv/config');
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import config from './package.json';

const { UI_NAME } = process.env;

const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2022 @nucarf.
*/`;

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

/**
 * @type {import('vite').UserConfig}
 */
export default {
    optimizeDeps: {
        include: [],
        exclude: []
    },
    plugins: [
        vue(),
        vueJsx()
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
                drop_debugger: true
            }
        },
        lib: {
            entry: resolve('./packages/index.ts'),
            name: UI_NAME.toLocaleLowerCase(),
            fileName: UI_NAME.toLocaleLowerCase(),
            formats: ['es', 'umd']
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue'],
            output: {
                banner,
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                },
                exports: 'named'
            }
        }
    }
};
