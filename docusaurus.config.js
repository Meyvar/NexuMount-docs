// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'NexuMount',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://meyvar.github.io',
    baseUrl: '/NexuMount-docs/',

    organizationName: 'meyvar', // Usually your GitHub org/user name.
    projectName: 'NexuMount-docs', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'zh-CN',
        locales: ['zh-CN'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl:
                        'https://github.com/Meyvar/NexuMount-docs/edit/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                logo: {
                    alt: 'NexuMount',
                    src: 'img/icon.png',
                },
                items: [
                    {
                        to: '/docs/guide',
                        label: '使用指南',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/facebook/docusaurus',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: '使用指南',
                                to: '/docs/guide',
                            },
                        ],
                    },
                    {
                        title: '社区',
                        items: [
                            {
                                label: 'discussions',
                                href: 'https://github.com/Meyvar/NexuMount/discussions',
                            },
                        ],
                    },
                    {
                        title: '更多',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/Meyvar/NexuMount',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} NexuMount, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
