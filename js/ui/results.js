import { calculateROI } from "../model/calculator.js";

export const renderResults = (state) => {
  const container = document.getElementById("results-container");
  const results = calculateROI(state.inputs);

  const formatCurrency = (val) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  container.innerHTML = `
    <div class="results-summary">
      <h3>Projected Annual Savings: \${formatCurrency(results.total)}</h3>
    </div>
    <div class="results-grid">
      <div class="result-card">
        <div class="result-label">Productivity Gain</div>
        <div class="result-value">\${formatCurrency(results.productivity)}</div>
      </div>
      <div class="result-card">
        <div class="result-label">IT Operational Savings</div>
        <div class="result-value">\${formatCurrency(results.itOps)}</div>
      </div>
      <div class="result-card">
        <div class="result-label">CapEx Avoidance</div>
        <div class="result-value">\${formatCurrency(results.capEx)}</div>
      </div>
    </div>
  `;
};
