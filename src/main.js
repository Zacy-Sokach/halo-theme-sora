import "./main.css";
//import "./test/lapis.css"; // 如果不需要，请保持注释或删除

export * from "./TOC.js";
export * from "./upvote.js";
export * from "./sponsor.js";
export * from "./linkIcon.js";

// 定义 main 对象，包含所有主要的客户端逻辑
window.main = {
  // 返回页首按钮的显示/隐藏逻辑
  to_top: function () {
    const btn = document.getElementsByClassName("to-top")[0];
    const scroll =
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
    // 修正：删除重复的 themeToggle 声明
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // <html> 标签
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // **修正：这里的 `if (!themeToggle)` 逻辑应该包含整个 `initThemeToggle` 的剩余部分，
    // 或者在函数开头进行检查，避免后续代码依赖一个可能不存在的元素。
    // 但是，考虑到我们希望即使没有按钮也能初始化主题，我们把按钮的隐藏/显示逻辑放在后面。**

    // 获取主题配置
    // 确保 window.themeConfig 存在，并从 general 组获取设置
    const defaultThemeMode = window.themeConfig?.general?.default_theme_mode || 'system';
    const enableThemeToggleButton = window.themeConfig?.general?.enable_theme_toggle_button === '1'; // 注意：Halo 后台开关值是字符串 '1' 或 '0'

    // 根据后台配置决定是否显示主题切换按钮
    if (themeToggle) {
      if (enableThemeToggleButton) {
        themeToggle.style.display = 'block'; // 显示按钮
      } else {
        themeToggle.style.display = 'none'; // 隐藏按钮
      }
    } else {
      // 如果按钮本身就不存在，发出警告（仅在调试时有用）
      console.warn('主题切换按钮（#theme-toggle）未找到。');
    }

    // 初始化主题：根据 localStorage 存储的偏好，或后台设置的默认模式，或系统偏好设置
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = '';
    if (savedTheme) { // 优先使用用户在 localStorage 中保存的设置
      currentTheme = savedTheme;
    } else { // 如果没有保存的设置，则根据后台配置的默认模式或系统偏好
      if (defaultThemeMode === 'dark') {
        currentTheme = 'dark';
      } else if (defaultThemeMode === 'light') {
        currentTheme = 'light';
      } else { // defaultThemeMode === 'system'
        currentTheme = prefersDark ? 'dark' : 'light';
      }
    }

    if (currentTheme === 'dark') {
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

    // 添加按钮点击事件监听器（只有当按钮存在且被启用时才添加）
    if (themeToggle && enableThemeToggleButton) {
      themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark'); // 切换 dark 类

        if (htmlElement.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark'); // 保存用户选择到 localStorage
          if (sunIcon && moonIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
          }
        } else {
          localStorage.setItem('theme', 'light'); // 保存用户选择到 localStorage
          if (sunIcon && moonIcon) {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
          }
        }
      });
    }

    // 监听系统主题变化：仅当用户未手动选择主题，并且后台配置为“跟随系统”时才响应
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (!localStorage.getItem('theme') && defaultThemeMode === 'system') {
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
