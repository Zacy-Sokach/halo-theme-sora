// tailwind.config.js
module.exports = {
  // 确保这里的 content 配置是完整的，包含了所有会用到 Tailwind 类名的文件
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}', // 确保扫描 .css 文件
    './templates/**/*.{html,js,ts}', // 如果您的 HTML 模板在 templates 目录下
    // './layouts/**/*.{html,js,ts}', // 如果您有 layouts 目录
    // 根据您的项目结构添加所有包含 Tailwind 类名的文件路径
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)', // 确保此项存在
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        gray: {
            light: 'var(--color-gray-light)',
            // 重新添加 DEFAULT，但同时提供 textColor 别名以确保兼容性
            DEFAULT: 'var(--color-gray)',
            dark: 'var(--color-gray-dark)',
        },
        primary: {
          100: 'var(--color-primary-100)',
          // ... 确保所有 primary 色阶也都在这里定义
          DEFAULT: 'var(--color-primary)', // 如果有
        },
      },
      // --- 关键修改：明确定义 text-gray 工具类 ---
      // 即使在 main.css 中已经替换，但在其他文件中或 Tailwind 内部处理时，
      // 如果仍然引用 text-gray，此定义将使其有效。
      textColor: {
        'gray': 'var(--color-neutral-600)', // 将 text-gray 映射到 neutral-600 对应的 CSS 变量
      },
      // 其他 extend 属性，例如字体、断点等
      fontFamily: {
        serif: 'var(--font-serif)',
        sans: 'var(--font-sans-serif)',
        mono: 'var(--font-mono)',
      },
      screens: {
        sm: 'var(--breakpoint-sm)',
        md: 'var(--breakpoint-md)',
        lg: 'var(--breakpoint-lg)',
        xl: 'var(--breakpoint-xl)',
        '2xl': 'var(--breakpoint-2xl)',
      }
    },
  },
  plugins: [
    // 确保您的 Tailwind 插件都在这里
    require('@iconify/tailwind4')
  ],
};
