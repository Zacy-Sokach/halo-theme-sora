// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        neutral: {
          100: 'var(--color-neutral-100)',
          // ...确保所有您需要的 neutral 色阶都在这里定义
          600: 'var(--color-neutral-600)', // 确保这一行存在
          // ...
        },
        // 如果所有 HTML 和 CSS 文件都不再使用 text-gray-light 或 text-gray-dark
        // 那么您可以考虑完全移除 'gray' 这个对象
        // 如果仍然需要 text-gray-light / text-gray-dark，请保留它们，但移除 DEFAULT
        gray: {
            light: 'var(--color-gray-light)',
            // DEFAULT: 'var(--color-gray)', // <-- 现在可以安全地删除这一行了
            dark: 'var(--color-gray-dark)',
        },
        primary: { /* ... */ },
      },
      // 确保这里没有 textColor: { 'gray': ... } 的别名了，因为它现在是多余的
      // textColor: {
      //   'gray': 'var(--color-neutral-600)',
      // },
      // ...
    },
  },
  // ...
};
