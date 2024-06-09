import { DefaultTheme, defineConfig } from 'vitepress'
import { version, author } from '../package.json' assert { type: 'json' }

const title = '[LIB_NAME]'
const description = 'The free and open-source discord bot framework focused on type-safety and ease of use'

const Nav: DefaultTheme.NavItem[] = [
  {
    text: `v${version}`,
    items: [
      {
        text: 'Release Notes',
        link: 'https://github.com/quantix-dev/[LIB_NAME]/releases/latest',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/quantix-dev/[LIB_NAME]/blob/main/CONTRIBUTING.md',
      },
    ],
  }
]

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title,
  titleTemplate: title,
  description,
  srcDir: 'src',
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/[LIB_NAME].svg', type: 'image/svg+xml' }],
    ['meta', { rel: 'author', content: author }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { name: 'og:locale', content: 'en-GB' }],
    ['meta', { name: 'og:site_name', content: title }],
  ],
  lang: "en-GB",
  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    theme: 'monokai',
    lineNumbers: true,
  },

  sitemap: {
    hostname: 'https://[LIB_NAME].quantix.dev',
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {},
    editLink: {
      pattern: 'https://github.com/quantix-dev/[LIB_NAME]/edit/main/docs/:path',
      text: 'Contribute to this page on GitHub',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/quantix-dev/[LIB_NAME]' },
    ],
    footer: {
      message: "Released under the MIT License",
      copyright: "Copyright © 2024-PRESENT Quantix"
    }
  },
})
