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

      // Middleware
      '/middleware/nginx/': { base: '/middleware/nginx/', items: sidebarNginx() },

      // Linux
      '/linux/getting-started/': { base: '/linux/getting-started/', items: sidebarLinux() },
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
      text: 'Cloud Native',
      activeMatch: '/cloud-native/',
      items: [
        {
          text: 'Kubernetes',
          link: 'https://www.kugarocks.com'
        },
        {
          text: 'Docker',
          link: 'https://www.kugarocks.com'
        },
      ]
    },
    {
      text: 'Middleware',
      activeMatch: '/middleware/',
      items: [
        {
          text: 'Nginx',
          link: '/middleware/nginx/what-is-vitepress'
        },
        {
          text: 'Redis',
          link: 'https://www.kugarocks.com'
        },
        {
          text: 'MySQL',
          link: 'https://www.kugarocks.com'
        },
      ]
    },
    {
      text: 'Database',
      activeMatch: '/database/',
      items: [
        {
          text: 'MySQL',
          link: 'https://www.kugarocks.com'
        },
        {
          text: 'Clickhouse',
          link: 'https://www.kugarocks.com'
        },
      ]
    },
    {
      text: 'Linux',
      activeMatch: '/linux/',
      items: [
        {
          text: 'Getting Started',
          link: '/linux/getting-started/what-do-u-got'
        },
      ]
    },
    {
      text: 'Other',
      activeMatch: '/other/',
      items: [
        {
          text: 'Work Log',
          link: 'https://work.kugarocks.com'
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

function sidebarLinux(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'README',
      collapsed: true,
      items: [
        { text: 'WHAT DO U GOT', link: 'what-do-u-got' },
        { text: 'Say My Name', link: 'say-my-name' },
      ]
    },
    {
      text: 'Shell',
      collapsed: true,
      items: [
        { text: 'Terminal', link: 'shell/terminal' },
        { text: 'What is shell', link: 'shell/intro' },
        { text: 'Command History', link: 'shell/command-history' },
        { text: 'Basic Operations', link: 'shell/basic-operations' },
        { text: 'Command Type', link: 'shell/command-type' },
        { text: 'Shell Variables', link: 'shell/shell-variables' },
        { text: 'Subshell', link: 'shell/subshell' },
      ]
    },
    {
      text: 'Commands',
      collapsed: true,
      items: [
        { text: 'Common Commands 1', link: 'commands/common-1' },
        { text: 'Common Commands 2', link: 'commands/common-2' },
        { text: 'Grep', link: 'commands/grep' },
        { text: 'PS', link: 'commands/ps' },
        { text: 'TOP', link: 'commands/top' },
        { text: 'Terminate Process', link: 'commands/terminate' },
        { text: 'Compression', link: 'commands/compression' },
      ]
    },
    {
      text: 'Environment',
      collapsed: true,
      items: [
        { text: 'Concept', link: 'env/concept' },
        { text: 'Shell Startup Process', link: 'env/shell-startup' },
        { text: 'Environment Variables', link: 'env/variables' },
        { text: 'Shebang', link: 'env/shebang' },
      ]
    },
    {
      text: 'Permission',
      collapsed: true,
      items: [
        { text: 'User Management', link: 'perm/user-mgmt' },
        { text: 'Group Management', link: 'perm/group-mgmt' },
        { text: 'File Permission', link: 'perm/file-perm' },
        { text: 'Access Control List', link: 'perm/acl' },
      ]
    },
    {
      text: 'Process',
      collapsed: true,
      items: [
        { text: 'Systemd', link: 'proc/systemd' },
        { text: 'File Descriptor', link: 'proc/fd' },
        { text: 'Pipe', link: 'proc/pipe' },
        { text: 'LSOF', link: 'proc/lsof' },
        { text: 'ULIMIT', link: 'proc/ulimit' },
      ]
    },
    {
      text: 'File System',
      collapsed: true,
      items: [
        { text: 'Introduction', link: 'file-system/intro' },
      ]
    },
    {
      text: 'Shell Script',
      collapsed: true,
      items: [
        { text: 'Basic Syntax', link: 'script/syntax' },
        { text: 'Condition', link: 'script/cond' },
        { text: 'Loop', link: 'script/loop' },
        { text: 'Input', link: 'script/input' },
        { text: 'Output', link: 'script/output' },
        { text: 'Signal', link: 'script/signal' },
        { text: 'Function', link: 'script/func' },
        { text: 'Parameter Expansion', link: 'script/param-exp' },
        { text: 'Special Parameters', link: 'script/special-params' },
      ]
    },
    {
      text: 'Text Processing',
      collapsed: true,
      items: [
        { text: 'Multi-Lines Text', link: 'text/multi-lines' },
        { text: 'Regular Expression', link: 'text/regex' },
        { text: 'SED', link: 'text/sed' },
        { text: 'GAWK 1', link: 'text/gawk-1' },
        { text: 'GAWK 2', link: 'text/gawk-2' },
      ]
    },
    {
      text: 'Appendix',
      collapsed: true,
      items: [
        { text: 'Term 1', link: 'appendix/term-1' },
      ]
    },
  ]
}
