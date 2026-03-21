import { calcProductivitySavings, calcITOperationalSavings, calcCapExAvoidance } from "./formulas.js";
import { defaultAssumptions } from "../data/assumptions.js";

export const calculateROI = (inputs) => {
  const productivity = calcProductivitySavings(
    inputs.users || 100,
    inputs.clinicianHourlyRate || defaultAssumptions.clinicianHourlyRate,
    inputs.dailyLoginsPerUser || defaultAssumptions.dailyLoginsPerUser,
    inputs.timeSavedPerLoginSec || defaultAssumptions.timeSavedPerLoginSec
  );

  const itOps = calcITOperationalSavings(
    inputs.devices || 100,
    defaultAssumptions.itHourlyRate,
    defaultAssumptions.helpdeskReduction
  );

  const capEx = calcCapExAvoidance(
    inputs.devices || 100,
    defaultAssumptions.hardwareUnitCost,
    defaultAssumptions.deviceLifeSpan
  );

  return {
    productivity,
    itOps,
    capEx,
    total: productivity + itOps + capEx
  };
};
