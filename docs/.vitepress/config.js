const { resolve } = require('path');

module.exports = {
    title: 'nfeui',
    description: '',
    // 扫描srcIncludes里面的 *.md文件
    srcIncludes: ['packages'],
    alias: {
        // 为了能在demo中正确的使用  import { X } from 'nfeui'
        [`nfeui`]: resolve('./packages'),
    },
    base:'',
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
                    { text: '指南', link: '/intro' },
                    { text: '组件', link: '/components/button/doc' }
                ],
                sidebar: [
                    {
                        text: '开发指南',
                        children: [
                            { text: '介绍', link: '/intro' },
                            { text: '快速开始', link: '/quickstart' },
                            { text: '开发组件', link: '/addComponents' },
                            { text: '更新日志', link: '/changelog' }
                        ]
                    }
                ],
            },
        },
        search: {
            searchMaxSuggestions: 10,
        },
        repo: 'https://git.nucarf.cn/frontend/n-p-m/nfeui',
        repoLabel: 'GitLab',
        lastUpdated: true,
        prevLink: true,
        nextLink: true,
    },
};
