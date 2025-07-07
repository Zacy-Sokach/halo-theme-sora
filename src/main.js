import "./main.css";
//import "./test/lapis.css";

export * from "./TOC.js";
export * from "./upvote.js";
export * from "./sponsor.js";
export * from "./linkIcon.js";

// 定义 main 对象，包含所有主要的客户端逻辑
window.main = {
  // 返回页首按钮的显示/隐藏逻辑
  to_top: function () {
    var btn = document.getElementsByClassName("to-top")[0];
    var scroll =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    // 只有当按钮存在时才操作
    if (btn) {
      scroll >= window.innerHeight / 2
        ? btn.classList.add("active")
        : btn.classList.remove("active");
    }
  },

  // 字数统计 + 预计阅读时间
  wordCountAndReadTime: function () {
    const element = document.querySelector("#post-content");
    const postWordcountSpan = document.getElementById("post-wordcount");
    const postReadtimeSpan = document.getElementById("post-readtime");

    if (element && postWordcountSpan && postReadtimeSpan) {
      const textLength = element.textContent.length;
      postWordcountSpan.textContent = textLength;

      const min = Math.round(textLength / 350);
      const max = Math.round(textLength / 250);
      if (min === max) {
        postReadtimeSpan.textContent = `${max} min`;
      } else {
        postReadtimeSpan.textContent = `${min}~${max} min`;
      }
    }
  },

  // 文章时效性提示
  generateTimeTips: function () {
    const now = Date.now();
    const postPublishTime = document.getElementById("post-publish-time");
    const postUpdateTime = document.getElementById("post-update-time");
    const postTimeTipsSpan = document.getElementById("post-time-tips-span");

    if (postTimeTipsSpan) {
      const date = postUpdateTime ? postUpdateTime.textContent : postPublishTime.textContent;
      const prefix = postUpdateTime ? "更新于 " : "发布于 ";

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

      const countDaysBetween = (isoDate1, isoDate2) => {
        const date1 = new Date(isoDate1);
        const date2 = new Date(isoDate2);
        const timeDifference = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      };

      postTimeTipsSpan.textContent =
        "本文" +
        prefix +
        countDaysBetween(date, now) +
        " 天前，其中的信息可能已经" +
        randomWords[randomIndex];
    }
  },

  // 主题切换逻辑
  initThemeToggle: function () {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // <html> 标签
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) {
    console.warn('深色模式切换按钮未找到');
    return;

    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // 根据当前主题设置初始图标显示状态
    if (sunIcon && moonIcon) {
      if (htmlElement.classList.contains('dark')) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }

    // 添加按钮点击事件监听器
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');

        if (htmlElement.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
          if (sunIcon && moonIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
          }
        } else {
          localStorage.setItem('theme', 'light');
          if (sunIcon && moonIcon) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
          }
        }
      });
    }

    // 监听系统主题变化，如果用户没有手动选择主题，则响应系统变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (!localStorage.getItem('theme')) { // 仅当用户未手动设置主题时才响应
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
  }
};

// 页面加载完成时执行所有初始化逻辑
document.addEventListener("DOMContentLoaded", () => {
  // 返回页首按钮的滚动监听
  window.addEventListener("scroll", main.to_top);
  main.to_top(); // 页面加载时执行一次以确定初始状态

  // 外部链接在新窗口打开
  document.querySelectorAll("a[href^='https://']").forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });

  // 主题切换初始化
  main.initThemeToggle();

  // 以下是你之前在 post.html 的 DOMContentLoaded 中调用的函数
  // 确保这些函数在 main.js 中被导出或者作为 main 对象的方法
  if (typeof main.generateTOC === 'function') { // 检查函数是否存在
    main.generateTOC();
  }
  if (typeof main.scrollHighlightTOC === 'function') {
    main.scrollHighlightTOC();
  }
  if (typeof main.clickHighlightTOC === 'function') {
    main.clickHighlightTOC();
  }
  
  // 确保这些函数仅在相关元素存在时才执行，例如在文章详情页
  const postContent = document.getElementById("post-content");
  if (postContent) {
    main.wordCountAndReadTime();
    main.generateTimeTips();
  }

  // 确保 addIconToLinks, upvote, sponsor 在 main.js 中被导出或作为 main 对象方法
  // 并且只在需要它们的页面执行 (例如文章详情页)
  if (typeof main.addIconToLinks === 'function') {
    main.addIconToLinks();
  }
  if (typeof main.upvote === 'function') {
    main.upvote();
  }
  // Sponsor 逻辑可能需要根据 theme.config.sponsor.enable 来判断是否执行
  // 这里简化为直接调用，如果 sponsor.js 内部有判断机制则不会有问题
  if (typeof main.sponsor === 'function' && document.getElementById('sponsor-button')) {
    main.sponsor();
  }
});
