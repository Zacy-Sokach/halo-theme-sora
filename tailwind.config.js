/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html,css}',
    // 确保这里包含了你所有使用 Tailwind 类名的文件
  ],
  theme: {
    extend: {
      colors: {
        // 直接覆盖或扩展 Tailwind 的 'gray' 色板
        // 注意：这种方式在 Tailwind v4 中可能需要确保所有数字色阶都已定义，
        // 否则你可能无法使用 text-gray-100, text-gray-200 等类。
        gray: {
          light: 'var(--color-gray-light)',
          DEFAULT: 'var(--color-gray)', // 这将让 text-gray 指向 --color-gray
          dark: 'var(--color-gray-dark)',
          // 如果您在 HTML 中有 text-gray-100, text-gray-200 等，
          // 您也需要在这里将它们映射到相应的 CSS 变量。
          // 例如，如果您的 --color-neutral-100 对应 text-gray-100，则：
          100: 'var(--color-neutral-100)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
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
          DEFAULT: 'var(--color-primary)',
          soft: 'var(--color-primary-soft)', // 不要忘记这个
        },
      },
    },
  },
  plugins: [],
}
