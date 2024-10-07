import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AppYudame backend',
  description: 'AppYudame-NodeJS',
  themeConfig: {
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Setup and development', link: '/development' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Naming cheatsheet', link: '/naming-cheatsheet' },
          { text: 'Linting and formatting', link: '/linting' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
