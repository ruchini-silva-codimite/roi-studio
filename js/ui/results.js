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

function renderAssumptionRows(state) {
  return `
    <div class="assumption-grid">
      <div class="assumption-item"><span class="assumption-label">Scenario</span><span class="assumption-value">${state.organization.scenario}</span></div>
      <div class="assumption-item"><span class="assumption-label">Industry</span><span class="assumption-value">${state.organization.industry}</span></div>
      <div class="assumption-item"><span class="assumption-label">Users</span><span class="assumption-value">${formatNumber(state.organization.users)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Workdays/year</span><span class="assumption-value">${formatNumber(state.organization.workdaysPerYear)}</span></div>

      <div class="assumption-item"><span class="assumption-label">Apps per user/day</span><span class="assumption-value">${formatNumber(state.productivity.appsPerUserPerDay)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Time to launch today</span><span class="assumption-value">${formatNumber(state.productivity.timeToLaunchWithout)} sec</span></div>
      <div class="assumption-item"><span class="assumption-label">Time with VLauncher</span><span class="assumption-value">${formatNumber(state.productivity.timeToLaunchWith)} sec</span></div>
      <div class="assumption-item"><span class="assumption-label">Interruptions/day</span><span class="assumption-value">${formatNumber(state.productivity.interruptionsPerDay)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Focus recovery</span><span class="assumption-value">${formatNumber(state.productivity.focusRecoverySeconds)} sec</span></div>
      <div class="assumption-item"><span class="assumption-label">Employee hourly rate</span><span class="assumption-value">${formatCurrency(state.productivity.employeeHourlyRate)}</span></div>

      <div class="assumption-item"><span class="assumption-label">Tickets/user/year</span><span class="assumption-value">${formatNumber(state.itOps.ticketsPerUserPerYear)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Access-related ticket %</span><span class="assumption-value">${formatNumber(state.itOps.accessRelatedTicketPercent)}%</span></div>
      <div class="assumption-item"><span class="assumption-label">Ticket resolution</span><span class="assumption-value">${formatNumber(state.itOps.ticketResolutionMinutes)} min</span></div>
      <div class="assumption-item"><span class="assumption-label">IT hourly rate</span><span class="assumption-value">${formatCurrency(state.itOps.itHourlyRate)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Ticket reduction</span><span class="assumption-value">${formatNumber(state.itOps.ticketReductionPercent)}%</span></div>

      <div class="assumption-item"><span class="assumption-label">New users/year</span><span class="assumption-value">${formatNumber(state.onboarding.newUsersPerYear)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Onboarding without VLauncher</span><span class="assumption-value">${formatNumber(state.onboarding.onboardingMinutesWithout)} min</span></div>
      <div class="assumption-item"><span class="assumption-label">Onboarding with VLauncher</span><span class="assumption-value">${formatNumber(state.onboarding.onboardingMinutesWith)} min</span></div>

      <div class="assumption-item"><span class="assumption-label">VLauncher cost/user/year</span><span class="assumption-value">${formatCurrency(state.cost.vlauncherCostPerUserPerYear)}</span></div>

      ${
        state.healthcare.enabled
          ? `
      <div class="assumption-item"><span class="assumption-label">Travelers/year</span><span class="assumption-value">${formatNumber(state.healthcare.travelersPerYear)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Traveler hours without VLauncher</span><span class="assumption-value">${formatNumber(state.healthcare.travelerHoursWithout)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Traveler hours with VLauncher</span><span class="assumption-value">${formatNumber(state.healthcare.travelerHoursWith)}</span></div>
      <div class="assumption-item"><span class="assumption-label">Traveler hourly value</span><span class="assumption-value">${formatCurrency(state.healthcare.travelerHourlyValue)}</span></div>
          `
          : ""
      }
    </div>
  `;
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

    <div class="results-block">
      <details class="show-work">
        <summary>Show My Work</summary>
        ${renderAssumptionRows(state)}
      </details>
    </div>
  `;
}
