export function initRouter() {
  window.navigate = (screen) => {
    document.querySelectorAll(".screen").forEach((el) => {
      el.classList.remove("active");
    });

    const target = document.getElementById(`screen-${screen}`);
    if (target) target.classList.add("active");
  };
}
