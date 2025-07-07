export function generateTOC() {
  const toc = document.getElementById("toc");
  const content = document.getElementById("post-content");
  const headings = content?.querySelectorAll("h1, h2, h3, h4");

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));

    // 创建 toc-item
    // <div class="toc-item-level-num"><a href="#id">heading</a></div>
    const item = document.createElement("div");
    item.className = "toc-item-level-" + level;
    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    item.appendChild(a);

    toc.appendChild(item);

    // 嵌套列表实现
    // if (level === 1) {
    //   toc.appendChild(item);
    // } else {
    //   if (heading.parentElement && heading.parentElement.id) {
    //     let parentLi = toc.querySelector(
    //       `li a[href="#${heading.parentElement.id}"]`,
    //     )?.parentElement;
    //     if (parentLi) {
    //       let ul = parentLi.querySelector("ul");
    //       if (!ul) {
    //         ul = document.createElement("ul");
    //         parentLi.appendChild(ul);
    //       }
    //       ul.appendChild(item);
    //     }
    //   }
    // }
  });
}

export function scrollHighlightTOC() {
  let activeId = null; // 记录当前激活的标题 ID

  // IntersectionObserver 监听哪些标题进入视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`#toc a[href="#${id}"]`);

        if (entry.isIntersecting) {
          // 如果一个标题进入视口，更新活跃标题
          if (activeId !== id) {
            if (activeId) {
              // 移除前一个标题的 active 类
              const activeLink = document.querySelector(
                `#toc a[href="#${activeId}"]`,
              );
              activeLink.parentElement.classList.remove("active");
            }
            // 添加当前标题的 active 类
            link.parentElement.classList.add("active");
            activeId = id; // 更新活跃标题
          }
        }

        // 最简单的方案
        // if (entry.isIntersecting) {
        //   link.parentElement.classList.add("active");
        // } else {
        //   link.parentElement.classList.remove("active");
        // }
      });
    },
    {
      // rootMargin: "-40% 0px -40% 0px",
    },
  );

  // 开始监听标题
  const headings = document.querySelectorAll("#post-content h1, h2, h3, h4");
  headings.forEach((heading) => observer.observe(heading));
}

// TODO 逻辑上有点问题，应该与 scrollHighlightTOC 配合
export function clickHighlightTOC() {
  document.querySelectorAll("#toc a").forEach((anchor) => {
    anchor.addEventListener("click", function () {
      document.querySelectorAll(`#toc .active`).forEach((element) => {
        element.classList.remove("active");
      });

      anchor.parentElement.classList.add("active");
    });
  });
}
