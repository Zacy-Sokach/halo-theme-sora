export function sponsor() {
  const button = document.getElementById("sponsor-button");
  const page = document.getElementById("sponsor-page");

  button.addEventListener("click", function () {
    const overlay = document.createElement("div");
    overlay.className = "fixed top-0 left-0 w-full h-full z-9";
    document.body.appendChild(overlay);

    page.classList.remove("hidden");
    button.classList.add("active");

    overlay.addEventListener("click", function () {
      document.body.removeChild(overlay);
      page.classList.add("hidden");
      button.classList.remove("active");
    });
  });
}
