import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
  lang: 'en-US',
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    nav: nav(),

    sidebar: {
      // Blog
      '/blog/': { base: '/blog/', items: sidebarBlog() },

      // Middlewares
      '/middlewares/nginx/': { base: '/middlewares/nginx/', items: sidebarNginx() },
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2024312555号-1</a>',
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Blog',
      link: '/blog/2025/my-dotfiles',
      activeMatch: '/blog/'
    },
    {
      text: 'Projects',
      link: '/guide/what-is-vitepress',
      activeMatch: '/guide/'
    },
    {
      text: 'Cloud Native',
      items: [
        {
          text: 'Kubernetes',
          link: 'https://work.kugarocks.com'
        },
        {
          text: 'Docker',
          link: 'https://work.kugarocks.com'
        },
      ]
    },
    {
      text: 'Middlewares',
      items: [
        {
          text: 'Nginx',
          link: '/middlewares/nginx/what-is-vitepress'
        },
        {
          text: 'Redis',
          link: 'https://work.kugarocks.com'
        },
        {
          text: 'MySQL',
          link: 'https://work.kugarocks.com'
        },
      ]
    },
    {
      text: 'Books',
      items: [
        {
          text: 'Linux Basic',
          link: 'https://work.kugarocks.com'
        },
      ]
    },
    {
      text: 'Links',
      items: [
        {
          text: 'kugaworks',
          link: 'https://work.kugarocks.com'
        },
        {
          text: 'kugamusic',
          link: 'https://music.kugarocks.com'
        }
      ]
    }
  ]
}

function sidebarBlog(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '2025',
      collapsed: false,
      items: [
        { text: 'My Dotfiles', link: '2025/my-dotfiles' },
      ]
    },
    {
      text: '2024',
      collapsed: false,
      items: [
        { text: 'Neovim Setup', link: '2024/neovim-setup' },
        { text: 'Install Older macOS', link: '2024/install-older-macos' },
        { text: 'Compile Shadow Utils', link: '2024/compile-shadow-utils' },
        { text: 'Hello World', link: '2024/hello-world' },
      ]
    }
  ]
}

function sidebarNginx(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is VitePress?', link: 'what-is-vitepress' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
      ]
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is VitePress?', link: 'what-is-vitepress' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
        { text: 'Deploy', link: 'deploy' }
      ]
    },
    {
      text: 'Writing',
      collapsed: false,
      items: [
        { text: 'Markdown Extensions', link: 'markdown' },
        { text: 'Asset Handling', link: 'asset-handling' },
        { text: 'Frontmatter', link: 'frontmatter' },
        { text: 'Using Vue in Markdown', link: 'using-vue' },
        { text: 'Internationalization', link: 'i18n' }
      ]
    },
    {
      text: 'Customization',
      collapsed: false,
      items: [
        { text: 'Using a Custom Theme', link: 'custom-theme' },
        {
          text: 'Extending the Default Theme',
          link: 'extending-default-theme'
        },
        { text: 'Build-Time Data Loading', link: 'data-loading' },
        { text: 'SSR Compatibility', link: 'ssr-compat' },
        { text: 'Connecting to a CMS', link: 'cms' }
      ]
    },
    {
      text: 'Experimental',
      collapsed: false,
      items: [
        { text: 'MPA Mode', link: 'mpa-mode' },
        { text: 'Sitemap Generation', link: 'sitemap-generation' }
      ]
    },
    { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: 'site-config' },
        { text: 'Frontmatter Config', link: 'frontmatter-config' },
        { text: 'Runtime API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: 'Default Theme',
          base: '/reference/default-theme-',
          items: [
            { text: 'Overview', link: 'config' },
            { text: 'Nav', link: 'nav' },
            { text: 'Sidebar', link: 'sidebar' },
            { text: 'Home Page', link: 'home-page' },
            { text: 'Footer', link: 'footer' },
            { text: 'Layout', link: 'layout' },
            { text: 'Badge', link: 'badge' },
            { text: 'Team Page', link: 'team-page' },
            { text: 'Prev / Next Links', link: 'prev-next-links' },
            { text: 'Edit Link', link: 'edit-link' },
            { text: 'Last Updated Timestamp', link: 'last-updated' },
            { text: 'Search', link: 'search' },
            { text: 'Carbon Ads', link: 'carbon-ads' }
          ]
        }
      ]
    }
  ]
}
