export function upvote() {
  const button = document.getElementById("upvote-button");
  const postId = button.dataset.postId;
  const localStorageName = "upvote.post.ids";

  // 初始化当前文章点赞状态
  const upvotedPostIds = getUpvotedPostIds(localStorageName);
  if (upvotedPostIds.includes(postId)) {
    activeUpvote(button);
  }

  // 监听点击事件
  button.addEventListener("click", function () {
    handleUpvote(postId, localStorageName, button);
  });
}

function getUpvotedPostIds(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}

function activeUpvote(upvoteNode) {
  if (upvoteNode) {
    upvoteNode.classList.add("active");
    upvoteNode.classList.remove("cursor-pointer");
  }
}

function handleUpvote(postId, localStorageName, button) {
  // 检查当前文章点赞状态，若已点赞则结束函数
  const upvotedPostIds = getUpvotedPostIds(localStorageName);
  if (upvotedPostIds.includes(postId)) {
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/apis/api.halo.run/v1alpha1/trackers/upvote");
  xhr.onload = () => {
    // 存储当前文章点赞状态
    upvotedPostIds.push(postId);
    localStorage.setItem(localStorageName, JSON.stringify(upvotedPostIds));

    // 增加点赞数
    const upvoteNode = document.getElementById("upvote-number");
    if (upvoteNode) {
      const num = parseInt(upvoteNode.innerText);
      upvoteNode.innerText = num + 1;
    }

    // 激活已点赞样式
    activeUpvote(button);
  };
  xhr.onerror = () => {
    alert("网络请求失败，请稍后再试");
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      group: "content.halo.run",
      plural: "posts",
      name: postId,
    }),
  );
}
