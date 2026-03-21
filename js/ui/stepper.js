const steps = [
  { id: "context", label: "Context" },
  { id: "usage", label: "Usage" },
  { id: "operations", label: "Operations" },
  { id: "results", label: "Results" }
];

export function renderStepper(currentStep) {
  document.querySelectorAll("#stepper").forEach((container) => {
    container.innerHTML = `
      <div class="stepper">
        ${steps
          .map((step, index) => {
            const isActive = step.id === currentStep;
            const isComplete = steps.findIndex((item) => item.id === currentStep) > index;

            return `
              <div class="step-item ${isActive ? "active" : ""} ${isComplete ? "complete" : ""}">
                <div class="step-marker">${index + 1}</div>
                <div class="step-label">${step.label}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  });
}
