import { initRouter } from "./router.js";
import { initState } from "./state.js";
import { renderResults } from "./ui/results.js";
import { renderAllForms } from "./ui/inputs.js";

function initApp() {
    initState();
    initRouter();
    renderAllForms(window.appState);

    // Navigation Wiring
    document.getElementById("start-btn").addEventListener("click", () => {
        window.navigate("context");
    });

    document.getElementById("to-landing").addEventListener("click", () => {
        window.navigate("landing");
    });

    document.getElementById("to-usage").addEventListener("click", () => {
        window.navigate("usage");
    });

    document.getElementById("to-context").addEventListener("click", () => {
        window.navigate("context");
    });

    document.getElementById("to-operations").addEventListener("click", () => {
        window.navigate("operations");
    });

    document.getElementById("to-usage-back").addEventListener("click", () => {
        window.navigate("usage");
    });

    document.getElementById("to-results").addEventListener("click", () => {
        renderResults(window.appState);
        window.navigate("results");
    });

    document.getElementById("edit-inputs").addEventListener("click", () => {
        renderAllForms(window.appState); // Refresh forms
        window.navigate("context");
    });
}

initApp();
