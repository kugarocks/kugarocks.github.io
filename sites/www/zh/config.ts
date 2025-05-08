import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
  lang: 'zh-Hans',
  description: '',

  themeConfig: {
    nav: nav(),

    search: { options: searchOptions() },

    sidebar: {
      // Blog
      '/zh/blog/': { base: '/zh/blog/', items: sidebarBlog() },

      // Linux
      '/zh/linux/getting-started/': { base: '/zh/linux/getting-started/', items: sidebarLinux() },
    },


    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2024312555号-1</a>'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: 'deep',
    },

    lastUpdated: {
      text: '最后更新于'
    },

    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Blog',
      link: '/zh/blog/2025/my-dotfiles',
      activeMatch: '/blog/'
    },
    {
      text: 'Linux',
      activeMatch: '/linux/',
      items: [
        {
          text: 'Getting Started',
          link: '/linux/getting-started/meme'
        },
      ]
    },
  ]
}

function sidebarBlog(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '2025',
      collapsed: false,
      items: [
        { text: '我的 Dotfiles', link: '2025/my-dotfiles' }
      ]
    },
    {
      text: '2024',
      collapsed: false,
      items: [
        { text: 'Neovim 配置', link: '2024/neovim-setup' },
        { text: '安装旧版 macOS', link: '2024/install-older-macos' },
        { text: '编译 Shadow Utils', link: '2024/compile-shadow-utils' },
        { text: 'Hello World', link: '2024/hello-world' }
      ]
    }
  ]
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}

function sidebarLinux(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'README',
      collapsed: true,
      items: [
        { text: 'Meme', link: 'meme' },
        { text: 'Say My Name', link: 'say-my-name' },
      ]
    },
    {
      text: 'Shell',
      collapsed: true,
      items: [
        { text: '终端', link: 'shell/terminal' },
        { text: 'Shell 简介', link: 'shell/intro' },
        { text: '命令行历史记录', link: 'shell/command-history' },
        { text: 'Shell 基本操作', link: 'shell/basic-operations' },
        { text: '内建命令和外部命令', link: 'shell/command-type' },
        { text: 'Shell 变量', link: 'shell/shell-variables' },
        { text: 'Subshell', link: 'shell/subshell' },
      ]
    },
    {
      text: '命令',
      collapsed: true,
      items: [
        { text: '常用命令 1', link: 'commands/common-1' },
        { text: '常用命令 2', link: 'commands/common-2' },
        { text: 'GREP', link: 'commands/grep' },
        { text: 'PS', link: 'commands/ps' },
        { text: 'TOP', link: 'commands/top' },
        { text: '终止进程', link: 'commands/terminate' },
        { text: '压缩与解压', link: 'commands/compression' },
      ]
    },
    {
      text: '环境变量',
      collapsed: true,
      items: [
        { text: '概念', link: 'env/concept' },
        { text: 'Shell 的启动过程', link: 'env/shell-startup' },
        { text: '常见环境变量', link: 'env/variables' },
        { text: 'Shebang', link: 'env/shebang' },
      ]
    },
    {
      text: '权限管理',
      collapsed: true,
      items: [
        { text: '用户管理', link: 'perm/user-mgmt' },
        { text: '组管理', link: 'perm/group-mgmt' },
        { text: '文件权限', link: 'perm/file-perm' },
        { text: '访问控制列表', link: 'perm/acl' },
      ]
    },
    {
      text: '进程',
      collapsed: true,
      items: [
        { text: 'Systemd', link: 'proc/systemd' },
        { text: '文件描述符', link: 'proc/fd' },
        { text: '管道', link: 'proc/pipe' },
        { text: 'LSOF', link: 'proc/lsof' },
        { text: 'ULIMIT', link: 'proc/ulimit' },
      ]
    },
    {
      text: '文件系统',
      collapsed: true,
      items: [
        { text: '简介', link: 'file-system/intro' },
      ]
    },
    {
      text: 'Shell 脚本',
      collapsed: true,
      items: [
        { text: '基本语法', link: 'script/syntax' },
        { text: '条件结构', link: 'script/cond' },
        { text: '循环结构', link: 'script/loop' },
        { text: '输入处理', link: 'script/input' },
        { text: '输出处理', link: 'script/output' },
        { text: '信号处理', link: 'script/signal' },
        { text: '函数', link: 'script/func' },
        { text: '参数展开', link: 'script/param-exp' },
        { text: '特殊参数', link: 'script/special-params' },
      ]
    },
    {
      text: '文本处理',
      collapsed: true,
      items: [
        { text: '创建多行文本', link: 'text/multi-lines' },
        { text: '正则表达式', link: 'text/regex' },
        { text: 'SED', link: 'text/sed' },
        { text: 'GAWK 1', link: 'text/gawk-1' },
        { text: 'GAWK 2', link: 'text/gawk-2' },
      ]
    },
    {
      text: '附录',
      collapsed: true,
      items: [
        { text: '专业术语 1', link: 'appendix/term-1' },
      ]
    },
  ]
}
