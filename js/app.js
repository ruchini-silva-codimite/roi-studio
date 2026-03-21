import { initRouter } from "./router.js";
import { initState } from "./state.js";
import { renderResults } from "./ui/results.js";
import { renderAllForms } from "./ui/inputs.js";
import { renderStepper } from "./ui/stepper.js";
import { renderSummaryPanel } from "./ui/summary.js";

function renderShell(step) {
  renderStepper(step);
  renderSummaryPanel(window.appState);
}

function goToStep(step) {
  renderShell(step);
  window.navigate(step);
}

function initApp() {
  initState();
  initRouter();
  renderAllForms(window.appState);

  document.getElementById("start-btn").addEventListener("click", () => {
    goToStep("context");
  });

  document.getElementById("to-usage").addEventListener("click", () => {
    renderAllForms(window.appState);
    goToStep("usage");
  });

  document.getElementById("back-to-context").addEventListener("click", () => {
    renderAllForms(window.appState);
    goToStep("context");
  });

  document.getElementById("to-operations").addEventListener("click", () => {
    renderAllForms(window.appState);
    goToStep("operations");
  });

  document.getElementById("back-to-usage").addEventListener("click", () => {
    renderAllForms(window.appState);
    goToStep("usage");
  });

  document.getElementById("to-results").addEventListener("click", () => {
    renderResults(window.appState);
    goToStep("results");
  });

  document.getElementById("edit-inputs").addEventListener("click", () => {
    renderAllForms(window.appState);
    goToStep("context");
  });
}

initApp();
