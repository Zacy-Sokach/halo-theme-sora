import "./main.css";
//import "./test/lapis.css";

export * from "./TOC.js";
export * from "./upvote.js";
export * from "./sponsor.js";
export * from "./linkIcon.js";

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// 返回顶部按钮控制
const toTop = () => {
  const btn = document.querySelector(".to-top");
  if (!btn) return;
  
  const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const threshold = window.innerHeight / 2;
  
  btn.classList.toggle("active", scroll >= threshold);
};

// 使用节流优化滚动事件
window.addEventListener("scroll", throttle(toTop, 100));

// DOM 内容加载完成后的初始化
document.addEventListener("DOMContentLoaded", () => {
  initExternalLinks();
  initWordCountAndReadTime();
  initTimeTips();
});

// 初始化外部链接
function initExternalLinks() {
  // 修复链接匹配规则 - 应该是 'https://' 而不是 'https/'
  document.querySelectorAll("a[href^='https://']").forEach((link) => {
    // 检查是否为外部链接
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer"); // 添加 noreferrer 提高安全性
    }
  });
}

// 字数统计 + 预计阅读时间
function initWordCountAndReadTime() {
  const element = document.querySelector("#post-content");
  const wordCountEl = document.getElementById("post-wordcount");
  const readTimeEl = document.getElementById("post-readtime");
  
  if (!element || !wordCountEl || !readTimeEl) return;
  
  // 计算字数（排除代码块和标签）
  const textContent = element.textContent || element.innerText || "";
  const textLength = textContent.trim().length;
  
  // 显示字数
  wordCountEl.textContent = textLength.toLocaleString(); // 添加千分位分隔符
  
  // 计算阅读时间（中文阅读速度）
  const readTime = calculateReadTime(textLength);
  readTimeEl.textContent = readTime;
}

// 计算阅读时间
function calculateReadTime(textLength) {
  if (textLength === 0) return "0 min";
  
  // 中文阅读速度：250-350字/分钟
  const minTime = Math.ceil(textLength / 350);
  const maxTime = Math.ceil(textLength / 250);
  
  if (minTime === maxTime) {
    return `${maxTime} min`;
  } else {
    return `${minTime}~${maxTime} min`;
  }
}

// 计算两个日期之间的天数差
function calculateDaysBetween(date1, date2) {
  const time1 = new Date(date1).getTime();
  const time2 = new Date(date2).getTime();
  
  if (isNaN(time1) || isNaN(time2)) {
    console.warn("无效的日期格式");
    return 0;
  }
  
  const timeDifference = Math.abs(time2 - time1);
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

// 获取随机描述词
function getRandomTimePhrase() {
  const phrases = [
    "时过境迁",
    "沧海桑田", 
    "天翻地覆",
    "水流花落",
    "斗转星移",
    "物是人非",
    "时移世易",
    "物换星移",
    "春去秋来",
    "岁月如流",
    "时光荏苒",
    "白云苍狗"
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 初始化时效性提示
function initTimeTips() {
  const tipsSpan = document.getElementById("post-time-tips-span");
  if (!tipsSpan) return;
  
  const updateTimeEl = document.getElementById("post-update-time");
  const publishTimeEl = document.getElementById("post-publish-time");
  
  if (!updateTimeEl && !publishTimeEl) return;
  
  const dateText = updateTimeEl?.textContent || publishTimeEl?.textContent;
  const prefix = updateTimeEl ? "更新于 " : "发布于 ";
  
  const daysDiff = calculateDaysBetween(dateText, new Date().toISOString());
  
  // 只在文章比较旧时显示提示（比如超过 30 天）
  if (daysDiff >= 30) {
    const randomPhrase = getRandomTimePhrase();
    tipsSpan.textContent = `本文${prefix}${daysDiff} 天前，其中的信息可能已经${randomPhrase}`;
    tipsSpan.parentElement?.classList.remove('hidden'); // 显示提示元素
  }
}

// 导出函数供外部使用（保持向后兼容）
export function wordCountAndReadTime() {
  initWordCountAndReadTime();
}

export function generateTimeTips() {
  initTimeTips();
}

// 工具函数：防抖
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 工具函数：节流（导出供其他模块使用）
export { throttle };
