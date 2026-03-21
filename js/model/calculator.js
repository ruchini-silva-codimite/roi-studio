import {
  secondsToHours,
  minutesToHours,
  percentToDecimal,
  roundCurrency,
  roundNumber
} from "./formulas.js";

export function calculateLaunchTimeSavings(inputs) {
  const { users, workdaysPerYear } = inputs.organization;
  const {
    timeToLaunchWithout,
    timeToLaunchWith,
    appsPerUserPerDay,
    employeeHourlyRate
  } = inputs.productivity;

  const secondsSavedPerDayPerUser =
    Math.max(timeToLaunchWithout - timeToLaunchWith, 0) * appsPerUserPerDay;

  const totalHoursSavedPerYear =
    secondsToHours(secondsSavedPerDayPerUser) * workdaysPerYear * users;

  const annualValue = totalHoursSavedPerYear * employeeHourlyRate;

  return {
    label: "Launch Time Savings",
    hoursSaved: roundNumber(totalHoursSavedPerYear),
    annualValue: roundCurrency(annualValue)
  };
}

export function calculateFocusRecoverySavings(inputs) {
  const { users, workdaysPerYear } = inputs.organization;
  const {
    interruptionsPerDay,
    focusRecoverySeconds,
    employeeHourlyRate
  } = inputs.productivity;

  const secondsRecoveredPerDayPerUser =
    interruptionsPerDay * focusRecoverySeconds;

  const totalHoursSavedPerYear =
    secondsToHours(secondsRecoveredPerDayPerUser) * workdaysPerYear * users;

  const annualValue = totalHoursSavedPerYear * employeeHourlyRate;

  return {
    label: "Focus Recovery Savings",
    hoursSaved: roundNumber(totalHoursSavedPerYear),
    annualValue: roundCurrency(annualValue)
  };
}

export function calculateItSupportSavings(inputs) {
  const { users } = inputs.organization;
  const {
    ticketsPerUserPerYear,
    accessRelatedTicketPercent,
    ticketResolutionMinutes,
    itHourlyRate,
    ticketReductionPercent
  } = inputs.itOps;

  const totalTickets = users * ticketsPerUserPerYear;
  const accessTickets = totalTickets * percentToDecimal(accessRelatedTicketPercent);
  const avoidedTickets = accessTickets * percentToDecimal(ticketReductionPercent);
  const hoursSaved = avoidedTickets * minutesToHours(ticketResolutionMinutes);
  const annualValue = hoursSaved * itHourlyRate;

  return {
    label: "IT Support Savings",
    ticketsAvoided: roundNumber(avoidedTickets),
    hoursSaved: roundNumber(hoursSaved),
    annualValue: roundCurrency(annualValue)
  };
}

export function calculateOnboardingSavings(inputs) {
  const { newUsersPerYear, onboardingMinutesWithout, onboardingMinutesWith } =
    inputs.onboarding;
  const { itHourlyRate } = inputs.itOps;

  const minutesSavedPerUser = Math.max(
    onboardingMinutesWithout - onboardingMinutesWith,
    0
  );

  const totalHoursSaved = minutesToHours(minutesSavedPerUser) * newUsersPerYear;
  const annualValue = totalHoursSaved * itHourlyRate;

  return {
    label: "Onboarding Savings",
    hoursSaved: roundNumber(totalHoursSaved),
    annualValue: roundCurrency(annualValue)
  };
}

export function calculateTravelerSavings(inputs) {
  if (!inputs.healthcare.enabled) {
    return {
      label: "Traveler Savings",
      hoursSaved: 0,
      annualValue: 0
    };
  }

  const {
    travelersPerYear,
    travelerHoursWithout,
    travelerHoursWith,
    travelerHourlyValue
  } = inputs.healthcare;

  const hoursSavedPerTraveler = Math.max(
    travelerHoursWithout - travelerHoursWith,
    0
  );

  const totalHoursSaved = hoursSavedPerTraveler * travelersPerYear;
  const annualValue = totalHoursSaved * travelerHourlyValue;

  return {
    label: "Traveler Savings",
    hoursSaved: roundNumber(totalHoursSaved),
    annualValue: roundCurrency(annualValue)
  };
}

export function calculateVlauncherCost(inputs) {
  const { users } = inputs.organization;
  const { vlauncherCostPerUserPerYear } = inputs.cost;

  return roundCurrency(users * vlauncherCostPerUserPerYear);
}

export function calculateRoiSummary(inputs) {
  const launch = calculateLaunchTimeSavings(inputs);
  const focus = calculateFocusRecoverySavings(inputs);
  const itOps = calculateItSupportSavings(inputs);
  const onboarding = calculateOnboardingSavings(inputs);
  const travelers = calculateTravelerSavings(inputs);
  const annualCost = calculateVlauncherCost(inputs);

  const hardRoiSavings =
    itOps.annualValue + onboarding.annualValue + travelers.annualValue;

  const productivitySavings =
    launch.annualValue + focus.annualValue;

  const totalSavings = hardRoiSavings + productivitySavings;
  const netBenefit = totalSavings - annualCost;
  const roiPercent = annualCost > 0 ? (netBenefit / annualCost) * 100 : 0;
  const paybackMonths = totalSavings > 0 ? (annualCost / totalSavings) * 12 : null;

  return {
    breakdown: {
      hardRoi: {
        itOps,
        onboarding,
        travelers
      },
      productivity: {
        launch,
        focus
      }
    },
    totals: {
      hardRoiSavings: roundCurrency(hardRoiSavings),
      productivitySavings: roundCurrency(productivitySavings),
      totalSavings: roundCurrency(totalSavings),
      annualCost: roundCurrency(annualCost),
      netBenefit: roundCurrency(netBenefit),
      roiPercent: roundNumber(roiPercent),
      paybackMonths: paybackMonths === null ? null : roundNumber(paybackMonths)
    }
  };
}
