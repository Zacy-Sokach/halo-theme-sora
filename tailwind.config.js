/** @type {import('tailwindcss').Config} */
module.exports = {
  // content 数组告诉 Tailwind 哪些文件需要扫描来生成 CSS
  // 请根据你的实际项目结构调整这些路径
  content: [
    './index.html', // 如果你有 index.html
    './src/**/*.{js,ts,jsx,tsx,vue,html,css}', // 扫描 src 文件夹下的所有相关文件
    // 确保这里包含了你所有使用 Tailwind 类名的文件
  ],
  theme: {
    extend: {
      colors: {
        // 这里将你的 CSS 变量映射到 Tailwind 的颜色名称
        // 这样你就可以使用像 text-gray, bg-primary-900 等 Tailwind 类了
        gray: {
          light: 'var(--color-gray-light)',
          DEFAULT: 'var(--color-gray)',
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
          DEFAULT: 'var(--color-primary)',
        },
      },
    },
  },
  plugins: [],
}
