import { calculateRoiSummary } from "../model/calculator.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(value);
}

export function renderResults(state) {
  const results = calculateRoiSummary(state);
  const container = document.getElementById("results-container");

  container.innerHTML = `
    <div class="results-block">
      <h3>Top Summary</h3>
      <div class="results-grid">
        <div class="result-card">
          <div class="result-label">Annual Savings</div>
          <div class="result-value">${formatCurrency(results.totals.totalSavings)}</div>
        </div>
        <div class="result-card">
          <div class="result-label">VLauncher Annual Cost</div>
          <div class="result-value">${formatCurrency(results.totals.annualCost)}</div>
        </div>
        <div class="result-card">
          <div class="result-label">Net Benefit</div>
          <div class="result-value">${formatCurrency(results.totals.netBenefit)}</div>
        </div>
        <div class="result-card">
          <div class="result-label">ROI</div>
          <div class="result-value">${formatNumber(results.totals.roiPercent)}%</div>
        </div>
        <div class="result-card">
          <div class="result-label">Payback Period</div>
          <div class="result-value">${
            results.totals.paybackMonths === null
              ? "N/A"
              : `${formatNumber(results.totals.paybackMonths)} months`
          }</div>
        </div>
      </div>
    </div>

    <div class="results-block">
      <h3>Hard ROI</h3>
      <ul>
        <li>IT Support Savings: ${formatCurrency(results.breakdown.hardRoi.itOps.annualValue)}</li>
        <li>Onboarding Savings: ${formatCurrency(results.breakdown.hardRoi.onboarding.annualValue)}</li>
        <li>Traveler Savings: ${formatCurrency(results.breakdown.hardRoi.travelers.annualValue)}</li>
      </ul>
    </div>

    <div class="results-block">
      <h3>Productivity ROI</h3>
      <ul>
        <li>Launch Time Savings: ${formatCurrency(results.breakdown.productivity.launch.annualValue)}</li>
        <li>Focus Recovery Savings: ${formatCurrency(results.breakdown.productivity.focus.annualValue)}</li>
      </ul>
    </div>
  `;
}
