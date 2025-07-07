// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        // 确保您的 neutral 色阶在这里完整且正确地映射到 CSS 变量
        neutral: {
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)', // 根据您的 main.css 中的定义添加
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)', // 确保此项存在
          700: 'var(--color-neutral-700)', // 确保此项存在
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        // 完全移除 'gray' 的 'DEFAULT' 映射
        // 如果您的 HTML 中仍然使用了 text-gray-light 或 text-gray-dark
        // 则保留 light 和 dark 的映射，但如果没有，也可以考虑移除整个 gray 对象
        gray: {
            light: 'var(--color-gray-light)',
            // 移除 DEFAULT: 'var(--color-gray)',
            dark: 'var(--color-gray-dark)',
        },
        primary: { /* ... 确保您的 primary 颜色定义正确 ... */ },
      },
      // 可以在这里添加您的字体定义等
      fontFamily: {
        serif: 'var(--font-serif)',
        sans: 'var(--font-sans-serif)', // 注意 Tailwind 默认是 sans 而非 sans-serif
        mono: 'var(--font-mono)',
      },
      screens: {
        sm: 'var(--breakpoint-sm)',
        // ...其他断点
      }
    },
  },
  // 确保 Tailwind 扫描所有包含您 Tailwind 类名的文件
  content: [
    './src/**/*.{html,js,ts,vue,jsx,tsx}',
    './layouts/**/*.{html,js}', // 如果您有 layouts 目录
    './templates/**/*.{html,js}', // 如果您有 templates 目录
    './index.html', // 你的入口 html
    // ... 其他可能包含 Tailwind 类名的文件路径
  ],
  // ...
};
