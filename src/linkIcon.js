// import { parseDomain } from "parse-domain";

export function addIconToLinks() {
  // 选择所有站外链接
  const links = document.querySelectorAll(
    `#post-content a[href^="https://"]:not([href*="${window.location.hostname}"])`,
  );

  links.forEach((link) => {
    const faviconMap = {
      "github.com": "favicons/github.svg",
      "halo.run": "favicons/halo.webp",
    };
    const url = new URL(link.href);
    // const favicon = iconMap[url.hostname];
    let favicon = "";
    for (const [key, value] of Object.entries(faviconMap)) {
      if (url.hostname.includes(key)) {
        favicon = value;
        break;
      }
    }
    const faviconUrl = new URL(favicon, import.meta.url);
    // 使用 Google 的 favicon 服务获取目标网站的 favicon
    // const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;

    // 创建图标元素
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.width = "1rem";
    span.style.height = "1rem";
    span.style.marginRight = "0.2rem";

    if (favicon) {
      span.style.backgroundImage = `url(${faviconUrl})`;
      span.style.backgroundSize = "contain";
      // span.style.position = "relative";
      // span.style.top = "0.1rem";
      span.style.verticalAlign = "-0.1rem";
    } else {
      span.className = "icon-[pajamas--external-link] iconify-inline text-gray";
    }

    link.insertBefore(span, link.firstChild);

    // 检查链接前面是否有空格
    // 若没有空格，则插入一个空格
    const previousSibling = link.previousSibling;
    if (
      !(
        previousSibling &&
        previousSibling.nodeType === Node.TEXT_NODE &&
        previousSibling.textContent.trim() === ""
      )
    ) {
      link.insertAdjacentText("beforebegin", " ");
    }
  });
}
