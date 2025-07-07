import "./main.css";
//import "./test/lapis.css";

export * from "./TOC.js";
export * from "./upvote.js";
export * from "./sponsor.js";
export * from "./linkIcon.js";

var to_top = function () {
  var btn = document.getElementsByClassName("to-top")[0];
  var scroll =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  scroll >= window.innerHeight / 2
    ? btn.classList.add("active")
    : btn.classList.remove("active");
};

// 返回页首
window.addEventListener("scroll", to_top);

// 使得外部链接在新窗口中打开
document.addEventListener("DOMContentLoaded", () => {
  /* // 获取所有链接
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    // 判断是否为外部链接
    if (link.href.startsWith("https://")) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  }); */

  document.querySelectorAll("a[href^='https://']").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
});

// 字数统计 + 预计阅读时间
//
export function wordCountAndReadTime() {
  // 获取指定的元素
  const element = document.querySelector("#post-content");
  // 计算字数
  const textLength = element.textContent.length;
  // 将字数显示在 HTML 中
  document.getElementById("post-wordcount").textContent = textLength;

  //
  document.getElementById("post-readtime").textContent = (function () {
    const min = Math.round(textLength / 350);
    const max = Math.round(textLength / 250);
    if (min == max) {
      return `${max} min`;
    } else {
      return `${min}~${max} min`;
    }
  })();
}

// 文章时效性提示

function countDaysBetween(isoDate1, isoDate2) {
  // 将 ISO 8601 时间字符串解析为 Date 对象
  const date1 = new Date(isoDate1);
  const date2 = new Date(isoDate2);
  // 转换为时间戳（毫秒）
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  // 计算时间差（毫秒），并转换为天数
  const timeDifference = Math.abs(time2 - time1); // 取绝对值，确保结果为正数
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export function generateTimeTips() {
  const now = Date.now();
  const date =
    document.getElementById("post-update-time") === null
      ? document.getElementById("post-publish-time").textContent
      : document.getElementById("post-update-time").textContent;

  const prefix =
    document.getElementById("post-update-time") === null
      ? "发布于 "
      : "更新于 ";

  const randomWords = [
    "时过境迁",
    "沧海桑田",
    "天翻地覆",
    "水流花落",
    "斗转星移",
    "物是人非",
    "时移世易",
    "物换星移",
    "春去秋来",
  ];
  const randomIndex = Math.floor(Math.random() * randomWords.length);

  document.getElementById("post-time-tips-span").textContent =
    "本文" +
    prefix +
    countDaysBetween(date, now) +
    " 天前，其中的信息可能已经" +
    randomWords[randomIndex];
}

// 这是您找到的原始 main.js (或其他名称) 文件的内容
// ... 现有代码 ...

// 从这里开始添加主题切换逻辑
(function() { // 使用 IIFE (立即执行函数表达式) 包裹，确保变量不会污染全局作用域
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement; // 这就是 <html> 标签
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  // 1. 检查用户的系统偏好（首次加载或没有 localStorage 时）
  //    以及从 localStorage 读取保存的偏好
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 根据保存的偏好或系统偏好设置初始主题
  // 注意：这段代码在 <head> 中执行时，DOM 可能还没有完全加载，
  // 所以对于 sunIcon 和 moonIcon 的操作，最好放在 DOMContentLoaded 事件监听器中
  // 或者确保这些图标的 HTML 元素在 JS 执行前就存在于 DOM 中。
  // 但对于 htmlElement.classList.add/remove('dark') 是没问题的。
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  // 确保在 DOM 完全加载后再操作图标和添加事件监听器
  document.addEventListener('DOMContentLoaded', () => {
    // 初始图标显示状态 (根据页面加载时 htmlElement 上的 'dark' 类)
    if (htmlElement.classList.contains('dark')) {
      if (sunIcon && moonIcon) {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
      }
    } else {
      if (sunIcon && moonIcon) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
      }
    }

    // 2. 添加按钮点击事件监听器
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        // 切换 dark 类
        htmlElement.classList.toggle('dark');

        // 更新 localStorage
        if (htmlElement.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
          // 切换图标
          if (sunIcon && moonIcon) {
              sunIcon.classList.add('hidden');
              moonIcon.classList.remove('hidden');
          }
        } else {
          localStorage.setItem('theme', 'light');
          // 切换图标
          if (sunIcon && moonIcon) {
              sunIcon.classList.remove('hidden');
              moonIcon.classList.add('hidden');
          }
        }
      });
    }

    // 可选：监听系统主题变化，并更新 UI（如果用户没有手动选择主题）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      // 只有当用户没有手动选择主题时，才响应系统主题变化
      if (!localStorage.getItem('theme')) {
        if (event.matches) {
          htmlElement.classList.add('dark');
          if (sunIcon && moonIcon) {
              sunIcon.classList.add('hidden');
              moonIcon.classList.remove('hidden');
          }
        } else {
          htmlElement.classList.remove('dark');
          if (sunIcon && moonIcon) {
              sunIcon.classList.remove('hidden');
              moonIcon.classList.add('hidden');
          }
        }
      }
    });
  });

})(); // IIFE 结束
