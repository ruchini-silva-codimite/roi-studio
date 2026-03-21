function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function renderSummaryPanel(state) {
  document.querySelectorAll("#summary-panel").forEach((container) => {
    container.innerHTML = `
      <div class="summary-card">
        <h3>Current Summary</h3>

        <div class="summary-item">
          <span class="summary-label">Scenario</span>
          <span class="summary-value">${state.organization.scenario}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Industry</span>
          <span class="summary-value">${state.organization.industry}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Users</span>
          <span class="summary-value">${state.organization.users}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Apps/day</span>
          <span class="summary-value">${state.productivity.appsPerUserPerDay}</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">Launch today</span>
          <span class="summary-value">${state.productivity.timeToLaunchWithout}s</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">With VLauncher</span>
          <span class="summary-value">${state.productivity.timeToLaunchWith}s</span>
        </div>

        <div class="summary-item">
          <span class="summary-label">VLauncher cost</span>
          <span class="summary-value">${formatCurrency(state.cost.vlauncherCostPerUserPerYear)}</span>
        </div>
      </div>
    `;
  });
}
