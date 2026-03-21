export const calcProductivitySavings = (users, hourlyRate, loginsPerDay, secSavedPerLogin) => {
  const annualHoursSaved = (users * loginsPerDay * secSavedPerLogin * 260) / 3600;
  return annualHoursSaved * hourlyRate;
};

export const calcITOperationalSavings = (devices, itHourlyRate, helpdeskReduction) => {
  const avgTicketsPerDeviceYear = 4;
  const hoursPerTicket = 0.5;
  const totalITCost = devices * avgTicketsPerDeviceYear * hoursPerTicket * itHourlyRate;
  return totalITCost * helpdeskReduction;
};

export const calcCapExAvoidance = (devices, unitCost, lifeSpan) => {
  return (devices * unitCost) / lifeSpan;
};
