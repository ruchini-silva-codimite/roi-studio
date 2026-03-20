import { initRouter } from "./router.js";
import { initState } from "./state.js";

function initApp() {
  initState();
  initRouter();

  document.getElementById("start-btn").addEventListener("click", () => {
    window.navigate("context");
  });

  document.getElementById("to-usage").addEventListener("click", () => {
    window.navigate("usage");
  });

  document.getElementById("to-operations").addEventListener("click", () => {
    window.navigate("operations");
  });

  document.getElementById("to-results").addEventListener("click", () => {
    window.navigate("results");
  });

  document.getElementById("edit-inputs").addEventListener("click", () => {
    window.navigate("context");
  });
}

initApp();
