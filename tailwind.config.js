/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html,css,liquid,php,go,md,mdx}', // 确保这里包含了所有您的文件类型
    // 如果您的项目有其他文件夹，例如 layouts, components，也请添加到这里
    './layouts/**/*.{html,js,ts,vue,jsx,tsx,liquid,php,go,md,mdx}',
    './components/**/*.{html,js,ts,vue,jsx,tsx,liquid,php,go,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 定义 neutral 灰色系，与您 main.css 中的变量保持一致
        neutral: {
          100: 'var(--color-neutral-100)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          // 如果您的 CSS 中还定义了其他 neutral-xxx 变量，请在这里也添加映射
          // 例如：
          // 200: 'var(--color-neutral-200)',
          // 300: 'var(--color-neutral-300)',
          // ...
        },
        // 如果您在 main.css 中仍然有 --color-gray, --color-gray-light, --color-gray-dark，
        // 并且希望继续使用 text-gray-light, text-gray-dark 这样的类名，
        // 可以将它们映射为自定义的名称，例如 'custom-gray'，以避免与 Tailwind 内部的 'gray' 冲突。
        'custom-gray': {
          light: 'var(--color-gray-light)',
          DEFAULT: 'var(--color-gray)', // 这将允许您使用 text-custom-gray
          dark: 'var(--color-gray-dark)',
        },
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
          DEFAULT: 'var(--color-primary)', // 这将允许您使用 text-primary
          soft: 'var(--color-primary-soft)', // 确保这个也包含
        },
      },
    },
  },
  plugins: [], // 如果您有安装 @tailwindcss/typography，请确保它在这里
};
