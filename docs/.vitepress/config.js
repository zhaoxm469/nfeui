const { resolve } = require('path');
require('dotenv/config');
const { UI_NAME } = process.env;
const pck = require(resolve('./package.json'));

module.exports = {
    title: UI_NAME + ` v${pck.version}`,
    description: '',
    // 扫描srcIncludes里面的 *.md文件
    srcIncludes: ['packages'],
    alias: {
        // 为了能在demo中正确的使用  import { X } from 'nfeui'
        [`nfeui`]: resolve('./packages')
    },
    head: [
        [
            'link',
            {
                rel: 'stylesheet',
                href: '//cdn.jsdelivr.net/npm/element-plus/dist/index.css'
            }
        ]
    ],
    sidebarPath: resolve('./packages/nav.config.json'),
    base: '',
    themeConfig: {
        logo: '/logo.png',
        // lang: 'zh-CN',
        locales: {
            '/': {
                lang: 'zh-CN',
                title: 'nfeui',
                description: '',
                label: '中文',
                selectText: '语言',
                nav: [
                    { text: '指南', link: '/guide/intro' },
                    { text: '组件', link: '/components/button/doc' }
                ],
                sidebar: [
                    {
                        text: '开发指南',
                        children: [
                            { text: '介绍', link: '/guide/intro' },
                            { text: '快速开始', link: '/guide/quickstart' },
                            { text: '开发组件', link: '/guide/addComponents' },
                            { text: '更新日志', link: '/guide/changelog' }
                        ]
                    },
                    {
                        text: '其他',
                        children: [{ text: '常见问题', link: '/other/faq' }]
                    }
                ]
            }
        },
        search: {
            searchMaxSuggestions: 10
        },
        repo: 'https://git.nucarf.cn/frontend/n-p-m/nfeui',
        repoLabel: 'GitLab',
        lastUpdated: true,
        prevLink: true,
        nextLink: true
    }
};
